<template>
    <div class="panoramic-card">
        <img class="card-image" :src="image">
        <img class="card-background" :src="background">
        <div class="card-aside aside-right">
            <h3 class="card-side-title">
                30 MARCH 2017
                <span>12:37PM</span>
            </h3>
        </div>
        <div class="card-aside aside-left">
            <h3 class="card-side-title">
                ZXCAWDS
                <span>BBBB</span>
            </h3>
        </div>
        <div class="card-content">
            <h2 class="card-title">Mesmerizing Depths</h2>
            <p>Nunc orci metus, ornare non molestie ac, ultrices eget <br /> dolor. Mauris ac
                mattis lectus. Praesent facilisis <br /> malesuada sapien nec pharetra. Fusce eleifend, nisl.
            </p>
            <a class="card-button">
                Learn More<span class="button-hover-effect"></span>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
    background: {
        type: String,
        default: () => {
            return ''
        }
    },
    image: {
        type: String,
        default: () => {
            return ''
        }
    }
});
</script>

<style lang="scss">
// TODO FARE
// https://codepen.io/nathantaylor/pen/WOgBQN
$panoramic-card-background: #000000 !default;
$panoramic-card-on-surface: #ffffff !default;
$panoramic-card-button-color-1: #7b29ff !default;
$panoramic-card-button-color-2: #304ffe !default;
$panoramic-card-border-width: 0.15rem !default;
$panoramic-card-border-duration: 0.3s !default;
$panoramic-card-threshold: 600px !default;

.panoramic-card{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $panoramic-card-background;
    color: $panoramic-card-on-surface;
    // margin: 120px 0;
    // padding-left: 25%;

    .card-aside{
        z-index: 3;
        letter-spacing: 0.2em;
        position: absolute;
        top: 50%;
        transform: translateY(-50%) rotate(-90deg);
        transition: transform $panoramic-card-border-duration ease-out, opacity $panoramic-card-border-duration linear;

        &:before{
            content: '';
            display: inline-block;
            transform: translatey(-0.35rem);
            width: 4rem;
            margin-right: 1.5rem;
            border-bottom: $panoramic-card-border-width solid $panoramic-card-on-surface;
        }

        & > span {
            opacity: 0.25;
        }

        &.aside-right{
            right: 0;
        }

        &.aside-left{
            left: 0;
        }
    }

    .card-image{
        position: absolute;
        top: 50%;
        left: 25%;
        transform: translate(-50%, -50%);
        z-index: 2;
    }
    .card-background{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.15;
    }

    .card-content{
        z-index: 5;
        padding: 80px 0;
        font-size: 1.4em;

        .card-title{
            position: relative;
            font-size: 3em;
            letter-spacing: 0.03em;
            margin-bottom: 0.25em;

            &:before{
                content: "";
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                height: 0.3em;
                z-index: -1;
                transform: translateY(-50%);
                background: linear-gradient(90deg, $panoramic-card-button-color-1, $panoramic-card-button-color-2);
            }
        }

        .card-button{
            position: relative;
            z-index: 2;
            display: inline-block;
            background: rgba($panoramic-card-background,0.2);
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.1em;
            padding: 0.5em 1.5em;
            margin-top: 1.5em;
            cursor: pointer;
            color: $panoramic-card-on-surface;
            border-top: $panoramic-card-border-width solid $panoramic-card-button-color-2;
            border-bottom: $panoramic-card-border-width solid $panoramic-card-button-color-1;
            box-shadow: 0 0.5em 1em rgba($panoramic-card-button-color-1,0.2);
            transition: transform $panoramic-card-border-duration;
            &:before,
            &:after,
            .button-hover-effect{
                content: '';
                position: absolute;
                top: -1%;
                height: 100%;
                width: $panoramic-card-border-width;
                background: linear-gradient($panoramic-card-button-color-2, $panoramic-card-button-color-1);
            }
            &:before{ left: 0; }
            &:after{ right: 0; }
            .button-hover-effect{
                left: -1%;
                width: 100%;
                height: 100%;
                z-index: -1;
                animation: button-hover-effect-rest 10s forwards;
            }
            &:hover{
                transform: translatey(-0.5rem);
                .button-hover-effect{
                    animation: button-hover-effect-swipe $panoramic-card-border-duration forwards;
                }
            }
        }
    }

    @media (max-width: $panoramic-card-threshold){
        &:before{
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba($panoramic-card-background,0.75);
            z-index: 3;
        }

        .card-aside{
            transform: none;
            &.aside-left{
                top: 0;
                left: auto;
                right: 0;
            }
            &.aside-right{
                top: auto;
                bottom: 0;
            }
        }
        .card-content{
            padding: 80px 24px;

            .card-title {
                font-size: 3rem;

                &:before {
                    height: 100%;
                    width: 0.25em;
                    left: -0.5em;
                }
            }
        }
    }
}

@keyframes button-hover-effect-rest{
    0%{
        transform-origin: right center;
        transform: scaleX(0);
    }
    100%{
        transform-origin: right center;
        transform: scaleX(0);
    }
}
@keyframes button-hover-effect-swipe{
    0%{
        transform-origin: left center;
        transform: scaleX(0);
    }
    50%{
        transform-origin: left center;
        transform: scaleX(1);
    }
    51%{
        transform-origin: right center;
        transform: scaleX(1);
    }
    100%{
        transform-origin: right center;
        transform: scaleX(0);
    }
}
</style>