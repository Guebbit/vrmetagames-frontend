import { computed } from "vue";
import useItemStructure from "@/resources/composables/useItemStructure";
import useItemDetails from "@/resources/composables/useItemDetails";

export default(
    id :string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    itemRecords :Record<string, any> = {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadPromise :any = Promise.resolve()
) => {
    const {
        loading,
        isAuthenticated,
        isAdmin
    } = useItemStructure(loadPromise);

    const {
        selectedItem
    } = useItemDetails(id, itemRecords, loadPromise);

    const itemList = computed(() => Object.values(itemRecords))

    const filteredItemList = computed(() => {
        // TODO FILTERS
        return itemList.value;
    })

    return {
        loading,
        isAuthenticated,
        isAdmin,
        selectedItem,
        itemList,
        filteredItemList
    }
};