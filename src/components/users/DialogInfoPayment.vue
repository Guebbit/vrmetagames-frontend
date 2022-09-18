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
			:title="t('dialog-info-payment.title')"
			closable
		>
			<template #close>
				<font-awesome-icon class="ml-3" :icon="['fas', 'xmark']" />
			</template>

			<p class="my-3">{{ t('dialog-info-payment.description') }}</p>

			<div class="d-flex justify-space-between align-center flex-wrap">
				<v-list
					class="bg-transparent flex-grow-1"
					density="compact"
					variant="text"
				>
					<v-list-item>
						<template v-slot:prepend>
							<font-awesome-icon class="v-icon" :icon="['fas', 'calendar']" />
						</template>
						<v-list-item-title>
							{{ selectedRecord?.code ? selectedRecord?.code : t('profile-page.payment-local') }}
						</v-list-item-title>
					</v-list-item>
					<v-list-item>
						<template v-slot:prepend>
							<font-awesome-icon class="v-icon" :icon="['fas', 'calendar']" />
						</template>
						<v-list-item-title>{{ selectedRecord?.total }} {{ selectedRecord?.currency }}</v-list-item-title>
					</v-list-item>
					<v-list-item>
						<template v-slot:prepend>
							<font-awesome-icon class="v-icon" :icon="['fas', 'clock']" />
						</template>
						<v-list-item-title>
							{{ translateTimestampToString(selectedRecord?.time) }}
						</v-list-item-title>
					</v-list-item>
				</v-list>

				<v-btn
					v-show="selectedRecord?.methodId && selectedRecord?.type"
					variant="tonal"
					@click="emit('button:click:method', selectedRecord?.methodId)"
				>
					{{ t('dialog-info-payment.button-go-to-method') }}
					<font-awesome-icon class="ml-3" :icon="['fas', 'arrow-right-long']" />
				</v-btn>
			</div>

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
					{{ t('dialog-info-payment.button-close') }}
					<font-awesome-icon class="ml-3" :icon="['fas', 'xmark']" />
				</v-btn>
			</div>
		</v-alert>
	</v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, toRefs, watch } from "vue";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";
import useTimeHelpers from "@/resources/composables/useTimeHelpers";
import useItemDetails from "@/resources/composables/useItemDetails";
import type { paymentMap, paymentMethodMap } from "@/interfaces";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faXmark);

const { t } = useI18n();

const emit = defineEmits([
	'update:modelValue'
])

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: false
	},
	id: {
		type: String,
		required: false
	},
	dateFormat: {
		type: String,
		default: () => 'YYYY-MM-DD'
	},
	timeFormat: {
		type: String,
		default: () => 'HH:mm:ss'
	},
});

const { state } = useStore();
const { paymentRecords } = toRefs(state.user);

const {
	translateTimestampToString,
} = useTimeHelpers(props.dateFormat + ' ' + props.timeFormat);

const {
	selectedRecord,
	selectTargetRecord
} = useItemDetails<paymentMap>(paymentRecords);

watch(() => props.id, (id ?:string) => selectTargetRecord(id));
</script>