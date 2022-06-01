import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";

// export default {
export default defineComponent({

    data: () => {
        return {
            selectedItemIdentifier: '',
            // filtered by (array of params)
            searchBy: [] as string[],         // TODO
            // ordered by (array of params)
            orderBy: [] as string[],          // TODO
            itemIdentifier: 'id',             // TODO
            itemLabel: 'label',               // TODO
            loadingName: 'generic',
        }
    },

    computed: {
        ...mapState({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            loadingItems: ({ main: { loading } }: any) => loading,
        }),

        /**
         * loading of page
         * 
         * @return {boolean}
         */
        loading() :boolean {
            return this.loadingItems.includes(this.loadingName);
        },

        /**
         * Records of items
         * 
         * @return {Object}
         */
        itemsRecords() :Record<string,unknown> {
            return {};
        },

        /**
         * list of items
         * 
         * @return {Object[]}
         */
        itemList() :unknown[] {
            return Object.values(this.itemsRecords);
        },

        /**
         * if filters are needed
         */
        filteredItemList() :unknown[] {
            return this.itemList;
        },

        /**
         * current selected item
         */
        selectedItem() :unknown {
            if(!Object.prototype.hasOwnProperty.call(this.itemsRecords, this.selectedItemIdentifier)){
                return undefined;
            }
            return this.itemsRecords[this.selectedItemIdentifier];
        },
    },

    methods:{
        ...mapActions('main', [
            'initApp'
        ]),
        ...mapMutations("main", [
            "startLoading",
            "stopLoading"
        ]),

        /**
         * Promise that load data
         */
        async resourcePromise() :Promise<void | void[]> {
            return Promise.all([
                this.initApp(),
                this.getItems()
            ]);
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

        async resourceHandleSuccess(){
            return Promise.resolve();
        },
        async getItems(){
            return Promise.resolve();
        },
        async setItems(){
            return Promise.resolve();
        },
        async removeItems(){
            return Promise.resolve();
        },
    },

    created(){
        this.initCreated();
    },
});