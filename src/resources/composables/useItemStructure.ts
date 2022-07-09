import { useStore } from "@/store";
import { computed, onBeforeMount, toRefs } from "vue";
import { getUUID } from "guebbit-javascript-library";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (loadPromise :any) => {
  const {
    state,
    getters,
    commit
  } = useStore();

  const { loading } = toRefs(state.main);
  const { userInfo } = toRefs(state.user);

  const loadingName = getUUID();

  // const resourceHandleSuccess = () => {};
  // const resourceHandleError = () => {};
  const isAuthenticated = computed<boolean>(() => getters['user/isAuthenticated']);

  const loadingItems = computed(() => loading.value.includes(loadingName));

  /**
   * Load items required (or single target item?)
   */
  const loadItems = () => {
    commit('main/startLoading', loadingName);
    loadPromise()
        // .then(resourceHandleSuccess)
        // .catch(resourceHandleError)
        .finally(() => {
          commit('main/stopLoading', loadingName);
        });
  };

  onBeforeMount(() => {
    loadItems();
  })

  return {
    loading: loadingItems,
    isAuthenticated,
    isAdmin: userInfo.value.isAdmin
  };
};