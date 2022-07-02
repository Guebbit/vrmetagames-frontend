<template>
    <v-app>
        <MainNavigation />
        <v-main class="pt-0">
            <router-view />
        </v-main>
        <Transition name="fade">
            <div v-show="loading.includes('main')"
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
        <PlayModal />
    </v-app>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { useStore } from "@/store";
import MainNavigation from "@/components/generic/Header.vue";
import LoginModal from "@/components/generic/modals/LoginModal.vue";
import PlayModal from "@/components/generic/modals/PlayModal.vue";

const {
    state,
    dispatch
} = useStore();

const { loading } = toRefs(state.main);

dispatch('main/initApp');
</script>

<style lang="scss">
@import 'src/assets/scss/main.scss';
@import 'src/assets/scss/theme.scss';
</style>

