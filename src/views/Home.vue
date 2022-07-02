<template>
    <div id="HomePage">
        <Panel class="theme-panel landing-panel"
               shadow="#000000"
               :shadow-opacity="0.7"
               centered
               strict
               hero
        >
            <template #default>
                <v-container>
                    <h1 class="theme-page-title" v-html="t('home-page.landing-title')"></h1>
                    <h4 class="theme-page-subtitle">{{ t('home-page.landing-subtitle') }}</h4>
                    <div class="d-flex align-center justify-end">
                        <div class="text-right">
                            <v-btn
                                block
                                size="x-large"
                                variant="outlined"
                                :color="todayIsOpen ? 'success' : 'error'"
                                :to="{ name: 'Play' }"
                            >
                                {{ todayIsOpen ? t('generic.play-now') : t('generic.book-now') }}
                                <font-awesome-icon class="ml-3" :icon="['fas', 'play']" />
                            </v-btn>
                            <v-btn
                                variant="tonal"
                                class="mt-3"
                                size="small"
                                @click="goToSectionOpenings"
                            >
                                {{ t('generic.look-openings') }}
                            </v-btn>
                        </div>
                        <span class="status-circle"
                              :class="{
                                  online: todayIsOpen,
                                  'pulse-mode': todayIsOpen,
                                  offline: !todayIsOpen
                              }"
                        />
                    </div>
                </v-container>
            </template>
            <template #backgroundImage>
                <v-img
                    cover
                    class="panel-background"
                    :lazy-src="todayIsOpen ? 'http://placekitten.com/100/100' : 'http://placekitten.com/200/200'"
                    :src="todayIsOpen ? 'http://placekitten.com/2000/1000' : 'http://placekitten.com/1800/1000'"
                >
                    <template #placeholder>
                        <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                        >
                            <v-progress-circular
                                indeterminate
                                color="grey lighten-5"
                            ></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
            </template>
        </Panel>

        <section class="theme-section presentation-panels">
            <v-container>
                <ActionPanel
                    class="py-10"
                    :title="t('home-page.landing-presentation-title')"
                    @button:click="() => {}"
                >
                    <template #backgroundImage>
                        <video class="panel-background" preload="metadata" playsinline="" muted="" loop="" autoplay="">
                            <source src="https://cdn.virtual-room.com/app/uploads/2018/12/teaser-home-virtualroom.mp4" type="video/mp4">
                        </video>
                    </template>
                    <template #action>
                        <InclinedButton
                            class="panel-button"
                            size="x-large"
                            :double="themeColors.primary"
                        >
                            Lorem Ipsum
                            <font-awesome-icon :icon="['fas', 'arrow-right']" />
                        </InclinedButton>
                    </template>
                </ActionPanel>

                <v-row class="mt-5 four-panels">
                    <v-col cols="12" md="6" lg="3">
                        <Panel
                            class="px-10 py-15 text-center"
                            centered-bottom
                        >
                            <template #backgroundImage>
                                <video class="panel-background" preload="metadata" playsinline="" muted="" loop="" autoplay="">
                                    <source src="https://cdn.virtual-room.com/app/uploads/2018/12/teaser-home-virtualroom.mp4" type="video/mp4">
                                </video>
                            </template>
                            <template #default>
                                <h3 class="theme-section-subtitle">
                                    {{ t('home-page.landing-presentation-text-1') }}
                                </h3>
                                <InclinedButton
                                    class="panel-button mt-10"
                                    size="x-large"
                                    :double="themeColors.primary"
                                    :to="{ name: 'AboutUs' }"
                                >
                                    {{ t('home-page.landing-presentation-button-1') }}
                                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                                </InclinedButton>
                            </template>
                        </Panel>
                    </v-col>
                    <v-col cols="12" md="6" lg="3">
                        <Panel
                            class="horizontal-iframe px-10 py-15 text-center"
                            centered-bottom
                        >
                            <template #backgroundImage>
                                <div class="panel-background">
                                    <div>
                                        <iframe
                                            src="https://www.youtube.com/embed/iRwAekCcFow?playlist=iRwAekCcFow&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1"
                                            frameborder="0"
                                            allowfullscreen=""
                                            autoplay=""
                                            mute=""
                                            loop=""
                                        ></iframe>
                                    </div>
                                </div>
                            </template>
                            <template #default>
                                <h3 class="theme-section-subtitle">
                                    {{ t('home-page.landing-presentation-text-2') }}
                                </h3>
                                <InclinedButton
                                    class="panel-button mt-10"
                                    size="x-large"
                                    :double="themeColors.secondary"
                                    :to="{ name: 'AboutVr' }"
                                >
                                    {{ t('home-page.landing-presentation-button-2') }}
                                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                                </InclinedButton>
                            </template>
                        </Panel>
                    </v-col>
                    <v-col cols="12" md="6" lg="3">
                        <Panel
                            class="horizontal-iframe px-10 py-15 text-center"
                            centered-bottom
                        >
                            <template #backgroundImage>
                                <div class="panel-background">
                                    <div>
                                        <iframe
                                            src="https://www.youtube.com/embed/8ZHneHI8ooY?playlist=8ZHneHI8ooY&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1"
                                            frameborder="0"
                                            allowfullscreen=""
                                            autoplay=""
                                            mute=""
                                            loop=""
                                        ></iframe>
                                    </div>
                                </div>
                            </template>
                            <template #default>
                                <h3 class="theme-section-subtitle">
                                    {{ t('home-page.landing-presentation-text-3') }}
                                </h3>
                                <InclinedButton
                                    class="panel-button mt-10"
                                    size="x-large"
                                    :double="themeColors.primary"
                                    :to="{ name: 'Games' }"
                                >
                                    {{ t('home-page.landing-presentation-button-3') }}
                                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                                </InclinedButton>
                            </template>
                        </Panel>
                    </v-col>
                    <v-col cols="12" md="6" lg="3">
                        <Panel
                            class="vertical-iframe px-10 py-15 text-center"
                            centered-bottom
                        >
                            <template #backgroundImage>
                                <div class="panel-background">
                                    <div>
                                        <iframe
                                            src="https://www.youtube.com/embed/bdPZ2Cu1vNU?playlist=bdPZ2Cu1vNU&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1"
                                            frameborder="0"
                                            allowfullscreen=""
                                            autoplay=""
                                            mute=""
                                            loop=""
                                        ></iframe>
                                    </div>
                                </div>
                            </template>
                            <template #default>
                                <h3 class="theme-section-subtitle">
                                    {{ t('home-page.landing-presentation-text-4') }}
                                </h3>
                                <InclinedButton
                                    class="panel-button mt-10"
                                    size="x-large"
                                    :double="themeColors.secondary"
                                    :to="{ name: 'Play' }"
                                >
                                    {{ t('home-page.landing-presentation-button-4') }}
                                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                                </InclinedButton>
                            </template>
                        </Panel>
                    </v-col>
                </v-row>
            </v-container>
        </section>

        <section class="theme-section openings-section">
            <TrapezoidTitle
                class="theme-section-title text-center"
                element="h2"
                :color="themeColors.primary"
                :double="themeColors.secondary"
                outline
                big
                cross
            >
                {{ t('generic.opening-hours') }}
            </TrapezoidTitle>
            <OpeningHours
                :color="themeColors.primary"
                :colorClosed="themeColors.error"
                :text="themeColors['on-surface']"
                :list="businessHours"
                :open="todayIsOpen"
            />
        </section>


        <section class="theme-section">
            <v-container>
                <TrapezoidTitle
                    class="theme-section-title text-center"
                    element="h2"
                    :color="themeColors.primary"
                    :double="themeColors.secondary"
                    outline
                    big
                    cross
                >
                    {{ t('home-page.station-list-title') }}
                </TrapezoidTitle>
                <v-lazy
                    v-model="lazyStationList"
                    :options="{
                        threshold: .5
                    }"
                    transition="fade-transition"
                >
                    <StationList />
                </v-lazy>
                <div class="d-flex justify-center mt-10">
                    <CyberpunkButton
                        :background="themeColors.primary"
                        :border="themeColors.secondary"
                        text="Now"
                        :to="{ name: 'Play' }"
                    >
                        {{ t('home-page.station-list-more-button') }}
                    </CyberpunkButton>
                </div>
            </v-container>
        </section>

        <section class="theme-section">
            <v-container>
                <TrapezoidTitle
                    class="theme-section-title text-center"
                    element="h2"
                    :color="themeColors.primary"
                    :double="themeColors.secondary"
                    outline
                    big
                    cross
                >
                    {{ t('home-page.games-list-title') }}
                </TrapezoidTitle>
                <v-lazy
                    v-model="lazyGameList"
                    :options="{
                        threshold: .5
                    }"
                    transition="fade-transition"
                >
                    <GameList />
                </v-lazy>
                <div class="d-flex justify-center mt-10">
                    <CyberpunkButton
                        :background="themeColors.primary"
                        :border="themeColors.secondary"
                        text="Games"
                        @click="$router.push({ name: 'Games' })"
                    >
                        {{ t('home-page.games-list-more-button') }}
                    </CyberpunkButton>
                </div>
            </v-container>
        </section>

        <section class="theme-section quote-section">
            <v-container>
                <v-carousel
                    v-model="blockquoteCarouselStep"
                    cycle
                    hide-delimiters
                    height="300"
                    show-arrows="hover"
                >
                    <v-carousel-item
                        v-for="([ text, author ], index) in quoteList"
                        :key="'quote-list-item-' + index"
                    >
                        <div class="d-flex fill-height justify-center align-center">
                            <blockquote class="great-blockquote">
                                <p>{{ text }}</p>
                                <cite>{{ author }}</cite>
                            </blockquote>
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-container>
        </section>

        <ActionPanel
            :height="'400px'"
        >
            <template #backgroundImage>
                <div class="panel-background">
                    <div>
                        <iframe
                            src="https://www.youtube.com/embed/iRwAekCcFow?playlist=iRwAekCcFow&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1"
                            frameborder="0"
                            allowfullscreen=""
                            autoplay=""
                            mute=""
                            loop=""
                        ></iframe>
                    </div>
                </div>
            </template>
        </ActionPanel>



        <section class="theme-section">
            <v-container>
                <div class="typography-panel">
                    <span class="panel-category">{{ t('home-page.about-us-suptitle') }}</span>
                    <h3 class="panel-title">{{ t('home-page.about-us-title') }}</h3>
                    <p class="panel-text" v-html="t('home-page.about-us-text-1')"></p>
                    <p class="panel-text" v-html="t('home-page.about-us-text-2')"></p>
                    <p class="panel-text" v-html="t('home-page.about-us-text-3')"></p>
                    <p class="panel-text" v-html="t('home-page.about-us-text-4')"></p>

                    <div class="d-flex justify-center flex-wrap mt-10">
                        <v-btn color="primary"
                               class="ma-2"
                               elevation="4"
                               size="x-large"

                        >
                            {{ t('home-page.about-us-button-1') }}
                            <font-awesome-icon class="ml-3" :icon="['fas', 'arrow-right']" />
                        </v-btn>
                        <v-btn color="secondary"
                               class="ma-2"
                               elevation="4"
                               size="x-large"

                        >
                            {{ t('home-page.about-us-button-2') }}
                            <font-awesome-icon class="ml-3" :icon="['fas', 'arrow-right']" />
                        </v-btn>
                    </div>
                    <div class="text-center mt-10">
                        <InclinedButton
                            size="x-large"
                            :background="themeColors.primary"
                            :double="themeColors.secondary"
                            cross
                            :to="{ name: 'Play' }"
                        >
                            {{ t('home-page.about-us-button-3') }}
                            <font-awesome-icon :icon="['fas', 'arrow-right']" />
                        </InclinedButton>
                    </div>
                </div>
            </v-container>
        </section>

        <section class="theme-section pb-0 pt-0">
            <v-lazy
                v-model="lazyPricings"
                :options="{
                        threshold: .5
                    }"
                transition="fade-transition"
            >
                <PricingsPanel />
            </v-lazy>
        </section>
        <section class="theme-section py-0">
            <v-lazy
                v-model="lazySocial"
                :options="{
                        threshold: .5
                    }"
                transition="fade-transition"
            >
                <SocialPanel />
            </v-lazy>
        </section>

        <Footer
            :primary="themeColors.primary"
            :secondary="themeColors.secondary"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, toRefs } from "vue";
import { useTheme } from "vuetify";
import { useI18n } from "vue-i18n";
import { useStore } from "@/store";
import { scripts } from 'guebbit-javascript-library';

// Components
import Panel from "guebbit-vue-library/src/components/blocks/Panel.vue";
import InclinedButton from "@/components/basics/buttons/InclinedButton.vue";
import CyberpunkButton from "@/components/basics/buttons/CyberpunkButton.vue";
import ActionPanel from "guebbit-vue-library/src/components/blocks/ActionPanel.vue";
import TrapezoidTitle from "@/components/basics/typography/TrapezoidTitle.vue";
import GameList from "@/components/landing/GameList.vue";
import OpeningHours from "@/components/basics/cards/OpeningHours.vue";

import SocialPanel from "@/components/landing/SocialPanel.vue";
import StationList from "@/components/landing/StationList.vue";
import Footer from "@/components/generic/Footer.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PricingsPanel from "@/components/landing/PricingsPanel.vue";

library.add(faArrowRight)

const { t } = useI18n();
const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const {
    state,
    getters
} = useStore();

const lazyGameList = ref(false);
const lazyStationList = ref(false);
const lazyPricings = ref(false);
const lazySocial = ref(false);
const blockquoteCarouselStep = ref(0);
const quoteList = ref([
    [
        t('home-page.quote-list-item-1-text'),
        t('home-page.quote-list-item-1-author')
    ],
    [
        t('home-page.quote-list-item-2-text'),
        t('home-page.quote-list-item-2-author')
    ],
    [
        t('home-page.quote-list-item-3-text'),
        t('home-page.quote-list-item-3-author')
    ]
])

const { businessHours } = toRefs(state.main);
const todayIsOpen = computed(() => getters['main/todayIsOpen']);

const goToSectionOpenings = () => {
    document.querySelector('.openings-section')?.scrollIntoView({behavior: "smooth"});
}

/*
const goToFooter = () => {
    window.scroll({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
    });
};
*/
/*
const goToHeader = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
};
*/

onMounted(() => {
    scripts.lazyload();
    scripts.activator();
});
</script>


<style lang="scss">
@import 'src/assets/scss/main/global';

#HomePage{
    .theme-section{
        & > .hero-panel,
        & > .v-lazy > .hero-panel{
            padding: 60px 0;
        }
    }

    .landing-panel{
        .status-circle{
            font-size: 2em;
            margin: 0 2em;
        }
        .theme-page-title{
            font-size: 4rem;
            @include media-desktop(){
                font-size: 8rem;
            }
        }
        .theme-page-subtitle{
            font-size: 1.5rem;
            @include media-desktop(){
                font-size: 2.5rem;
            }
        }
    }

    .presentation-panels{
        .theme-section-subtitle{
            text-transform: uppercase;
        }
        .four-panels{
            .hero-panel{
                @include media-desktop(){
                    height: 700px;
                }
            }
        }
    }

    .openings-section{
        .opening-hours-list{
            max-width: 800px;
            margin: 0 auto;
            font-size: 2em;
            font-width: 600;

            ul {
                li{
                    &:nth-child(odd) {
                        position: relative;
                        background: initial;
                        &:after{
                            content: "";
                            position: absolute;
                            top: 0;
                            left: -500%;
                            width: 1000%;
                            height: 100%;
                            // height: 100%;
                            background: rgba(0, 0, 0, 0.1);
                        }
                    }
                }
            }
        }
    }

    .quote-section{
        .great-blockquote{
            max-width: 500px;
        }
    }
}
</style>