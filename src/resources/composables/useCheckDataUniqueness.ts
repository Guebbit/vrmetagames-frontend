import { ref, watch, type ComputedRef } from "vue";
import { useStore } from "@/store";
import { debounce } from "lodash";

export default (dispatchPath :string, checkValue :ComputedRef<unknown>) => {
    const { dispatch } = useStore();

    const valid = ref(false);
    const loading = ref(false);
    watch(checkValue, debounce((val) => {
        if(!val)
            return;
        loading.value = true;
        return dispatch(dispatchPath, checkValue.value)
            .then((val :boolean) => valid.value = val)
            .finally(() => loading.value = false);
    }, 500));

    return {
        valid,
        loading,
    }
}