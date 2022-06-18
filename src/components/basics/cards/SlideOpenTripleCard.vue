<template>
    <div class="slide-open-triple-card"
         :class="{
            'contained': contained
         }"
         :style="{
            '--slide-open-triple-card-primary': primary,
            '--slide-open-triple-card-secondary': secondary,
         }"
    >
        <div class="card-left">
            <img class="background-image"
                 :src="backgroundLeft || image"
            />
            <div class="card-content">
                <slot name="left" />
            </div>
        </div>
        <div class="card-right">
            <img class="card-image"
                 :src="image"
            />
            <img class="background-image"
                 :src="backgroundRight || image"
            />
            <div class="card-content">
                <slot name="right" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// TODO https://codepen.io/JavaScriptJunkie/pen/vzWPbV
import { defineComponent } from "vue";

export default defineComponent({
    name: "SlideOpenTripleCard",

    props: {
        image: {
            type: String,
            required: false
        },
        backgroundLeft: {
            type: String,
            required: false
        },
        backgroundRight: {
            type: String,
            required: false
        },

        primary: {
            type: String,
            required: false
        },
        secondary: {
            type: String,
            required: false
        },

        contained: {
            type: Boolean,
            default: () => {
                return false;
            }
        }
    }
});
</script>

<style lang="scss">
// TODO miglior simmetria. (ADD .left.card-image & .center-card-image)

@use "sass:math";
$slide-open-triple-card-mobile-threshold: 600px !default;
$slide-open-triple-card-text: #fff !default;
$slide-open-triple-card-primary: #0c1f2c !default;
$slide-open-triple-card-secondary: #CB1F40 !default;
$slide-open-triple-card-duration: 0.4s !default;
$slide-open-triple-card-padding: 48px !default;

.slide-open-triple-card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    color: $slide-open-triple-card-text;
    // overflow: hidden;

    .background-image{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }
    .card-image{
        position: absolute;
        max-height: 120%;
        max-width: 50%;
        transition: left $slide-open-triple-card-duration;
    }

    .card-left,
    .card-right{
        display: flex;
        position: relative;
        width: 100%;
        border-radius:24px;
        transition: transform $slide-open-triple-card-duration, background-color $slide-open-triple-card-duration;
    }

    .card-left{
        background: $slide-open-triple-card-secondary;
        z-index: 1;
        transform: translateX(25%);
        .background-image {
            opacity: 0.2;
        }
    }
    .card-right{
        justify-content: flex-end;
        background: $slide-open-triple-card-primary;
        z-index: 2;
        transform: translateX(-25%);
        .card-image {
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
        .background-image{
            opacity: 0.2;
        }
    }

    .card-content {
        padding: $slide-open-triple-card-padding;
    }

    &.active,
    &:hover{
        .card-left,
        .card-right {
            transform: translateX(0);
        }
        .card-right {
            .card-image{
                left: -25%;
            }
        }
    }

    @media (max-width: $slide-open-triple-card-mobile-threshold){
        flex-direction: column;
        .card-left,
        .card-right {
            transform: translateX(0);
            justify-content: center;
        }
        .card-left{
            padding-right: 0;
            padding-bottom: $slide-open-triple-card-padding;
        }
        .card-right{
            padding-left: 0;
            padding-top: $slide-open-triple-card-padding;
            .card-image{
                top: 0;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

        .card-content {
            padding: math.div($slide-open-triple-card-padding, 2);
        }

        &.active,
        &:hover{
            .card-left,
            .card-right {
                transform: translateX(0);
            }
        }
    }

    &.contained{
        .background-image{
            object-fit: contain;
        }
    }
}

</style>