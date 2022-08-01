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
            <h1 class="theme-page-subtitle text-center mt-5 mb-10">Calendario avanzato</h1>
            <v-row>
                <v-col cols="12" lg="3" class="schedule-form-details">
                    <UserInfoCard
                        class="mb-4"
                        v-if="selectedItem?.userId"
                        :id="selectedItem?.userId"
                    />

                    <v-list class="mb-4">
                        <v-list-item>
                            <v-list-item-avatar start>
                                <font-awesome-icon :icon="['fas', 'calendar']" />
                            </v-list-item-avatar>
                            <v-list-item-title>{{ selectedItemReadable.date || $t('play-page.select-event-label-date') }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-avatar start>
                                <font-awesome-icon :icon="['fas', 'clock']" />
                            </v-list-item-avatar>
                            <v-list-item-title>
                                {{ selectedItemReadable.hourStart && selectedItemReadable.hourEnd ? selectedItemReadable.hourStart + ' - ' + selectedItemReadable.hourEnd : $t('play-page.select-event-label-hours') }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item v-show="selectedItemDuration">
                            <v-list-item-avatar start>
                                <font-awesome-icon :icon="['fas', 'play']" />
                            </v-list-item-avatar>
                            <v-list-item-title>{{ selectedItemDuration }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item v-show="!selectedItemDuration" lines="">
                            <v-list-item-avatar start>
                                <font-awesome-icon :icon="['fas', 'circle-info']" />
                            </v-list-item-avatar>
                            <v-list-item-subtitle>{{ $t('play-page.select-event-label-disclaimer') }}</v-list-item-subtitle>
                        </v-list-item>
                        <template v-if="isAuthenticated && userInfo.isAdmin && selectedItemIdentifier">
                            <v-list-item>
                                <v-btn
                                    block
                                    variant="tonal"
                                    @click="fastMode ? (scheduleRemove([selectedItemIdentifier]), selectedItemIdentifier = null) : showConfirmDeleteItemDialog = true"
                                >
                                    {{ $t('play-page.select-event-label-remove-event') }}
                                </v-btn>
                            </v-list-item>
                            <v-list-item>
                                <v-btn
                                    block
                                    variant="tonal"
                                    @click="selectedItemIdentifier = null"
                                >
                                    {{ $t('play-page.select-event-label-unselect-event') }}
                                </v-btn>
                            </v-list-item>
                        </template>
                    </v-list>

                    <ScheduleFormCard
                        :scheduleId="selectedItemIdentifier"
                        :showSpeedModeTab="false"
                        :defaultFastMode="false"
                        :defaultFormTimeStep="preloadSteps || 2"

						@button:confirm="formSubmit"
                    />
                </v-col>
                <v-col cols="12" lg="9">
                    <!-- TODO hide mobile -->
                    <ScheduleCalendar
						:admin          = "isAuthenticated && userInfo.isAdmin"

						@event:click    = "selectItem"
						@event:create   = "scheduleAdd"
						@event:changed  = "scheduleEdit"
					/>
                </v-col>
            </v-row>

            <div v-show="scheduleListCart.length > 0"
                class="text-right my-10"
            >
                <v-btn
                    color="secondary"
                    size="x-large"
                    :to="{ name: 'Checkout' }"
                >
                    {{ $t('play-page.schedules-confirm-all') }}
                    <font-awesome-icon :icon="['fas', 'play']" />
                </v-btn>
            </div>

            <div v-show="scheduleListCart.length > 0" class="schedule-list">
                <h1 class="theme-page-subtitle text-center mt-5 mb-10">Lista eventi in prenotazione</h1>

                <!--
                <h1>OFFLINE</h1>
                <EventCard
                    v-for="{ id } in scheduleListOffline"
                    :key="'event-offline-' + id"
                    :id="id"

                    @button:confirm="scheduleHandleConfirm(id)"
                    @button:cancel="scheduleHandleReset(id)"
                />
                -->
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
                        <EventCard
                            v-for="{ id } in scheduleListCart"
                            :key="'event-onhold-' + id"
                            :id="id"
                            :showConfirmButton="false"

                            @button:confirm="scheduleHandleConfirm(id)"
                            @button:cancel="fastMode ? (scheduleRemove([selectedItemIdentifier]), selectedItemIdentifier = null) : showConfirmDeleteItemDialog = true"
                        />
                    </v-col>
                </v-row>

            </div>
        </v-container>


        <v-dialog
            v-model="showConfirmDeleteItemDialog"
        >
            <v-alert
                type="error"
                :title="$t('play-page.schedule-alert-remove-title')"
                variant="elevated"
            >
                <v-list
                    class="bg-transparent"
                    density="compact"
                    variant="text"
                >
                    <v-list-item>
                        <v-list-item-avatar start>
                            <font-awesome-icon :icon="['fas', 'calendar']" />
                        </v-list-item-avatar>
                        <v-list-item-title>{{ selectedItemReadable.date || $t('play-page.select-event-label-date') }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-avatar start>
                            <font-awesome-icon :icon="['fas', 'clock']" />
                        </v-list-item-avatar>
                        <v-list-item-title>
                            {{ selectedItemReadable.hourStart && selectedItemReadable.hourEnd ? selectedItemReadable.hourStart + ' - ' + selectedItemReadable.hourEnd : $t('play-page.select-event-label-hours') }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>

                <v-divider class="my-4"></v-divider>

                <div class="d-flex flex-row align-center justify-end" style="gap:12px">
                    <v-btn
                        variant="outlined"
                        @click="showConfirmDeleteItemDialog = false"
                    >
                        {{ $t('play-page.schedule-alert-remove-button-cancel') }}
                    </v-btn>
                    <v-btn
                        variant="outlined"
                        @click="scheduleRemove([selectedItemIdentifier]); selectedItemIdentifier = null; showConfirmDeleteItemDialog = false"

                    >
                        {{ $t('play-page.schedule-alert-remove-button-confirm') }}
                    </v-btn>
                </div>
            </v-alert>
        </v-dialog>
    </div>
	<Footer
		:primary="themeColors.primary"
		:secondary="themeColors.secondary"
	/>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { useTheme } from "vuetify";
import { useStore } from "@/store";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vuetifyColors from "vuetify/lib/util/colors";
import UserInfoCard from "@/components/basics/cards/UserInfoCard.vue";
import EventCard from "@/components/play/EventCard.vue";
import ScheduleFormCard from "@/components/generic/forms/ScheduleFormCard.vue";
import Footer from "@/components/generic/Footer.vue";


import type {
	scheduleInputMap,
	scheduleMap,
	scheduleFormMap,
} from "@/interfaces";


import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCalendar, faClock, faPlay, faCheck, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import ScheduleCalendar from "@/components/play/ScheduleCalendar.vue";

library.add(faCalendar, faClock, faPlay, faCheck, faCircleInfo);


const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t } = useI18n();
const { state, getters, commit, dispatch } = useStore();


const props = defineProps({
	preloadSteps: {
		type: Number,
		required: false
	},
});


const selectedItemIdentifier = ref('');
// LOGIC: Nella pagina "avanzata" non dovrebbe esserci la fastMode, per ora la ignoro
const fastMode = ref(false);
// toggles
const showConfirmDeleteItemDialog = ref(false);


const { businessHours } = toRefs(state.main);
const { userInfo } = toRefs(state.user);
const { users, stations, scheduleRecords } = toRefs(state.ecommerce);


const isAuthenticated = computed(() => getters['user/isAuthenticated']);
const scheduleListCart = computed(() => getters['ecommerce/scheduleListCart']);


/**
 * current selected item
 */
const selectedItem = computed<scheduleMap | undefined>(() => {
	if(!Object.prototype.hasOwnProperty.call(scheduleRecords.value, selectedItemIdentifier.value)){
		return undefined;
	}
	return scheduleRecords.value[selectedItemIdentifier.value];
});

/**
 * Get date, hourStart and hourEnd from selectedItem
 * and translate them in a human readable way.
 *
 * @return {Object}
 */
const selectedItemReadable = computed<scheduleFormMap>(() => {
	if(!selectedItem.value){
		return {};
	}
	let { start, end } = selectedItem.value as scheduleMap;
	return getters['ecommerce/scheduleReadable'](start, end);
});

/**
 * Readable duration
 *
 * @return {string}
 */
const selectedItemDuration = computed<string>(() => {
	if(!selectedItem.value){
		return '';
	}
	const { start, end } = selectedItem.value as scheduleMap;
	const { durationData: { mode, hours, minutes } } = getters['ecommerce/scheduleReadable'](start, end);
	return t('generic.schedule-details-time-count.' + mode, {
		hours,
		minutes
	});
});







function formSubmit () {
	console.log("SSSSSSSSSSSUBMIT");
	/*
	if(!formIsValid.value){
		console.log("VALIDATIONNNNNNNNN")
		return;
	}
	
	// modifica o aggiungi uno nuovo
	if(selectedItemIdentifier){
		scheduleEdit()
	}else{
		scheduleAdd()
	}
	
	// se fastmode = confermalo subito
	if(fastMode.value){
		scheduleConfirm()
	}
	*/
}

/**
 * Add Schedule (offline)
 *
 * @param {Object} schedule
 */
function scheduleAdd(schedule :scheduleInputMap){
	console.log("ADDDDDDD", schedule)
	dispatch('ecommerce/addSchedule', schedule)
		.then(id => selectItem(id))
		.catch((errors :string[]) => {
			// TODO toast OR TODO disclaimer & computed & REVERT
			console.error("scheduleHandleAdd", errors)
		})
}

/**
 * Edit schedule (unsaved = true)
 *
 * @param {Object} schedule
 */
function scheduleEdit(schedule :scheduleInputMap){
	console.log("EDITTTTT", schedule)
	// WARNING fullcalendarHandleEventAllow checks already done
	dispatch('ecommerce/editSchedule', schedule)
		.catch((errors: string[]) => {
			// TODO toast OR TODO disclaimer & computed & REVERT
			console.error("editSchedule", errors)
		})
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
	return dispatch('ecommerce/removeSchedules', ids);
}

/**
 * Reset edits
 *
 * @param {string} id
 */
function scheduleHandleReset(id :string){
	// TODO creo un elemento temporeaneo quando faccio modifiche offline
	// reset = rimuovo le modifiche offline only
	console.log("RESETTTT", id)
}

/**
 * Select schedule on fullcalendar
 *
 * @param {string} id
 */
function selectItem(id :string){
	if(!id || getters['ecommerce/checkScheduleIsEditable'](id).length > 0){
		return;
	}
	selectedItemIdentifier.value = id;
}





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
