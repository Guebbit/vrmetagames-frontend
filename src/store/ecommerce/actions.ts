import { randomColorList } from "@/resources/constants";
import { shuffle } from "lodash";
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
        end: 1652353200000,
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
    }
];
const mockServerUsers = [
    {
        id: "user1",
        avatar: "https://randomuser.me/api/portraits/women/85.jpg",
        username: "UsernameTonio"
    },
    {
        id: "user2",
        avatar: "https://randomuser.me/api/portraits/men/10.jpg",
        username: "GeeenoPeeno"
    },
    {
        id: "user3",
        avatar: "https://randomuser.me/api/portraits/women/84.jpg",
        username: "LoremIpsum",
        color: "#"
    },
    {
        id: "user4",
        avatar: "https://randomuser.me/api/portraits/men/80.jpg",
        username: "LoremIpsum",
        color: "#"
    },
    {
        id: "user5",
        avatar: "https://randomuser.me/api/portraits/women/80.jpg",
        username: "LoremIpsum",
        color: "#"
    }
];
const mockServerStations = [
    {
        id: 'item1',
        type: 'Oculus',
        image: 'https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-main-1.png',
        available: true,
        time: 1654121642000,
        number: 2
    },
    {
        id: 'item2',
        type: 'Computer',
        image: 'https://res.cloudinary.com/muhammederdem/image/upload/v1536405218/starwars/item-3.png',
        available: false,
        time: 1654121642000,
        number: 0
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
     * Send NEW schedule to server and save in central store
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
                    commit("setSchedule", mockServerSchedule[i]);
                    commit("main/setLastUpdate", ["schedule", mockServerSchedule[i].id], { root: true });
                }
                commit("main/setLastUpdate", ["scheduleList"], { root: true });
            })
            .catch(() => dispatch("main/handleServerError", "getSchedules ERROR", { root: true }));
    },


    /**
     * Send NEW schedule to server and save in central store
     *
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {string} id
     * @param {boolean} isAdmin
     * @param {Object[]} scheduleDataList
     */
    async addSchedules({ dispatch, commit, rootState: { user: { userInfo: { id, isAdmin }}}}: ActionContext<stateEcommerceMap, stateRootMap>, scheduleDataList: scheduleMap[]): Promise<void> {
        for(let i = scheduleDataList.length; i--; ){
            scheduleDataList[i].id = Date.now().toString();
            // If NOT admin, user can make decisions only for himself
            if(!isAdmin){
                scheduleDataList[i].userId = id;
            }
            // Events MUST have userId
            if(!scheduleDataList[i].userId){
                commit("main/addError", {
                    text: 'Schedule MUST have an userId'
                }, { root: true });
                scheduleDataList.splice(i, 1);
                continue;
            }
            // instanteity and reactivity
            commit("setSchedule", scheduleDataList[i]);
        }
        return Promise.resolve()
            .then(() => {
                // TODO Possible logical error and revert needed
                // TODO controlla se ha senso mettere catch per primo con
                //   "adderror" che poi casca nel then che fa le sue cose ed eventualmente catch revert
                // dispatch("main/handleLogicalError", "addSchedules ERROR", { root: true })
            })
            .catch(() => {
                // REVERT in case of error
                for(let i = scheduleDataList.length; i--; ){
                    commit("removeSchedule", scheduleDataList[i].id);
                }
                return dispatch("main/handleServerError", "addSchedules ERROR", { root: true });
            });
    }
};