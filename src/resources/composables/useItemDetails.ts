import { computed } from "vue";
import useItemStructure from "@/resources/composables/useItemStructure";

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
    } = useItemStructure(loadPromise)

    // const itemList = computed(() => Object.values(itemRecords))
    // const filteredItemList = computed(() => itemList.value)

    const selectedItem = computed<unknown | undefined>(() => {
        if(!Object.prototype.hasOwnProperty.call(itemRecords, id)){
            return undefined;
        }
        return itemRecords[id];
    })

    return {
        loading,
        isAuthenticated,
        isAdmin,
        selectedItem,
    }
};