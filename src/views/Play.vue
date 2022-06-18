<template>
    <div id="play-page" class="theme-page page-menu-padding">
        <v-progress-circular
            v-show="loading"
            indeterminate=""
            color="primary"
            class="theme-page-loading"
            :size="100"
        ></v-progress-circular>
        <v-container fluid>
            <v-row>
                <v-col cols="12" lg="3" class="schedule-form-details">
                    <v-defaults-provider :defaults="defaultsEventData">
                        <div class="schedule-form-header">
                            <h3 class="schedule-form-title">{{ $t('generic.book') }}</h3>
                        </div>
                        <v-form
                            ref="form"
                            v-model="formIsValid"
                            lazy-validation
                        >
                            <v-card v-show="selectedItemUser.id"
                                color="primary"
                                class="schedule-user-card"
                            >
                                <div class="d-flex justify-space-between align-center flex-wrap">
                                    <div class="d-flex align-center">
                                        <v-avatar size="64" class="me-4">
                                            <!-- <v-img :src="selectedItemUser.avatar" /> TODO VUETIFY FIX -->
                                            <img alt="user avatar" class="avatar-image" :src="selectedItemUser.avatar" />
                                        </v-avatar>
                                        <div>
                                            <h4 class="font-600">{{ selectedItemUser.username }}</h4>
                                            <p v-show="selectedItemUser.lastVisit && selectedItemUser.lastVisit > 0"
                                                class="mb-0 grey--text text--darken-1"
                                            >
                                                {{ $t('play.schedule-details-last-visit') + ': ' + formatUIDate(selectedItemUser.lastVisit) }}
                                            </p>
                                        </div>
                                    </div>
                                    <v-btn v-show="selectedItemUser.wallet" color="secondary">
                                        {{ selectedItemUser.wallet }}
                                    </v-btn>
                                </div>
                            </v-card>

                            <v-list class="schedule-info-card bg-primary">
                                <v-list-item>
                                    <v-list-item-avatar start>
                                        <font-awesome-icon :icon="['fas', 'calendar']" />
                                    </v-list-item-avatar>
                                    <v-list-item-title>{{ selectedItemReadable.date || $t('play.select-event-label-date') }}</v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-avatar start>
                                        <font-awesome-icon :icon="['fas', 'clock']" />
                                    </v-list-item-avatar>
                                    <v-list-item-title>
                                        {{ selectedItemReadable.hourStart && selectedItemReadable.hourEnd ? selectedItemReadable.hourStart + ' - ' + selectedItemReadable.hourEnd : $t('play.select-event-label-hours') }}
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item v-show="selectedItemDuration">
                                    <v-list-item-avatar start>
                                        <font-awesome-icon :icon="['fas', 'play']" />
                                    </v-list-item-avatar>
                                    <v-list-item-title>{{ selectedItemDuration }}</v-list-item-title>
                                </v-list-item>
                                <v-list-item v-show="!selectedItemDuration" lines="">
                                    <v-list-item-avatar start>
                                        <font-awesome-icon :icon="['fas', 'circle-info']" />
                                    </v-list-item-avatar>
                                    <v-list-item-subtitle>{{ $t('play.select-event-label-disclaimer') }}</v-list-item-subtitle>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-avatar start>
                                        <font-awesome-icon :icon="['fas', 'play']" />
                                    </v-list-item-avatar>
                                    <v-list-item-title>
                                        <small>{{ $t('play.select-event-fast-play') }}</small>
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>

                            <v-card variant="outlined"
                                    :color="$vuetify.theme.themes.default.colors.secondary"
                            >
                                <v-btn-toggle
                                    v-model="fastMode"
                                    :color="$vuetify.theme.themes.default.colors.secondary"
                                    class="card-top-action"
                                    tile
                                    group
                                >
                                    <v-btn :value="true">
                                        {{ $t('play.select-event-mode-fast') }}
                                    </v-btn>

                                    <v-btn :value="false">
                                        {{ $t('play.select-event-mode-slow') }}
                                    </v-btn>
                                </v-btn-toggle>

                                <v-card-text>
                                    <v-row>
                                        <!-- TODO aggiungere orari\giorni limite alle rules? -->
                                        <v-col cols="12">
                                            <!-- TODO buggato :rules="[formRules.required]" -->
                                            <v-text-field
                                                :value="formatInputTypeDate(form.date, 'YYYY-MM-DD', timeFormatDate)"
                                                @input="({target:{value}}) => form.date = formatInputTypeDate(value, timeFormatDate, 'YYYY-MM-DD')"
                                                type="date"
                                                hide-details="auto"
                                            />
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field
                                                v-model="form.hourStart"
                                                @input="({target:{value}}) => form.hourStart = formatInputTypeTime(value)"
                                                type="time"
                                                :rules="[formRules.required]"
                                                label="Start"
                                                :step="scheduleTimeStep / 1000"
                                                hide-details="auto"
                                            />
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field
                                                v-model="form.hourEnd"
                                                @input="({target:{value}}) => form.hourEnd = formatInputTypeTime(value)"
                                                type="time"
                                                :rules="[formRules.required]"
                                                label="End"
                                                :step="scheduleTimeStep / 1000"
                                                hide-details="auto"
                                            />
                                        </v-col>
                                        <v-col cols="12">
                                            <v-list>
                                                <v-list-item v-show="selectedFormDuration">
                                                    <v-list-item-avatar start class="text-secondary">
                                                        <font-awesome-icon :icon="['fas', 'play']" />
                                                    </v-list-item-avatar>
                                                    <v-list-item-title>{{ selectedFormDuration }}</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-avatar start>
                                                    <span class="status-circle"
                                                          :class="[formScheduleAvailability.length > 0 ? 'offline' : 'online']"
                                                    />
                                                    </v-list-item-avatar>
                                                    <v-list-item-title>
                                                        {{ formScheduleAvailability.length > 0 ? $t('play.schedule-form-schedule-' + formScheduleAvailability[0]) : $t('play.schedule-form-schedule-available') }}
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-col>
                                    </v-row>
                                    <v-checkbox
                                        v-model="form.rules"
                                        color="secondary"
                                        class="text-secondary"
                                        :rules="[formRules.rulesCheckbox]"
                                        hide-details="auto"
                                    >
                                        <template #label>
                                            <span v-html="$t('play.select-event-form-rules')"></span>
                                        </template>
                                    </v-checkbox>
                                </v-card-text>

                                <v-btn
                                    block
                                    color="secondary"
                                    class="card-bottom-action vuetify-icon-button"
                                    @click="formAddSchedule"
                                >
                                    {{
                                        !form.rules ? $t('play.schedule-button-rules') :
                                            !formIsValid ? $t('play.schedule-button-invalid') :
                                                selectedItemIdentifier ? $t('play.schedule-button-edit') :
                                                    fastMode ? $t('play.schedule-button-play-now') :
                                                        $t('play.schedule-button-new')
                                    }}
                                    <font-awesome-icon :icon="!formIsValid ? ['fas', 'ban'] : fastMode ? ['fas', 'play'] : ['fas', 'check']" />
                                </v-btn>
                            </v-card>
                        </v-form>
                    </v-defaults-provider>
                </v-col>
                <v-col cols="12" lg="9">
                    <!-- TODO test admin mode -->
                    <Calendar
                        :admin          = "userInfo.isAdmin"
                        :events         = "scheduleDetailedList"
                        :resources      = "resources"
                        :businessHours  = "businessHoursFullcalendar"
                        :primary        = "$vuetify.theme.themes.default.colors.primary"
                        :secondary      = "$vuetify.theme.themes.default.colors.secondary"
                        :text           = "$vuetify.theme.themes.default.colors.text"
                        :eventsPerDay   = "totalStations['global'] || 0"
                        :slotDuration   = "scheduleTimeStep"
                        :handleAllow    = "handleAllowFullcalendar"

                        @event:click    = "selectItem"
                        @event:create   = "calendarAddSchedule"
                        @event:limit-reached = "scheduleLimitReached"
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
                </v-col>
            </v-row>

            <v-btn variant="primary">EVENT MODAL</v-btn>

            <h1>TOTAL TO PAY (ore di abbonamento oppure soldi oppure pagamento alla cassa)</h1>

            <EventCard
                v-for="{ id } in schedulesUnsaved"
                :key="'event-unsaved-' + id"
                :id="id"

                @button:confirm="confirmItem(id)"
            />

            <EventLongCard
                v-for="schedule in schedulesUnsaved"
                :key="'event-unsaved-' + schedule.id"
                :time="new Date(schedule.start).getTime()"
                image="https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-main-1.png"
                :color="$vuetify.theme.themes.default.colors.primary"
            >
                <h1>UNSAVED</h1>
                {{ schedule }}
            </EventLongCard>

            <EventLongCard
                v-for="schedule in schedulesOffline"
                :key="'event-unsaved-' + schedule.id"
                :time="new Date(schedule.start).getTime()"
                image="https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-main-1.png"
                :color="$vuetify.theme.themes.default.colors.primary"
            >
                <h1>OFFLINE</h1>
                {{ schedule }}
            </EventLongCard>

            <EventLongCard
                v-for="schedule in schedulesOnHold"
                :key="'event-unsaved-' + schedule.id"
                :time="new Date(schedule.start).getTime()"
                image="https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-main-1.png"
                :color="$vuetify.theme.themes.default.colors.primary"
            >
                <h1>ONHOLD</h1>
                {{ schedule }}
            </EventLongCard>
        </v-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { timeToSeconds } from "guebbit-javascript-library";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import {
    defaultUserAvatar,
    formRules,
    labelFromToDuration,
    timeFormatDate,
    timeFormatHours
} from "@/resources/constants";
import apiControllerPageList from "@/resources/mixins/apiControllerPageList";
import Calendar from "@/components/play/Calendar.vue";
import EventContentCard from "@/components/play/FAEventContentCard.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck, faBan, faCalendar, faClock, faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
library.add(faCheck, faBan, faCalendar, faClock, faPlay, faCircleInfo);

import type {
    scheduleInputMap,
    scheduleMap,
    userMap,
    stationMap
} from "@/interfaces";

import type {
    DateSpanApi,
    EventInput,
    EventApi,
} from '@fullcalendar/vue3';
import type {
    ResourceInput
} from '@fullcalendar/resource-common';
import EventLongCard from "@/components/basics/cards/EventLongCard.vue";
import EventCard from "@/components/play/EventCard.vue";


interface scheduleFormMap {
    date?: string
    hourStart?: string
    hourEnd?: string
    rules?: boolean
}

export default defineComponent({
    name: "PlayPage",

    mixins:[
        apiControllerPageList
    ],

    components: {
        EventCard,
        EventLongCard,
        Calendar,
        EventContentCard,
        FontAwesomeIcon
    },

    watch: {
        /**
         * When selectedItemIdentifier is successfully changed,
         * update form with info of new selectedItem
         */
        selectedItemIdentifier(){
            if(!this.selectedItem){
                return;
            }
            const { start, end } = this.selectedItem as scheduleMap;
            this.fillForm(start, end);
        },

        /**
         * When form change
         * Must NOT be initialization
         * Must NOT be just different schedule's switching
         * Must NOT be non consequential-parameter
         *
         */
        watcherHelperScheduleChange: {
            /**
             *
             * @param {string} newSelectedItemIdentifier - this.selectedItemIdentifier
             * @param {string} newDate - this.form.date
             * @param {string} newHourEnd - this.form.hourEnd
             * @param {string} newHourStart - this.form.hourStart
             * @param {string} oldSelectedItemIdentifier - this.selectedItemIdentifier
             * @param {string} oldDate - this.form.date
             * @param {string} oldHourEnd - this.form.hourEnd
             * @param {string} oldHourStart - this.form.hourStart
             */
            handler({ selectedItemIdentifier: newSelectedItemIdentifier, date: newDate, hourEnd: newHourEnd, hourStart: newHourStart }, { selectedItemIdentifier: oldSelectedItemIdentifier, date: oldDate, hourEnd: oldHourEnd, hourStart: oldHourStart }){
                // if no selected item or all undefined then this the initialization
                if(!oldSelectedItemIdentifier || !oldDate || !oldHourEnd || !oldHourStart){
                    return;
                }
                // if the identifier changed, then it's a different event being loaded
                if(oldSelectedItemIdentifier !== newSelectedItemIdentifier){
                    return;
                }
                // if all is the same, then it changed a non-consequential parameter
                if(newDate === oldDate && newHourEnd === oldHourEnd && newHourStart === oldHourStart){
                    return;
                }
                console.log(
                    "ARGGGGGGGGGGG",
                    newDate, oldDate, newHourEnd, oldHourEnd, newHourStart, oldHourStart,
                    newDate === oldDate, newHourEnd === oldHourEnd, newHourStart === oldHourStart
                );
                // after all checks: EDIT CURRENT EVENT (offline changes, online after confirm)
                this.editSchedule({
                    ...this.formItemSchedule,
                    id: this.selectedItemIdentifier
                }).catch((errors: string[]) => {
                    // TODO toast OR TODO disclaimer & computed
                    console.error("editSchedule", errors)
                })
            },
            deep: true
        },

        'form.hourStart'(){
            this.resetFormHours();
        },
        'form.hourEnd'(){
            this.resetFormHours(true);
        },
    },

    data: () => {
        return {
            loadingName: 'schedule',
            fastMode: true,
            form: {
                date: undefined,
                hourStart: undefined,
                hourEnd: undefined,
                rules: false
            } as scheduleFormMap,
            formIsValid: true,
            defaultsEventData: {
                global: {
                    // variant: 'outlined',
                },
                VCard: {
                    // color: 'secondary',
                },
                VTextField: {
                    color: 'secondary',
                    variant: 'outlined'
                }
            },
            timeFormatDate,
            timeFormatHours,
            defaultUserAvatar,
            formRules
        }
    },

    computed: {
        ...mapState({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            businessHours: ({ main: { businessHours } }: any) => businessHours,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            userInfo: ({ user: { userInfo } }: any) => userInfo,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            itemsRecords: ({ ecommerce: { scheduleRecords } }: any) => scheduleRecords,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            users: ({ ecommerce: { users } }: any) => users,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            stations: ({ ecommerce: { stations } }: any) => Object.values(stations),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            scheduleTimeStep: ({ ecommerce: { scheduleTimeStep } }: any) => scheduleTimeStep,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            scheduleEditableTime: ({ ecommerce: { scheduleEditableTime } }: any) => scheduleEditableTime,
        }),
        ...mapGetters('ecommerce', [
            'scheduleDetailedList',
            'checkScheduleIsEditable',
            'checkScheduleIsAllowed',
            'schedulesUnsaved',
            'schedulesOffline',
            'schedulesOnHold',
            'totalStations',
        ]),

        /**
         * HELPER to watch 2 different variables
         */
        watcherHelperScheduleChange(){
            return {
                ...this.form,
                selectedItemIdentifier: this.selectedItemIdentifier
            }
        },

        /**
         * Form Hour End TRANSLATION
         * hourEnd 00.00 is considered 24.00
         * hourStart 00.00 is considered 00.00 so no need to translate
         *
         * @return {string | undefined}
         */
        translatedHourEnd() :string | undefined {
            return this.form.hourEnd === '00:00' ? '24:00' : this.form.hourEnd;
        },

        resources() :ResourceInput[] {
            let resourcesArray :ResourceInput[] = [];
            for(let len = this.stations.length, i = 0; i < len; i++){
                const { id, label, capacity } = this.stations[i] as stationMap;
                resourcesArray.push({
                    id,
                    title: label,
                    capacity
                })
            }
            return resourcesArray;
        },
        
        /**
         * Selected item user's info
         * UsersList not available if not admin
         *
         * @return {Object}
         */
        selectedItemUser() :userMap | unknown {
            if(!this.selectedItem){
                return {};
            }
            let { userId } = this.selectedItem as scheduleMap;
            const { id: currentUserId, isAdmin } = this.userInfo;

            // NO userId and NO admin = current user creating an event
            if(!isAdmin && !userId){
                userId = currentUserId;
            }
            // YES userId and it's the current user
            if(userId === currentUserId){
                const { id, avatar = defaultUserAvatar, username, lastVisit, wallet } = this.userInfo;
                return {
                    id,
                    avatar,
                    username,
                    lastVisit,
                    wallet
                };
            }
            // YES userId (and YES Admin, security in BE) = it's the selected user (if not found it will be empty by default)
            if(userId && Object.prototype.hasOwnProperty.call(this.users, userId)){
                const { id, avatar = defaultUserAvatar, username, lastVisit, wallet } = this.users[userId];
                return {
                    id,
                    avatar,
                    username,
                    lastVisit,
                    wallet
                };
            }
            // NO userId = it's the admin placeholder
            if(!userId){
                return {
                    id: 'none',
                    avatar: defaultUserAvatar,
                    username: ''
                }
            }
            // NO userId OR YES userId but NO admin
            return {
                id: 'none',
                avatar: defaultUserAvatar,
                username: this.$t('generic.user'),
            }
        },

        /**
         * schedule data from FORM
         *
         * WARNING: hourStart 00.00 IS 00.00, hourEnd 00.00 is considered 24.00
         * @return {Object}
         */
        formItemSchedule() :scheduleInputMap {
            return {
                allDay: false,
                start: dayjs(this.form.date + ' ' + this.form.hourStart, timeFormatDate + ' ' + timeFormatHours).valueOf(),
                end: dayjs(this.form.date + ' ' + this.translatedHourEnd, timeFormatDate + ' ' + timeFormatHours).valueOf(),
            }
        },

        /**
         * Get date, hourStart and hourEnd from selectedItem
         * and translate them in a human readable way.
         *
         * @return {Object}
         */
        selectedItemReadable() :scheduleFormMap {
            if(!this.selectedItem){
                return {};
            }
            let { start, end } = this.selectedItem as scheduleMap;
            return {
                date: dayjs(start).format(timeFormatDate),    //(end) MUST be the same
                hourStart: dayjs(start).format(timeFormatHours),
                hourEnd: dayjs(end).format(timeFormatHours)
            };
        },

        /**
         * Form schedule is on a valid time?
         */
        formScheduleAvailability() :string[] {
            const { start, end } = this.formItemSchedule;
            return this.checkScheduleIsAllowed(start, end);
        },

        /**
         * Readable duration
         *
         * @return {string}
         */
        selectedItemDuration() :string {
            if(!this.selectedItem){
                return '';
            }
            const { start, end } = this.selectedItem as scheduleMap;
            const { mode, hours, minutes } = labelFromToDuration(start, end);
            return this.$t('play.schedule-details-time-count.' + mode, {
                hours,
                minutes
            });
        },

        /**
         * Readable duration
         *
         * @return {string}
         */
        selectedFormDuration() :string {
            if(!this.formItemSchedule){
                return '';
            }
            const { start, end } = this.formItemSchedule;
            const { mode, hours, minutes } = labelFromToDuration(start, end);
            return this.$t('play.schedule-details-time-count.' + mode, {
                hours,
                minutes
            });
        },

        /**
         * Business hours translated for Fullcalendar
         */
        businessHoursFullcalendar(){
            const businessHoursArray = [];
            for(let i = this.businessHours.length; i--; ){
                if(this.businessHours[i].length > 0){
                    businessHoursArray.push({
                        daysOfWeek: [i],
                        startTime: this.businessHours[i][0].replace('.', ':'),
                        endTime: this.businessHours[i][1].replace('.', ':'),
                    })
                }
            }
            return businessHoursArray;
        },
    },

    methods: {
        ...mapActions('ecommerce', {
            getItems: 'getSchedules',
            removeItems: 'removeSchedule'
        }),
        ...mapActions('ecommerce', [
            'addSchedule',
            'editSchedule'
        ]),


        /**
         * handleAllow function of FullCalendar
         *
         * @param {Object} dropInfo
         * @param {Object} draggedEvent
         * @return {boolean}
         */
        // TODO WARNING parte loop infinito se cerco di modificare un evento dopo averlo cliccato
        handleAllowFullcalendar(dropInfo :DateSpanApi, draggedEvent: EventApi | null) :boolean {
            const { start, end, resource: { id :resourceId } = {} } = dropInfo;

            // if there is no schedule (TODO should?)
            if(!draggedEvent){
                const errorArray = this.checkScheduleIsAllowed(start.getTime(), end.getTime(), resourceId);
                for(let i = errorArray.length; i--; ){
                    // TODO toast OR TODO disclaimer & computed
                    console.error("handleAllowFullcalendar 111", errorArray[i])
                }
                return errorArray.length === 0;
            }

            const { id } = draggedEvent || {};
            const errorArray = this.checkScheduleIsEditable(id);
            for(let i = errorArray.length; i--; ){
                // TODO toast OR TODO disclaimer & computed
                console.error("handleAllowFullcalendar 222", errorArray[i])
            }
            return errorArray.length === 0;
        },

        /**
         * Added schedule via FullCalendar
         *
         * @param {Object} schedule
         */
        calendarAddSchedule(schedule :EventInput){
            // WARNING handleAllowFullcalendar checks already done
            this.addSchedule(schedule)
                .then(id => {
                    if(id){
                        this.selectItem(id);
                    }
                })
                .catch((errors :string[]) => {
                    console.error("calendarAddSchedule", errors)
                })
        },

        /**
         * Add schedule via FORM
         *
         */
        formAddSchedule(){
            if(!this.formIsValid){
                return;
            }

            this.addSchedule(this.formItemSchedule)
                .then(id => {
                    if(id){
                        this.selectItem(id);
                    }
                })
                .catch((errors :string[]) => {
                    console.error("formAddSchedule", errors)
                })
        },

        selectItem(id :string){
            if(!id || this.checkScheduleIsEditable(id).length > 0){
                return;
            }
            // all checks are ok, it can be edited
            this.selectedItemIdentifier = id;
            const { start } = this.selectedItem as scheduleMap;
            const { isAdmin } = this.userInfo;
            // POST CHECK: Current user can edit event only until 1 hour from the start of it (edit time expired)
            if(!isAdmin && start + this.scheduleEditableTime < Date.now()){
                // TODO toast timesup!
                console.log("CAN'T EDIT IN THE PAST")
                this.selectedItemIdentifier = '';
                return;
            }
            // admin can edit but confirmation needed
            if(isAdmin && start < Date.now()){
                // TODO disclaimer
            }
        },

        /**
         * Confirm schedule and ask for payment
         *
         * @param {string} id
         */
        confirmItem(id :string){
            console.log("AAAAAAAAAAAAAAAAAAAAAAAA", id)
            // TODO confirm multiple?
        },

        /**
         * Fill form with selected dates
         *
         * @param {number} start
         * @param {number} end
         */
        fillForm(start ?:number, end ?:number) :void {
            // if START is empty => put today
            if(!start){
                start = Date.now();
            }
            // if END is empty => put today + double timeStep (1 hour) as standard starting value
            if(!end){
                // 1 hour later
                end = start + this.scheduleTimeStep * 2;
            }
            // all times must be divided in "steps" (30 min steps)
            start = Math.round(start / this.scheduleTimeStep) * this.scheduleTimeStep;
            end = Math.round(end / this.scheduleTimeStep) * this.scheduleTimeStep;
            // fill the form with the new data
            this.form = {
                date: dayjs(start).format(timeFormatDate),    //(end) MUST be the same
                hourStart: dayjs(start).format(timeFormatHours),
                hourEnd: dayjs(end).format(timeFormatHours),
                rules: false
            };
            // TODO VUETIFY BUG lazy-loading
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (this.$refs.form as any).validate();
        },

        /**
         * FullCalendar max limit reached emit
         *
         * @param {Date} start
         * @param {Date} end
         * @param {string[]} idArray
         */
        scheduleLimitReached(start :Date, end :Date, idArray :string[]){
            // TODO toast OR TODO disclaimer & computed
            console.error("MAX LIMIT REACHED", start, end, idArray)
        },

        /**
         * Put hourStart behind hourEnd of 1 hour.
         * Edit the one who was not edited by the user
         *
         * TODO adapt to businessHours
         *
         * @param {boolean} hourEndWasEdited
         */
        resetFormHours(hourEndWasEdited = false){
            const start = timeToSeconds(this.form.hourStart);
            const end = timeToSeconds(this.translatedHourEnd);
            if(start >= end){
                if(!hourEndWasEdited){
                    const newTime = dayjs(this.form.date + ' ' + this.form.hourStart, timeFormatDate + ' ' + timeFormatHours).valueOf();
                    this.form.hourEnd = dayjs(newTime + (this.scheduleTimeStep * 2)).format(timeFormatHours);
                }else{
                    const newTime = dayjs(this.form.date + ' ' + this.translatedHourEnd, timeFormatDate + ' ' + timeFormatHours).valueOf();
                    this.form.hourStart = dayjs(newTime - (this.scheduleTimeStep * 2)).format(timeFormatHours);
                }
            }
        },

        /**
         *
         * @param {number} timestamp
         * @param {string} formatTo - format
         */
        formatUIDate(timestamp :number, formatTo = timeFormatDate + ' ' + timeFormatHours){
            return dayjs(timestamp).format(formatTo);
        },

        /**
         * input type="date" accept only YYYY-MM-DD format, even if it shows another format,
         * so it needs to be translated.
         *
         * @param {string} value
         * @param {string} formatTo - format
         * @param {string} formatFrom - format
         */
        formatInputTypeDate(value :string, formatTo = timeFormatDate, formatFrom = timeFormatDate){
            return dayjs(value, formatFrom).format(formatTo);
        },

        /**
         * input type="time" has a stepper that is ignored in the dropdown (so its unreliable)
         *
         * @param {string} value
         * @param {string} separator
         * @param {number} step
         */
        formatInputTypeTime(value :string, separator = ":", step = 30){
            const [hours = '00', minutes = '00'] = value.split(separator);
            return hours + separator + (parseInt(minutes) >= step ? step.toString() : '00');
            // const newMinutes = Math.round(parseInt(minutes) / step) * step;
            // return hours + separator + (newMinutes < 60 ? newMinutes.toString().padStart(2, '0') : '00');
        },

    },

    mounted(){
        this.fillForm();
    }
});
</script>

<style lang="scss">
@import "src/assets/scss/main/global";

#play-page {
    .schedule-form-details{
        .schedule-form-header {
            margin-bottom: 1.5em;
        }
        .schedule-form-title {
            font-size: 1.75em;
            text-align: center;
        }
        .v-list{
            font-size: 1.5em;
            .v-list-item-title{
                font-size: 1em;
            }
        }

        input[type="time"],
        input[type="date"]{
            font-size: 1.5em;
            &::-webkit-calendar-picker-indicator {
                cursor: pointer;
            }
        }
    }

    .schedule-user-card{
        padding: 12px;
        margin-bottom: 12px;
        .avatar-image{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .schedule-info-card{
        margin-bottom: 24px;
    }
}
</style>
