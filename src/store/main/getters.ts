import { GetterTree } from 'vuex';
import { stateRootMap, stateMainMap } from '@/interfaces';

export default {

    /**
     * Determine if today is open, based on businessHours
     *
     * @param businessHours
     */
    isOpen: ({ businessHours }: stateMainMap) => {
        const todayObject = new Date();
        const todayDay = todayObject.getDay();
        if(!businessHours[todayDay] || businessHours[todayDay].length < 1){
            return false;
        }
        const [ preHours = '0', preMinutes = '0' ] = businessHours[todayDay][0].split(".");
        const [ postHours = '0', postMinutes = '0' ] = businessHours[todayDay][1].split(".");
        const preSeconds = parseInt(preHours) * 3600 + parseInt(preMinutes) * 60;
        const postSeconds = parseInt(postHours) * 3600 + parseInt(postMinutes) * 60;
        const currentSeconds = todayObject.getHours()  * 3600 + todayObject.getMinutes() * 60;
        return preSeconds < currentSeconds && currentSeconds < postSeconds;
    },
} as GetterTree<stateMainMap, stateRootMap>;