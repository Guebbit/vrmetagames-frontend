<template>
	<v-dialog
		:modelValue="modelValue"
		@update:modelValue="value => emit('update:modelValue', value)"
		class="theme-dialog"
	>
		<v-alert
			@update:modelValue="value => emit('update:modelValue', value)"
			type="error"
			variant="elevated"
			border="start"
			:title="t('dialog-delete-all-schedule.title')"
			closable
		>
			<template #close>
				<font-awesome-icon class="ml-3" :icon="['fas', 'xmark']" />
			</template>

			<p class="my-3">{{ t('dialog-delete-all-schedule.description') }}</p>
			<div class="d-flex flex-row align-center justify-end" style="gap:12px">
				<v-btn
					icon
					variant="text"
					:to="{ name: 'Contacts' }"
				>
					<font-awesome-icon :icon="['fas', 'envelope']" />
				</v-btn>
				<v-btn
					variant="tonal"
					@click="emit('button:click:cancel')"
				>
					{{ t('dialog-delete-all-schedule.button-cancel') }}
				</v-btn>
				<v-btn
					variant="outlined"
					@click="emit('button:click:confirm')"
				>
					{{ t('dialog-delete-all-schedule.button-confirm') }}
					<font-awesome-icon class="ml-3" :icon="['fas', 'check']" />
				</v-btn>
			</div>
		</v-alert>
	</v-dialog>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import { useI18n } from "vue-i18n";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark, faCheck, faEnvelope } from "@fortawesome/free-solid-svg-icons";

library.add(faXmark, faCheck, faEnvelope);

const emit = defineEmits([
	'update:modelValue',
	'button:click:confirm',
	'button:click:cancel'
])

const { t } = useI18n();
</script>