<template>
    <figure class="image-hover-up-card">
        <img :src="image" />
        <figcaption v-show="text">{{ text }}</figcaption>
    </figure>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
    image: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    }
})
</script>


<style lang="scss">
// WARNING: fix width or it will wobble

$image-hover-up-card-height: 400px !default;
$image-hover-up-card-height-mobile: $image-hover-up-card-height !default;
$image-hover-up-card-reflex: #fff !default;
$image-hover-up-card-shadow: #000 !default;
$image-hover-up-card-mobile-threshold: 600px !default;
$image-hover-up-card-transition-duration: 0.4s !default;

.image-hover-up-card {
    height: $image-hover-up-card-height;
    overflow: hidden;
    box-shadow: 0 5px 10px rgba($image-hover-up-card-shadow,0.8);
    transform-origin: center top;
    transform-style: preserve-3d;
    transform: translateZ(0);
    transition: transform $image-hover-up-card-transition-duration;

    &:after{
        position: absolute;
        content: '';
        z-index: 10;
        width: 200%;
        height: 100%;
        top: -90%;
        left: 0;
        opacity: 0.1;
        transform: rotate(45deg);
        background: linear-gradient(to top, transparent, $image-hover-up-card-reflex 15%, rgba($image-hover-up-card-reflex,0.5));
        transition:
            transform $image-hover-up-card-transition-duration,
            top $image-hover-up-card-transition-duration,
            opacity $image-hover-up-card-transition-duration;
    }

    figcaption{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 24px;
        font-size: 1.5em;
        transform: translateY(100%);
        transition: $image-hover-up-card-transition-duration;
    }
    img{
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &:hover {
        box-shadow: 0 8px 16px 3px rgba($image-hover-up-card-shadow,0.6);
        transform: translateY(-3px) scale(1.05) rotateX(15deg);

        &:after {
            transform: rotate(25deg);
            top: -40%;
            opacity: 0.15;
        }

        figcaption {
            transform: none;
        }
    }

    @media (min-width: $image-hover-up-card-mobile-threshold){
        height: $image-hover-up-card-height-mobile;
    }
}
</style>