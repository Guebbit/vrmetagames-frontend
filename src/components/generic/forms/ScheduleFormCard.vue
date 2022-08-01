<!--
EASY FORM

data: < oggi >
durata: 1,2,3+ ore
fascia oraria: mattina, primo pomeriggio, tardo pomeriggio, sera
-->

<template>
    <v-defaults-provider :defaults="eventFormUIRules">
        <v-form
            ref="formEl"
            v-model="formIsValid"
            lazy-validation
        >
            <v-card
                variant="outlined"
                class="schedule-form-card"
                :color="themeColors.secondary"
            >
                <v-btn-toggle
                    v-show="showSpeedModeTab"
                    v-model="fastMode"
                    :color="themeColors.secondary"
                    class="card-top-action"
                    tile
                    group
                >
                    <v-btn :value="true">
                        {{ $t('play-page.schedule-form-mode-fast') }}
                    </v-btn>

                    <v-btn :value="false">
                        {{ $t('play-page.schedule-form-mode-slow') }}
                    </v-btn>
                </v-btn-toggle>

                <v-card-text>
                    <v-row>
                        <!-- TODO aggiungere orari\giorni limite alle rules? -->
                        <v-col cols="12">
                            <v-text-field
                                :value="formatInputTypeDate(form.date, 'YYYY-MM-DD', timeFormatDate)"
                                @input="({target:{value}}) => form.date = formatInputTypeDate(value, timeFormatDate, 'YYYY-MM-DD')"
                                type="date"
                                hide-details="auto"
                            />
                        </v-col>
                        <v-col cols="6">
                            <!-- TODO split in hours && minutes dove minuti è una SELECT 00 o 30? -->
                            <v-text-field
                                v-model="form.hourStart"
                                @input="({target:{value}}) => form.hourStart = formatInputTypeTime(value)"
                                type="time"
                                label="Start"
                                :step="scheduleTimeStep / 1000"
                                hide-details="auto"
                            />
                        </v-col>
                        <v-col cols="6">
                            <!-- TODO split in hours && minutes dove minuti è una SELECT 00 o 30? -->
                            <v-text-field
                                v-model="form.hourEnd"
                                @input="({target:{value}}) => form.hourEnd = formatInputTypeTime(value)"
                                type="time"
                                label="End"
                                :step="scheduleTimeStep / 1000"
                                hide-details="auto"
                            />
                        </v-col>
                        <v-col cols="12" class="d-flex justify-space-between">
                            <v-chip
                                v-show="selectedFormDuration"
                                class="ma-2 w-100"
                                color="white"
                            >
                                <font-awesome-icon class="mr-2" :icon="['fas', 'clock']" />
                                {{ selectedFormDuration }}
                            </v-chip>
                            <v-chip
                                class="ma-2 w-100"
                                :color="formScheduleAvailability.length > 0 ? 'danger' : 'success'"
                            >
                                <font-awesome-icon class="mr-2" :icon="formScheduleAvailability.length > 0 ? ['fas', 'stop'] : ['fas', 'play']" />
                                {{ formScheduleAvailability.length > 0 ? $t('play-page.schedule-form-' + formScheduleAvailability[0]) : $t('play-page.schedule-form-available') }}
                            </v-chip>
                        </v-col>
                    </v-row>
                    <v-checkbox
                        v-model="form.rules"
                        class="text-secondary"
                        hide-details="auto"
                    >
                        <template #label>
                            <span v-html="$t('play-page.select-event-form-rules')"></span>
                        </template>
                    </v-checkbox>
                </v-card-text>
                <v-btn
                    class="card-bottom-action vuetify-icon-button"
                    block
                    color="secondary"
                    size="large"
                    @click="emit('button:confirm')"
                >
                    {{
                        !form.rules ? $t('play-page.schedule-form-button-rules') :
                            formScheduleAvailability.includes('max-reached') ? $t('play-page.schedule-form-button-business-full') :
                                formScheduleAvailability.includes('closed') ? $t('play-page.schedule-form-button-business-closed') :
                                    formScheduleAvailability.length > 0 ? $t('play-page.schedule-form-button-business-unavailable') :
                                        !formIsValid ? $t('play-page.schedule-form-button-invalid') :
                                            scheduleId ? $t('play-page.schedule-form-button-edit') :
                                                fastMode ? $t('play-page.schedule-form-button-play-now') :
                                                    $t('play-page.schedule-form-button-new')
                    }}
                    <font-awesome-icon :icon="(!formIsValid || formScheduleAvailability.length > 0) ? ['fas', 'ban'] : fastMode ? ['fas', 'play'] : ['fas', 'plus']" />
                </v-btn>
            </v-card>
        </v-form>
    </v-defaults-provider>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { useTheme } from "vuetify";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import useFormScheduleStructure from "@/resources/composables/useFormScheduleStructure";


import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faBan, faPlay, faStop, faClock } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus, faBan, faPlay, faStop, faClock);
dayjs.extend(customParseFormat);

const emit = defineEmits([
	'button:confirm',
]);

const props = defineProps({
	scheduleId: {
		type: String,
		required: false
	},
	showSpeedModeTab: {
		type: Boolean,
		default: () => {
			return true;
		}
	},
	defaultFastMode: {
		type: Boolean,
		default: () => {
			return true;
		}
	},
	defaultFormTimeStep: {
		type: Number,
		default: () => {
			return 1
		}
	},
})


const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const {
	formIsValid,
	form,
	scheduleTimeStep,
	formScheduleAvailability,
	selectedFormDuration,
	formatInputTypeDate,
	formatInputTypeTime,
	timeFormatDate,
} = useFormScheduleStructure(props);

/**
 *
 */
const eventFormUIRules = {
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
};
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
        &.v-btn-group{
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }
    }
    .card-bottom-action{
        &.v-btn{
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
    }
}
</style>