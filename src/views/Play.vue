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
                    <div class="schedule-form-header">
                        <h3 class="schedule-form-title">{{ $t('generic.book') }}</h3>
                    </div>

                    <v-card
                        v-show="selectedItemUser.id && selectedItemUser.id !== 'none'"
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
                        <template v-if="userInfo.isAdmin && selectedItemIdentifier">
                            <v-list-item>
                                <v-btn
                                    block
                                    @click="removeItems([selectedItemIdentifier])"
                                >
                                    Rimuovi evento
                                </v-btn>
                            </v-list-item>
                            <v-list-item>
                                <v-btn
                                    block
                                    @click="selectedItemIdentifier = null"
                                >
                                    Deseleziona evento
                                </v-btn>
                            </v-list-item>
                        </template>
                    </v-list>



                    <ScheduleFormCard
                        :scheduleId="selectedItemIdentifier"

                        @schedule:add = "formAddSchedule"
                        @schedule:edit = "formEditSchedule"
                        @schedule:reset = "selectedItemIdentifier = null"
                    />
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

            <EventCard
                v-for="{ id } in schedulesOffline"
                :key="'event-offline-' + id"
                :id="id"

                @button:confirm="confirmItem(id)"
            />

            <EventCard
                v-for="{ id } in schedulesOnHold"
                :key="'event-onhold-' + id"
                :id="id"

                @button:confirm="confirmItem(id)"
            />
        </v-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import {
    defaultUserAvatar,
    formRules,
    timeFormatDate,
    timeFormatHours
} from "@/resources/constants";
import apiControllerPageList from "@/resources/mixins/apiControllerPageList";
import Calendar from "@/components/play/Calendar.vue";
import EventContentCard from "@/components/play/FAEventContentCard.vue";
import EventCard from "@/components/play/EventCard.vue";
import ScheduleFormCard from "@/components/generic/ScheduleFormCard.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCalendar, faClock, faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
library.add(faCalendar, faClock, faPlay, faCircleInfo);

import type {
    scheduleInputMap,
    scheduleMap,
    userMap,
    stationMap,
    formScheduleMap
} from "@/interfaces";

import type {
    DateSpanApi,
    EventInput,
    EventApi,
} from '@fullcalendar/vue3';
import type {
    ResourceInput
} from '@fullcalendar/resource-common';


export default defineComponent({
    name: "PlayPage",

    mixins:[
        apiControllerPageList
    ],

    components: {
        ScheduleFormCard,
        EventCard,
        Calendar,
        EventContentCard,
        FontAwesomeIcon
    },

    data: () => {
        return {
            loadingName: 'schedule',
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
            'scheduleReadable',
            'checkScheduleIsEditable',
            'checkScheduleIsAllowed',
            'schedulesUnsaved',
            'schedulesOffline',
            'schedulesOnHold',
            'totalStations',
        ]),

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
         * Get date, hourStart and hourEnd from selectedItem
         * and translate them in a human readable way.
         *
         * @return {Object}
         */
        selectedItemReadable() :formScheduleMap {
            if(!this.selectedItem){
                return {};
            }
            let { start, end } = this.selectedItem as scheduleMap;
            return this.scheduleReadable(start, end);
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
            const { durationData: { mode, hours, minutes } } = this.scheduleReadable(start, end);
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
            removeItems: 'removeSchedules'
        }),
        ...mapActions('ecommerce', [
            'addSchedule',
            'editSchedule'
        ]),

        /**
         *
         *
         * @param {Object} schedule
         */
        formAddSchedule(schedule :scheduleInputMap){
            this.addSchedule(schedule)
                .then(id => {
                    if(id){
                        this.selectItem(id);
                    }
                })
                .catch((errors :string[]) => {
                    console.error("formAddSchedule", errors)
                })
        },

        /**
         * Edit selectedItem with new data from FORM
         *
         * @param {Object} schedule
         */
        formEditSchedule(schedule :scheduleMap){
            this.editSchedule(schedule).catch((errors: string[]) => {
                // TODO toast OR TODO disclaimer & computed
                console.error("editSchedule", errors)
            })
        },

        /**
         * handleAllow function of FullCalendar
         *
         * @param {Object} dropInfo
         * @param {Object} draggedEvent
         * @return {boolean}
         */
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
         * Select schedule on fullcalendar
         *
         * @param {string} id
         */
        selectItem(id :string){
            if(!id || this.checkScheduleIsEditable(id).length > 0){
                return;
            }
            // all checks are ok, it can be edited
            this.selectedItemIdentifier = id;
            const { start } = this.selectedItem as scheduleMap;
            const { isAdmin } = this.userInfo;
            // TODO check already done?
            // POST CHECK: Current user can edit event only until 1 hour from the start of it (edit time expired)
            if(!isAdmin && start + this.scheduleEditableTime < Date.now()){
                // TODO toast timesup!
                console.error("CAN'T EDIT IN THE PAST")
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
            console.log("CCCCCCCCCCCCCONFIRM", id)
            // TODO confirm multiple?
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
         *
         * @param {number} timestamp
         * @param {string} formatTo - format
         */
        formatUIDate(timestamp :number, formatTo = timeFormatDate + ' ' + timeFormatHours){
            return dayjs(timestamp).format(formatTo);
        },
    },

    mounted(){
        this.formAddSchedule({
            start: 1655640000000,
            end: 1655647200000,
            allDay: false,
        })
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
