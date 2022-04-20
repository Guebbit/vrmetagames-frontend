<template>
    <component :is="element"
               class="trapezoid-title-wrapper"
               :class="{
                    double: double && double.length > 0
                }"
    >
        <span class="trapezoid-title"
            :class="{
                double: double && double.length > 0,
                outline,
                big,
                cross
            }"
        >
            <slot />
        </span>
    </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "TrapezoidTitle",

    props: {
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
        outline: {
            type: Boolean,
            default: () => {
                return false;
            }
        },
        big: {
            type: Boolean,
            default: () => {
                return false;
            }
        },
        element: {
            type: String,
            default: () => {
                return "h1";
            }
        }
    }
});
</script>

<style lang="scss">
// TOOD MARGINS
.trapezoid-title-wrapper{
    padding: 12px 0 20px 0;
    &.double{
        padding: 24px 0 40px 0;
    }
}
.trapezoid-title {
    position: relative;
    z-index: 1;
    &:after{
        content: '';
        position: absolute;
        top: 5%;
        left: 0;
        width: 90%;
        height: 80%;
        border-radius: 4px;
        background: rgb(var(--v-theme-primary));
        z-index: -1;
        transform: perspective(10px) rotateX(2deg);
        transition: transform 0.28s, background 0.28s;
        opacity: 0.5;
    }
    &:hover{
        &:after{
            background: rgb(var(--v-theme-secondary));
            transform: perspective(10px) rotateX(-1deg);
        }
    }

    &.big{
        &:after {
            top: -10%;
            left: -20%;
            width: 140%;
            height: 110%;
        }
        &.big:not(.cross){
            &:before{
                top: -27%;
                left: -30%;
                width: 160%;
                height: 140%;
            }
        }
    }

    &.double{
        &:before{
            content: '';
            position: absolute;
            top: -10%;
            left: -15%;
            width: 120%;
            height: 110%;
            border-radius: 4px;
            background: rgb(var(--v-theme-secondary));
            z-index: -1;
            transform: perspective(10px) rotateX(2deg);
            transition: transform 0.28s, background 0.28s;
            opacity: 0.5;
        }
        &:hover{
            &:before{
                background: rgb(var(--v-theme-primary));
                transform: perspective(10px) rotateX(-1deg);
            }
        }
        &.cross{
            &:before{
                top: 5%;
                left: 0;
                width: 90%;
                height: 80%;
            }
            &:hover{
                &:before{
                    transform: perspective(10px) rotateX(1deg);
                }
            }
        }
        &.big{
            &:before{
                top: -10%;
                left: -20%;
                width: 140%;
                height: 110%;
            }
        }
    }

    &.outline{
        &:before,
        &:after{
            background: inherit;
            opacity: 1;
        }
        &:hover{
            &:before,
            &:after{
                background: inherit;
            }
        }
        &:after{
            border: 0.1em solid rgb(var(--v-theme-primary));
        }
        &:hover{
            &:after{
                border: 0.1em solid rgb(var(--v-theme-secondary));
            }
        }
        &:before{
            border: 0.1em solid rgb(var(--v-theme-secondary));
        }
        &:hover{
            &:before{
                border: 0.1em solid rgb(var(--v-theme-primary));
            }
        }
    }
}
</style>