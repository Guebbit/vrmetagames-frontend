import { ref, watch } from "vue";
import { useStore } from "@/store";
import { debounce } from "lodash";
import type { AnyRef } from "@/interfaces";

/**
 * To check a specific value online, wait the response and give it
 *
 * @param {string} dispatchPath - path to action
 * @param {any} checkValue - value to send to action
 * @param {boolean} enabled - if async check is enabled or not
 */
export default <T>(dispatchPath :string, checkValue :AnyRef<T> | (() => T), enabled ?:AnyRef<boolean> | boolean) => {
    const { dispatch } = useStore();

    const valid = ref(false);
    const loading = ref(false);
    const messages = ref<string[]>([]);

    watch(checkValue, debounce((val) => {
        if(!val || (enabled === false || !(enabled as AnyRef<boolean>).value) )
            return;
        loading.value = true;
        return dispatch(dispatchPath, checkValue)
            .then((val :boolean) => {
                // TODO
                messages.value = [];
                valid.value = val;
            })
            .finally(() => loading.value = false);
    }, 500));

    return {
        loading,
        valid,
        messages
    }
}