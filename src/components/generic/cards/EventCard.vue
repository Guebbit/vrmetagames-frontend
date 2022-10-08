<template>
    <EventLongCard
		v-if="!mini"
        class="play-event-card"
        :time="schedule.start"
        image="https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-main-1.png"
        :color="primary || themeColors.secondary"
        :text="themeColors['on-surface']"
        :background="themeColors.surface"
    >
        <div class="card-main-info">
            <div class="simple-icon-text">
                <font-awesome-icon :icon="['fas', 'clock']" />
                {{ scheduleReadable?.hourStart }}
                <font-awesome-icon :icon="['fas', 'arrow-right-long']" class="text-white" />
                {{ scheduleReadable?.hourEnd }}
            </div>
            <div class="simple-icon-text">
                <font-awesome-icon :icon="['fas', 'play']" />
                {{ labelDuration }}
            </div>
            <div class="simple-icon-text">
                <font-awesome-icon :icon="['fas', 'coins']" />
                {{ scheduleReadable?.cost }} €
            </div>
        </div>

        <div class="card-chips-and-actions d-flex justify-space-between align-items-end flex-column flex-gap-24">
            <div class="card-chips d-flex justify-end">
                <v-chip
                    v-for="({ variant, icon, color, title }, index) in statusList"
                    :key="'schedule-chip-' + index"
                    :color="color"
                    :variant="variant"
					size="small"
                >
                    <font-awesome-icon :icon="['fas', icon]" class="mr-3" />
                    {{ title }}
                </v-chip>
            </div>

            <div class="card-actions d-flex justify-end">
                <v-btn
                    v-show="showConfirmButton && !schedule.expired"
					variant="elevated"
                    :color="secondary || themeColors.secondary"
                    @click="emit('click:button:confirm')"
                >
                    {{ t('generic.confirm') }}
                    <font-awesome-icon class="ml-3" :icon="['fas', 'check']" />
                </v-btn>
				<v-btn
					v-show="showRenewButton && schedule.expired"
					variant="outlined"
					:color="primary || themeColors.primary"
					@click="emit('click:button:renew')"
				>
					{{ t('generic.renew') }}
					<font-awesome-icon class="ml-3" :icon="['fas', 'refresh']" />
				</v-btn>
                <v-btn
                    v-show="showCancelButton && !schedule.expired"
                    variant="outlined"
					:disabled="schedule.imminent"
                    @click="emit('click:button:cancel')"
                >
                    {{ schedule.paid ? t('schedule-card.cancel') : t('schedule-card.remove') }}
                    <font-awesome-icon class="ml-3" :icon="['fas', 'trash-can']" />
                </v-btn>
            </div>
        </div>
    </EventLongCard>

	<v-card v-else
		class="w-100 my-2"
		color="light"
		elevation="12"
	>
		<v-card-text class="d-flex justify-space-between align-center">
			<div>
				<font-awesome-icon size="lg" class="text-primary mx-5" :icon="['fas', 'calendar']" />
				{{ scheduleReadable?.date }}
				<font-awesome-icon size="lg" class="text-primary mx-5" :icon="['fas', 'clock']" />
				{{ scheduleReadable?.hourStart }}
				<font-awesome-icon class="mx-2" :icon="['fas', 'arrow-right-long']" />
				{{ scheduleReadable?.hourEnd }}
			</div>
			<div class="card-chips d-flex justify-end flex-gap-12">
				<v-chip
					v-for="({ variant, icon, color, title }, index) in statusList"
					:key="'schedule-chip-' + index"
					:color="color"
					:variant="variant"
					size="small"
				>
					<font-awesome-icon :icon="['fas', icon]" class="mr-3" />
					{{ title }}
				</v-chip>
			</div>
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useTheme } from "vuetify";
import { scheduleStates, type scheduleStatesMap } from "@/resources/constants";
import EventLongCard from "@/components/basics/cards/EventLongCard.vue";
import useScheduleHelpers, { type scheduleReadableMap } from "@/resources/composables/useScheduleHelpers";
import type { scheduleMap } from "@/interfaces";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCalendar, faArrowRightLong, faClock, faPlay, faCoins, faCheck, faRefresh, faTrashCan } from "@fortawesome/free-solid-svg-icons";

library.add(faCalendar, faArrowRightLong, faClock, faPlay, faCoins, faCheck, faRefresh, faTrashCan);

const { t } = useI18n();
const { global: { current: { value: { colors: themeColors } } } } = useTheme();

const emit = defineEmits([
	'click:button:confirm',
	'click:button:cancel',
	'click:button:renew'
]);

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    primary: {
        type: String,
        required: false
    },
    secondary: {
        type: String,
        required: false
    },
	dateFormat: {
		type: String,
		default: () => 'YYYY-MM-DD'
	},
	timeFormat: {
		type: String,
		default: () => 'HH:mm:ss'
	},
    showConfirmButton: {
        type: Boolean,
        default: () => true
    },
    showCancelButton: {
        type: Boolean,
        default: () => true
    },
	showRenewButton: {
		type: Boolean,
		default: () => true
	},
	admin: {
		type: Boolean,
		default: () => false
	},
	mini: {
		type: Boolean,
		default: () => false
	},
});

/**
 * Schedule managing toolbox
 */
const {
	getSchedule,
	translateScheduleUI
} = useScheduleHelpers(props.dateFormat, props.timeFormat);

/**
 * @return {Object}
 */
const schedule = computed<scheduleMap | undefined>(() => getSchedule(props.id));
const scheduleReadable = computed<scheduleReadableMap>(() => {
	const { start, end } = schedule.value || {};
	return translateScheduleUI(start, end);
});

/**
 * List of status with icon (TODO), title and description, to list as pills
 */
const statusList = computed<scheduleStatesMap[]>(() => {
    const statusArray :scheduleStatesMap[] = [];
    const { online = true, confirmed = false, canceled = false, unsaved = false, paid = false, imminent = false, expired = false } = schedule.value || {};
	if(props.admin && !online)
		statusArray.push({
			...scheduleStates.offline,
			title: t(scheduleStates.offline.title),
			description: t(scheduleStates.offline.description)
		});
	if(props.admin && online)
		statusArray.push({
			...scheduleStates.online,
			title: t(scheduleStates.online.title),
			description: t(scheduleStates.online.description)
		});
	if(confirmed && !paid)
		statusArray.push({
			...scheduleStates.confirmed,
			title: t(scheduleStates.confirmed.title),
			description: t(scheduleStates.confirmed.description)
		});
	if(canceled)
		statusArray.push({
			...scheduleStates.canceled,
			title: t(scheduleStates.canceled.title),
			description: t(scheduleStates.canceled.description)
		});
	if(paid)
		statusArray.push({
			...scheduleStates.paid,
			title: t(scheduleStates.paid.title),
			description: t(scheduleStates.paid.description)
		});
	if(imminent)
		statusArray.push({
			...scheduleStates.imminent,
			title: t(scheduleStates.imminent.title),
			description: t(scheduleStates.imminent.description)
		});
	if(!confirmed && !expired && !canceled)
		statusArray.push({
			...scheduleStates.notConfirmed,
			title: t(scheduleStates.notConfirmed.title),
			description: t(scheduleStates.notConfirmed.description)
		});
	if(expired && !(!paid || !confirmed || !canceled))
		statusArray.push({
			...scheduleStates.expired,
			title: t(scheduleStates.expired.title),
			description: t(scheduleStates.expired.description)
		});
	if(unsaved || !online)
		statusArray.push({
			...scheduleStates.unsaved,
			title: t(scheduleStates.unsaved.title),
			description: t(scheduleStates.unsaved.description)
		});
    return statusArray;
});

const labelDuration = computed<string>(() => {
    const { durationData: { mode = 0, hours = 0, minutes = 0 } = {} } = scheduleReadable.value;
    return t('generic.schedule-details-time-count.' + mode, {
        hours,
        minutes
    }) as string;
});
</script>

<style lang="scss">
@import '../../../assets/scss/main/global';

.play-event-card {
    .card-content{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .card-main-info{
        flex-grow: 2;
        padding-right: 0.5em;
        font-size: 1.2em;
        svg{
            color: rgb(var(--v-theme-primary));
        }
    }
    .card-chips-and-actions{
        .card-chips{
            .v-chip{
                margin: 6px;
            }
        }
        .card-actions{
            & > * {
                margin: 0 6px;
                &:first-child{
                    margin-left: 0;
                }
                &:last-child{
                    margin-right: 0;
                }
            }
        }
    }
    @include media-mobile(){
        .card-chips{
            .v-chip{
                font-size: 0.6rem;
                padding: 0 8px;
                &.v-chip--density-default {
                    height: 24px;
                }
            }
        }
    }
}
</style>