<template>
	<Calendar
		:modes			= "['dayGridMonth', 'timeGridWeek']"
		:admin          = "admin"
		:events         = "[...Object.values(scheduleDetailedRecords), ...scheduleCalendarBackgrounds]"
		:resources		= "resources"
		:businessHours  = "businessHoursFullcalendar"
		:primary        = "themeColors.primary"
		:secondary      = "themeColors.secondary"
		:background     = "themeColors.surface"
		:text           = "themeColors['on-surface']"
		:eventsPerDay   = "totalStations['global'] || 0"
		:slotDuration   = "scheduleTimeStep"
		:handleAllow    = "fullcalendarHandleEventAllow"
		:disableNativeApi = "true"

		@event:click    = "(id) => emit('event:click', id)"
		@event:create   = "(event) => emit('event:create', fullcalendarEventApiTranslate(event))"
		@event:changed  = "handleChangedEvent"
		@event:limit-reached = "fullcalendarLimitReached"
	>
		<template v-slot:eventContent="{ timeText, isMirror, event }">
			<!--
			Since it uses scheduleDetailedRecords and all non-compliant event data goes in extendedProps,
			We have all schedule data in it
			-->
			<EventContentCard
				v-if="event.display !== 'background'"
				:time="timeText"
				:start="event.start"
				:end="event.end"
				:isMirror="isMirror"
				:schedule="event?.extendedProps"
				:completeScheduleText="t('calendar.complete-schedule')"
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
import useScheduleHelpers from "@/resources/composables/useScheduleHelpers";
import { uiFormatDate, uiFormatTime } from "@/resources/constants";

import type { scheduleMapAdvanced, scheduleMapBackground, scheduleInputMap, stationMap } from "@/interfaces";
import type { DateSpanApi, EventApi } from "@fullcalendar/vue3";
import type { ResourceInput } from "@fullcalendar/resource-common";
import type { EventChangeArg } from "@fullcalendar/vue3";
import type { ResourceApi } from "@fullcalendar/resource-common";

// The fullcalendar EventInput is too generic
interface EventInput {
	id?: string
	resourceId?: string[]
	start?: Date
	end?: Date
	allDay?: boolean
}

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t } = useI18n();
const { state, getters, commit } = useStore();

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
	timeToForm,
	determineScheduleIsEditable,
	determineScheduleIsAllowed,
} = useScheduleHelpers(uiFormatDate, uiFormatTime);


/**
 * Translate and emit the changed event
 *
 * @param {Object} event
 * @param {Object} resources
 */
const handleChangedEvent = ({ event, resources } :EventChangeArg & { resources?: ResourceApi[] }) => {
	let resourceIdArray = [];
	if(resources)
		for(let i = resources.length; i--; )
			resourceIdArray.push(resources[i].id)
	const { id, start, end, allDay } = event;
	emit('event:changed',
		fullcalendarEventApiTranslate({
			id,
			start: start ? start : undefined,
			end: end ? end : undefined,
			allDay,
			resourceId: resourceIdArray,
		})
	)
}

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
	// possible errors
	for(let i = errorArray.length; i--; )
		commit('main/addToast', {
			variant: 'full',
			title: 'Error',
			text: t('calendar.not-allowed-' + errorArray[i]),
			timeout: 5000
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
	const { date, hourStart, hourEnd } = timeToForm(start.getTime(), end.getTime());
	commit('main/addToast', {
		variant: 'full',
		title: 'Error',
		text: t('calendar.max-limit-reached', {
			start: date + ' ' + hourStart,
			end: date + ' ' + hourEnd
		}),
		timeout: 5000
	});
}

/**
 * Transform fullcalendar EventApi in scheduleInputMap
 * Take only start, end and allyday (for now)
 * TODO take resource or resourceId
 *
 * @param {Object} schedule
 */
function fullcalendarEventApiTranslate({ id, resourceId, start, end, allDay } :EventInput) :scheduleInputMap {
	return {
		id,
		resourceId,
		start: start ? start.getTime() : 0,
		end: end ? end.getTime() : 0,
		allDay
	};
}

// ---------------------- Fullcalendar options ----------------------

/**
 * Schedules
 */
const scheduleDetailedRecords = computed<Record<string, scheduleMapAdvanced>>(() => getters['ecommerce/scheduleDetailedRecords']);
const scheduleCalendarBackgrounds = computed<scheduleMapBackground[]>(() => getters['ecommerce/scheduleCalendarBackgrounds']);

/**
 * Stations
 * (to list and calculate resource limits)
 */
const stationsList = computed(() => getters['ecommerce/stationsList']);
const totalStations = computed(() => getters['ecommerce/totalStations']);

/**
 * FULLCALENDAR RESOURCE MODE
 * Lo sto già facendo in modo custom, sperimentare?
 */
const resources = computed<ResourceInput[]>(() => {
	let resourcesArray :ResourceInput[] = [];
	for(let len = stationsList.value.length, i = 0; i < len; i++){
		const { id, label, capacity } = stationsList.value[i] as stationMap;
		resourcesArray.push({
			id,
			title: label,
			capacity
		})
	}
	return resourcesArray;
});

/**
 *
 */
const { scheduleTimeStep } = toRefs(state.ecommerce);

/**
 * Business hours translated for Fullcalendar
 */
const { businessHours } = toRefs(state.main);
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