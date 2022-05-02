<template>
    <v-app>
        <MainNavigation />
        <v-main class="pt-0">
            <router-view />
        </v-main>
        <LoginModal />
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainNavigation from "@/components/generic/MainNavigation.vue";
import { mapState } from "vuex";
import LoginModal from "@/components/modals/LoginModal.vue";

export default defineComponent({
    name: "App",
    components: {
        LoginModal,
        MainNavigation
    },
    computed: {
        ...mapState({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            showLoginModal: ({ main: { modals } }: any) => !!modals['login'],
        }),
    }
});
</script>

<style lang="scss">
@import 'src/assets/scss/main.scss';
@import 'src/assets/scss/theme.scss';
</style>

