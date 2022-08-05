import { computed, ref, type Ref, type ComputedRef } from "vue";
import useItemStructure from "@/resources/composables/useItemStructure";

export default <T>(
    itemRecords :Ref<Record<string, T>> | ComputedRef<Record<string, T>>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadPromise :unknown = Promise.resolve()
) => {
    const {
        loading,
        isAuthenticated,
        isAdmin
    } = useItemStructure(loadPromise)

    /**
     *
     */
    const itemList = computed(() => Object.values(itemRecords.value));

    /**
     *
     */
    const filteredItemList = computed(() => itemList.value);

    /**
     *
     */
    const selectedIdentifier = ref('');

    /**
     * selected item
     */
    const selectedRecord = computed<unknown | undefined>(() => {
        if(!Object.prototype.hasOwnProperty.call(itemRecords.value, selectedIdentifier.value)){
            return undefined;
        }
        return itemRecords.value[selectedIdentifier.value];
    })

    /**
     * Select target item
     * @param {string} id
     */
    const selectTargetRecord = (id :string) => {
        if(!Object.prototype.hasOwnProperty.call(itemRecords.value, id)){
            return undefined;
        }
        selectedIdentifier.value = id;
    };

    return {
        loading,
        isAuthenticated,
        isAdmin,
        selectedIdentifier,
        selectedRecord,
        selectTargetRecord,
        itemList,
        filteredItemList,
    }
};