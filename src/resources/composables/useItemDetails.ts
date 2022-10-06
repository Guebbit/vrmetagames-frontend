import { computed, ref, type Ref, type ComputedRef } from "vue";
import useItemStructure from "@/resources/composables/useItemStructure";

export interface itemDetailsSettingsMap {
    defaultLoading?: boolean,
    userIdParam?: string
}

export default <T = unknown>(
    itemRecords :Ref<Record<string, T>> | ComputedRef<Record<string, T>>,
    loadPromise :Promise<unknown | unknown[]> = Promise.resolve(),
    settings :itemDetailsSettingsMap = {}
) => {
    /**
     * Base
     */
    const {
        loading,
        userInfo,
        isAdmin,
        isAuthenticated,
    } = useItemStructure(
        loadPromise,
        settings
    )

    /**
     * Settings
     */
    const {
        userIdParam = 'userId'
    } = settings;

    /**
     *
     */
    const selectedIdentifier = ref<string | undefined>();

    /**
     *
     * @param id
     */
    const getRecord = (id ?:string) :T | undefined =>
        (!id || !Object.prototype.hasOwnProperty.call(itemRecords.value, id)) ? undefined : itemRecords.value[id];

    /**
     * Select target item
     * @param {string} id
     */
    const selectTargetRecord = (id ?:string) =>
        selectedIdentifier.value = (!id || !Object.prototype.hasOwnProperty.call(itemRecords.value, id)) ? undefined : id;

    /**
     * selected item
     */
    const selectedRecord = computed<T | undefined>(() =>
        selectedIdentifier.value ? getRecord(selectedIdentifier.value) : undefined
    );

    /**
     * [UI]
     * Permission for user to see all the record's data
     *  - user is authenticated admin
     *  - user ia authenticated owner/related
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const selectedRecordPermission = computed<boolean>(() => isAuthenticated ? (isAdmin ? true : (selectedRecord.value && selectedRecord.value[userIdParam] as string) === userInfo.value.id) : false)

    return {
        loading,
        userInfo,
        isAdmin,
        isAuthenticated,
        getRecord,
        selectTargetRecord,
        selectedIdentifier,
        selectedRecord,
        selectedRecordPermission
    }
};