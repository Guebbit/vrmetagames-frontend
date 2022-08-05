<template>
    <FullCalendar
        ref="fullCalendar"
        :options='calendarOptions'
        class="hide-events-month"
        :class="{
            'anonymous-mode': !admin
        }"
        :style="{
            '--fc-primary-color-rgb': primaryRGB,
            '--fc-secondary-color-rgb': secondaryRGB,
            '--fc-custom-background-color': background,
            '--fc-page-bg-color': primary,
            '--fc-border-color': primary,
            '--fc-today-bg-color': 'transparent',
            '--fc-non-business-color': 'rgba(255, 255,255, 0.05)',
            '--fc-neutral-text-color': text,
            '--fc-daygrid-event-dot-width': '8px',
            '--fc-list-event-dot-width': '10px',
            '--fc-hover-color': 'rgba('+primaryRGB+', 0.2)',

            '--fc-highlight-color': 'rgba('+secondaryRGB+', 0.3)',
            '--fc-event-bg-color': secondary,
            '--fc-event-border-color': secondary,
            '--fc-event-text-color': text,
            '--fc-bg-event-opacity': '0.6',

            '--fc-button-bg-color': 'rgba('+primaryRGB+', 0.2)',
            '--fc-button-border-color': 'transparent',
            '--fc-button-hover-bg-color': 'rgba('+primaryRGB+', 0.4)',
            '--fc-button-hover-border-color': 'transparent',
            '--fc-button-active-bg-color': 'rgba('+primaryRGB+', 0.6)',
            '--fc-button-active-border-color': primary,
         }"
    >
        <!-- https://fullcalendar.io/docs/event-render-hooks -->
        <template v-slot:eventContent='arg'>
            <slot name="eventContent" v-bind="arg" />
        </template>
    </FullCalendar>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {
    hexToRGB,
    timeToSeconds,
    getUUID,
    rangeOverlaps,
    arrayColumn
} from "guebbit-javascript-library";

// https://fullcalendar.io/docs#main
// https://github.com/fullcalendar/fullcalendar-example-projects/blob/master/vue3-typescript/src/Demo.vue
// https://github.com/fullcalendar/fullcalendar/blob/master/packages/common/src/styles/vars.css
// https://fullcalendar.io/docs/google-calendar
// https://fullcalendar.io/docs/Calendar-select

import '@fullcalendar/core/vdom';   // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin  from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import resourceTimegridPlugin from '@fullcalendar/resource-timegrid';
import itLocale from '@fullcalendar/core/locales/it';

import type {
    CalendarOptions,
    BusinessHoursInput,
    DateSpanApi,
    EventApi,
    EventInput,
    EventDropArg,
    DateSelectArg,
    EventClickArg,
    EventAddArg,
    EventRemoveArg,
    EventChangeArg,
    OverlapFunc,
    AllowFunc,
} from '@fullcalendar/vue3';
import type {
    DateClickArg,
    EventResizeDoneArg,
} from '@fullcalendar/interaction';
import type {
    ResourceInput,
} from '@fullcalendar/resource-common';

export default defineComponent({
    name: "Calendar",

    components: {
        FullCalendar
    },

    props: {
        //
        events: {
            type: Array as PropType<EventInput[]>,
            default: () => {
                return [];
            }
        },

        resources: {
            type: Array as PropType<ResourceInput[]>,
            default: () => {
                return [];
            }
        },

        // SETTINGS
        // 
        businessHours: {
            type: Array as PropType<BusinessHoursInput[]>,
            default: () => {
                return [];
            }
        },
        //
        slotDuration: {
            type: Number,
            default: () => {
                return 1800000; // '0:30'
            }
        },
        // -1 = infinite
        eventsPerDay: {
            type: Number,
            default: () => {
                return -1;
            }
        },

        // MODES
        // TODO admin can edit other events
        admin: {
            type: Boolean,
            default: () => {
                return false;
            }
        },
        // hidden days or just disabled
        hideDisabledDays: {
            type: Boolean,
            default: () => {
                return false;
            }
        },
        // TODO to quickly create or edit events
        fastMode: {
            type: Boolean,
            default: () => {
                return false;
            }
        },
        enableNativeApi: {
            type: Boolean,
            default: () => {
                return false;
            }
        },

        // COLORS
        primary: {
            type: String,
            required: false
        },
        secondary: {
            type: String,
            required: false
        },
        background: {
            type: String,
            required: false
        },
        text: {
            type: String,
            required: false
        },

        // HANDLES (see commented methods for info)
        handleEventsSet: {
            type: Function as PropType<(events: EventApi[]) => void>,
            required: false,
        },

        handleOverlap: {
            type: Function as PropType<OverlapFunc>,
            required: false,
        },

        handleAllow: {
            type: Function as PropType<AllowFunc>,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            default: () => {},
        },

        handleEventResize: {
            type: Function as PropType<(arg: EventResizeDoneArg) => void>,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            default: () => {},
        },

        handleEventDrop: {
            type: Function as PropType<(arg: EventDropArg) => void>,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            default: () => {},
        },

        handleEventChange: {
            type: Function as PropType<(arg: EventChangeArg) => void>,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            default: () => {},
        },
    },

    data: () => {
        return {
            // TODO per ora inutile
            idLastEvent: '',
        };
    },

    computed: {

        /**
         * hexToRgb colors
         */
        primaryRGB() :[number, number, number] | undefined {
            return this.primary ? hexToRGB(this.primary) : undefined;
        },
        secondaryRGB() :[number, number, number] | undefined {
            return this.secondary ? hexToRGB(this.secondary) : undefined;
        },

        /**
         * Calendars objects and API
         */
        calendar() {
            return (this.$refs.fullCalendar as InstanceType<typeof FullCalendar>).getApi()
        },
        calendarApi(){
            const { view: { calendar } } = this.calendar;
            return calendar;
        },

        /**
         * get the earnest and latest business hour of the week,
         * to hide whatever beyond that dynamically
         *
         * @return {[string,string]}
         */
        timeSlots(){
            let maxTime = '00:00';
            let minTime = '24:00';
            for(let i = this.businessHours.length; i--; ){
                const { startTime, endTime } = this.businessHours[i] as never;
                if(endTime && (timeToSeconds(endTime) > timeToSeconds(maxTime))){
                    maxTime = endTime;
                }
                if(endTime && (timeToSeconds(startTime) < timeToSeconds(minTime))){
                    minTime = startTime;
                }
            }
            return [minTime, maxTime];
        },

        /**
         * get the days without businesshours, to hide\disable them
         *
         * @return {number[]}
         */
        closeDays(){
            let openDays :number[] = [];
            const closeDays = [];
            for(let i = this.businessHours.length; i--; ){
                const { daysOfWeek = [] } = this.businessHours[i] as never;
                openDays = openDays.concat(daysOfWeek);
            }
            for(let i = 0; i < 7; i++)
                if(!openDays.includes(i))
                    closeDays.push(i);
            return closeDays;
        },

        calendarOptions() :CalendarOptions {
            return {
                // FREE FOR USE key, buy in PROFIT projects
                schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
                plugins: [
                    timeGridPlugin,
                    dayGridPlugin,
                    interactionPlugin,
                    resourceTimelinePlugin,
                    resourceTimegridPlugin
                ],
                locales: [
                    itLocale
                ],
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridDay' // 'dayGridMonth,timeGridWeek,timeGridDay,resourceTimeGridDay'
                },
                views: {
                    resourceTimeline: {
                        hiddenDays: this.closeDays,
                    },
                    resourceTimeGrid: {
                        hiddenDays: this.closeDays,
                    },
                    dayGrid: {
                        // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
                        hiddenDays: this.closeDays,
                    },
                    timeGrid: {
                        // options apply to timeGridWeek and timeGridDay views
                        hiddenDays: this.closeDays,
                    },
                    week: {
                        // options apply to dayGridWeek and timeGridWeek views
                    },
                    day: {
                        // options apply to dayGridDay and timeGridDay views
                    }
                },
                initialView: 'dayGridMonth',
                resources: this.resources,
                events: this.events,
                height: 'auto',
                slotDuration: this.slotDuration,                   // The frequency for displaying time slots.
                slotMinTime: this.timeSlots[0],
                slotMaxTime: this.timeSlots[1],
                businessHours: this.businessHours,
                selectConstraint: 'businessHours',
                eventConstraint: 'businessHours',
                // defaultTimedEventDuration: "01:00:00",   // NOT WORKING
                // longPressDelay: 0,                       // integer, time user must hold touch before drag\select WARNING: 0 ONLY if scroll can never happen https://fullcalendar.io/docs/touch
                editable: this.admin,                       // boolean, events can be dragged and resized
                eventResourceEditable: this.admin,          // same, but with resources
                selectable: true,                           // boolean, select on calendar
                selectMirror: true,                         // boolean, draw temporary event on select
                // dayMaxEvents: true,                      // TODO https://fullcalendar.io/docs/dayMaxEvents
                allDaySlot: false,                          // boolean, top slot
                hiddenDays: this.hideDisabledDays ? this.closeDays : [],
                // forceEventDuration: true,                // boolean: force event's "end" to be specified
                slotEventOverlap: true,                     // boolean, should
                eventStartEditable: true,                   // if event can be dragged
                eventDurationEditable : false,              // if event can be resized by dragging TODO TEMPORARY non triggera eventAllow
                selectOverlap: this.handleOverlap || true,  // boolean or function that return boolean
                eventOverlap: this.handleOverlap || true,   // boolean or function that return boolean
                eventAllow: this._handleAllow,              // function that return boolean
                select: this.handleDateSelect,
                dateClick: this.handleDateClick,
                eventClick: this.handleEventClick,
                eventsSet: this.handleEventsSet,
                eventAdd: this.handleEventAdd,
                eventRemove: this.handleEventRemove,
                eventChange: this._handleEventChange,
                eventDrop: this._handleEventDrop,
                eventResize: this._handleEventResize
            }
        }
    },

    methods: {

        /**
         * Remove event
         *
         * @param {string} id
         */
        eventRemove(id :string){
            const event = this.calendarApi.getEventById(id);
            if(!event){
                return;
            }
            // remove
            this.$emit('event:remove', id);
            if(this.enableNativeApi){
                event.remove();
            }
        },

        /**
         * SAME as getEventsByTime, but "breaking" the result for every slot
         *
         * @param {Date} dateFrom
         * @param {Date} dateTo
         * @param {string} resourceId
         * @return {Object[]}
         */
        getEventsBySlots(dateFrom = new Date(), dateTo = new Date(), resourceId ?:string) :Record<string, string[]> {
            // if even only 1 time slot in higher than eventNumberLimit, it fails
            // from start to end step by step
            let stepperStart = dateFrom;
            let stepperEnd = new Date(stepperStart.getTime() + this.slotDuration);
            const cappedSlots :Record<string, string[]> = {};
            // do cycle
            do {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                cappedSlots[stepperStart.getTime() + '_' + stepperEnd.getTime()] = arrayColumn(this.getEventsByTime(stepperStart, stepperEnd, resourceId), 'id') as string[];
                // next step, until loading reach END
                stepperStart = new Date(stepperStart.getTime() + this.slotDuration);
                stepperEnd = new Date(stepperEnd.getTime() + this.slotDuration);
                // stepper end
            } while (stepperEnd <= dateTo);
            return cappedSlots;
        },

        /**
         * Create event
         * (WARNING: Fullcalendar can have different events with same id (in case they are split))
         *
         * If cap is reached: emit
         *
         * https://fullcalendar.io/docs/event-object
         * https://fullcalendar.io/docs/event-parsing
         * https://fullcalendar.io/docs/event-source-object
         *
         * @param {Object} selectInfo
         */
        eventCreate(selectInfo: DateSelectArg) :void {
            const { start, end, allDay, resource: { id :resourceId, extendedProps: { capacity = -1 } = {} } = {} } = selectInfo;
            // the lowest limit that is NOT -1
            const eventNumberLimit = Math.min(capacity, this.eventsPerDay) !== -1  ? Math.min(capacity, this.eventsPerDay) : Math.max (capacity, this.eventsPerDay);
            // Find all the events in range (to filter out and optimize calculous)
            // if resourceId is specified, it belongs to a resource

            // If no events are allowed (optimized)
            if(eventNumberLimit === 0){
                return;
            }
            // If there is an event limit
            if(eventNumberLimit > -1){
                // divide the EventInput in timeslots and check how many events are already there,
                const cappedSlots = this.getEventsBySlots(start, end, resourceId);
                // if events are found
                if(Object.keys(cappedSlots).length > 0) {
                    for(const key in cappedSlots) {
                        // check if NOT prototype (default) AND check if the number of events exceed the event number limit
                        if(!Object.prototype.hasOwnProperty.call(cappedSlots, key) || cappedSlots[key].length < eventNumberLimit) {
                            continue;
                        }
                        // if limit reached, emit and return
                        const [ start, end ] = key.split("_");
                        this.$emit('event:limit-reached', start, end, cappedSlots[key]);
                        return;
                    }
                }
            }
            // Add the event
            const id = getUUID();
            const event :EventInput = {
                id,
                start,
                end,
                allDay,
                resourceId,
            };
            // create
            this.$emit('event:create', event);
            if(this.enableNativeApi){
                this.calendarApi.addEvent(event)
            }
            // last inserted event
            this.idLastEvent = id;
        },

        /**
         * Compare 2 events if they overlaps
         *
         * @param {Date} asRaw
         * @param {Date} aeRaw
         * @param {Date} bsRaw
         * @param {Date} beRaw
         * @return {boolean}
         */
        compareEventTimes({ start: asRaw, end: aeRaw } :EventApi, { start: bsRaw, end: beRaw } :EventApi){
            const as = asRaw ? asRaw : new Date();
            const ae = aeRaw ? aeRaw : as;
            const bs = bsRaw ? bsRaw : new Date();
            const be = beRaw ? beRaw : bs;
            return rangeOverlaps(as.getTime(), ae.getTime(), bs.getTime(), be.getTime());
        },

        /**
         * Get all events between 2 dates
         * If resourceId is set, then get only those of that resource
         *
         * @param {Date} dateFrom
         * @param {Date} dateTo
         * @param {string} resourceId
         * @return {Object[]}
         */
        getEventsByTime(dateFrom = new Date(), dateTo = new Date(), resourceId ?:string){
            const fullcalendarEvents = this.calendar.getEvents();   // unfortunately this can't be a computed
            return fullcalendarEvents.filter(({ id, start, end, display } :EventApi) => {
                // backgrounds are never counted
                if(display === 'background'){
                    return false;
                }
                // if a resource was specified
                if(resourceId){
                    // need to get the related resource
                    const resourcesArray = this.calendarApi.getEventById(id)?.getResources() || [];
                    // there can be many, just check if one exist
                    if(!resourcesArray.some(({ id }) => {
                        return resourceId === id;
                    })){
                        // if no resourceId match, it's not on the requested resource
                        return false;
                    }
                }
                // the resourceId was not specified OR it was and it's present
                // if null, take today (should never happen, but typescript have warnings)
                const eventStart = start ? start : new Date();
                // if null, take start (default fullcalendar behaviour)
                const eventEnd = end ? end : eventStart;
                return rangeOverlaps(dateFrom.getTime(), dateTo.getTime(), eventStart.getTime(), eventEnd.getTime());
            });
        },


        /**
         * https://fullcalendar.io/docs/select-callback
         *
         * Select date
         * Can be single click, give minimum time slot (trigger handleDateClick too).
         * Needed only timeGrid*** or resourceTime***
         *
         * @param {Object} selectInfo
         */
        handleDateSelect(selectInfo: DateSelectArg) {
            const { view: { type } = {} } = selectInfo;
            this.calendar.unselect(); // remove mirror
            if(type === 'timeGridWeek' || type === 'timeGridDay' || type === 'resourceTimelineWeek' || type === 'resourceTimeGridDay'){
                this.eventCreate(selectInfo);
            }
        },

        /**
         * https://fullcalendar.io/docs/dateClick
         *
         * Click on date
         * Need only on the dayGridMonth view
         * Doesn't work if close day
         *
         * @param {Object} clickInfo
         */
        handleDateClick({ dateStr, date, view: { type } } :DateClickArg){
            if(type === 'dayGridMonth' && !this.closeDays.includes(date.getDay())){
                this.calendar.changeView('timeGridDay', dateStr);
            }
        },

        /**
         * https://fullcalendar.io/docs/eventClick
         *
         * When EVENT is clicked
         * (warning: background events)
         *
         * @param {string} id
         * @param {string} display
         */
        handleEventClick({ event: { id, display } }: EventClickArg) {
            if(!id || display === 'background'){
                return;
            }
            // console.log("handleEventClick", id, this.calendarApi.getEventById(id))
            this.$emit('event:click', id);
        },

        /**
         * https://fullcalendar.io/docs/eventsSet
         *
         * Called after event data is initialized OR changed in any way.
         * Useful for syncing an external data source with all calendar event data.
         *
         * @param {Object[]} events - same as Calendar::getEvents
         */
        // handleEventsSet(events: EventApi[]) {},

        /**
         * https://fullcalendar.io/docs/eventOverlap
         *
         * Handle events overlap. Called on every overlapping event.
         *
         * eventOverlap(stillEvent, movingEvent)
         * called on drag or resize
         *
         * selectOverlap(stillEvent) called on select\insertion
         * no "movingEvent" because the selection is not an event per se,
         * so it will be the encountered event
         *
         * WARNING TEMPORARY
         * since the function is called X times for each overlapping event and I don't have an array,
         * I don't use it to check overlapping elements, I manually check the final position of dragging or selecting events
         *
         * @param {Object} stillEvent
         * @param {Object} movingEvent
         * @return {boolean}
         */
        // handleOverlap(stillEvent :EventApi, movingEvent :EventApi | null)  {},

        /**
         * https://fullcalendar.io/docs/eventAllow
         *
         * Function to allow or not
         *
         * @param {Object} dropInfo - given location where to drop the given event
         * @param {Object} draggedEvent - given event
         * @return {boolean} => true = allowed, false = not allowed
         */
        _handleAllow(dropInfo :DateSpanApi, draggedEvent: EventApi | null) {
            return this.handleAllow(dropInfo, draggedEvent);
        },

        /**
         * https://fullcalendar.io/docs/eventAdd
         *
         * Called after an event has been added to the calendar.
         *
         * @param {string} id
         */
        handleEventAdd({ event: { id } } :EventAddArg) {
            this.$emit('event:added', id)
        },

        /**
         * https://fullcalendar.io/docs/eventRemove
         *
         * Called after an event has been removed from the calendar.
         *
         * @param {string} id
         */
        handleEventRemove({ event: { id } } :EventRemoveArg) {
            this.$emit('event:removed', id)
        },

        /**
         * https://fullcalendar.io/docs/eventChange
         *
         * Called AFTER an event HAS BEEN MODIFIED in some way:
         *  - when Event Object setter method is called
         *  - when event has been dragger or resized
         *  - AFTER eventDrop
         *  - AFTER eventResize
         *
         * @param changeInfo
         */
        _handleEventChange({ oldEvent, event, relatedEvents, revert } :EventChangeArg) {
            this.$emit('event:changed', { oldEvent, event, relatedEvents, revert });
            return this.handleEventChange({ oldEvent, event, relatedEvents, revert });
        },

        /**
         * https://fullcalendar.io/docs/eventResize
         *
         * Triggered when resizing stops and the event has changed in duration.
         * BEFORE eventChange
         *
         * @param eventResizeInfo
         */
        _handleEventResize(eventResizeInfo :EventResizeDoneArg) :void {
            return this.handleEventResize(eventResizeInfo);
        },

        /**
         * https://fullcalendar.io/docs/eventDrop
         *
         * Triggered when resizing stops and the event has changed in duration.
         * BEFORE eventChange
         *
         * @param eventResizeInfo
         */
        _handleEventDrop(eventDropInfo :EventDropArg) :void {
            return this.handleEventDrop(eventDropInfo);
        },
    }
});
</script>

<style lang="scss">
/** TODO
Admin mode: users with different colors, opacity 0.8? Admin with opacity 1 primary\secondary color
User mode: users with different colors? opacity 0.4? User with opacity 1 primary\secondary color
 */

$fullcalendar-mobile-threshold: 600px !default;

.fc{
    table{
        cursor: pointer;
        // background: var(--fc-custom-background-color);
    }
    .fc-icon{
        // fix default icons center
        vertical-align: top !important;
    }

    .fc-header-toolbar{
        @media (max-width: $fullcalendar-mobile-threshold){
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 1em;
        }
    }

    .fc-toolbar-title{
        text-transform: capitalize;
    }
    .fc-timegrid-slot-minor {
        border-style: none;
    }
    .fc-v-event{
        //
    }
    .fc-day{ // .fc-daygrid-day
        .fc-daygrid-day-number{
            font-size: 2em;
        }
        &.fc-day-today{
            .fc-daygrid-day-frame{
                border: var(--fc-border-color) solid 4px;
            }
            .fc-daygrid-day-number{
                font-weight: 600;
                /*
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 3em;
                */
            }
        }
        &:hover{
            // background:lightblue;cursor: pointer;
        }
    }


    .day-capacity-indicator{
        &.capacity-disabled{
            background-color: #424242;
        }
        &.capacity-green{
            background-color: #388e3c;
        }
        &.capacity-yellow{
            background-color: #ffeb3b;
            color: #000000;
        }
        &.capacity-orange{
            background-color: #e65100;
        }
        &.capacity-red{
            background-color: #e53935;
        }
    }

    &.anonymous-mode{
        .fc-v-event{
            background: var(--fc-event-bg-color) !important;
            border: none !important;
            opacity: 0.5;
            box-shadow: none !important;
        }
    }
    &.no-borders{
        td,
        th {
            border-style: none !important;
        }
    }
    &.hide-events-month{
        .fc-view{
            &.fc-dayGridMonth-view{
                .fc-event{
                    &.regular-schedule{
                        display: none;
                    }
                }
            }
            &:not(.fc-dayGridMonth-view){
                .fc-event{
                    &.day-capacity-indicator{
                        display: none;
                    }
                }
            }
        }
    }
}
</style>