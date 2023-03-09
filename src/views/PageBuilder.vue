<template>
	<div id="work-in-progress-page" class="theme-page full-page">
		<Panel class="theme-panel"
			shadow="#000000"
			:shadow-opacity="0.9"
			centered
			strict
			hero
		>
			<template #default>
				<h1>{{locale}}</h1>
				<pre>{{selectedPageInstructions}}</pre>
			</template>
			<template #background>
				<video class="panel-background" autoplay="" loop="" muted="" poster="">
					<source src="https://mangabeats.it/public/video/videogames/mix.mp4" type="video/mp4">
				</video>
			</template>
		</Panel>
	</div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useI18n } from "vue-i18n";
import Panel from "guebbit-vue-library/src/components/blocks/Panel.vue";
import { useTheme } from "vuetify";
import type { pageBuilderMap } from "@/resources/composables/usePageBuilder";

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { locale, t } = useI18n();

const props = defineProps({
    uri: {
        type: String,
        required: true
    }
});

const pageInstructions :pageBuilderMap[] = [
	{
		id: 'test-1',
		uri: 'about-us',
		lang: 'it',
		instructions: [
			{
				type: 'panel',
				title: 'title: lorem ipsum',
				text: 'text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				image: '',
				imageThumbnail: '',
			},
			{
				type: 'image',
				image: '',
				imageThumbnail: '',
				// TODO creare interface delle immagini (mettere alt e title)
			},
			{
				type: 'text',
				title: 'title: lorem ipsum',
				subtitle: 'subtitle: lorem ipsum',
				text: 'text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			}
		]
	},
	{
		id: 'test-2',
		uri: 'about-us',
		lang: 'en',
		instructions: [
			{
				type: 'text',
				title: 'FAIL'
			}
		]
	}
]

const selectedPageInstructions = computed<pageBuilderMap[]>(
	() => pageInstructions.filter(
		({ uri, lang }) => uri === props.uri && lang === locale.value
	)
);
</script>

<style lang="scss">
@import 'src/assets/scss/main/global';
</style>