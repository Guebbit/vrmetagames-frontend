<template>
    <div ref="card" class="fc-event-content-card">
        <div v-show="isMirror"
             class="mirror-card"
             :style="{
                'font-size': scheduleHeight > 80 ? '1.5em' : '1em'
             }"
        >
            <b class="time">{{ time }}</b>
            <p v-show="scheduleHeight > 50">
                Completa la prenotazione nel box apposito
            </p>
        </div>
        <div v-show="!isMirror"
             class="regular-card"
             :style="{
                'font-size': scheduleHeight > 80 ? '1.5em' : '0.7em'
             }"
        >
            <img :src="image">
            <div>
                <b class="time">{{ time }}</b>
                <span v-show="scheduleHeight > 80"><br> {{ username }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, nextTick, onMounted, onUpdated,  } from 'vue';

defineProps({
    time: {
        type: String,
        required: false
    },
    start: {
        type: Number,
        required: false
    },
    end: {
        type: Number,
        required: false
    },
    isMirror: {
        type: Boolean,
        default: () => {
            return false;
        }
    },
    username: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
});

const card = ref<HTMLDivElement>();
const scheduleHeight = ref(0);

const setScheduleSize = () => {
    scheduleHeight.value = card.value?.clientHeight || 0;
};

onMounted(() => {
    nextTick(setScheduleSize);
});
onUpdated(() => {
    setScheduleSize();
});
</script>

<style lang="scss">
.fc-event-content-card {
    height: 100%;
    // .mirror-card{}
    .regular-card{
        display: flex;
        max-height: 100%;
        img{
            max-width: 4em;
            max-height: 4em;
            margin-right: 1em;
            border-radius: 3px 0 6px 0;
            object-fit: cover;
        }
    }
    .time{
        font-size: 1.2em;
    }
}
</style>