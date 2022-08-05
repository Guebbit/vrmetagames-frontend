import dayjs from "dayjs";
import { arrayColumn, rangeOverlaps, secondsToTime } from "guebbit-javascript-library";
import { uiFormatDate, uiFormatTime } from "@/resources/constants";

import type { GetterTree } from 'vuex';
import type {
    stateRootMap,
    stateEcommerceMap,
    scheduleMap
} from "@/interfaces";


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
                end: day,
                display: 'background',
                className: 'day-capacity-indicator ' + capacityClass
            })
        }
        // list of schedule for fullcalendar
        return fullCalendarScheduleArray;
    },

    /**
     * Get list of OFFLINE OR UNSAVED schedules
     *
     * @param {Object} scheduleRecords
     */
    scheduleListOffline: ({ scheduleRecords }: stateEcommerceMap) :scheduleMap[] => {
        return Object.values(scheduleRecords).filter(({ online = true, unsaved = false }) => {
            return !online || unsaved;
        });
    },

    /**
     * Get list of ONHOLD (NOT CONFIRMED) schedules
     * Can be ONLINE or OFFLINE
     *
     * @param {Object} scheduleRecords
     */
    scheduleListCart: ({ scheduleRecords }: stateEcommerceMap) :scheduleMap[] => {
        return Object.values(scheduleRecords).filter(({ confirmed = true }) => {
            return !confirmed;
        });
    },


    /**
     * TODO funzione con ID dato
     *
     * @param {BusinessHoursMap} businessHours
     * @param {Object} getters
     * @param {string} currentUserId
     */
    /*
    scheduleUserList: ({ scheduleRecords }: stateEcommerceMap, getters, { user: { userInfo: { id :currentUserId}}}) :string[] => {
        const userOwnedEvents :string[] = [];
        Object.values(scheduleRecords).reduce((reducer, { id, userId }) => {
            if (userId === currentUserId) {
                userOwnedEvents.push(id);
            }
            return reducer;
        }, [] as string[]);

        return userOwnedEvents;
    },
    */


    /**
     * REAL cart COST
     * AFTER base discounts (many step special pack discounts)
     *
     * @param {object} state
     * @param {object[]} scheduleListCart
     * @param {Function} getScheduleTotalCostDiscounted
     * @return {number}
     */
    scheduleCartTotalCostDiscounted(state :stateEcommerceMap, { scheduleListCart, getScheduleTotalCostDiscounted }) :number {
        return getScheduleTotalCostDiscounted(
            (scheduleListCart as scheduleMap[]).reduce((idArray, { id }) => {
                idArray.push(id)
                return idArray;
            }, [] as string[])
        ) / 100
    },


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
     * Sum the TIME of selected schedules
     *
     * @param {Object} scheduleRecords
     * @return {boolean}
     */
    getScheduleTotalTime: ({ scheduleRecords }: stateEcommerceMap) :(idArray :string[]) => number => {
        /**
         * @param {string[]} idArray - schedule id array
         * @return {number}
         */
        return (idArray :string[] = []) :number => {
            // no items = 0 time
            if(idArray.length === 0){
                return 0;
            }
            return Object.values(scheduleRecords).reduce((total, { id, start, end }) :number => {
                return idArray.includes(id) ? total + (end - start) : total;
            }, 0);
        }
    },

    /**
     * Sum the STEPS of selected schedules
     *
     * @param {number} scheduleTimeStep
     * @param {Function} getScheduleTotalTime
     * @return {boolean}
     */
    getScheduleTotalSteps: ({ scheduleTimeStep }: stateEcommerceMap, { getScheduleTotalTime }) :(idArray :string[]) => number => {
        /**
         * @param {string[]} idArray - schedule id array
         * @return {number}
         */
        return (idArray :string[] = []) :number => getScheduleTotalTime(idArray) / scheduleTimeStep;
    },

    /**
     * Sum the COST of selected schedules
     *
     * @param {number} scheduleTimeCost
     * @param {Function} getScheduleTotalSteps
     */
    getScheduleTotalCost: ({ scheduleTimeCost }: stateEcommerceMap, { getScheduleTotalSteps }) :(idArray :string[]) => number => {
        /**
         * @param {string[]} idArray - schedule id array
         * @return {number} - total steps * default time cost per step
         */
        return (idArray :string[] = []) :number => getScheduleTotalSteps(idArray) * scheduleTimeCost[0];
    },


    /**
     * Sum the COST of selected schedules
     * WARNING: Discount applied BEFORE the user wallet subtraction. That means that wallet fill discounts are DIFFERENT and SEPARATED
     *
     * @param {number} scheduleTimeCost
     * @param {Function} getScheduleTotalSteps
     */
    getScheduleTotalCostDiscounted: ({ scheduleTimeCost }: stateEcommerceMap, { getScheduleTotalSteps }) :(idArray :string[]) => number => {
        /**
         * @param {string[]} idArray - schedule id array
         * @return {number}
         */
        return (idArray :string[] = []) :number => {
            let totalCost = 0;
            // no items = 0 cost
            if(idArray.length === 0){
                return 0;
            }
            // for every discounted amount
            const leftoverSteps = Object.keys(scheduleTimeCost).reduce((total, step) :number => {
                const stepInt = parseInt(step);
                // how many times the discounted amount is present in the total of steps
                const stepDiscounted = Math.floor(total / stepInt);
                // if step = 0 then it's the default (and obviously can't be used in a division)
                if(stepInt > 0 && stepDiscounted > 0){
                    // add the total discounted cost
                    totalCost += stepDiscounted * scheduleTimeCost[stepInt];
                    // remove the quantity of steps that got discounted
                    return total % stepInt;
                }
                // in the end, only the non-discountable amount of steps will remain
                return total;
                // total steps:
            }, getScheduleTotalSteps(idArray));
            // remaining steps with standard price
            totalCost += leftoverSteps * scheduleTimeCost[0]
            // discounted total
            return totalCost;
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
    getSchedulesBySlots: ({ scheduleTimeStep }: stateEcommerceMap, { getSchedulesByTime }) :(dateFrom :number, dateTo :number, slotDuration ?:number, checkResourceId ?:string) => Record<string, string[]> => {

        /**
         * @param {number} dateFrom
         * @param {number} dateTo
         * @param {number} slotDuration - default 30 min
         * @param {string} checkResourceId
         * @return {boolean}
         */
        return (dateFrom :number, dateTo :number, slotDuration = scheduleTimeStep, checkResourceId ?:string) :Record<string, string[]> => {
            // if even only 1 time slot in higher than eventNumberLimit, it fails
            // from start to end step by step
            let stepperStart = dateFrom;
            let stepperEnd = stepperStart + slotDuration;
            const cappedSlots :Record<string, string[]> = {};
            // do cycle
            do {
                cappedSlots[stepperStart + '_' + stepperEnd] = arrayColumn(getSchedulesByTime(stepperStart, stepperEnd, checkResourceId), 'id') as string[];
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
    determineScheduleIsEditable: ({ scheduleRecords, scheduleEditableTime }: stateEcommerceMap, getters, { user: { userInfo: { id :currentUserId, isAdmin }}}) => {

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
            // return all errors
            return errorArray;
        }
    },
    /**
     * Same as above but optimized to be fast. Return boolean and doesn't care about errors
     */
    checkScheduleIsEditable: ({ scheduleRecords, scheduleEditableTime }: stateEcommerceMap, getters, { user: { userInfo: { id :currentUserId, isAdmin }}}) => {
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
         * @param {string} checkResourceId
         */
        return (dateFrom ?:number, dateTo ?:number, id ?:string, checkResourceId ?:string) :string[] => {
            const errorArray :string[] = [];
            // ----- businessHours check -----
            if(!rootGetters['main/isOpen'](dateFrom) || !rootGetters['main/isOpen'](dateTo))
                errorArray.push('closed');
            // ----- schedule limit check -----
            const cappedSlots :string[][] = Object.values(getSchedulesBySlots(dateFrom, dateTo, scheduleTimeStep, checkResourceId));
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
        return (dateFrom ?:number, dateTo ?:number, id ?:string, checkResourceId ?:string) :boolean => {
            // ----- businessHours check -----
            if(!rootGetters['main/isOpen'](dateFrom) || !rootGetters['main/isOpen'](dateTo))
                return false;
            // ----- schedule limit check -----
            const cappedSlots :string[][] = Object.values(getSchedulesBySlots(dateFrom, dateTo, scheduleTimeStep, checkResourceId));
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