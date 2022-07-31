<template>
    <div
        class="panel-switch"
        :class="{
            'secondary-mode': modelValue
        }"
        :style="{
            '--panel-switch-image': 'url(' + image + ')'
        }"
    >
        <div class="modal-primary-content">
            <slot name="primary-content" />
        </div>
        <div class="modal-content">
            <div class="panel-switch-panel"
                 :style="{
                    cursor: !disablePanelSwitch ? 'pointer' : null
                 }"
            >
                <div class="modal-primary-switch"
                     @click="!disablePanelSwitch ? emit('update:modelValue', true) : null"
                >
                    <slot name="secondary-content" />
                </div>
                <div class="modal-secondary-switch"

                     @click="!disablePanelSwitch ? emit('update:modelValue', false) : null"
                >
                    <slot name="primary-switch" />
                </div>
            </div>
            <div class="modal-secondary-content">
                <slot name="secondary-switch" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps({
    modelValue: {
        type: Boolean,
        default: () => false
    },
    image: {
        type: String,
        required: false
    },
    disablePanelSwitch: {
        type: Boolean,
        default: () => false
    }
});

const emit = defineEmits([
    'update:modelValue'
]);
</script>

<style lang="scss">
@use "sass:math";

// https://codepen.io/suez/details/RpNXOR
$panel-switch-duration: 1.2s !default;
$panel-switch-threshold: 600px !default;
$panel-switch-background: #ffffff !default;
$panel-switch-on-background: #000000 !default;

$panel-switch-image-width: 30% !default;
$panel-switch-form-width: 100% - $panel-switch-image-width !default;


.panel-switch {
    overflow: hidden;
    position: relative;
    width: 100%;
    background: $panel-switch-background;
    color: $panel-switch-on-background;

    .modal-primary-content,
    .modal-secondary-content{
        position: relative;
        width: $panel-switch-form-width;
        height: 100%;
        transition: transform $panel-switch-duration ease-in-out;
    }

    .modal-primary-content{
        transition-timing-function: ease-out;
    }
    .modal-secondary-content{
        transform: translateX(-100%);
    }

    .modal-content {
        overflow: hidden;
        position: absolute;
        left: $panel-switch-form-width;
        top: 0;
        width: 100%;
        height: 100%;
        padding-left: $panel-switch-image-width;
        background: $panel-switch-background;
        transition: transform $panel-switch-duration ease-in-out;
    }

    .panel-switch-panel {
        position: absolute;
        z-index: 2;
        overflow: hidden;
        left: 0;
        top: 0;
        width: $panel-switch-image-width;
        height: 100%;

        &:before,
        &:after {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            z-index: -1;
            transition: transform $panel-switch-duration ease-in-out, background-color $panel-switch-duration ease-in-out;
        }

        // image
        &:before {
            background-image: var(--panel-switch-image);
            background-size: cover;
            width: math.div(100%, $panel-switch-image-width) * 100%;
        }

        // shadow
        &:after {
            background: rgba(0,0,0,0.6);
            width: 100%;
        }

        //
        & > * {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            transition: transform $panel-switch-duration ease-in-out;

            &.modal-secondary-switch {
                transform: translateX(-150%);
            }
        }
    }

    &.secondary-mode{
        .modal-primary-content{
            transition-timing-function: ease-in-out;
            transition-duration: $panel-switch-duration;
            transform: translateX($panel-switch-form-width);
        }

        .modal-secondary-content{
            transform: translateX(0);
        }

        .modal-content {
            transform: translateX($panel-switch-form-width * -1);
        }

        .panel-switch-panel {
            &:before {
                // TODO no transform = still (mode)
                transform: translateX(50%);
            }

            & > * {
                &.modal-primary-switch {
                    transform: translateX(150%);
                }

                &.modal-secondary-switch {
                    transform: translateX(0);
                }
            }
        }
    }

    @media (max-width: $panel-switch-threshold){
		.panel-switch-panel {
			height: $panel-switch-image-width;
			width: 100%;
		}

        &.secondary-mode{
			/*
            .modal-primary-content{
                transform: translateY($panel-switch-form-width);
            }

            .modal-secondary-content{
                transform: translateY(0);
            }

            .modal-content {
                transform: translateY($panel-switch-form-width * -1);
            }
            */

            .panel-switch-panel {
                &:before {
                    // TODO no transform = still (mode)
                    transform: translateY(50%);
                }

                & > * {
                    &.modal-primary-switch {
                        transform: translateY(150%);
                    }

                    &.modal-secondary-switch {
                        transform: translateY(0);
                    }
                }
            }
        }
    }
}
</style>