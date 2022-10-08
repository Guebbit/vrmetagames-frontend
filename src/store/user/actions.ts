import type { ActionContext } from "vuex";
import type { stateUserMap, stateRootMap, loginFormMap, userInfoFormMap } from "@/interfaces";

const mockUserInfo = {
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
};

const mockPaymentMethods = [
    {
        id: "paypal1",
        name: "Nome Proprietario",
        logo: "https://assets.guebbit.com/vrmetagames/images/logo/PayPal.svg",
        icon: ['fab', 'cc-paypal'],
        iconColor: "#f0f0f0",
        cardBackground: "#ffff33",
        cardColor: "#000000",
        cardEmail: "guerzoni.andrea91@gmail.com",
        cardExpire: "10/25",
    },
    {
        id: "mastercard1",
        name: "Nome Proprietario",
        logo: "https://assets.guebbit.com/vrmetagames/images/logo/MasterCard.svg",
        icon: ['fas', 'credit-card'],
        iconColor: "#ffff33",
        cardBackground: "#f0f0f0",
        cardColor: "#231F20",
        cardNumber: "5200828282828210",

    }
];
const mockPaymentRecords = [
    {
        id: 'item-1',
        time: 1649620712000,
        total: 50,
        currency: '€'
    },
    {
        id: 'item-2',
        methodId: 'paypal1',
        type: 'paypal',
        code: '645675496',
        time: 1649620712000,
        total: 50,
        currency: '€'
    },
    {
        id: 'item-3',
        methodId: 'mastercard1',
        type: 'credit-card',
        code: '645674965',
        time: 1649620712000,
        total: 50,
        currency: '€'
    },
    {
        id: 'item-4',
        methodId: 'mastercard1',
        type: 'credit-card',
        code: '1050017AS',
        time: 1649620712000,
        total: 50,
        currency: '€'
    },
    {
        id: 'item-5',
        time: 1649620712000,
        total: 50,
        currency: '€'
    },
    {
        id: 'item-6',
        methodId: 'paypal1',
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
     * @param {Function} dispatch
     * @param {Object} form
     * @return {Promise}
     */
    async userRegistration({ commit, dispatch }: ActionContext<stateUserMap, stateRootMap>, form :userInfoFormMap) :Promise<void> {
        console.log("REGISTER", form);
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
     * @param {Function} dispatch
     * @param {string} user
     * @param {string} password
     * @return {Promise}
     */
    async userLogin({ commit, dispatch }: ActionContext<stateUserMap, stateRootMap>, { authentication, password } :loginFormMap) :Promise<void> {
        console.log("LOGIN", authentication, password)
        return Promise.resolve().then(() => {
            commit("setAuthenticationTokens", {
                jwt: '1234'
            });
            return dispatch("main/initApp", undefined, { root: true });
        })
        .catch(() => dispatch("main/handleServerError", "getStations ERROR", { root: true }));
    },

    /**
     *
     * @param {Function} commit
     * @param {Function} dispatch
     * @param {Object} form + id
     * @return {Promise}
     */
    async userEdit({ commit, dispatch }: ActionContext<stateUserMap, stateRootMap>, form :userInfoFormMap & { id: string }) :Promise<void> {
        console.log("USER EDIT", form.id, form);
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
     * Check if username is already used or not
     * WARNING: must be debounced (can't do here because it would not return the value)
     *
     * @param {Function} dispatch
     * @param {string} check
     * @return {Promise}
     */
    async checkUsername({ dispatch }: ActionContext<stateUserMap, stateRootMap>, check :string) :Promise<boolean> {
        console.log("STRING", check)
        return Promise.resolve()
            .then(() => {
                return true;
            })
            .catch(() => {
                dispatch("main/handleServerError", "getStations ERROR", { root: true });
                return false;
            });
    },

    /**
     * Check if email is already used or not
     * WARNING: must be debounced (can't do here because it would not return the value)
     *
     * @param {Function} dispatch
     * @param {string} check
     * @return {Promise}
     */
    async checkEmail({ dispatch }: ActionContext<stateUserMap, stateRootMap>, check :string) :Promise<boolean> {
        console.log("STRING", check)
        return Promise.resolve()
            .then(() => {
                return true;
            })
            .catch(() => {
                dispatch("main/handleServerError", "getStations ERROR", { root: true });
                return false;
            });
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
    async getCurrentUser({
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