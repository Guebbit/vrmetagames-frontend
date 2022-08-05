import { ActionContext } from "vuex";
import { stateMainMap, stateRootMap } from "@/interfaces";

export default {

    initApp({ dispatch, rootGetters }: ActionContext<stateMainMap, stateRootMap>){
        // first authenticate user
        dispatch('user/getUserInfo', undefined, { root: true })
            // then download all info from server
            .finally(() => Promise.all([
                dispatch('ecommerce/getStations', undefined, { root: true }),
                dispatch('ecommerce/getGames', undefined, { root: true }),
                dispatch('ecommerce/getUsers', undefined, { root: true }),
                dispatch('ecommerce/getSchedules', undefined, { root: true }),
            ]))
    },

    /**
     * handle server error
     *
     * @param {Function} commit
     * @param {string} message
     */
    async handleServerError({ commit } : ActionContext<stateMainMap, stateRootMap>, message :string): Promise<void> {
        commit("addToast", {
            color: 'error',
            title: 'Server Error',
            text: message,
            timeout: 5000
        });
    },

    /**
     * handle logical error
     *
     * @param {Function} commit
     * @param {string} message
     */
    async handleLogicalError({ commit } : ActionContext<stateMainMap, stateRootMap>, message :string): Promise<void> {
        commit("addToast", {
            color: 'error',
            title: 'Error',
            text: message,
            timeout: 5000
        });
    }
}