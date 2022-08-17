import type {
    stateEcommerceMap,
    scheduleMap,
    userMap,
    stationMap,
    gameMap,
} from "@/interfaces";
import { stateUserMap } from "@/interfaces";

export default {

    /**
     * Set station data
     *
     * @param {Object} stations
     * @param {Object} stationData
     */
    setStation({ stations }: stateEcommerceMap, stationData: stationMap) {
        if(!stationData.id)
            return;
        stations[stationData.id] = stationData;
    },

    /**
     * Set game data
     *
     * @param {Object} games
     * @param {Object} gameData
     */
    setGame({ games }: stateEcommerceMap, gameData: gameMap) {
        if(!gameData.id)
            return;
        games[gameData.id] = gameData;
    },

    /**
     * Set user data
     *
     * @param {Object} users
     * @param {Object} userData
     */
    setUser({ users }: stateEcommerceMap, userData: userMap) {
        if(!userData.id)
            return;
        users[userData.id] = userData;
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
     * Remove schedule data
     *
     * @param {Object} scheduleRecords
     * @param {string} id
     */
    removeSchedule({ scheduleRecords }: stateEcommerceMap, id: string) {
        delete scheduleRecords[id];
    },

    /**
     * Remove schedule from archive
     *
     * @param {Object} scheduleArchive
     * @param {string} id
     */
    removeScheduleArchive({ scheduleArchive }: stateEcommerceMap, id: string) {
        delete scheduleArchive[id];
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