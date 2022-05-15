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
     * Set schedule data
     *
     * @param {Object} scheduleList
     * @param {Object} scheduleData
     */
    setSchedule({ scheduleList }: stateEcommerceMap, scheduleData: scheduleMap) {
        scheduleList[scheduleData.id] = scheduleData;
    },

    /**
     * Remove schedule data
     *
     * @param {Object} scheduleList
     * @param {string} id
     */
    removeSchedule({ scheduleList }: stateEcommerceMap, id: string) {
        delete scheduleList[id];
    },

    /**
     * Open/Close modal
     *
     * @param {Object} state
     * @param {Object} scheduleData
     */
    setTemporarySchedule(state: stateEcommerceMap, scheduleData: scheduleMap) {
        state.temporarySchedule = scheduleData;
    }
};