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
									@click="emit('click:button:backward-day')"
									:disabled="!allowPastSelection && formValuesIsToday"
								>
									<font-awesome-icon size="xl" :icon="['fas', 'chevron-left']" />
								</v-btn>
								<v-btn
									class="flex-grow-1 h-auto"
									:class="{
										'bg-secondary': formValuesIsToday
									}"
									@click="emit('click:button:now-day')"
								>
									{{ t('generic.today') }}
								</v-btn>
								<v-btn
									class="flex-grow-1 h-auto"
									@click="emit('click:button:forward-day')"
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
									v-for="timeframe in timeframeList"
									:key="'timeframe-' + timeframe"
									:value="timeframe"
									:class="{
										'v-btn--active bg-secondary': formValuesTimeframe === timeframe
									}"
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
									:class="{
										'v-btn--active bg-secondary': formValuesDuration === hour * timeStep * durationStep
									}"
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
						<v-col cols="12" class="d-flex justify-center align-center">
							<v-row
								align="center"
								justify="space-around"
							>
								<v-col cols="12" md="6" lg="5" xl="4">
									<vuetifyInputNumber
										v-model="modelValueC.numPeople"
										:label="t('play-page.form-number-people')"
										:error="errors.numPeople ? errors.numPeople : false"
										:error-messages="errors.numPeople ? t('schedule-form.errors.hourEnd-' + errors.numPeople) : ''"
										min="1"
										hide-details
									>
										<template v-slot:prepend>
											<font-awesome-icon class="v-icon v-icon--size-default v-icon--start" :icon="['fas', 'users']" />
										</template>
									</vuetifyInputNumber>
								</v-col>
								<v-col cols="12" md="6" lg="5" xl="4">
									<vuetifyInputNumber
										v-model="modelValueC.numStations"
										:label="t('play-page.form-number-stations')"
										:error="errors.numStations ? errors.numStations : false"
										:error-messages="errors.numStations ? t('schedule-form.errors.hourEnd-' + errors.numStations) : ''"
										min="1"
										hide-details
									>
										<template v-slot:prepend>
											<font-awesome-icon class="v-icon v-icon--size-default v-icon--start" :icon="['fas', 'couch']" />
										</template>
									</vuetifyInputNumber>
								</v-col>
							</v-row>
						</v-col>
						<v-col cols="12">
							<v-select
								v-model="modelValueC.selectedStation"
								v-model:menu="showSelectStation"
								:items="stations"
								item-title="name"
								item-value="id"
								:label="t('generic.stations')"
								:error="errors.selectedStation ? errors.selectedStation : false"
								:error-messages="errors.selectedStation ? t('schedule-form.errors.hourEnd-' + errors.selectedStation) : ''"
								hide-details
								variant="solo"
							>
								<template v-slot:item="{ item }">
									<v-list-item
										:value="item.value"
										active-color="primary"
										@click="modelValueC.selectedStation = item.value; showSelectStation = false"
									>
										{{ item.title }}
										<template v-slot:prepend>
											<!--
											<font-awesome-icon class="v-icon v-icon--size-default v-icon--start" :icon="['fas', item.raw.icon]" />
											-->
											<component
												:is="item.raw.icon"
												class="v-icon v-icon--size-default v-icon--start"
												style="fill: white"
											/>
										</template>
									</v-list-item>
								</template>
								<template v-slot:prepend-inner>
									<component
										:is="selectedStationIcon"
										class="v-icon v-icon--size-default v-icon--start"
										style="fill: white"
									/>
								</template>
							</v-select>
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
import { defineProps, defineEmits, computed, ref, type PropType } from "vue";
import { useTheme } from "vuetify";
import { useI18n } from "vue-i18n";
import useTimeHelpers from "@/resources/composables/useTimeHelpers";
import useScheduleHelpers from "@/resources/composables/useScheduleHelpers";
import VuetifyInputNumber from "@/components/basics/atoms/vuetifyInputNumber.vue";
import type { scheduleFormMap } from "@/resources/composables/useFormDataSchedule";
import type { stationMap } from "@/interfaces";

import { timeframeList } from "@/resources/constants";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faBan, faPlay, faStop, faClock, faChevronRight, faChevronLeft, faUsers, faGamepad, faCouch } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus, faBan, faPlay, faStop, faClock, faChevronRight, faChevronLeft, faUsers, faGamepad, faCouch);

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t } = useI18n();

const emit = defineEmits([
	'submit',
	'message:emit',
	'click:button:backward-day',
	'click:button:now-day',
	'click:button:forward-day',
	'update:modelValue',
]);

const props = defineProps({
	modelValue: {
		type: Object as PropType<scheduleFormMap>,
		required: false
	},
	stations: {
		type: Object as PropType<stationMap[]>,
		default: () => {
			return []
		}
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
 *	Mirror of formValues on page
 */
const modelValueC = computed({
	get: () => props.modelValue || {},
	set: (value) => emit('update:modelValue', value),
});

/**
 * Time helpers toolbox
 */
const {
	translateStringToDate,
	formatInputTypeDate,
	formatInputTypeTime,
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
 * Show select menu
 */
const showSelectStation = ref(false);

/**
 * Selected station record
 */
const selectedStationIcon = computed(() => props.stations.find(({ id }) => id === modelValueC.value.selectedStation)?.icon);

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
const setNewTimeframe = (timeframe :string) => {
	if(!modelValueC.value.date || !modelValueC.value.hourEnd)
		return;
	const [ start, end ] = formToTime(modelValueC.value.date, modelValueC.value.hourStart, modelValueC.value.hourEnd)
	const [ newStart, newEnd ] = setTimeframe(timeframe, start, end);
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