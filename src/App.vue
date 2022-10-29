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

		<!-- Toasts -->
		<div class="app-top-container">
			<v-alert
				v-for="{ id, color = 'surface', closable = true, variant, title, text } in toasts"
				:key="'toast-' + id"
				class="my-2"
				:class="{
					'full': variant === 'full'
				}"
				border="start"
				:color="color"
				density="compact"
				prominent
			>
				<v-alert-title v-show="title">{{ title }}</v-alert-title>
				<p v-show="text">{{ text }}</p>
				<template #prepend>
					<font-awesome-icon size="xl" :icon="['fas', 'circle-info']" />
				</template>
				<template #append>
					<v-btn
						v-show="closable"
						icon
						variant="text"
						@click="commit('main/removeToast', id)"
					>
						<font-awesome-icon :icon="['fas', 'xmark']" />
					</v-btn>
				</template>
			</v-alert>
		</div>

    </v-app>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "@/store";
import MainNavigation from "@/components/generic/Header.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
library.add(faXmark, faCircleInfo);

const { locale } = useI18n();

const {
    state,
	commit,
    dispatch
} = useStore();

const { loading, toasts } = toRefs(state.main);

commit('main/startLoading', 'main');
dispatch('main/initApp', locale.value).finally(() => commit('main/stopLoading', 'main'));
</script>

<style lang="scss">
@import 'src/assets/scss/main.scss';
@import 'src/assets/scss/theme.scss';

html {
	// vuetify scroll-right fix
	overflow-y: auto !important;
}

.app-top-container{
	position: fixed;
	top: 0;
	right: 0;
	z-index: 1005;
	padding: 12px;

	.v-alert{
		max-width: 600px;
	}
}
</style>

