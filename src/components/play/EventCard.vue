<template>
    <div class="fc-event-content-card">
        <EventLongCard
            :time="new Date(schedule.start).getTime()"
            image="https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-main-1.png"
            :color="$vuetify.theme.themes.default.colors.primary"
        >
            <btn @click="confirmEvent">DICK</btn>
        </EventLongCard>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue';
import { useStore } from "@/store";
import EventLongCard from "@/components/basics/cards/EventLongCard.vue";

const { getters: { ecommerce: { getItem } } } = useStore();

const props = defineProps({
    id: {
        type: String,
        required: true
    },
});

const emit = defineEmits([
    'button:confirm'
]);

const schedule = computed(() => getItem("scheduleRecords", props.id));
console.log("AAAAAAAAAAA", props.id, schedule)


const confirmEvent = () => {
    emit('button:confirm');
}
</script>

<script lang="ts">
export default {
    name: 'PlayEventCard'
}
</script>

<style lang="scss">
.fc-event-content-card {

}
</style>