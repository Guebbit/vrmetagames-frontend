<template>
    <div id="play-page" class="theme-page">

		<v-row no-gutters="">
			<v-col cols="12" md="12" lg="4">
				<Panel class="theme-panel"
					:shadow="themeColors['primary-darken-5']"
					:shadow-opacity="0.95"
					centered
					strict
					hero
				>
					<template #default>
						<div v-show="isAuthenticated" class="pa-10">
							<p>
								Seleziona facilmente il momento in cui vuoi prenotare una visita(?)
								<br />
								Verifica che le date siano corrette e conferma!
								<br />
								Puoi pagare subito o alla cassa
							</p>
							<div class="text-center my-12">
								<BusinessContactsPanel light />
							</div>
						</div>
						<div v-show="!isAuthenticated" class="pa-10">
							<p class="text-h5">
								{{ t('authentication-page.signin-explanation') }}
							</p>
							<div class="text-center my-12">
								<BusinessContactsPanel light />
							</div>
							<div class="d-flex justify-space-between align-center">
								<p class="text-h5">
									{{ t('authentication-page.signin-request') }}
								</p>
								<v-btn
									color="secondary"
									:to="{
										name: 'Login'
									}"
								>
									{{ t('authentication-form.switch-to-signin') }}
								</v-btn>
							</div>
						</div>
					</template>
					<template #background>
						<v-img
							cover
							class="panel-background"
							:src="imagesUrl + 'logo/logotype.svg'"
						>
							<template #placeholder>
								<v-row
									class="fill-height ma-0"
									align="center"
									justify="center"
								>
									<v-progress-circular
										indeterminate
										color="grey lighten-5"
									></v-progress-circular>
								</v-row>
							</template>
						</v-img>
					</template>
				</Panel>
			</v-col>
			<v-col cols="12" md="12" lg="8">
				<Panel class="theme-panel"
					shadow="#000000"
					:shadow-opacity="0.7"
					centered
					strict
					hero
				>
					<template #default>
						<v-container class="text-center">
							<v-form
								class="schedule-form"
								@submit.prevent="formSubmit"
							>
								<h4>In che giorno vorresti venire?</h4>
								<div class="v-btn-group v-btn-group--density-default">
									<v-btn
										class="flex-grow-1 h-auto"
										@click="formValueGo('back', 1, 'day')"
										:disabled="formValuesIsToday"
									>
										<font-awesome-icon size="xl" :icon="['fas', 'chevron-left']" />
										<span class="hidden-md-and-down ml-3">Giorno prima</span>
									</v-btn>
									<v-btn
										class="flex-grow-1 h-auto"
										:class="{
											'bg-secondary': formValuesIsToday
										}"
										@click="formValueGo('now')"
									>
										{{ formValuesIsToday ? t('generic.today') : 'Torna ad oggi' }}
									</v-btn>
									<v-btn
										class="flex-grow-1 h-auto"
										@click="formValueGo('forward', 1, 'day')"
									>
										<span class="hidden-md-and-down mr-3">Giorno dopo</span>
										<font-awesome-icon size="xl" :icon="['fas', 'chevron-right']" />
									</v-btn>
								</div>

								<br><br><h4>Quale parte della giornata preferisci?</h4>

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

								<br><br><h4>Quante ore vorresti rimanere?</h4>

								<v-btn-toggle
									:modelValue="formValuesDuration"
									tile
									color="secondary"
									group
								>
									<v-btn
										v-for="hour in 3"
										:key="'hour-' + hour"
										:value="hour * scheduleTimeStep * temporaryNameUIDefaultStepJump"
										:class="{
											'v-btn--active bg-secondary': formValuesDuration === hour * scheduleTimeStep * temporaryNameUIDefaultStepJump
										}"
										@click="setDuration(hour * scheduleTimeStep * temporaryNameUIDefaultStepJump)"
									>
										{{ hour }}
										<sub><small>h</small></sub>
									</v-btn>
									<v-btn
										:class="{
										'v-btn--selected bg-secondary': formValuesDuration >= scheduleTimeStep * 4 * temporaryNameUIDefaultStepJump
									}"
										@click="setDuration(scheduleTimeStep * 4 * temporaryNameUIDefaultStepJump)"
									>
										4+
										<sub><small>h</small></sub>
									</v-btn>
								</v-btn-toggle>

								<br><br>
								<h3>Controlla che gli orari siano di tuo gradimento</h3>
								<!-- Metterlo in frase, es: "Confermi martedì XYZ dalle 16 alle 17? -->
								<br>

								<v-row>
									<v-col cols="12" md="12" lg="4">
										<v-text-field
											:modelValue="formatInputTypeDate(formValues.date, 'YYYY-MM-DD', uiFormatDate)"
											@update:modelValue="value => formValues.date = formatInputTypeDate(value, uiFormatDate, 'YYYY-MM-DD')"
											type="date"
											:label="t('generic.date')"
											:error="formErrors.date ? formErrors.date : formErrors[''] ? formErrors[''] : false"
											hide-details
										/>
									</v-col>
									<v-col cols="12" md="6" lg="4">
										<v-text-field
											v-model="formValues.hourStart"
											@update:modelValue="value => formValues.hourStart = formatInputTypeTime(value)"
											type="time"
											:label="t('generic.start')"
											:step="scheduleTimeStep / 1000"
											:error="formErrors.hourStart ? formErrors.hourStart : false"
											hide-details
										/>
									</v-col>
									<v-col cols="12" md="6" lg="4">
										<v-text-field
											v-model="formValues.hourEnd"
											@update:modelValue="value => formValues.hourEnd = formatInputTypeTime(value)"
											type="time"
											:label="t('generic.end')"
											:step="scheduleTimeStep / 1000"
											:error="formErrors.hourEnd ? formErrors.hourEnd : false"
											hide-details
										/>
									</v-col>
									<v-col cols="12" md="6">
										<v-checkbox
											v-show="!hideTermsButton"
											v-model="formValues.terms"
											class="text-secondary px-3"
											:error="formErrors.terms ? formErrors.terms : false"
											hide-details
										>
											<template #label>
												<span v-html="t('play-page.select-event-form-terms')"></span>
											</template>
										</v-checkbox>
									</v-col>
									<v-col cols="12" md="6">
										<v-btn
											v-show="formErrorsList.length > 0"
											class="vuetify-button-icon mt-2"
											block
											color="primary"
											size="x-large"
											@click="handleResolveFormErrors"
										>
											<small>{{ t('play-page.button-magic-solution') }}</small>
											<font-awesome-icon :icon="['fas', 'hat-wizard']" />
										</v-btn>
									</v-col>
								</v-row>

								<div class="d-flex justify-end align-items-center flex-gap-24 mt-10 flex-wrap">
									<v-btn
										class="vuetify-button-icon"
										type="submit"
										color="secondary"
										size="x-large"
										:disabled="!formIsValid"
									>
										{{ t('generic.confirm') }}
										<font-awesome-icon :icon="!formIsValid ? ['fas', 'ban'] : ['fas', 'play']" />
									</v-btn>
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
										<font-awesome-icon class="ml-3" :icon="['fas', 'gears']" />
									</v-btn>
								</div>

								<!-- magic button to resolve problems automatically -->
								<!-- error list -->
								<div v-show="formErrorsList.length > 0"
									class="form-errors"
								>
									<v-alert
										v-for="(error, index) in formErrorsList"
										:key="'error-' + index"
										type="error"
										variant="tonal"
										class="my-2"
									>
										{{ t('schedule-form.errors.' + error) }}
									</v-alert>
								</div>

								<!-- TODO wallet + clock icon + money-bill -->
								<p class="simple-icon-text">
									<font-awesome-icon size="2x" class="text-secondary" :icon="['fas', 'wallet']" />
									<span class="text-h5">{{ userInfoWalletDuration }} <small>({{ userInfoWalletRemainingDuration }} rimanenti dopo il pagamento)</small></span>
								</p>
								<p class="simple-icon-text">
									<font-awesome-icon size="2x" class="text-secondary" :icon="['fas', 'clock']" />
									<span class="text-h5">{{ scheduleCartDuration }} </span>
								</p>
								<p class="simple-icon-text">
									<font-awesome-icon size="2x" class="text-secondary" :icon="['fas', 'money-bill']" />
									<span class="text-h5">{{ scheduleCartFinalCost }} € <small><s>{{ scheduleCartTotalCost }} €</s></small></span>
								</p>
							</v-form>
						</v-container>
					</template>
					<template #background>
						<video class="panel-background" async="" autoplay="" loop="" muted="" poster="">
							<source src="https://mangabeats.it/public/video/videogames/mix.mp4" type="video/mp4">
						</video>
					</template>
				</Panel>
			</v-col>
		</v-row>
    </div>

	<DialogConfirmItem
		v-model="showConfirmDialog"

		@click:button:confirm="scheduleConfirm(); showConfirmDialog = false;"
		@click:button:cancel="showConfirmDialog = false"
	/>

	<Footer
		:primary="themeColors.primary"
		:secondary="themeColors.secondary"
	/>
</template>

<script setup lang="ts">
/*
<h1>all'entrata di Play, CHECK e se l'evento selezionato non è più disponibile, mandare messaggio</h1>
<h1>
	Fast mode = togliere "conferma tutti gli eventi", "inserisci evento", modifica evento, etc"
	Compra direttamente, apri una modale con già la richiesta di pagamento (bottone per andare al "play avanzato" o al checkout)

	No insert/edit/events. Confirm event directly with the inserted data
	No checkout: direct modal payment
</h1>
<h1>
	Replicare il form PlayAdvanced in modo discorsivo (sempre i 3 input, ma più bottoni e con del dialogo),
	con anche in automatico la "formazione" del checkout e la card con l'evento finale.
	<br>
	clicca conferma = subito pagamento e conferma evento
</h1>
 */

import { defineProps, computed, onMounted, toRefs, watch, ref } from "vue";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";
import { useTheme } from "vuetify";

import useScheduleHelpers from "@/resources/composables/useScheduleHelpers";
import useFormDataSchedule from "@/resources/composables/useFormDataSchedule";
import useTimeHelpers from "@/resources/composables/useTimeHelpers";
import useScheduleCalculations from "@/resources/composables/useScheduleCalculations";
import Panel from "guebbit-vue-library/src/components/blocks/Panel.vue";
import BusinessContactsPanel from "@/components/generic/panels/BusinessContactsPanel.vue";
import DialogConfirmItem from "@/components/play/DialogConfirmItem.vue";
import Footer from "@/components/generic/Footer.vue";
import { timeframeList, imagesUrl, uiFormatDate, uiFormatTime } from "@/resources/constants";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCalendar, faClock, faPlay, faCalendarDay, faCheck, faCircleInfo, faGears } from "@fortawesome/free-solid-svg-icons";

import type {
	scheduleInputMap,
	sendScheduleRequestMap
} from "@/interfaces";

library.add(faCalendar, faClock, faPlay, faCalendarDay, faCheck, faCircleInfo, faGears);

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t } = useI18n();
const { state, getters, commit, dispatch } = useStore();

const { scheduleRecords, scheduleTimeStep } = toRefs(state.ecommerce);
const { userInfo } = toRefs(state.user);

const props = defineProps({
	/**
	 * A selected schedule ID, preload the info and confirm it
	 * Maybe from PlayAdvanced someone wanted to confirm only one
	 */
	id: {
		type: String,
		required: false
	},
	/**
	 * TODO
	 * preloaded data
	 * To create a DIFFERENT schedule starting from another
	 * (like RENEW action)
	 */
	date: {
		type: String,
		required: false
	},
	formStart: {
		type: String,
		required: false
	},
	formEnd: {
		type: String,
		required: false
	},
	/**
	 * [UX] Set the default number of steps in the form
	 */
	preloadSteps: {
		type: Number,
		required: false
	},
});

/**
 * Toggles
 */
const showConfirmDialog = ref(false);

/**
 * User is authenticated
 */
const isAuthenticated = computed<boolean>(() => getters['user/isAuthenticated']);

/**
 * Schedule managing toolbox
 */
const {
	timeToForm,
	setTimeframe,
	translateScheduleUI,
} = useScheduleHelpers(uiFormatDate, uiFormatTime);

/**
 * Time helpers toolbox
 */
const {
	formatInputTypeDate,
	formatInputTypeTime
} = useTimeHelpers(uiFormatDate + ' ' + uiFormatTime);

/**
 * Schedule form toolbox
 */
// scheduleTimeStep è lo step minimo disponibile, temporaryNameUIDefaultStepJump è lo step di default
const temporaryNameUIDefaultStepJump = 2; // TODO
const {
	formValues,
	formIsValid,
	formErrors,
	formErrorsList,
	formStartEndTimestamps,
	formValuesDuration,
	formValuesTimeframe,
	formValuesIsToday,
	formValuesSteps,
	fillForm,
	formValueGo,
	resolveFormErrors,
	setDuration
} = useFormDataSchedule({
	temporaryNameUIDefaultStepJump: 2,
	stepTime: scheduleTimeStep.value,
	stepSlot: props.preloadSteps || temporaryNameUIDefaultStepJump,
	dateFormat: uiFormatDate,
	timeFormat: uiFormatTime
});
// default data based on current time
onMounted(() => resetForm(props.id));
watch(() => props.id, (id) => resetForm(id));

/**
 * Reset form to "now" or to selected schedule
 * TODO generalizzare?
 *
 * @param {string} id
 */
const resetForm = (id ?:string) => {
	if(!id || !Object.prototype.hasOwnProperty.call(scheduleRecords.value, id) || !scheduleRecords.value[id]){
		fillForm();
		return;
	}
	const { start, end } = scheduleRecords.value[id];
	fillForm(start, end);
};


/**
 * TODO beta
 * set duration (fixed start, changing end to meet required duration)
 *
 * @param {string} timeframe
 */
const setNewTimeframe = (timeframe :string) => {
	if(!formValues.value.date || !formValues.value.hourEnd)
		return;
	const [ start, end ] = formStartEndTimestamps.value;
	const [ newStart, newEnd ] = setTimeframe(timeframe, start, end);
	const newForm = timeToForm(newStart, newEnd);
	if(newForm.date !== formValues.value.date)
		sendMessage(t('generic.info'), t('play-page.resolve-form-errors-called'));
	formValues.value = {
		...formValues.value,
		...newForm
	};
};

/**
 * Send a message to user via UI
 *
 * @param {string} title
 * @param {string} message
 * @param {string} variant
 */
const sendMessage = (title ?:string, message ?:string, variant ?:string) =>
	commit('main/addToast', {
		variant,
		title,
		text: message,
		timeout: 7000
	});


/**
 * Call "resolveFormErrors" and inform the user via toast
 */
const handleResolveFormErrors = () => {
	const [ oldStart, oldEnd ] = formStartEndTimestamps.value;
	resolveFormErrors();
	const [ newStart, newEnd ] = formStartEndTimestamps.value;
	if(oldStart !== newStart || oldEnd !== newEnd)
		sendMessage(t('generic.info'), t('play-page.resolve-form-errors-called'));
};


/**
 * Form Submit.
 * Events will be added\edited ready to be confirmed later
 */
function formSubmit () {
	if(!formIsValid.value){
		// form is not valid for some reason, print the errors:
		for(let i = formErrorsList.value.length; i--; )
			commit('main/addToast', {
				title: t('generic.error'),
				text: t('schedule-form.errors.' + formErrorsList.value[i]),
				timeout: 5000
			});
		return;
	}
	// open dialog to make payment
	showConfirmDialog.value = true;
}

/**
 * Confirm AFTER payment
 */
function scheduleConfirm(){
	// translate form data
	const [ start, end ] = formStartEndTimestamps.value;
	// scheduleAdd & scheduleEdit are based on a custom Fullcalendar object, that I must recreate:
	dispatch('ecommerce/addSchedule', {
		start,
		end,
		allDay: false,
		resourceId: []
	} as scheduleInputMap)
		.then(id => dispatch('ecommerce/sendSchedules', [{
			id,
			confirm: true,
			pay: true,
			useWallet: true
		} as sendScheduleRequestMap]))
		.catch(errors => {
			for(let i = errors.length; i--; )
				commit('main/addToast', {
					title: t('generic.error'),
					text: errors[i],
					timeout: 5000
				})
		})
}


/**
 * ---------------------- CHECKOUTTTTTTTTTTTTTTTTTTTTTT ----------------------
 */

/**
 * Schedule toolbox and various checkout calculations
 * @param {number} REF of steps to pay
 */
const {
	getStepCost,
	getNearestDiscountThreshold,
	scheduleTimeCost,
	scheduleCartTotalTime,
	scheduleCartTotalCost,
	scheduleCartTotalCostDiscounted,
	userInfoWalletTime,
	userInfoWalletTimeRemaining,
	scheduleCartFinalCost
} = useScheduleCalculations(formValuesSteps);


/**
 * Added steps
 *
 * warning: double step added
 */
const stepAddedStepTemporaryName = 2;
const stepAdded = ref(0);
// const stepAddedTime = computed(() => stepAdded.value * stepAddedStepTemporaryName * scheduleTimeStep.value);
const stepAddedCost = computed(() => stepAdded.value * stepAddedStepTemporaryName * scheduleTimeCost.value[0] / 100);
const stepAddedCostDiscounted = computed(() => getStepCost(stepAdded.value * stepAddedStepTemporaryName) / 100);
const nearestDiscountThreshold = computed(() => getNearestDiscountThreshold(formValuesSteps.value + stepAdded.value * 2));
/**
 * Add hours to the wallet until the next discount
 */
function clickFillWalletUntilDiscount(){
	stepAdded.value += nearestDiscountThreshold.value;
}


/**
 * label of wallet duration
 */
const userInfoWalletDuration = computed<string>(() => {
	const { durationData: { mode, hours, minutes } } = translateScheduleUI(0, userInfoWalletTime.value);
	if(mode < 2)
		return t('checkout-page.wallet-empty');
	return t('generic.schedule-details-time-count.' + mode, {
		hours,
		minutes
	});
});

/**
 * label of wallet remaining AFTER payment
 */
const userInfoWalletRemainingDuration = computed<string>(() => {
	const { durationData: { mode, hours, minutes } } = translateScheduleUI(0, Math.max(userInfoWalletTimeRemaining.value, 0));
	return t('generic.schedule-details-time-count.' + mode, {
		hours,
		minutes
	});
});

/**
 * label of schedule duration
 */
const scheduleCartDuration = computed<string>(() => {
	const { durationData: { mode, hours, minutes } } = translateScheduleUI(0, scheduleCartTotalTime.value);
	return t('generic.schedule-details-time-count.' + mode, {
		hours,
		minutes
	});
});
</script>

<style lang="scss">
@import "src/assets/scss/main/global";

#play-page {
	.v-form{
		max-width: 600px;
		margin: 0 auto;
		padding: 24px;
		background-color: rgba(var(--v-theme-background), 0.9);
	}
}
</style>
