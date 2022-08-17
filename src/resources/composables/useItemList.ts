import { computed, ref } from "vue";
import useItemDetails from "@/resources/composables/useItemDetails";
import { searchRecords } from "guebbit-javascript-library";
import type { filterRulesMap, logicGatesType } from "guebbit-javascript-library";
import type { AnyRef } from "@/interfaces";


// TODO capire perché l'estensione da problemi
export interface itemListFiltersMap { // extends filterRulesMap {
    // if string, minimum number of characters to trigger search
    stringLimit?: number

    // TODO fix extends
    search: string | string[]
    searchParams: string | string[]
    logic?: logicGatesType,
    sensitive?: boolean
    distance?: number
}

export interface itemListSettingsMap {
    defaultLoading?: boolean
}

export default<T>(
    itemRecords :AnyRef<Record<string, T>>,
    loadPromise :Promise<unknown | unknown[]> = Promise.resolve(),
    filters: AnyRef<itemListFiltersMap[]> = ref([]),
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
     * Non-generic function that decide what filter/search use in every occasion
     * // TODO sostituire con search generico guebbit-javascript-library?
     *
     * @param item
     * @param search
     * @param searchParams
     * @param logic
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function itemTotalFilter(item :any, search :string | string[] = [], searchParams: string[] = [], logic :logicGatesType = "or") {
        // for every search parameter
        for(let i = searchParams.length; i--; ){
            // if search parameter doesn't exist on item must be false
            if(!Object.prototype.hasOwnProperty.call(item, searchParams[i]))
                return false;
            // item parameter to compare with requested filter
            const searchable = item[searchParams[i]];
            // if search & searchable are array es: "list of categories to filter" against "list of categories of item"
            if(Array.isArray(search) && Array.isArray(searchable)){
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if(logic === "or" && search.some((s :any) => searchable.includes(s)))
                    return true;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if(logic === "and" && search.every((s :any) => searchable.includes(s)))
                    return true;
                // TODO not, nand, nor
            }else {
                // search and searchable can be string or array, but only one of them (these are the remaining options, no need to check)
                // string to filter: insensitive check if {search} is in {searchable}
                // TODO match guebbit-javascript-library (che fa 2-way di default)
                const searchableArray :string[] = Array.isArray(searchable) ? searchable : [searchable];
                const searchArray :string[] = Array.isArray(search) ? search : [search];
                for(let k = searchArray.length; k--; )
                    for(let z = searchableArray.length; z--; )
                    if(searchableArray[z].toLowerCase().includes(searchArray[z].toLowerCase()))
                        return true;
            }
        }
        return false;
    }

    /**
     *  List of all FILTERED itemRecords
     */
    const itemListFiltered = computed(() => {
        // if no filters are set
        if(filters.value.length < 1)
            return itemList.value;
        // starting list
        let filteredArray = [ ...itemList.value ] as Record<string, unknown>[];
        // guebbit filter
        filteredArray = searchRecords(filteredArray, filters.value);
        return filteredArray;
    })

    return {
        loading,
        userInfo,
        isAdmin,
        isAuthenticated,
        selectedRecord,
        itemList,
        itemListFiltered,
        itemTotalFilter
    }
};