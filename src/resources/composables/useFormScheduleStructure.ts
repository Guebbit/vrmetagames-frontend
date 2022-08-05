import { watch, ref, computed } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import dayjs, { type ManipulateType } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { timeToSeconds } from "guebbit-javascript-library";
import { formRules } from "@/resources/constants";
import useScheduleHelpers from "@/resources/composables/useScheduleHelpers";


dayjs.extend(customParseFormat);

export interface scheduleFormHelperMap {
    duration: number
    timeframe: string
}

export interface scheduleFormMap {
    date?: string
    hourStart?: string
    hourEnd?: string
    terms?: boolean
}

export interface scheduleFormOptions {
    admin?: boolean
    stepTime?: number
    stepSlot?: number
    dateFormat?: string
    timeFormat?: string
}

export default ({
        admin = false,
        stepTime = 1800000,
        stepSlot = 2,
        dateFormat = 'YYYY-MM-DD',
        timeFormat = 'HH:mm:ss'
    } :scheduleFormOptions) => {

    /**
     *
     */
    const {
        formToTime,
        timeToForm,
        getFirstTimeAvailable,
        getScheduleTimeFromDuration
    } = useScheduleHelpers(dateFormat, timeFormat);

    /**
     * Form values
     */
    const formValues = ref<scheduleFormMap>({});

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
    /**
     * Vee-validate validation toolbox
     * Different schema if on authentication or registration
     */
    const { errors :formErrors, meta: formMeta, setValues, validate } = useForm({
        validationSchema: admin ? formScheduleAdminSchema : formScheduleUserSchema
    });
    // shortcut validation flag
    const formIsValid = computed(() => formMeta.value.valid);

    /**
     * Form errors made list
     */
    const formErrorsList = computed<string[]>(() => {
        const errorList :string[] = [];
        // regula
        for(const key in formErrors.value)
            errorList.push(key + '-' + formErrors.value[key]);
        return errorList;
    });

    /**
     * Vee-validate reactive validation
     */
    watch(formValues, async (val) => {
        setValues(val);
        await validate();
    }, { deep: true });

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
            const [ start, end ] = formToTime(formValues.value.date, formValues.value.hourStart, formValues.value.hourEnd);
            formValues.value = {
                ...formValues.value,
                date: dayjs(start).add(amount, unit).format(dateFormat),
                hourStart: dayjs(start).add(amount, unit).format(timeFormat),
                hourEnd: dayjs(end).add(amount, unit).format(timeFormat),
            };
        }
        if(direction === 'back'){
            const [ start, end ] = formToTime(formValues.value.date, formValues.value.hourStart, formValues.value.hourEnd);
            formValues.value = {
                ...formValues.value,
                date: dayjs(start).subtract(amount, unit).format(dateFormat),
                hourStart: dayjs(start).subtract(amount, unit).format(timeFormat),
                hourEnd: dayjs(end).subtract(amount, unit).format(timeFormat),
            };
        }
    };


    /**
     * Fill form with selected dates
     *
     * @param {number} start
     * @param {number} end
     */
    const fillForm = (start ?:number, end ?:number) :void => {
        // if START is empty => put today
        if(!start){
            start = Date.now();
        }
        // if END is empty => put today + double timeStep (1 hour) as standard starting value
        if(!end){
            // 1 hour later
            end = start + (stepTime * stepSlot);
        }
        // all times must be divided in "steps" (30 min steps)
        start = Math.round(start / stepTime) * stepTime;
        end = Math.round(end / stepTime) * stepTime;
        // get the first time available in this hours (end - start = requested duration)
        const [ newStart, newEnd ] = getScheduleTimeFromDuration(start, end - start);
        // fill the form with the new data
        formValues.value = {
            ...timeToForm(newStart, newEnd),
            terms: formValues.value.terms
        };
    };

    /**
     * Automatically resolve/correct form validation
     */
    const resolveFormSystemErrors = () => {
        const [ start, end ] = getScheduleTimeFromDuration();
        // new pure form
        const formFabric = {
            ...timeToForm(start, end)
        };
        // old form clone
        const newForm = {
            ...formValues.value,
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
     */
    const resolveFormLogicErrors = () => {
        const [ start, end ] = formToTime(formValues.value.date, formValues.value.hourStart, formValues.value.hourEnd);
        const [ newStart, newEnd ] = getFirstTimeAvailable(start, end, stepTime);
        if(start !== newStart || end !== newEnd)
        formValues.value = {
            ...formValues.value,
            ...timeToForm(newStart, newEnd)
        };
    };
    const resolveFormErrors = () => {
        resolveFormSystemErrors();
        resolveFormLogicErrors();
    }


    watch([() => formValues.value.hourStart, () => formValues.value.hourEnd], ([newHourStart, newHourEnd], [oldHourStart, oldHourEnd]) => {
        // valid hours, no need to intervene
        if(timeToSeconds(formValues.value.hourStart) < timeToSeconds(formValues.value.hourEnd === '00:00' ? '24:00' : formValues.value.hourEnd))
            return;
        const [ start, end ] = formToTime(formValues.value.date, newHourStart, newHourEnd);
        // if hours changed and are now invalid
        // start changed
        if(newHourStart !== oldHourStart)
            formValues.value.hourEnd = dayjs(start + stepTime).format(timeFormat);
        // end changed
        if(newHourEnd !== oldHourEnd)
            formValues.value.hourStart = dayjs(end - stepTime).format(timeFormat);


    });

    /**
     *  Form buttons to simplify
     */
    const formHelper = ref<scheduleFormHelperMap>({
        duration: 0,
        timeframe: ''
    });
    /**
     * formHelper interact with formValues
     * - Timeframe is a shortcut for certain start-end hours of the day
     * - Duration is the step to add to start (must add milliseconds)
     */
    watch(() => formHelper.value.timeframe, (val) => {
        const [ start ] = formToTime(formValues.value.date, formValues.value.hourStart, formValues.value.hourEnd);
        console.log("VVVVVV", getScheduleTimeFromDuration(start, formHelper.value.duration))
        switch (val) {
            case "morning":
                break;
            case "afternoon":
                break;
            case "evening":
                break;
        }
    });
    watch(() => formHelper.value.duration, (val) => {
        const [ start ] = formToTime(formValues.value.date, formValues.value.hourStart, formValues.value.hourEnd);
        formValues.value = {
            ...formValues.value,
            ...timeToForm(start, start + val * 1000),
        }
    });
    /**
     * Mirror formValues changes in formHelper
     * - If hour change, check the new difference, remove the milliseconds, and you have the duration
     */
    watch([() => formValues.value.hourStart, () => formValues.value.hourEnd], ([newHourStart, newHourEnd], [oldHourStart, oldHourEnd]) => {
        const [ start, end ] = formToTime(formValues.value.date, newHourStart, newHourEnd);
        formHelper.value = {
            ...formHelper.value,
            duration: (end - start) / 1000
        }
    });

    /*
    console.clear();
    console.log("------------------------------------------------------------------------------------------------------------------------------------")
    // getFirstTimeAvailable TEST
    // const startingdate
    const testDate = 1659513600000; // mercoledì alle 10 di mattina (apertura: dalle 12 alle 19) || Date.now()
    const [ testStart, testEnd ] = getFirstTimeAvailable(
        testDate,   // startingdate
        testDate + (28800000 + 3600000) // startingdate + 8+1 ore
    );
    console.log("STARTTT", new Date(testStart).toUTCString())
    console.log("ENDDDD", new Date(testEnd).toUTCString())
    console.log("________________________________________________________________________________")
    block
    */

    // expose managed state as return value
    return {
        formValues,
        formErrors,
        formErrorsList,
        formMeta,
        formIsValid,
        formHelper,
        fillForm,
        formValueGo,
        resolveFormErrors
    }
}