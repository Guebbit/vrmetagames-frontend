<template>
    <v-defaults-provider :defaults="eventFormUIRules">
        <v-form
			class="schedule-form"
			@submit.prevent="emit('submit')"
		>
            <v-card
                variant="outlined"
                class="schedule-form-card"
                :color="themeColors.secondary"
            >
                <v-card-text class="pa-0">
                    <v-row>
						<v-col cols="12" v-show="!hideFormButtons">
							<div class="v-btn-group v-btn-group--density-default">
								<v-btn
									class="flex-grow-1 h-auto"
									@click="emit('button:click:backward-day')"
									:disabled="!allowPastSelection && formValuesIsToday"
								>
									<font-awesome-icon size="xl" :icon="['fas', 'chevron-left']" />
								</v-btn>
								<v-btn
									class="flex-grow-1 h-auto"
									:class="{
										'bg-secondary': formValuesIsToday
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
								:label="t('generic.date')"
								:error="errors.date ? errors.date : errors[''] ? errors[''] : false"
								:error-messages="errors.date ? t('schedule-form.errors.date-' + errors.date) : errors[''] ? t('schedule-form.errors.-' + errors['']) : ''"
								class="px-3"
							/>
						</v-col>
						<v-col cols="12" v-show="!hideFormButtons">
							<v-btn-toggle
								:modelValue="formValuesTimeframe"
								tile
								color="secondary"
								group
							>
								<v-btn
									v-for="timeframe in ['morning', 'afternoon', 'evening']"
									:key="'timeframe-' + timeframe"
									:value="timeframe"
									@click="setNewTimeframe(timeframe)"
								>
									{{ t('generic.' + timeframe) }}
								</v-btn>
							</v-btn-toggle>
						</v-col>

						<!-- hours selection -->
                        <v-col cols="6" v-show="!hideFormInputs">
                            <v-text-field
                                v-model="modelValueC.hourStart"
								@update:modelValue="value => modelValueC.hourStart = formatInputTypeTime(value)"
                                type="time"
                                :label="t('generic.start')"
                                :step="timeStep / 1000"
								:error="errors.hourStart ? errors.hourStart : false"
								:error-messages="errors.hourStart ? t('schedule-form.errors.hourStart-' + errors.hourStart) : ''"
								class="pl-3"
                            />
                        </v-col>
                        <v-col cols="6" v-show="!hideFormInputs">
                            <v-text-field
								v-model="modelValueC.hourEnd"
								@update:modelValue="value => modelValueC.hourEnd = formatInputTypeTime(value)"
                                type="time"
                                :label="t('generic.end')"
                                :step="timeStep / 1000"
								:error="errors.hourEnd ? errors.hourEnd : false"
								:error-messages="errors.hourEnd ? t('schedule-form.errors.hourEnd-' + errors.hourEnd) : ''"
								class="pr-3"
							/>
                        </v-col>
						<!-- time of the day selection -->
						<v-col cols="12" v-show="!hideFormButtons">
							<v-btn-toggle
								:modelValue="formValuesDuration"
								tile
								color="secondary"
								group
							>
								<v-btn
									v-for="hour in 3"
									:key="'hour-' + hour"
									:value="hour * timeStep * durationStep"
									@click="setDuration(hour * timeStep * durationStep)"
								>
									{{ hour }}
									<sub><small>h</small></sub>
								</v-btn>
								<v-btn
									:class="{
										'v-btn--selected bg-secondary': formValuesDuration >= timeStep * durationStep * 4
									}"
									@click="setDuration(timeStep * durationStep * 4)"
								>
									4+
									<sub><small>h</small></sub>
								</v-btn>
							</v-btn-toggle>
						</v-col>
						<v-col cols="12" v-show="!hideTermsButton">
							<v-checkbox
								v-model="modelValueC.terms"
								class="text-secondary px-3"
								:error="errors.terms ? errors.terms : false"
								:error-messages="errors.terms ? t('schedule-form.errors.terms-' + errors.terms) : ''"
							>
								<template #label>
									<span v-html="t('play-page.select-event-form-terms')"></span>
								</template>
							</v-checkbox>
						</v-col>
                    </v-row>
                </v-card-text>
				<v-btn
                    class="card-bottom-action vuetify-button-icon"
					type="submit"
                    block
                    color="secondary"
                    size="large"
					:disabled="disabled"
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
import useScheduleHelpers from "@/resources/composables/useScheduleHelpers";
import type { scheduleFormMap } from "@/resources/composables/useFormDataSchedule";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faBan, faPlay, faStop, faClock, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus, faBan, faPlay, faStop, faClock, faChevronRight, faChevronLeft);

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t } = useI18n();

const emit = defineEmits([
	'submit',
	'message:emit',
	'button:click:backward-day',
	'button:click:now-day',
	'button:click:forward-day',
	'update:modelValue',
]);

const props = defineProps({
	modelValue: {
		type: Object as PropType<scheduleFormMap>,
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
	durationStep: {
		type: Number,
		default: () => 1
	},
});

/**
 * Time helpers toolbox
 */
const {
	translateStringToDate,
	formatInputTypeDate,
} = useTimeHelpers(props.dateFormat + ' ' + props.timeFormat);


/**
 * Schedule managing toolbox
 */
const {
	timeToForm,
	formToTime,
	setTimeframe,
	getTimeframe,
	getScheduleTimes
} = useScheduleHelpers(props.dateFormat, props.timeFormat);

/**
 *	Mirror of formValues on page
 */
const modelValueC = computed({
	get: () => props.modelValue || {},
	set: (value) => emit('update:modelValue', value),
});

/**
 * UI
 */
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

/**
 * TODO Tutti i prossimi si trovano al momento dentro useFormDataSchedule
 */
/**
 * [SHORTCUTS]
 */
const formStartEndTimestamps = computed<[number, number]>(() => formToTime(modelValueC.value.date, modelValueC.value.hourStart, modelValueC.value.hourEnd))
const formValuesDuration = computed(() => formStartEndTimestamps.value[1] - formStartEndTimestamps.value[0]);
const formValuesTimeframe = computed(() => getTimeframe(formStartEndTimestamps.value[0]));
const setDuration = (time :number) => {
	const [ newStart, newEnd ] = getScheduleTimes(formStartEndTimestamps.value[0], time);
	modelValueC.value = {
		...modelValueC.value,
		...timeToForm(newStart, newEnd)
	};
};
const formValuesIsToday = computed(() =>
	new Date().setHours(0, 0, 0, 0) === (translateStringToDate(modelValueC.value?.date, props.dateFormat) || new Date()).setHours(0, 0, 0, 0)
)
const testChangeDay = true;
const setNewTimeframe = (timeframe :string) => {
	if(!modelValueC.value.date || !modelValueC.value.hourEnd)
		return;
	const [ start, end ] = formToTime(modelValueC.value.date, modelValueC.value.hourStart, modelValueC.value.hourEnd)
	const [ newStart, newEnd ] = setTimeframe(timeframe, start, end, testChangeDay);
	const newForm = timeToForm(newStart, newEnd);
	if(newForm.date !== modelValueC.value.date)
		emit('message:emit', t('play-page.resolve-form-errors-called'))
	modelValueC.value = {
		...modelValueC.value,
		...newForm
	};
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