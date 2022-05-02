import type { stateMainMap } from "@/interfaces";

export default {

    /**
     * Open/Close modal
     *
     * @param {Object} modals
     * @param {string} name
     * @param {boolean | null} value - if null = toggle
     */
    toggleModal({ modals }: stateMainMap, [name, value]: [string, boolean | null]) {
        modals[name] = value == null ? !value : value;
    }
};