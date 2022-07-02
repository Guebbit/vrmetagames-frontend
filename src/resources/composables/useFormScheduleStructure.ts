import {
    ref,
    computed,
    watch,
    onMounted,
    toRefs
} from "vue";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";
import useTimeHelpers from "./useTimeHelpers";

import { timeToSeconds } from "guebbit-javascript-library";
import { formRules, timeFormatDate, timeFormatHours } from "@/resources/constants";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import type { scheduleFormMap, scheduleInputMap, scheduleMap } from "@/interfaces";

dayjs.extend(customParseFormat);

export interface useFormSchedulePropsMap {
    scheduleId ?:string,
    showSpeedModeTab :boolean,
    defaultFastMode :boolean,
    defaultFormTimeStep :number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (props: useFormSchedulePropsMap, emit :any) => {
    const { state, getters } = useStore();
    const { t } = useI18n();

    const {
        translateToDate,
        formatInputTypeDate,
        formatInputTypeTime
    } = useTimeHelpers(timeFormatDate + ' ' + timeFormatHours);


    // --------- DATA ---------

    const formIsValid = ref(true);
    const form = ref<scheduleFormMap>({
        date: undefined,
        hourStart: undefined,
        hourEnd: undefined,
        rules: false,
        temporaryFillFormFlag: false            // TODO TEMPORARY - trova una soluzione più bella
    });
    const formEl = ref<HTMLFormElement>();
    const fastMode = ref(props.defaultFastMode);
    const { scheduleRecords, scheduleTimeStep } = toRefs(state.ecommerce);
    const { businessHours } = toRefs(state.main);

    const scheduleReadable = computed(() => {
        return getters['ecommerce/scheduleReadable'];
    });
    const checkScheduleIsAllowed = computed(() => {
        return getters['ecommerce/checkScheduleIsAllowed'];
    });


    const formTimeStep = computed(() => {
        return scheduleTimeStep.value * props.defaultFormTimeStep;
    });

    /**
     * A deep watcher can't see exactly what changed in the object.
     * The solution is to watch a shallow copied object
     */
    const watcherHelperForm = computed(() => {
        return {
            ...form.value,
            scheduleId: props.scheduleId
        };
    });

    /**
     * Form Hour End TRANSLATION
     * hourEnd 00.00 is considered 24.00
     * hourStart 00.00 is considered 00.00 so no need to translate
     *
     * @return {string | undefined}
     */
    const translatedHourEnd = computed<string | undefined>(() => {
        return form.value.hourEnd === '00:00' ? '24:00' : form.value.hourEnd;
    });

    /**
     * Date object of form START date
     * 
     * @return {Date}
     */
    const dateObjectFormStart = computed<Date>(() => {
        return translateToDate(form.value.date + ' ' + form.value.hourStart) || new Date();
    });
    /**
     * Same but timestamp
     * 
     * @return {number}
     */
    const timeFormStart = computed<number>(() => {
        return dateObjectFormStart.value.getTime();
    });
    
    /**
     * Date object of form END date
     * 
     * @return {Date}
     */
    const dateObjectFormEnd = computed<Date>(() => {
        return translateToDate(form.value.date + ' ' + translatedHourEnd.value) || new Date();
    });
    /**
     * Same but timestamp
     *
     * @return {number}
     */
    const timeFormEnd = computed<number>(() => {
        return dateObjectFormEnd.value.getTime();
    });

    /**
     *
     */
    const selectedSchedule = computed<scheduleMap | undefined>(() => {
        if(!props.scheduleId || !Object.prototype.hasOwnProperty.call(scheduleRecords.value, props.scheduleId)){
            return undefined;
        }
        return scheduleRecords.value[props.scheduleId]
    });

    /**
     * schedule data from FORM
     *
     * WARNING: hourStart 00.00 IS 00.00, hourEnd 00.00 is considered 24.00
     * @return {Object}
     */
    const formItemSchedule = computed<scheduleInputMap>(() => {
        return {
            allDay: false,
            start: timeFormStart.value,
            end: timeFormEnd.value,
        }
    });

    /**
     * Form schedule is on a valid time?
     */
    const formScheduleAvailability = computed<string[]>(() => {
        const { start, end } = formItemSchedule.value;
        return checkScheduleIsAllowed.value(start, end);
    });

    /**
     * Readable duration
     *
     * @return {string}
     */
    const selectedFormDuration = computed<string>(() => {
        if(!formItemSchedule.value){
            return '';
        }
        const { start, end } = formItemSchedule.value;
        const { durationData: { mode = 0, hours = 0, minutes = 0 } = {} } = scheduleReadable.value(start, end);
        return t('generic.schedule-details-time-count.' + mode, {
            hours,
            minutes
        });
    });



    // --------- METHODS ---------

    const formConfirmButton = () => {
        if(!formIsValid.value){
            return;
        }
        if(props.scheduleId){
            editSchedule();
        }
        return fastMode.value ? confirmSchedule() : addSchedule();
    };

    /**
     * ADD new schedule with form data
     */
    const addSchedule = () => {
        // TODO toast OR TODO disclaimer & computed
        emit('schedule:add', formItemSchedule.value);
    };

    /**
     * ADD && CONFIRM new schedule
     * (fast mode)
     */
    const confirmSchedule = () => {
        // TODO toast OR TODO disclaimer & computed
        emit('schedule:confirm', formItemSchedule.value);
    };


    /**
     * EDIT new schedule with form data
     */
    const editSchedule = () => {
        // TODO toast OR TODO disclaimer & computed
        emit('schedule:edit', {
            ...formItemSchedule.value,
            id: props.scheduleId
        });
    };

    /**
     * REMOVE selected schedule
     */
    const removeSchedule = () => {
        // TODO toast OR TODO disclaimer & computed
        emit('schedule:remove', props.scheduleId);
    };

    /**
     * Put hourStart behind hourEnd of 1 hour if the hours are not valid
     * Not valid = "start" is after "end"
     * Edit the one who was not edited by the user
     *
     * TODO adapt to businessHours
     *
     * @param {boolean} hourEndWasEdited
     */
    const resetFormHours = (hourEndWasEdited = false) :void => {
        const start = timeToSeconds(form.value.hourStart);
        const end = timeToSeconds(translatedHourEnd.value);
        // not valid, reset
        if(start >= end){
            if(!hourEndWasEdited){
                form.value.hourEnd = dayjs(timeFormStart.value + formTimeStep.value).format(timeFormatHours);
            }else{
                form.value.hourStart = dayjs(timeFormEnd.value - formTimeStep.value).format(timeFormatHours);
            }
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
            end = start + formTimeStep.value;
        }
        // all times must be divided in "steps" (30 min steps)
        start = Math.round(start / scheduleTimeStep.value) * scheduleTimeStep.value;
        end = Math.round(end / scheduleTimeStep.value) * scheduleTimeStep.value;

        // starting values
        let dateObject = dayjs(start);
        let hourStartObject = dayjs(start);
        let hourEndObject = dayjs(end);

        /**
         * POSSIBLE OPTIMIZATION: work with timestamps to understand if you have time or not
         * TODO può segnare "chiuso" anche se magari ci starebbe dentro con un "formTimeStep" minore
         * TODO come fare per 'max-reached'?
         * TODO fare funzione a parte?
         *
         * Predict and set good schedule time based on actual time, opening hours and formTimeStep decided
         *  - If closed, take the first time possible on the next days
         *  - Set hours based on "start" and "end" where "end" is "start + step" as default
         */ 
        if(checkScheduleIsAllowed.value(hourStartObject.valueOf(), hourEndObject.valueOf()).includes('closed')){
            // the day after until it's opened
            do {
                dateObject = dateObject.add(1, 'day');
                hourStartObject = hourStartObject.add(1, 'day');
                hourEndObject = hourEndObject.add(1, 'day');
                // continue until an open day is found
            } while(businessHours.value[dateObject.day()].length < 1);
            // find the day hours
            const [ tempTodayStart = "00.00", tempTodayEnd = "00.00" ] = businessHours.value[dateObject.day()];
            // START and END hour and minutes
            const [ hourStartToday, minuteStartToday ] = tempTodayStart.split('.');
            const [ hourEndToday, minuteEndToday ] = tempTodayEnd.split('.');
            // START from the beginning
            hourStartObject = hourStartObject.set('hour', parseInt(hourStartToday)).set('minute', parseInt(minuteStartToday));
            // take the end time based on the START + TIMESTEP
            hourEndObject = dayjs(hourStartObject.valueOf() + formTimeStep.value)
            // if it would be closed, then set the maximum time possible for the day
            if(checkScheduleIsAllowed.value(hourStartObject.valueOf(), hourEndObject.valueOf()).includes('closed')){
                hourEndObject = hourEndObject.set('hour', parseInt(hourEndToday)).set('minute', parseInt(minuteEndToday));
            }
        }

        // fill the form with the new data
        form.value = {
            date: dateObject.format(timeFormatDate),
            hourStart: hourStartObject.format(timeFormatHours),
            hourEnd: hourEndObject.format(timeFormatHours),
            rules: form.value.rules,
            temporaryFillFormFlag: !form.value.temporaryFillFormFlag
        };
        // console.log("FORMFILLED", form.value.date, form.value.hourStart, form.value.hourEnd)
        // to make visible errors and warnings
        if(formEl.value){
            formEl.value.validate();
        }
    };

    // --------- OTHER ---------

    /**
     * Check if an existent event was changed
     */
    watch(watcherHelperForm, (newData, oldData) => {
        const { scheduleId :newScheduleId, date: newDate, hourEnd: newHourEnd, hourStart: newHourStart, temporaryFillFormFlag: newFlag } = newData;
        const { scheduleId :oldScheduleId, date: oldDate, hourEnd: oldHourEnd, hourStart: oldHourStart, temporaryFillFormFlag: oldFlag } = oldData;
        // TODO TEMPORARY FIX, se i flag sono diversi allora è stato attivato fillForm e quindi è stato richiamato 2 volte il watcher
        if(newFlag !== oldFlag){
            return;
        }
        // schedule not selected, nothing to edit
        if(!selectedSchedule.value){
            return;
        }
        // if hours changed
        if(newHourStart !== oldHourStart || newHourEnd !== oldHourEnd){
            resetFormHours(newHourEnd !== oldHourEnd)
        }
        // if all undefined then it's the initialization
        if(!oldDate && !oldHourEnd && !oldHourStart){
            return;
        }
        // if the identifier changed, then it's a different event being loaded
        if(newScheduleId !== oldScheduleId){
            return;
        }
        // if all is the same, then it changed a non-consequential parameter
        if(newDate === oldDate && newHourEnd === oldHourEnd && newHourStart === oldHourStart){
            return;
        }
        // Changes are valid, emit
        editSchedule();
    }, { deep: true });

    watch(() => props.scheduleId, () => {
        const { start, end } = selectedSchedule.value || {};
        fillForm(start, end);
    });

    onMounted(() => {
        fillForm();
    });

    // expose managed state as return value
    return {
        formIsValid,
        form,
        formEl,
        scheduleRecords,
        scheduleTimeStep,
        scheduleReadable,
        checkScheduleIsAllowed,
        translatedHourEnd,
        selectedSchedule,
        formItemSchedule,
        formScheduleAvailability,
        selectedFormDuration,
        formConfirmButton,
        addSchedule,
        confirmSchedule,
        editSchedule,
        removeSchedule,
        resetFormHours,
        fillForm,
        formatInputTypeDate,
        formatInputTypeTime,
        formRules,
        timeFormatDate,
        timeFormatHours
    }
}