<template>
    <div class="fc-event-content-card">
        <EventLongCard
            :time="new Date(schedule.start).getTime()"
            image="https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-main-1.png"
            :color="primary || $vuetify.theme.themes.default.colors.secondary"
        >
            {{schedule}}
            <br>
            {{readableSchedule}}
            <br>
            {{labelDuration}}
            <v-btn
                :color="secondary || $vuetify.theme.themes.default.colors.primary"
                @click="emit('button:confirm')"
            >
                Conferma
            </v-btn>
            <v-btn
                :color="secondary || $vuetify.theme.themes.default.colors.primary"
                @click="emit('button:remove')"
            >
                Cancella
            </v-btn>
        </EventLongCard>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue';
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";
import EventLongCard from "@/components/basics/cards/EventLongCard.vue";

import type { scheduleMap, scheduleReadableMap } from "@/interfaces";

const { getters } = useStore();
const { t } = useI18n();

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
    }
});

const emit = defineEmits([
    'button:confirm'
]);

const schedule = computed<scheduleMap>(() => getters['ecommerce/getItem']("scheduleRecords", props.id));

const readableSchedule = computed<scheduleReadableMap>(() => {
    return getters['ecommerce/scheduleReadable'](schedule.value.start, schedule.value.end);
});

const labelDuration = computed<string>(() => {
    const { durationData: { mode, hours, minutes } = {} } = readableSchedule.value;
    return t('play.schedule-details-time-count.' + mode, {
        hours,
        minutes
    }) as string;
});
</script>

<script lang="ts">
export default {
    name: 'PlayEventCard'
}
</script>

<style lang="scss">
.fc-event-content-card {
    // TODO
}
</style>