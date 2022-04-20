<template>
    <div
        class="hero-panel"
        :class="{
            'shadow-active': shadow && shadow.length > 0,
            'centered-mode': centered,
            'centered-top-mode': centeredTop,
            'centered-bottom-mode': centeredBottom
        }"
        :style="{
            'height': !strict ? 'auto' : height,
            'min-height': strict ? 'none' : height,
            'background-image': 'url(\''+backgroundImageCss+'\')',
            'background-attachment': fixed ? 'fixed' : null,
            '--hero-panel-background-color': background,
            '--hero-panel-shadow-color': shadow,
            '--hero-panel-shadow-opacity': shadowOpacity
        }"
    >
        <slot name="backgroundShadow">
            <div class="panel-shadow"></div>
        </slot>
        <slot name="backgroundImage">
            <!-- TODO thumbnail & lazyload -->
            <img v-if="backgroundImage"
                 class="panel-background"
                 :src="backgroundImage"
            />
        </slot>
        <div class="panel-content"
             :style="{
                'min-height': strict ? 'none' : height,
            }"
        >
            <div>
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "GenericPanel",

    props: {
        height: {
            type: String,
            default: () => {
                return "100vh";
            }
        },

        background: {
            type: String,
            required: false
        },
        // TODO thumbnail ONLY for backgroundImage and <img />
        thumbnailImage: {
            type: String,
            required: false
        },
        backgroundImage: {
            type: String,
            required: false
        },
        // Background via background-image
        backgroundImageCss: {
            type: String,
            required: false
        },
        // background image fixed effect
        fixed: {
            type: Boolean,
            default: () => {
                return false;
            }
        },

        // MODES
        // shadow (better readability)
        shadow: {
            type: String,
            default: () => {
                return '#000';
            }
        },
        shadowOpacity: {
            type: Number,
            default: () => {
                return 0.4;
            }
        },
        // centered modes
        centered: {
            type: Boolean,
            default: () => {
                return false;
            }
        },
        centeredTop: {
            type: Boolean,
            default: () => {
                return false;
            }
        },
        centeredBottom: {
            type: Boolean,
            default: () => {
                return false;
            }
        },
        // height strict true = height, false = min-height
        strict: {
            type: Boolean,
            default: () => {
                return false;
            }
        },
    }
});
</script>

<style lang="scss">

.hero-panel {
    position: relative;
    z-index: 1;

    background: var(--hero-panel-background-color);
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: scroll;
    background-size: cover;

    .panel-content {
        position: relative;
        z-index: 1;
        & > * {
            margin: 0 auto;
        }
    }

    .panel-background {
        overflow: hidden;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        z-index: -1;
        object-fit: cover;
        -o-object-fit: cover;

        // Youtube
        iframe{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100vw;
            height: 100vh;
            transform: translate(-50%, -50%);
        }
    }

    .panel-shadow {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }

    // MODES

    &.shadow-active {
        .panel-shadow {
            display: block;
            opacity: var(--hero-panel-shadow-opacity);
            background: var(--hero-panel-shadow-color);
        }
    }

    &.centered-mode,
    &.centered-top-mode,
    &.centered-bottom-mode {
        .panel-content {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
    }
    &.centered-top-mode {
        .panel-content {
            align-items: flex-start;
        }
    }
    &.centered-bottom-mode {
        .panel-content {
            align-items: flex-end;
        }
    }

    // IFRAME MODES

    &.contained-iframe{
        iframe{
            max-width: 100%;
            max-height: 100%;
        }
    }
    &.horizontal-iframe{
        iframe{
            max-width: 100%;
        }
        // INVERT on mobile
        &.mobile-invert{
            @media (max-width: 600px){
                iframe{
                    max-width: none;
                    max-height: 100%;
                }
            }
        }
    }
    &.vertical-iframe{
        iframe{
            max-height: 100%;
        }
        &.mobile-invert {
            @media (max-width: 600px) {
                iframe {
                    max-width: 100%;
                    max-height: none;
                }
            }
        }
    }
}
</style>
