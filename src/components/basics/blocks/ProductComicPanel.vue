<template>
    <!-- TODO generico, rimuovere vuetify -->
    <Panel
        class="product-comic-panel"
        v-bind="$props"
        centered
        :backgroundImage="backgroundImage"
        :style="{
            '--product-comic-panel-primary': primary,
            '--product-comic-panel-secondary': secondary,
        }"
    >
        <!-- TODO background => background || backgroundMedia -->
        <template #background >
            <slot name="background" />
        </template>
        <div>
            <slot name="image">
                <!-- TODO -->
                <img
                    class="panel-image"
                    :src="image"
                    :alt="'title'"
                    :title="'title + subtitle'"
                    style="width: 200px; height: 200px;"
                />
            </slot>
        </div>
        <div>
            <slot name="content">
                <h3 class="panel-title">{{ title }}</h3>
                <h4 class="panel-subtitle">{{ subtitle }}</h4>
                <div class="panel-chips">
                    <v-chip
                        v-for="(badge, i) in tags"
                        :key="'badge-' + i"
                        class="ma-2"
                        text-color="white"
                    >
                        {{ badge }}
                    </v-chip>
                </div>
                <p class="panel-text" v-html="text"></p>
            </slot>
            <slot name="actions"></slot>
        </div>
    </Panel>
</template>


<script setup lang="ts">
import { defineProps } from "vue";
import Panel from "guebbit-vue-library/src/components/blocks/Panel.vue";

defineProps({
    title: {
        type: String,
        default: () => {
            return "";
        },
    },
    subtitle: {
        type: String,
        default: () => {
            return "";
        },
    },
    text: {
        type: String,
        default: () => {
            return "";
        },
    },

    image: {
        type: String,
        required: false,
    },
    backgroundImage: {
        type: String,
        required: false,
    },
    primary: {
        type: String,
        required: false
    },
    secondary: {
        type: String,
        required: false
    },

    categories: {
        type: Array,
        default: () => {
            return []
        },
    },
    tags: {
        type: Array,
        default: () => {
            return []
        },
    },

    available: {
        type: Boolean,
        default: () => {
            return false;
        },
    },
    price: {
        type: Number,
        default: 0,
    },
    currency: {
        type: String,
        default: "€",
    },
});
</script>


<style lang="scss">
$product-comic-panel-primary: var(--product-comic-panel-primary) !default;
$product-comic-panel-secondary: var(--product-comic-panel-secondary) !default;
$product-comic-panel-on-surface: #ffffff !default;
$product-comic-panel-shadow: #000000 !default;
$product-comic-panel-duration: 0.4s !default;
$product-comic-panel-mobile-threshold: 900px !default;

.product-comic-panel{
    overflow: hidden;

    &.hero-panel{
        .panel-shadow{
            opacity: 1;
            background: linear-gradient(to bottom,
                $product-comic-panel-shadow,
                rgba($product-comic-panel-shadow, 0.7),
                rgba($product-comic-panel-shadow, 0.5),
                rgba($product-comic-panel-shadow, 0.7),
                $product-comic-panel-shadow
            );
        }

        .panel-background{
            filter: blur(10px); // grayscale(0.5);
        }

        .panel-content{
            margin: 0 auto;
            max-width: 1200px;

            & > div{
                display: flex;
                justify-content: center;
                align-items: center;
                & > * {
                    width: 50%;
                }

                .panel-image{
                    margin: 0 auto;
                }

                .panel-title,
                .panel-subtitle,
                .panel-text{
                    text-shadow: #000 0 0 0.4em;
                }
                .panel-title{
                    font-size: 2.5em;
                    margin: 0 0 12px 0;
                    color: $product-comic-panel-primary;
                }
                .panel-subtitle{
                    font-size: 1.5em;
                    margin: 0 0 24px 0;
                    color: $product-comic-panel-primary;
                    opacity: 0.8;
                }
                .panel-text{
                    font-size: 1.1em;
                    margin-top: 1em;
                }

                .divider{
                    margin: 20px 0 20px 0;
                }

                @media (max-width: $product-comic-panel-mobile-threshold){
                    flex-direction: column;
                    gap: 24px;
                    padding: 0 24px;
                    & > * {
                        width: 100%;
                    }
                }
            }
        }
    }
}
</style>