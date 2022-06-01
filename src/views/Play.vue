<template>
    <div id="play-page" class="theme-page page-menu-padding">
        <v-progress-circular
            v-show="loading"
            indeterminate
            color="primary"
            class="theme-page-loading"
            :size="100"
        ></v-progress-circular>
        <v-container fluid>
            <v-row>
                <v-col cols="12" lg="3" class="event-form-details">
                    <v-defaults-provider :defaults="defaultsEventData">
                        <div class="event-form-header">
                            <h3 class="event-form-title">Prenota</h3>
                        </div>
                        <v-form
                            ref="form"
                            v-model="formIsValid"
                            lazy-validation
                        >
                            <v-card v-show="selectedItemUser.id"
                                class="mb-4"
                            >
                                <div class="pa-5 bg-primary">
                                    <div class="d-flex justify-space-between align-center flex-wrap">
                                        <div class="d-flex align-center">
                                            <v-avatar size="64" class="me-4">
                                                <!-- <v-img :src="selectedItemUser.avatar" /> TODO VUETIFY FIX -->
                                                <img :src="selectedItemUser.avatar" style="object-fit: cover; width: 100%; height: 100%;" />
                                            </v-avatar>
                                            <div>
                                                <h4 class="font-600">{{ selectedItemUser.username }}</h4>
                                                <p v-show="selectedItemUser.lastVisit && selectedItemUser.lastVisit > 0"
                                                    class="mb-0 grey--text text--darken-1"
                                                >
                                                    {{ $t('play.schedule-details-last-visit') + ': ' + selectedItemUser.lastVisit }}
                                                </p>
                                            </div>
                                        </div>
                                        <v-btn v-show="selectedItemUser.wallet" color="secondary">
                                            {{ selectedItemUser.wallet }}
                                        </v-btn>
                                    </div>
                                </div>
                            </v-card>

                            <v-list class="bg-primary mb-4">
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
                                <v-list-item v-show="scheduleDuration">
                                    <v-list-item-avatar start>
                                        <font-awesome-icon :icon="['fas', 'play']" />
                                    </v-list-item-avatar>
                                    <v-list-item-title>{{ scheduleDuration }}</v-list-item-title>
                                </v-list-item>
                                <v-list-item v-show="!scheduleDuration" lines>
                                    <v-list-item-avatar start>
                                        <font-awesome-icon :icon="['fas', 'circle-info']" />
                                    </v-list-item-avatar>
                                    <v-list-item-subtitle>{{ $t('play.select-event-label-disclaimer') }}</v-list-item-subtitle>
                                </v-list-item>
                            </v-list>

                            <v-card variant="outlined"
                                color="secondary"
                                class="mb-4"
                            >
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
                                                :rules="[formRules.required, formRulesHoursOrder]"
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
                                                :rules="[formRules.required, formRulesHoursOrder]"
                                                label="End"
                                                :step="scheduleTimeStep / 1000"
                                                hide-details="auto"
                                            />
                                        </v-col>
                                        <v-col cols="12" v-show="formDuration">
                                            <v-list>
                                                <v-list-item>
                                                    <v-list-item-avatar start class="text-secondary">
                                                        <font-awesome-icon :icon="['fas', 'play']" />
                                                    </v-list-item-avatar>
                                                    <v-list-item-title>{{ formDuration }}</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-avatar start>
                                                    <span class="status-circle"
                                                          :class="[scheduleNewAvailability ? 'online' : 'offline']"
                                                    />
                                                    </v-list-item-avatar>
                                                    <v-list-item-title>
                                                        {{ scheduleNewAvailability ? $t('play.schedule-form-schedule-available') : $t('play.schedule-form-schedule-full') }}
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
                                    @click="confirmOfflineCurrentEvent"
                                >
                                    {{ !form.rules ? $t('play.schedule-button-rules') : !formIsValid ? $t('play.schedule-button-invalid') : selectedItemIdentifier ? $t('play.schedule-button-edit') : $t('play.schedule-button-new') }}
                                </v-btn>
                            </v-card>
                        </v-form>
                    </v-defaults-provider>
                </v-col>
                <v-col cols="12" lg="9">
                    <!-- TODO test admin mode -->
                    <Calendar
                        :admin = "userInfo.isAdmin"
                        :events="scheduleDetailedList"
                        :resources="resources"
                        :businessHours = "businessHoursTranslated"
                        :primary="$vuetify.theme.themes.default.colors.primary"
                        :secondary="$vuetify.theme.themes.default.colors.secondary"
                        :text="$vuetify.theme.themes.default.colors.text"
                        :eventsPerDay="totalStations"

                        @event:click = "selectItem"
                        @event:create = "addSchedule"
                        @event:limit-reached = "scheduleLimitReached"
                    >
                        <template v-slot:eventContent="{timeText, isMirror, event}">
                            <div v-if="event.display === 'background'">
                                boh
                            </div>
                            <!-- TODO cards -->
                            <div v-else-if="isMirror || event.extendedProps.temporary">
                                <b style="font-size: 2em">{{ timeText }}</b>
                                <div v-show="(event.end - event.start) > 1800000">
                                    <p v-show="!isMirror" style="font-size: 1.5em">Completa la prenotazione nel box apposito</p>
                                </div>
                            </div>
                            <div v-else-if="event.extendedProps.userId && getItem('users', event.extendedProps.userId)"
                                 class="d-flex align-center"
                            >
                                <div>
                                    <img v-show="(event.end - event.start) > 1800000"
                                         style="max-width: 50px; max-height: 50px;"
                                         :src="getItem('users', event.extendedProps.userId).avatar || defaultUserAvatar"
                                    >
                                    <b>{{ timeText }}</b>
                                    <b v-show="(event.end - event.start) > 1800000"><br> {{ getItem('users', event.extendedProps.userId).username }}</b>
                                </div>
                            </div>
                        </template>
                    </Calendar>
                </v-col>

                <v-col cols="12" lg="3">
                    <div class="event-form-instructions">
                        <ul class="simple-list">
                            <li class="hover-line-highlight">
                                <font-awesome-icon :icon="['fas', 'calendar']" />
                                Scegli una data sul calendario
                            </li>
                            <li class="hover-line-highlight">
                                <font-awesome-icon :icon="['fas', 'clock']" />
                                Sit Amet
                            </li>
                        </ul>
                        <pre>{{ selectedItem }}</pre>
                    </div>
                </v-col>
                <v-col cols="12" lg="9">

                    <pre>{{ schedulesUnsaved }}</pre>
                    <pre>{{ schedulesOffline }}</pre>
                    <pre>{{ schedulesOnHold }}</pre>

                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { secondsToTime, timeToSeconds } from "guebbit-javascript-library";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { defaultUserAvatar, formRules, timeFormatDate, timeFormatHours } from "@/resources/constants";
import apiControllerPageList from "@/resources/mixins/apiControllerPageList";
import Calendar from "@/components/play/Calendar.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCalendar, faClock, faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
library.add(faCalendar, faClock, faPlay, faCircleInfo);

import type {
    scheduleMap,
    userMap,
    stationMap
} from "@/interfaces";
import type {
    ResourceInput
} from '@fullcalendar/resource-common';

interface playFormMap {
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
        Calendar,
        FontAwesomeIcon
    },

    watch: {
        /**
         * When selectedItemIdentifier is successfully changed, update the form
         *
         * @param {string} id
         */
        selectedItemIdentifier(id :string){
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
             * @param {string} newSelectedItemIdentifier
             * @param {string} newDate
             * @param {string} newHourEnd
             * @param {string} newHourStart
             * @param {string} oldSelectedItemIdentifier
             * @param {string} oldDate
             * @param {string} oldHourEnd
             * @param {string} oldHourStart
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
                // after all checks: data of selectedItem changed, make offline changes (online after confirm)
                this.editCurrentEvent(newDate, newHourStart, newHourEnd);
            },
            deep: true
        }
    },

    data: () => {
        return {
            loadingName: 'schedule',
            form: {
                date: undefined,
                hourStart: undefined,
                hourEnd: undefined,
                rules: false
            } as playFormMap,
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
                    variant: 'contained'
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
            stations: ({ ecommerce: { stations } }: any) => Object.values(stations),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            scheduleTimeStep: ({ ecommerce: { scheduleTimeStep } }: any) => scheduleTimeStep,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            scheduleEditableTime: ({ ecommerce: { scheduleEditableTime } }: any) => scheduleEditableTime,
        }),
        ...mapGetters('ecommerce', [
            'scheduleDetailedList',
            'scheduleIsEditable',
            'schedulesUnsaved',
            'schedulesOffline',
            'schedulesOnHold',
            'totalStations',
            'getItem',
        ]),
        ...mapGetters('main', [
            'isOpen',
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
         * schedule data into user readable form
         *
         * @return {Object}
         */
        selectedItemReadable() :playFormMap {
            if(!this.selectedItem){
                return {};
            }
            let { start, end } = this.selectedItem as scheduleMap;
            return this.translateScheduleToReadable(start, end);
        },

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
            // no userId = it's the admin placeholder
            if(!userId){
                return {
                    id: 'none',
                    avatar: defaultUserAvatar,
                    username: ''
                }
            }
            // it's the current user
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
            // it's the selected user (if not found it will be empty by default)
            const { id, avatar = defaultUserAvatar, username, lastVisit, wallet } = this.getItem('users', userId);
            return {
                id,
                avatar,
                username,
                lastVisit,
                wallet
            };
        },

        scheduleNewAvailability() {
            return false;
        },

        /**
         * Readable duration
         *
         * @return {string}
         */
        scheduleDuration() :string {
            if(!this.selectedItem){
                return '';
            }
            const { hours, minutes } = secondsToTime((this.selectedItem as scheduleMap).end - (this.selectedItem as scheduleMap).start);
            return hours + " hour and " + minutes + " minutes";
        },

        /**
         * Readable duration
         *
         * @return {string}
         */
        formDuration() :string {
            if(!this.form.hourEnd || !this.form.hourStart){
                return '';
            }
            const { hours, minutes } = secondsToTime(timeToSeconds(this.form.hourEnd) - timeToSeconds(this.form.hourStart));
            return hours + " hour and " + minutes + " minutes";
        },

        businessHoursTranslated(){
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

        formRulesHoursOrder(){
            const start = this.form.hourStart !== '00:00' ? this.form.hourStart : '24:00';
            const end = this.form.hourEnd !== '00:00' ? this.form.hourEnd : '24:00';
            return timeToSeconds(end) > timeToSeconds(start) || 'Invalid hours'
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

        selectItem(id :string){
            if(!id || !this.scheduleIsEditable(id)){
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
            return hours + separator + (parseInt(minutes) > step ? step.toString() : '00');
            // const newMinutes = Math.round(parseInt(minutes) / step) * step;
            // return hours + separator + (newMinutes < 60 ? newMinutes.toString().padStart(2, '0') : '00');
        },

        /**
         * OFFLINE ONLY EDITS
         * Method called every time a successful but OFFLINE change is made
         * In case of errors: show disclaimer
         *
         * @param date
         * @param hourStart
         * @param hourEnd
         */
        editCurrentEvent(date :Date, hourStart :string, hourEnd :string){
            if(!this.selectedItemIdentifier){
                return;
            }
            this.editSchedule({
                id: this.selectedItemIdentifier,
                start: dayjs(date + ' ' + hourStart, timeFormatDate + ' ' + timeFormatHours).valueOf(),
                end: dayjs(date + ' ' + hourEnd, timeFormatDate + ' ' + timeFormatHours).valueOf(),
            });
        },

        /**
         * Method called to update unsaved edits, sending them online
         *
         * @param {Object} event
         */
        confirmOfflineCurrentEvent(event :scheduleMap){
            // should never happen
            if(!this.selectedItem || !this.formIsValid){
                return;
            }

            // check that doesn't exist the timeslot of the day
            if(!this.isOpen(new Date())){
                console.log("NEGOZIO CHIUSO A QUEST'ORA")
                // TODO toast OR TODO disclaimer & computed
                return;
            }

            console.log("CONFIRMEDDDDD")

            /*
            TODO sendSchedules id list
            TODO pagamento automatico se hai le ore nel wallet, altrimenti richiesta di pagamento postuma?
            */
        },

        /**
         *
         * @param {number | undefined} start
         * @param {number | undefined} end
         */
        translateScheduleToReadable(start ?:number, end ?:number) :playFormMap {
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
            return {
                date: dayjs(start).format(timeFormatDate),    //(end) MUST be the same
                hourStart: dayjs(start).format(timeFormatHours),
                hourEnd: dayjs(end).format(timeFormatHours)
            };
        },

        /**
         *
         * @param {number} start
         * @param {number} end
         */
        fillForm(start ?:number, end ?:number) :void {
            this.form = {
                ...this.translateScheduleToReadable(start, end),
                rules: false
            };
            // TODO VUETIFY BUG lazy-loading
            (this.$refs.form as any).validate();
        },

        /**
         *
         *
         * @param {string[]} idArray
         */
        scheduleLimitReached(start :Date, end :Date, idArray :string[]){
            console.error("MAX LIMIT REACHED", start, end, idArray)
        }
    },

    mounted(){
        this.fillForm();
    }
});
</script>

<style lang="scss">
@import "src/assets/scss/main/global";

#play-page {
    .event-form-details{
        .event-form-header {
            margin-bottom: 1.5em;
        }
        .event-form-title {
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
}
</style>
