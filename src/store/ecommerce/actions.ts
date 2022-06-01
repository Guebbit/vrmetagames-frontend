import { randomColorList } from "@/resources/constants";
import { shuffle } from "lodash";
import { getUUID } from "guebbit-javascript-library";

import type { ActionContext } from "vuex";
import type { stateEcommerceMap, stateRootMap, scheduleMap } from "@/interfaces";

const mockServerSchedule = [
    {
        id: "item1",
        start: 1652349600000,
        end: 1652360400000,
        userId: "user4"
    },
    {
        id: "item2",
        start: 1652364000000,
        end: 1652385600000,
        userId: "user4"
    },
    {
        id: "item3",
        start: 1652353200000,
        end: 1652355000000,
        userId: "user1"
    },
    {
        id: "item4",
        start: 1652344200000,
        end: 1652389200000,
        userId: "user3"
    },
    {
        id: "item5",
        start: 1652358600000,
        end: 1652378400000,
        userId: "user2"
    },
    {
        id: "item6",
        start: 1652376600000,
        end: 1652392800000,
        userId: "user1"
    },
    {
        id: "item7",
        start: 1652344200000,
        end: 1652371200000,
        userId: "user5"
    },
    {
        id: "item8",
        start: 1652436000000,
        end: 1652450400000,
        userId: "user1",
        resourceId: "item1"
    },
    {
        id: "item9",
        start: 1652457600000,
        end: 1652466600000,
        userId: "user2",
        resourceId: "item1"
    },
    {
        id: "item10",
        start: 1652470200000,
        end: 1652477400000,
        userId: "user1",
        resourceId: "item1"
    },
    {
        id: "item11",
        start: 1652470200000,
        end: 1652477400000,
        userId: "user3",
        resourceId: "item2"
    }
];
const mockServerUsers = [
    {
        id: "user1",
        avatar: "https://randomuser.me/api/portraits/women/85.jpg",
        username: "UsernameTonio",
        lastVisit: 1652385600000
    },
    {
        id: "user2",
        avatar: "https://randomuser.me/api/portraits/men/10.jpg",
        username: "GeeenoPeeno",
        lastVisit: 1652355000000
    },
    {
        id: "user3",
        avatar: "https://randomuser.me/api/portraits/women/84.jpg",
        username: "LoremIpsum",
        lastVisit: 1652389200000
    },
    {
        id: "user4",
        avatar: "https://randomuser.me/api/portraits/men/80.jpg",
        username: "Nickname",
        lastVisit: 1652378400000
    },
    {
        id: "user5",
        username: "TizioCaio",
        lastVisit: 1652371200000
    }
];
const mockServerStations = [
    {
        id: 'item1',
        type: 'Oculus',
        label: 'Oculus',
        image: 'https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-main-1.png',
        capacity: 2
    },
    {
        id: 'item2',
        type: 'Computer',
        label: 'Computer',
        image: 'https://res.cloudinary.com/muhammederdem/image/upload/v1536405218/starwars/item-3.png',
        capacity: 1
    }
];
const mockServerGames = [
    {
        id: "item-1",
        title: "LOREM IPSUM",
        author: "TOAST",
        category: ["First Person Shooter"],
        stations: ["Computer"],
        hashtags: [
            "lorem ipsum",
            "cartoon",
            "shooter",
            "mecha"
        ],
        image: "https://assets.guebbit.com/rogheneach/images/volumes/rogh-vol1.jpg",
        spine: "https://assets.guebbit.com/rogheneach/images/volumes/rogh-vol1-spine.jpg"
    },
    {
        id: "item-2",
        title: "LOREM IPSUM",
        author: "TOAST",
        category: ["First Person Shooter"],
        stations: ["Oculus"],
        hashtags: [
            "lorem ipsum",
            "cartoon",
            "shooter",
            "mecha"
        ],
        image: "https://assets.guebbit.com/rogheneach/images/volumes/rogh-vol2.jpg",
        spine: "https://assets.guebbit.com/rogheneach/images/volumes/rogh-vol2-spine.jpg"
    },
    {
        id: "item-4",
        title: "LOREM IPSUM",
        author: "TOAST",
        category: ["First Person Shooter"],
        stations: ["Oculus"],
        hashtags: [
            "lorem ipsum",
            "cartoon",
            "shooter",
            "mecha"
        ],
        image: "http://placekitten.com/600/300"
    },
    {
        id: "item-5",
        title: "LOREM IPSUM",
        author: "TOAST",
        category: ["First Person Shooter"],
        stations: ["Oculus"],
        hashtags: [
            "lorem ipsum",
            "cartoon",
            "shooter",
            "mecha"
        ],
        image: "http://placekitten.com/800/400"
    },
    {
        id: "item-6",
        title: "LOREM IPSUM",
        author: "TOAST",
        category: ["First Person Shooter"],
        stations: ["Oculus"],
        hashtags: [
            "lorem ipsum",
            "cartoon",
            "shooter",
            "mecha"
        ],
        image: "http://placekitten.com/1000/500"
    },
    {
        id: "item-7",
        title: "LOREM IPSUM",
        author: "TOAST",
        category: ["First Person Shooter"],
        stations: ["Oculus"],
        hashtags: [
            "lorem ipsum",
            "cartoon",
            "shooter",
            "mecha"
        ],
        image: "http://placekitten.com/600/600"
    },
    {
        id: "item-8",
        title: "LOREM IPSUM",
        author: "TOAST",
        category: ["First Person Shooter"],
        stations: ["Oculus"],
        hashtags: [
            "lorem ipsum",
            "cartoon",
            "shooter",
            "mecha"
        ],
        image: "http://placekitten.com/400/600"
    },
    {
        id: "item-9",
        title: "LOREM IPSUM",
        author: "TOAST",
        category: ["First Person Shooter"],
        stations: ["Computer"],
        hashtags: [
            "lorem ipsum",
            "cartoon",
            "shooter",
            "mecha"
        ],
        image: "http://placekitten.com/900/800"
    },
    {
        id: "item-10",
        title: "LOREM IPSUM",
        author: "TOAST",
        category: ["First Person Shooter"],
        stations: ["Oculus"],
        hashtags: [
            "lorem ipsum",
            "cartoon",
            "shooter",
            "mecha"
        ],
        image: "http://placekitten.com/300/400"
    }
];

export default {

    /**
     * GET schedules from server and save them in central store
     *
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {number} lastUpdate
     * @param {number} refresh
     */
    async getStations({
        dispatch,
        commit,
        rootState: {
            main: {
                lastUpdate: { stations: lastUpdate = 0 },
                refresh: { stations: refresh = 3600000 }
            }
        }
    }: ActionContext<stateEcommerceMap, stateRootMap>): Promise<void> {
        // TTL
        if(lastUpdate + refresh > Date.now()){
            return Promise.resolve();
        }
        return Promise.resolve()
            .then(() => {
                for(let i = mockServerStations.length; i--; ){
                    commit("setStation", mockServerStations[i]);
                }
                commit("main/setLastUpdate", ['stationList'], { root: true });
            })
            .catch(() => dispatch("main/handleServerError", "getStations ERROR", { root: true }));
    },

    /**
     * Send NEW schedule to server and save in central store
     *
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {number} lastUpdate
     * @param {number} refresh
     */
    async getGames({
        dispatch,
        commit,
        rootState: {
            main: {
                lastUpdate: { games: lastUpdate = 0 },
                refresh: { games: refresh = 3600000 }
            }
        }
    }: ActionContext<stateEcommerceMap, stateRootMap>): Promise<void> {
        // TTL
        if(lastUpdate + refresh > Date.now()){
            return Promise.resolve();
        }
        return Promise.resolve()
            .then(() => {
                for(let i = mockServerGames.length; i--; ){
                    commit("setGame", mockServerGames[i]);
                }
                commit("main/setLastUpdate", ['gamesList'], { root: true });
            })
            .catch(() => dispatch("main/handleServerError", "getGames ERROR", { root: true }));
    },

    // ------------- USERS -------------

    /**
     * Get all users data TODO ottimizzare con only byId quando richiesto
     *
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {number} lastUpdate
     * @param {number} refresh
     */
    async getUsers({
        dispatch,
        commit,
        rootState: {
            main: {
                lastUpdate: { users: lastUpdate = 0 },
                refresh: { users: refresh = 3600000 }
            }
        }
    }: ActionContext<stateEcommerceMap, stateRootMap>): Promise<void> {
        // TTL
        if(lastUpdate + refresh > Date.now()){
            return Promise.resolve();
        }
        return Promise.resolve()
            .then(() => {
                let deliverColors :string[] = [];
                for(let i = mockServerUsers.length; i--; ){
                    // if no colors available, recharge
                    if(deliverColors.length < 1){
                        deliverColors = shuffle(randomColorList);
                    }
                    commit("setUser", {
                        ...mockServerUsers[i],
                        color: deliverColors.pop(),
                        // backgroundColor: 'purple',
                        // borderColor: 'black',
                        // textColor: '#FFF', TODO colori chiari?
                    });
                    commit("main/setLastUpdate", ['user', mockServerUsers[i].id], { root: true });
                }
                commit("main/setLastUpdate", ['userList'], { root: true });
            })
            .catch(() => dispatch("main/handleServerError", "getUsers ERROR", { root: true }));
    },

    // ------------- SCHEDULES -------------

    /**
     * Send NEW schedule to server and save in central store
     *
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {number} lastUpdate
     * @param {number} refresh
     */
    async getSchedules({
        dispatch,
        commit,
        rootState: {
            main: {
                lastUpdate: { schedules: lastUpdate = 0 },
                refresh: { schedules: refresh = 3600000 }
            }
        }
    }: ActionContext<stateEcommerceMap, stateRootMap>): Promise<void> {
        if (lastUpdate + refresh > Date.now()) {
            return Promise.resolve();
        }
        return Promise.resolve()
            .then(() => {
                for (let i = mockServerSchedule.length; i--;) {
                    commit("setSchedule", {
                        ...mockServerSchedule[i],
                        online: true,
                        unsaved: false
                    });
                    commit("main/setLastUpdate", ["schedule", mockServerSchedule[i].id], { root: true });
                }
                commit("main/setLastUpdate", ["scheduleRecords"], { root: true });
            })
            .catch(() => dispatch("main/handleServerError", "getSchedules ERROR", { root: true }));
    },

    /**
     * Create OFFLINE schedule to LOCAL, waiting to be sent online
     * to be saved and\or confirmed later
     *
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {string} id
     * @param {boolean} isAdmin
     * @param {Object} scheduleData
     */
    addSchedule({ commit, rootState: { user: { userInfo: { id, isAdmin }}}}: ActionContext<stateEcommerceMap, stateRootMap>, scheduleData: scheduleMap) :void {
        // TODO colori diversi se utente normale?
        // TODO console.log("AAAAAAAAAAAAAAAA", scheduleData)
        // If NOT admin, user can make decisions only for himself
        if(!isAdmin){
            scheduleData.userId = id;
        }
        // Events without userId are admin inserted events
        // if(!scheduleData.userId){}
        // instanteity and reactivity
        commit("setSchedule", {
            ...scheduleData,
            id: getUUID(),
            online: false,
            confirmed: false,
            canceled: false,
            unsaved: false
        });
    },

    /**
     * EDIT schedules from LOCAL
     * unsaved edits to be confirmed\sent
     *
     * @param {Object} scheduleEditableTime
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Function} getItem
     * @param {string} id
     * @param {boolean} isAdmin
     * @param {Object} scheduleData
     */
    editSchedule({ state: { scheduleEditableTime }, commit, getters: { getItem }, rootState: { user: { userInfo: { id :userId, isAdmin }}}}: ActionContext<stateEcommerceMap, stateRootMap>, scheduleData: scheduleMap) :void {
        const oldScheduleData = getItem('scheduleRecords', scheduleData.id);
        const { id, start, end, userId :scheduleUserId } = oldScheduleData;
        // se non trovato
        if(!id){
            return;
        }

        // TODO ALL CHECKS
        console.log("11111111111111", id, isAdmin, start, end, userId, scheduleUserId)

        // user can make decisions only for himself
        if(!isAdmin && userId !== scheduleUserId){
            console.error("TODO NEVER: user can make decisions only for himself")
            return;
        }

        if(!isAdmin && (start + scheduleEditableTime < Date.now())){
            // WARNING: check already done in Play.vue selectItem TODO
            console.log("CAN'T EDIT IN THE PAST")
            return;
        }

        // TODO CHECK disponibilità (play.vue? qui? calendar.vue? tutti e 3?)
        commit("setSchedule", {
            ...oldScheduleData,
            ...scheduleData,
            unsaved: true
        });
    },

    /**
     * Send OFFLINE schedules to server and save in central store
     *
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} scheduleRecords
     * @param {string[]} scheduleIdList
     */
    // TODO "confirmed: true" quando fare i pagamenti?
    //  Il server paga in automatico se hai ore nel wallet e restituisce la lista di ID pagati + nuovo wallet
    //  Restituisce lista "da pagare"\"in attesa di conferma"?
    async sendSchedules({ dispatch, commit, state: { scheduleRecords } }: ActionContext<stateEcommerceMap, stateRootMap>, scheduleIdList: string[]): Promise<void> {
        const oldScheduleArray :scheduleMap[] = [];
        for(let i = scheduleIdList.length; i--; ){
            // if it doesn't exist it's an error OR if it exists and it's already online (should never happen), ignore it
            if(!Object.prototype.hasOwnProperty.call(scheduleRecords, scheduleIdList[i]) || scheduleRecords[scheduleIdList[i]].online){
                continue;
            }
            oldScheduleArray.push(scheduleRecords[scheduleIdList[i]]);
            commit("setSchedule", {
                ...oldScheduleArray[oldScheduleArray.length - 1],
                unsaved: false,
                online: true
            });
        }
        return Promise.resolve(oldScheduleArray)
            .then(() => {
                // TODO Possible logical error and revert needed
                // TODO controlla se ha senso mettere catch per primo con
                //   "adderror" che poi casca nel then che fa le sue cose ed eventualmente catch revert

                // TODO LOGICAL ERROR: timeslot unavaible (simultaneous bookings)
                // dispatch("main/handleLogicalError", "sendSchedules ERROR", { root: true })
            })
            .catch(() => {
                // REVERT in case of error
                for(let i = oldScheduleArray.length; i--; ){
                    commit("setSchedule", oldScheduleArray[i]);
                }
                return dispatch("main/handleServerError", "sendSchedules ERROR", { root: true });
            });
    },

    /**
     * Send OFFLINE schedules to server and save in central store
     *
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} scheduleRecords
     * @param {string[]} scheduleIdList
     */
    async removeSchedules({ dispatch, commit, state: { scheduleRecords } }: ActionContext<stateEcommerceMap, stateRootMap>, scheduleIdList: string[]): Promise<void> {
        // schedule array to be reverted in case of connection error while removing
        const scheduleArray :scheduleMap[] = [];
        for(let i = scheduleIdList.length; i--; ){
            if(scheduleRecords[scheduleIdList[i]]){
                scheduleArray.push(scheduleRecords[scheduleIdList[i]])
            }
            commit("removeSchedule", scheduleIdList[i]);
        }
        return Promise.resolve(scheduleArray)
            .then(() => {
                // TODO Possible logical error and revert needed
                // TODO controlla se ha senso mettere catch per primo con
                //   "adderror" che poi casca nel then che fa le sue cose ed eventualmente catch revert
                // dispatch("main/handleLogicalError", "removeSchedules ERROR", { root: true })
            })
            .catch(() => {
                // REVERT in case of error
                for(let i = scheduleArray.length; i--; ){
                    commit("setSchedule", {
                        ...scheduleArray[i],
                        online: false,
                        confirmed: false // TODO payments
                    });
                }
                return dispatch("main/handleServerError", "removeSchedules ERROR", { root: true });
            });
    }
};