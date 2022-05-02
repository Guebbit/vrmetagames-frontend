<template>
    <button class="cyberpunk-button"
            :data-cyberpunk-text="text"
            :style="{
                '--cyberpunk-button-color': color,
                '--cyberpunk-button-background': background,
                '--cyberpunk-button-border': border ? border : background,
           }"
    >
        <slot />
    </button>
</template>

<script lang="ts">
// TODO trasformare in una classe?
// TODO https://codepen.io/leandroruel/pen/XWbpbmR
// TODO https://dev.to/leandroruel/how-to-make-a-cyberpunk-2077-button-with-css-c9m
import { defineComponent } from "vue";

export default defineComponent({
    name: "CyberpunkButton",

    props: {
        color: {
            type: String,
            required: false
        },
        background: {
            type: String,
            required: false
        },
        border: {
            type: String,
            required: false
        },
        text: {
            type: String,
            default: () => {
                return '';
            }
        }
    }
});
</script>

<style lang="scss">
$cyberpunk-button-text: #FFFFFF;

%cyberpunk-button{
    position:relative;
    min-width: 300px;
    display: block;
    background:linear-gradient(45deg, transparent 5%, var(--cyberpunk-button-background) 5%);
    border:0;
    color: $cyberpunk-button-text;
    font-size: 30px;
    letter-spacing:3px;
    line-height:2.5;
    box-shadow:6px 0 0 var(--cyberpunk-button-border);
    outline:transparent;
    text-transform: uppercase;
}

.cyberpunk-button{
    @extend %cyberpunk-button;
    &:after{
        @extend %cyberpunk-button;
        --cyberpunk-button-slice-0:inset(50% 50% 50% 50%);
        --cyberpunk-button-slice-1:inset(80% -6px 0 0);
        --cyberpunk-button-slice-2:inset(50% -6px 30% 0);
        --cyberpunk-button-slice-3:inset(10% -6px 85% 0);
        --cyberpunk-button-slice-4:inset(40% -6px 43% 0);
        --cyberpunk-button-slice-5:inset(80% -6px 5% 0);
        content: attr(data-cyberpunk-text);
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background:linear-gradient(45deg,transparent 3%, var(--cyberpunk-button-border) 3%, var(--cyberpunk-button-border) 5%, var(--cyberpunk-button-background) 5%);
        text-shadow:-3px -3px 0px var(--cyberpunk-button-border),3px 3px 0px var(--cyberpunk-button-border);
        clip-path:var(--cyberpunk-button-slice-0);
    }

    &.active,
    &:hover{
        &:after{
            animation: 1s cyberpunk-button-animation-glitch;
            animation-timing-function:steps(2,end);
        }
    }
}


@keyframes cyberpunk-button-animation-glitch{
    0%{
        clip-path:var(--cyberpunk-button-slice-1);
        transform:translate(-20px,-10px);
    }
    10%{
        clip-path:var(--cyberpunk-button-slice-3);
        transform:translate(10px,10px);
    }
    20%{
        clip-path:var(--cyberpunk-button-slice-1);
        transform:translate(-10px,10px);
    }
    30%{
        clip-path:var(--cyberpunk-button-slice-3);
        transform:translate(0px,5px);
    }
    40%{
        clip-path:var(--cyberpunk-button-slice-2);
        transform:translate(-5px,0px);
    }
    50%{
        clip-path:var(--cyberpunk-button-slice-3);
        transform:translate(5px,0px);
    }
    60%{
        clip-path:var(--cyberpunk-button-slice-4);
        transform:translate(5px,10px);
    }
    70%{
        clip-path:var(--cyberpunk-button-slice-2);
        transform:translate(-10px,10px);
    }
    80%{
        clip-path:var(--cyberpunk-button-slice-5);
        transform:translate(20px,-10px);
    }
    90%{
        clip-path:var(--cyberpunk-button-slice-1);
        transform:translate(-10px,0px);
    }
    100%{
        clip-path:var(--cyberpunk-button-slice-1);
        transform:translate(-20px,-10px);
    }
}
</style>

