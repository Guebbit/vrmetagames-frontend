import type { ActionContext } from "vuex";
import type { stateUserMap, stateRootMap } from "@/interfaces";

const mockUserInfo = {
    id: 'user1',
    avatar: "https://randomuser.me/api/portraits/women/85.jpg",
    username: "UsernameTonio",
    name: "Tonio Cartonio",
    email: "tonio.cartonio@gmail.com",
    phone: "+39 123 4567",
    birthdate: 1649620712000,
    description: "lorem ipsum blablabla cose a caso",
    wallet: 95,
    lastVisit: 1653050140000,
    isAdmin: true,  // TODO false test
};
const mockPaymentMethods = [
    {
        id: "paypal1",
        name: "Nome Proprietario",
        logo: "https://assets.guebbit.com/vrmetagames/images/logo/PayPal.svg",
        background: "#ffff33",
        color: "#000000",
        cardEmail: "guerzoni.andrea91@gmail.com",
        cardExpire: "10/25",
    },
    {
        id: "mastercard1",
        name: "Nome Proprietario",
        logo: "https://assets.guebbit.com/vrmetagames/images/logo/MasterCard.svg",
        background: "#f0f0f0",
        color: "#231F20",
        cardNumber: "5200828282828210"
    }
];
const mockPaymentRecords = [
    {
        id: 'item-1',
        type: '',
        code: 'XXXXXXXXX',
        time: 1649620712000,
        total: 50,
        currency: '€'
    },
    {
        id: 'item-2',
        type: 'paypal',
        code: '645675496',
        time: 1649620712000,
        total: 50,
        currency: '€'
    },
    {
        id: 'item-3',
        type: 'credit-card',
        code: '645674965',
        time: 1649620712000,
        total: 50,
        currency: '€'
    },
    {
        id: 'item-4',
        type: 'credit-card',
        code: '1050017AS',
        time: 1649620712000,
        total: 50,
        currency: '€'
    },
    {
        id: 'item-5',
        type: '',
        code: 'XXXXXXXXX',
        time: 1649620712000,
        total: 50,
        currency: '€'
    },
    {
        id: 'item-6',
        type: 'paypal',
        code: '345364853',
        time: 1649620712000,
        total: 50,
        currency: '€'
    }
];

export default {

    /**
     *
     * @param {Function} commit
     * @param {dispatch} commit
     * @return {Promise}
     */
    async userLogin({ commit, dispatch }: ActionContext<stateUserMap, stateRootMap>) :Promise<void> {
        return Promise.resolve().then(() => {
            commit("setAuthenticationTokens", {
                jwt: '1234'
            });
            // redo init, with authentication this time (TTL of previous info prevent useless calls)
            return dispatch("main/initApp", undefined, { root: true });
        })
        .catch(() => dispatch("main/handleServerError", "getStations ERROR", { root: true }));
    },


    /**
     *
     * @param {Function} commit
     */
    userLogout({ commit }: ActionContext<stateUserMap, stateRootMap>) {
        // reset tokens
        commit("setAuthenticationTokens");
    },

    /**
     * AUTHENTICATION REQUESTED
     * Get current user info from server
     *
     * @param {Function} dispatch
     * @param {Function} commit
     * @param {number} lastUpdate
     * @param {number} refresh
     * @return {Promise}
     */
    async getUserInfo({
            dispatch,
            commit,
            rootState: {
                main: {
                    lastUpdate: { userInfo: lastUpdate = 0 },
                    refresh: { userInfo: refresh = 3600000 }
                }
            }
        }: ActionContext<stateUserMap, stateRootMap>): Promise<void> {
        if(lastUpdate + refresh > Date.now()){
            return Promise.resolve();
        }
        return Promise.resolve()
            .then(() => {
                commit("setUserInfo", { ...mockUserInfo });
                for (let i = mockPaymentMethods.length; i--;) {
                    commit("setPaymentMethods", mockPaymentMethods[i]);
                }
                for (let i = mockPaymentRecords.length; i--;) {
                    commit("setPaymentRecord", mockPaymentRecords[i]);
                }
                commit("main/setLastUpdate", ['userInfo'], { root: true });
            })
            .catch(() => dispatch("main/handleServerError", "getStations ERROR", { root: true }));
    },

}