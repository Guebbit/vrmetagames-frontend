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
import useScheduleStructure from "@/resources/composables/useScheduleStructure";
import useFormBetweenDates from "@/resources/composables/useFormBetweenDates";

export interface useFormSchedulePropsMap {
    scheduleId ?:string,
    showSpeedModeTab :boolean,
    defaultFastMode :boolean,
    defaultFormTimeStep :number
}

dayjs.extend(customParseFormat);

export default (props: useFormSchedulePropsMap) => {
    const { state, getters } = useStore();
    const { t } = useI18n();


    // TODO formValues
    const form = ref<scheduleFormMap>({
        date: undefined,
        hourStart: undefined,
        hourEnd: undefined,
        rules: false,
        temporaryFillFormFlag: false            // TODO TEMPORARY - trova una soluzione più bella
    });

    /**
     *
     */
    const {
        translateToDate,
        formatInputTypeDate,
        formatInputTypeTime
    } = useTimeHelpers(timeFormatDate + ' ' + timeFormatHours);

    /**
     *
     */
    const {
        getFirstTimeAvailable,
    } = useScheduleStructure();


    /**
     *
     */
    const formTimeStep = computed(() => scheduleTimeStep.value * props.defaultFormTimeStep);

    /**
     *
     */
    const {
        translatedHourEnd,
        formValuesDateStart,
        formValuesDateEnd
    } = useFormBetweenDates(
        computed(() => form.value.date),
        computed(() => form.value.hourStart),
        computed(() => form.value.hourEnd)
    );


    // --------- DATA ---------

    const formIsValid = ref(true);
    const { scheduleRecords, scheduleTimeStep } = toRefs(state.ecommerce);

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
     * Form schedule is on a valid time?
     */
    const formScheduleAvailability = computed<string[]>(() => getters['ecommerce/checkScheduleIsAllowed'](formValuesDateStart.value.getTime(), formValuesDateEnd.value.getTime()));

    /**
     * Readable duration
     *
     * @return {string}
     */
    const selectedFormDuration = computed<string>(() => {
        const { durationData: { mode = 0, hours = 0, minutes = 0 } = {} } = getters['ecommerce/scheduleReadable'](formValuesDateStart.value.getTime(), formValuesDateEnd.value.getTime());
        return t('generic.schedule-details-time-count.' + mode, {
            hours,
            minutes
        });
    });


    // --------- METHODS ---------


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
        console.log("2222222222", form.value.hourStart, translatedHourEnd.value)
        const start = timeToSeconds(form.value.hourStart);
        const end = timeToSeconds(translatedHourEnd.value);
        // not valid, reset
        console.log("333333333333333333333333", start, end, start >= end)
        if(start >= end){
            if(!hourEndWasEdited){
                form.value.hourEnd = dayjs(formValuesDateStart.value.getTime() + formTimeStep.value).format(timeFormatHours);
            }else{
                form.value.hourStart = dayjs(formValuesDateEnd.value.getTime() - formTimeStep.value).format(timeFormatHours);
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

        const {
            dateObject,
            hourStartObject,
            hourEndObject
        } = getFirstTimeAvailable(start, end, formTimeStep.value);

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

        // TODO VALIDATE
        console.log("VALIDATE")
    };












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
     * Check if an existent event was changed
     */
    watch(watcherHelperForm, (newData, oldData) => {
        console.log("11111111111111111111111")
        const { scheduleId :newScheduleId, date: newDate, hourEnd: newHourEnd, hourStart: newHourStart, temporaryFillFormFlag: newFlag } = newData;
        const { scheduleId :oldScheduleId, date: oldDate, hourEnd: oldHourEnd, hourStart: oldHourStart, temporaryFillFormFlag: oldFlag } = oldData;
        // TODO TEMPORARY FIX, se i flag sono diversi allora è stato attivato fillForm e quindi è stato richiamato 2 volte il watcher
        if(newFlag !== oldFlag){
            return;
        }
        // if hours changed
        if(newHourStart !== oldHourStart || newHourEnd !== oldHourEnd){
            resetFormHours(newHourEnd !== oldHourEnd)
        }
        // schedule not selected, nothing to edit
        if(!selectedSchedule.value){
            return;
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
        // editSchedule();
        console.log("EEEEEEEEEEDIT SCHEDULE")
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
        scheduleRecords,
        scheduleTimeStep,
        translatedHourEnd,
        selectedSchedule,
        formScheduleAvailability,
        selectedFormDuration,
        resetFormHours,
        fillForm,
        formatInputTypeDate,
        formatInputTypeTime,
        formRules,
        timeFormatDate,
        timeFormatHours
    }
}