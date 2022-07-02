<template>
    <div class="simple-user-card"
        :class="{
            'no-background': !background
        }"
    >
        <img v-show="background"
             class="card-background"
             :src="background"
        />
        <div class="card-content">
            <img v-show="image"
                 class="card-image"
                 :src="image"
                 :alt="title + ' ' + subtitle"
            />
            <div class="card-title">{{ title }}</div>
            <div class="card-subtitle">{{ subtitle }}</div>
            <slot>
                <ul class="card-info">
                    <li
                        v-for="(label, number) in info"
                        :key="'card-info-' + label+number"
                    >
                        <span class="label">{{ label }}</span>
                        <span class="value">{{ number }}</span>
                    </li>
                </ul>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from "vue";

const props = defineProps({
    background: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    subtitle: {
        type: String,
        required: false
    },
    info: {
        type: Object as PropType<Record<string, string | number>>,
        default: () => {
            return {};
        }
    }
});
</script>


<style lang="scss">
// TODO fare meglio card-image, che se non è perfettamente 1:1 si storpia

$simple-user-card-background: #ffffff !default;
$simple-user-card-color: #303336 !default;


.simple-user-card {
    position: relative;
    color: $simple-user-card-color;
    background: $simple-user-card-background;
    width: 100%;
    margin: 0 auto;
    border-radius: 3px;
    text-align: center;

    .card-content{
        padding: 24px;
    }
    .card-image {
        margin: -45% auto 0 auto;
        max-width: 70%;
        border-radius: 50%;
    }
    .card-background{
        width: 100%;
    }

    .card-title {
        font-size: 2em;
    }
    .card-subtitle {
        font-size: 1.2em;
        color: rgba($simple-user-card-color, 0.3);
        margin-bottom: 1em;
    }


    ul.card-info {
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid rgba($simple-user-card-color, 0.3);
        list-style-type: none;
        & > li{
            text-decoration: none;
            padding: 6px 10px 0;
            border-right: 1px solid rgba($simple-user-card-color, 0.3);
            &:last-child{
                border-right: none;
            }
            .label{
                font-size: 1.2em;
                font-weight: 600;
            }
            .value{
                display: block;
                color: rgba($simple-user-card-color, 0.5);
            }
        }
    }

    &.no-background{
        margin-top: 30%;
    }
}
</style>