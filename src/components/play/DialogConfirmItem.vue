<template>
	<v-dialog
		class="theme-dialog"
		:modelValue="modelValue"
		@update:modelValue="value => emit('update:modelValue', value)"
	>
		<v-alert
			@update:modelValue="value => emit('update:modelValue', value)"
			type="success"
			variant="elevated"
			border="start"
			:title="t('dialog-confirm-schedule.title')"
			closable
		>
			<template #close>
				<font-awesome-icon class="ml-3" :icon="['fas', 'xmark']" />
			</template>

			<p class="my-3">{{ t('dialog-confirm-schedule.description') }}</p>

			<v-divider class="my-4"></v-divider>

			<div class="d-flex flex-row align-center justify-end" style="gap:12px">
				<v-btn
					variant="tonal"
					@click="emit('button:click:cancel')"
				>
					{{ t('dialog-confirm-schedule.button-cancel') }}
				</v-btn>
				<v-btn
					variant="outlined"
					@click="emit('button:click:confirm')"
				>
					{{ t('dialog-confirm-schedule.button-confirm') }}
					<font-awesome-icon class="ml-3" :icon="['fas', 'arrow-right-long']" />
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
import { faXmark, faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

library.add(faXmark, faArrowRightLong);

const { t } = useI18n();

const emit = defineEmits([
	'update:modelValue',
	'button:click:confirm',
	'button:click:cancel'
])

defineProps({
	modelValue: {
		type: Boolean,
		required: false
	},
});
</script>