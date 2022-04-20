<template>
    <div class="pricing-card text-center me-4 text-primary">
        <div>
            <h3 class="card-title">{{ title }}</h3>
            <div class="card-price">
                <span class="card-currency">{{ currency }}</span>
                {{ price }}
            </div>
        </div>
        <p v-show="text"
           class="card-text"
           v-html="text"
        />
        <v-btn
            v-show="buttonText"
            class="card-button"
            color="secondary"
            href="https://store.vuetifyjs.com/products/bonik-multipurpose-ecommerce-template"
        >
            {{ buttonText }}
        </v-btn>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "PricingCardSimple",

    props: {
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
        currency: {
            type: String,
            default: () => {
                return '€';
            }
        }
    }
});
</script>

<style lang="scss">
// TODO colori personalizzabili

.pricing-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-height: 500px;
    background: rgb(var(--v-theme-text));
    color: rgb(var(--v-theme-primary));
    box-shadow: rgba(black, 0.4) 0 4px 16px;
    border-radius: 8px;
    padding: 48px;
    transition: background 0.2s, color 0.2s;

    .card-title{
        font-size: 2em;
        font-weight: 600;
    }
    .card-text{
        font-size: 1.2em;
    }
    .card-price{
        color: rgb(var(--v-theme-secondary));
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

    &.active,
    &:hover{
        background: rgb(var(--v-theme-primary));
        color: rgb(var(--v-theme-text));
        .card-title,
        .card-text,
        .card-price{
            color: rgb(var(--v-theme-text));
        }
    }
}
</style>