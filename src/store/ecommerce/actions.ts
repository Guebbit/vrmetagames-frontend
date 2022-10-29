import { randomColorList, imagesUrl } from "@/resources/constants";
import { shuffle } from "lodash";
import { getUUID } from "guebbit-javascript-library";

import type { ActionContext } from "vuex";
import type { stateEcommerceMap, stateRootMap, scheduleMap, sendScheduleRequestMap } from "@/interfaces";

const mockServerSchedule = [
    {
        id: "item1",
        start: 1652349600000,
        end: 1652360400000,
        userId: "user4",
        stationId: "item1",
        confirmed: true,
        paid: true,
    },
    {
        id: "item2",
        start: 1652364000000,
        end: 1652385600000,
        userId: "user4",
        stationId: "item1",
        confirmed: true,
        paid: true,
    },
    {
        id: "item3",
        start: 1652353200000,
        end: 1652355000000,
        userId: "user1",
        stationId: "item1",
        confirmed: true,
        paid: false,
    },
    {
        id: "item4",
        start: 1652344200000,
        end: 1652389200000,
        userId: "user3",
        stationId: "item1",
        confirmed: true,
        paid: true,
    },
    {
        id: "item5",
        start: 1652358600000,
        end: 1652378400000,
        userId: "user2",
        stationId: "item1",
        confirmed: true,
        paid: true,
    },
    {
        id: "item6",
        start: 1652376600000,
        end: 1652392800000,
        userId: "user1",
        stationId: "item1",
        canceled: true,
        paid: false,
    },
    {
        id: "item7",
        start: 1652344200000,
        end: 1652371200000,
        userId: "user5",
        stationId: "item1",
        confirmed: true,
        paid: true,
    },
    {
        id: "item8",
        start: 1652436000000,
        end: 1652450400000,
        userId: "user1",
        stationId: "item1",
        resourceId: "item1",
        confirmed: true,
        paid: true,
    },
    {
        id: "item9",
        start: 1652457600000,
        end: 1652466600000,
        userId: "user2",
        stationId: "item1",
        resourceId: "item1",
        confirmed: true,
        paid: true,
    },
    {
        id: "item10",
        start: 1652470200000,
        end: 1652477400000,
        userId: "user1",
        stationId: "item1",
        resourceId: "item1",
        confirmed: true,
        paid: true,
    },
    {
        id: "item11",
        start: 1652470200000,
        end: 1652477400000,
        userId: "user3",
        stationId: "item2",
        resourceId: "item2",
        confirmed: true,
        paid: true,
    },
    {
        id: "item12",
        start: 1671051600000,
        end: 1671058800000,
        userId: "user1",
        stationId: "item1",
        confirmed: true,
        paid: true,
    }
];
const mockServerUsers = [
    {
        id: 'user1',
        avatar: {
            src: "https://randomuser.me/api/portraits/women/85.jpg"
        },
        username: "UsernameTonio",
        firstname: "Tonio",
        lastname: "Cartonio",
        email: "tonio.cartonio@gmail.com",
        phone: "+39 123 4567",
        birthday: 681775200000,
        wallet: 6,
        lastVisit: 1653050140000,
        isAdmin: true,  // TODO false test
        adminInfo: "informazioni profili di salvataggio e bazze varie"
    },
    {
        id: "user2",
        avatar: {
            src: "https://randomuser.me/api/portraits/men/10.jpg"
        },
        username: "GeeenoPeeno",
        lastVisit: 1652355000000
    },
    {
        id: "user3",
        avatar: {
            src: "https://randomuser.me/api/portraits/women/84.jpg"
        },
        username: "LoremIpsum",
        lastVisit: 1652389200000
    },
    {
        id: "user4",
        avatar: {
            src: "https://randomuser.me/api/portraits/men/80.jpg"
        },
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
    /*
    {
        id: 'item1',
        name: 'oculus',
        icon: 'vr-cardboard',
        label: "Oculus-EN",
        gallery: [],
        capacity: 4,
        order: 1,
        lang: "en"
    },
    */
    {
        id: 'item1',
        name: 'oculus',
        icon: 'vr-cardboard',
        label: "Oculus",
        gallery: [],
        capacity: 4,
        order: 1,
        lang: "it"
    },
    {
        id: 'item2',
        name: 'ps5',
        icon: 'gamepad',
        label: "PlayStation 5",
        gallery: [],
        capacity: 1,
        order: 2,
        lang: "it"
    }
];
const mockServerGames = [
    {
        id: "item-12",
        slug: "walkabout-mini-golf",
        title: "Walkabout Mini Golf",
        author: "Mighty Coconut",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        categories: ["sport"],
        stationIds: ["item1"],
        tags: [
            "golf",
            "pvp"
        ],
        image: {
            src: imagesUrl + 'games/walkabout-mini-golf.jpg',
            thumbnail: imagesUrl + 'games/thumbnails/walkabout-mini-golf.jpg',
            title: 'walkabout mini golf sport game',
            alt: 'image for the game walkabout mini golf'
        },
        coverFront: {
            src: imagesUrl + 'games/walkabout-mini-golf-cover.jpg',
            thumbnail: imagesUrl + 'games/thumbnails/walkabout-mini-golf-cover.jpg',
            title: 'walkabout mini golf sport game cover',
            alt: 'cover for the game walkabout mini golf'
        },
        coverSpine: {
            src: imagesUrl + 'games/walkabout-mini-golf-spine.jpg',
            thumbnail: imagesUrl + 'games/thumbnails/walkabout-mini-golf-spine.jpg',
            role: 'presentation'
        },
        maxPlayersOffline: 1,
        maxPlayersOnline: 2,
        familyFriendly: true,
        lang: "it",
    },
    {
        id: "item-2",
        slug: "acron-attack-of-the-squirrels",
        title: "Acron: Attack of the Squirrels!",
        author: "Resolution Games",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        categories: ["party-game", "action"],
        stationIds: ["item1"],
        tags: [
            "pvp",
            "coop"
        ],
        image: {
            src: imagesUrl + 'games/acron-attack-of-the-squirrels.jpg'
        },
        coverFront: {
            src: imagesUrl + 'games/acron-attack-of-the-squirrels-cover.jpg'
        },
        coverSpine: {
            src: imagesUrl + 'games/acron-attack-of-the-squirrels-spine.jpg'
        },
        maxPlayersOffline: 8,
        maxPlayersOnline: 8,
        familyFriendly: true,
        motionSickness: 1,
        difficulty: 4,
        duration: 900000,   // 15 min
        minAge: 6,
        gallery: [
            {
                type: "youtube",
                src: "https://www.youtube.com/embed/Yq_xosIa1mw?playlist=Yq_xosIa1mw&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1",
                title: "Acron: Attack of the Squirrels Trailer",
            },
            {
                type: "image",
                src: "https://l3apq3bncl82o596k2d1ydn1-wpengine.netdna-ssl.com/wp-content/uploads/2019/08/Tree-holding-a-squirrel.png",
                title: "Tree perspective",
                alt: "Gameplay image from the tree perspective "
            }
        ],
        lang: "it",
    },
    {
        id: "item-4",
        slug: "blaston-spectator",
        title: "Blaston Spectator",
        author: "Resolution Games",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        categories: ["shooter"],
        stationIds: ["item1"],
        tags: [
            "pvp"
        ],
        image: {
            src: imagesUrl + 'games/blaston.jpg'
        },
        coverFront: {
            src: imagesUrl + 'games/blaston-cover.jpg'
        },
        coverSpine: {
            src: imagesUrl + 'games/blaston-spine.jpg'
        },
        maxPlayersOffline: 1,
        maxPlayersOnline: 2,
        familyFriendly: true,
        lang: "it",
    },
    {
        id: "item-5",
        slug: "echo-arena",
        title: "Echo Arena",
        author: "",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        categories: ["sport"],
        stationIds: ["item1"],
        tags: [],
        image: {
            src: imagesUrl + 'games/echo-arena.jpg'
        },
        coverFront: {
            src: imagesUrl + 'games/echo-arena-cover.jpg'
        },
        coverSpine: {
            src: imagesUrl + 'games/echo-arena-spine.jpg'
        },
        maxPlayersOffline: 1,
        maxPlayersOnline: 2,
        familyFriendly: true,
        lang: "it",
    },
    {
        id: "item-3",
        slug: "angry-birds-vr-isle-of-pigs",
        title: "Angry Birds VR: Isle of Pigs",
        author: "Resolution Games",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        categories: ["puzzle"],
        stationIds: ["item1", "item2"],
        tags: [],
        image: {
            src: imagesUrl + 'games/angry-birds-isle-of-pigs.jpg'
        },
        coverFront: {
            src: imagesUrl + 'games/angry-birds-isle-of-pigs-cover.jpg'
        },
        coverSpine: {
            src: imagesUrl + 'games/angry-birds-isle-of-pigs-spine.jpg'
        },
        maxPlayersOffline: 1,
        maxPlayersOnline: 0,
        familyFriendly: true,
        motionSickness: 1,
        difficulty: 1,
        duration: 2000000,
        minAge: 6,
        lang: "it",
    },
    {
        id: "item-1",
        slug: "beat-saber",
        title: "Beat Saber",
        author: "Beat Games",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        categories: ["rhythm"],
        stationIds: ["item1", "item2"],
        tags: [
            "dance",
            "music",
            "lightsabers"
        ],
        image: {
            src: imagesUrl + 'games/beat-saber.jpg',
            thumbnail: imagesUrl + 'games/thumbnails/beat-saber.jpg',
        },
        coverFront: {
            src: imagesUrl + 'games/beat-saber-cover.jpg',
            thumbnail: imagesUrl + 'games/thumbnails/beat-saber-cover.jpg',
        },
        coverSpine: {
            src: imagesUrl + 'games/beat-saber-spine.jpg',
            thumbnail: imagesUrl + 'games/thumbnails/beat-saber-spine.jpg',
        },
        maxPlayersOffline: 1,
        maxPlayersOnline: 0,
        familyFriendly: true,
        lang: "it",
    },
    {
        id: "item-6",
        slug: "loco-dojo",
        title: "Loco Dojo",
        author: "Make Real",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        categories: ["action"],
        stationIds: ["item2"],
        tags: [],
        image: {
            src: imagesUrl + 'games/locodojo.jpg'
        },
        coverFront: {
            src: imagesUrl + 'games/locodojo-cover.jpg'
        },
        coverSpine: {
            src: imagesUrl + 'games/locodojo-spine.jpg'
        },
        maxPlayersOffline: 1,
        maxPlayersOnline: 2,
        familyFriendly: true,
        motionSickness: 4,
        difficulty: 3,
        duration: 1500000,
        minAge: 18,
        lang: "it",
    },
    {
        id: "item-7",
        slug: "nock",
        title: "Nock",
        author: "",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        categories: ["action"],
        stationIds: ["item1"],
        tags: [],
        image: {
            src: imagesUrl + 'games/nock.jpg'
        },
        coverFront: {
            src: imagesUrl + 'games/nock-cover.jpg'
        },
        coverSpine: {
            src: imagesUrl + 'games/nock-spine.jpg'
        },
        maxPlayersOffline: 1,
        maxPlayersOnline: 0,
        familyFriendly: true,
        lang: "it",
    },
    {
        id: "item-8",
        slug: "population-one",
        title: "Population: One",
        author: "BigBox VR, Inc.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        categories: ["shooter", "action"],
        stationIds: ["item1"],
        tags: [
            "battle-royale",
            "pvp"
        ],
        image: {
            src: imagesUrl + 'games/population-one.jpg'
        },
        coverFront: {
            src: imagesUrl + 'games/population-one-cover.jpg'
        },
        coverSpine: {
            src: imagesUrl + 'games/population-one-spine.jpg'
        },
        maxPlayersOffline: 1,
        maxPlayersOnline: 24,
        familyFriendly: false,
        duration: 99999999,
        minAge: 15,
        lang: "it",
    },
    {
        id: "item-9",
        slug: "puzzle-bobble-3d-vacation-odyssey",
        title: "Puzzle Bobble 3D: Vacation Odyssey",
        author: "Survios, Taito Corporation",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        categories: ["puzzle"],
        stationIds: ["item1"],
        tags: [],
        image: {
            src: imagesUrl + 'games/puzzle-bobble-vacation-odyssey.jpg'
        },
        coverFront: {
            src: imagesUrl + 'games/puzzle-bobble-vacation-odyssey-cover.jpg'
        },
        coverSpine: {
            src: imagesUrl + 'games/puzzle-bobble-vacation-odyssey-spine.jpg'
        },
        maxPlayersOffline: 1,
        maxPlayersOnline: 2,
        familyFriendly: true,
        minAge: 10,
        duration: 3000000,
        lang: "it",
    },
    {
        id: "item-10",
        slug: "ragnarock",
        title: "Ragnarock",
        author: "WanadevStudio",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        categories: ["rhythm"],
        stationIds: ["item1"],
        tags: [
            "music"
        ],
        image: {
            src: imagesUrl + 'games/ragnarock.jpg'
        },
        coverFront: {
            src: imagesUrl + 'games/ragnarock-cover.jpg'
        },
        coverSpine: {
            src: imagesUrl + 'games/ragnarock-spine.jpg'
        },
        maxPlayersOffline: 1,
        maxPlayersOnline: 0,
        familyFriendly: true,
        duration: 2000000,
        lang: "it",
    },
    {
        id: "item-11",
        slug: "the-room-vr-a-dark-matter",
        title: "The Room VR: A Dark Matter",
        author: "Fireproof Games",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        categories: ["adventure"],
        stationIds: ["item1"],
        tags: [],
        image: {
            src: imagesUrl + 'games/the-room-a-dark-matter.jpg'
        },
        coverFront: {
            src: imagesUrl + 'games/the-room-a-dark-matter-cover.jpg'
        },
        coverSpine: {
            src: imagesUrl + 'games/the-room-a-dark-matter-spine.jpg'
        },
        maxPlayersOffline: 4,
        maxPlayersOnline: 0,
        familyFriendly: false,
        lang: "it",
    },
    {
        id: "item-13",
        slug: "zenith-the-last-city",
        title: "Zenith: The Last City",
        author: "Ramen VR",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        categories: ["action"],
        stationIds: ["item1"],
        tags: [
            "open-world"
        ],
        image: {
            src: imagesUrl + 'games/zenith-the-last-city.jpg',
        },
        coverFront: {
            src: imagesUrl + 'games/zenith-the-last-city-cover.jpg',
        },
        coverSpine: {
            src: imagesUrl + 'games/zenith-the-last-city-spine.jpg',
        },
        maxPlayersOffline: 1,
        maxPlayersOnline: 8,
        motionSickness: 2,
        difficulty: 4,
        duration: 1800000,
        minAge: 12,
        gallery: [
            {
                type: "youtube",
                src: "https://www.youtube.com/embed/oPEho2Zb_JM?playlist=oPEho2Zb_JM&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1",
                title: "Zenith: The Last City Trailer"
            }
        ],
        lang: "it",
    },
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockServerGameInfoData :any = {};
mockServerGameInfoData.categories = [
    {
        id: "1",
        type: "category",
        name: "rpg",
        label: "RPG",
        description: "Game category: roleplay",
        icon: ['fas', 'dice-d20'],
        lang: "en"
    },{
        id: "2",
        type: "category",
        name: "gdr",
        label: "GDR",
        description: "Categoria gioco: gioco di ruolo",
        icon: ['fas', 'dice-d20'],
        lang: "it"
    },{
        id: "3",
        type: "category",
        name: "action",
        label: "Azione",
        description: "Categoria gioco: Azione",
        icon: ['fas', 'hand-fist'],
        lang: "it"
    },{
        id: "4",
        type: "category",
        name: "sport",
        label: "Sport",
        description: "Categoria gioco: Sport",
        icon: ['fas', 'volleyball'],
        lang: "it"
    },{
        id: "5",
        type: "category",
        name: "adventure",
        label: "Avventura",
        description: "Categoria gioco: Avventura",
        icon: ['fas', 'hat-wizard'],
        lang: "it"
    },{
        id: "6",
        type: "category",
        name: "rhythm",
        label: "Ritmo",
        description: "Categoria gioco: Ritmo",
        icon: ['fas', 'music'],
        lang: "it"
    },{
        id: "7",
        type: "category",
        name: "puzzle",
        label: "Puzzle",
        description: "Categoria gioco: Puzzle",
        icon: ['fas', 'puzzle-piece'],
        lang: "it"
    },{
        id: "8",
        type: "category",
        name: "shooter",
        label: "Sparatutto",
        description: "Categoria gioco: Sparatutto",
        icon: ['fas', 'gun'],
        lang: "it"
    },{
        id: "9",
        type: "category",
        name: "party-game",
        label: "Party",
        description: "Categoria gioco: Party",
        icon: ['fas', 'people-group'],
        lang: "it"
    },
];
mockServerGameInfoData.tags = [
    {
        id: "10",
        type: "tag",
        name: "golf",
        label: "Golf",
        description: "Tag di gioco: golf",
        icon: ['fas', 'tag'],
        lang: "it"
    },
    {
        id: "2",
        type: "tag",
        name: "pvp",
        label: "PVP",
        description: "Tag di gioco: giocatore contro giocatore",
        icon: ['fas', 'tag'],
        lang: "it"
    },
    {
        id: "11",
        type: "tag",
        name: "coop",
        label: "COOP",
        description: "Tag di gioco: COOP",
        icon: ['fas', 'tag'],
        lang: "it"
    },
    {
        id: "12",
        type: "tag",
        name: "dance",
        label: "Danza",
        description: "Tag di gioco: danza",
        icon: ['fas', 'tag'],
        lang: "it"
    },
    {
        id: "13",
        type: "tag",
        name: "music",
        label: "Musica",
        description: "Tag di gioco: musica",
        icon: ['fas', 'tag'],
        lang: "it"
    },
    {
        id: "14",
        type: "tag",
        name: "lightsabers",
        label: "Spade laser",
        description: "Tag di gioco: spade laser",
        icon: ['fas', 'tag'],
        lang: "it"
    },
    {
        id: "15",
        type: "tag",
        name: "battle-royale",
        label: "Battle Royale",
        description: "Tag di gioco: battle royale",
        icon: ['fas', 'tag'],
        lang: "it"
    },
    {
        id: "16",
        type: "tag",
        name: "open-world",
        label: "Open World",
        description: "Tag di gioco: open world",
        icon: ['fas', 'tag'],
        lang: "it"
    },
];
mockServerGameInfoData.gameParameters = [
    {
        id: "17",
        type: "parameter",
        name: "title",
        label: "Titolo",
        description: "Titolo gioco",
        icon: ['fas', 'heading'],
        lang: "it"
    }, {
        id: "18",
        type: "parameter",
        name: "minAge",
        label: "Età minima",
        description: "Età minima per giocare",
        icon: ['fas', 'id-card'],
        lang: "it"
    },{
        id: "19",
        type: "parameter",
        name: "duration",
        label: "Durata",
        description: "Durata gioco",
        icon: ['fas', 'hourglass'],
        lang: "it"
    },{
        id: "20",
        type: "parameter",
        name: "maxPlayersOffline",
        label: "Numero giocatori (locale)",
        description: "Numero giocatori (locale) in gioco",
        icon: ['fas', 'people-group'],
        lang: "it"
    }, {
        id: "21",
        type: "parameter",
        name: "maxPlayersOffline",
        label: "Number of players (locale)",
        description: "Number of players (locale) in game",
        icon: ['fas', 'people-group'],
        lang: "en"
    },
];

export default {

    /**
     * GET stations
     *
     *
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {number} refresh
     * @param {Function} rootGetters
     * @param {string[]} languageArray
     */
    async getStations({
        dispatch,
        commit,
        rootState: {
            main: {
                refresh: {
                    stations: refresh = 3600000
                }
            }
        },
        rootGetters
    }: ActionContext<stateEcommerceMap, stateRootMap>, languageArray :string[]): Promise<void> {
        // TTL of every single branch requested
        languageArray = [...new Set(languageArray)].filter((lang) =>
            !(refresh + rootGetters['main/getLastUpdate']('infoData', lang) > Date.now())
        );
        // TTL
        if(languageArray.length < 1)
            return Promise.resolve();
        return Promise.resolve()
            .then(() => {
                let i :number;
                for(i = mockServerStations.length; i--; )
                    commit("setStation", mockServerStations[i]);
                for(i = languageArray.length; i--; )
                    commit("main/setLastUpdate", ['stationsList', languageArray[i]], { root: true });
            })
            .catch(() => dispatch("main/handleServerError", "getStations ERROR", { root: true }));
    },

    /**
     * Send NEW schedule to server and save in central store
     *
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {number} refresh
     * @param {Function} rootGetters
     * @param {string[]} languageArray
     */
    async getGames({
        dispatch,
        commit,
        rootState: {
            main: {
                refresh: { games: refresh = 3600000 }
            }
        },
        rootGetters
    }: ActionContext<stateEcommerceMap, stateRootMap>, languageArray :string[]): Promise<void> {
        // TTL of every single branch requested
        languageArray = [...new Set(languageArray)].filter((lang) =>
            !(refresh + rootGetters['main/getLastUpdate']('gamesList', lang) > Date.now())
        );
        // TTL
        if(languageArray.length < 1)
            return Promise.resolve();
        return Promise.resolve()
            .then(() => {
                let i :number;
                for(i = mockServerGames.length; i--; )
                    commit("setDataRecord", ["games", mockServerGames[i]]);
                for(i = languageArray.length; i--; )
                    commit("main/setLastUpdate", ['gamesList', languageArray[i]], { root: true });
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
                    if(deliverColors.length < 1)
                        deliverColors = shuffle(randomColorList);
                    commit("setDataRecord", ['users', {
                        ...mockServerUsers[i],
                        color: deliverColors.pop(),
                        // backgroundColor: 'purple',
                        // borderColor: 'black',
                        // textColor: '#FFF', TODO colori chiari?
                    }]);
                    commit("main/setLastUpdate", ['user', mockServerUsers[i].id], { root: true });
                }
                commit("main/setLastUpdate", ['userList'], { root: true });
            })
            .catch(() => dispatch("main/handleServerError", "getUsers ERROR", { root: true }));
    },


    /**
     * GET schedules from server and save them in central store
     *
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} rootState
     * @param {Function} rootGetters
     * @param {string[]} branchArray
     * @param {string[]} languageArray - empty = all languages
     */
    async getInfoData({
          dispatch,
          commit,
          rootState: {
              main: {
                  refresh: {
                      infoData: refresh = 3600000
                  }
              }
          },
          rootGetters
      }: ActionContext<stateEcommerceMap, stateRootMap>, [ branchArray = [], languageArray = [] ] :[string[], string[]]): Promise<void> {
        let i :number;
        let k :number;
        // languages and branches are united, both in lastUpdate and in branch strategy
        // (the check will be done with them merged)
        let branchLanguageArray :string[] = [];
        for(i = branchArray.length; i--; )
            for(k = languageArray.length; k--; )
                branchLanguageArray.push(branchArray[i] + "-" + languageArray[k])
        // then TTL for this merged branchArray
        branchLanguageArray = [...new Set(branchLanguageArray)].filter((id) =>
            !(refresh + rootGetters['main/getLastUpdate']('infoData', id) > Date.now())
        );
        // if no branches remained, no need to go on
        if(branchLanguageArray.length < 1)
            return Promise.resolve();
        // then we need to split the remaining combinations to ask for the missing ones only,
        // resetting the arrays and re-populating them
        branchArray = [];
        languageArray = [];
        for(i = branchLanguageArray.length; i--; ){
            const [ branch, language ] = branchLanguageArray[i].split("-");
            branchArray.push(branch);
            languageArray.push(language);
        }
        return Promise.resolve()
            .then(() => {
                // we don't need the combined branchLanguageArray, but only the branchArray, because the language info
                // will be containe in the object and used in the mutation
                for(let b = branchArray.length; b--; )
                    for(let i = mockServerGameInfoData[branchArray[b]].length; i--; )
                        commit("setInfoData", [branchArray[b], mockServerGameInfoData[branchArray[b]][i]]);
                // for every combination: need to update setLastUpdate
                for(i = branchLanguageArray.length; i--; )
                    commit("main/setLastUpdate", ['infoData', branchLanguageArray[i]], { root: true });
            })
            .catch(() => dispatch("main/handleServerError", "getStations ERROR", { root: true }));
    },

    // ------------- SCHEDULES -------------

    /**
     * GET schedule list from server and save in central store
     *
     * @param {number} scheduleImminentTime
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {number} lastUpdate
     * @param {number} refresh
     * @param {Function} rootGetters
     * @param {string[]} idArray - if empty: getAllRecords mode
     */
    async getSchedules({
        getters: { scheduleImminentTime },
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
                return !(refresh + rootGetters['main/getLastUpdate']('scheduleRecords', id) > Date.now());
            });
            //se non c'è nulla da aggiornare, mi fermo
            if(filteredIdArray.length < 1)
                return Promise.resolve();
        }




        // TODO TEMPORARY PRENOTAZIONE
        commit('setSchedule', {
            id: "itemxxxx",
            start: 1660239000000,
            end: 1660242600000,
            userId: "user1",
            online: false,
            confirmed: false,
            canceled: false,
            unsaved: false,
            paid: false,
            expired: false
        });
        commit('setSchedule', {
            id: "itemyyyy",
            start: 1671354000000,
            end: 1671382800000,
            userId: "user1",
            online: false,
            confirmed: false,
            canceled: false,
            unsaved: false,
            paid: false,
            expired: true
        })
        commit('setSchedule', {
            id: "itemwwww",
            start: 1671051600000,
            end: 1671058800000,
            userId: "user1",
            online: false,
            confirmed: false,
            canceled: false,
            unsaved: false,
            paid: false,
            expired: false
        });
        // TODO TEMPORARY PRENOTAZIONE




        // TODO filteredIdArray or generic
        return Promise.resolve()
            .then(() => {
                for (let i = mockServerSchedule.length; i--;) {
                    commit("setSchedule", {
                        ...mockServerSchedule[i],
                        online: true,
                        unsaved: false,
                        expired: false,
                        // if schedule is imminent (in action because needed getters access)
                        imminent: mockServerSchedule[i].start > Date.now() && mockServerSchedule[i].start < Date.now() + scheduleImminentTime,
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
     * @param {Function} determineScheduleIsAllowed
     * @param {string} id
     * @param {boolean} isAdmin
     * @param {Object} scheduleData
     */
    async addSchedule({ commit, getters: { determineScheduleIsAllowed }, rootState: { user: { userInfo: { id, isAdmin }}}}: ActionContext<stateEcommerceMap, stateRootMap>, scheduleData: scheduleMap) :Promise<string | void> {
        // If NOT admin, user can make decisions only for himself
        if(!isAdmin && scheduleData.userId !== id){
            return Promise.reject(['error-403']);
        }
        // if schedule is not allowed in that timeframe
        const errorArray = determineScheduleIsAllowed(scheduleData.start, scheduleData.end, scheduleData.id, scheduleData.resourceId);
        if(errorArray.length > 0){
            return Promise.reject(errorArray);
        }
        // determine ID if not present
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
        // server
        return Promise.resolve(scheduleId)
            .catch(() => commit("removeDataRecord", ["scheduleRecords", scheduleId]));
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
    async editSchedule({ commit, getters: { getItem, determineScheduleIsEditable, determineScheduleIsAllowed }}: ActionContext<stateEcommerceMap, stateRootMap>, scheduleData: scheduleMap) :Promise<void> {
        const { id, start, end, resourceId } = scheduleData;
        const oldScheduleData = getItem('scheduleRecords', id);
        // if not found (shouldn't happen)
        if(!oldScheduleData){
            return Promise.reject(['error-404']);
        }
        // CHECK if user can edit target schedule
        const errorEditableArray = determineScheduleIsEditable(id);
        if(errorEditableArray.length > 0){
            return Promise.reject(errorEditableArray);
        }
        // CHECK if the edited schedule is allowed in the new timeslots
        const errorAllowedArray = determineScheduleIsAllowed(start, end, id, resourceId);
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
        const archivedEvent = getItem('scheduleArchive', id);
        if(archivedEvent){
            commit("setSchedule", {
                ...archivedEvent,
                unsaved: false
            });
            commit("removeScheduleArchive", id);
            commit("removeDataRecord", ["scheduleArchive", id]);
            return Promise.resolve();
        }
        // if not on archive, download from server
        // force download by resetting the TTW and requesting the new schedule data
        commit("main/resetLastUpdate", ['scheduleRecords', id], { root: true });
        return dispatch('getSchedules', [id]);
    },

    /**
     * Send schedules to server and save in central store, eventually pay
     * OFFLINE => ONLINE
     * ONLINE => CONFIRMED / PAID
     *
     *
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} scheduleRecords
     * @param {number} scheduleTimeStep
     * @param {string} currentUserId
     * @param {Object[]} request
     */
    // TODO "confirmed: true" quando fare i pagamenti?
    //  Il server paga in automatico se hai ore nel wallet e restituisce la lista di ID pagati + nuovo wallet
    //  Restituisce lista "da pagare"\"in attesa di conferma"?
    async sendSchedules({ dispatch, commit, state: { scheduleRecords, scheduleTimeStep }, rootState: { user: { userInfo: { id: currentUserId } } } }: ActionContext<stateEcommerceMap, stateRootMap>, request: sendScheduleRequestMap[] = []): Promise<void> {
        const oldScheduleArray :scheduleMap[] = [];
        const walletRevertArray :Array<[string, number]> = [];
        for(let i = request.length; i--; ){
            const { id, confirm = false, pay = false } = request[i]; // useWallet = false
            let isPaid = false;
            // if it doesn't exist it's an error (should never happen)
            if(!Object.prototype.hasOwnProperty.call(scheduleRecords, id))
                Promise.reject(['error-404']);
            // save old schedule
            oldScheduleArray.push(scheduleRecords[id]);
            // pay the event
            if(pay){
                const { userId, start, end } = scheduleRecords[id];
                // step amount refunded
                const amount = (end - start) / scheduleTimeStep;
                walletRevertArray.push([userId, amount])
                // if it's current user
                if(userId === currentUserId)
                    commit("user/subtractWallet", amount, { root: true });
                // or generic user (admin only)
                commit("subtractWallet", [ userId, amount ]);
                isPaid = true;
            }
            // local edit schedule
            commit("setSchedule", {
                ...oldScheduleArray[oldScheduleArray.length - 1],
                unsaved: false,
                online: true,
                confirmed: confirm,
                paid: isPaid
            });
        }
        return Promise.resolve()
            .then(() => {
                // TODO Possible logical error and revert needed
                // TODO controlla se ha senso mettere catch per primo con
                //   "adderror" che poi casca nel then che fa le sue cose ed eventualmente catch revert
                // TODO LOGICAL ERROR: timeslot unavaible (simultaneous bookings)
                // dispatch("main/handleLogicalError", "sendSchedules ERROR", { root: true })
            })
            .catch(() => {
                // REVERT in case of error
                for(let i = oldScheduleArray.length; i--; )
                    commit("setSchedule", oldScheduleArray[i]);
                // REVERT wallet data in case of error
                for(let i = walletRevertArray.length; i--; ){
                    const [ userId, amount ] = walletRevertArray[i];
                    // if it's current user
                    if(userId === currentUserId)
                        commit("user/addWallet", amount, { root: true });
                    // or generic user (admin only)
                    commit("addWallet", [ userId, amount ]);
                }
                // default handle
                return dispatch("main/handleServerError", "sendSchedules ERROR", { root: true });
            });
    },

    /**
     * REMOVE schedules.
     * There are no checks about time limit or admin because they are made via UI
     * and true controls are on server
     *
     * The paid steps of removed schedules are added to the user wallet
     *
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {Object} scheduleRecords
     * @param {number} scheduleTimeStep
     * @param {string} currentUserId
     * @param {string[]} scheduleIdList
     */
    async removeSchedules({ dispatch, commit, state: { scheduleRecords, scheduleTimeStep }, rootState: { user: { userInfo: { id: currentUserId } } } }: ActionContext<stateEcommerceMap, stateRootMap>, scheduleIdList: string[]): Promise<void> {
        // schedule array to be reverted in case of connection error while removing
        const scheduleArray :scheduleMap[] = [];
        // loop throught schedules to be removed
        for(let i = scheduleIdList.length; i--; ){
            if(scheduleRecords[scheduleIdList[i]])
                scheduleArray.push(scheduleRecords[scheduleIdList[i]]);
            commit("removeDataRecord", ["scheduleRecords", scheduleIdList[i]]);
        }
        // if we are deleting a schedule event that was paid, we need to refund the steps/hours spent
        // server-side calculation (and security) too
        // wallet array revert in case of error
        const walletRevertArray :Array<[string, number]> = [];
        for(let i = scheduleArray.length; i--; ){
            const { userId, start, end, paid = false } = scheduleArray[i];
            // step amount refunded
            const amount = (end - start) / scheduleTimeStep;
            if(!paid)
                continue;
            walletRevertArray.push([userId, amount])
            // if it's current user
            if(userId === currentUserId)
                commit("user/addWallet", amount, { root: true });
            // or generic user (admin only)
            commit("addWallet", [ userId, amount ]);
        }
        return Promise.resolve(scheduleArray)
            .then(() => {
                // TODO Possible logical error and revert needed
                // TODO controlla se ha senso mettere catch per primo con
                //   "adderror" che poi casca nel then che fa le sue cose ed eventualmente catch revert
                // dispatch("main/handleLogicalError", "removeSchedules ERROR", { root: true })
            })
            .catch(() => {
                // REVERT schedule data in case of error
                for(let i = scheduleArray.length; i--; ){
                    commit("setSchedule", {
                        ...scheduleArray[i],
                        online: false,
                        confirmed: false // TODO payments
                    });
                }
                // REVERT wallet data in case of error
                for(let i = walletRevertArray.length; i--; ){
                    const [ userId, amount ] = walletRevertArray[i];
                    // if it's current user
                    if(userId === currentUserId)
                        commit("user/subtractWallet", amount, { root: true });
                    // or generic user (admin only)
                    commit("subtractWallet", [ userId, amount ]);
                }
                return dispatch("main/handleServerError", "removeSchedules ERROR", { root: true });
            });
    }
};