import { computed, toRefs } from "vue";
import { useStore } from "@/store";
import dayjs from "dayjs";
import useTimeHelpers from "@/resources/composables/useTimeHelpers";
import { scheduleMap } from "@/interfaces";
import { secondsToTime, timeToSeconds } from "guebbit-javascript-library";

export interface scheduleTimeReadableMap {
    date: string
    hourStart: string
    hourEnd: string
}

export interface scheduleReadableMap extends scheduleTimeReadableMap {
    id ?:string
    cost: number
    durationData: {
        mode: number
        hours: number
        minutes: number
    }
}

/**
 * Mix of useful schedule-related functions
 */
export default (dateFormat = 'YYYY-MM-DD', timeFormat = 'HH:mm:ss', stepTime = 0) => {
    const { state, getters } = useStore();
    const { scheduleRecords, scheduleTimeCost, scheduleTimeStep } = toRefs(state.ecommerce);

    /**
     *
     */
    if(stepTime === 0)
        stepTime = scheduleTimeStep.value;

    /**
     *
     */
    const scheduleList = computed<scheduleMap[]>(() =>
        Object.values(scheduleRecords.value)
    );

    /**
     * Time helpers
     */
    const {
        translateToDate
    } = useTimeHelpers(dateFormat + " " + timeFormat);

    /**
     *  Shortcuts
     */
    const getStepCost = getters['ecommerce/getStepCost'];
    const isOpen = getters['main/isOpen'];
    const determineScheduleIsEditable = getters['ecommerce/determineScheduleIsEditable'];
    const checkScheduleIsEditable = getters['ecommerce/checkScheduleIsEditable'];
    const determineScheduleIsAllowed = getters['ecommerce/determineScheduleIsAllowed'];
    const checkScheduleIsAllowed = getters['ecommerce/checkScheduleIsAllowed'];

    /**
     * Time calculated in "steps", need to remove all unused minutes\seconds\milliseconds
     * @param {number} time
     */
    const normalizeTime = (time :number) => Math.round(time / stepTime) * stepTime;

    /**
     * FROM string date, hour start and hour end
     * TO timestamp of start and end
     * hourEnd 00.00 is considered 24.00 (ambiguity)
     * hourStart 00.00 is considered 00.00 so no need to translate
     *
     * if value not valid, return default form values
     *
     * WARNING: date e start are similar but no always the same.
     *  There could be distortions based on the fact that "date" stems from YYYY-MM-DD and "start" from a HH:mm
     *
     * @return {[number, number]}
     */
    const formToTime = (date ?:string, start ?:string , end ?:string ) :[number, number] => {
        const newStart = translateToDate(date + ' ' + start);
        const newEnd = translateToDate(date + ' ' + (end === '00:00' ? '24:00' : end));
        if(!newStart || !newEnd)
            return getScheduleFirstAvailable();
        return [
            newStart.getTime(),
            newEnd.getTime()
        ];
    };

    /**
     * TODO check hourEnd ambiguity 00.00 / 24.00
     *
     * @param start
     * @param end
     */
    const timeToForm = (start = 0, end = 0) :scheduleTimeReadableMap => {
        return {
            date: dayjs(start).format(dateFormat),    //(end) MUST be the same
            hourStart: dayjs(start).format(timeFormat),
            hourEnd: dayjs(end).format(timeFormat),
        }
    };

    /**
     * Readable schedule
     * Get date, hourStart and hourEnd from selectedRecord
     * and translate them in a human readable way.
     *
     * @return {Object}
     */
    const getSchedule = (id ?:string) :scheduleMap | undefined => {
        if(!id || !Object.prototype.hasOwnProperty.call(scheduleRecords.value, id)){
            return undefined;
        }
        return { ...scheduleRecords.value[id] };
    };

    /**
     * Sum the TIME of selected schedules
     *
     * @param {string[]} idArray
     */
    function getScheduleTotalTime(idArray :string[]) :number {
        // no items = 0 time
        if(idArray.length === 0){
            return 0;
        }
        return scheduleList.value.reduce((total, { id, start, end }) :number => {
            return idArray.includes(id) ? total + (end - start) : total;
        }, 0);
    }

    /**
     * Sum the STEPS of selected schedules
     *
     * @param {string[]} idArray
     */
    function getScheduleTotalSteps(idArray :string[]){
        return getScheduleTotalTime(idArray) / scheduleTimeStep.value;
    }

    /**
     * Get first time available with the chosen conditions:
     *  - start
     *  - duration
     *  - timeframe (if set)
     * If I want 4 hours of time at "morning", it will loop throught the calendar searching for a 4 hours hole in the "morning" timeframe.
     * The chosen conditions will NOT change. Only the DAY condition can change or timeframe (IF NOT SET)
     *
     * WARNING: A step bigger than the time of a day or unknown conditions would create an infinite loop, so I create a hard limit
     *          2000 steps (half hours) = 41 days. Virtually a loop (but can happen with legit values)
     *
     * @param {number} start
     * @param {number} end
     * @param {string} timeframe
     * @param {number} step
     */
    const getScheduleFirstAvailable = (start = Date.now(), end ?:number, timeframe ?:string, step = scheduleTimeStep.value) :[number, number] => {
        start = normalizeTime(start);
        // safeguard: loop protection
        let loop = 0;
        // starting values
        let startObject = dayjs(start);
        let endObject = dayjs(end ? end : start + step);
        // optimization purpose only
        let startTimestamp = startObject.valueOf();
        while(
            (
                // iterate throught until your first free valid moment with the chosen duration (step by step)
                !checkScheduleIsAllowed(startTimestamp, endObject.valueOf()) ||
                // must be in the future
                startTimestamp < Date.now() ||
                // if timeframe is set: it must be respected
                (timeframe && timeframe !== getTimeframe(startTimestamp))
            ) &&
            // safeguard: loop protection
            loop < 2000
        ) {
            // 1 step forward
            startObject = startObject.add(step, 'milliseconds');
            endObject = endObject.add(step, 'milliseconds');
            startTimestamp = startObject.valueOf();
            // safeguard
            loop++;
            /*
            console.log(
                "GGGGGGGGGGGG111111111111111",
                loop,
                timeframe,
                new Date(startTimestamp),
                new Date(endObject.valueOf()),
            )
            console.log(
                "GGGGGGGG22222222222222",
                startTimestamp < Date.now() ? 'passato' : 'futuro',
                (timeframe && timeframe !== getTimeframe(startTimestamp)),
                determineScheduleIsAllowed(startTimestamp, endObject.valueOf()),
                checkScheduleIsAllowed(startTimestamp, endObject.valueOf())
            )
            */
        }
        return [
            startTimestamp,
            endObject.valueOf()
        ];
    }

    /**
     * Get start-end time by providing start and duration
     * Built-in getScheduleFirstAvailable to find the better available spot with the requested conditions
     *
     * @param {number} start
     * @param {number} duration
     * @param {string} timeframe
     * @param {number} step
     */
    const getScheduleTimes = (start = Date.now(), duration = scheduleTimeStep.value, timeframe ?:string, step = scheduleTimeStep.value) :[number, number] => {
        start = normalizeTime(start);
        const [ newStart, newEnd ] = getScheduleFirstAvailable(start, start + duration, timeframe, step);
        return [
            newStart,
            newEnd
        ]
    }

    /**
     * Get human readable schedule data
     *
     * @param start
     * @param end
     */
    const translateScheduleUI = (start = 0, end = 0) :scheduleReadableMap => {
        let mode = 0;
        const { hoursOnly :hours = 0, minutes = 0 } = secondsToTime(end - start);
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
        // calculate the cost
        const totalSteps = (end - start) / scheduleTimeStep.value;
        const cost = Object.prototype.hasOwnProperty.call(scheduleTimeCost.value, totalSteps) ? scheduleTimeCost.value[totalSteps] : totalSteps * scheduleTimeCost.value[0];
        // return human readable schedule info
        return {
            ...timeToForm(start, end),
            cost: cost / 100,
            durationData: {
                mode,
                hours,
                minutes,
            }
        };
    };

    /**
     * Previously was an ENUM
     */
    const formTimeframeList = computed(() => {
        return {
            morning: '8:00',
            afternoon: '13:00',
            evening: '20:00',
        }
    })

    /**
     * Check the starting hour if it fits custom timeframes
     * @param current {number}
     * @return {string}
     */
    const getTimeframe = (current :number) :string => {
        const timeframesHours = Object.values(formTimeframeList.value);
        const timeframeName = Object.keys(formTimeframeList.value);
        // start from the last because it's the correct one if the others fail
        let timeframe = timeframeName[timeframeName.length - 1];
        for(let i = timeframeName.length; i--; ){
            const [ preHours, preMinutes ] = (timeframesHours[i - 1] || timeframesHours[timeframesHours.length - 1]).split(":");
            const [ postHours, postMinutes ] = timeframesHours[i].split(":");
            const pre = new Date(current).setHours(parseInt(preHours), parseInt(preMinutes), 0, 0);
            const post = new Date(current).setHours(parseInt(postHours), parseInt(postMinutes), 0, 0);
            // check in which timeframe limits the current hour is
            if(
                pre <= current &&
                current + 1 <= post
            ){
                timeframe = timeframeName[i - 1] || timeframeName[timeframeName.length - 1];
                break;
            }
        }
        return timeframe;
    };
    /**
     * Same as above but with hourStart
     * @param {string} start
     * @return {string}
     */
    const getTimeframeByHourStart = (start :string) :string => {
        const timeframesHours = Object.values(formTimeframeList.value);
        const timeframeName = Object.keys(formTimeframeList.value);
        // start from the last because it's the correct one if the others fail
        let timeframe = timeframeName[timeframeName.length - 1];
        for(let i = timeframeName.length; i--; ){
            const pre = timeToSeconds(timeframesHours[i - 1] || timeframesHours[timeframesHours.length - 1]);
            const current = timeToSeconds(start);
            const post = timeToSeconds(timeframesHours[i]);
            // check in which timeframe limits the current hour is
            if(
                pre <= current &&
                current + 1 <= post
            ){
                timeframe = timeframeName[i - 1] || timeframeName[timeframeName.length - 1];
                break;
            }
        }
        return timeframe;
    };

    /**
     * Get new start-end pair with the selected timeframe
     * locked: timeframe, start, end hours
     * changing: date
     *
     * @param {string} timeframe
     * @param {number} start
     * @param {number} end
     */
    const getScheduleTimeframe = (timeframe :string, start :number, end :number) :[number, number] => {
        // if it's already the selected timeframe, skip
        if(getTimeframe(start) === timeframe)
            return [
                start,
                end
            ];
        // Take the starting time based on the timeframe
        const [ hours, minutes ] = formTimeframeList.value[timeframe as keyof typeof formTimeframeList.value].split(":");
        // recalculate "start" by setting the formTimeframeList time
        let newStart  = new Date(start).setHours(parseInt(hours), parseInt(minutes), 0, 0);
        // if this has took start in the past, I have to add 1 day (because I must not change the requested start hour)
        if(newStart < start) {
            const temp = new Date(newStart);
            newStart = temp.setDate(temp.getDate() + 1);
        }
        // correct by searching the first moment from {start} that is valid (not close, not max-reached)
        const [ finalStart, finalEnd ] = getScheduleTimes(
            newStart,
            end - start,
            timeframe
        );
        // final data
        return [
            finalStart,
            finalEnd
        ];
    };

    /**
     * TODO formula rotta
     * Add hours to the wallet until the next discount
     *
     * @param {number} steps
     */
    function getNearestDiscountThreshold(steps = 0){
        // all the discount step thresholds
        const stepDiscounts = Object.keys(scheduleTimeCost.value);
        // if no discount, return 0;
        if(stepDiscounts.length < 2)
            return 0;
        // the nearest discount threshold TODO non è detto che sia il 1°, errore, calcolare
        const nearestStepDiscount = parseInt(stepDiscounts[1]);
        // the leftoversteps remained after the last applied discount
        const leftoverSteps = Object.keys(scheduleTimeCost.value).reduce((total, stepString) :number => {
            const stepInt = parseInt(stepString);
            if(stepInt > 0 && Math.floor(total / stepInt) > 0)
                return total % stepInt;
            return total;
        }, steps);
        // missing steps to nearest discount found
        const missingSteps = nearestStepDiscount - leftoverSteps;
        console.log("xxxxxx", steps, nearestStepDiscount, leftoverSteps, missingSteps)
        // We are arrived, add step
        if(leftoverSteps === 0)
            return 2; // TODO 2 step per fare l'ora logicamente, ma programmaticamente?
        return missingSteps;
    }

    return {
        normalizeTime,
        timeToForm,
        formToTime,
        getSchedule,
        getScheduleTotalTime,
        getScheduleTotalSteps,
        getScheduleFirstAvailable,
        getScheduleTimes,
        translateScheduleUI,
        getTimeframe,
        getTimeframeByHourStart,
        getScheduleTimeframe,
        scheduleList,
        getStepCost,
        isOpen,
        determineScheduleIsEditable,
        checkScheduleIsEditable,
        determineScheduleIsAllowed,
        checkScheduleIsAllowed,
        formTimeframeList,
        getNearestDiscountThreshold,
    }
};