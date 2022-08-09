import { computed, ComputedRef, Ref } from "vue";
import useItemDetails from "@/resources/composables/useItemDetails";

export interface itemListSettingsMap {
    defaultLoading?: boolean
}

export default<T>(
    id :string,
    itemRecords :Ref<Record<string, T>> | ComputedRef<Record<string, T>>,
    loadPromise :Promise<unknown | unknown[]> = Promise.resolve(),
    settings :itemListSettingsMap = {}
) => {
    /**
     * Base
     */
    const {
        loading,
        userInfo,
        isAdmin,
        isAuthenticated,
        selectedRecord
    } = useItemDetails(
        itemRecords,
        loadPromise,
        settings
    );

    /**
     * Settings
     */
    // const { } = settings;

    /**
     *  List of all itemRecords
     */
    const itemList = computed(() => Object.values(itemRecords.value));

    /**
     *  List of all FILTERED itemRecords
     */
    const filteredItemList = computed(() => {
        // TODO FILTERS
        return itemList.value;
    })

    return {
        loading,
        userInfo,
        isAdmin,
        isAuthenticated,
        selectedRecord,
        itemList,
        filteredItemList
    }
};