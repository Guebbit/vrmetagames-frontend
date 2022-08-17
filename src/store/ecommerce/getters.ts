import dayjs from "dayjs";
import { arrayColumns, rangeOverlaps } from "guebbit-javascript-library";

import type { GetterTree } from 'vuex';
import type {
    stateRootMap,
    stateEcommerceMap,
    scheduleMap
} from "@/interfaces";


export default {

    /**
     * Time for schedules to be automatically editable/removable without asking permission to administrator
     *
     * @param {number} scheduleTimeStep - milliseconds
     * @param {number} scheduleEditableSteps - steps
     */
    scheduleEditableTime: ({ scheduleTimeStep, scheduleEditableSteps } :stateEcommerceMap) => scheduleTimeStep * scheduleEditableSteps,

    /**
     * Time for schedules to be counted as "imminent" (UI only for now)
     *
     * @param {number} scheduleTimeStep - milliseconds
     * @param {number} scheduleEditableSteps - steps
     */
    scheduleImminentTime: ({ scheduleTimeStep, scheduleImminentSteps } :stateEcommerceMap) => scheduleTimeStep * scheduleImminentSteps,

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
                end: day,
                display: 'background',
                className: 'day-capacity-indicator ' + capacityClass
            })
        }
        // list of schedule for fullcalendar
        return fullCalendarScheduleArray;
    },

    /**
     * Schedule owned by user
     *
     * @param {BusinessHoursMap} businessHours
     * @param {Object} getters
     * @param {string} currentUserId
     */
    scheduleListUserOwned: ({ scheduleRecords }: stateEcommerceMap, getters, { user: { userInfo: { id :currentUserId}}}) :scheduleMap[] =>
        Object.values(scheduleRecords).filter(({ userId }) => userId === currentUserId),
    /*
    const userOwnedEvents :scheduleMap[] = [];
    Object.values(scheduleRecords).reduce((reducer, item) => {
        if (item.userId === currentUserId)
            userOwnedEvents.push(item);
        return reducer;
    }, [] as scheduleMap[]);
    return userOwnedEvents;
    */


    /**
     * Get list of OFFLINE OR UNSAVED schedules
     *
     * @param {Object} scheduleRecords
     */
    /*
    scheduleListOffline: ({ scheduleRecords }: stateEcommerceMap) :scheduleMap[] => 
        Object.values(scheduleRecords).filter(({ online = true, unsaved = false }) => !online || unsaved
    ),
    */

    /**
     * For ALL users
     * Get list of ONHOLD (NOT CONFIRMED NOR PAID) schedules
     * (confirmed can be awaiting payment, paid MUST be confirmed)
     * Can be ONLINE or OFFLINE
     *
     * Must use scheduleListCartTotal because userId can be undefined and scheduleListUserOwned would filter it out
     *
     * @param {Object} scheduleRecords
     */
    scheduleListCartTotal: ({ scheduleRecords }: stateEcommerceMap) :scheduleMap[] =>
        Object.values(scheduleRecords).filter(({ confirmed = true, paid = true } :scheduleMap) => !confirmed && !paid),


    /**
     * Same as above, but for CURRENT user
     * Must use scheduleListCartTotal because userId can be undefined and scheduleListUserOwned would filter it out
     *
     * @param {Object} context
     * @param {Object[]} scheduleListCartTotal
     * @param {string} currentUserId
     */
    scheduleListCartUser: (context: stateEcommerceMap, { scheduleListCartTotal }, { user: { userInfo: { id :currentUserId}}}) :scheduleMap[] =>
        scheduleListCartTotal.filter(({ id, userId } :scheduleMap) => !userId || currentUserId === userId),

    /**
     * Get list of FUTURE schedules
     * They MUST be PAID (therefore confirmed) because otherwise they are in the cart (scheduleListCartUser)
     *
     * @param {Object} context
     * @param {Object[]} scheduleListUserOwned
     */
    scheduleListIncomingUser: (context: stateEcommerceMap, { scheduleListUserOwned }) :scheduleMap[] =>
        scheduleListUserOwned.filter(({ paid = true, start } :scheduleMap) => paid && start > Date.now()), // && confirmed),

    /**
     * Same as above, but for ALL users
     *
     * @param {Object} scheduleRecords
     */
    scheduleListIncomingTotal: ({ scheduleRecords }: stateEcommerceMap) :scheduleMap[] =>
        Object.values(scheduleRecords).filter(({ paid = true, start } :scheduleMap) => paid && start > Date.now()), // && confirmed),


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
     * Calculate the step cost, applying every offer and discount
     * WARNING: Discount applied BEFORE the user wallet subtraction. That means that wallet fill discounts are DIFFERENT and SEPARATED
     *
     * @param {number} scheduleTimeCost
     */
    getStepCost: ({ scheduleTimeCost }: stateEcommerceMap) :(steps :number) => number => {
        /**
         * @param {number} steps - number of steps
         * @return {number} cost of all steps (discounts applied)
         */
        return (steps = 0) :number => {
            let totalCost = 0;
            // for every discounted amount
            const leftoverSteps = Object.keys(scheduleTimeCost).reduce((total, stepString) :number => {
                const step = parseInt(stepString);
                // how many times the discounted amount is present in the total of steps
                const stepDiscounted = Math.floor(total / step);
                // if step = 0 then it's the default (and obviously can't be used in a division)
                if(step > 0 && stepDiscounted > 0){
                    // add the total discounted cost
                    totalCost += stepDiscounted * scheduleTimeCost[step];
                    // remove the quantity of steps that got discounted
                    return total % step;
                }
                // in the end, only the non-discountable amount of steps will remain
                return total;
                // total steps:
            }, steps);
            // remaining steps with standard price
            return totalCost + (leftoverSteps * scheduleTimeCost[0]);
        }
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
         * @param {string[]} resourceIdArray
         */
        return (dateFrom :number, dateTo :number, resourceIdArray :string[] = []) => {
            let scheduleList = Object.values(scheduleRecords);
            // if a resource was specified, I check only the schedules of that same resource
            if(resourceIdArray.length > 0){
                scheduleList = scheduleList.filter(({ resourceId } :scheduleMap) => {
                    return resourceId && resourceIdArray.some(r=> resourceId.indexOf(r) >= 0);
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
    getSchedulesBySlots: ({ scheduleTimeStep }: stateEcommerceMap, { getSchedulesByTime }) :(dateFrom :number, dateTo :number, slotDuration ?:number, resourceIdArray ?:string[]) => Record<string, string[]> => {

        /**
         * @param {number} dateFrom
         * @param {number} dateTo
         * @param {number} slotDuration - default 30 min
         * @param {string[]} resourceIdArray
         * @return {boolean}
         */
        return (dateFrom :number, dateTo :number, slotDuration = scheduleTimeStep, resourceIdArray :string[] = []) :Record<string, string[]> => {
            // if even only 1 time slot in higher than eventNumberLimit, it fails
            // from start to end step by step
            let stepperStart = dateFrom;
            let stepperEnd = stepperStart + slotDuration;
            const cappedSlots :Record<string, string[]> = {};
            // do cycle
            do {
                cappedSlots[stepperStart + '_' + stepperEnd] = arrayColumns(getSchedulesByTime(stepperStart, stepperEnd, resourceIdArray), 'id');
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
     * @param {string} currentUserId
     * @param {boolean} isAdmin
     * @return {Function<boolean>}
     */
    determineScheduleIsEditable: ({ scheduleRecords }: stateEcommerceMap, { scheduleEditableTime }, { user: { userInfo: { id :currentUserId, isAdmin }}}) => {

        /**
         * @param {string} id
         * @return {boolean}
         */
        return (id :string) :string[] => {
            if(!Object.prototype.hasOwnProperty.call(scheduleRecords, id)){
                return ['error-404'];
            }
            const errorArray :string[] = [];
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
            // return all errors
            return errorArray;
        }
    },

    /**
     * Same as above but optimized to be fast. Return boolean and doesn't care about errors
     *
     * @param {Object} scheduleRecords
     * @param {number} scheduleEditableTime
     * @param {string} currentUserId
     * @param {boolean} isAdmin
     * @return {Function<boolean>}
     */
    checkScheduleIsEditable: ({ scheduleRecords }: stateEcommerceMap, { scheduleEditableTime }, { user: { userInfo: { id :currentUserId, isAdmin }}}) => {
        return (id :string) :boolean => {
            if(!Object.prototype.hasOwnProperty.call(scheduleRecords, id)){
                return false;
            }
            const { start, userId } = scheduleRecords[id];
            return !(!isAdmin && currentUserId !== userId ||
                !isAdmin && start < Date.now() ||
                !isAdmin && start + scheduleEditableTime >= Date.now());
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
    determineScheduleIsAllowed: ({ scheduleTimeStep }: stateEcommerceMap, { getSchedulesBySlots, totalStations }, rootState, rootGetters) => {
        /**
         * @param {number} dateFrom
         * @param {number} dateTo
         * @param {string} id - id of event, to filter away while counting (would be counted 2 times)
         * @param {string[]} resourceIdArray
         */
        return (dateFrom ?:number, dateTo ?:number, id ?:string, resourceIdArray :string[] = []) :string[] => {
            const errorArray :string[] = [];
            // ----- businessHours check -----
            if(!rootGetters['main/isOpen'](dateFrom) || !rootGetters['main/isOpen'](dateTo))
                errorArray.push('closed');
            // ----- schedule limit check -----
            const cappedSlots :string[][] = Object.values(getSchedulesBySlots(dateFrom, dateTo, scheduleTimeStep, resourceIdArray));
            if(
                cappedSlots.some((idArray :string[]) => {
                    // TODO different stations with different possible games
                    return idArray.length - (id && idArray.includes(id) ? 1 : 0) >= totalStations['global']
                })
            )
                errorArray.push('max-reached');
            // result
            return errorArray;
        }
    },
    /**
     * Same as above but optimized to be fast. Return boolean and doesn't care about errors
     */
    checkScheduleIsAllowed: ({ scheduleTimeStep }: stateEcommerceMap, { getSchedulesBySlots, totalStations }, rootState, rootGetters) => {
        return (dateFrom ?:number, dateTo ?:number, id ?:string, resourceIdArray :string[] = []) :boolean => {
            // ----- businessHours check -----
            if(!rootGetters['main/isOpen'](dateFrom) || !rootGetters['main/isOpen'](dateTo))
                return false;
            // ----- schedule limit check -----
            const cappedSlots :string[][] = Object.values(getSchedulesBySlots(dateFrom, dateTo, scheduleTimeStep, resourceIdArray));
            return !cappedSlots.some((idArray: string[]) => {
                // TODO different stations with different possible games
                return idArray.length - (id && idArray.includes(id) ? 1 : 0) >= totalStations['global']
            });
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
        return (branch :keyof stateEcommerceMap, id :string | number) => {
            if(!Object.prototype.hasOwnProperty.call(state, branch) || !Object.prototype.hasOwnProperty.call(state[branch], id)){
                return undefined;
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return state[branch][id]
        }
    },

} as GetterTree<stateEcommerceMap, stateRootMap>;