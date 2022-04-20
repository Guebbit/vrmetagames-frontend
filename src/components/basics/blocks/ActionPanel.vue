<template>
    <Panel
        class="action-panel"
        v-bind="$props"
        centered
        :class="{
            'column-mode': column,
            'column-mode column-right': columnRight,
            'column-mode column-left': columnLeft
        }"
    >
        <template v-slot:backgroundShadow>
            <slot name="backgroundShadow"></slot>
        </template>
        <template v-slot:backgroundImage>
            <slot name="backgroundImage"></slot>
        </template>
        <template v-slot:default>
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

        // MIN height
        height: {
            type: String,
            default: () => {
                return "none";
            }
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
.hero-panel.action-panel {
    padding: 24px 48px;

    .panel-content{
        & > div{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    .panel-title,
    .panel-text {
        position: relative;
    }

    .panel-title {
        line-height: 1.4;
        font-size: 3rem;
        margin-bottom: 0;
        text-transform: uppercase;
        font-weight: 700;
    }

    &.shadow-active {
        .panel-title,
        .panel-text {
            text-shadow: 1px -1px 20px var(--hero-panel-shadow-color);
        }
    }

    &.column-mode{
        flex-direction: column;
        justify-content: space-evenly;
        &.column-right{
            align-items: flex-end;
        }
        &.column-right{
            align-items: flex-start;
        }
    }
}
</style>
