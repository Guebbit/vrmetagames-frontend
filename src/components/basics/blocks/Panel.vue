<template>
    <div
        class="hero-panel"
        :class="{
            'shadow-active': shadow && shadow.length > 0,
            'aspect-ratio-mode': ratio,
            'centered-mode': centered,
            'centered-top-mode': centeredTop,
            'centered-bottom-mode': centeredBottom
        }"
        :style="{
            'height': !strict ? null : (height ? height : (hero ? '100vh' : null)),
            'min-height': strict ? null : (height ? height : (hero ? '100vh' : null)),
            'background-image': 'url(\''+backgroundImageCss+'\')',
            'background-attachment': fixed ? 'fixed' : null,
            '--hero-panel-background-color': background,
            '--hero-panel-shadow-color': shadow,
            '--hero-panel-shadow-opacity': shadowOpacity,
            '--hero-panel-aspect-ratio': trueRatio * 100 + '%'
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
        <div class="panel-content">
            <div>
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Panel",

    props: {
        height: {
            type: String,
            required: false
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
        // if height is not set, it's 100vh
        hero: {
            type: Boolean,
            default: () => {
                return false;
            }
        },
        
        
        // BACKGROUND dimensions
        ratio: {
            type: String,
            required: false
        },
        /*
        backgroundHeight: {
            type: Number,
            required: false
        },
        backgroundWidth: {
            type: Number,
            required: false
        },
        */
    },
    
    computed: {
        /*
        trueBackgroundHeight(){
            return (
                this.backgroundHeight ? this.backgroundHeight :
                    this.backgroundWidth ? (
                        this.backgroundWidth * (
                            this.trueRatio > 0 ? this.trueRatio : 1
                        )
                    ) : null);
        },
        trueBackgroundWidth(){
            return (
                this.backgroundWidth ? this.backgroundWidth :
                    this.backgroundHeight ? (
                        this.backgroundHeight * (
                            this.trueRatio > 0 ? this.trueRatio : 1
                        )
                    ) : null);
        },
        */
        trueRatio() :number {
            if(!this.ratio){
                return 1;
            }
            const ratio = this.ratio.split('/');
            return parseFloat((parseFloat(ratio[1]) / parseFloat(ratio[0])).toFixed(2));
        }
    }
});
</script>

<style lang="scss">
// TODO REMOVE overflow: hidden FROM &.aspect-ratio-mode  (for future mid-section or overflowing content)
$hero-panel-mobile-threshold: 600px !default;

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
        width: 100%;
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

        // Iframe are very problematic (es: Youtube)
        iframe{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 150vw;
            height: 100vh;
            transform: translate(-50%, -50%);
            @media (min-width: $hero-panel-mobile-threshold){
                width: 100vw;
            }
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
        display: flex;
        align-items: center;
        .panel-content {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    &.centered-top-mode {
        align-items: flex-start;
        .panel-content {
            align-items: flex-start;
        }
    }
    &.centered-bottom-mode {
        align-items: flex-end;
        .panel-content {
            align-items: flex-end;
        }
    }
    
    &.aspect-ratio-mode{
        overflow: hidden;
        .panel-background{
            object-fit: initial;
            height: 0;
            padding-bottom: var(--hero-panel-aspect-ratio);
            iframe{
                width: 100%;
                height: 100%;
            }
        }
    }

    // IFRAME MODES (youtube mostly)
    // never cut out content
    &.contained-iframe{
        iframe{
            max-width: 100%;
            max-height: 100%;
        }
    }
    // the VIDEO in the iframe is horizontal, ex: 16:9
    &.horizontal-iframe{
        iframe{
            width: 200vw; // because mobile width is very low
            @media (min-width: $hero-panel-mobile-threshold){
                width: 100vw;
                max-height: 100%;
            }
        }
    }
    // the VIDEO in the iframe is vertical
    &.vertical-iframe{
        iframe{
            @media (min-width: $hero-panel-mobile-threshold){
                max-width: 120%;
            }
        }
    }
}
</style>
