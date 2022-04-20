<template>
    <button class="neon-button"
            :style="{
                '--neon-button-color': color ? color : background,
                '--neon-button-background': background,
                '--neon-button-speed': speed
           }"
    >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <slot />
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "NeonButton",

    props: {
        background: {
            type: String,
            required: false
        },
        color: {
            type: String,
            required: false
        },
        speed: {
            type: String,
            default: () => {
                return '1s'
            }
        }
    }
});
</script>

<style lang="scss">
.neon-button{
    position: relative;
    display: inline-block;
    padding: 12px 24px;
    color: var(--neon-button-color);
    text-decoration: none;
    transition: calc(var(--neon-button-speed) * 0.5);
    letter-spacing: 2px;
    overflow: hidden;

    span{
        position: absolute;
        display: block;

        &:nth-child(1){
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg,transparent,var(--neon-button-background));
            animation: neon-button-animation1 1s linear infinite;
            animation-duration: var(--neon-button-speed);
        }

        &:nth-child(2){
            top: -100%;
            right: 0;
            width: 2px;
            height: 100%;
            background: linear-gradient(180deg,transparent,var(--neon-button-background));
            animation: neon-button-animation2 1s linear infinite;
            animation-duration: var(--neon-button-speed);
            animation-delay: calc(var(--neon-button-speed) * 0.25);
        }

        &:nth-child(3){
            bottom: 0;
            right: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(270deg,transparent,var(--neon-button-background));
            animation: neon-button-animation3 1s linear infinite;
            animation-duration: var(--neon-button-speed);
            animation-delay: calc(var(--neon-button-speed) * 0.50);
        }

        &:nth-child(4){
            bottom: -100%;
            left: 0;
            width: 2px;
            height: 100%;
            background: linear-gradient(360deg,transparent,var(--neon-button-background));
            animation: neon-button-animation4 1s linear infinite;
            animation-duration: var(--neon-button-speed);
            animation-delay: calc(var(--neon-button-speed) * 0.75);
        }
    }

    &:hover{
        color: var(--neon-button-color);
        background: var(--neon-button-background);
        box-shadow: 0 0 5px var(--neon-button-background),
            0 0 25px var(--neon-button-background),
            0 0 50px var(--neon-button-background),
            0 0 200px var(--neon-button-background);
    }
}

@keyframes neon-button-animation1{
    0%{
        left: -100%;
    }
    50%,100%{
        left: 100%;
    }
}

@keyframes neon-button-animation2{
    0%{
        top: -100%;
    }
    50%,100%{
        top: 100%;
    }
}

@keyframes neon-button-animation3{
    0%{
        right: -100%;
    }
    50%,100%{
        right: 100%;
    }
}

@keyframes neon-button-animation4{
    0%{
        bottom: -100%;
    }
    50%,100%{
        bottom: 100%;
    }
}
</style>