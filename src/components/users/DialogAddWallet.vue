<template>
	<v-dialog
		class="theme-dialog"
		:modelValue="modelValue"
		@update:modelValue="value => emit('update:modelValue', value)"
	>
		<v-alert
			@update:modelValue="value => emit('update:modelValue', value)"
			type="info"
			variant="elevated"
			border="start"
			:title="t('dialog-add-wallet.title')"
			closable
		>
			<template #close>
				<v-btn
					icon
					variant="text"
					@click="emit('update:modelValue', false)"
				>
					<font-awesome-icon size="xl" :icon="['fas', 'xmark']" />
				</v-btn>
			</template>

			<p class="my-3">{{ t('dialog-add-wallet.description') }}</p>

			<!-- TODO aggiunta + visualizzazione ed eventuale modifica -->
			<h3>WORK IN PROGRESS:</h3>

			<v-divider class="my-4"></v-divider>

			<div class="d-flex flex-row align-center justify-end" style="gap:12px">
				<v-btn
					icon
					variant="text"
					:to="{ name: 'Contacts' }"
				>
					<font-awesome-icon :icon="['fas', 'envelope']" />
				</v-btn>
				<v-btn
					variant="outlined"
					@click="emit('update:modelValue', false)"
				>
					{{ t('dialog-add-wallet.button-close') }}
					<font-awesome-icon class="ml-3" :icon="['fas', 'xmark']" />
				</v-btn>
			</div>
		</v-alert>
	</v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { useI18n } from "vue-i18n";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faXmark);

const { t } = useI18n();

const emit = defineEmits([
	'update:modelValue'
])

defineProps({
	modelValue: {
		type: Boolean,
		required: false
	},
});
</script>