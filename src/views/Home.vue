<template>
    <div id="HomePage">
        <Panel class="theme-panel"
               shadow="#000000"
               :shadow-opacity="0.7"
               centered
               strict
               hero
        >
            <template v-slot:default>
                <v-container>
                    <h1 class="theme-page-title">VR Room <br> Carpi</h1>
                    <h4 class="theme-page-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
                    <InclinedButton
                        size="x-large"
                        :background="$vuetify.theme.themes.default.colors.primary"
                        :double="$vuetify.theme.themes.default.colors.secondary"
                        cross
                    >
                        {{ $t('generic.play-now') }}
                        <font-awesome-icon :icon="['fas', 'arrow-right']" />
                    </InclinedButton>
                </v-container>
            </template>
            <template v-slot:backgroundImage>
                <v-img
                    cover
                    class="panel-background"
                    lazy-src="http://placekitten.com/100/100"
                    src="http://placekitten.com/2000/1000"
                >
                    <template v-slot:placeholder>
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

        <section class="theme-section">
            <v-container>
                <ActionPanel
                    class="py-10"
                    :title="'CONNECT WITH US <br/> FOR GAMING UPDATE'"
                    @button:click="() => {}"
                >
                    <template v-slot:backgroundImage>
                        <video class="panel-background" preload="metadata" playsinline="" muted="" loop="" autoplay="">
                            <source src="https://cdn.virtual-room.com/app/uploads/2018/12/teaser-home-virtualroom.mp4" type="video/mp4">
                        </video>
                    </template>
                    <template v-slot:action>
                        <InclinedButton
                            class="panel-button"
                            size="x-large"
                            :double="$vuetify.theme.themes.default.colors.primary"
                        >
                            Lorem Ipsum
                            <font-awesome-icon :icon="['fas', 'arrow-right']" />
                        </InclinedButton>
                    </template>
                </ActionPanel>

                <v-row class="mt-5 four-panels-temporary-name">
                    <v-col cols="12" md="6" lg="3">
                        <Panel
                            class="px-10 py-15 text-center"
                            centered-bottom
                        >
                            <template v-slot:backgroundImage>
                                <video class="panel-background" preload="metadata" playsinline="" muted="" loop="" autoplay="">
                                    <source src="https://cdn.virtual-room.com/app/uploads/2018/12/teaser-home-virtualroom.mp4" type="video/mp4">
                                </video>
                            </template>
                            <template v-slot:default>
                                <h2 class="theme-page-subtitle">FIRST LOREM IPSUM</h2>
                                <InclinedButton
                                    class="panel-button mt-10"
                                    size="x-large"
                                    :double="$vuetify.theme.themes.default.colors.primary"
                                >
                                    Lorem Ipsum
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
                            <template v-slot:backgroundImage>
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
                            <template v-slot:default>
                                <h2 class="theme-page-subtitle">SECOND LOREM IPSUM</h2>
                                <InclinedButton
                                    class="panel-button mt-10"
                                    size="x-large"
                                    :double="$vuetify.theme.themes.default.colors.secondary"
                                >
                                    Lorem Ipsum
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
                            <template v-slot:backgroundImage>
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
                            <template v-slot:default>
                                <h2 class="theme-page-subtitle">THIRD LOREM IPSUM</h2>
                                <InclinedButton
                                    class="panel-button mt-10"
                                    size="x-large"
                                    :double="$vuetify.theme.themes.default.colors.primary"
                                >
                                    Lorem Ipsum
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
                            <template v-slot:backgroundImage>
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
                            <template v-slot:default>
                                <h2 class="theme-page-subtitle">FOURTH LOREM IPSUM</h2>
                                <InclinedButton
                                    class="panel-button mt-10"
                                    size="x-large"
                                    :double="$vuetify.theme.themes.default.colors.secondary"
                                >
                                    Lorem Ipsum
                                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                                </InclinedButton>
                            </template>
                        </Panel>
                    </v-col>
                </v-row>
            </v-container>
        </section>

        <section class="theme-section">
            <v-container>
                <div class="typography-panel">
                    <span class="panel-category">lorem ipsum</span>
                    <h3 class="panel-title">Lorem ipsum dolor sit amet, <b class="text-primary">consectetur</b> adipiscing elit</h3>
                    <p class="panel-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud <b class="text-secondary">exercitation ullamco</b> laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p class="panel-text">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <div class="d-flex justify-center mt-10">
                        <v-btn color="primary"
                               class="mx-5"
                               elevation="4"
                               size="x-large"
                        >
                            Lorem
                            <font-awesome-icon class="ml-3" :icon="['fas', 'arrow-right']" />
                        </v-btn>
                        <v-btn color="secondary"
                               class="mx-5"
                               elevation="4"
                               size="x-large"
                        >
                            Ipsum
                            <font-awesome-icon class="ml-3" :icon="['fas', 'arrow-right']" />
                        </v-btn>
                    </div>
                </div>
            </v-container>
        </section>

        <section class="theme-section">
            <v-container>
                <v-lazy
                    v-model="lazyGameList"
                    :options="{
                        threshold: .5
                    }"
                    min-height="200"
                    transition="fade-transition"
                >
                    <GameList
                        :list="games"
                    />
                </v-lazy>
                <div class="d-flex justify-center mt-10">
                    <CyberpunkButton
                       :background="$vuetify.theme.themes.default.colors.primary"
                       :border="$vuetify.theme.themes.default.colors.secondary"
                       text="Games"
                       @click="$router.push({ path: '/games' })"
                    >
                        More
                    </CyberpunkButton>
                </div>
            </v-container>
        </section>

        <ActionPanel
            :height="'400px'"
            :title="'VIDEO YOUTUBE LOOP'"
            @button:click="() => {}"
        >
            <template v-slot:backgroundImage>
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
            <template v-slot:action>
                <InclinedButton
                    class="panel-button"
                    size="x-large"
                    :double="$vuetify.theme.themes.default.colors.primary"
                >
                    Lorem Ipsum
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                </InclinedButton>
            </template>
        </ActionPanel>

        <section class="theme-section">
            <v-container>
                <div class="typography-panel">
                    <span class="panel-category">lorem ipsum</span>
                    <h3 class="panel-title">Lorem ipsum dolor sit amet, <b class="text-primary">consectetur</b> adipiscing elit</h3>
                    <p class="panel-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud <b class="text-secondary">exercitation ullamco</b> laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p class="panel-text">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <div class="d-flex justify-center mt-10">
                        <v-btn color="primary"
                               class="mx-5"
                               elevation="4"
                               size="x-large"

                        >
                            Lorem
                            <font-awesome-icon class="ml-3" :icon="['fas', 'arrow-right']" />
                        </v-btn>
                        <v-btn color="secondary"
                               class="mx-5"
                               elevation="4"
                               size="x-large"

                        >
                            Ipsum
                            <font-awesome-icon class="ml-3" :icon="['fas', 'arrow-right']" />
                        </v-btn>
                    </div>
                </div>
            </v-container>
        </section>

        <section class="theme-section pb-0">
            <Panel
                :backgroundImageCss="'https://www.virtual-room.com/app/themes/virtual-room/build/images/bg-pattern.jpg'"
                height="75vh"
                centered
                fixed
            >
                <template v-slot:default>
                    <v-container>
                        <h3 class="theme-section-title text-center mb-10">
                            Lorem Ipsum Sit Dolor
                        </h3>
                        <v-row
                            align="center"
                            justify="center"
                        >
                            <v-col cols="12" md="5" lg="4" xl="3">
                                <PricingCardVuetify
                                    color="primary"
                                    variant="outlined"
                                    priceColor="secondary"
                                    title="Lorem Ipsum"
                                    :price="60"
                                    currency="€"
                                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod <b>tempor incididunt</b> ut labore et dolore magna aliqua."
                                    buttonText="Lorem Ipsum"
                                />
                            </v-col>
                            <v-col cols="12" md="5" lg="4" xl="3">
                                <PricingCardVuetify
                                    color="transparent"
                                    priceColor="secondary"
                                    title="Lorem Ipsum"
                                    :price="150"
                                    currency="€"
                                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod <b>tempor incididunt</b> ut labore et dolore magna aliqua."
                                    buttonText="Lorem Ipsum"
                                />
                            </v-col>
                        </v-row>
                        <!--
                        <v-row>
                            <v-col cols="12" md="5" offset-md="1" lg="4" offset-lg="2" xl="3" offset-xl="3">
                                <PricingCardVuetify
                                    class="active"
                                    title="Lorem Ipsum"
                                    :price="60"
                                    currency="€"
                                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod <b>tempor incididunt</b> ut labore et dolore magna aliqua."
                                    buttonText="Lorem Ipsum"
                                />
                            </v-col>
                            <v-col cols="12" md="5" lg="4" xl="3">
                                <PricingCardVuetify
                                    title="Lorem Ipsum"
                                    :price="150"
                                    currency="€"
                                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod <b>tempor incididunt</b> ut labore et dolore magna aliqua."
                                    buttonText="Lorem Ipsum"
                                />
                            </v-col>
                        </v-row>
                        -->
                    </v-container>
                </template>
            </Panel>
        </section>
        <section class="theme-section py-0">
            <SocialPanel />
        </section>

        <Footer
            :primary="$vuetify.theme.themes.default.colors.primary"
            :secondary="$vuetify.theme.themes.default.colors.secondary"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import Panel from "@/components/basics/blocks/Panel.vue";
import InclinedButton from "@/components/basics/buttons/InclinedButton.vue";
import CyberpunkButton from "@/components/basics/buttons/CyberpunkButton.vue";
import ActionPanel from "@/components/basics/blocks/ActionPanel.vue";
import GameList from "@/components/landing/GameList.vue";
import { mapState } from "vuex";
import PricingCardVuetify from "@/components/basics/cards/PricingCardVuetify.vue";
import SocialPanel from "@/components/landing/SocialPanel.vue";
import Footer from "@/components/Footer.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowRight)

export default defineComponent({
    name: "HomeView",

    components: {
        Footer,
        SocialPanel,
        PricingCardVuetify,
        Panel,
        ActionPanel,
        InclinedButton,
        CyberpunkButton,
        GameList,
        FontAwesomeIcon
    },

    data: () => {
        return {
            lazyGameList: false
        }
    },

    computed: {
        ...mapState({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            games: ({ ecommerce: { games } }: any) => Object.values(games),
        }),
    }
});
</script>

<style lang="scss">
@import 'src/assets/scss/main/global';

#HomePage{
    .theme-page-title{
        font-size: 4rem;
        @include media-desktop(){
            font-size: 8rem;
        }
    }
    .four-panels-temporary-name{
        .hero-panel{
            @include media-desktop(){
                height: 700px;
            }
        }
    }
}
</style>