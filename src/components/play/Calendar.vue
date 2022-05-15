<template>
    <FullCalendar
        ref="fullCalendar"
        :options='calendarOptions'
        class="fc-theme-guebbit hide-events-month"
        :style="{
            '--fc-border-color': primary,
            '--fc-today-bg-color': 'rgba('+secondaryRGB+', 0.3)',
            '--fc-non-business-color': 'rgba(255, 255,255, 0.05)',
            '--fc-neutral-text-color': text,
            '--fc-daygrid-event-dot-width': '8px',
            '--fc-list-event-dot-width': '10px',
            '--fc-highlight-color': 'rgba('+primaryRGB+', 0.2)',
            '--fc-hover-color': 'rgba('+primaryRGB+', 0.2)',
            '--fc-page-bg-color': primary,

            '--fc-event-bg-color': secondary,
            '--fc-event-border-color': secondary,
            '--fc-event-text-color': text,

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
import { hexToRGB, timeToSeconds } from "guebbit-javascript-library";

// https://fullcalendar.io/docs#main
// https://github.com/fullcalendar/fullcalendar-example-projects/blob/master/vue3-typescript/src/Demo.vue
// https://github.com/fullcalendar/fullcalendar/blob/master/packages/common/src/styles/vars.css

// GOOGLE CALENDAR
// https://fullcalendar.io/docs/google-calendar

/*
// ADD
this.calendarApi.addEvent({
    id: Date.now().toString(),
    title: 'User Selected Event',
    start: new Date(selectInfo.start),
    end: new Date(selectInfo.end),
})
event = this.calendarApi.getEventById('temporary');
// REMOVE
event.remove();
*/

import '@fullcalendar/core/vdom';   // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin  from '@fullcalendar/interaction';
import itLocale from '@fullcalendar/core/locales/it';

import type {
    CalendarOptions,
    BusinessHoursInput,
    DurationInput,
    EventApi,
    EventInput,
    DateSelectArg,
    EventClickArg,
    EventAddArg,
    EventChangeArg,
    EventRemoveArg
} from '@fullcalendar/vue3';
import type {
    DateClickArg
} from '@fullcalendar/interaction';

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

        businessHours: {
            type: Array as PropType<BusinessHoursInput[]>,
            default: () => {
                return [];
            }
        },

        slotDuration: {
            type: String as PropType<DurationInput>,
            default: () => {
                return '0:30';
            }
        },

        // MODES
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

        // COLORS
        primary: {
            type: String,
            required: false
        },
        secondary: {
            type: String,
            required: false
        },
        text: {
            type: String,
            required: false
        },
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
                plugins: [
                    timeGridPlugin,
                    dayGridPlugin,
                    interactionPlugin
                ],
                locales: [
                    itLocale
                ],
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                /*
                views: {
                    dayGrid: {
                        // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
                    },
                    timeGrid: {
                        // options apply to timeGridWeek and timeGridDay views
                    },
                    week: {
                        // options apply to dayGridWeek and timeGridWeek views
                    },
                    day: {
                        // options apply to dayGridDay and timeGridDay views
                    }
                },
                */
                initialView: 'dayGridMonth',
                // initialEvents: this.events,
                events: this.events,
                height: 'auto',
                slotDuration: this.slotDuration,                   // The frequency for displaying time slots.
                slotMinTime: this.timeSlots[0],
                slotMaxTime: this.timeSlots[1],
                businessHours: this.businessHours,
                selectConstraint: 'businessHours',
                eventConstraint: 'businessHours',
                editable: this.admin,                         // boolean, events can be dragged and resized
                selectable: true,                       // boolean, select on calendar
                selectMirror: true,                     // boolean, draw temporary event on select
                // dayMaxEvents: true,                  // TODO https://fullcalendar.io/docs/dayMaxEvents
                allDaySlot: false,                      // boolean, top slot
                hiddenDays: this.hideDisabledDays ? this.closeDays : [],
                slotEventOverlap: true,                 // boolean, should
                selectOverlap: this.eventOverlapMethod, // boolean or function that return boolean
                eventOverlap: this.eventOverlapMethod,  // boolean or function that return boolean
                select: this.handleDateSelect,
                dateClick: this.handleDateClick,
                eventClick: this.handleEventClick,
                eventsSet: this.handleEvents,
                eventAdd: this.handleEventAdd,
                eventChange: this.handleChange,
                eventRemove: this.handleRemove,
            }
        }
    },

    methods: {
        /**
         * Select date
         * Can be single click, that triggers handleDateClick too.
         * I need only timeGridWeek and timeGridDay
         *
         * @param {Object} selectInfo
         */
        handleDateSelect(selectInfo: DateSelectArg) {
            const { view: { type } } = selectInfo;
            if(type === 'timeGridWeek' || type === 'timeGridDay'){
                this.$emit('event:temporary:create', new Date(selectInfo.start), new Date(selectInfo.end), selectInfo.allDay)
            }
        },

        /**
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

        handleEventClick({ event }: EventClickArg) {
            console.log("HANDLE EVENT CLICK", event);
        },

        // TODO OVERLAP
        eventOverlapMethod(stillEvent :EventApi, movingEvent :EventApi | null) {
            // console.log("OVERLAP", stillEvent, movingEvent)
            return true;
        },

        handleEvents(events: EventApi[]) {
            console.log("HANDLE EVENTS", events);
        },
        handleEventAdd(test :EventAddArg) {
            console.log("handleEventAdd", test)
        },
        handleChange(test :EventChangeArg) {
            console.log("handleChange", test)
        },
        handleRemove(test :EventRemoveArg) {
            console.log("handleRemove", test)
        }
    }
});
</script>

<style lang="scss">
@import "src/assets/scss/main/global";

.fc{
    table{
        cursor: pointer;
    }
    .fc-icon{
        // fix default icons center
        vertical-align: top !important;
    }
    &.fc-theme-guebbit{
        .fc-toolbar-title{
            text-transform: capitalize;
        }
        .fc-timegrid-slot-minor {
            border-style: none;
        }
        .fc-v-event{
            //
        }
        .fc-day{
            &:hover{
                // background:lightblue;cursor: pointer;
            }
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