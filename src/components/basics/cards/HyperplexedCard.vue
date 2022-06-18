<template>
    <div class="hyperplexed-card"
         :style="{
            '--hyperplexed-card-primary': primary,
            '--hyperplexed-card-secondary': secondary || primary,
            '--hyperplexed-card-background': background,
            '--hyperplexed-card-text': textColor,
            '--hyperplexed-card-height': height + 'px',
            '--hyperplexed-card-width': width + 'px',
            '--hyperplexed-card-shadow': '0,0,0'
        }"
    >
        <div class="card-left">
            <img class="card-image" :src="image">
            <span class="card-side-text">{{ textRight }}</span>
        </div>
        <div class="card-right">
            <slot />
            <div class="card-colored-angle"></div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "HyperplexedCard",

    props: {
        image: {
            type: String,
            required: false
        },
        primary: {
            type: String,
            required: false
        },
        secondary: {
            type: String,
            required: false
        },
        background: {
            type: String,
            required: false
        },
        textColor: {
            type: String,
            required: false
        },
        textRight: {
            type: String,
            required: false
        },
        height: {
            type: Number,
            default: () => {
                return 400;
            }
        },
    },

    computed: {
        width() :number {
            return this.height * 1.77777;   // 16/9
        }
    }
});
</script>

<style lang="scss">
// TODO put "open\closed" mode

.hyperplexed-card{
    margin: 0 auto;
    height: var(--hyperplexed-card-height);
    pointer-events: initial;
    width: 100%;
    max-width: var(--hyperplexed-card-width);
    color: var(--hyperplexed-card-text);

    .card-left,
    .card-right {
        position: relative;
        height: 100%;
        display: inline-block;
        background-color: var(--hyperplexed-card-background);
        vertical-align: top;
        width: 50%;
    }

    .card-left{
        background-image: linear-gradient(45deg, var(--hyperplexed-card-secondary), var(--hyperplexed-card-primary));
        box-shadow: rgba(var(--hyperplexed-card-shadow), 0.19) 0 10px 30px,
                    rgba(var(--hyperplexed-card-shadow), 0.23) 0 6px 10px;
        z-index: 1;

        .card-image{
            position: absolute;
            top: 50%;
            left: -10%;
            transform: translateY(-50%);
            z-index: 2;
            min-width: 80%;
            box-shadow: rgba(var(--hyperplexed-card-shadow), 0.19) 0 10px 30px,
                        rgba(var(--hyperplexed-card-shadow), 0.23) 0 6px 10px;
            border-radius: 50%;
        }

        .card-side-text{
            position: absolute;
            bottom: 0.25em;
            right: -0.5em;
            transform: rotate(-90deg);
            color: rgba(#FFFFFF, 0.2);  // TODO
            font-size: 7em;
            font-weight: 700;
        }
    }

    .card-right{
        z-index: 2;
        overflow: hidden;
        height: calc(100% + 48px);
        margin-top: -24px;
        box-shadow: rgba(var(--hyperplexed-card-shadow), 0.19) 0 10px 30px,
                    rgba(var(--hyperplexed-card-shadow), 0.23) 0 6px 10px;

        .card-colored-angle{
            position: absolute;
            bottom: 0;
            right: 0;
            height: 50px;
            width: 50px;

            &:before,
            &:after{
                background-color: var(--hyperplexed-card-primary);
                content: '';
                height: calc(var(--hyperplexed-card-height) / 2);
                position: absolute;
            }

            &:after{
                box-shadow: rgba(var(--hyperplexed-card-shadow), 0.19) 0 10px 30px,
                            rgba(var(--hyperplexed-card-shadow), 0.23) 0 6px 10px;
                left: 0;
                top: -100%;
                transform: rotate(45deg);
                width: calc(var(--hyperplexed-card-width) / 10);
            }
        }
    }
}

</style>