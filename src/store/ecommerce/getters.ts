import dayjs from "dayjs";

import type { GetterTree } from 'vuex';
import type { stateRootMap, stateEcommerceMap, scheduleMap } from "@/interfaces";

export default {

    /**
     * schedule JOIN users
     * TODO generic function guebbit-javascript-library
     *
     * @param {Object[]} scheduleRecords
     * @param {Object[]} users
     * @param {Object[]} stations
     * @param {Function} getters
     * @param {Object} rootState
     * @param {Object} rootGetters
     * @return {Object[]}
     */
    // TODO admin can see all events (opacity 0.8 su tutti gli eventi non-admin?)
    // TODO normal user can see only his events (with multiple random colors) and other users events are greyed out
    // TODO separare in multipli
    scheduleDetailedList: ({ scheduleRecords, users, stations } :stateEcommerceMap, getters, rootState, rootGetters) => {
        // stations
        let i, k;
        const scheduleArray = Object.values(scheduleRecords);
        const stationsArray = Object.values(stations);
        const fullCalendarScheduleArray = [];
        const businessSeconds = rootGetters['main/businessSeconds'];
        const businessAvailableTime = [];
        const dateRecords :Record<string, number[]> = {};

        // calculate the total seconds available on a business day
        for(i = businessSeconds.length; i--; ){
            businessAvailableTime[i] = 0;
            for(k = stationsArray.length; k--; ){
                // multiply for total stations
                // TODO different stations with different possible games
                businessAvailableTime[i] += businessSeconds[i] * stationsArray[k].capacity;
            }
        }

        // calculate the event seconds, grouped daily
        for(i = scheduleArray.length; i--; ){
            // push event in calendar
            fullCalendarScheduleArray.push({
                ...users[scheduleArray[i].userId] || {},
                ...scheduleArray[i],
                className: 'regular-schedule'
            });
            // SAME DAY (WARNING: -1 second to .end to have 23.59.59 and not the 00 of the day after)
            if(new Date(scheduleArray[i].start).toDateString() === new Date(scheduleArray[i].end - 1).toDateString()){
                const day = dayjs(scheduleArray[i].start).format('YYYY-MM-DD');
                let seconds = scheduleArray[i].end - scheduleArray[i].start;
                // if there was already data in there, SUM
                if(Object.prototype.hasOwnProperty.call(dateRecords, day)){
                    seconds += dateRecords[day][1];
                }
                // get used seconds
                dateRecords[day] = [new Date(scheduleArray[i].start).getDay(), seconds];
            }else{
                console.error("Splittare nei 2 giorni diversi, tenendo conto dei businessHours", dayjs(scheduleArray[i].start).format('YYYY-MM-DD'), dayjs(scheduleArray[i].end).format('YYYY-MM-DD'))
            }
        }

        // business day total seconds - event seconds = remaining business day seconds (that can be rented)
        for (const day in dateRecords) {
            if(!Object.prototype.hasOwnProperty.call(dateRecords, day)){
                continue;
            }
            const [ weekday, seconds ] = dateRecords[day];
            // calculate remaining seconds (percentage)
            const remainingTimePercentage = (seconds / businessSeconds[weekday]) * 100;
            console.log("AAAAAAAAA", seconds / 10000, businessSeconds[weekday] / 10000, seconds / businessSeconds[weekday])
            let capacityClass = 'capacity-disabled';
            switch (true){
                case remainingTimePercentage < 25:
                    capacityClass = 'capacity-green';
                    break;
                case remainingTimePercentage < 50:
                    capacityClass = 'capacity-yellow';
                    break;
                case remainingTimePercentage < 75:
                    capacityClass = 'capacity-orange';
                    break;
                case remainingTimePercentage < 100:
                    capacityClass = 'capacity-red';
                    break;
            }
            console.log("444444444444", day, remainingTimePercentage);
            fullCalendarScheduleArray.push({
                start: day,
                // end: day,
                display: 'background',
                overlap: false,
                editable: false,
                className: 'day-capacity-indicator ' + capacityClass
            })
        }

        return fullCalendarScheduleArray;
    },

    /**
     * Get list of OFFLINE schedules
     *
     * @param {Object} scheduleRecords
     */
    schedulesOffline: ({ scheduleRecords }: stateEcommerceMap) :scheduleMap[] => {
        return Object.values(scheduleRecords).filter(({ online = true }) => {
            return !online;
        });
    },

    /**
     * Get list of ONHOLD (NOT CONFIRMED) schedules
     *
     * @param {Object} scheduleRecords
     */
    schedulesOnHold: ({ scheduleRecords }: stateEcommerceMap) :scheduleMap[] => {
        return Object.values(scheduleRecords).filter(({ confirmed = true }) => {
            return !confirmed;
        });
    },

    /**
     * Get list of CANCELED schedules
     *
     * @param {Object} scheduleRecords
     */
    schedulesCanceled: ({ scheduleRecords }: stateEcommerceMap) :scheduleMap[] => {
        return Object.values(scheduleRecords).filter(({ canceled = false }) => {
            return canceled;
        });
    },

    /**
     * Get list of CANCELED schedules
     *
     * @param {Object} scheduleRecords
     */
    schedulesUnsaved: ({ scheduleRecords }: stateEcommerceMap) :scheduleMap[] => {
        return Object.values(scheduleRecords).filter(({ unsaved = false }) => {
            return unsaved;
        });
    },

    /**
     * id
     *
     * @param {Object} scheduleRecords
     * @param {number} scheduleEditableTime
     * @param {Object} getters
     * @param {string} currentUserId
     * @param {boolean} isAdmin
     * @return {Function<boolean>}
     */
    scheduleIsEditable: ({ scheduleRecords, scheduleEditableTime }: stateEcommerceMap, getters, { user: { userInfo: { id :currentUserId, isAdmin }}}) => {
        /**
         * @param {string} id
         * @return {boolean}
         */
        return (id :string) :boolean => {
            if(!Object.prototype.hasOwnProperty.call(scheduleRecords, id)){
                return false;
            }
            const { start, userId } = scheduleRecords[id];
                // Edit schedule only if current user OR it's admin
            return !(currentUserId !== userId && !isAdmin) ||
                // Event is in the past. edit time expired
                !(start < Date.now() && !isAdmin) ||
                // event can be edited only until 1 hour from the start, edit time expired
                !(start + scheduleEditableTime >= Date.now());
        }
    },

    /**
     * id
     *
     * @param {BusinessHoursMap} businessHours
     * @param {Object} getters
     * @param {string} currentUserId
     */
    /*
    userEvents: ({ scheduleRecords }: stateEcommerceMap, getters, { user: { userInfo: { id :currentUserId}}}) :string[] => {
        const userOwnedEvents :string[] = [];
        Object.values(scheduleRecords).reduce((reducer, { id, userId }) => {
            if (userId === currentUserId) {
                userOwnedEvents.push(id);
            }
            return reducer;
        }, []);

        return userOwnedEvents;
    },
    */

    /**
     * Total number of stations
     * WARNING: different stations can have different characteristics, it's ok only for "all around games"
     * or if all stations are of the same type
     *
     * @param {object[]} stations
     * @return {number}
     */
    totalStations({ stations } :stateEcommerceMap){
        return Object.values(stations).reduce((total, { capacity = 0 }) => {
            return total + capacity;
        }, 0);
    },

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
        return (branch :string, id :string | number) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if(!Object.prototype.hasOwnProperty.call(state, branch) || !Object.prototype.hasOwnProperty.call(state[branch], id)){
                return undefined;
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return state[branch][id]
        }
    },

} as GetterTree<stateEcommerceMap, stateRootMap>;