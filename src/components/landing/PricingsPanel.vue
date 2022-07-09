<template>
    <Panel
        :backgroundImageCss="'https://www.virtual-room.com/app/themes/virtual-room/build/images/bg-pattern.jpg'"
        height="75vh"
        centered
        fixed
    >
        <template #default>
            <v-container>
                <h3 class="theme-section-title text-center mb-10">
                    {{ t('home-page.price-section-title') }}
                </h3>
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col
                        v-for="([price, steps], i) in priceList"
                        :key="'pricing-column-' + i"
                        cols="12" md="5" lg="4" xl="3"
                    >
                        <PricingCardVuetify
                            :color="i % 2 ? 'primary': 'transparent'"
                            :variant="i % 2 ? 'outlined': undefined"
                            priceColor="secondary"
                            :title="t('home-page.price-card-' + i + '-title')"
                            currency="€"
                            :text="t('home-page.price-card-' + i + '-text')"
                            :buttonText="t('home-page.price-card-' + i + '-button')"
                            :to="{
                                name: 'Play',
                                params: {
                                    preloadSteps: steps
                                }
                            }"
                        >
                            <template #price>
                                <div>
                                    <div class="card-price text-secondary">
                                        <span class="card-currency">€</span>
                                        {{ price / 100 }}
                                    </div>
                                    <div class="card-hour-time">
                                        {{
                                            steps ===  1 ? t('generic.half-hour') :
                                                steps === 2 ? t('generic.one-hour') :
                                                    steps === 20 ? t('generic.ten-hours') : ''
                                        }}
                                    </div>
                                </div>
                            </template>
                        </PricingCardVuetify>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </Panel>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";
import Panel from "guebbit-vue-library/src/components/blocks/Panel.vue";
import PricingCardVuetify from "@/components/basics/cards/PricingCardVuetify.vue";

const { t } = useI18n();
const {
    state
} = useStore();

const { scheduleTimeCost } = toRefs(state.ecommerce);

const priceList = computed<number[][]>(() => {
    console.log("V", scheduleTimeCost.value)
    return [
        [600, 1],
        [scheduleTimeCost.value[0]*2, 2],
        [scheduleTimeCost.value[20], 20],
    ]
});
</script>

<style lang="scss">
@import 'src/assets/scss/main/global';

.pricing-card-vuetify{
    .card-hour-time{
        position: absolute;
        top: 0;
        right: 0;
        background: rgba(var(--v-theme-primary), 0.2);
        color: white;
        padding: 6px 24px;
        font-size: 1.5em;
        width: 100%;
    }
    .card-title{
        margin-top: 0.5em;
    }
    .card-text{
        font-size: 1em;
    }
    .card-price{
        font-size: 6em;
    }

    &:hover{
        @include boxShadowSecondary;
    }
}
</style>