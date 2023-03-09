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
                    <div class="d-flex align-center justify-end mt-10">
                        <div class="text-right">
                            <v-btn
                                block
                                size="x-large"
                                variant="outlined"
                                :color="todayIsOpen ? 'success' : 'error'"
                                :to="{ name: 'Play' }"
                            >
								{{ todayIsOpen ? t('generic.opened') : t('generic.closed') }}
								<v-divider
									vertical
									class="mr-2 ml-2"
									thickness="2"
									:color="todayIsOpen ? 'success' : 'error'"
								/>
                                <small>{{ todayIsOpen ? t('generic.play-now') : t('generic.book-now') }}</small>
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
						<span class="status-circle text-h5 ml-10"
							:class="{
                                  online: todayIsOpen,
                                  'pulse-mode': todayIsOpen,
                                  offline: !todayIsOpen
                              }"
						/>
                    </div>
                </v-container>
            </template>
            <template #background>
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
                    @click:button="() => {}"
                >
                    <template #background>
                        <video class="panel-background" preload="metadata" playsinline="" muted="" loop="" autoplay="">
                            <source src="https://cdn.virtual-room.com/app/uploads/2018/12/teaser-home-virtualroom.mp4" type="video/mp4">
                        </video>
                    </template>
                    <template #action>
                        <InclinedButton
                            class="panel-button"
                            size="x-large"
                            :double="themeColors.primary"
                            :to="{ name: 'Play' }"
                        >
                            {{ t('generic.about-us') }}
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
                            <template #background>
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
                            <template #background>
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
                            <template #background>
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
                            <template #background>
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


        <!-- TODO
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
        -->

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
                            <blockquote class="blockquote-great">
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
            <template #background>
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

        <section class="theme-section pa-0">
            <v-lazy
                v-model="lazyMap"
                :options="{
                        threshold: .5
                    }"
                transition="fade-transition"
            >
                <LeafletMap
                    :center="[44.7793747, 10.8807905]"
                    zoom="18"
                    map="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    mapAttribution='<a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    :mapOptions="{
                        maxZoom: 20,
                        subdomains:['mt0','mt1','mt2','mt3']
                    }"
                    :icons="[
                        {
                            name: 'logo',
                            iconUrl: 'https://assets.guebbit.com/vrmetagames/images/pin-logo.png',
                            iconSize: [40, 50],
                            className: 'floating-animation'
                        },
                        {
                            name: 'parking-lot',
                            iconUrl: 'https://assets.guebbit.com/vrmetagames/images/pin-parking-lot.png',
                            iconSize: [20, 25],
                            className: 'floating-animation'
                        }
                    ]"
                    :markers="[
                        {
                            coordinates: [44.7793747, 10.8807905],
                            icon: 'logo',
                            options: { alt: 'Sede Vr Metagames' }
                        },
                        {
                            coordinates: [44.7790877,10.8807525],
                            icon: 'parking-lot',
                            options: { alt: 'Parcheggio Vr Metagames' }
                        },
                        {
                            coordinates: [44.7807537, 10.8812649],
                            icon: 'parking-lot',
                            options: { alt: 'Parcheggio Vr Metagames' }
                        },
                        {
                            coordinates: [44.7786976,10.8817087],
                            icon: 'parking-lot',
                            options: { alt: 'Parcheggio Vr Metagames' }
                        }
                    ]"
                />
            </v-lazy>
            <v-btn
                class="google-drive-button"
                color="secondary"
                target="_blank"
                href="https://www.google.com/maps/dir/44.8703811,10.8166522/vr+metagames/@44.8197379,10.7501583,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x477ff34644a5efb1:0xc99febe9f2bbf4dc!2m2!1d10.880918!2d44.7793981"
            >
                {{ t('generic.where-us') }}
                <font-awesome-icon class="ml-3" :icon="['fas', 'location-dot']" />
            </v-btn>
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
import { scripts } from '@guebbit/javascript-library';

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
import PricingsPanel from "@/components/landing/PricingsPanel.vue";
import LeafletMap from "@/components/basics/interfaces/LeafletMap.vue";
import Footer from "@/components/generic/Footer.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowRight, faLocationDot)

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
const lazyMap = ref(false);
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
@import '@/assets/scss/main/global';

#HomePage{
    .theme-section{
        & > .hero-panel,
        & > .v-lazy > .hero-panel{
            padding: 60px 0;
        }
    }

    .landing-panel{
        .theme-page-title{
            font-size: 5rem;
            margin-bottom: 1em;
            @include media-desktop(){
                font-size: 8rem;
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
        overflow: hidden;
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

    .google-drive-button{
        position: absolute;
        top: 0;
        right: 0;
        z-index: 400;
        margin: 1em;
    }

    .quote-section{
        .blockquote-great{
            max-width: 500px;
        }
    }

	/*
	.floating-animation{
		animation: floating-animation 1s linear 0s infinite;
	}

	@keyframes floating-animation {
		from {
			transform:translate(0, 0px)
		}
		to {
			transform:translate(0, 15px);
		}
	}
	*/
}
</style>