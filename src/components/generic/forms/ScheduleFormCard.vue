<template>
    <v-defaults-provider :defaults="eventFormUIRules">
        <v-form>
            <v-card
                variant="outlined"
                class="schedule-form-card"
                :color="themeColors.secondary"
            >
				<!--
                <v-btn-toggle
                    :modelValue="fastMode"
					@update:modelValue="value => emit('update:fastMode', value)"

                    :color="themeColors.secondary"
                    class="card-top-action"
                    tile
                    group
                >
                    <v-btn :value="true">
                        Fast
                    </v-btn>

                    <v-btn :value="false">
                        Slow
                    </v-btn>
                </v-btn-toggle>
                -->

                <v-card-text class="pa-0">
                    <v-row>
						<v-col cols="12" v-show="!hideFormButtons">
							<div class="v-btn-group v-btn-group--density-default">
								<v-btn
									class="flex-grow-1 h-auto"
									@click="emit('button:click:backward-day')"
									:disabled="!allowPastSelection && dateIsToday"
								>
									<font-awesome-icon size="xl" :icon="['fas', 'chevron-left']" />
								</v-btn>
								<v-btn
									class="flex-grow-1 h-auto"
									:class="{
										'bg-secondary': dateIsToday
									}"
									@click="emit('button:click:now-day')"
								>
									{{ t('generic.today') }}
								</v-btn>
								<v-btn
									class="flex-grow-1 h-auto"
									@click="emit('button:click:forward-day')"
								>
									<font-awesome-icon size="xl" :icon="['fas', 'chevron-right']" />
								</v-btn>
							</div>
						</v-col>
						<!-- data selection -->
                        <v-col cols="12" v-show="!hideFormInputs">
                            <v-text-field
								:modelValue="formatInputTypeDate(modelValueC.date, 'YYYY-MM-DD', dateFormat)"
								@update:modelValue="value => modelValueC.date = formatInputTypeDate(value, dateFormat, 'YYYY-MM-DD')"
								type="date"
								:label="t('schedule-form.info.date')"
								:errors="errors.date ? errors.date : errors[''] ? errors[''] : false"
								:error-messages="errors.date ? t('schedule-form.errors.date-' + errors.date) : errors[''] ? t('schedule-form.errors.-' + errors['']) : ''"
								class="px-3"
                            />
							<!-- TODO purtroppo .test() mi restituisce key vuota, da fare ricerche -->
                        </v-col>
						<v-col v-show="!hideFormButtons" cols="12">
							<v-btn-toggle
								v-model="modelHelperC.timeframe"
								tile
								color="secondary"
								group
							>
								<v-btn
									v-for="timeday in ['morning', 'afternoon', 'evening']"
									:key="'timeday-' + timeday"
									:value="timeday"
								>
									{{ t('schedule-form.info.' + timeday) }}
								</v-btn>
							</v-btn-toggle>
						</v-col>
						<!-- hours selection -->
                        <v-col cols="6" v-show="!hideFormInputs">
                            <!-- TODO split in hours && minutes dove minuti è una SELECT 00 o 30? -->
                            <v-text-field
                                v-model="modelValueC.hourStart"
								@update:modelValue="value => modelValueC.hourStart = formatInputTypeTime(value)"
                                type="time"
                                :label="t('schedule-form.info.start')"
                                :step="timeStep"
								:errors="errors.hourStart ? errors.hourStart : false"
								:error-messages="errors.hourStart ? t('schedule-form.errors.hourStart-' + errors.hourStart) : ''"
								class="pl-3"
                            />
                        </v-col>
                        <v-col cols="6" v-show="!hideFormInputs">
                            <!-- TODO split in hours && minutes dove minuti è una SELECT 00 o 30? -->
                            <v-text-field
								v-model="modelValueC.hourEnd"
								@update:modelValue="value => modelValueC.hourEnd = formatInputTypeTime(value)"
                                type="time"
                                :label="t('schedule-form.info.end')"
                                :step="timeStep"
								:errors="errors.hourEnd ? errors.hourEnd : false"
								:error-messages="errors.hourEnd ? t('schedule-form.errors.hourEnd-' + errors.hourEnd) : ''"
								class="pr-3"
							/>
                        </v-col>
						<!-- time of the day selection -->
						<v-col v-show="!hideFormButtons" cols="12">
							<v-btn-toggle
								v-model="modelHelperC.duration"
								tile
								color="secondary"
								group
							>
								<v-btn
									v-for="hour in 3"
									:key="'hour-' + hour"
									:value="hour * 2 * timeStep"
									@click="modelHelperC.duration = hour * 2 * timeStep"
								>
									{{ hour }}
									<sub><small>h</small></sub>
								</v-btn>
								<v-btn
									:class="{
										'v-btn--selected bg-secondary': modelHelperC.duration >= 8 * timeStep
									}"
									@click="modelHelperC.duration = 8 * timeStep"
								>
									4+
									<sub><small>h</small></sub>
								</v-btn>
							</v-btn-toggle>
						</v-col>
                    </v-row>
                    <v-checkbox
						v-show="!hideTermsButton"
						v-model="modelValueC.terms"
                        class="text-secondary px-3"
						:errors="errors.terms ? errors.terms : false"
						:error-messages="errors.terms ? t('schedule-form.errors.terms-' + errors.terms) : ''"
                    >
                        <template #label>
                            <span v-html="t('play-page.select-event-form-terms')"></span>
                        </template>
                    </v-checkbox>
                </v-card-text>
                <v-btn
                    class="card-bottom-action vuetify-button-icon"
                    block
                    color="secondary"
                    size="large"
					:disabled="disabled"
                    @click="emit('button:click:confirm')"
                >
                    {{ t('generic.confirm') }}
                    <font-awesome-icon :icon="disabled ? ['fas', 'ban'] : ['fas', 'play']" />
                </v-btn>
            </v-card>
        </v-form>
    </v-defaults-provider>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, type PropType } from "vue";
import { useTheme } from "vuetify";
import { useI18n } from "vue-i18n";
import useTimeHelpers from "@/resources/composables/useTimeHelpers";

import type { scheduleFormMap, scheduleFormHelperMap } from "@/resources/composables/useFormScheduleStructure";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faBan, faPlay, faStop, faClock, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus, faBan, faPlay, faStop, faClock, faChevronRight, faChevronLeft);


const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t } = useI18n();

const emit = defineEmits([
	'button:click:confirm',
	'button:click:backward-day',
	'button:click:now-day',
	'button:click:forward-day',
	'update:modelValue',
	'update:modelHelper',
]);

const props = defineProps({
	modelValue: {
		type: Object as PropType<scheduleFormMap>,
		required: false
	},
	modelHelper: {
		type: Object as PropType<scheduleFormHelperMap>,
		required: false
	},
	disabled: {
		type: Boolean,
		default: () => false
	},
	errors: {
		type: Object as PropType<Record<string, string>>,
		default: () => {
			return {}
		}
	},
	/**
	 * UI
	 */
	hideTermsButton: {
		type: Boolean,
		default: () => false
	},
	hideFormButtons: {
		type: Boolean,
		default: () => false
	},
	hideFormInputs: {
		type: Boolean,
		default: () => false
	},
	allowPastSelection: {
		type: Boolean,
		default: () => false
	},
	dateFormat: {
		type: String,
		default: () => 'YYYY-MM-DD'
	},
	timeFormat: {
		type: String,
		default: () => 'HH:mm:ss'
	},
	timeStep: {
		type: Number,
		default: () => 1800000
	},
});

/**
 * Time helpers toolbox
 */
const {
	translateToDate,
	formatInputTypeDate,
	formatInputTypeTime
} = useTimeHelpers(props.dateFormat + ' ' + props.timeFormat);

/**
 *
 */
const modelValueC = computed({
	get: () => props.modelValue || {},
	set: (value) => emit('update:modelValue', value),
});

/**
 *
 */
const modelHelperC = computed({
	get: () => props.modelHelper || {},
	set: (value) => emit('update:modelHelper', value),
});

/**
 * UI
 */
// is selected date today?
const dateIsToday = computed(() =>
	new Date().setHours(0, 0, 0, 0) === (translateToDate(modelValueC.value?.date, props.dateFormat) || new Date()).setHours(0, 0, 0, 0)
)
// default-provider
const eventFormUIRules = {
	global: {
		// variant: 'outlined',
	},
	VCard: {
		// color: 'secondary',
	},
	VBtnToggle: {
		tile: true,
		color: "deep-purple accent-3",
		group: true
	},
	VBtn: {
		// variant: 'tonal'
	},
	VTextField: {
		color: 'secondary',
		variant: 'underlined',
		hideDetails: 'auto'
	},
	VCheckbox: {
		hideDetails: 'auto'
	}
};
</script>


<style lang="scss">
.schedule-form-card{
	.v-btn-group{
		width: 100%;
		.v-btn{
			flex-grow: 1;
		}
	}
	.v-btn-group,
	.v-btn-group .v-btn{
		border-radius: 0;
	}
    .card-bottom-action{
        &.v-btn{
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
    }
}
</style>