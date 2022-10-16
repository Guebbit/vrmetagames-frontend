import { computed, ref } from "vue";
import useItemDetails from "@/resources/composables/useItemDetails";
import { search, sort } from "guebbit-javascript-library"
import type { filterRulesMap, filterGroupMap, filterFunctionMap, logicGatesType, sortParameterType } from "guebbit-javascript-library";

import type { AnyRef } from "@/interfaces";

export interface itemListSettingsMap {
    defaultLoading?: boolean
}

export interface itemListFiltersMap {
    logic?: logicGatesType,
    rules?: Array<filterRulesMap | filterGroupMap | filterFunctionMap>,
}

export default<T>(
    itemRecords :AnyRef<Record<string, T>>,
    loadPromise :Promise<unknown | unknown[]> = Promise.resolve(),
    filters: AnyRef<itemListFiltersMap> = ref({}),
    sorters: AnyRef<Array<sortParameterType>> = ref([]),
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
    const itemListFiltered = computed(() => {
        const { logic = 'AND', rules = [] } = filters.value;
        // if no filters are set
        if(rules.length < 1)
            return itemList.value;
        // guebbit filter
        return sort(
            search(
                [ ...itemList.value ] as Array<Record<string, unknown | unknown[]>>,
                rules,
                logic
            ),
            sorters.value
        );
    });

    return {
        loading,
        userInfo,
        isAdmin,
        isAuthenticated,
        selectedRecord,
        itemList,
        itemListFiltered
    }
};