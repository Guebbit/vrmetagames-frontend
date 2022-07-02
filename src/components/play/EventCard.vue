<template>
    <EventLongCard
        v-if="schedule"
        class="play-event-card"
        :time="schedule.start"
        image="https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-main-1.png"
        :color="primary || themeColors.secondary"
        :text="themeColors['on-surface']"
        :background="themeColors.surface"
        :height="150"
    >
        <div class="card-main-info">
            <div class="theme-icon-text">
                <font-awesome-icon :icon="['fas', 'clock']" />
                {{ scheduleReadable?.hourStart }}
                <font-awesome-icon :icon="['fas', 'arrow-right-long']" class="text-white" />
                {{ scheduleReadable?.hourEnd }}
            </div>
            <div class="theme-icon-text">
                <font-awesome-icon :icon="['fas', 'play']" />
                {{ labelDuration }}
            </div>
            <div class="theme-icon-text">
                <font-awesome-icon :icon="['fas', 'coins']" />
                {{ scheduleReadable?.cost }} €
            </div>
        </div>

        <div class="card-chips-and-actions">
            <div class="card-chips">
                <v-chip
                    v-for="([ variant, icon, color, label ], index) in statusList"
                    :key="'schedule-chip-' + index"
                    :color="color"
                    :variant="variant"
                >
                    <font-awesome-icon :icon="['fas', icon]" class="mr-2" />
                    {{ label }}
                </v-chip>
            </div>

            <div class="card-actions">
                <v-btn
                    v-show="showConfirmButton"
                    :color="secondary || themeColors.primary"
                    @click="emit('button:confirm')"
                >
                    {{ t('generic.confirm') }}
                    <font-awesome-icon :icon="['fas', 'check']" />
                </v-btn>
                <v-btn
                    v-show="showCancelButton"
                    variant="outlined"
                    @click="emit('button:cancel')"
                >
                    {{ t('generic.cancel') }}
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </v-btn>
            </div>
        </div>
    </EventLongCard>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vuetifyColors from "vuetify/lib/util/colors";
import { useTheme } from 'vuetify'
import EventLongCard from "@/components/basics/cards/EventLongCard.vue";
import type { scheduleMap, scheduleReadableMap } from "@/interfaces";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCalendar, faArrowRightLong, faClock, faPlay, faCoins, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
library.add(faCalendar, faArrowRightLong, faClock, faPlay, faCoins, faCheck, faXmark);

const { getters } = useStore();
const { t } = useI18n();
const { global: { current: { value: { colors: themeColors } } } } = useTheme();


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
    showConfirmButton: {
        type: Boolean,
        default: () => {
            return true;
        }
    },
    showCancelButton: {
        type: Boolean,
        default: () => {
            return true;
        }
    }
});

const emit = defineEmits([
    'button:confirm',
    'button:cancel'
]);

const schedule = computed<scheduleMap>(() => getters['ecommerce/getItem']("scheduleRecords", props.id));

const scheduleReadable = computed<scheduleReadableMap>(() => {
    return getters['ecommerce/scheduleReadable'](schedule.value.start, schedule.value.end);
});

const statusList = computed<string[][]>(() => {
    const arrayIconLabels :string[][] = [];
    const { online = true, confirmed = false, canceled = false, unsaved = false, paid = false } = schedule.value;
    // if(!online)
    //     arrayIconLabels.push([undefined, 'check', vuetifyColors.red.base, t('schedule-card.offline-chip') as string]);
    if(online)
        arrayIconLabels.push(['outlined', 'check', vuetifyColors.green.base, t('schedule-card.online-chip') as string]);
    if(confirmed)
        arrayIconLabels.push([undefined, 'check', themeColors.secondary, t('schedule-card.confirmed-chip') as string]);
    if(!confirmed)
        arrayIconLabels.push([undefined, 'check', vuetifyColors.shades.white, t('schedule-card.not-confirmed-chip') as string]);
    if(canceled)
        arrayIconLabels.push(['outlined', 'check', vuetifyColors.red.base, t('schedule-card.canceled-chip') as string]);
    if(paid)
        arrayIconLabels.push([undefined, 'check', themeColors.primary, t('schedule-card.paid-chip') as string]);
    // for UX\UI only I consider unsaved and offline the same
    if(unsaved || !online)
        arrayIconLabels.push(['outlined', 'check', vuetifyColors.yellow.darken1, t('schedule-card.unsaved-chip') as string]);
    return arrayIconLabels;
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
@import 'src/assets/scss/main/global';

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
        display: flex;
        justify-content: space-between;
        align-items: end;
        flex-direction: column;
        gap: 24px;
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