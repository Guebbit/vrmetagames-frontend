import { toRefs } from "vue";
import { useStore } from "@/store";
import dayjs from "dayjs";
import useTimeHelpers from "@/resources/composables/useTimeHelpers";
import { scheduleMap } from "@/interfaces";
import { secondsToTime } from "guebbit-javascript-library";

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
export default (dateFormat = 'YYYY-MM-DD', timeFormat = 'HH:mm:ss') => {
    const { state, getters } = useStore();
    const { scheduleRecords, scheduleTimeCost, scheduleTimeStep } = toRefs(state.ecommerce);

    /**
     * Time helpers
     */
    const {
        translateToDate
    } = useTimeHelpers(dateFormat + " " + timeFormat);

    /**
     *  Shortcut
     */
    const isOpen = getters['main/isOpen'];
    const determineScheduleIsEditable = getters['ecommerce/determineScheduleIsEditable'];
    const checkScheduleIsEditable = getters['ecommerce/checkScheduleIsEditable'];
    const determineScheduleIsAllowed = getters['ecommerce/determineScheduleIsAllowed'];
    const checkScheduleIsAllowed = getters['ecommerce/checkScheduleIsAllowed'];


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
     * Get first time available with the chosen conditions.
     * If I want 4 hours of time, it will loop throught the calendar searching for a 4 hours hole. 
     * Start and End time will change, but the duration will not.
     * 
     * If "end" is not specified, I take start + basic step
     * 
     * WARNING: A step bigger than the time of a day or unknown conditions would create an infinite loop, so I create a hard limit
     *          2000 steps (half hours) = 41 days. Virtually a loop (but can happen with legit values)
     *
     * @param {number} start
     * @param {number} end
     * @param {number} step
     */
    const getFirstTimeAvailable = (start = Date.now(), end ?:number, step = scheduleTimeStep.value) :[number, number] => {
        // safeguard mentioned above
        const loopSafeguard = 2000;
        let loop = 0;
        // starting values
        let startObject = dayjs(start);
        let endObject = dayjs(end ? end : start + step);
        // iterate throught until your first free valid moment with the chosen duration (step by step)
        while(!checkScheduleIsAllowed(startObject.valueOf(), endObject.valueOf()) && loop < loopSafeguard) {
            // 1 step forward
            startObject = startObject.add(step, 'milliseconds');
            endObject = endObject.add(step, 'milliseconds');
            // safeguard
            loop++;
            /*
            console.log(
                "2222222222222",
                loop,
                new Date(startObject.valueOf()),
                new Date(endObject.valueOf()),
                determineScheduleIsAllowed(startObject.valueOf(), endObject.valueOf()),
                checkScheduleIsAllowed(startObject.valueOf(), endObject.valueOf())
            )
            */
        }
        return [
            startObject.valueOf(),
            endObject.valueOf()
        ];
    };


    /**
     * Get start-end time by providing start and duration
     * Built-in getFirstTimeAvailable to find the better available spot with the requested conditions
     *
     * @param {number} start
     * @param {number} duration
     * @param {number} step
     */
    const getScheduleTimeFromDuration = (start = Date.now(), duration = scheduleTimeStep.value, step = scheduleTimeStep.value) :[number, number] => {
        const [ newStart, newEnd ] = getFirstTimeAvailable(start, start + duration, step);
        return [
            newStart,
            newEnd
        ]
    }

    /**
     * FROM string date, hour start and hour end
     * TO timestamp of start and end
     * hourEnd 00.00 is considered 24.00 (ambiguity)
     * hourStart 00.00 is considered 00.00 so no need to translate
     *
     * if value not valid, return default form values
     *
     * @return {[number, number]}
     */
    const formToTime = (date ?:string, start ?:string , end ?:string ) :[number, number] => {
        const newStart = translateToDate(date + ' ' + start);
        const newEnd = translateToDate(date + ' ' + (end === '00:00' ? '24:00' : end));
        if(!newStart || !newEnd)
            return getFirstTimeAvailable();
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
        // const cost = totalSteps < scheduleTimeCost.value.length ? scheduleTimeCost.value[totalSteps] : totalSteps * scheduleTimeCost.value[0];
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

    return {
        getSchedule,
        formToTime,
        timeToForm,
        translateScheduleUI,
        isOpen,
        determineScheduleIsEditable,
        checkScheduleIsEditable,
        determineScheduleIsAllowed,
        checkScheduleIsAllowed,
        getFirstTimeAvailable,
        getScheduleTimeFromDuration
    }
};