<template>
    <Panel
        class="action-panel"
        v-bind="$props"
        centered
    >
        <template #backgroundShadow>
            <slot name="backgroundShadow"></slot>
        </template>
        <template #background>
            <slot name="background"></slot>
        </template>
        <template #default>
            <slot>
                <h3 class="panel-title" v-html="title"></h3>
                <p class="panel-text" v-html="text"></p>
            </slot>
            <slot name="action">
                <button class="v-btn btn">
                    {{ buttonText }}
                </button>
            </slot>
        </template>
    </Panel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// WARNING: dependence required
import Panel from "./Panel.vue";

export default defineComponent({
    name: "ActionPanel",

    components: {
        Panel
    },

    props: {
        // text
        title: {
            type: String,
            required: false
        },
        text: {
            type: String,
            required: false
        },
        buttonText: {
            type: String,
            required: false
        },

        // MIN height (because strict: false)
        height: {
            type: String,
            required: false
        },

        // MODES
        column: {
            type: Boolean,
            default: () => {
                return false;
            }
        },
        columnLeft: {
            type: Boolean,
            default: () => {
                return false;
            }
        },
        columnRight: {
            type: Boolean,
            default: () => {
                return false;
            }
        },
    }
});
</script>

<style lang="scss">
$action-panel-mobile-threshold: 600px !default;

.hero-panel.action-panel {
    padding: 24px 48px;

    .panel-content{
        & > div{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;

            @media (max-width: $action-panel-mobile-threshold){
                justify-content: center;
            }
        }
    }

    .panel-title,
    .panel-text {
        position: relative;
    }

    .panel-title {
        line-height: 1.4;
        font-size: 3em;
        margin-bottom: 0;
        text-transform: uppercase;
        font-weight: 700;

        @media (max-width: $action-panel-mobile-threshold){
            font-size: 2em;
        }
    }

    .panel-button{
        margin: 1em;
    }

    &.shadow-active {
        .panel-title,
        .panel-text {
            text-shadow: 1px -1px 20px var(--hero-panel-shadow-color);
        }
    }
}
</style>
