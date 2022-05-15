import type { stateMainMap } from "@/interfaces";

export default {

    // ---------------------- TODO core? ----------------------

    /**
     * Add error\toast for a set amount of time
     */
    addError() {
        console.log("ERROR")
        // text, time, type?
    },

    /**
     * Open/Close modal
     *
     * @param {Object} modals
     * @param {string} name
     * @param {boolean | null} value - if null = toggle
     */
    toggleModal({ modals }: stateMainMap, [name = '', value = null]: [string, boolean | null]) {
        modals[name] = value == null ? !value : value;
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