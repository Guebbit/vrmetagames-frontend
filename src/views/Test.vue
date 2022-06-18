<template>
    <br /><br /><br />
    <br /><br /><br />

    <EventLongCard
        :time="Date.now()"
        image="https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-main-1.png"
        :color="$vuetify.theme.themes.default.colors.primary"
        background="#FFFFFF"
        text="#3c3c3c"
        facebook="#"
        instagram="#"
        tiktok="#"
    >
        <h3 class="card-title">Independence Day</h3>
        <h5 class="card-subtitle">United States Holiday</h5>
        <p class="card-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
    </EventLongCard>

    <EventLongCard
        :time="Date.now()"
        :color="$vuetify.theme.themes.default.colors.secondary"
        background="#FFFFFF"
        text="#3c3c3c"
    >
        <h3 class="card-title">Independence Day</h3>
        <v-btn color="primary"
               elevation="24"
        >
            Button
        </v-btn>
    </EventLongCard>

    <HyperplexedCard
        image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1468070/btc.svg"
        primary="#ff6f00"
        secondary="#ffeb3b"
        background="#FFFFFF"
        textColor="#3c3c3c"
        textRight="BTC"
    >
        <h1>CONTENTS</h1>
    </HyperplexedCard>

    <section class="theme-section">
        <v-container>
            <NeonButton
                :background="$vuetify.theme.themes.default.colors.primary"
                :color="$vuetify.theme.themes.default.colors.secondary"
                speed="1.5s"
            >
                Lorem Ipsum
            </NeonButton>
        </v-container>
    </section>

    <section class="theme-section">
        <v-container>
            <TrapezoidTitle
                class="theme-section-title text-center"
                element="h2"
                :color="$vuetify.theme.themes.default.colors.primary"
                :double="$vuetify.theme.themes.default.colors.secondary"
                outline
                big
                cross
            >
                Postazioni
            </TrapezoidTitle>

            <SlideOpenTripleCard
                :image="'https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-main-1.png'"
                :background-left="'https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-controller-1.png'"
                :background-right="'https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-controller-2.png'"
            >
                <template v-slot:left>
                    <h1>LOREM IPSUM</h1>
                    <h1>LOREM IPSUM</h1>
                    <h1>LOREM IPSUM</h1>
                    <h1>LOREM IPSUM</h1>
                    <h1>LOREM IPSUM</h1>
                    <h1>LOREM IPSUM</h1>
                </template>
                <template v-slot:right>
                    <h1>LOREM IPSUM</h1>
                    <h1>LOREM IPSUM</h1>
                    <h1>LOREM IPSUM</h1>
                    <h1>LOREM IPSUM</h1>
                </template>
            </SlideOpenTripleCard>

            <v-row
                align="center"
                justify="center"
            >
                <v-col cols="12" md="5" lg="4" xl="3">
                    <ImageHoverCard
                        :image="'https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-main-1.png'"
                    >
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                    </ImageHoverCard>
                </v-col>
                <v-col cols="12" md="5" lg="4" xl="3">
                    <ImageHoverCard
                        :image="'https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-controller-1.png'"
                    >
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                    </ImageHoverCard>
                </v-col>
                <v-col cols="12" md="5" lg="4" xl="3">
                    <ImageHoverCard
                        :image="'https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-controller-2.png'"
                    >
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                        <h1>LOREM IPSUM</h1>
                    </ImageHoverCard>
                </v-col>
            </v-row>
            <div class="d-flex justify-center mt-10">
                <CyberpunkButton
                    :background="$vuetify.theme.themes.default.colors.primary"
                    :border="$vuetify.theme.themes.default.colors.secondary"
                    text="Details"
                    @click="$router.push({ path: '/games' })"
                >
                    More
                </CyberpunkButton>
            </div>
        </v-container>
    </section>

    <section class="theme-section">
        <v-container>
            <ul class="simple-list">
                <li class="hover-line-highlight">
                    <a href="#">
                        <font-awesome-icon :icon="['fas', 'arrow-right']" />
                        Lorem Ipsum
                    </a>
                </li>
                <li class="hover-line-highlight active">
                    <a href="#">
                        <font-awesome-icon :icon="['fas', 'arrow-right']" />
                        Sit Amet
                    </a>
                </li>
                <li>
                    <a href="#" class="hover-line-highlight right-highlight">
                        <font-awesome-icon :icon="['fas', 'arrow-right']" />
                        Dolor
                    </a>
                </li>
                <li>
                    <a href="#" class="hover-line-highlight bottom-highlight">
                        <font-awesome-icon :icon="['fas', 'arrow-right']" />
                        Lorem Ipsum
                    </a>
                </li>
                <li>
                    <a href="#" class="hover-line-highlight bottom-highlight active">
                        <font-awesome-icon :icon="['fas', 'arrow-right']" />
                        Sit Amet
                    </a>
                </li>
                <li>
                    <a href="#" class="hover-line-highlight top-highlight">
                        <font-awesome-icon :icon="['fas', 'arrow-right']" />
                        Dolor
                    </a>
                </li>
                <li>
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                    Consectetur adipiscing elit<br />Consectetur adipiscing elit
                </li>
                <li>
                    <span class="icon">LOL</span>
                    Tempor incididunt
                </li>
                <li>
                    <span>
                        <ul class="simple-list">
                            <li>
                                <font-awesome-icon :icon="['fas', 'arrow-right']" />
                                Consectetur adipiscing elit<br />Consectetur adipiscing elit
                            </li>
                            <li>
                                <font-awesome-icon :icon="['fas', 'arrow-right']" />
                                Tempor incididunt
                            </li>
                        </ul>
                    </span>
                </li>
            </ul>

            <ul class="simple-list horizontal">
                <li class="hover-line-highlight">
                    <a href="#">
                        horizonal (is link)
                        <font-awesome-icon :icon="['fas', 'arrow-right']" />
                    </a>
                </li>
                <li class="hover-line-highlight">
                    <a href="#">
                        Consectetur adipiscing elit
                        <font-awesome-icon :icon="['fas', 'arrow-right']" />
                    </a>
                </li>
                <li class="hover-line-highlight">
                    <a href="#">
                        Lorem Ipsum <br /> Lorem Ipsum
                        <font-awesome-icon :icon="['fas', 'arrow-right']" />
                    </a>
                </li>
                <li class="hover-line-highlight">
                    <a href="#">
                        <span class="icon">LOL</span>
                        Tempor incididunt
                    </a>
                </li>
            </ul>
        </v-container>
    </section>

    <section class="theme-section">
        <Panel
            :backgroundImageCss="'https://www.virtual-room.com/app/themes/virtual-room/build/images/bg-pattern.jpg'"
            height="75vh"
            centered
            fixed
        >
            <template v-slot:default>
                <v-container>
                    <h2 class="theme-section-title mb-10">
                        Ready to Boost <br />
                        Your Ecommerce Business?
                    </h2>
                    <v-row>
                        <v-col cols="12" md="5" lg="4" xl="3">
                            <PricingCardMaterialize />
                        </v-col>
                        <v-col cols="12" md="5" lg="4" xl="3">
                            <PricingCardSimple
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
                            <PricingCardSimple
                                title="Lorem Ipsum"
                                :price="150"
                                currency="€"
                                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod <b>tempor incididunt</b> ut labore et dolore magna aliqua."
                                buttonText="Lorem Ipsum"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </template>
        </Panel>
    </section>

    <section class="theme-section">
        <v-row>
            <v-col cols="12" md="4" lg="3">
                <BookCard
                    title="LOREM IPSUM"
                    author="TOAST"
                    color="#00ff00"
                    image="https://assets.guebbit.com/rogheneach/images/volumes/rogh-vol1.jpg"
                    spine="https://assets.guebbit.com/rogheneach/images/volumes/rogh-vol1-spine.jpg"
                />
            </v-col>
            <v-col cols="12" md="4" lg="3">
                <BookCard
                    title="LOREM IPSUM"
                    author="TOAST"
                    color="#00ff00"
                    image="https://placekitten.com/500/400"
                    logo="https://placekitten.com/100/100"
                />
            </v-col>
            <v-col cols="12" md="4" lg="3">
                <BookCard
                    image="https://placekitten.com/700/200"
                    logo="https://placekitten.com/200/200"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4" lg="3">
                pure ratio 4.25/6.87
                <BookCard
                    ratio="4.25/6.87"
                    image="https://placekitten.com/400/700"
                    spine="https://placekitten.com/300/300"
                />
            </v-col>
            <v-col cols="12" md="4" lg="3">
                pure ratio 16/9
                <BookCard
                    ratio="16/9"
                    image="https://placekitten.com/1600/900"
                    spine="https://placekitten.com/700/700"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4" lg="3">
                ratio 4.25/6.87 - width 200
                <BookCard
                    ratio="4.25/6.87"
                    width="200"
                    image="https://placekitten.com/700/700"
                    spine="https://placekitten.com/400/400"
                />
            </v-col>
            <v-col cols="12" md="4" lg="3">
                ratio 4.25/6.87 - height 200
                <BookCard
                    ratio="4.25/6.87"
                    height="200"
                    image="https://placekitten.com/700/700"
                    spine="https://placekitten.com/400/400"
                />
            </v-col>
            <v-col cols="12" md="4" lg="3">
                ratio 16/9 - height 200
                <BookCard
                    ratio="16/9"
                    height="200"
                    image="https://placekitten.com/700/700"
                    spine="https://placekitten.com/400/400"
                />
            </v-col>
            <v-col cols="12" md="4" lg="3">
                ratio 16/9 - width 200
                <BookCard
                    ratio="16/9"
                    width="200"
                    image="https://placekitten.com/700/700"
                    spine="https://placekitten.com/400/400"
                />
            </v-col>
        </v-row>
    </section>

    <section class="theme-section">
        <TrapezoidTitle
            class="theme-page-title text-center"
            :color="$vuetify.theme.themes.default.colors.primary"
            :double="$vuetify.theme.themes.default.colors.secondary"
            outline
            big
            cross
        >
            Lorem Ipsum
        </TrapezoidTitle>
        <TrapezoidTitle
            class="theme-section-title text-center"
            :color="$vuetify.theme.themes.default.colors.primary"
            outline
            big
        >
            Lorem Ipsum
        </TrapezoidTitle>
        <TrapezoidTitle
            class="theme-section-title text-center"
            :color="$vuetify.theme.themes.default.colors.secondary"
        >
            Lorem Ipsum
        </TrapezoidTitle>
        <TrapezoidTitle
            class="theme-section-title text-center"
            :double="$vuetify.theme.themes.default.colors.secondary"
            outline
        >
            Lorem Ipsum
        </TrapezoidTitle>
    </section>

    <section class="theme-section">

        <v-row>
            <v-col cols="12" md="6" lg="4">
                <v-card
                    class="theme-elevation-primary border-primary"
                    variant="outlined"
                    elevation="24"
                >
                    <v-card-title>
                        TITLE
                    </v-card-title>

                    <v-card-subtitle>
                        SUBTITLE
                    </v-card-subtitle>

                    <v-card-text>
                        Greyhound divisely hello coldly fonwderfully
                    </v-card-text>

                    <v-card-actions>
                        <v-btn variant="outlined"
                               class="border-primary theme-elevation-primary"
                               elevation="24"
                        >
                            Button
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" md="6" lg="4">
                <v-card
                    class="theme-elevation-secondary border-secondary"
                    variant="outlined"
                    elevation="12"
                >
                    <v-card-header>
                        <div>
                            <div class="text-overline mb-1">
                                OVERLINE
                            </div>
                            <div class="text-h6 mb-1">
                                Headline
                            </div>
                            <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
                        </div>
                    </v-card-header>

                    <v-card-actions>
                        <v-btn variant="outlined"
                               class="border-secondary"
                               elevation="12"
                        >
                            Button
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" md="6" lg="4">
                <v-card
                    class="border-primary"
                    variant="outlined"
                >
                    <v-card-header>
                        <div>
                            <div class="text-overline mb-1">
                                OVERLINE
                            </div>
                            <div class="text-h6 mb-1">
                                Headline
                            </div>
                            <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
                        </div>
                    </v-card-header>

                    <v-card-actions>
                        <v-btn variant="outlined" class="border-secondary">
                            Button
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </section>

    <section class="theme-section">
        <v-container>
            <ActionPanel
                :height="'300px'"
                :title="'CONNECT WITH US <br/> FOR GAMING UPDATE'"
                @button:click="() => {}"
            >
                <template v-slot:backgroundImage>
                    <v-img
                        cover
                        class="panel-background"
                        :lazy-src="'http://placekitten.com/100/100'"
                        :src="'http://placekitten.com/800/400'"
                    >
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular
                                    indeterminate
                                    color="grey lighten-5"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
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
        </v-container>

        <ActionPanel
            :height="'300px'"
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

        <v-container>
            <ActionPanel
                :height="'300px'"
                :thumbnailImage="'http://placekitten.com/100/100'"
                :backgroundImage="'http://placekitten.com/800/400'"
                :title="'CONNECT WITH US <br/> FOR GAMING UPDATE'"
                :shadow="$vuetify.theme.themes.default.colors.primary"
            />
        </v-container>

        <v-container>
            <ActionPanel
                :height="'300px'"
                :backgroundImageCss="'https://www.virtual-room.com/app/themes/virtual-room/build/images/bg-pattern.jpg'"
                :title="'CONNECT WITH US <br/> FOR GAMING UPDATE'"
                column-right
                fixed
            >
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
        </v-container>
    </section>

    <section class="theme-section">
        <v-row>
            <v-col cols="12" md="6" lg="4">
                <inspirationCard
                    :type="'julia'"
                    :image="'http://placekitten.com/500/500'"
                    :color="$vuetify.theme.themes.default.colors.text"
                    :background="$vuetify.theme.themes.default.colors.primary"
                    :double="$vuetify.theme.themes.default.colors.secondary"
                >
                    <template v-slot:content>
                        <h2>Passionate <span>Julia</span></h2>
                        <p class="card-text">Julia dances in the deep dark</p>
                        <p class="card-text">She loves the smell of the ocean</p>
                        <p class="card-text">And dives into the morning light</p>
                        <a href="#" class="card-action">View more</a>
                    </template>
                </inspirationCard>
            </v-col>
            <v-col v-for="inspiration in inspirationList" :key="'inspiration-'+inspiration" cols="12" md="6" lg="4">
                <inspirationCard
                    :type="inspiration"
                    :color="$vuetify.theme.themes.default.colors.text"
                    :background="$vuetify.theme.themes.default.colors.primary"
                    :double="$vuetify.theme.themes.default.colors.secondary"
                    :image="'http://placekitten.com/500/500'"
                    :title="'Nice ' + inspiration"
                    :text="'Likes to play with crayons and pencils'"
                />
            </v-col>
            <v-col v-for="inspiration in inspirationWithIconsList" :key="'inspiration-'+inspiration" cols="12" md="6" lg="4">
                <inspirationCard
                    :type="inspiration"
                    :color="$vuetify.theme.themes.default.colors.text"
                    :background="$vuetify.theme.themes.default.colors.primary"
                    :double="$vuetify.theme.themes.default.colors.secondary"
                    :image="'http://placekitten.com/500/500'"
                    :title="'Nice ' + inspiration"
                    :text="'Likes to play with crayons and pencils'"
                >
                    <template v-slot:actions>
                        <a href="#">
                            <font-awesome-icon :icon="['fas', 'arrow-right']" />
                        </a>
                        <a href="#">
                            <font-awesome-icon :icon="['fas', 'arrow-right']" />
                        </a>
                        <a href="#">
                            <font-awesome-icon :icon="['fas', 'arrow-right']" />
                        </a>
                    </template>
                </inspirationCard>
            </v-col>
        </v-row>
    </section>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import InspirationCard from "@/components/basics/cards/InspirationCard.vue";
import BookCard from "guebbit-vue-library/src/components/cards/BookCard.vue";
import ActionPanel from "guebbit-vue-library/src/components/blocks/ActionPanel.vue";
import InclinedButton from "@/components/basics/buttons/InclinedButton.vue";
import NeonButton from "@/components/basics/buttons/NeonButton.vue";
import TrapezoidTitle from "@/components/basics/typography/TrapezoidTitle.vue";
import PricingCardSimple from "@/components/basics/cards/PricingCardSimple.vue";
import PricingCardMaterialize from "@/components/basics/cards/PricingCardMaterialize.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SlideOpenTripleCard from "@/components/basics/cards/SlideOpenTripleCard.vue";
import ImageHoverCard from "@/components/basics/cards/ImageHoverCard.vue";
import HyperplexedCard from "@/components/basics/cards/HyperplexedCard.vue";
import EventLongCard from "@/components/basics/cards/EventLongCard.vue";

library.add(faArrowRight)

export default defineComponent({
    name: "TestPage",

    components: {
        EventLongCard,
        HyperplexedCard,
        ImageHoverCard,
        SlideOpenTripleCard,
        PricingCardMaterialize,
        PricingCardSimple,
        NeonButton,
        InspirationCard,
        BookCard,
        ActionPanel,
        TrapezoidTitle,
        InclinedButton,
        FontAwesomeIcon
    },

    data: () => {
        return {
            inspirationList: [
                'lily',
                'sadie',
                'honey',
                'layla',
                'oscar',
                'roxy',
                'bubba',
                'romeo',
                'dexter',
                'sarah',
                'chico',
                'milo',
                'goliath',
                'selena',
                'apollo',
                'steve',
                'moses',
                'jazz',
                'ming',
                'lexi',
                'duke',
                'marley'
            ],
            inspirationWithIconsList: [
                'kira',
                'winston',
                'terry',
                'zoe'
            ]
        };
    }
});
</script>