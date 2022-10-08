<template>
	<v-dialog
		class="theme-dialog"
		:modelValue="modelValue"
		@update:modelValue="value => emit('update:modelValue', value)"
	>
		<v-alert
			@update:modelValue="value => emit('update:modelValue', value)"
			color="surface"
			border="start"
			:title="t('dialog-renew-schedule.title')"
			closable
		>
			<template #close>
				<font-awesome-icon class="ml-3" :icon="['fas', 'xmark']" />
			</template>

			<p class="my-3">{{ schedule?.paid ? t('dialog-renew-schedule.description-paid') : t('dialog-renew-schedule.description-not-paid') }}</p>
			<hr />
			<p class="my-3">Questa funzione è ancora in fase di progettazione, contattaci e gestiremo la cosa manualmente</p>
			<hr />
			<v-list
				class="bg-transparent flex-grow-1"
				density="compact"
				variant="text"
			>
				<v-list-item>
					<template v-slot:prepend>
						<font-awesome-icon class="v-icon" :icon="['fas', 'calendar']" />
					</template>
					<v-list-item-title>{{ scheduleReadable.date || t('play-page.select-event-label-date') }}</v-list-item-title>
				</v-list-item>
				<v-list-item>
					<template v-slot:prepend>
						<font-awesome-icon class="v-icon" :icon="['fas', 'clock']" />
					</template>
					<v-list-item-title>
						{{ scheduleReadable.hourStart && scheduleReadable.hourEnd ? scheduleReadable.hourStart + ' - ' + scheduleReadable.hourEnd : t('play-page.select-event-label-hours') }}
					</v-list-item-title>
				</v-list-item>
			</v-list>

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
					variant="tonal"
					@click="emit('click:button:cancel')"
				>
					{{ t('dialog-renew-schedule.button-cancel') }}
				</v-btn>
				<v-btn
					variant="outlined"
					disabled
					@click="emit('click:button:confirm')"
				>
					{{ t('dialog-renew-schedule.button-confirm') }}
				</v-btn>
			</div>
		</v-alert>
	</v-dialog>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";
import { useI18n } from "vue-i18n";
import useScheduleHelpers, { type scheduleReadableMap } from "@/resources/composables/useScheduleHelpers";
import type { scheduleMap } from "@/interfaces";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark, faCalendar, faClock, faEnvelope } from "@fortawesome/free-solid-svg-icons";

library.add(faXmark, faCalendar, faClock, faEnvelope);

const { t } = useI18n();

const emit = defineEmits([
	'update:modelValue',
	'click:button:confirm',
	'click:button:cancel'
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

/**
 * Schedule managing toolbox
 */
const {
	getSchedule,
	translateScheduleUI,
} = useScheduleHelpers(props.dateFormat, props.timeFormat);

/**
 * @return {Object}
 */
const schedule = computed<scheduleMap | undefined>(() => getSchedule(props.id));
const scheduleReadable = computed<scheduleReadableMap>(() => {
	let { start, end } = schedule.value || {};
	return translateScheduleUI(start, end);
});
</script>