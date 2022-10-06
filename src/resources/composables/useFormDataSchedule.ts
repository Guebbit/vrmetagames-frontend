import { watch, ref, computed, toRefs } from "vue";
import { useStore } from "@/store";
import useScheduleHelpers from "@/resources/composables/useScheduleHelpers";
import useFormStructure, { formRules } from "@/resources/composables/useFormStructure";
import * as yup from "yup";
import dayjs, { type ManipulateType } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { timeToSeconds } from "guebbit-javascript-library";
import useTimeHelpers from "@/resources/composables/useTimeHelpers";
import { stationMap } from "@/interfaces";


dayjs.extend(customParseFormat);

export interface scheduleFormMap {
    date?: string
    hourStart?: string
    hourEnd?: string
    numPeople?: number      // TODO future uses, default 1 for now
    numStations?: number
    selectedStation?: string
    terms?: boolean
}

export interface scheduleFormSettings {
    admin?: boolean
    // TODO? scheduleTimeStep è il tempo dello step minimo possibile,
    //  temporaryNameUIDefaultStepJump è lo step di default, il moltiplicatore di quest'ultimo
    temporaryNameUIDefaultStepJump?: number,
    stepTime?: number
    stepSlot?: number
    dateFormat?: string
    timeFormat?: string
}

export default ({
        admin = false,
        temporaryNameUIDefaultStepJump = 2,
        stepTime = 1800000,
        stepSlot = 2,
        dateFormat = 'YYYY-MM-DD',
        timeFormat = 'HH:mm:ss'
    } :scheduleFormSettings) => {

    const { state } = useStore();
    const { stations } = toRefs(state.ecommerce);

    /**
     * Time helpers toolbox
     */
    const {
        translateStringToDate
    } = useTimeHelpers();

    /**
     * Schedule managing toolbox
     */
    const {
        getScheduleFirstAvailable,
        normalizeTime,
        formToTime,
        timeToForm,
        getTimeframe,
        getScheduleTimes,
        determineScheduleIsAllowed
    } = useScheduleHelpers(dateFormat, timeFormat, stepTime);

    /**
     * Form values
     */
    const formValues = ref<scheduleFormMap>({});

    /**
     * [SHORTCUT]
     * [ start, end ] = formToTime();
     */
    const formStartEndTimestamps = computed<[number, number]>(() => formToTime(formValues.value.date, formValues.value.hourStart, formValues.value.hourEnd))

    /**
     * [SHORTCUT]
     * Duration of form (end - start)
     */
    const formValuesDuration = computed(() => formStartEndTimestamps.value[1] - formStartEndTimestamps.value[0]);

    /**
     *
     */
    const formValuesTimeframe = computed(() => getTimeframe(formStartEndTimestamps.value[0]));

    /**
     * [UI] Is selected date today?
     */
    const formValuesIsToday = computed<boolean>(() =>
        new Date().setHours(0, 0, 0, 0) === (translateStringToDate(formValues.value.date, dateFormat) || new Date()).setHours(0, 0, 0, 0)
    )

    /**
     *
     */
    const formValuesSteps = computed(() => formValuesDuration.value / stepTime);

    /**
     * Form schedule is on a valid time?
     */
    const scheduleAvailability = computed<string[]>(() => {
        const [ start, end ] = formStartEndTimestamps.value;
        return determineScheduleIsAllowed(start, end);
    });

    /**
     * Vee-validate validation
     */
    const formScheduleAdminSchema = yup.object({
        date: formRules.requiredStringDate,
        hourStart: formRules.required
            .notOneOf([yup.ref('hourEnd')], 'must-not-match'),
        hourEnd: formRules.required
            .notOneOf([yup.ref('hourStart')], 'must-not-match'),
    });
    const formScheduleUserSchema = formScheduleAdminSchema
        .concat(
            yup.object({
                terms: formRules.requiredCheck
            })
        ).test('time-travel', 'time-travel',
            ({ date, hourStart, hourEnd }) => {
                // user cannot set a date in the past
                const [ start ] = formToTime(date, hourStart, hourEnd);
                // if false = error
                return new Date().setMinutes(0, 0, 0) <= start;
            });
    // type formScheduleUserSchemaType = yup.InferType<typeof formScheduleUserSchema>;

    const {
        formErrors,
        formErrorsList :formErrorsListOriginal,
        formMeta,
        formIsValid :formIsValidOriginal,
    } = useFormStructure(
        formValues,
        computed(() => admin ? formScheduleAdminSchema : formScheduleUserSchema)
    );

    /**
     * Form is valid flag
     */
    const formIsValid = computed(() => formIsValidOriginal.value && scheduleAvailability.value.length === 0);

    /**
     * Form errors made list
     */
    const formErrorsList = computed<string[]>(() => {
        const errorList :string[] = [];
        for(let i = scheduleAvailability.value.length; i--; )
            errorList.push('availability-' + scheduleAvailability.value[i])
        return [
            ...errorList,
            ...formErrorsListOriginal.value
        ]
    });

    /**
     * set duration (fixed start, changing end to meet required duration)
     * @param {number} time
     */
    const setDuration = (time :number) => {
        const [ newStart, newEnd ] = getScheduleTimes(formStartEndTimestamps.value[0], time);
        formValues.value = {
            ...formValues.value,
            ...timeToForm(newStart, newEnd)
        };
    };

    /**
     *
     * @param {string} direction
     * @param {number} amount
     * @param {string} unit
     */
    const formValueGo = (direction: "forward" | "back" | "now", amount = 0, unit :ManipulateType = 'day') => {
        if(direction === 'now'){
            formValues.value = {
                ...formValues.value,
                date: dayjs().format(dateFormat),
            };
        }
        if(direction === 'forward'){
            const [ start, end ] = formStartEndTimestamps.value;
            formValues.value = {
                ...formValues.value,
                date: dayjs(start).add(amount, unit).format(dateFormat),
                hourStart: dayjs(start).add(amount, unit).format(timeFormat),
                hourEnd: dayjs(end).add(amount, unit).format(timeFormat),
            };
        }
        if(direction === 'back'){
            const [ start, end ] = formStartEndTimestamps.value;
            formValues.value = {
                ...formValues.value,
                date: dayjs(start).subtract(amount, unit).format(dateFormat),
                hourStart: dayjs(start).subtract(amount, unit).format(timeFormat),
                hourEnd: dayjs(end).subtract(amount, unit).format(timeFormat),
            };
        }
    };


    /**
     * Insert default form values
     * If dates are set: fill form with selected dates
     *
     * @param {number} start
     * @param {number} end
     * @param {string} step
     */
    const fillForm = (start ?:number, end ?:number, step = stepTime * stepSlot) :void => {
        // if START is empty => put today
        if(!start && !end){
            // get the first time available from now
            const [ newStart, newEnd ] = getScheduleTimes(Date.now(), step);
            start = newStart;
            end = newEnd;
        }
        // Should never happen
        if(!start){
            start = normalizeTime(Date.now());
        }
        // if END is empty => put start + step as standard starting value, example: 1 hour later
        if(!end){
            end = start + step;
        }
        // all times must be divided in "steps" (30 min steps) and cut off the remaining milliseconds
        start = normalizeTime(start);
        end = normalizeTime(end);
        // fill the form with the new data
        formValues.value = {
            // TODO dove decido quali sono i valori standard?
            numStations: 1,
            numPeople: 1,
            selectedStation: "item1",
            ...formValues.value,
            ...timeToForm(start, end),
        };
    };

    /**
     * Automatically resolve/correct form validation
     */
    const resolveFormSystemErrors = () => {
        const [ start, end ] = getScheduleTimes();
        // new pure form
        const formFabric = {
            ...timeToForm(start, end)
        };
        // old form clone
        const newForm = {
            ...formValues.value,
            terms: true
        };
        // correction
        if(formErrors.value.date)
            newForm.date = formFabric.date;
        if(formErrors.value.hourStart)
            newForm.hourStart = formFabric.hourStart;
        if(formErrors.value.hourEnd)
            newForm.hourEnd = formFabric.hourEnd;
        // saving
        formValues.value = {
            ...newForm,
        };
    };

    /**
     * Automatically resolve logic/scheduling errors if possible,
     * like finding better hours if closed or maxed out
     *
     * TODO numStations and getScheduleFirstAvailable
     */
    const resolveFormLogicErrors = () => {
        const [ start, end ] = formStartEndTimestamps.value;
        const [ newStart, newEnd ] = getScheduleFirstAvailable(start, end, undefined, stepTime);
        if(start !== newStart || end !== newEnd)
        formValues.value = {
            ...formValues.value,
            ...timeToForm(newStart, newEnd)
        };
    };

    /**
     * Resolve ALL the above problems
     */
    const resolveFormErrors = () => {
        resolveFormSystemErrors();
        resolveFormLogicErrors();
    };

    /**
     * HTML5 fix
     * Input type number "min" can't be trusted
     * Numbers that can't be negative
     *
     * (FIXED BY vueyifyInputNumber.vue)
     */
    /*
    const minFixList :['numPeople' | 'numStations', number][] = [['numPeople', 1], ['numStations', 1]];
    for(let i = minFixList.length; i--; )
        watch(() => formValues.value[minFixList[i][0]], (value) => {
            // can't be negative
            if(!value || value < 1)
                formValues.value[minFixList[i][0]] = minFixList[i][1];
        });
    */

    /**
     * Simple check:
     * Prevent invalid duration
     */
    watch([() => formValues.value.hourStart, () => formValues.value.hourEnd], ([newHourStart, newHourEnd], [oldHourStart, oldHourEnd]) => {
        // valid hours, no need to intervene
        if(timeToSeconds(formValues.value.hourStart) < timeToSeconds(formValues.value.hourEnd === '00:00' ? '24:00' : formValues.value.hourEnd))
            return;
        const [ start, end ] = formToTime(formValues.value.date, newHourStart, newHourEnd);
        // if hours changed and are now invalid
        // start changed
        if(newHourStart !== oldHourStart)
            formValues.value.hourEnd = dayjs(start + stepTime * 2).format(timeFormat);
        // end changed
        if(newHourEnd !== oldHourEnd)
            formValues.value.hourStart = dayjs(end - stepTime * 2).format(timeFormat);
    });

    /**
     * Simple check:
     * Number of stations can't be inferior of selected Station capacity
     */
    watch([() => formValues.value.numStations, () => formValues.value.selectedStation], ([numStations, selectedStation]) => {
        // check validity
        if(!numStations || !selectedStation || !Object.prototype.hasOwnProperty.call(stations.value, selectedStation))
            return;
        const { capacity } = stations.value[selectedStation];
        if(capacity && capacity < numStations)
            formValues.value.numStations = capacity;
    });

    return {
        formValues,
        formErrors,
        formErrorsList,
        formMeta,
        formIsValid,
        formStartEndTimestamps,
        formValuesDuration,
        formValuesTimeframe,
        formValuesIsToday,
        formValuesSteps,
        scheduleAvailability,
        fillForm,
        setDuration,
        formValueGo,
        resolveFormErrors
    }
}