<template>
    <v-defaults-provider :defaults="defaultsEventData">
        <v-form
            ref="form"
            v-model="formIsValid"
            lazy-validation
        >
            <v-card
                variant="outlined"
                class="schedule-form-card"
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
                            <!-- TODO VUETIFY FIX :rules="[formRules.required]" -->
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
                    @click="formIsValid ? $emit('schedule:add', formItemSchedule) : null"
                >
                    {{
                        !form.rules ? $t('play.schedule-button-rules') :
                            formScheduleAvailability.length > 0 ? $t('play.schedule-button-business-closed') :
                                !formIsValid ? $t('play.schedule-button-invalid') :
                                    selectedItemIdentifier ? $t('play.schedule-button-edit') :
                                        fastMode ? $t('play.schedule-button-play-now') :
                                            $t('play.schedule-button-new')
                    }}
                    <font-awesome-icon :icon="(!formIsValid || formScheduleAvailability.length > 0) ? ['fas', 'ban'] : fastMode ? ['fas', 'play'] : ['fas', 'plus']" />
                </v-btn>
            </v-card>
        </v-form>
    </v-defaults-provider>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapState } from "vuex";
import { timeToSeconds } from "guebbit-javascript-library";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import {
    formRules,
    timeFormatDate,
    timeFormatHours
} from "@/resources/constants";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faBan, faPlay } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus, faBan, faPlay);

import type {
    scheduleInputMap,
    formScheduleMap,
} from "@/interfaces";
import { scheduleMap } from "@/interfaces";

export default defineComponent({
    name: "ScheduleFormCard",

    components: {
        FontAwesomeIcon
    },

    props: {
        scheduleId: {
            type: String,
            required: false
        }
    },

    watch: {
        /**
         * Check if an existent event was changed
         */
        watcherHelperForm: {
            handler({ date: newDate, hourEnd: newHourEnd, hourStart: newHourStart }, { date: oldDate, hourEnd: oldHourEnd, hourStart: oldHourStart }){
            // handler({ scheduleId: newSelectedItemIdentifier, date: newDate, hourEnd: newHourEnd, hourStart: newHourStart }, { scheduleId: oldSelectedItemIdentifier, date: oldDate, hourEnd: oldHourEnd, hourStart: oldHourStart }){
                console.log("11111111111")

                // schedule not selected, nothing to edit
                if(!this.scheduleId){
                    return;
                }

                // if all undefined then it's the initialization
                if(!oldDate && !oldHourEnd && !oldHourStart){
                    return;
                }

                /*
                // if all undefined then it's the initialization
                if(!oldSelectedItemIdentifier || (!oldDate && !oldHourEnd && !oldHourStart)){
                    return;
                }

                console.log("22222222222", oldSelectedItemIdentifier, newSelectedItemIdentifier)
                // if the identifier changed, then it's a different event being loaded
                if(oldSelectedItemIdentifier !== newSelectedItemIdentifier){
                    return;
                }
                */

                console.log("333333333", newDate === oldDate, newHourEnd === oldHourEnd, newHourStart === oldHourStart)

                // if all is the same, then it changed a non-consequential parameter
                if(newDate === oldDate && newHourEnd === oldHourEnd && newHourStart === oldHourStart){
                    return;
                }

                // TODO FIX
                /*
                // if nothing changed on the selectedSchedule, then it changed a non-consequential parameter or it's
                const { date: scheduleDate, hourEnd: scheduleHourEnd, hourStart: scheduleHourStart } = this.selectedSchedule || {};
                console.log("444444444444", newDate === scheduleDate, newHourEnd === scheduleHourEnd, newHourStart === scheduleHourStart)
                */


                // after all checks: EDIT CURRENT EVENT (offline changes, online after confirm)
                this.$emit('schedule:edit', {
                    ...this.formItemSchedule,
                    id: this.scheduleId
                });
            },
            deep: true
        },

        /**
         *
         */
        'form.hourStart'(){
            this.resetFormHours();
        },
        'form.hourEnd'(){
            this.resetFormHours(true);
        },

        /**
         * When selectedItemIdentifier is successfully changed,
         * update form with info of new selectedItem
         */
        scheduleId(){
            const { start, end } = this.selectedSchedule || {};
            this.fillForm(start, end);
        },
    },

    data: () => {
        return {
            fastMode: true,
            formIsValidTest: true,
            formIsValid: true,
            form: {
                date: undefined,
                hourStart: undefined,
                hourEnd: undefined,
                rules: false
            } as formScheduleMap,
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
            formRules
        }
    },

    computed: {
        ...mapState({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            scheduleTimeStep: ({ ecommerce: { scheduleTimeStep } }: any) => scheduleTimeStep,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            scheduleRecords: ({ ecommerce: { scheduleRecords } }: any) => scheduleRecords,
        }),
        ...mapGetters('ecommerce', [
            'checkScheduleIsAllowed',
            'scheduleReadable'
        ]),

        /**
         * A deep watcher can't see exactly what changed in the object.
         * The solution is to watch a shallow copied object
         */
        watcherHelperForm() {
            return { ...this.form };
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

        selectedSchedule() :scheduleMap | undefined {
            if(!this.scheduleId || !Object.prototype.hasOwnProperty.call(this.scheduleRecords, this.scheduleId)){
                 return undefined;
            }
            return this.scheduleRecords[this.scheduleId]
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
        selectedFormDuration() :string {
            if(!this.formItemSchedule){
                return '';
            }
            const { start, end } = this.formItemSchedule;
            const { durationData: { mode, hours, minutes } } = this.scheduleReadable(start, end);
            return this.$t('play.schedule-details-time-count.' + mode, {
                hours,
                minutes
            });
        },
    },

    methods: {

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

            // to make visible errors and warnings
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (this.$refs.form as any).validate();
            // this.formIsValid = rules && this.formScheduleAvailability.length === 0;
        },
    },

    mounted(){
        this.fillForm();
    }
});
</script>

<style lang="scss">
.schedule-form-card{
    .card-top-action{
        width: 100%;
        display: flex;
        & > button{
            flex-grow: 1;
        }
    }
}

</style>