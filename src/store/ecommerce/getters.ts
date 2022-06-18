import dayjs from "dayjs";
import { arrayColumn, rangeOverlaps } from "guebbit-javascript-library";

import type { GetterTree } from 'vuex';
import type { stateRootMap, stateEcommerceMap, scheduleMap } from "@/interfaces";


export default {

    /**
     * Schedule list with FE only elaborated data
     *
     * @param {Object[]} scheduleRecords
     * @param {Object[]} users
     * @param {Object[]} stations
     * @param {Object} totalStations
     * @param {Object} rootState
     * @param {Object} rootGetters
     * @return {Object[]}
     */
    // TODO admin can see all events (opacity 0.8 su tutti gli eventi non-admin?)
    // TODO normal user can see only his events (with multiple random colors) and other users events are greyed out
    // TODO separare in multipli
    scheduleDetailedList: ({ scheduleRecords, users } :stateEcommerceMap, { totalStations }, rootState, rootGetters) => {
        // stations
        let i :number;
        const scheduleArray = Object.values(scheduleRecords);
        const fullCalendarScheduleArray = [];
        const businessSeconds = rootGetters['main/businessSeconds'];
        const businessAvailableTime = [];
        const dateRecords :Record<string, number[]> = {};

        // calculate the total seconds available on a business day
        for(i = businessSeconds.length; i--; ){
            // TODO different stations with different possible games
            // multiply for total stations
            businessAvailableTime[i] = businessSeconds[i] * totalStations['global'];
        }

        // calculate the event seconds, grouped daily
        for(i = scheduleArray.length; i--; ){
            // push event in calendar
            fullCalendarScheduleArray.push({
                ...scheduleArray[i],
                user: users?.[scheduleArray[i].userId], // if NOT admin, there will be no user info
                color: users?.[scheduleArray[i].userId]?.color,
                className: 'regular-schedule'
            });
            // SAME DAY
            // TODO WARNING In inserimento via FullCalendar necessito del -1, via form invece è d'intralcio
            if(
                new Date(scheduleArray[i].start).toDateString() === new Date(scheduleArray[i].end - 1).toDateString() ||
                // WARNING: -1 second to .end to have 23.59.59 and not the 00 of the day after
                new Date(scheduleArray[i].start).toDateString() === new Date(scheduleArray[i].end).toDateString()
            ){
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
            const [ weekday, rentedSeconds ] = dateRecords[day];
            // calculate remaining seconds (percentage)
            const remainingTimePercentage = (rentedSeconds / businessAvailableTime[weekday]) * 100;
            // UI color
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
            // finished schedule
            fullCalendarScheduleArray.push({
                start: day,
                // end: day,
                display: 'background',
                className: 'day-capacity-indicator ' + capacityClass
            })
        }
        // list of schedule for fullcalendar
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
     * Since every OFFLINE is ONHOLD by default, I filter them out
     *
     * @param {Object} scheduleRecords
     */
    schedulesOnHold: ({ scheduleRecords }: stateEcommerceMap) :scheduleMap[] => {
        return Object.values(scheduleRecords).filter(({ online = true, confirmed = true }) => {
            return online && !confirmed;
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
     * Get list of UNSAVED schedules
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
     * There can be different stations with different possible games/characteristics/limits
     *
     * @param {object[]} stations
     * @return {number}
     */
    totalStations({ stations } :stateEcommerceMap) :Record<string, number> {
        const stationTypes :Record<string, number> = {};
        stationTypes['global'] = Object.values(stations).reduce((total, { capacity = 0 }) => {
            return total + capacity;
        }, 0);
        // TODO array of types? stationTypes['oculus'] somma di tutte le stations con questa caratteristica? Al posto di capacity
        return stationTypes;
    },

    /**
     * Get all events between 2 dates
     * If resourceId is set, then get only those of that resource
     *
     * @param {Object} scheduleRecords
     * @return {boolean}
     */
    getSchedulesByTime: ({ scheduleRecords }: stateEcommerceMap) => {

        /**
         * @param {number} dateFrom
         * @param {number} dateTo
         * @param {string} checkResourceId
         */
        return (dateFrom :number, dateTo :number, checkResourceId ?:string) => {
            let scheduleList = Object.values(scheduleRecords);
            // if a resource was specified, I check only the schedules of that same resource
            if(checkResourceId){
                scheduleList = scheduleList.filter(({ resourceId } :scheduleMap) => {
                    return checkResourceId === resourceId;
                })
            }

            // main filter 
            return scheduleList.filter(({ start, end } :scheduleMap) => {
                // if null, take today (should never happen, but typescript have warnings)
                const eventStart = start ? start : Date.now();
                // if null, take start (default fullcalendar behaviour)
                const eventEnd = end ? end : eventStart;
                return rangeOverlaps(dateFrom, dateTo, eventStart, eventEnd);
            });
        }
    },

    /**
     * SAME as getSchedulesByTime, but "breaking" the result for every slot
     *
     * @param {number} scheduleTimeStep
     * @param {Function} getSchedulesByTime
     */
    getSchedulesBySlots: ({ scheduleTimeStep }: stateEcommerceMap, { getSchedulesByTime }) => {

        /**
         * @param {number} dateFrom
         * @param {number} dateTo
         * @param {number} slotDuration - default 30 min
         * @param {string} checkResourceId
         * @return {boolean}
         */
        return (dateFrom :number, dateTo :number, slotDuration = scheduleTimeStep, checkResourceId ?:string) => {
            // if even only 1 time slot in higher than eventNumberLimit, it fails
            // from start to end step by step
            let stepperStart = dateFrom;
            let stepperEnd = stepperStart + slotDuration;
            const cappedSlots :Record<string, string[]> = {};
            // do cycle
            do {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                cappedSlots[stepperStart + '_' + stepperEnd] = arrayColumn(getSchedulesByTime(stepperStart, stepperEnd, checkResourceId), 'id');
                // next step, until loading reach END
                stepperStart = stepperStart + slotDuration;
                stepperEnd = stepperEnd + slotDuration;
                // stepper end
            } while (stepperEnd <= dateTo);
            return cappedSlots;
        }
    },

    /**
     * Check if schedule is editable.
     * - Only current user OR Admin
     * - Only schedules in the future (if NOT Admin)
     *
     * @param {Object} scheduleRecords
     * @param {number} scheduleEditableTime
     * @param {Object} getters
     * @param {string} currentUserId
     * @param {boolean} isAdmin
     * @return {Function<boolean>}
     */
    checkScheduleIsEditable: ({ scheduleRecords, scheduleEditableTime }: stateEcommerceMap, getters, { user: { userInfo: { id :currentUserId, isAdmin }}}) :(id: string) => string[] => {

        /**
         * @param {string} id
         * @return {boolean}
         */
        return (id :string) :string[] => {
            const errorArray :string[] = [];
            if(!Object.prototype.hasOwnProperty.call(scheduleRecords, id)){
                errorArray.push('error-404');
            }
            const { start, userId } = scheduleRecords[id];

            // Edit schedule only if current user OR it's admin
            if(!isAdmin && currentUserId !== userId){
                errorArray.push('error-403');
            }
            // Event is in the past. Only admin can edit
            if(!isAdmin && start < Date.now()){
                errorArray.push('error-400-past');
            }
            // Edit time expired, a schedule can be edited only until 1 hour from the start (if NOT admin)
            if(!isAdmin && start + scheduleEditableTime >= Date.now()){
                errorArray.push('error-400-edit-expired');
            }

            return errorArray;
        }
    },

    /**
     * Check if schedule is allowed
     * - businessHours check
     * - schedule limit check
     * - Users CAN book multiple stations
     *
     * @param {number} scheduleTimeStep
     * @param {Function} getSchedulesBySlots
     * @param {Object} totalStations
     * @param {Object} rootState
     * @param {Object} rootGetters
     */
    checkScheduleIsAllowed: ({ scheduleTimeStep }: stateEcommerceMap, { getSchedulesBySlots, totalStations }, rootState, rootGetters) => {

        /**
         * @param {number} dateFrom
         * @param {number} dateTo
         * @param {string} checkResourceId
         */
        return (dateFrom :number, dateTo :number, checkResourceId ?:string) :string[] => {
            const errorArray :string[] = [];

            // ----- businessHours check -----
            if(!rootGetters['main/isOpen'](dateFrom) || !rootGetters['main/isOpen'](dateTo)){
                errorArray.push('closed');
            }

            // ----- schedule limit check -----
            const cappedSlots = Object.values(getSchedulesBySlots(dateFrom, dateTo, scheduleTimeStep, checkResourceId));
            if(
                (cappedSlots as Array<string[]>).some((idArray :string[]) => {
                    // TODO different stations with different possible games
                    return idArray.length >= totalStations['global']
                })
            ){
                errorArray.push('max-reached');
            }

            return errorArray;
        }
    },

    /**
     * UNITE checkScheduleIsEditable AND checkScheduleIsAllowed
     *
     * @param {Object} state
     * @param {Function} checkScheduleIsEditable
     * @param {Function} checkScheduleIsAllowed
     */
    checkScheduleIsEditableAndAllowed: (state: stateEcommerceMap, { checkScheduleIsEditable, checkScheduleIsAllowed }) => {
        /**
         * @param {string} id
         */
        return (id :string, start :number, end :number, resourceId ?:string) :string[] => {
            return [
                ...checkScheduleIsEditable(id),
                ...checkScheduleIsAllowed(start, end, resourceId)
            ]
        }
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