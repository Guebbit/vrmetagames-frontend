<template>
    <v-app>
		<!-- Page -->
        <MainNavigation />
        <v-main class="pt-0">
            <router-view />
			<!-- Footer -->
        </v-main>

		<!-- Page loading -->
        <Transition name="fade">
            <div
				v-show="loading.includes('main')"
				class="theme-app-loading bg-background"
            >
				<div class="animation-loading-alex-warnes rotating-squares">
					<div></div>
					<div></div>
				</div>
            </div>
        </Transition>
		<!-- Minor loading -->
		<div
			v-show="!loading.includes('main') && loading.length > 0"
			class="theme-page-loading animation-loading-alex-warnes rotating-squares"
		>
			<div></div>
			<div></div>
		</div>


		<!-- Modals -->
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
	commit,
    dispatch
} = useStore();

const { loading } = toRefs(state.main);

commit('main/startLoading', 'main');
dispatch('main/initApp').finally(() => commit('main/stopLoading', 'main'));
</script>

<style lang="scss">
@import 'src/assets/scss/main.scss';
@import 'src/assets/scss/theme.scss';

html {
	// vuetify scroll-right fix
	overflow-y: auto !important;
}
</style>

