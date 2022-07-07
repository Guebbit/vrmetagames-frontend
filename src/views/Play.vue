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
                <v-col cols="12" lg="3">
                    <v-list class="schedule-info-card">
                        <v-list-item>
                            <v-list-item-avatar start>
                                <font-awesome-icon :icon="['fas', 'calendar']" />
                            </v-list-item-avatar>
                            <v-list-item-title>{{ selectedItemReadable.date || $t('play-page.select-event-label-date') }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-avatar start>
                                <font-awesome-icon :icon="['fas', 'clock']" />
                            </v-list-item-avatar>
                            <v-list-item-title>
                                {{ selectedItemReadable.hourStart && selectedItemReadable.hourEnd ? selectedItemReadable.hourStart + ' - ' + selectedItemReadable.hourEnd : $t('play-page.select-event-label-hours') }}
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
                            <v-list-item-subtitle>{{ $t('play-page.select-event-label-disclaimer') }}</v-list-item-subtitle>
                        </v-list-item>
                        <template v-if="userInfo.isAdmin && selectedItemIdentifier">
                            <v-list-item>
                                <v-btn
                                    block
                                    variant="tonal"
                                    @click="fastMode ? (removeItems([selectedItemIdentifier]), selectedItemIdentifier = null) : showConfirmDeleteItemDialog = true"
                                >
                                    {{ $t('play-page.select-event-label-remove-event') }}
                                </v-btn>
                            </v-list-item>
                            <v-list-item>
                                <v-btn
                                    block
                                    variant="tonal"
                                    @click="selectedItemIdentifier = null"
                                >
                                    {{ $t('play-page.select-event-label-unselect-event') }}
                                </v-btn>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-col>
                <v-col cols="12" lg="9" class="schedule-form-details">
                    <ScheduleFormPanel
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

                    <div class="d-flex justify-end align-items-center flex-gap-24 mt-10">
                        <v-btn
                            variant="outlined"
                            size="x-large"
                            :to="{
                                name: 'PlayAdvanced',
                                params: {
                                    preloadSteps
                                }
                            }"
                        >
                            {{ $t('play-page.schedules-advanced-settings') }}
                            <font-awesome-icon class="ml-3" :icon="['fas', 'calendar-day']" />
                        </v-btn>
                        <v-btn
                            color="secondary"
                            size="x-large"
                            :to="{ name: 'Checkout' }"
                            :disabled="scheduleListCart.length === 0"
                        >
                            {{ $t('play-page.schedules-confirm-all') }}
                            <font-awesome-icon class="ml-3" :icon="['fas', 'play']" />
                        </v-btn>
                    </div>
                </v-col>
            </v-row>

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
                :title="$t('play-page.schedule-alert-remove-title')"
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
                        <v-list-item-title>{{ selectedItemReadable.date || $t('play-page.select-event-label-date') }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-avatar start>
                            <font-awesome-icon :icon="['fas', 'clock']" />
                        </v-list-item-avatar>
                        <v-list-item-title>
                            {{ selectedItemReadable.hourStart && selectedItemReadable.hourEnd ? selectedItemReadable.hourStart + ' - ' + selectedItemReadable.hourEnd : $t('play-page.select-event-label-hours') }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>

                <v-divider class="my-4"></v-divider>

                <div class="d-flex flex-row align-center justify-end" style="gap:12px">
                    <v-btn
                        variant="outlined"
                        @click="showConfirmDeleteItemDialog = false"
                    >
                        {{ $t('play-page.schedule-alert-remove-button-cancel') }}
                    </v-btn>
                    <v-btn
                        variant="outlined"
                        @click="removeItems([selectedItemIdentifier]); selectedItemIdentifier = null; showConfirmDeleteItemDialog = false"

                    >
                        {{ $t('play-page.schedule-alert-remove-button-confirm') }}
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

// TODO REDO IN VUE 3 + USE COMPOSABLES + VUE 3 MIXINS??
// TODO SIMPLE MODE

import { defineComponent } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import apiControllerPageList from "@/resources/mixins/apiControllerPageList";
import EventCard from "@/components/play/EventCard.vue";
import ScheduleFormPanel from "@/components/generic/ScheduleFormPanel.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCalendar, faClock, faPlay, faCalendarDay, faCheck, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import type {
    scheduleInputMap,
    scheduleMap,
    scheduleFormMap,
} from "@/interfaces";

library.add(faCalendar, faClock, faPlay, faCalendarDay, faCheck, faCircleInfo);
dayjs.extend(customParseFormat);

export default defineComponent({
    name: "PlayPage",

    mixins:[
        apiControllerPageList
    ],

    components: {
        ScheduleFormPanel,
        EventCard,
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
            loadingName: 'schedule',
            // toggles
            showConfirmDeleteItemDialog: false
        }
    },

    computed: {
        ...mapState({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            userInfo: ({ user: { userInfo } }: any) => userInfo,
        }),
        ...mapGetters('ecommerce', [
            'scheduleReadable',
            'checkScheduleIsEditable',
            'scheduleListOffline',
            'scheduleListCart',
        ]),

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

    .schedule-info-card{
        margin-bottom: 24px;
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
