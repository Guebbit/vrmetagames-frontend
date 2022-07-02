<template>
    <v-container fluid id="checkout-page" class="theme-page full-page centered">
        <v-row>
            <v-col cols="12" lg="3">
                <UserInfoCard
                    class="mb-4"
                    :id="userInfo.id"
                    :showInfo="false"
                />
                <v-card class="mb-4">
                    <v-card-text>
                        <v-list>
                            <v-list-item>
                                <v-list-item-avatar start>
                                    <font-awesome-icon size="2x" class="text-secondary" :icon="['fas', 'wallet']" />
                                </v-list-item-avatar>
                                <v-list-item-title class="wallet-value">{{ userInfoWalletDuration }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item lines="">
                                {{ t('checkout-page.instructions-receipt') }}
                            </v-list-item>
                            <v-list-item>
                                <v-btn
                                    block
                                    variant="tonal"
                                    disabled
                                >
                                    {{ t('checkout-page.instructions-receipt-button') }}
                                    <font-awesome-icon class="ml-3" :icon="['fas', 'print']" />
                                </v-btn>
                            </v-list-item>
                            <v-list-item lines="">
                                {{ t('checkout-page.instructions-forgot') }}
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>

                <v-card>
                    <v-card-text>
                        <ul class="simple-list">
                            <li class="hover-line-highlight">
                                <a target="_blank" href="https://www.google.com/maps/dir/44.8703811,10.8166522/vr+metagames/@44.8197379,10.7501583,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x477ff34644a5efb1:0xc99febe9f2bbf4dc!2m2!1d10.880918!2d44.7793981">
                                    <font-awesome-icon :icon="['fas', 'location-dot']" />
                                    {{ contactAddressStreet }}
                                </a>
                            </li>
                            <li class="hover-line-highlight">
                                <a target="_blank" href="https://www.google.com/maps/dir/44.8703811,10.8166522/vr+metagames/@44.8197379,10.7501583,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x477ff34644a5efb1:0xc99febe9f2bbf4dc!2m2!1d10.880918!2d44.7793981">
                                    <font-awesome-icon :icon="['fas', 'city']" />
                                    {{ contactAddressCity }} ({{ contactAddressProvince }}) {{ contactAddressCap }}
                                </a>
                            </li>
                            <li class="hover-line-highlight">
                                <a :href="'mailto:' + contactEmail">
                                    <font-awesome-icon :icon="['fas', 'envelope']" />
                                    {{ contactEmail }}
                                </a>
                            </li>
                            <li class="hover-line-highlight">
                                <a :href="'tel:' + contactNumber.replace(' ','')">
                                    <font-awesome-icon :icon="['fas', 'phone']" />
                                    {{ contactNumber }}
                                </a>
                            </li>
                        </ul>

                        <div class="text-center mt-10">
                            <a :href="socialFacebook"
                               class="button-social-icon mini"
                               target="_blank"
                            >
                            <span class="icon facebook-color">
                                <font-awesome-icon class="px-3" :icon="['fab', 'facebook-f']" />
                            </span>
                            </a>
                            <a :href="socialInstagram"
                               class="button-social-icon mini"
                               target="_blank"
                            >
                            <span class="icon instagram-color">
                                <font-awesome-icon class="px-3" :icon="['fab', 'instagram']" />
                            </span>
                            </a>
                            <a :href="socialTiktok"
                               class="button-social-icon mini"
                               target="_blank"
                            >
                            <span class="icon tiktok-color">
                                <font-awesome-icon class="px-3" :icon="['fab', 'tiktok']" />
                            </span>
                            </a>
                            <a :href="socialYoutube"
                               class="button-social-icon mini"
                               target="_blank"
                            >
                            <span class="icon youtube-color">
                                <font-awesome-icon class="px-3" :icon="['fab', 'youtube']" />
                            </span>
                            </a>
                            <a :href="'https://wa.me/' + contactNumber.replace(' ','')"
                               class="button-social-icon mini"
                               target="_blank"
                            >
                            <span class="icon whatsapp-color">
                                <font-awesome-icon class="px-3" :icon="['fab', 'whatsapp']" />
                            </span>
                            </a>
                            <a :href="'https://t.me/' + contactTelegram"
                               class="button-social-icon mini"
                               target="_blank"
                            >
                            <span class="icon telegram-color">
                                <font-awesome-icon class="px-3" :icon="['fab', 'telegram']" />
                            </span>
                            </a>
                        </div>

                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" lg="9">
                <!-- TODO MOBILE -->
                <v-list class="checkout-list bg-transparent">
                    <v-list-item
                        v-for="schedule in scheduleListCartReadable"
                        :key="'schedule-list-checkout-' + schedule.id"
                        variant="text"
                        :class="{
                            'disabled': disabledScheduleIdArray.includes(schedule.id)
                        }"
                    >
                        <v-list-item-avatar start>
                            <font-awesome-icon size="xl" class="text-primary" :icon="['fas', 'gamepad']" />
                        </v-list-item-avatar>

                        <div class="theme-icon-text">
                            <font-awesome-icon :icon="['fas', 'calendar']" />
                            {{ schedule.date }}
                        </div>

                        <div class="theme-icon-text">
                            <font-awesome-icon :icon="['fas', 'clock']" />
                            {{ schedule.hourStart }}
                            <font-awesome-icon :icon="['fas', 'arrow-right-long']" />
                            {{ schedule.hourEnd }}
                        </div>

                        <v-spacer></v-spacer>

                        <div class="theme-icon-text text-secondary">
                            <font-awesome-icon :icon="['fas', 'play']" />
                            {{
                                t('generic.schedule-details-time-count.' + schedule.durationData.mode, {
                                    hours: schedule.durationData.hours,
                                    minutes: schedule.durationData.minutes
                                })
                            }}
                        </div>
                        <div class="theme-icon-text">
                            <font-awesome-icon :icon="['fas', 'coins']" />
                            {{ schedule.cost }} €
                        </div>
                        <v-list-item-action>
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
                                disabled
                            >
                                <font-awesome-icon size="lg" :icon="['fas', 'circle-info']" />
                            </v-btn>
                            <v-btn
                                icon
                                variant="text"
                                @click="toggleSchedule(schedule.id)"
                            >
                                <font-awesome-icon :icon="['fas', 'xmark']" />
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
                <v-row>
                    <v-col cols="12" lg="6">
                        <v-card class="pa-5 mt-10">
                            <h1>
                                METODI DI PAGAMENTO
                                <br>
                                paypal, carta?, pagamento alla cassa
                            </h1>
                        </v-card>
                    </v-col>
                    <v-col cols="12" lg="6">
                        <div class="cart-total-info mt-10">
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
                                <span class="info"> - {{ scheduleCartTotalCost - scheduleCartTotalCostDiscounted }} €</span>
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
                            <div class="d-flex justify-space-between align-center final-cost">
                                <span class="label">{{ t('checkout-page.final-cost') }}</span>
                                <span class="info">{{ scheduleCartFinalCost }} €</span>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed, toRefs } from "vue";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";
import {
    contactAddressStreet,
    contactAddressCity,
    contactAddressProvince,
    contactAddressCap,
    contactEmail,
    contactNumber,
    contactTelegram,
} from "@/resources/constants";

import UserInfoCard from "@/components/basics/cards/UserInfoCard.vue";

import type { scheduleMap, scheduleReadableMap } from "@/interfaces";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faCalendar,
    faArrowRightLong,
    faClock,
    faPlay,
    faCoins,
    faXmark,
    faGamepad,
    faCircleInfo,
    faEdit,
    faWallet,
    faPrint,
    faEnvelope,
    faLocationDot,
    faCity,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";

import {
    faFacebookF,
    faInstagram,
    faTiktok,
    faYoutube,
    faWhatsapp,
    faTelegram,
} from "@fortawesome/free-brands-svg-icons";

library.add(
    faCalendar,
    faArrowRightLong,
    faClock,
    faPlay,
    faCoins,
    faXmark,
    faGamepad,
    faCircleInfo,
    faEdit,
    faWallet,
    faPrint,
    faEnvelope,
    faLocationDot,
    faCity,
    faPhone,
    faFacebookF,
    faInstagram,
    faTiktok,
    faYoutube,
    faWhatsapp,
    faTelegram,
);


import {

} from "@fortawesome/free-solid-svg-icons";


const { state, getters } = useStore();
const { t } = useI18n();

/**
 * List of schedules
 *
 * @return {object[]}
 */
const scheduleListCart = computed<scheduleMap[]>(() => getters['ecommerce/scheduleListCart']);
/**
 * List of human readable schedules from Cart
 *
 * @return {object[]}
 */
const scheduleListCartReadable = computed<scheduleReadableMap[]>(() => {
    let scheduleArray :scheduleReadableMap[] = [];
    for(let i = scheduleListCart.value.length; i--; ){
        const { id, start, end } = scheduleListCart.value[i];
        scheduleArray.push({
            ...getters['ecommerce/scheduleReadable'](start, end),
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
 * List of id of schedules
 */
const activeScheduleIdArray = computed<string[]>(() => {
    return (scheduleListCart.value).reduce((idArray, { id }) :string[] => {
        if(!disabledScheduleIdArray.value.includes(id)){
            idArray.push(id);
        }
        return idArray;
    }, [] as string[]);
});


const scheduleCartTotalTime = computed(() => getters['ecommerce/getScheduleTotalTime'](activeScheduleIdArray.value));
const scheduleCartTotalCost = computed(() => getters['ecommerce/getScheduleTotalCost'](activeScheduleIdArray.value) / 100);
const scheduleCartTotalCostDiscounted = computed(() => getters['ecommerce/getScheduleTotalCostDiscounted'](activeScheduleIdArray.value) / 100);
const userInfoWalletTime = computed(() => userInfo.value.wallet * scheduleTimeStep.value);
const userInfoWalletTimeRemaining = computed(() => userInfoWalletTime.value - scheduleCartTotalTime.value);

// label of wallet duration
const userInfoWalletDuration = computed<string>(() => {
    const { durationData: { mode, hours, minutes } } = getters['ecommerce/scheduleReadable'](0, userInfoWalletTime.value);
    return t('generic.schedule-details-time-count.' + mode, {
        hours,
        minutes
    });
});
// label of wallet remaining AFTER payment
const userInfoWalletRemainingDuration = computed<string>(() => {
    const { durationData: { mode, hours, minutes } } = getters['ecommerce/scheduleReadable'](0, Math.max(userInfoWalletTimeRemaining.value, 0));
    return t('generic.schedule-details-time-count.' + mode, {
        hours,
        minutes
    });
});
// label of schedule duration
const scheduleCartDuration = computed<string>(() => {
    const { durationData: { mode, hours, minutes } } = getters['ecommerce/scheduleReadable'](0, scheduleCartTotalTime.value);
    return t('generic.schedule-details-time-count.' + mode, {
        hours,
        minutes
    });
});

// The wallet is the number of steps already bought, they count as "standard price" because eventual discounts were already made at the wallet insertion
// real monetary value of wallet steps TODO wallet insertion
const scheduleCartFinalCost = computed(() => Math.max(scheduleCartTotalCostDiscounted.value - userInfo.value.wallet * (scheduleTimeCost.value[0] / 100), 0));



const { userInfo } = toRefs(state.user);
const { scheduleTimeStep, scheduleTimeCost } = toRefs(state.ecommerce);


const toggleSchedule = (id :string) => {
    if(disabledScheduleIdArray.value.includes(id)){
        disabledScheduleIdArray.value.splice(disabledScheduleIdArray.value.indexOf(id), 1);
    }else{
        disabledScheduleIdArray.value.push(id);
    }
};
</script>

<style lang="scss">
#checkout-page{
    .checkout-list{
        &.v-list{
            padding: 0;
            .v-list-item{
                display: flex;
                justify-content: space-between;
                gap: 2em;
                padding: 0.5em 1em;
                border-bottom: 1px solid rgb(var(--v-theme-on-surface));

                &:first-child{
                    border-top: 1px solid rgb(var(--v-theme-on-surface));
                }

                &.disabled{
                    opacity: 0.3;
                }
            }
        }
    }

    .final-cost,
    .wallet-value{
        font-size: 1.5em;
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
            font-size: 1.5em;
        }
    }
}
</style>