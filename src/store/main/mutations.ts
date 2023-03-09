import { getUUID } from "@guebbit/javascript-library";
import type { stateMainMap, toastMap } from "@/interfaces";

export default {

    // ---------------------- TODO core? ----------------------

    /**
     * Add and automatically remove toasts (snackbars)
     *
     * @param {Object[]} toasts
     * @param {Object} toast
     */
    addToast({ toasts = [] }: stateMainMap, toast :toastMap) {
        // unique id to delete it dynamically
        toast.id = getUUID();
        // add
        toasts.push(toast);
        // remove after timeout (if any)
        if(toast.timeout && toast.timeout > 0)
            setTimeout(() => {
                toasts.splice(toasts.findIndex(({id}) => id === toast.id), 1);
                // expire time
            }, toast.timeout)
    },

    /**
     * Remove target toast
     *
     * @param {Object[]} toasts
     * @param {string} toastId
     */
    removeToast({ toasts = [] }: stateMainMap, toastId :string) {
        toasts.splice(toasts.findIndex(({id}) => id === toastId), 1);
    },

    /**
     * segnalo che un loading è finito
     *
     * @param {Object} loading
     * @param {string} branch
     * @param {boolean} loadingFlag
     */
    startLoading: ({ loading } :stateMainMap, branch :string) :void => {
        if(!loading.includes(branch)){
            loading.push(branch);
        }
    },

    /**
     * segnalo se sto caricando qualcosa
     *
     * @param {Object} loading
     * @param {string} branch
     * @param {boolean} loadingFlag
     */
    stopLoading: ({ loading } :stateMainMap, branch :string) :void => {
        loading.splice(loading.indexOf(branch), 1)
    },

    /**
     * segnalo cosa ho caricato (nel caso di "cart", se l'ho caricato la prima volta.) (può essere usato in futuro per emettere eventi
     *
     * @param {string[]} loaded
     * @param {string} branch
     */
    setLoaded: ({ loaded } :stateMainMap, branch :string) :void => {
        loaded.push(branch);
    },

    /**
     * Set timestamp of last time data was downloaded from server
     * Needed for TTL
     *
     * @param {Object} lastUpdate
     * @param {string} branch
     * @param {string} id
     */
    setLastUpdate: ({ lastUpdate } :stateMainMap, [branch, id] :[string, string?] ) :void => {
        // branch only
        if(!id){
            lastUpdate[branch] = Date.now();
            return;
        }
        // leaf
        if(!Object.prototype.hasOwnProperty.call(lastUpdate, branch)){
            lastUpdate[branch] = {};
        }
        lastUpdate[branch][id] = Date.now();
    },

    /**
     * Reset TTL
     *
     * @param {Object} lastUpdate
     * @param {string} branch
     * @param {string} id
     */
    resetLastUpdate: ({ lastUpdate } :stateMainMap, [branch, id] :[string, string?] ) :void => {
        // branch only
        if(!id){
            lastUpdate[branch] = 0;
            return;
        }
        // leaf
        if(!Object.prototype.hasOwnProperty.call(lastUpdate, branch)){
            lastUpdate[branch] = {};
        }
        lastUpdate[branch][id] = 0;
    },

};