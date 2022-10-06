<template>
	<v-text-field
		v-model="modelValueC"
		type="number"
		v-bind="$props"
		:class="[
			$attrs.class,
			['vuetify-input-number-fix'],
			{
				'show-buttons': showButtons
			}
		]"
	>
		<template v-for="(index, name) in $slots" v-slot:[name]="data">
			<slot :name="name" v-bind="data"></slot>
		</template>
		<template v-slot:prepend-inner>
			<v-btn
				v-show="showButtons"
				:variant="buttonVariant"
				:size="buttonSize"
				icon
				@click="modelValueC--"
			>
				<font-awesome-icon
					:icon="['fas', 'minus']"
				/>
			</v-btn>
		</template>
		<template v-slot:append-inner>
			<v-btn
				v-show="showButtons"
				:variant="buttonVariant"
				:size="buttonSize"
				icon
				@click="modelValueC++"
			>
				<font-awesome-icon
					:icon="['fas', 'plus']"
				/>
			</v-btn>
		</template>
	</v-text-field>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, watch, type PropType } from "vue";

/**
 *
 */
const emit = defineEmits([
	'update:modelValue'
]);

/**
 *
 */
const props = defineProps({
	modelValue: {
		type: Number,
		required: false
	},
	max: {
		type: String,
		required: false
	},
	min: {
		type: String,
		required: false
	},
	/**
	 * TODO creare combinazioni diverse e fare bottoni quadrati con colori fissi in caso di determinati variant dell'input
	 */
	buttonVariant: {
		type: String as PropType<"flat" | "text" | "elevated" | "tonal" | "outlined" | "plain">,
		default: () => 'text'
	},
	buttonSize: {
		type: String as PropType<"large" | "medium" | "small" | "x-large" | "x-small">,
		default: () => 'x-small'
	},
	showButtons: {
		type: Boolean,
		default: () => true
	},
});

/**
 *	Mirror of formValues on page
 */
const modelValueC = computed({
	get: () => props.modelValue,
	set: (value) => emit('update:modelValue', value),
});

/**
 * HTML5 fix
 * Input type number "min" and "max" can't be trusted
 */
watch(props, () => {
	// if undefined or null
	if(!props.modelValue && props.modelValue !== 0)
		return;
	// fix attr min
	if(props.min){
		const min = parseFloat(props.min);
		if(props.modelValue < min)
			emit('update:modelValue', Math.max(props.modelValue, min))
	}
	// fix attr max
	if(props.max){
		const max = parseFloat(props.max);
		if(props.modelValue > max)
			emit('update:modelValue', Math.min(props.modelValue, max))
	}
}, { deep: true });
</script>

<style lang="scss">
.v-input.vuetify-input-number-fix{
	.v-field{
		&__field{
			input {
				-moz-appearance: textfield;
				&::-webkit-outer-spin-button,
				&::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
			}
		}
		&__prepend-inner,
		&__append-inner{
			align-items: center;
		}
	}
	&.show-buttons{
		.v-field {
			&__field {
				input {
					text-align: center;
				}
			}
		}
	}
}
</style>