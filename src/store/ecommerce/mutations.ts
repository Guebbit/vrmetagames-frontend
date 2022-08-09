import type {
    stateEcommerceMap,
    scheduleMap,
    userMap,
    stationMap,
    gameMap,
} from "@/interfaces";

export default {

    /**
     * Set station data
     *
     * @param {Object} stations
     * @param {Object} stationData
     */
    setStation({ stations }: stateEcommerceMap, stationData: stationMap) {
        stations[stationData.id] = stationData;
    },

    /**
     * Set game data
     *
     * @param {Object} games
     * @param {Object} gameData
     */
    setGame({ games }: stateEcommerceMap, gameData: gameMap) {
        games[gameData.id] = gameData;
    },

    /**
     * Set user data
     *
     * @param {Object} users
     * @param {Object} userData
     */
    setUser({ users }: stateEcommerceMap, userData: userMap) {
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
        if(!scheduleData.canceled && (!scheduleData.confirmed || !scheduleData.paid))
            scheduleData.expired = scheduleData.start < Date.now();
        // if we are creating an "unsaved" edits, for restoring and compare reasons, we create a clone
        if(scheduleData.unsaved){
            scheduleArchive[scheduleData.id] = scheduleRecords[scheduleData.id];
        }
        // saving data
        scheduleRecords[scheduleData.id] = scheduleData;
    },

    /*
     * Remove schedule data
     *
     * @param {Object} scheduleRecords
     * @param {string} id
     */
    removeSchedule({ scheduleRecords }: stateEcommerceMap, id: string) {
        delete scheduleRecords[id];
    },

    /*
     * Remove schedule from archive
     *
     * @param {Object} scheduleArchive
     * @param {string} id
     */
    removeScheduleArchive({ scheduleArchive }: stateEcommerceMap, id: string) {
        delete scheduleArchive[id];
    },
};