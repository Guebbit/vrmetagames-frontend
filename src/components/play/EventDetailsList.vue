<template>
	<v-list class="event-details-list">
		<span
			v-show="id && !schedule?.userId"
			class="status-circle"
			:class="{
				'online pulse-mode': scheduleAvailability
			}"
		/>
		<v-list-item>
			<template v-slot:prepend>
				<font-awesome-icon class="v-icon" :icon="['fas', 'calendar']" />
			</template>
			<v-list-item-title>{{ id ? scheduleReadable.date : t('play-page.select-event-label-date') }}</v-list-item-title>
		</v-list-item>
		<v-list-item>
			<template v-slot:prepend>
				<font-awesome-icon class="v-icon" :icon="['fas', 'clock']" />
			</template>
			<v-list-item-title>
				{{ id ? scheduleReadable.hourStart + ' - ' + scheduleReadable.hourEnd : t('play-page.select-event-label-hours') }}
			</v-list-item-title>
		</v-list-item>
		<v-list-item v-show="!id || !scheduleDuration" lines="">
			<template v-slot:prepend>
				<font-awesome-icon class="v-icon" :icon="['fas', 'circle-info']" />
			</template>
			<v-list-item-subtitle>{{ t('play-page.select-event-label-disclaimer') }}</v-list-item-subtitle>
		</v-list-item>
		<v-list-item v-show="id && scheduleDuration">
			<template v-slot:prepend>
				<font-awesome-icon class="v-icon" :icon="['fas', 'play']" />
			</template>
			<v-list-item-title>{{ scheduleDuration }}</v-list-item-title>
		</v-list-item>
		<v-list-item v-show="id && !schedule?.userId && scheduleAvailability">
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
	checkScheduleIsAllowed,
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
const scheduleAvailability = computed<boolean>(() => {
	const { id, start, end } = schedule.value || {};
	return checkScheduleIsAllowed(start, end, id);
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