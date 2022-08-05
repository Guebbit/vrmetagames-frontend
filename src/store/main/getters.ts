import { GetterTree } from 'vuex';
import { stateRootMap, stateMainMap } from "@/interfaces";
import { timeToSeconds } from "guebbit-javascript-library";

export default {

    /**
     * Business hours transformed in seconds
     * Needed for some calculations
     *
     * @param {Array<[string, string]>} businessHours
     */
    businessSeconds: ({ businessHours }: stateMainMap) :number[] => {
        const businessSeconds :number[] = [];
        for(let i = businessHours.length; i--; ){
            if(businessHours[i].length < 1){
                businessSeconds[i] = 0;
                continue;
            }
            businessSeconds[i] = timeToSeconds(businessHours[i][1], '.') - timeToSeconds(businessHours[i][0], '.');
        }
        return businessSeconds;
    },

    /**
     * Determine if the chosen day and hour it's open,
     * based on businessHours
     *
     * WARNING: hourStart 00.00 IS 00.00, hourEnd 00.00 is considered 24.00
     *
     * @param {BusinessHoursMap} businessHours
     */
    isOpen: ({ businessHours }: stateMainMap) => {
        /**
         * @param {number} timestamp - time to check if open or not
         */
        return (timestamp = Date.now()) => {
            const dateObject = new Date(timestamp);
            let currentDay = dateObject.getDay();
            let currentHours = dateObject.getHours();
            const currentMinutes = dateObject.getMinutes();
            // WARNING endHour ambiguity: if 00:00 then I intend it as 24:00
            if(currentHours === 0 && currentMinutes === 0){
                currentHours = 24;
                // ambiguity that would point to the next currentDay
                currentDay = new Date(timestamp - 1000).getDay();
            }
            // day closed
            if(!businessHours[currentDay] || businessHours[currentDay].length < 1){
                return false;
            }
            const [ preHours = '0', preMinutes = '0' ] = businessHours[currentDay]?.[0]?.split(".") || [];
            const [ postHours = '0', postMinutes = '0' ] = businessHours[currentDay]?.[1]?.split(".") || [];
            const preSeconds = parseInt(preHours) * 3600 + parseInt(preMinutes) * 60;
            const postSeconds = parseInt(postHours) * 3600 + parseInt(postMinutes) * 60;
            const currentSeconds = currentHours * 3600 + currentMinutes * 60;
            // hours and minutes only check
            // POST HOURS è 24.00 ma dovrebbe essere  20.00
            // console.log("CHECK1: ", currentDay, preHours, preMinutes, '<<<<', currentHours, currentMinutes, '<<<<<', postHours, postMinutes, preSeconds <= currentSeconds, currentSeconds <= postSeconds)
            // console.log("CHECK2: ", preSeconds, '<<<<', currentSeconds, '<<<<', postSeconds)
            return preSeconds <= currentSeconds && currentSeconds <= postSeconds;
        }
    },

    /**
     * Determine if today is open, based on businessHours
     *
     * @param {Object} context
     * @param {Function} isOpen
     */
    todayIsOpen: (context: stateMainMap, { isOpen }) => {
        return isOpen();
    },

    /**
     * id
     *
     * @param {BusinessHoursMap} businessHours
     */
    openDays: ({ businessHours }: stateMainMap) => {
        return businessHours.map((item :string[], i :number) => item.length > 0 ? i : undefined ).filter((x :number | undefined) => x)
    },

    /**
     *
     * @param {BusinessHoursMap} businessHours
     */
    closeDays: ({ businessHours }: stateMainMap) => {
        return businessHours.map((item :string[], i :number) => item.length === 0 ? i : undefined ).filter((x :number | undefined) => x)
    },


    // ---------------------- TODO core? ----------------------

    isMobile: () => {
        return window.matchMedia('(max-width: 600px)').matches;
    },

    /*
    WARNING: getLoading, getLoaded, isLoaded => via mapState
    getLoading: ({ loading }: stateMainMap) => {
        return (branch = '') => {
            // specific
            if(branch !== ''){
                return loading.includes(branch);
            }
            // generic (anything is loading)
            return loading.length > 0;
        }
    },
    */

    /**
     *
     * @param {Object} lastUpdate
     */
    getLastUpdate: ({ lastUpdate }: stateMainMap) => {
        /**
         * @param {string} branch
         * @param {string} id
         */
        return (branch :string, id ?:string) => {
            // branch
            if(!id){
                return Object.prototype.hasOwnProperty.call(lastUpdate, branch) ? lastUpdate[branch] : 0;
            }
            // leaf
            return (
                Object.prototype.hasOwnProperty.call(lastUpdate, branch) &&
                Object.prototype.hasOwnProperty.call(lastUpdate[branch], id)
            ) ? lastUpdate[branch][id] : 0;
        }
    },
} as GetterTree<stateMainMap, stateRootMap>;