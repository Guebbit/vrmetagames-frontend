import { randomColorList, imagesUrl } from "@/resources/constants";
import { shuffle } from "lodash";
import { getUUID } from "guebbit-javascript-library";

import type { ActionContext } from "vuex";
import type { stateEcommerceMap, stateRootMap, scheduleMap } from "@/interfaces";

const mockServerSchedule = [
    {
        id: "item1",
        start: 1652349600000,
        end: 1652360400000,
        userId: "user4",
        confirmed: true,
        paid: true,
    },
    {
        id: "item2",
        start: 1652364000000,
        end: 1652385600000,
        userId: "user4",
        confirmed: true,
        paid: true,
    },
    {
        id: "item3",
        start: 1652353200000,
        end: 1652355000000,
        userId: "user1",
        confirmed: true,
        paid: false,
    },
    {
        id: "item4",
        start: 1652344200000,
        end: 1652389200000,
        userId: "user3",
        confirmed: true,
        paid: true,
    },
    {
        id: "item5",
        start: 1652358600000,
        end: 1652378400000,
        userId: "user2",
        confirmed: true,
        paid: true,
    },
    {
        id: "item6",
        start: 1652376600000,
        end: 1652392800000,
        userId: "user1",
        canceled: true,
        paid: false,
    },
    {
        id: "item7",
        start: 1652344200000,
        end: 1652371200000,
        userId: "user5",
        confirmed: true,
        paid: true,
    },
    {
        id: "item8",
        start: 1652436000000,
        end: 1652450400000,
        userId: "user1",
        resourceId: "item1",
        confirmed: true,
        paid: true,
    },
    {
        id: "item9",
        start: 1652457600000,
        end: 1652466600000,
        userId: "user2",
        resourceId: "item1",
        confirmed: true,
        paid: true,
    },
    {
        id: "item10",
        start: 1652470200000,
        end: 1652477400000,
        userId: "user1",
        resourceId: "item1",
        confirmed: true,
        paid: true,
    },
    {
        id: "item11",
        start: 1652470200000,
        end: 1652477400000,
        userId: "user3",
        resourceId: "item2",
        confirmed: true,
        paid: true,
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
        capacity: 4
    },
    {
        id: 'item2',
        type: 'Computer',
        label: 'Computer',
        image: 'https://res.cloudinary.com/muhammederdem/image/upload/v1536405218/starwars/item-3.png',
        capacity: 1
    }
];
// TODO C:\Users\guerz\Lavoro\Temporary\drive-download-20220407T203652Z-001\games
const mockServerGames = [
    {
        id: "item-1",
        title: "Beat Saber",
        author: "Beat Games",
        description: "",
        categories: ["rhythm"],
        stations: ["Oculus"],
        tags: [
            "Dance",
            "Music",
            "Lightsabers"
        ],
        image: imagesUrl + 'games/beat-saber.jpg',
        coverFront: imagesUrl + 'games/beat-saber-cover.jpg',
        coverFrontThumbnail: imagesUrl + 'games/thumbnails/beat-saber-cover.jpg',
        coverSpine: imagesUrl + 'games/beat-saber-spine.jpg',
        coverSpineThumbnail: imagesUrl + 'games/thumbnails/beat-saber-spine.jpg',
        maxPlayersOffline: 1,
        maxPlayersOnline: 0,
        flagFamilyFriendly: true,
    },
    {
        id: "item-2",
        title: "Acron: Attack of the Squirrels!",
        author: "Resolution Games",
        description: "",
        categories: ["party-game", "action"],
        stations: ["Oculus"],
        tags: [
            "PVP",
            "COOP"
        ],
        image: imagesUrl + 'games/acron-attack-of-the-squirrels.jpg',
        coverFront: imagesUrl + 'games/acron-attack-of-the-squirrels-cover.jpg',
        coverSpine: imagesUrl + 'games/acron-attack-of-the-squirrels-spine.jpg',
        maxPlayersOffline: 8,
        maxPlayersOnline: 0,
        flagFamilyFriendly: true,
    },
    {
        id: "item-3",
        title: "Angry Birds VR: Isle of Pigs",
        author: "Resolution Games",
        description: "",
        categories: ["puzzle"],
        stations: ["Oculus"],
        tags: [],
        image: imagesUrl + 'games/angry-birds-isle-of-pigs.jpg',
        coverFront: imagesUrl + 'games/angry-birds-isle-of-pigs-cover.jpg',
        coverSpine: imagesUrl + 'games/angry-birds-isle-of-pigs-spine.jpg',
        maxPlayersOffline: 1,
        maxPlayersOnline: 0,
        flagFamilyFriendly: true,
    },
    {
        id: "item-4",
        title: "Blaston Spectator",
        author: "Resolution Games",
        description: "",
        categories: ["shooter"],
        stations: ["Oculus"],
        tags: [
            "PVP"
        ],
        image: imagesUrl + 'games/blaston.jpg',
        coverFront: imagesUrl + 'games/blaston-cover.jpg',
        coverSpine: imagesUrl + 'games/blaston-spine.jpg',
        maxPlayersOffline: 1,
        maxPlayersOnline: 2,
        flagFamilyFriendly: true,
    },
    {
        id: "item-5",
        title: "Echo Arena",
        author: "",
        description: "",
        categories: ["sport"],
        stations: ["Oculus"],
        tags: [],
        image: imagesUrl + 'games/echo-arena.jpg',
        coverFront: imagesUrl + 'games/echo-arena-cover.jpg',
        coverSpine: imagesUrl + 'games/echo-arena-spine.jpg',
        maxPlayersOffline: 1,
        maxPlayersOnline: 2,
        flagFamilyFriendly: true,
    },
    {
        id: "item-6",
        title: "Loco Dojo",
        author: "Make Real",
        description: "",
        categories: ["action"],
        stations: ["Oculus"],
        tags: [],
        image: imagesUrl + 'games/locodojo.jpg',
        coverFront: imagesUrl + 'games/locodojo-cover.jpg',
        coverSpine: imagesUrl + 'games/locodojo-spine.jpg',
        maxPlayersOffline: 1,
        maxPlayersOnline: 2,
        flagFamilyFriendly: true,
    },
    {
        id: "item-7",
        title: "Nock",
        author: "",
        description: "",
        categories: ["action"],
        stations: ["Oculus"],
        tags: [],
        image: imagesUrl + 'games/nock.jpg',
        coverFront: imagesUrl + 'games/nock-cover.jpg',
        coverSpine: imagesUrl + 'games/nock-spine.jpg',
        maxPlayersOffline: 1,
        maxPlayersOnline: 0,
        flagFamilyFriendly: true,
    },
    {
        id: "item-8",
        title: "Population: One",
        author: "BigBox VR, Inc.",
        description: "",
        categories: ["shooter", "action"],
        stations: ["Oculus"],
        tags: [
            "Battle Royale",
            "PVP"
        ],
        image: imagesUrl + 'games/population-one.jpg',
        coverFront: imagesUrl + 'games/population-one-cover.jpg',
        coverSpine: imagesUrl + 'games/population-one-spine.jpg',
        maxPlayersOffline: 1,
        maxPlayersOnline: 24,
        flagFamilyFriendly: false,
    },
    {
        id: "item-9",
        title: "Puzzle Bobble 3D: Vacation Odyssey",
        author: "Survios, Taito Corporation",
        description: "",
        categories: ["puzzle"],
        stations: ["Oculus"],
        tags: [],
        image: imagesUrl + 'games/puzzle-bobble-vacation-odyssey.jpg',
        coverFront: imagesUrl + 'games/puzzle-bobble-vacation-odyssey-cover.jpg',
        coverSpine: imagesUrl + 'games/puzzle-bobble-vacation-odyssey-spine.jpg',
        maxPlayersOffline: 1,
        maxPlayersOnline: 2,
        flagFamilyFriendly: true,
    },
    {
        id: "item-10",
        title: "Ragnarock",
        author: "WanadevStudio",
        description: "",
        categories: ["rhythm"],
        stations: ["Oculus"],
        tags: [
            "Music"
        ],
        image: imagesUrl + 'games/ragnarock.jpg',
        coverFront: imagesUrl + 'games/ragnarock-cover.jpg',
        coverSpine: imagesUrl + 'games/ragnarock-spine.jpg',
        maxPlayersOffline: 1,
        maxPlayersOnline: 0,
        flagFamilyFriendly: true,
    },
    {
        id: "item-11",
        title: "The Room VR: A Dark Matter",
        author: "Fireproof Games",
        description: "",
        categories: ["adventure"],
        stations: ["Oculus"],
        tags: [
            "Horror",
            "Puzzle",
            "Mistery"
        ],
        image: imagesUrl + 'games/the-room-a-dark-matter.jpg',
        coverFront: imagesUrl + 'games/the-room-a-dark-matter-cover.jpg',
        coverSpine: imagesUrl + 'games/the-room-a-dark-matter-spine.jpg',
        maxPlayersOffline: 4,
        maxPlayersOnline: 0,
        flagFamilyFriendly: false,
    },
    {
        id: "item-12",
        title: "Walkabout Mini Golf",
        author: "Mighty Coconut",
        description: "",
        categories: ["sport"],
        stations: ["Oculus"],
        tags: [
            "Golf",
            "PVP"
        ],
        image: imagesUrl + 'games/walkabout-mini-golf.jpg',
        coverFront: imagesUrl + 'games/walkabout-mini-golf-cover.jpg',
        coverSpine: imagesUrl + 'games/walkabout-mini-golf-spine.jpg',
        maxPlayersOffline: 1,
        maxPlayersOnline: 2,
        flagFamilyFriendly: true,
    },
    {
        id: "item-13",
        title: "Zenith: The Last City",
        author: "Ramen VR",
        description: "",
        categories: ["action"],
        stations: ["Oculus"],
        tags: [
            "Open World"
        ],
        image: imagesUrl + 'games/zenith-the-last-city.webp',
        coverFront: imagesUrl + 'games/zenith-the-last-city-cover.jpg',
        coverFrontThumbnail: imagesUrl + 'games/thumbnails/zenith-the-last-city-cover.jpg',
        coverSpine: imagesUrl + 'games/zenith-the-last-city-spine.jpg',
        coverSpineThumbnail: imagesUrl + 'games/thumbnails/zenith-the-last-city-spine.jpg',
        maxPlayersOffline: 1,
        maxPlayersOnline: 20,
        flagFamilyFriendly: false,
    },
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
     * ADMIN ONLY
     * Get all users data TODO ottimizzare con only byId quando richiesto
     *
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {boolean} isAdmin
     * @param {number} lastUpdate
     * @param {number} refresh
     */
    async getUsers({
        dispatch,
        commit,
        rootState: {
            user: {
                userInfo: {
                    isAdmin
                }
            },
            main: {
                lastUpdate: { users: lastUpdate = 0 },
                refresh: { users: refresh = 3600000 }
            }
        }
    }: ActionContext<stateEcommerceMap, stateRootMap>): Promise<void> {
        // TTL
        if(!isAdmin || lastUpdate + refresh > Date.now()){
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
     * GET schedule list from server and save in central store
     *
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {number} lastUpdate
     * @param {number} refresh
     * @param {Function} rootGetters
     * @param {string[]} idArray - if empty: getAllRecords mode
     */
    async getSchedules({
        dispatch,
        commit,
        rootState: {
            main: {
                lastUpdate: { scheduleRecordsList: lastUpdate = 0 },
                refresh: { scheduleRecordsList: refresh = 3600000 }
            }
        },
        rootGetters
    }: ActionContext<stateEcommerceMap, stateRootMap>, idArray :string[] = []): Promise<void> {
        // if idArray empty, count as "getAllRecords" mode, so use the generic lastUpdate
        if(idArray.length === 0 && lastUpdate + refresh > Date.now()) {
            return Promise.resolve();
        }
        // idArray is specified, then it's getTargetRecords
        if(idArray.length > 0){
            // filter away the records tat are not expired so doesn't need to be re-downloaded
            let filteredIdArray :string[] = [];
            filteredIdArray = [...new Set(idArray)].filter((id :string) => {
                return !(refresh + rootGetters['user/getLastUpdate']('scheduleRecords', id) > Date.now());
            });
            //se non c'è nulla da aggiornare, mi fermo
            if(filteredIdArray.length < 1)
                return Promise.resolve();
        }

        // TODO TEMPORARY
        commit('setSchedule', {
            id: "itemxxxx",
            start: 1655640000000,
            end: 1655647200000,
            userId: "user4",
            online: false,
            confirmed: false,
            canceled: false,
            unsaved: false,
            paid: false
        });
        // TODO TEMPORARY
        commit('setSchedule', {
            id: "itemyyyy",
            start: 1655640000000,
            end: 1655649000000,
            userId: "user4",
            online: false,
            confirmed: false,
            canceled: false,
            unsaved: false,
            paid: false
        })
        commit('setSchedule', {
            id: "itemzzz",
            start: 1655640000000,
            end: 1655649000000,
            userId: "user4",
            online: false,
            confirmed: false,
            canceled: false,
            unsaved: false,
            paid: false
        });
        commit('setSchedule', {
            id: "itemwwww",
            start: 1655640000000,
            end: 1655649000000,
            userId: "user4",
            online: false,
            confirmed: false,
            canceled: false,
            unsaved: false,
            paid: false
        })

        // TODO filteredIdArray or generic
        return Promise.resolve()
            .then(() => {
                for (let i = mockServerSchedule.length; i--;) {
                    commit("setSchedule", {
                        ...mockServerSchedule[i],
                        online: true,
                        unsaved: false
                    });
                    commit("main/setLastUpdate", ['scheduleRecords', mockServerSchedule[i].id], { root: true });
                }
                commit("main/setLastUpdate", ["scheduleRecordsList"], { root: true });
            })
            .catch(() => dispatch("main/handleServerError", "getSchedules ERROR", { root: true }));
    },

    /**
     * Create OFFLINE schedule to LOCAL, waiting to be sent online
     * to be saved and\or confirmed later
     *
     * @param {Function} commit
     * @param {Function} checkScheduleIsAllowed
     * @param {string} id
     * @param {boolean} isAdmin
     * @param {Object} scheduleData
     */
    async addSchedule({ commit, getters: { checkScheduleIsAllowed }, rootState: { user: { userInfo: { id, isAdmin }}}}: ActionContext<stateEcommerceMap, stateRootMap>, scheduleData: scheduleMap) :Promise<string> {
        // If NOT admin, user can make decisions only for himself
        if(!isAdmin && scheduleData.userId !== id){
            return Promise.reject(['error-403']);
        }

        // if schedule is not allowed in that timeframe
        const errorArray = checkScheduleIsAllowed(scheduleData.start, scheduleData.end, scheduleData.id, scheduleData.resourceId);
        if(errorArray.length > 0){
            return Promise.reject(errorArray);
        }

        const scheduleId = scheduleData.id || getUUID();
        // Events without userId are admin inserted events
        // if(!scheduleData.userId){}
        // instanteity and reactivity
        commit("setSchedule", {
            ...scheduleData,
            id: scheduleId,
            online: false,
            confirmed: false,
            canceled: false,
            unsaved: false,
            paid: false
        });

        return Promise.resolve(scheduleId);
    },

    /**
     * EDIT schedule from LOCAL
     * unsaved edits to be confirmed\sent
     *
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Function} getItem
     * @param {Object} scheduleData
     */
    async editSchedule({ commit, getters: { getItem, checkScheduleIsEditable, checkScheduleIsAllowed }}: ActionContext<stateEcommerceMap, stateRootMap>, scheduleData: scheduleMap) :Promise<void> {
        const { id, start, end, resourceId } = scheduleData;
        const oldScheduleData = getItem('scheduleRecords', id);
        // if not found (shouldn't happen)
        if(!oldScheduleData){
            return Promise.reject(['error-404']);
        }
        // CHECK if user can edit target schedule
        const errorEditableArray = checkScheduleIsEditable(id);
        if(errorEditableArray.length > 0){
            return Promise.reject(errorEditableArray);
        }
        // CHECK if the edited schedule is allowed in the new timeslots
        const errorAllowedArray = checkScheduleIsAllowed(start, end, id, resourceId);
        if(errorAllowedArray.length > 0){
            return Promise.reject(errorAllowedArray);
        }
        // edit target schedule
        commit("setSchedule", {
            ...oldScheduleData,
            ...scheduleData,
            unsaved: true
        });
        return Promise.resolve();
    },

    /**
     * RESET schedule
     * If we have data in the archive (a previous non-confirmed version of the schedule), we restore the old data.
     * If, for some reason, we don't have the data, we will download it from the server TODO
     *
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Function} getItem
     * @param {string} id
     */
    async resetSchedule({ dispatch, commit, getters: { getItem } }: ActionContext<stateEcommerceMap, stateRootMap>, id: string) :Promise<void> {
        // const currentEvent = getItem('scheduleRecords', id);
        const archivedEvent = getItem('scheduleArchive', id);
        if(archivedEvent){
            commit("setSchedule", {
                ...archivedEvent,
                unsaved: false
            });
            commit("removeScheduleArchive", id);
            return Promise.resolve();
        }
        // if not on archive, download from server
        // force download
        commit("main/setLastUpdate", ['scheduleRecords', id], { root: true });
        return dispatch('getSchedules', [id]);
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