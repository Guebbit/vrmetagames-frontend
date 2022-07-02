<template>
    <v-card
        class="pricing-card-vuetify text-center text-primary theme-elevation-primary border-primary"
        :variant="variant"
        :color="color"
        elevation="24"
        v-ripple
    >
        <div class="card-content">
            <slot name="title">
                <h3 class="card-title">{{ title }}</h3>
            </slot>
            <slot name="price">
                <div class="card-price"
                     :class="'text-' + (priceColor ? priceColor : color)"
                >
                    <span class="card-currency">{{ currency }}</span>
                    {{ price }}
                </div>
            </slot>
            <slot name="content">
                <span v-show="text"
                      v-html="text"
                      class="card-text"
                />
                <v-btn v-show="buttonText"
                       block
                       :variant="variant"
                       :color="color"
                       class="border-primary theme-elevation-primary"
                       size="x-large"
                       elevation="24"
                       v-ripple
                       :to="to"
                >
                    {{ buttonText }}
                </v-btn>
            </slot>
        </div>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "PricingCardSimple",

    props: {
        color: {
            type: String,
            required: false
        },
        variant: {
            type: String,
            required: false
        },

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

        price: {
            type: Number,
            required: false
        },
        priceColor: {
            type: String,
            required: false
        },

        currency: {
            type: String,
            default: () => {
                return '€';
            }
        },
        to: {
            type: String,
            required: false
        }
    }
});
</script>

<style lang="scss">
// TODO colori personalizzabili

.pricing-card-vuetify {
    .card-content{
        background: rgba(var(--v-theme-background), 0.5);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        min-height: 500px;
        padding: 48px;
    }

    .card-title{
        font-size: 2em;
        font-weight: 600;
    }
    .card-text{
        font-size: 1.2em;
        color: rgb(var(--v-theme-on-surface));
        margin-bottom: 24px;
    }

    .card-price{
        font-weight: 900;
        font-size: 4em;
        letter-spacing: -0.1em;
        transition: color 0.2s;

        .card-currency{
            margin-right: 8px;
            font-weight: 600;
            font-size: 30%;
            vertical-align: text-top;
        }
    }

    // TODO BETA FIX
    .v-btn{
        flex-grow: 0;
    }
}
</style>