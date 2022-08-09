<template>
    <div id="play-page" class="theme-page">
		<Panel class="theme-panel"
			shadow="#000000"
			:shadow-opacity="0.9"
			centered
			strict
			hero
		>
			<template #default>
				<v-container class="text-center">
					<h1 style="color:red">{{id}}</h1>
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
					<!-- ScheduleFormCard -->
					<div class="d-flex justify-end align-items-center flex-gap-24 mt-10">
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
						<v-btn
							color="secondary"
							size="x-large"
							:to="{ name: 'Checkout' }"
							:disabled="scheduleListCart.length === 0"
						>
							{{ $t('play-page.schedules-confirm-all') }}
							<font-awesome-icon class="ml-3" :icon="['fas', 'play']" />
						</v-btn>
					</div>
				</v-container>
			</template>
			<template #background>
				<!--
				<video class="panel-background" async="" autoplay="" loop="" muted="" poster="">
					<source src="https://mangabeats.it/public/video/videogames/mix.mp4" type="video/mp4">
				</video>
				-->
			</template>
		</Panel>
    </div>
	<Footer
		:primary="themeColors.primary"
		:secondary="themeColors.secondary"
	/>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";
import { useTheme } from "vuetify";

import Panel from "guebbit-vue-library/src/components/blocks/Panel.vue";
import ScheduleFormCard from "@/components/generic/forms/ScheduleFormCard.vue";
import Footer from "@/components/generic/Footer.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCalendar, faClock, faPlay, faCalendarDay, faCheck, faCircleInfo, faGears } from "@fortawesome/free-solid-svg-icons";

import type {
	scheduleInputMap
} from "@/interfaces";


library.add(faCalendar, faClock, faPlay, faCalendarDay, faCheck, faCircleInfo, faGears);

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t } = useI18n();
const { getters, dispatch } = useStore();



defineProps({
	id: {
		type: String,
		// required: false
		default: () => 'itemxxxx'	//TODO
	},
	/**
	 * [UX] Set the default number of steps in the form
	 */
	preloadSteps: {
		type: Number,
		required: false
	},
});

const scheduleListCart = computed(() => getters['ecommerce/scheduleListCart']);

/**
 * Add Schedule (offline)
 *
 * @param {Object} schedule
 */
const scheduleHandleAdd = (schedule :scheduleInputMap) => {
	console.log("AAAAAAADDDDDD", schedule);
	/*
	dispatch('ecommerce/addSchedule', schedule)
		.then(id => {
			if(!id){
				throw 'TODO errore sconosciuto';
			}
			this.selectItem(id);
		})
		.catch((errors :string[]) => {
			// TODO toast OR TODO disclaimer & computed & REVERT
			console.error("scheduleHandleAdd", errors)
		})
	*/
};

/**
 * Confirm schedule and pay from wallet
 * if wallet empty: delay confirm and ask for payment (?)
 *
 * @param {string} id
 */
const scheduleHandleConfirm = (id :string) => {
	console.log("CCCCCCCCCCCCCONFIRM", id)
	// TODO confirm multiple?
};

/**
 * Edit schedule (unsaved = true)
 *
 * @param {Object} schedule
 */
const scheduleHandleEdit = (schedule :scheduleInputMap) => {
	console.log("EDITTTTT", schedule)
	/*
	dispatch('ecommerce/editSchedule', schedule).catch((errors: string[]) => {
		// TODO toast OR TODO disclaimer & computed & REVERT
		console.error("editSchedule", errors)
	})
	*/
};

</script>

<style lang="scss">
@import "src/assets/scss/main/global";

#play-page {
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

    .schedule-info-card{
        margin-bottom: 24px;
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
