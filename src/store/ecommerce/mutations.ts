import type {
    stateEcommerceMap,
    scheduleMap,
    userMap,
    stationMap,
    gameMap,
} from "@/interfaces";

export default {

    /**
     * Set user data
     *
     * @param {Object} stations
     * @param {Object} stationData
     */
    setStation({ stations }: stateEcommerceMap, stationData: stationMap) {
        stations[stationData.id] = stationData;
    },

    /**
     * Set user data
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
     * @param {Object} scheduleData
     */
    setSchedule({ scheduleRecords }: stateEcommerceMap, scheduleData: scheduleMap) {
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
    }
};