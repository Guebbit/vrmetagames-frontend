import { ActionContext } from "vuex";
import { stateMainMap, stateRootMap } from "@/interfaces";

export default {

    initApp({ dispatch, rootGetters }: ActionContext<stateMainMap, stateRootMap>){
        const promisesArray = [
            dispatch('ecommerce/getStations', undefined, { root: true }),
            dispatch('ecommerce/getGames', undefined, { root: true }),
            dispatch('ecommerce/getUsers', undefined, { root: true }),
            dispatch('ecommerce/getSchedules', undefined, { root: true }),
        ];
        // authenticated only data
        if(rootGetters['user/isAuthenticated']){
            promisesArray.push(
                dispatch('user/getUserInfo', undefined, { root: true })
            );
        }
        return Promise.all(promisesArray);
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