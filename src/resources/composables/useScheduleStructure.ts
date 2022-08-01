import { toRefs } from "vue";
import { useStore } from "@/store";
import dayjs from "dayjs";


/**getFirstTimeAvailable
 * Mix of useful schedule-related functions
 */
export default () => {
    const { state, getters } = useStore();
    const { businessHours } = toRefs(state.main);

    /**
     * Get first time available
     *
     * Ho la data di inizio, di fine e lo step
     * TODO sarebbe meglio farlo con solo data di inizio, step ed eventualmente "tempo desiderato"
     *
     *
     * @param {number} start
     * @param {number} end
     * @param {number} step
     */
    const getFirstTimeAvailable = (start ?:number, end ?:number, step = 18000) :any => {

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
        if(getters['ecommerce/checkScheduleIsAllowed'](hourStartObject.valueOf(), hourEndObject.valueOf()).includes('closed')){
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
            hourEndObject = dayjs(hourStartObject.valueOf() + step)
            // if it would be closed, then set the maximum time possible for the day
            if(getters['ecommerce/checkScheduleIsAllowed'](hourStartObject.valueOf(), hourEndObject.valueOf()).includes('closed')){
                hourEndObject = hourEndObject.set('hour', parseInt(hourEndToday)).set('minute', parseInt(minuteEndToday));
            }
        }

        // ending values
        return {
            dateObject,
            hourStartObject,
            hourEndObject
        }
    }


    return {
        getFirstTimeAvailable
    }
};