import {
    ref,
    computed,
    watch,
    onMounted,
} from 'vue';
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";
import { timeToSeconds } from "guebbit-javascript-library";
import { formRules, timeFormatDate, timeFormatHours } from "@/resources/constants";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import type { formScheduleMap, scheduleInputMap, scheduleMap } from "@/interfaces";

dayjs.extend(customParseFormat);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (props: { scheduleId ?:string }, emit :any) => {
    const { state, getters } = useStore();
    const { t } = useI18n();



    // --------- DATA ---------

    const formIsValid = ref(true);
    const form = ref<formScheduleMap>({
        date: undefined,
        hourStart: undefined,
        hourEnd: undefined,
        rules: false,
        temporaryFillFormFlag: false            // TODO TEMPORARY - trova una soluzione più bella
    });
    const formEl = ref<HTMLFormElement>();



    // --------- COMPUTED ---------

    /**
     * MAPSTATE
     */
    const scheduleRecords = computed(() => {
        return state.ecommerce.scheduleRecords;
    });
    const scheduleTimeStep = computed(() => {
        return state.ecommerce.scheduleTimeStep;
    });

    /**
     * MAPGETTERS
     */
    const scheduleReadable = computed(() => {
        return getters['ecommerce/scheduleReadable'];
    });
    const checkScheduleIsAllowed = computed(() => {
        return getters['ecommerce/checkScheduleIsAllowed'];
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
            start: dayjs(form.value.date + ' ' + form.value.hourStart, timeFormatDate + ' ' + timeFormatHours).valueOf(),
            end: dayjs(form.value.date + ' ' + translatedHourEnd.value, timeFormatDate + ' ' + timeFormatHours).valueOf(),
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
        const { durationData: { mode, hours, minutes } } = scheduleReadable.value(start, end);
        return t('play.schedule-details-time-count.' + mode, {
            hours,
            minutes
        });
    });



    // --------- METHODS ---------

    /**
     * ADD new schedule with form data
     */
    const addSchedule = () => {
        emit('schedule:add', formItemSchedule.value);
    };

    /**
     * ADD && CONFIRM new schedule
     * (fast mode)
     */
    const confirmSchedule = () => {
        emit('schedule:confirm', formItemSchedule.value);
    };


    /**
     * EDIT new schedule with form data
     */
    const editSchedule = () => {
        emit('schedule:edit', {
            ...formItemSchedule.value,
            id: props.scheduleId
        });
    };

    /**
     * REMOVE selected schedule
     */
    const removeSchedule = () => {
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
                const newTime = dayjs(form.value.date + ' ' + form.value.hourStart, timeFormatDate + ' ' + timeFormatHours).valueOf();
                form.value.hourEnd = dayjs(newTime + (scheduleTimeStep.value * 2)).format(timeFormatHours);
            }else{
                const newTime = dayjs(form.value.date + ' ' + translatedHourEnd.value, timeFormatDate + ' ' + timeFormatHours).valueOf();
                form.value.hourStart = dayjs(newTime - (scheduleTimeStep.value * 2)).format(timeFormatHours);
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
            end = start + scheduleTimeStep.value * 2;
        }
        // all times must be divided in "steps" (30 min steps)
        start = Math.round(start / scheduleTimeStep.value) * scheduleTimeStep.value;
        end = Math.round(end / scheduleTimeStep.value) * scheduleTimeStep.value;
        // fill the form with the new data

        form.value = {
            date: dayjs(start).format(timeFormatDate),
            hourStart: dayjs(start).format(timeFormatHours),
            hourEnd: dayjs(end).format(timeFormatHours),
            rules: false,
            temporaryFillFormFlag: !form.value.temporaryFillFormFlag
        };

        // to make visible errors and warnings
        if(formEl.value){
            formEl.value.validate();
        }
    };


    /**
     * input type="date" accept only YYYY-MM-DD format, even if it shows another format,
     * so it needs to be translated.
     *
     * @param {string} value
     * @param {string} formatTo - format
     * @param {string} formatFrom - format
     */
    const formatInputTypeDate = (value :string, formatTo = timeFormatDate, formatFrom = timeFormatDate) => {
        return dayjs(value, formatFrom).format(formatTo);
    };

    /**
     * input type="time" has a stepper that is ignored in the dropdown (so its unreliable)
     *
     * @param {string} value
     * @param {string} separator
     * @param {number} step
     */
    const formatInputTypeTime = (value :string, separator = ":", step = 30) => {
        const [hours = '00', minutes = '00'] = value.split(separator);
        return hours + separator + (parseInt(minutes) >= step ? step.toString() : '00');
        // const newMinutes = Math.round(parseInt(minutes) / step) * step;
        // return hours + separator + (newMinutes < 60 ? newMinutes.toString().padStart(2, '0') : '00');
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