<template>
    <svg class="goodkatz-waves"
         :style="{
            '--goodkatz-waves-color': color
         }"
         xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         viewBox="0 24 150 28"
         preserveAspectRatio="none"
         shape-rendering="auto"
    >
        <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="wave-parallax">
            <use v-for="wave in waves"
                 :key="'wave-' + wave"
                 xlink:href="#gentle-wave" x="48" :y="wave * 2"
            />
        </g>
    </svg>
</template>

<script setup lang="ts">
// WARNING: hybrid css only & vue (non sarebbe necessario, ma è comodo)
import { defineProps } from "vue";

defineProps({
    waves: {
        type: Number,
        default: () => {
            return 4
        }
    },
    color: {
        type: String,
        default: () => {
            return '255,255,255';
        }
    }
})
</script>

<style lang="scss">
$goodkatz-waves-height: 100px !default;
$goodkatz-waves-mobile-height: 50px !default;
$goodkatz-waves-color: var(--goodkatz-waves-color) !default;
$goodkatz-waves-speed: 8 !default;
$goodkatz-waves-mobile-threshold: 600px !default;

.goodkatz-waves {
    position:relative;
    width: 100%;
    margin-bottom:-7px; // Fix for safari gap
    height: $goodkatz-waves-height;

    .wave-parallax{
        & > use {
            animation: goodkatz-waves-animation 25s cubic-bezier(.55,.5,.45,.5) infinite;

            @for $i from 1 through 5 {
                &:nth-child(#{$i}) {
                    animation-delay: -#{$i + 3}s;
                    animation-duration: #{$goodkatz-waves-speed + ($i * 3)}s;
                    fill: rgba($goodkatz-waves-color, #{1 - ($i * 0.2)});
                }
            }
            &:last-child {
                fill: rgb($goodkatz-waves-color);
            }
        }
    }
    @media (max-width: $goodkatz-waves-mobile-threshold){
        height: $goodkatz-waves-mobile-height;
    }
}

@keyframes goodkatz-waves-animation {
    0% {
        transform: translate3d(-90px,0,0);
    }
    100% {
        transform: translate3d(85px,0,0);
    }
}
</style>