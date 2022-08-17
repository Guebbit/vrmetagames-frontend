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

						@button:click:confirm="formSubmit"
						@button:click:remove="showDeleteDialog = true"
						@button:click:unselect="selectedIdentifier = null"
					/>
					<!-- form -->
                    <ScheduleFormCard
						v-model="formValues"
						:errors="formErrors"
						:disabled="!formIsValid"
						:dateFormat="uiFormatDate"
						:timeFormat="uiFormatTime"
						:timeStep="scheduleTimeStep / 1000"
						:hideTermsButton="isAdmin"
						:allowPastSelection="isAdmin"

						@submit="formSubmit"
						@message:emit="sendMessage(t('play-page.resolve-form-changed'))"
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

            <div class="my-10 d-flex justify-end align-center" style="gap:12px">
				<v-btn
					variant="outlined"
					size="x-large"
					:to="{
						name: 'Play'
					}"
				>
					{{ t('play-page.schedules-basic-settings') }}
					<font-awesome-icon class="ml-5" :icon="['fas', 'gear']" />
				</v-btn>
                <v-btn
                    color="secondary"
                    size="x-large"
					:disabled="scheduleListCartUser.length < 1"
                    :to="{
						name: 'Checkout'
					}"
                >
                    {{ t('play-page.schedules-confirm-all') }}
                    <font-awesome-icon class="ml-5" :icon="['fas', 'play']" />
                </v-btn>
            </div>

			<!-- TODO lista con scheduleListOffline e possibilità di resettare le modifiche effettuate -->

            <v-row>
				<v-col cols="12" lg="9">
					<div class="schedule-list">
						<!-- TODO controlli, riordinamenti, etc -->
						<v-toolbar
							class="px-6 mb-5"
							color="surface"
							dark
							prominent
							dense
						>
							<font-awesome-icon class="mr-4" size="xl" :icon="['fas', 'cart-arrow-down']"/>
							<v-toolbar-title>{{ t('play-page.schedule-cart-list') }}</v-toolbar-title>
							<v-spacer></v-spacer>
							<v-btn icon @click="showDeleteAllDialog = true">
								<font-awesome-icon class="mx-2" size="lg" :icon="['fas', 'trash-can']"/>
							</v-btn>
							<!--
							<v-btn icon>
								<font-awesome-icon class="mx-2" size="lg" :icon="['fas', 'arrow-down-1-9']"/>
							</v-btn>
							<v-btn icon>
								<font-awesome-icon class="mx-2" size="lg" :icon="['fas', 'arrow-up-9-1']"/>
							</v-btn>
							<v-btn icon>
								<font-awesome-icon class="mx-2" size="lg" :icon="['fas', 'arrow-down-a-z']"/>
							</v-btn>
							<v-btn icon>
								<font-awesome-icon class="mx-2" size="lg" :icon="['fas', 'arrow-up-z-a']"/>
							</v-btn>
							-->
						</v-toolbar>
						<div class="mb-5 text-center" v-show="scheduleListCartUser.length < 1">
							<h3 class="simple-icon-text d-inline-flex">
								<font-awesome-icon :icon="['fas', 'circle-info']" />
								{{ t('play-page.schedule-list-empty') }}
							</h3>
						</div>
						<v-row v-show="scheduleListCartUser.length > 0">
							<v-col cols="12">
								<EventCard
									v-for="{ id } in scheduleListCartUser"
									class="cursor-pointer"
									:key="'event-onhold-' + id"
									:id="id"
									:admin="isAdmin"
									:dateFormat="uiFormatDate"
									:timeFormat="uiFormatTime"

									@click="scheduleSelect(id)"
									@button:click:confirm="showConfirmDialog = true"
									@button:click:cancel="showDeleteDialog = true"
									@button:click:renew="showRenewDialog = true"
								/>
							</v-col>
						</v-row>
					</div>
					<div class="schedule-list">
						<!-- TODO controlli, riordinamenti, etc -->
						<v-toolbar
							class="px-6 mb-5"
							color="surface"
							dark
							prominent
							dense
						>
							<font-awesome-icon class="mr-4" size="xl" :icon="['fas', 'calendar-check']"/>
							<v-toolbar-title>{{ t('play-page.schedule-incoming-list') }}</v-toolbar-title>
							<v-spacer></v-spacer>
						</v-toolbar>
						<div class="mb-5 text-center" v-show="scheduleListIncomingUser.length < 1">
							<h3 class="simple-icon-text d-inline-flex">
								<font-awesome-icon :icon="['fas', 'circle-info']" />
								{{ t('play-page.schedule-list-empty') }}
							</h3>
						</div>
						<v-row v-show="scheduleListIncomingUser.length > 0">
							<v-col cols="12">
								<EventCard
									v-for="{ id } in scheduleListIncomingUser"
									class="cursor-pointer"
									:key="'event-onhold-' + id"
									:id="id"
									:admin="isAdmin"
									:dateFormat="uiFormatDate"
									:timeFormat="uiFormatTime"

									@click="scheduleSelect(id)"
									@button:click:confirm="showConfirmDialog = true"
									@button:click:cancel="showDeleteDialog = true"
									@button:click:renew="showRenewDialog = true"
								/>
							</v-col>
						</v-row>
					</div>
				</v-col>
				<v-col cols="12" lg="3">
					<v-list
						class="schedule-legend bg-transparent"
						variant="text"
					>
						<v-list-item
							v-for="({ variant, icon, color, title, description }, index) in statusListLegenda"
							:key="'schedule-chip-' + index"
							class="mb-2"
						>
							<v-chip
								:color="color"
								:variant="variant"
								size="small"
							>
								<font-awesome-icon class="mr-3" :icon="['fas', icon]"/>
								{{ title }}
							</v-chip>
							<p class="explanation ml-4 mt-2">{{ description }}</p>
						</v-list-item>
					</v-list>
				</v-col>
			</v-row>
        </v-container>

		<DialogConfirmItem
			v-model="showConfirmDialog"

			@button:click:confirm="router.push({
				name: 'Play',
				params: {
					id: selectedIdentifier
				}
			})"
			@button:click:cancel="showConfirmDialog = false"
		/>

		<DialogDeleteItem
			v-model="showDeleteDialog"
			:id="selectedIdentifier"
			:dateFormat="uiFormatDate"
			:timeFormat="uiFormatTime"

			@button:click:confirm="scheduleRemove([selectedIdentifier]); selectedIdentifier = null; showDeleteDialog = false"
			@button:click:cancel="showDeleteDialog = false"
		/>

		<DialogRenewItem
			v-model="showRenewDialog"
			:id="selectedIdentifier"
			:dateFormat="uiFormatDate"
			:timeFormat="uiFormatTime"

			@button:click:cancel="showRenewDialog = false"
		/>

		<DialogDeleteAll
			v-model="showDeleteAllDialog"

			@button:click:confirm="scheduleRemoveAll();showDeleteAllDialog = false;"
			@button:click:cancel="showDeleteAllDialog = false"
		/>
    </div>
	<Footer
		:primary="themeColors.primary"
		:secondary="themeColors.secondary"
	/>
</template>




<script setup lang="ts">
import { defineProps, ref, computed, toRefs, watch, onMounted } from "vue";
import { useRouter } from 'vue-router'
import { useTheme } from "vuetify";
import { useI18n } from "vue-i18n";
import { useStore } from "@/store";

import UserInfoCard from "@/components/basics/cards/UserInfoCard.vue";
import EventCard from "@/components/generic/cards/EventCard.vue";
import ScheduleFormCard from "@/components/generic/forms/ScheduleFormCard.vue";
import ScheduleCalendar from "@/components/play/ScheduleCalendar.vue";
import Footer from "@/components/generic/Footer.vue";

import useFormDataSchedule from "@/resources/composables/useFormDataSchedule";
import useItemDetails from "@/resources/composables/useItemDetails";
import useScheduleHelpers from "@/resources/composables/useScheduleHelpers";
import EventDetailsList from "@/components/play/EventDetailsList.vue";
import DialogDeleteItem from "@/components/play/DialogDeleteItem.vue";
import DialogRenewItem from "@/components/play/DialogRenewItem.vue";
import DialogDeleteAll from "@/components/play/DialogDeleteAll.vue";
import DialogConfirmItem from "@/components/play/DialogConfirmItem.vue";
import { uiFormatDate, uiFormatTime, scheduleStates } from "@/resources/constants";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCalendar, faCalendarCheck, faClock, faPlay, faCheck, faCircleInfo, faCartArrowDown, faHatWizard, faGear, faTrashCan, faArrowDown19, faArrowUp91, faArrowDownAZ, faArrowUpZA } from "@fortawesome/free-solid-svg-icons";

import type {
	scheduleInputMap,
	scheduleMap,
} from "@/interfaces";





library.add(faCalendar, faCalendarCheck, faClock, faPlay, faCheck, faCircleInfo, faCartArrowDown, faHatWizard, faGear, faTrashCan, faArrowDown19, faArrowUp91, faArrowDownAZ, faArrowUpZA);

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t } = useI18n();
const { state, getters, commit, dispatch } = useStore();
const router = useRouter();

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
	getRecord,
	selectedIdentifier,
	selectedRecord,
	selectTargetRecord
} = useItemDetails(
	scheduleRecords,
	Promise.all([
		dispatch('main/initApp'),
		dispatch('ecommerce/getSchedules')
	]),
	{
		defaultLoading: false
	}
);

/**
 * Schedule managing toolbox
 */
const {
	timeToForm,
	formToTime,
	checkScheduleIsEditable,
	determineScheduleIsAllowed,
} = useScheduleHelpers(uiFormatDate, uiFormatTime);

/**
 * Schedule form toolbox
 */
const {
	formValues,
	formErrors,
	formErrorsList: formErrorsListOriginal,
	formMeta,
	fillForm,
	formValueGo,
	resolveFormErrors
} = useFormDataSchedule({
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
	if(!checkScheduleIsEditable(id))
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


const sendMessage = (message :string) =>
	commit('main/addToast', {
		title: t('generic.info'),
		text: message,
		timeout: 7000
	});

/**
 * Call "resolveFormErrors" and inform the user via toast
 */
const handleResolveFormErrors = () => {
	sendMessage(t('play-page.resolve-form-errors-called'));
	resolveFormErrors();
};


/**
 * Toggles
 */
const showConfirmDialog = ref(false);
const showDeleteDialog = ref(false);
const showRenewDialog = ref(false);
const showDeleteAllDialog = ref(false);

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
	// translate form data
	const [ start, end ] = formToTime(formValues.value.date, formValues.value.hourStart, formValues.value.hourEnd);
	// scheduleAdd & scheduleEdit are based on a custom Fullcalendar object, that I must recreate:
	const scheduleInfo :scheduleInputMap = {
		start,
		end,
		allDay: false,		// TODO for now it's useless
		resourceId: []		// TODO in the future: resources pick in form
	}
	if(selectedIdentifier)
		scheduleEdit({
			...scheduleInfo,
			id: selectedIdentifier.value
		})
	else
		scheduleAdd(scheduleInfo);
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
			timeout: 5000
		});
}

/**
 * Add Schedule (offline)
 *
 * @param {Object} schedule
 */
function scheduleAdd(schedule :scheduleInputMap){
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
	return dispatch('ecommerce/editSchedule', schedule)
		.catch(scheduleHandleErrors)
}

/**
 * Confirm schedule and ask for payment
 *
 * @param {string} ids
 */
function scheduleRemove(ids :string[] = []){
	for(let i = ids.length; i--; ){
		// get schedule data
		const { start, end } = getRecord(ids[i]) as scheduleMap || {};
		// translate
		const { date, hourStart, hourEnd } = timeToForm(start, end);
		// send message
		sendMessage(t('play-page.schedule-removed', {
			date,
			hourStart,
			hourEnd
		}));
	}
	return dispatch('ecommerce/removeSchedules', ids)
		.catch(scheduleHandleErrors);
}

function scheduleRemoveAll(){
	const idArray :string[] = [];
	for(let i = scheduleListCartUser.value.length; i--; ){
		idArray.push(scheduleListCartUser.value[i].id);
		// get schedule data
		const { start, end } = scheduleListCartUser.value[i];
		// translate
		const { date, hourStart, hourEnd } = timeToForm(start, end);
		// send message
		sendMessage(t('play-page.schedule-removed', {
			date,
			hourStart,
			hourEnd
		}));
	}
	return dispatch('ecommerce/removeSchedules', idArray)
		.catch(scheduleHandleErrors);
}

/**
 * [UI] List of schedules
 *  - In the cart
 *  - Incoming
 */
const scheduleListCartUser = computed(() => getters['ecommerce/scheduleListCartUser']);
const scheduleListIncomingUser = computed(() => getters['ecommerce/scheduleListIncomingUser']);


/**
 * Legenda of the different statuses of schedule
 * (no computed because it's the translation of a constant)
 */
const statusListLegendaRaw = Object.values(scheduleStates);
const statusListLegenda = [];
for(let i = statusListLegendaRaw.length; i--; )
	statusListLegenda.push({
		...statusListLegendaRaw[i],
		title: t(statusListLegendaRaw[i].title),
		description: t(statusListLegendaRaw[i].description)
	})
</script>


<style lang="scss">
@import "src/assets/scss/main/global";

#play-advanced-page {
    .schedule-form-details{
		display: flex;
		flex-direction: column;

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

		@include media-mobile(){
			.schedule-user-card{
				order: 3;
			}
			.event-details-list{
				margin-top: 24px;
				order: 2;
			}
			.schedule-form{
				order: 1;
			}
		}
    }

    .schedule-legend{
        .explanation{
            flex-shrink: 99;
            font-size: 0.7em;
        }
    }
}
</style>
