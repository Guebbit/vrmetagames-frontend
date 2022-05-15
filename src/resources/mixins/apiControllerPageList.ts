import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";

// export default {
export default defineComponent({

    data: () => {
        return {
            selectedItem: '',
            // filtered by (array of params)
            searchBy: [] as string[],         // TODO
            // ordered by (array of params)
            orderBy: [] as string[],          // TODO
            itemIdentifier: 'id',
            loadingName: 'generic',
        }
    },

    computed: {
        ...mapState({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            loadingList: ({ main: { loading } }: any) => loading,
        }),

        /**
         * loading of page
         */
        loading(){
            return this.loadingList.includes(this.loadingName);
        },

        /**
         * list of items
         */
        itemList() {
            return [];
        },

        /**
         * if filters are needed
         */
        filteredItemList() {
            return this.itemList;
        }
    },

    methods:{
        ...mapMutations("main", [
            "startLoading",
            "stopLoading"
        ]),

        /**
         * Promise that load data
         */
        resourcePromise() :Promise<void | void[]> {
            return this.getItems();
        },

        /**
         * Handle errors
         */
        resourceHandleError(){
            // TODO toast?
        },

        initCreated(){
            this.startLoading(this.loadingName);
            this.resourcePromise()
                .then(this.resourceHandleSuccess)
                .catch(this.resourceHandleError)
                .finally(() => {
                    this.stopLoading(this.loadingName);
                });
        },

        // ------------ PLACEHOLDERS ------------

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        resourceHandleSuccess(){},
        getItems(){
            return Promise.resolve();
        },
        addItems(){
            return Promise.resolve();
        },
        removeItems(){
            return Promise.resolve();
        },
    },

    created(){
        this.initCreated();
    },
});