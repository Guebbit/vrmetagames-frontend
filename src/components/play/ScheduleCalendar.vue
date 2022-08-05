<template>
	<Calendar
		:admin          = "admin"
		:events         = "scheduleDetailedList"
		:businessHours  = "businessHoursFullcalendar"
		:primary        = "themeColors.primary"
		:secondary      = "themeColors.secondary"
		:background     = "themeColors.surface"
		:text           = "themeColors['on-surface']"
		:eventsPerDay   = "totalStations['global'] || 0"
		:slotDuration   = "scheduleTimeStep"
		:handleAllow    = "fullcalendarHandleEventAllow"

		@event:click    = "(id) => emit('event:click', id)"
		@event:create   = "(event) => emit('event:create', fullcalendarEventApiTranslate(event))"
		@event:changed  = "({ event }) => emit('event:changed', fullcalendarEventApiTranslate(event))"
		@event:limit-reached = "fullcalendarLimitReached"
	>
		<template v-slot:eventContent="{timeText, isMirror, event}">
			<EventContentCard
				v-if="event.display !== 'background'"
				:time="timeText"
				:start="event.start"
				:end="event.end"
				:isMirror="isMirror"

				:username="event.extendedProps?.user?.username"
				:image="event.extendedProps?.user?.avatar || defaultUserAvatar"
			/>
		</template>
	</Calendar>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, toRefs } from "vue";
import { useStore } from "@/store";
import { useTheme } from "vuetify";
import { useI18n } from "vue-i18n";
import Calendar from "@/components/play/Calendar.vue";
import EventContentCard from "@/components/play/FAEventContentCard.vue";
import { defaultUserAvatar, uiFormatDate, uiFormatTime } from "@/resources/constants";

import type { scheduleInputMap } from "@/interfaces";
import type { DateSpanApi, EventApi } from "@fullcalendar/vue3";
import useScheduleHelpers from "@/resources/composables/useScheduleHelpers";
// import type { ResourceInput } from "@fullcalendar/resource-common";

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { state, getters, commit } = useStore();
const { t } = useI18n();

const emit = defineEmits([
	'event:click',
	'event:create',
	'event:changed',
]);

defineProps({
	admin: {
		type: Boolean,
		default: () => false
	},
	preloadSteps: {
		type: Number,
		required: false
	},
});

/**
 * Schedule managing toolbox
 */
const {
	determineScheduleIsEditable,
	determineScheduleIsAllowed,
} = useScheduleHelpers(uiFormatDate, uiFormatTime);

/**
 *
 */
const { businessHours } = toRefs(state.main);
const { scheduleTimeStep } = toRefs(state.ecommerce);
const scheduleDetailedList = computed(() => getters['ecommerce/scheduleDetailedList']);

/**
 * To calculate resource limits
 */
const totalStations = computed(() => getters['ecommerce/totalStations']);

/**
 * FULLCALENDAR RESOURCE MODE
 * Lo sto già facendo in modo custom, sperimentare?
 */
/*
const resources = computed<ResourceInput[]>(() => {
	const stationList = Object.values(stations.value);
	let resourcesArray :ResourceInput[] = [];
	for(let len = stationList.length, i = 0; i < len; i++){
		const { id, label, capacity } = stationList[i] as stationMap;
		resourcesArray.push({
			id,
			title: label,
			capacity
		})
	}
	return resourcesArray;
});
*/

/**
 * handleAllow function of FullCalendar
 *
 * @param {Object} dropInfo
 * @param {Object} draggedEvent
 * @return {boolean}
 */
function fullcalendarHandleEventAllow(dropInfo :DateSpanApi, draggedEvent: EventApi | null) :boolean {
	const { start, end, resource: { id :resourceId } = {} } = dropInfo;
	const { id } = draggedEvent || {};
	const errorArray :string[] = [];

	// if the user can edit the schedule
	errorArray.push(...determineScheduleIsEditable(id));
	// if the new position is valid
	errorArray.push(...determineScheduleIsAllowed(start.getTime(), end.getTime(), id, resourceId));
	for(let i = errorArray.length; i--; )
		commit('main/addToast', {
			variant: 'full',
			title: 'Error',
			text: t('calendar.max-limit-reached-' + errorArray[i]),
			timeout: 3000
		});
	// approval
	return errorArray.length === 0;
}

/**
 * FullCalendar max limit reached emit
 *
 * @param {Date} start
 * @param {Date} end
 * @param {string[]} idArray
 */
function fullcalendarLimitReached(start :Date, end :Date, idArray :string[]){
	console.error("MAX LIMIT REACHED", start, end, idArray)
	commit('main/addToast', {
		variant: 'full',
		title: 'Error',
		text: t('calendar.max-limit-reached', { start, end }),
		timeout: 3000
	});
}


/**
 * Transform fullcalendar EventApi in scheduleInputMap
 * Take only start, end and allyday (for now)
 * TODO take resource or resourceId
 *
 * @param {Object} schedule
 */
function fullcalendarEventApiTranslate({ id, start, end, allDay } :EventApi) :scheduleInputMap {
	return {
		id,
		start: start ? start.getTime() : 0,
		end: end ? end.getTime() : 0,
		allDay
	};
}



/**
 * Business hours translated for Fullcalendar
 */
const businessHoursFullcalendar = computed(() => {
	const businessHoursArray = [];
	for(let i = businessHours.value.length; i--; ){
		if(businessHours.value[i].length > 0){
			businessHoursArray.push({
				daysOfWeek: [i],
				startTime: businessHours.value[i]?.[0]?.replace('.', ':'),
				endTime: businessHours.value[i]?.[1]?.replace('.', ':'),
			})
		}
	}
	return businessHoursArray;
});
</script>