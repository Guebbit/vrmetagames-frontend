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
        // TODO
        console.error("SERVER ERROR", message)
        commit("addError", {
            text: message
            // text, time, type?
        });
    },

    /**
     * handle logical error
     *
     * @param {Function} commit
     * @param {string} message
     */
    async handleLogicalError({ commit } : ActionContext<stateMainMap, stateRootMap>, message :string): Promise<void> {
        // TODO
        console.error("LOGICAL ERROR", message)
        commit("addError", {
            text: message
            // text, time, type?
        });
    }
}