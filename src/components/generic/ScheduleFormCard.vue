<template>
    <v-defaults-provider :defaults="defaultsEventData">
        <v-form
            ref="formEl"
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
                    @click="formIsValid ? fastMode ? confirmSchedule : addSchedule : null"
                >
                    {{
                        !form.rules ? $t('play.schedule-button-rules') :
                            formScheduleAvailability.length > 0 ? $t('play.schedule-button-business-closed') :
                                !formIsValid ? $t('play.schedule-button-invalid') :
                                    scheduleId ? $t('play.schedule-button-edit') :
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
import useFormScheduleStructure from "@/resources/composables/useFormScheduleStructure";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faBan, faPlay } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus, faBan, faPlay);

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

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

    setup(props, { emit }){
        /*
        const {
            formIsValid,
            form,
            formEl,
            scheduleRecords,
            scheduleTimeStep,
            scheduleReadable,
            checkScheduleIsAllowed,
            translatedHourEnd,
            selectedSchedule,
            formItemSchedule,
            formScheduleAvailability,
            selectedFormDuration,
            addSchedule,
            confirmSchedule,
            editSchedule,
            removeSchedule,
            resetFormHours,
            fillForm,
            formatInputTypeDate,
            formatInputTypeTime,
            formRules,
            timeFormatDate,
            timeFormatHours
        } = useFormScheduleStructure(props, emit);
        const { scheduleId } = toRefs(props);
        */

        return useFormScheduleStructure(props, emit);
    },

    data: () => {
        return {
            fastMode: true,
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
            }
        }
    },
});
</script>

<style lang="scss">
.schedule-form-card{
    .card-top-action{
        width: 100%;
        display: flex;
        .v-btn{
            flex-grow: 1;
            &:not(.v-btn--selected){
                background: rgba(var(--v-theme-secondary), 0.1);
            }
        }
    }
}
</style>