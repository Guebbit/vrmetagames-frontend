import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default (composableDateFormat = 'YYYY-MM-DD HH:mm:ss') => {

    /**
     * Default translation
     *
     * @param {string} stringDate
     * @param {string} dateTimeFormat
     */
    const translateToDate = (stringDate :string, dateTimeFormat = composableDateFormat) :Date | null => {
        const dayObject = dayjs(stringDate, dateTimeFormat);
        if(!dayObject.isValid()){
            return null;
        }
        return dayObject.toDate();
    };

    
    /**
     * input type="date" accept only YYYY-MM-DD format, even if it shows another format,
     * so it needs to be translated.
     *
     * @param {string} value
     * @param {string} formatTo - format
     * @param {string} formatFrom - format
     * @return {string}
     */
    const formatInputTypeDate = (value :string, formatTo = composableDateFormat, formatFrom = composableDateFormat) :string => {
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

    /**
     * timestamp to formatted date
     *
     * @param {number} timestamp
     * @param {string} formatTo - format
     * @return {string}
     */
    const formatUIDate = (timestamp :number, formatTo = composableDateFormat) :string => {
        return dayjs(timestamp).format(formatTo);
    };

    return {
        translateToDate,
        formatInputTypeDate,
        formatInputTypeTime,
        formatUIDate,
    }
}