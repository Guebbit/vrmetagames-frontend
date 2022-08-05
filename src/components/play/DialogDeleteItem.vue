<template>
	<v-dialog
		:modelValue="modelValue"
		@update:modelValue="value => emit('update:modelValue', value)"
	>
		<v-alert
			type="error"
			variant="elevated"
			border="start"
			:title="t('play-page.schedule-alert-remove-title')"
		>
			<v-list
				class="bg-transparent"
				density="compact"
				variant="text"
			>
				<v-list-item>
					<v-list-item-avatar start>
						<font-awesome-icon :icon="['fas', 'calendar']" />
					</v-list-item-avatar>
					<v-list-item-title>{{ scheduleReadable.date || t('play-page.select-event-label-date') }}</v-list-item-title>
				</v-list-item>
				<v-list-item>
					<v-list-item-avatar start>
						<font-awesome-icon :icon="['fas', 'clock']" />
					</v-list-item-avatar>
					<v-list-item-title>
						{{ scheduleReadable.hourStart && scheduleReadable.hourEnd ? scheduleReadable.hourStart + ' - ' + scheduleReadable.hourEnd : t('play-page.select-event-label-hours') }}
					</v-list-item-title>
				</v-list-item>
			</v-list>

			<v-divider class="my-4"></v-divider>

			<div class="d-flex flex-row align-center justify-end" style="gap:12px">
				<v-btn
					variant="tonal"
					@click="emit('button:click:cancel')"
				>
					{{ t('play-page.schedule-alert-remove-button-cancel') }}
				</v-btn>
				<v-btn
					variant="outlined"
					@click="emit('button:click:confirm')"
				>
					{{ t('play-page.schedule-alert-remove-button-confirm') }}
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
import { faCalendar, faClock, faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";


library.add(faCalendar, faClock, faPlay, faCircleInfo);

const { t } = useI18n();

const emit = defineEmits([
	'update:modelValue',
	'button:click:confirm',
	'button:click:cancel'
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