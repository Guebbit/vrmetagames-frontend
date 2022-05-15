import { ActionContext } from "vuex";
import { stateMainMap, stateRootMap } from "@/interfaces";

export default {

    initApp({ dispatch }: ActionContext<stateMainMap, stateRootMap>){
        return Promise.all([
            dispatch('ecommerce/getStations'),
            dispatch('ecommerce/getGames'),
            dispatch('ecommerce/getUsers'),
            dispatch('ecommerce/getSchedules'),
        ]);
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