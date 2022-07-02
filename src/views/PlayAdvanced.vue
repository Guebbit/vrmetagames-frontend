<template>
    <div id="play-advanced-page" class="theme-page page-menu-padding">
        <v-progress-circular
            v-show="loading"
            indeterminate=""
            color="primary"
            class="theme-page-loading"
            :size="100"
        ></v-progress-circular>
        <v-container fluid>
            <h1 class="theme-page-subtitle text-center mt-5 mb-10">Calendario avanzato</h1>
            <v-row>
                <v-col cols="12" lg="3" class="schedule-form-details">
                    <UserInfoCard
                        class="mb-4"
                        v-if="selectedItem?.userId"
                        :id="selectedItem?.userId"
                    />

                    <v-list class="mb-4">
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
                                    variant="tonal"
                                    @click="fastMode ? (removeItems([selectedItemIdentifier]), selectedItemIdentifier = null) : showConfirmDeleteItemDialog = true"
                                >
                                    {{ $t('play.select-event-label-remove-event') }}
                                </v-btn>
                            </v-list-item>
                            <v-list-item>
                                <v-btn
                                    block
                                    variant="tonal"
                                    @click="selectedItemIdentifier = null"
                                >
                                    {{ $t('play.select-event-label-unselect-event') }}
                                </v-btn>
                            </v-list-item>
                        </template>
                    </v-list>

                    <ScheduleFormCard
                        :scheduleId="selectedItemIdentifier"
                        :showSpeedModeTab="false"
                        :defaultFastMode="false"
                        :defaultFormTimeStep="preloadSteps || 2"

                        @schedule:add = "scheduleHandleAdd"
                        @schedule:confirm = "scheduleHandleConfirm"
                        @schedule:edit = "scheduleHandleEdit"
                        @schedule:remove = "removeItems([selectedItemIdentifier]); selectedItemIdentifier = null"
                        @schedule:reset = "selectedItemIdentifier = null"
                    />
                </v-col>
                <v-col cols="12" lg="9">
                    <Calendar
                        :admin          = "userInfo.isAdmin"
                        :events         = "scheduleDetailedList"
                        :resources      = "resources"
                        :businessHours  = "businessHoursFullcalendar"
                        :primary        = "themeColors.primary"
                        :secondary      = "themeColors.secondary"
                        :background     = "themeColors.surface"
                        :text           = "themeColors['on-surface']"
                        :eventsPerDay   = "totalStations['global'] || 0"
                        :slotDuration   = "scheduleTimeStep"
                        :handleAllow    = "fullcalendarHandleEventAllow"

                        @event:click    = "selectItem"
                        @event:create   = "(event) => scheduleHandleAdd(fullcalendarEventApiTranslate(event))"
                        @event:changed  = "({ event }) => scheduleHandleEdit(fullcalendarEventApiTranslate(event))"
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
                </v-col>
            </v-row>

            <div v-show="scheduleListCart.length > 0"
                class="text-right my-10"
            >
                <v-btn
                    color="secondary"
                    size="x-large"
                    :to="{ name: 'Checkout' }"
                >
                    {{ $t('play.schedules-confirm-all') }}
                    <font-awesome-icon :icon="['fas', 'play']" />
                </v-btn>
            </div>

            <div v-show="scheduleListCart.length > 0" class="schedule-list">
                <h1 class="theme-page-subtitle text-center mt-5 mb-10">Lista eventi in prenotazione</h1>

                <!--
                <h1>OFFLINE</h1>
                <EventCard
                    v-for="{ id } in scheduleListOffline"
                    :key="'event-offline-' + id"
                    :id="id"

                    @button:confirm="scheduleHandleConfirm(id)"
                    @button:cancel="scheduleHandleReset(id)"
                />
                -->
                <v-row>
                    <v-col cols="12" lg="3">
                        <v-list
                            class="schedule-legend bg-transparent"
                            variant="text"
                        >
                            <v-list-item
                                v-for="([ variant, icon, color, label, message ], index) in statusListLegenda"
                                :key="'schedule-chip-' + index"
                            >
                                <v-chip
                                    :color="color"
                                    :variant="variant"
                                >
                                    <font-awesome-icon :icon="['fas', icon]" class="mr-2" />
                                    {{ label }}
                                </v-chip>
                                <p class="explanation">{{ message }}</p>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col cols="12" lg="9">
                        <EventCard
                            v-for="{ id } in scheduleListCart"
                            :key="'event-onhold-' + id"
                            :id="id"
                            :showConfirmButton="false"

                            @button:confirm="scheduleHandleConfirm(id)"
                            @button:cancel="fastMode ? (removeItems([selectedItemIdentifier]), selectedItemIdentifier = null) : showConfirmDeleteItemDialog = true"
                        />
                    </v-col>
                </v-row>

            </div>
        </v-container>


        <v-dialog
            v-model="showConfirmDeleteItemDialog"
        >
            <v-alert
                type="error"
                :title="$t('play.schedule-alert-remove-title')"
                variant="elevated"
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
                </v-list>

                <v-divider class="my-4"></v-divider>

                <div class="d-flex flex-row align-center justify-end" style="gap:12px">
                    <v-btn
                        variant="outlined"
                        @click="showConfirmDeleteItemDialog = false"
                    >
                        {{ $t('play.schedule-alert-remove-button-cancel') }}
                    </v-btn>
                    <v-btn
                        variant="outlined"
                        @click="removeItems([selectedItemIdentifier]); selectedItemIdentifier = null; showConfirmDeleteItemDialog = false"

                    >
                        {{ $t('play.schedule-alert-remove-button-confirm') }}
                    </v-btn>
                </div>
            </v-alert>
        </v-dialog>

    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useTheme } from "vuetify";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vuetifyColors from "vuetify/lib/util/colors";
import UserInfoCard from "@/components/basics/cards/UserInfoCard.vue";

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t } = useI18n();

const statusListLegenda = computed<string[][]>(() => {
    return [
        [
            undefined,
            'check',
            vuetifyColors.red.base,
            t('schedule-card.offline-chip') as string,
            t('schedule-card.offline-explanation') as string,
        ],
        [
            'outlined',
            'check',
            vuetifyColors.green.base,
            t('schedule-card.online-chip') as string,
            t('schedule-card.online-explanation') as string,
        ],
        [
            undefined,
            'check',
            themeColors.secondary,
            t('schedule-card.confirmed-chip') as string,
            t('schedule-card.confirmed-explanation') as string,
        ],
        [
            undefined,
            'check',
            vuetifyColors.shades.white,
            t('schedule-card.not-confirmed-chip') as string,
            t('schedule-card.not-confirmed-explanation') as string,
        ],
        [
            'outlined',
            'check',
            vuetifyColors.red.base,
            t('schedule-card.canceled-chip') as string,
            t('schedule-card.canceled-explanation') as string,
        ],
        [
            undefined,
            'check',
            themeColors.primary,
            t('schedule-card.paid-chip') as string,
            t('schedule-card.paid-explanation') as string,
        ],
        [
            'outlined',
            'check',
            vuetifyColors.yellow.darken1,
            t('schedule-card.unsaved-chip') as string,
            t('schedule-card.unsaved-explanation') as string,
        ],
    ];
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import {
    defaultUserAvatar,
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
import { faCalendar, faClock, faPlay, faCheck, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import type {
    scheduleInputMap,
    scheduleMap,
    userMap,
    stationMap,
    scheduleFormMap,
    scheduleReadableMap
} from "@/interfaces";

import type {
    DateSpanApi,
    EventApi
} from '@fullcalendar/vue3';
import type {
    ResourceInput
} from '@fullcalendar/resource-common';

library.add(faCalendar, faClock, faPlay, faCheck, faCircleInfo);
dayjs.extend(customParseFormat);

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

    props: {
        preloadSteps: {
            type: Number,
            required: false
        },
    },

    data: () => {
        return {
            // LOGIC: Nella pagina "avanzata" non dovrebbe esserci la fastMode, per ora la ignoro
            fastMode: false,
            loadingName: 'schedule',
            // toggles
            showConfirmDeleteItemDialog: false,
            //
            defaultUserAvatar,
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
            'scheduleListOffline',
            'scheduleListCart',
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
            return this.$t('generic.schedule-details-time-count.' + mode, {
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
         * handleAllow function of FullCalendar
         *
         * @param {Object} dropInfo
         * @param {Object} draggedEvent
         * @return {boolean}
         */
        fullcalendarHandleEventAllow(dropInfo :DateSpanApi, draggedEvent: EventApi | null) :boolean {
            const { start, end, resource: { id :resourceId } = {} } = dropInfo;
            const { id } = draggedEvent || {};
            const errorArray :string[] = [];
            // if the user can edit the schedule
            errorArray.push(...this.checkScheduleIsEditable(id));
            for(let i = errorArray.length; i--; ){
                // TODO toast OR TODO disclaimer & computed
                console.error("fullcalendarHandleEventAllow", errorArray[i])
            }
            // if the new position is valid
            errorArray.push(...this.checkScheduleIsAllowed(start.getTime(), end.getTime(), id, resourceId));
            for(let i = errorArray.length; i--; ){
                // TODO toast OR TODO disclaimer & computed
                console.error("fullcalendarHandleEventAllow", errorArray[i])
            }
            // approval
            return errorArray.length === 0;
        },

        /**
         * FullCalendar max limit reached emit
         *
         * @param {Date} start
         * @param {Date} end
         * @param {string[]} idArray
         */
        fullcalendarLimitReached(start :Date, end :Date, idArray :string[]){
            // TODO toast OR TODO disclaimer & computed
            console.error("MAX LIMIT REACHED", start, end, idArray)
        },

        /**
         * Transform fullcalendar EventApi in scheduleInputMap
         * Take only start, end and allyday (for now)
         * TODO take resource or resourceId
         *
         * @param {Object} schedule
         */
        fullcalendarEventApiTranslate({ id, start, end, allDay } :EventApi) :scheduleInputMap {
            return {
                id,
                start: start ? start.getTime() : 0,
                end: end ? end.getTime() : 0,
                allDay
            };
        },

        /**
         * Add Schedule (offline)
         *
         * @param {Object} schedule
         */
        scheduleHandleAdd(schedule :scheduleInputMap){
            this.addSchedule(schedule)
                .then(id => {
                    if(!id){
                        throw 'TODO errore sconosciuto';
                    }
                    this.selectItem(id);
                })
                .catch((errors :string[]) => {
                    // TODO toast OR TODO disclaimer & computed & REVERT
                    console.error("scheduleHandleAdd", errors)
                })
        },

        /**
         * Confirm schedule and pay from wallet
         * if wallet empty: delay confirm and ask for payment (?)
         *
         * @param {string} id
         */
        scheduleHandleConfirm(id :string){
            console.log("CCCCCCCCCCCCCONFIRM", id)
            // TODO confirm multiple?
        },

        /**
         * Reset edits
         *
         * @param {string} id
         */
        scheduleHandleReset(id :string){
            // TODO creo un elemento temporeaneo quando faccio modifiche offline
            console.log("RESETTTT", id)
        },

        /**
         * Edit schedule (unsaved = true)
         *
         * @param {Object} schedule
         */
        scheduleHandleEdit(schedule :scheduleInputMap){
            // WARNING fullcalendarHandleEventAllow checks already done
            this.editSchedule(schedule).catch((errors: string[]) => {
                // TODO toast OR TODO disclaimer & computed & REVERT
                console.error("editSchedule", errors)
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
            this.selectedItemIdentifier = id;
        },

        /**
         * Confirm schedule and ask for payment
         *
         * @param {string} id
         */
        removeItem(id :string){
            this.removeItems([id]);
            console.log("RRRRRRRRRREMOVE", id)
        },
    },
});
</script>

<style lang="scss">
@import "src/assets/scss/main/global";

#play-advanced-page {
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

    .schedule-legend{
        .explanation{
            flex-shrink: 99;
            margin-left: 1.5em;
            font-size: 0.8em;
        }
    }
}
</style>
