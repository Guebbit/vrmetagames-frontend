<template>
    <v-btn :color="type"
           class="inclined-button"
           :class="{
                double: double && double.length > 0,
                cross
           }"
           :style="{
                '--inclined-button-color': color,
                '--inclined-button-background': background,
                '--inclined-button-background-double': double
           }"
           :size="size"
           :to="to"
           elevation="4"
           outlined
           raised
           x-large
    >
        <span class="inclined-button-text">
            <slot />
        </span>
    </v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { RouteLocationRaw } from "vue-router";

export default defineComponent({
    name: "InclinedButton",

    props: {
        type: {
            type: String,
            default: () => {
                return "primary";
            }
        },
        to: {
            type: Object as PropType<RouteLocationRaw>,
            required: false
        },
        size: {
            type: String,
            required: false
        },
        color: {
            type: String,
            required: false
        },
        background: {
            type: String,
            required: false
        },
        double: {
            type: String,
            required: false
        },
        cross: {
            type: Boolean,
            default: () => {
                return false;
            }
        },
    }
});
</script>

<style lang="scss">
.inclined-button{
    margin: 0 12px 12px 12px;
    transform: perspective(10px) rotateX(2deg);
    .inclined-button-text{
        margin-top: 0.3em;
        transform: perspective(10px) rotateX(-2deg);
        transition: transform 0.28s;
        z-index: 1;
        color: var(--inclined-button-color);
    }
    &:hover{
        transform: perspective(10px) rotateX(-2deg);
        .inclined-button-text{
            transform: perspective(10px) rotateX(2deg);
        }
    }

    &.double{
        position: relative;
        &:before{
            content: "";
            position: absolute;
            top: 10%;
            width: 110%;
            height: 110%;
            border-radius: 4px;
            background: var(--inclined-button-background-double);
            z-index: -1;
        }

        // TODO METTERE BUTTON NORMALE. Can't make .double:before under .v-btn background
        &.v-btn{
            background: transparent !important;
            &:after{
                background: var(--inclined-button-background) !important;
                opacity: 1;
                // border: none;
            }
        }
    }

    &.cross{
        // TODO METTERE BUTTON NORMALE poi fare come TrapezoidTitle
    }
}
</style>