<template>
    <v-container fluid id="checkout-page" class="theme-page page-menu-padding full-page centered">
        <v-row>
            <v-col cols="12" lg="3" class="user-info-section">
                <UserInfoCard
                    class="mb-4"
                    :id="userInfo.id"
                    :showInfo="false"
                />
                <v-card class="mb-4">
                    <v-card-text>
                        <v-list>
                            <v-list-item>
								<p class="simple-icon-text">
									<font-awesome-icon size="2x" class="text-secondary" :icon="['fas', 'wallet']" />
									<span class="text-h5">{{ userInfoWalletDuration }}</span>
								</p>
                            </v-list-item>
                            <v-list-item lines="">
                                {{ t('checkout-page.instructions-forgot') }}
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>

				<v-card class="mb-4 pricings-card">
					<v-card-text style="font-size: 1.2em">
						<v-list>
							<v-list-item>
								{{ t('checkout-page.prices-description-1') }}
							</v-list-item>
							<v-list-item>
								{{ t('checkout-page.prices-description-2') }}
							</v-list-item>
							<v-list-item class="pricings-list">
								<p class="my-4">
									<b class="text-secondary" style="display: inline-block; min-width: 80px">1 ora: </b> <span>10€</span>
								</p>
								<p class="my-4">
									<b class="text-secondary" style="display: inline-block; min-width: 80px">5 ore: </b> <span>40€<small class="ml-3" style="opacity: 0.25;"><s>50€</s></small></span>
								</p>
								<p class="my-4">
									<b class="text-secondary" style="display: inline-block; min-width: 80px">10 ore: </b> <span>50€<small class="ml-3" style="opacity: 0.25;"><s>100€</s></small></span>
								</p>
								<!--
								TODO fare bene
								<p
									v-for="(price, steps) in scheduleTimeCost"
									:key="'price-' - steps"
								>
									{{ steps }}: {{ price }}
								</p>
								-->
							</v-list-item>
							<v-list-item v-show="nearestDiscountThreshold > 0">
								<p class="mb-4">
									Non vorresti aggiungere qualche ora al wallet?
									Ti manca proprio al prossimo sconto per avere ore gratuite
								</p>
								<!-- TODO IMPLEMENT -->
								<v-btn
									class="vuetify-button-icon"
									block
									color="primary"
									@click="clickFillWalletUntilDiscount"
								>
									{{ fillWalletUntilDiscountLabel }}
									<font-awesome-icon :icon="['fas', 'shopping-cart']" />
								</v-btn>
							</v-list-item>
						</v-list>
					</v-card-text>
				</v-card>

                <v-card>
                    <v-card-text>
                        <BusinessContactsPanel />
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" lg="9" class="checkout-list-section">
                <v-list class="checkout-list bg-transparent">
                    <v-list-item
                        v-for="schedule in scheduleListCartUserReadable"
                        :key="'schedule-list-checkout-' + schedule.id"
                        variant="text"
                        :class="{
                            'disabled': disabledScheduleIdArray.includes(schedule.id)
                        }"
                    >
						<span class="schedule-date">
							<font-awesome-icon size="lg" class="text-primary mx-5" :icon="['fas', 'calendar']" />
							{{ schedule.date }}
						</span>
						<span class="schedule-time">
							<font-awesome-icon size="lg" class="text-primary mx-5" :icon="['fas', 'clock']" />
							{{ schedule.hourStart }}
							<font-awesome-icon class="mx-2" :icon="['fas', 'arrow-right-long']" />
							{{ schedule.hourEnd }}
						</span>
						<span class="schedule-duration">
							<font-awesome-icon size="lg" class="text-secondary mx-5" :icon="['fas', 'play']" />
							{{
								t('generic.schedule-details-time-count.' + schedule.durationData.mode, {
									hours: schedule.durationData.hours,
									minutes: schedule.durationData.minutes
								})
							}}
						</span>
						<span class="schedule-cost">
							<font-awesome-icon size="lg" class="text-primary mx-5" :icon="['fas', 'coins']" />
							{{ schedule.cost }} €
						</span>

						<template v-slot:append>
							<v-list-item-action class="flex-column flex-md-row">
								<v-btn
									icon
									variant="text"
									disabled
								>
									<font-awesome-icon size="lg" :icon="['fas', 'edit']" />
								</v-btn>
								<v-btn
									icon
									variant="text"
									@click="toggleSchedule(schedule.id)"
								>
									<font-awesome-icon :icon="['fas', 'trash-can']" />
								</v-btn>
							</v-list-item-action>
						</template>
                    </v-list-item>
                </v-list>


                <v-row class="total-and-payments my-2">
                    <v-col cols="12" lg="6">
						<v-alert
							v-show="disabledScheduleIdArray.length > 0"
							class="mb-3"
							type="warning"
							variant="outlined"
						>
							{{ t('checkout-page.disabled-schedules-warning') }}
						</v-alert>
                        <v-card class="pa-5">
                            <h1>
                                METODI DI PAGAMENTO
                                <br>
                                paypal, carta?, pagamento alla cassa
                            </h1>
                        </v-card>
                    </v-col>
                    <v-col cols="12" lg="6">
                        <div class="cart-total-info">
							<div class="d-flex justify-space-between align-center">
								<span class="label">
									<small>{{ t('checkout-page.add-hours') }}</small>
								</span>
								<span class="info">
									<v-text-field
										v-model="stepAdded"
										class="step-add-input"
										variant="outlined"
										type="number"
										step="1"
										min="0"
										density="compact"
										hide-details
									/>
								</span>
							</div>
							<hr class="mt-2 mb-2">
                            <div class="d-flex justify-space-between align-center">
                                <span class="label">{{ t('checkout-page.total-hours') }}</span>
                                <span class="info">{{ scheduleCartDuration }}</span>
                            </div>
                            <hr class="mt-2 mb-2">
                            <div class="d-flex justify-space-between align-center">
                                <span class="label">{{ t('checkout-page.total-cost') }}</span>
                                <span class="info">{{ scheduleCartTotalCost }} €</span>
                            </div>
                            <hr class="mt-2 mb-2">
                            <div class="d-flex justify-space-between align-center">
                                <span class="label">{{ t('checkout-page.total-cost-discount') }}</span>
                                <span class="info"> {{ scheduleCartTotalCost - scheduleCartTotalCostDiscounted }} €</span>
                            </div>
                            <div class="d-flex justify-space-between align-center">
                                <span class="label">{{ t('checkout-page.total-wallet') }}</span>
                                <span class="info">{{ userInfoWalletDuration }}</span>
                            </div>
                            <div class="d-flex justify-space-between align-center">
                                <span class="label">{{ t('checkout-page.total-wallet-remaining') }}</span>
                                <span class="info">{{ userInfoWalletRemainingDuration }}</span>
                            </div>
                            <hr class="mt-2 mb-2">
                            <div class="d-flex justify-space-between align-center text-h4">
                                <span class="label">{{ t('checkout-page.final-cost') }}</span>
                                <span class="info">{{ scheduleCartFinalCost }} €</span>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>

	<Footer
		:primary="themeColors.primary"
		:secondary="themeColors.secondary"
	/>
</template>

<script setup lang="ts">
import { ref, computed, toRefs } from "vue";
import { useTheme } from "vuetify";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";

import UserInfoCard from "@/components/basics/cards/UserInfoCard.vue";
import BusinessContactsPanel from "@/components/generic/panels/BusinessContactsPanel.vue";
import Footer from "@/components/generic/Footer.vue";
import useScheduleHelpers, { type scheduleReadableMap } from "@/resources/composables/useScheduleHelpers";
import useScheduleCalculations from "@/resources/composables/useScheduleCalculations";
import useTimeHelpers from "@/resources/composables/useTimeHelpers";
import { uiFormatDate, uiFormatTime } from "@/resources/constants";
import type { scheduleMap } from "@/interfaces";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faCalendar,
    faArrowRightLong,
    faClock,
    faPlay,
    faCoins,
    faTrashCan,
    faEdit,
    faWallet,
    faEnvelope,
    faLocationDot,
    faCity,
    faPhone,
	faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";


library.add(
    faCalendar,
    faArrowRightLong,
    faClock,
    faPlay,
    faCoins,
    faTrashCan,
    faEdit,
    faWallet,
    faEnvelope,
    faLocationDot,
    faCity,
    faPhone,
	faShoppingCart,
);

const { state, getters } = useStore();
const { t } = useI18n();
const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { userInfo } = toRefs(state.user);

/**
 * Schedule managing toolbox
 */
const {
	getStepCost,
	translateScheduleUI,
	getScheduleTotalSteps
} = useScheduleHelpers(uiFormatDate, uiFormatTime);

const {
	translateMillisecondsToReadable
} = useTimeHelpers();

/**
 * List of schedules
 *
 * @return {object[]}
 */
const scheduleListCartUser = computed<scheduleMap[]>(() => getters['ecommerce/scheduleListCartUser']);
/**
 * List of human readable schedules from Cart
 *
 * @return {object[]}
 */
const scheduleListCartUserReadable = computed<scheduleReadableMap[]>(() => {
    let scheduleArray :scheduleReadableMap[] = [];
    for(let i = scheduleListCartUser.value.length; i--; ){
        const { id, start, end } = scheduleListCartUser.value[i];
        scheduleArray.push({
            ...translateScheduleUI(start, end),
            id
        });
    }
    return scheduleArray;
});
/**
 * List of disabled schedules (this page only)
 */
const disabledScheduleIdArray = ref<string[]>([]);
/**
 * List of id of schedules filtered using disabledScheduleIdArray
 */
const activeScheduleIdArray = computed<string[]>(() => {
    return (scheduleListCartUser.value).reduce((idArray, { id }) :string[] => {
        if(!disabledScheduleIdArray.value.includes(id)){
            idArray.push(id);
        }
        return idArray;
    }, [] as string[]);
});
const toggleSchedule = (id :string) => {
	if(disabledScheduleIdArray.value.includes(id)){
		disabledScheduleIdArray.value.splice(disabledScheduleIdArray.value.indexOf(id), 1);
	}else{
		disabledScheduleIdArray.value.push(id);
	}
};

/**
 * Sum the STEPS of selected schedules (NO DISCOUNT, calculated later)
 */
const scheduleCartTotalSteps = computed(() =>
	getScheduleTotalSteps(activeScheduleIdArray.value)
);

/**
 * Added steps
 *
 * warning: double step added
 */
const stepAddedStepTemporaryName = 2;
const stepAdded = ref(0);

/**
 * Schedule toolbox and various checkout calculations
 * @param {number} REF of steps to pay
 */
const {
	getNearestDiscountThreshold,
	scheduleTimeStep,
	scheduleCartTotalTime,
	scheduleCartTotalCost,
	scheduleCartTotalCostDiscounted,
	userInfoWalletTime,
	userInfoWalletTimeRemaining,
	scheduleCartFinalCost
} = useScheduleCalculations(computed(() => scheduleCartTotalSteps.value + stepAdded.value * stepAddedStepTemporaryName))

/**
 * Add hours to the wallet until the next discount
 */
const nearestDiscountThreshold = computed(() => getNearestDiscountThreshold(scheduleCartTotalSteps.value + stepAdded.value * 2));
function clickFillWalletUntilDiscount(){
	stepAdded.value += nearestDiscountThreshold.value / 2;
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

/**
 * label of schedule duration
 */
const fillWalletUntilDiscountLabel = computed<string>(() => {
	const {
		mode,
		hours,
		minutes
	} = translateMillisecondsToReadable(nearestDiscountThreshold.value * scheduleTimeStep.value);
	return t('generic.add') + ' ' + t('generic.schedule-details-time-count.' + mode, {
		hours,
		minutes
	});
});
</script>

<style lang="scss">
@import 'src/assets/scss/main/global';

#checkout-page{
    .checkout-list{
        &.v-list{
            padding: 0;
            .v-list-item{
                border-bottom: 1px solid rgb(var(--v-theme-on-surface));

                &:first-child{
                    border-top: 1px solid rgb(var(--v-theme-on-surface));
                }

                &.disabled{
                    opacity: 0.3;
                }

				@include media-mobile(){
					.schedule-date,
					.schedule-time,
					.schedule-duration,
					.schedule-cost{
						display: block;
						margin: 12px 0;
					}
				}
            }
        }
    }

    .checkout-list-section{
        display: flex;
        flex-direction: column;
    }

	.step-add-input{
		max-width: 80px;
	}

    .cart-total-info{
        width: 100%;
        hr{
            opacity: 0.3;
        }
        .label{
            color: rgb(var(--v-theme-secondary))
        }
        .info{
            font-size: 1.2em;
        }
    }

    // ORDER
    @include media-mobile(){
        .user-info-section{
            order: 2;
        }
        .checkout-list-section{
            order: 1;
        }
        .checkout-list{
            order: 2;
        }
        .total-and-payments{
            order: 1;
            & > * {
                &:first-child{
                    order: 2;
                }
                &:last-child{
                    order: 1;
                }
            }
        }
    }
}
</style>