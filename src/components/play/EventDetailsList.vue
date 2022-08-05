<template>
	<v-list class="event-details-list">
		<span
			v-show="id"
			class="status-circle"
			:class="{
				'online pulse-mode': scheduleAvailability.length < 1
			}"
		/>
		<v-list-item>
			<v-list-item-avatar start>
				<font-awesome-icon :icon="['fas', 'calendar']" />
			</v-list-item-avatar>
			<v-list-item-title>{{ id ? scheduleReadable.date : t('play-page.select-event-label-date') }}</v-list-item-title>
		</v-list-item>
		<v-list-item>
			<v-list-item-avatar start>
				<font-awesome-icon :icon="['fas', 'clock']" />
			</v-list-item-avatar>
			<v-list-item-title>
				{{ id ? scheduleReadable.hourStart + ' - ' + scheduleReadable.hourEnd : t('play-page.select-event-label-hours') }}
			</v-list-item-title>
		</v-list-item>
		<v-list-item v-show="!id || !scheduleDuration" lines="">
			<v-list-item-avatar start>
				<font-awesome-icon :icon="['fas', 'circle-info']" />
			</v-list-item-avatar>
			<v-list-item-subtitle>{{ t('play-page.select-event-label-disclaimer') }}</v-list-item-subtitle>
		</v-list-item>
		<v-list-item v-show="id && scheduleDuration">
			<v-list-item-avatar start>
				<font-awesome-icon :icon="['fas', 'play']" />
			</v-list-item-avatar>
			<v-list-item-title>{{ scheduleDuration }}</v-list-item-title>
		</v-list-item>
		<v-list-item v-show="id && scheduleAvailability.length < 1">
			<v-btn
				block
				color="success"
				@click="emit('button:click:confirm')"
			>
				{{ t('play-page.select-event-label-available') }}
			</v-btn>
		</v-list-item>
		<template v-if="admin && selectedIdentifier">
			<v-list-item>
				<v-btn
					block
					variant="tonal"
					@click="emit('button:click:remove')"
				>
					{{ t('play-page.select-event-label-remove-event') }}
				</v-btn>
			</v-list-item>
			<v-list-item>
				<v-btn
					block
					variant="tonal"
					@click="emit('button:click:unselect')"
				>
					{{ t('play-page.select-event-label-unselect-event') }}
				</v-btn>
			</v-list-item>
		</template>
	</v-list>
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
	'button:click:confirm',
	'button:click:remove',
	'button:click:unselect'
])

const props = defineProps({
	id: {
		type: String,
		required: false
	},
	admin: {
		type: Boolean,
		default: () => false
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
	determineScheduleIsAllowed,
} = useScheduleHelpers(props.dateFormat, props.timeFormat);

/**
 * @return {Object}
 */
const schedule = computed<scheduleMap | undefined>(() => getSchedule(props.id));
const scheduleReadable = computed<scheduleReadableMap>(() => {
	const { start, end } = schedule.value || {};
	return translateScheduleUI(start, end);
});

/**
 * Readable duration
 *
 * @return {string}
 */
const scheduleDuration = computed<string>(() => {
	if(!scheduleReadable.value){
		return '';
	}
	const { durationData: { mode, hours, minutes } } = scheduleReadable.value;
	return t('generic.schedule-details-time-count.' + mode, {
		hours,
		minutes
	});
});

/**
 * Form schedule is on a valid time?
 */
const scheduleAvailability = computed<string[]>(() => {
	const { start, end } = schedule.value || {};
	return determineScheduleIsAllowed(start, end);
});
</script>

<style lang="scss">
.event-details-list{
	position: relative;
	overflow: visible;

	.status-circle{
		position: absolute;
		top: 0.5em;
		right: 0;
	}
}
</style>