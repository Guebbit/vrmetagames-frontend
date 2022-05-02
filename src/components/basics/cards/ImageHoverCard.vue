<template>
    <div class="image-hover-card"
        :class="{
            'contained': contained
        }"
    >
        <div class="card-image">
            <img :src="image"/>
        </div>
        <div class="card-content">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ImageHoverCard",

    props: {
        image: {
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
$image-hover-card-height: 600px !default;
$image-hover-card-height-mobile: $image-hover-card-height !default;
$image-hover-card-transition-duration: 0.4s !default;
$image-hover-card-padding: 24px !default;
$image-hover-card-mobile-threshold: 600px !default;

@mixin image-hover-card-mobile{
    .card-image {
        height: 20%;
        img{
            transform: translate(-50%,-50%) scale(1.2);
        }
    }
    .card-content {
        opacity: 1;
        height: 80%;
        padding: $image-hover-card-padding;
    }
}

.image-hover-card {
    position: relative;
    height: $image-hover-card-height;
    padding: 20px;
    margin: 20px;
    transition: box-shadow 0.2s, background-color 0.2s;
    .card-image {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        transition: height $image-hover-card-transition-duration;
        img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            transition: width $image-hover-card-transition-duration, transform $image-hover-card-transition-duration;
            display: block;
            width: 100%;
            // object-fit: cover;
        }
    }
    .card-content {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0;
        opacity: 0;
        padding: 0 $image-hover-card-padding;
        overflow: hidden;
        transition: opacity $image-hover-card-transition-duration, height $image-hover-card-transition-duration, padding $image-hover-card-transition-duration;
    }

    &.contained{
        .card-image {
            overflow: hidden;
        }
    }

    &.active,
    &:hover {
        @include image-hover-card-mobile;
    }
    &.mobile-active{
        @media (max-width: $image-hover-card-mobile-threshold){
            @include image-hover-card-mobile;
        }
    }

    @media (max-width: $image-hover-card-mobile-threshold){
        height: $image-hover-card-height-mobile;
    }
}
</style>