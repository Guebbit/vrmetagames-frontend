<template>
    <ImageHoverCard
        class="station-card"
        :image="image"
    >
        <v-card
            class="theme-elevation-secondary border-secondary"
            :class="{
                'countdown-mode': countdownObject.daysOnly < 1
            }"
            variant="outlined"
            elevation="12"
            rounded
        >
            <h3 class="item-title text-center">Postazione <span>{{ type }}</span></h3>

            <div v-if="!available" class="card-content-s">
                <div class="item-countdown">
                    <span v-show="countdownObject.hours > 0">
                        {{ String(countdownObject.hours).padStart(2, '0') }}
                    </span>
                    <span>
                        {{ String(countdownObject.minutes).padStart(2, '0') }}
                    </span>
                    <span>
                        {{ String(countdownObject.seconds).padStart(2, '0') }}
                    </span>
                </div>
                <time :datetime="timeText">
                    <span>{{ dateText }}</span>
                    {{ timeText }}
                </time>
                <span class="status-circle"
                      :class="[available ? 'online' : 'offline']"
                />
            </div>
            <div v-else class="card-content-s">
                <p class="status-alert">Disponibile</p>
                <span class="status-circle"
                      :class="[available ? 'online' : 'offline']"
                />
            </div>

            <div class="card-actions">
                <v-btn variant="outlined"
                       class="border-secondary"
                       elevation="12"
                >
                    {{ t( available ? 'generic.play-now' : 'generic.book-now') }}
                </v-btn>
            </div>
        </v-card>
    </ImageHoverCard>
</template>

<script lang="ts">
// TODO countdownStructure MIXIN
// https://vuejs.org/guide/reusability/composables.html#what-is-a-composable

import { defineComponent } from "vue";
import { secondsToTime } from "@guebbit/javascript-library";
import { useI18n } from "vue-i18n";
import dayjs from 'dayjs';

import ImageHoverCard from "@/components/basics/cards/ImageHoverCard.vue";

const { t } = useI18n();

export default defineComponent({
    name: "StationCard",

    components: {
        ImageHoverCard
    },

    data: () => {
        return {
            today: new Date(),
            interval: 0
        }
    },

    props: {
        image: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        time: {
            type: Number,
            required: true
        },
        number: {
            type: Number,
            default: () => {
                return 0;
            }
        },
        available: {
            type: Boolean,
            default: () => {
                return false;
            }
        }
    },

    computed: {
        dateText() {
            return dayjs(this.time).format('DD/MM');
        },
        timeText() {
            return dayjs(this.time).format('HH:mm');
        },

        // millisconds of difference, 0 is the minimum
        difference () :number {
            return Math.max(0, this.time - this.today.getTime());
        },

        countdownObject() :Record<string, number> {
            return secondsToTime(this.difference)
        }
    },

    beforeUnmount() {
        // prevent memory leak
        clearInterval(this.interval)
    },

    mounted(){
        this.interval = setInterval(() => {
            this.today = new Date();
        }, 1000)
    }
});
</script>

<style lang="scss">
.station-card{
    padding: 0;

    .v-card{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        padding: 12px;

        // fallback
        background-color: rgba(#fff, 0.5);
        @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
            -webkit-backdrop-filter: blur(6px);
            backdrop-filter: blur(6px);
            background-color: transparent;
        }
    }
    
    .card-content-s{
        flex-grow: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .item-title{
        font-size: 2em;
        line-height: 1.2;
    }

    time{
        display: block;
        font-size: 2em;
        span{
            font-size: 70%;
            opacity: 0.5;
        }
    }

    .item-countdown{
        display: none;
    }

    .status-alert{
        margin-bottom: 12px;
        font-size: 1.5em;
    }
    .status-circle{
        position: absolute;
        bottom: 24px;
        right: 12px;
    }

    &.countdown-mode{
        time{
            opacity: 0.5;
            font-size: 1.2em;
        }
        .item-countdown{
            display: block;
            font-size: 2.5em;
            span{
                &:last-child{
                    opacity: 0.5;
                }
                &:not(:last-child){
                    &:after{
                        content: ':';
                    }
                }
            }
        }
    }
}
</style>