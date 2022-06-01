import { GetterTree } from 'vuex';
import { stateRootMap, stateMainMap } from "@/interfaces";
import { timeToSeconds } from "guebbit-javascript-library";

export default {
    
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
     * @param {BusinessHoursMap} businessHours
     */
    isOpen: ({ businessHours }: stateMainMap) => {
        return (dayObject = new Date()) => {
            const todayDay = dayObject.getDay();
            if(!businessHours[todayDay] || businessHours[todayDay].length < 1){
                return false;
            }
            const [ preHours = '0', preMinutes = '0' ] = businessHours[todayDay]![0]!.split(".");
            const [ postHours = '0', postMinutes = '0' ] = businessHours[todayDay]![1]!.split(".");
            const preSeconds = parseInt(preHours) * 3600 + parseInt(preMinutes) * 60;
            const postSeconds = parseInt(postHours) * 3600 + parseInt(postMinutes) * 60;
            const currentSeconds = dayObject.getHours()  * 3600 + dayObject.getMinutes() * 60;
            return preSeconds < currentSeconds && currentSeconds < postSeconds;
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