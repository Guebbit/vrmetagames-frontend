import { secondsToTime } from "guebbit-javascript-library";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { scheduleReadableMap } from "@/resources/composables/useScheduleHelpers";
dayjs.extend(customParseFormat);

export default (fromDatetime = 'YYYY-MM-DD HH:mm:ss', toDatetime = 'YYYY-MM-DD HH:mm:ss') => {

    /**
     * timestamp to formatted date and viceversa
     *
     * @param {number} timestamp
     * @param {string} dateTimeFormat - format
     * @return {string}
     */
    const translateTimestampToString = (timestamp ?:number, dateTimeFormat = fromDatetime) :string =>
        dayjs(timestamp).format(dateTimeFormat);
    // viceversa
    const translateStringToTimestamp = (stringDate = '', dateTimeFormat = fromDatetime) :number =>{
        const dateObject = dayjs(stringDate, dateTimeFormat);
        if(!dateObject.isValid())
            return 0;
        return dateObject.valueOf();
    };

    /**
     * Easy conversion from string to date and viceversa
     *
     * @param {string} stringDate
     * @param {string} dateTimeFormat
     */
    const translateStringToDate = (stringDate = '', dateTimeFormat = fromDatetime) :Date | null =>
        new Date(translateStringToTimestamp(stringDate, dateTimeFormat));
    // viceversa
    const translateDateToString = (dateObject = new Date(), dateTimeFormat = fromDatetime) :string =>
        translateTimestampToString(dateObject.getTime(), dateTimeFormat);

    /**
     * input type="date" accept only YYYY-MM-DD format, even if it shows another format,
     * so it needs to be translated.
     *
     * @param {string} value
     * @param {string} formatTo - format
     * @param {string} formatFrom - format
     * @return {string}
     */
    const formatInputTypeDate = (value :string, formatTo = fromDatetime, formatFrom = toDatetime) :string =>
        dayjs(value, formatFrom).format(formatTo);

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

    /**
     * Get human readable time from milliseconds
     *
     * @param {number} milliseconds
     */
    const translateMillisecondsToReadable = (milliseconds :number) => {
        let mode = 0;
        const { hoursOnly :hours = 0, minutes = 0 } = secondsToTime(milliseconds);
        if(hours === 0 && minutes === 0){
            mode = 1;
        }
        if(hours === 0 && minutes > 0){
            mode = 2;
        }
        if(minutes === 0){
            if(hours === 1){
                mode = 3;
            }
            if(hours > 1){
                mode = 4;
            }
        }else{
            if(hours === 1){
                mode = 5;
            }
            if(hours > 1){
                mode = 6;
            }
        }
        return {
            mode,
            hours,
            minutes,
        }
    };

    return {
        translateTimestampToString,
        translateStringToTimestamp,
        translateStringToDate,
        translateDateToString,
        formatInputTypeDate,
        formatInputTypeTime,
        translateMillisecondsToReadable,
    }
}