import { GetterTree } from 'vuex';
import { stateRootMap, stateEcommerceMap } from '@/interfaces';

/**
 * TODO temporary
 *
 * @param date
 */
function getEventDateTemp(date :Date){
    const tempDate = new Date(date.getTime() - (date.getTimezoneOffset()*60*1000))
    // TODO error management?
    return tempDate.toISOString().split('T')[0]
}

export default {

    /**
     * schedule JOIN users
     * TODO generic function guebbit-javascript-library
     *
     * @param {Object[]} scheduleList
     * @param {Object[]} users
     * @param {Function} getters
     * @param {Object} rootState
     * @param {Object} rootGetters
     * @return {Object[]}
     */
    scheduleDetailedList: ({ scheduleList, users } :stateEcommerceMap, getters, rootState, rootGetters) => {
        const scheduleArray = Object.values(scheduleList);
        const fullCalendarScheduleArray = [];
        let i;

        for(i = scheduleArray.length; i--; ){
            // get used seconds
            console.log("1111111", getEventDateTemp(new Date(scheduleArray[i].start)), getEventDateTemp(new Date(scheduleArray[i].end)), scheduleArray[i].end - scheduleArray[i].start)
            // push event in calendar
            fullCalendarScheduleArray.push({
                ...users[scheduleArray[i].userId] || {},
                ...scheduleArray[i],
                className: 'regular-schedule'
            });
        }

        console.log("222222", rootGetters['main/businessSeconds'])
        // calculate remaining seconds
        // TODO possible more days
        // getEventDateTemp(new Date(scheduleArray[i].start)


        // contare secondi totali businesshours giornaliere e
        // moltiplicare per il numero di postazioni =
        // secondi totali che possiamo affittare
        // sottrarre secondi di tutti gli eventi in corso, otteniamo il tempo libero "at glance" per ogni giorno
        fullCalendarScheduleArray.push({
            start: '2022-05-12',
            // end: '2022-05-12',
            display: 'background',
            overlap: false,
            editable: false,
            className: 'day-capacity-indicator',
            color: 'red',   // green, yellow, red (crowded). grey = disabled
        })

        return fullCalendarScheduleArray;
    },
    
    /**
     * id
     *
     * @param {BusinessHoursMap} businessHours
     * @param {Object} getters
     * @param {string} currentUserId
     */
    /*
    userEvents: ({ scheduleList }: stateEcommerceMap, getters, { user: { userInfo: { id :currentUserId}}}) :string[] => {
        const userOwnedEvents :string[] = [];
        Object.values(scheduleList).reduce((reducer, { id, userId }) => {
            if (userId === currentUserId) {
                userOwnedEvents.push(id);
            }
            return reducer;
        }, []);

        return userOwnedEvents;
    },
    */

    /**
     * get item or leaf by id of state
     * TODO root getter?
     *
     * @param {Object} state
     */
    getItem: (state: stateEcommerceMap) => {

        /**
         * @param {string} branch
         * @param {string} id
         */
        return (branch :keyof stateEcommerceMap, id :string) => {
            if(!Object.prototype.hasOwnProperty.call(state, branch) || !Object.prototype.hasOwnProperty.call(state[branch], id)){
                return undefined;
            }
            return state[branch][id]
        }
    },

} as GetterTree<stateEcommerceMap, stateRootMap>;