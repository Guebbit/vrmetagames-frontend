<template>
	<v-img
		v-if="data.type === 'image'"
		:lazy-src="data.thumbnail"
		:src="data.src"
		cover
	>
		<template #placeholder>
			<v-row
				class="fill-height ma-0"
				align="center"
				justify="center"
			>
				<v-progress-circular
					indeterminate
					color="grey lighten-5"
				></v-progress-circular>
			</v-row>
		</template>
	</v-img>
	<video
		v-if="data.type === 'video'"
		preload="metadata"
		playsinline=""
		muted=""
		loop=""
		autoplay=""
	>
		<source :src="data.src" type="video/mp4">
	</video>
	<iframe
		v-if="data.type === 'youtube'"
		:src="data.src"
		frameborder="0"
		allowfullscreen=""
		autoplay=""
		mute=""
		loop=""
	></iframe>
</template>

<script setup lang="ts">
import { defineProps, computed, type PropType } from "vue";
import type { mediaChunkMap } from "@/interfaces";

const props = defineProps({
	media: {
		type: Object as PropType<mediaChunkMap>,
		required: false
	},
	type: {
		type: String,
		required: false
	},
	src: {
		type: String,
		required: false
	},
	thumbnail: {
		type: String,
		required: false
	},
});

/**
 * So that it's indifferent if I use media or singular properties
 */
const data = computed(() => {
	return {
		...(props.media || {}),
		type: props.type,
		src: props.src,
		thumbnail: props.thumbnail
	}
})
</script>