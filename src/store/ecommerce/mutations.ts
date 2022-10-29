import * as mutations from "../_commons/mutations"

import flaticonController from "@/assets/svg/videogames/flaticon_nintendo-controller.svg?component";
import flaticonAR from "@/assets/svg/videogames/flaticon_augmented-reality.svg?component";
import flaticonPlayStation5 from "@/assets/svg/videogames/flaticon_ps4-console.svg?component";

import type {
    stateEcommerceMap,
    scheduleMap,
    stationMap,
    infoChunkMap
} from "@/interfaces";

export default {
    ...mutations,

    /**
     * Set station data
     *
     * @param {Object} stations
     * @param {Object} stationData
     */
    setStation({ stations }: stateEcommerceMap, stationData: stationMap) {
        if(!stationData.id)
            return;
        const { id, name, lang } = stationData;
        // custom svg icon
        switch (name){
            case 'oculus':
                stationData.icon = flaticonAR;
            break;
            case 'ps5':
                stationData.icon = flaticonPlayStation5;
            break;
            default:
                stationData.icon = flaticonController;
            break;
        }
        // if language branch doesn't exist
        if (!Object.prototype.hasOwnProperty.call(stations, lang))
            stations[lang] = {};
        stations[lang][id] = stationData;
    },

    /**
     * Set info data
     *
     * Normally it would be divided on languages,
     * but for simplicity (to normalize and it changes nothing)
     * we will merge branch and lang
     *
     * @param {Object} info
     * @param {string} branch
     * @param {Object} infoData
     */
    setInfoData({ info }: stateEcommerceMap, [branch, infoData]: [string, infoChunkMap]) {
        if(!infoData.id || !infoData.lang)
            return;
        branch = branch  + "-" + infoData.lang;
        if (!Object.prototype.hasOwnProperty.call(info, branch))
            info[branch] = {};
        info[branch][infoData.id] = infoData;
    },

    /**
     * Set schedule data, overwrite data
     *
     * @param {Object} scheduleRecords
     * @param {Object} scheduleArchive
     * @param {Object} scheduleData
     */
    setSchedule({ scheduleRecords, scheduleArchive }: stateEcommerceMap, scheduleData: scheduleMap) {
        // if it's not canceled and it's not confirmed or paid, check the date. It can be expired
        scheduleData.expired = scheduleData.start < Date.now();
        // if we are creating an "unsaved" edits, for restoring and compare reasons, we create a clone
        if(scheduleData.unsaved)
            scheduleArchive[scheduleData.id] = scheduleRecords[scheduleData.id];
        // saving data
        scheduleRecords[scheduleData.id] = scheduleData;
    },

    /**
     * Add steps amount to target user wallet
     *
     * @param scheduleRecords
     * @param id - user id
     * @param amount- number of steps to add
     */
    addWallet({ users }: stateEcommerceMap, [id, amount = 0]: [string, number]) {
        if(!Object.prototype.hasOwnProperty.call(users, id))
            return;
        users[id].wallet = (users[id].wallet || 0) + amount;
    },

    /**
     * Subtract steps amount to target user wallet
     *
     * @param {object} userInfo
     * @param {number} amount - number of steps to add
     */
    subtractWallet({ users }: stateEcommerceMap, [id, amount = 0]: [string, number]) {
        if(!Object.prototype.hasOwnProperty.call(users, id))
            return;
        users[id].wallet = (users[id].wallet || 0) - amount;
    },
};