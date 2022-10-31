<template>
    <div ref="card" class="fc-event-content-card">
		<!-- mirror schedule (user selection) -->
        <div v-show="isMirror"
             class="mirror-card"
             :style="{
                'font-size': scheduleHeight > 80 ? '1.5em' : '1em'
             }"
        >
            <b class="time">{{ time }}</b>
            <p v-show="scheduleHeight > 50">
				{{ completeScheduleText }}
            </p>
        </div>
		<!-- regular schedule -->
        <div v-show="!isMirror"
             class="regular-card"
             :style="{
                'font-size': scheduleHeight > 80 ? '1.5em' : '0.7em'
             }"
        >
			<img :src="schedule.user?.avatar ? schedule.user?.avatar.src : defaultUserAvatarSrc">
			<component
				v-if="schedule.station"
				:is="schedule.station.icon"
				role="icon"
				:aria-label="schedule.station.label"
				class="ml-2"
			/>
            <div class="ml-3">
                <b class="time">{{ time }}</b>
                <span v-show="scheduleHeight > 80"><br> {{ schedule.username }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, nextTick, onMounted, onUpdated, type PropType } from "vue";
import { defaultUserAvatarSrc } from "@/resources/constants";
import type { scheduleMapExtended } from "@/interfaces";

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
        default: () => false
    },
	schedule: {
		type: Object as PropType<scheduleMapExtended>,
		required: false
	},
    username: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
	completeScheduleText: {
		type: String,
		default: () => ""
	},
});


/**
 * UI
 */
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
		svg,
        img{
            max-width: 4em;
            max-height: 4em;
            border-radius: 3px 0 6px 0;
            object-fit: cover;
        }
		svg{
			fill: rgb(var(--v-theme-on-surface))
		}
    }
    .time{
        font-size: 1.2em;
    }
}
</style>