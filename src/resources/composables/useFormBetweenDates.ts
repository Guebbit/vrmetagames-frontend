import { computed, type ComputedRef } from "vue";
import useTimeHelpers from "@/resources/composables/useTimeHelpers";
import { timeFormatDate, timeFormatHours } from "@/resources/constants";

/**
 *
 */
export default (date :ComputedRef<string | undefined>, start :ComputedRef<string | undefined>, end :ComputedRef<string | undefined>) => {

    /**
     *
     */
    const {
        translateToDate
    } = useTimeHelpers(timeFormatDate + ' ' + timeFormatHours);

    /**
     * Form Hour End TRANSLATION
     * hourEnd 00.00 is considered 24.00
     * hourStart 00.00 is considered 00.00 so no need to translate
     *
     * @return {string | undefined}
     */
    const translatedHourEnd = computed<string | undefined>(() => {
        console.log("000000000000", date.value, start.value, end.value)
        return end.value === '00:00' ? '24:00' : end.value;
    });

    /**
     * Date object of form START date
     *
     * @return {Date}
     */
    const formValuesDateStart = computed<Date>(() => translateToDate(date.value + ' ' + start.value) || new Date());

    /**
     * Date object of form END date
     *
     * @return {Date}
     */
    const formValuesDateEnd = computed<Date>(() => translateToDate(date.value + ' ' + translatedHourEnd.value) || new Date());



    return {
        translatedHourEnd,
        formValuesDateStart,
        formValuesDateEnd,
    };
}
