<template>
    <v-app>
        <MainNavigation />
        <v-main class="pt-0">
            <router-view />
        </v-main>
        <Transition name="fade">
            <div v-show="loading"
                 class="theme-app-loading"
            >
                <v-progress-circular
                    indeterminate
                    color="primary"
                    :size="200"
                    :width="20"
                ></v-progress-circular>
            </div>
        </Transition>
        <LoginModal />
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import MainNavigation from "@/components/generic/Header.vue";
import LoginModal from "@/components/generic/modals/LoginModal.vue";

export default defineComponent({
    name: "App",
    components: {
        LoginModal,
        MainNavigation
    },
    computed: {
        ...mapState({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            loading: ({ main: { loading } }: any) => loading.includes('main'),
        })
    },

    methods:{
        ...mapActions('main', [
            'initApp'
        ]),
    },

    created(){
        this.initApp();
    },
});
</script>

<style lang="scss">
@import 'src/assets/scss/main.scss';
@import 'src/assets/scss/theme.scss';
</style>

