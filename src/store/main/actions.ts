import { ActionContext } from "vuex";
import { i18n } from "@/plugins/i18n";
import type { stateMainMap, stateRootMap } from "@/interfaces";
const { locale: localeDefault } = i18n.global;

export default {

    initApp({ dispatch }: ActionContext<stateMainMap, stateRootMap>, locale = localeDefault){
        // first authenticate user
        dispatch('user/getCurrentUser', undefined, { root: true })
            // then download all info from server
            .finally(() => {
                // TODO get language from user, it has priority over locale
                return Promise.all([
                    dispatch('ecommerce/getInfoData', [["categories", "tags", "gameParameters"], [locale]], { root: true }),
                    dispatch('ecommerce/getStations', [locale], { root: true }),
                    dispatch('ecommerce/getGames', [locale], { root: true }),
                    dispatch('ecommerce/getUsers', undefined, { root: true }),
                    dispatch('ecommerce/getSchedules', undefined, { root: true }),
                ])
            })
    },

    /**
     * handle server error
     * TODO controlla dove viene richiamato e manda gli errori "veri"
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
    }
}