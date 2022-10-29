import dayjs from "dayjs";
import { arrayColumns, rangeOverlaps } from "guebbit-javascript-library";
import useTimeHelpers from "@/resources/composables/useTimeHelpers";
import { i18n } from "@/plugins/i18n";


import type { GetterTree } from 'vuex';
import type {
    stateRootMap,
    stateEcommerceMap,
    stationMap,
    scheduleMap,
    scheduleMapExtended,
    scheduleMapBackground,
    gameMapExtended,
    infoChunkMap,
} from "@/interfaces";

const { locale } = i18n.global;

const {
    translateMillisecondsToReadable
} = useTimeHelpers();

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
     * Join schedule with users and stations using the IDs
     *
     * @param {Object[]} scheduleRecords
     * @param {Object[]} users
     * @param {Object[]} stations
     * @return {Object[]}
     */
    scheduleDetailedRecords: ({ scheduleRecords, users, stations } :stateEcommerceMap) :Record<string, scheduleMapBackground | scheduleMapExtended> => {
        // regular schedules
        const scheduleArray = Object.values(scheduleRecords);
        // result with advanced schedules
        const extendedRecords :Record<string, scheduleMapBackground | scheduleMapExtended>  = {};
        // joining data
        for(let i = scheduleArray.length; i--; ){
            // I should already have these values
            const user = users?.[scheduleArray[i].userId];
            const station = stations?.[locale]?.[scheduleArray[i].stationId];
            // put event in calendar
            extendedRecords[scheduleArray[i].id] = {
                ...scheduleArray[i],
                // if NOT admin, there will be NO user info
                user,
                // neither user color, they will be all the same
                color: user?.color,
                // stations data
                station,
                className: 'regular-schedule'
            }
        }
        return extendedRecords;
    },

    /**
     * 
     * @param scheduleRecords
     * @param users
     * @param stations
     * @param totalStations
     * @param rootState
     * @param rootGetters
     */
    scheduleCalendarBackgrounds: ({ scheduleRecords } :stateEcommerceMap, { totalStations }, rootState, rootGetters) :scheduleMapBackground[] => {
        // iterator
        let i :number;
        // regular schedules
        const scheduleArray = Object.values(scheduleRecords)
        // final result
        const scheduleBackgrounds :Record<string, scheduleMapBackground> = {};
        // list of all dates inserted in the fullcalendar, necessary to create background-schedules
        const dateRecords :Record<string, number[]> = {};
        // time data for management
        const businessSeconds = rootGetters['main/businessSeconds'];
        const businessAvailableTime = [];

        /**
         * calculate the total seconds available on a business day
         */
        for(i = businessSeconds.length; i--; ){
            // TODO different stations with different possible games
            // multiply for total stations
            businessAvailableTime[i] = businessSeconds[i] * totalStations['global'];
        }

        /**
         * Get dateRecords using the regular schedules
         *  - Calculate the event seconds for the day
         */
        for(let i = scheduleArray.length; i--; ){
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

        /**
         * Background schedules (for FullCalendar)
         * business day total seconds - event seconds = remaining business day seconds (that can be rented)
         */
        for (const day in dateRecords) {
            if(!Object.prototype.hasOwnProperty.call(dateRecords, day))
                continue;
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
            scheduleBackgrounds[day] = {
                start: day,
                end: day,
                display: 'background',
                className: 'day-capacity-indicator ' + capacityClass
            }
        }
        // list of schedule for fullcalendar
        return Object.values(scheduleBackgrounds);
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
        scheduleListCartTotal.filter(({ userId } :scheduleMap) => !userId || currentUserId === userId),

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
        // TODO separare "stations" in "language data" e "technical data"
        stationTypes['global'] = Object.values(stations[locale] || []).reduce((total, { capacity = 0 }) => {
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
    getStepCost: ({ scheduleTimeCost }: stateEcommerceMap) :(steps :number) => number =>
        /**
         * @param {number} steps - number of steps
         * @return {number} cost of all steps (discounts applied)
         */
        (steps = 0) :number => {
            let totalCost = 0;
            const discountedSteps = Object.keys(scheduleTimeCost).reverse();
            // remove default price (0)
            discountedSteps.pop();
            // if no discounts: full price
            if(discountedSteps.length < 1)
                return steps * scheduleTimeCost[0];
            // for every discounted amount
            const leftoverSteps = discountedSteps.reduce((total, thresholdStepString) :number => {
                // threshold
                const thresholdStep = parseInt(thresholdStepString);
                // how many times the discounted amount is present in the total of steps
                const discountedSteps = Math.floor(total / thresholdStep);
                // if step = 0 then it's the default (and obviously can't be used in a division)
                if(thresholdStep > 0 && discountedSteps > 0){
                    // add the total discounted cost
                    totalCost += discountedSteps * scheduleTimeCost[thresholdStep];
                    // remove the quantity of steps that got discounted
                    return total % thresholdStep;
                }
                // in the end, only the non-discountable amount of steps will remain
                return total;
                // total steps:
            }, steps);
            // remaining steps with standard price
            return totalCost + (leftoverSteps * scheduleTimeCost[0]);
        },


    /**
     * Get all events between 2 dates
     * If resourceId is set, then get only those of that resource
     *
     * @param {Object} scheduleRecords
     * @return {boolean}
     */
    getSchedulesByTime: ({ scheduleRecords }: stateEcommerceMap) =>
        /**
         * @param {number} dateFrom
         * @param {number} dateTo
         * @param {string[]} resourceIdArray
         */
        (dateFrom :number, dateTo :number, resourceIdArray :string[] = []) => {
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
        },

    /**
     * SAME as getSchedulesByTime, but "breaking" the result for every slot
     *
     * @param {number} scheduleTimeStep
     * @param {Function} getSchedulesByTime
     */
    getSchedulesBySlots: ({ scheduleTimeStep }: stateEcommerceMap, { getSchedulesByTime }) :(dateFrom :number, dateTo :number, slotDuration ?:number, resourceIdArray ?:string[]) => Record<string, string[]> =>
        /**
         * @param {number} dateFrom
         * @param {number} dateTo
         * @param {number} slotDuration - default 30 min
         * @param {string[]} resourceIdArray
         * @return {boolean}
         */
        (dateFrom :number, dateTo :number, slotDuration = scheduleTimeStep, resourceIdArray :string[] = []) :Record<string, string[]> => {
            // if even only 1 time slot in higher than eventNumberLimit, it fails
            // from start to end step by step
            let stepperStart = dateFrom;
            let stepperEnd = stepperStart + slotDuration;
            const cappedSlots :Record<string, string[]> = {};
            // do cycle
            do {
                cappedSlots[stepperStart + '_' + stepperEnd] = arrayColumns(getSchedulesByTime(stepperStart, stepperEnd, resourceIdArray), 'id') as string[];
                // next step, until loading reach END
                stepperStart = stepperStart + slotDuration;
                stepperEnd = stepperEnd + slotDuration;
                // stepper end
            } while (stepperEnd <= dateTo);
            return cappedSlots;
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
    determineScheduleIsEditable: ({ scheduleRecords }: stateEcommerceMap, { scheduleEditableTime }, { user: { userInfo: { id :currentUserId, isAdmin }}}) =>
        /**
         * @param {string} id
         * @return {boolean}
         */
        (id :string) :string[] => {
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
    checkScheduleIsEditable: ({ scheduleRecords }: stateEcommerceMap, { scheduleEditableTime }, { user: { userInfo: { id :currentUserId, isAdmin }}}) => (id :string) :boolean => {
        if(!Object.prototype.hasOwnProperty.call(scheduleRecords, id))
            return false;
        const { start, userId } = scheduleRecords[id];
        return !(!isAdmin && currentUserId !== userId ||
            !isAdmin && start < Date.now() ||
            !isAdmin && start + scheduleEditableTime >= Date.now());
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
    determineScheduleIsAllowed: ({ scheduleTimeStep }: stateEcommerceMap, { getSchedulesBySlots, totalStations }, rootState, rootGetters) =>
        /**
         * @param {number} dateFrom
         * @param {number} dateTo
         * @param {string} id - id of event, to filter away while counting (would be counted 2 times)
         * @param {string[]} resourceIdArray
         */
        (dateFrom ?:number, dateTo ?:number, id ?:string, resourceIdArray :string[] = []) :string[] => {
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
        },

    /**
     * Same as above but optimized to be fast. Return boolean and doesn't care about errors
     */
    checkScheduleIsAllowed: ({ scheduleTimeStep }: stateEcommerceMap, { getSchedulesBySlots, totalStations }, rootState, rootGetters) =>
        (dateFrom ?:number, dateTo ?:number, id ?:string, resourceIdArray :string[] = []) :boolean => {
            // ----- businessHours check -----
            if(!rootGetters['main/isOpen'](dateFrom) || !rootGetters['main/isOpen'](dateTo))
                return false;
            // ----- schedule limit check -----
            const cappedSlots :string[][] = Object.values(getSchedulesBySlots(dateFrom, dateTo, scheduleTimeStep, resourceIdArray));
            return !cappedSlots.some((idArray: string[]) => {
                // TODO different stations with different possible games
                return idArray.length - (id && idArray.includes(id) ? 1 : 0) >= totalStations['global']
            });
        },

    /**
     * List of games extended with station's data
     * TODO: da separare category e tags e poi unire qui
     * 
     * @param {Object} games
     * @param {Object} stations
     */
    gameDetailedRecords: ({ games, stations } :stateEcommerceMap) :Record<string, gameMapExtended> => {
        const extendedRecords :Record<string, gameMapExtended> = {};
        // if no locale is found
        if(!Object.prototype.hasOwnProperty.call(games, locale))
            return {}
        // iterate throught all games (original list)
        for(const key in games[locale]) {
            //if no game were found in this locale (TODO find if present in another locale?
            if (!Object.prototype.hasOwnProperty.call(games[locale], key))
                continue;
            const extendedGame :gameMapExtended = { ...games[locale][key] };
            // station details
            const stationsJoin :stationMap[] = [];
            for(let i = extendedGame.stationIds.length; i--; )
                if (Object.prototype.hasOwnProperty.call(stations, locale) && Object.prototype.hasOwnProperty.call(stations[locale], extendedGame.stationIds[i]))
                    stationsJoin.push(stations[locale][extendedGame.stationIds[i]]);
            if(extendedGame.duration){
                const { hours, minutes } = translateMillisecondsToReadable(extendedGame.duration);
                extendedGame.durationText = (hours > 0 ? hours + "h " : "") + minutes + "m";
            }
            // final record
            extendedRecords[extendedGame.id] = {
                ...extendedGame,
                stations: stationsJoin
            }
        }
        return extendedRecords;
    },

    /**
     * Station list filtered by locale
     *
     * @param {Object} stations
     * @return {Object[]}
     */
    stationRecords: ({ stations } :stateEcommerceMap) => (locale :string) :Record<string, stationMap> => {
        if(!Object.prototype.hasOwnProperty.call(stations, locale))
            return {};
        return stations[locale];
    },

    /**
     * Station list sorted by order
     *
     * @param state
     * @param stationRecords
     */
    stationsList: (state  :stateEcommerceMap, { stationRecords }) => (locale :string) :stationMap[] =>
        Object.values(stationRecords(locale) as stationMap[]).sort(({ order :a = 0}, { order :b = 0}) => a - b),

    /**
     *
     * @param info
     */
    getInfoData: ({ info }: stateEcommerceMap) => (branch :keyof stateEcommerceMap['info']) :Record<string, infoChunkMap> => {
        if(!Object.prototype.hasOwnProperty.call(info, branch))
            return {};
        return info[branch];
    },

    /**
     * get item or leaf by id of state
     * TODO root getter?
     *
     * @param {Object} state
     */
    getItem: (state: stateEcommerceMap) => (branch :keyof stateEcommerceMap, id :string | number) => {
        if(!Object.prototype.hasOwnProperty.call(state, branch) || !Object.prototype.hasOwnProperty.call(state[branch], id)){
            return undefined;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return state[branch][id]
    },

} as GetterTree<stateEcommerceMap, stateRootMap>;