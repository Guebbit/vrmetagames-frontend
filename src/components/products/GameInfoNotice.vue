<template>
	<span
		class="simple-text-icon"
		:class="{
			'long-text': label.length > 10
		}"
	>
		<span class="icon">
			<span
				v-show="value"
				class="mr-2"
			>
				{{ value }}
			</span>
			<slot />
		</span>
		<span class="text">{{ label }}</span>
	</span>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
	label: {
		type: String,
		required: true
	},
	value: {
		type: String,
		required: false
	}
});
</script>

<style lang="scss">
.simple-text-icon {
	margin: 12px;
	.icon{
		color: inherit;
	}
	&.long-text{
		.text{
			font-size: 0.8em;
			// line-height: 2.5;
		}
	}
}
</style>