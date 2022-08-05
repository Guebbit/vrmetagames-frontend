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
            <h1 class="theme-page-subtitle text-center mt-5 mb-10">{{ t('play-page.calendar-title') }}</h1>
            <v-row>
                <v-col cols="12" lg="3" class="schedule-form-details">

					<!-- user details -->
                    <UserInfoCard
                        class="mb-4"
                        v-if="selectedRecord?.userId"
                        :id="selectedRecord?.userId"
                    />

					<!-- schedule details -->
                    <EventDetailsList
						class="mb-4"
						:id="selectedIdentifier"
						:admin="isAuthenticated && isAdmin"
						:dateFormat="uiFormatDate"
						:timeFormat="uiFormatTime"

						@button:click:confirm="formConfirm"
						@button:click:remove="showConfirmDeleteDialog = true"
						@button:click:unselect="selectedIdentifier = null"
					/>

					<!-- form -->
                    <ScheduleFormCard
						v-model="formValues"
						v-model:modelHelper="formHelper"
						:errors="formErrors"
						:disabled="!formIsValid"
						:dateFormat="uiFormatDate"
						:timeFormat="uiFormatTime"
						:timeStep="scheduleTimeStep / 1000"
						:hideTermsButton="isAdmin"
						:allowPastSelection="isAdmin"

						@button:confirm:click="formConfirm"
						@button:click:backward-day="formValueGo('back', 1, 'day')"
						@button:click:now-day="formValueGo('now')"
						@button:click:forward-day="formValueGo('forward', 1, 'day')"
                    />

					<!-- magic button to resolve problems automatically -->
					<v-btn
						v-show="formErrorsList.length > 0"
						class="vuetify-button-icon mt-2"
						block
						color="primary"
						size="x-large"
						@click="handleResolveFormErrors"
					>
						{{ t('play-page.button-magic-solution') }}
						<font-awesome-icon :icon="['fas', 'hat-wizard']" />
					</v-btn>
					<!-- error list -->
					<div v-show="formErrorsList.length > 0"
						class="form-errors"
					>
						<v-alert
							v-for="(error, index) in formErrorsList"
							:key="'error-' + index"
							type="error"
							class="my-2"
						>
							{{ t('schedule-form.errors.' + error) }}
						</v-alert>
					</div>
                </v-col>
                <v-col cols="12" lg="9">
                    <ScheduleCalendar
						:admin          = "isAuthenticated && isAdmin"
						@event:click    = "scheduleSelect"
						@event:create   = "scheduleAdd"
						@event:changed  = "scheduleEdit"
					/>
                </v-col>
            </v-row>

            <div v-show="scheduleListCart.length > 0"
                class="text-right my-10"
            >
                <v-btn
					class="vuetify-button-icon"
					block
                    color="secondary"
                    size="x-large"
                    :to="{
						name: 'Checkout'
					}"
                >
                    {{ t('play-page.schedules-confirm-all') }}
                    <font-awesome-icon :icon="['fas', 'play']" />
                </v-btn>
            </div>

            <div v-show="scheduleListCart.length > 0" class="schedule-list">
                <h1 class="theme-page-subtitle text-center mt-5 mb-10">Lista eventi in prenotazione</h1>

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
						<!-- TODO lista con scheduleListOffline e possibilità di resettare le modifiche effettuate -->
                        <EventCard
                            v-for="{ id } in scheduleListCart"
							class="cursor-pointer"
                            :key="'event-onhold-' + id"
                            :id="id"
                            :showConfirmButton="false"
							:dateFormat="uiFormatDate"
							:timeFormat="uiFormatTime"

							@click="scheduleSelect(id)"
                            @button:confirm="scheduleHandleConfirm(id)"
                            @button:cancel="showConfirmDeleteDialog = true"
                        />
                    </v-col>
                </v-row>

            </div>
        </v-container>

		<DialogDeleteItem
			v-model="showConfirmDeleteDialog"
			:id="selectedIdentifier"
			:dateFormat="uiFormatDate"
			:timeFormat="uiFormatTime"

			@button:click:confirm="scheduleRemove([selectedIdentifier]); selectedIdentifier = null; showConfirmDeleteDialog = false"
			@button:click:cancel="showConfirmDeleteDialog = false"
		/>
    </div>
	<Footer
		:primary="themeColors.primary"
		:secondary="themeColors.secondary"
	/>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, toRefs, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useTheme } from "vuetify";
import { useStore } from "@/store";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vuetifyColors from "vuetify/lib/util/colors";
import UserInfoCard from "@/components/basics/cards/UserInfoCard.vue";
import EventCard from "@/components/play/EventCard.vue";
import ScheduleFormCard from "@/components/generic/forms/ScheduleFormCard.vue";
import ScheduleCalendar from "@/components/play/ScheduleCalendar.vue";
import Footer from "@/components/generic/Footer.vue";

import useFormScheduleStructure from "@/resources/composables/useFormScheduleStructure";
import useItemDetails from "@/resources/composables/useItemDetails";
import useScheduleHelpers from "@/resources/composables/useScheduleHelpers";
import EventDetailsList from "@/components/play/EventDetailsList.vue";
import DialogDeleteItem from "@/components/play/DialogDeleteItem.vue";
import { uiFormatDate, uiFormatTime } from "@/resources/constants";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCalendar, faClock, faPlay, faCheck, faCircleInfo, faHatWizard } from "@fortawesome/free-solid-svg-icons";

import type {
	scheduleInputMap,
	scheduleMap,
} from "@/interfaces";



library.add(faCalendar, faClock, faPlay, faCheck, faCircleInfo, faHatWizard);

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t } = useI18n();
const { state, getters, commit, dispatch } = useStore();

const { scheduleRecords, scheduleTimeStep } = toRefs(state.ecommerce);

const props = defineProps({
	preloadSteps: {
		type: Number,
		required: false
	},
});

/**
 * Common item details utilities
 */
const {
	loading,
	isAuthenticated,
	isAdmin,
	selectedIdentifier,
	selectedRecord,
	selectTargetRecord
} = useItemDetails(
	scheduleRecords,
	() => {
		return Promise.all([
			dispatch('main/initApp'),
			dispatch('ecommerce/getSchedules')
		]);
	}
);

/**
 * Schedule managing toolbox
 */
const {
	formToTime,
	checkScheduleIsEditable,
	determineScheduleIsAllowed,
} = useScheduleHelpers(uiFormatDate, uiFormatTime);

/**
 * Schedule form toolbox
 */
const {
	formHelper,
	formValues,
	formErrors,
	formErrorsList: formErrorsListOriginal,
	formMeta,
	fillForm,
	formValueGo,
	resolveFormErrors
} = useFormScheduleStructure({
	admin: isAdmin,
	stepTime: scheduleTimeStep.value,
	stepSlot: props.preloadSteps || 2,
	dateFormat: uiFormatDate,
	timeFormat: uiFormatTime
});
// default data based on current time
onMounted(() => fillForm());



/**
 * Form is valid flag
 */
const formIsValid = computed(() => formMeta.value.valid && scheduleAvailability.value.length === 0);

/**
 * Form schedule is on a valid time?
 */
const scheduleAvailability = computed<string[]>(() => {
	const [ start, end ] = formToTime(formValues.value.date, formValues.value.hourStart, formValues.value.hourEnd);
	return determineScheduleIsAllowed(start, end);
});

/**
 * Select schedule
 * check if user has permissions to read/edit
 *
 * TODO quando seleziono uno schedule, centrare il giorno dove esso si trova o inizia)
 *
 * @param {string} id
 */
function scheduleSelect(id :string){
	if(checkScheduleIsEditable(id))
		return;
	// select item
	selectTargetRecord(id);
	// change form accordingly
	const { start, end } = selectedRecord.value as scheduleMap || {};
	fillForm(start, end);
}

/**
 * Form errors made list
 */
const formErrorsList = computed<string[]>(() => {
	const errorList :string[] = [];
	for(let i = scheduleAvailability.value.length; i--; )
		errorList.push('availability-' + scheduleAvailability.value[i])
	return [
		...errorList,
		...formErrorsListOriginal.value
	]
});



/**
 * Call "resolveFormErrors" and inform the user via toast
 */
const handleResolveFormErrors = () => {
	commit('main/addToast', {
		title: t('generic.info'),
		text: t('play-page.resolve-form-errors-called'),
		timeout: 7000
	});
	resolveFormErrors();
};


/**
 * Toggles
 */
const showConfirmDeleteDialog = ref(false);


/**
 * Check if an existent event was changed/edited
 *
 * A deep watcher can't see exactly what changed in the object.
 * The solution is to watch a shallow copied object
 */
watch(computed(() => { return {...formValues.value, scheduleId: selectedIdentifier.value } }), (newData, oldData) => {
	const { scheduleId :newScheduleId, date: newDate, hourEnd: newHourEnd, hourStart: newHourStart } = newData;
	const { scheduleId :oldScheduleId, date: oldDate, hourEnd: oldHourEnd, hourStart: oldHourStart } = oldData;
	// checks
	if(
		// if some data is invalid
		!newDate || !newHourStart || !newHourEnd ||
		// schedule not selected, nothing to edit
		!selectedIdentifier.value ||
		// if all undefined then it's the initialization
		!oldDate && !oldHourEnd && !oldHourStart ||
		// if the identifier changed, then it's a different event being loaded
		newScheduleId !== oldScheduleId ||
		// if all is the same, then it changed a non-consequential parameter
		newDate === oldDate && newHourEnd === oldHourEnd && newHourStart === oldHourStart
	)
		return;
	// translate form to timestamp of start date and end date
	const [ start, end ] = formToTime(newDate, newHourStart, newHourEnd);
	// Changes are valid, edit allowed
	dispatch('ecommerce/editSchedule', {
		id: newScheduleId,
		start,
		end
	});
}, { deep: true });






function formConfirm () {
	console.log("SSSSSSSSSSSUBMIT");

	if(!formIsValid.value){
		const formErrors = [];
		for(let i = formErrorsList.value.length; i--; )
			formErrors.push(t('schedule-form.errors.' + formErrorsList.value[i]));
		scheduleHandleErrors(formErrors);
		return;
	}

	// TODO  (ricorda che in play c'è la fast mode)
	/*
	if(selectedIdentifier){
		scheduleEdit()
	}else{
		scheduleAdd()
	}
	*/
}



/**
 * Handle schedule errors
 *
 * @param {string[]} errors
 */
function scheduleHandleErrors(errors :string[]){
	for(let i = errors.length; i--; )
		commit('main/addToast', {
			title: t('generic.error'),
			text: errors[i],
			timeout: 3000
		});
}

/**
 * Add Schedule (offline)
 *
 * @param {Object} schedule
 */
function scheduleAdd(schedule :scheduleInputMap){
	console.log("ADDDDDDD", schedule)
	return dispatch('ecommerce/addSchedule', schedule)
		.then(id => scheduleSelect(id))
		.catch(scheduleHandleErrors)
}

/**
 * Edit schedule (unsaved = true)
 *
 * @param {Object} schedule
 */
function scheduleEdit(schedule :scheduleInputMap){
	console.log("EDITTTTT", schedule)
	// WARNING fullcalendarHandleEventAllow checks already done
	return dispatch('ecommerce/editSchedule', schedule)
		.catch(scheduleHandleErrors)
}


/**
 * Confirm schedule and pay from wallet
 * if wallet empty: delay confirm and ask for payment (?)
 *
 * @param {string} id
 */
function scheduleConfirm(id :string){
	console.log("CCCCCCCCCCCCCONFIRM", id)
	// TODO confirm multiple?
}
function scheduleHandleConfirm(id :string){
	console.log("HANDLECCCCCCCCCCCCCONFIRM", id)
	// TODO confirm multiple?
}

/**
 * Confirm schedule and ask for payment
 *
 * @param {string} ids
 */
function scheduleRemove(ids :string[] = []){
	console.log("REMOVEEEE", ids)
	return dispatch('ecommerce/removeSchedules', ids)
		.catch(scheduleHandleErrors);
}


/**
 * UI
 */
const scheduleListCart = computed(() => getters['ecommerce/scheduleListCart']);

const statusListLegenda = [
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
