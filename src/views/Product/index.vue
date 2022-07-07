<template>
    <div id="product-list-page" class="theme-page page-menu-padding">
        <v-container class="page-controls">

            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="searchText"
                        :placeholder="t('generic.search')"
                        variant="underlined"
                    >
                        <template v-slot:append>
                            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="12" lg="6">
                    <div class="d-flex justify-center align-start mb-5 category-search w-100">
                        <v-btn-toggle
                            v-model="selectedCategories"
                            class="flex-wrap"
                            selected-class="bg-primary"
                            multiple
                        >
                            <v-btn
                                v-for="category in categoriesList"
                                :key="category + '-button'"
                                :value="category"
                            >
                                {{ t('games.genre-' + category) }}
                            </v-btn>
                        </v-btn-toggle>
                    </div>
                </v-col>
                <v-col cols="12" md="12" lg="6">
                    <v-row class="tag-search w-100" justify="center">
                        <v-col cols="6" md="4" lg="3">
                            <v-item-group v-model="flagOfflineMultiplayer" selected-class="bg-primary">
                                <v-item v-slot="{ isSelected, selectedClass, toggle }">
                                    <v-card
                                        :class="['d-flex align-center', selectedClass]"
                                        @click="toggle"
                                    >
                                        <div class="flex-grow-1 text-center">
                                            <font-awesome-icon :icon="isSelected ? ['fas', 'users'] : ['fas', 'user']" />
                                            <p class="mt-3">{{ isSelected ? t('generic.multiplayer') : t('generic.singleplayer') }}</p>
                                        </div>
                                    </v-card>
                                </v-item>
                            </v-item-group>
                        </v-col>
                        <v-col cols="6" md="4" lg="3">
                            <v-item-group v-model="flagFamilySafe" selected-class="bg-primary">
                                <v-item v-slot="{ selectedClass, toggle }">
                                    <v-card
                                        :class="['d-flex align-center', selectedClass]"
                                        @click="toggle"
                                    >
                                        <div class="flex-grow-1 text-center">
                                            <font-awesome-icon :icon="['fas', 'people-roof']" />
                                            <p class="mt-3">{{ t('generic.family-friendly') }}</p>
                                        </div>
                                    </v-card>
                                </v-item>
                            </v-item-group>
                        </v-col>
                        <v-col cols="6" md="4" lg="3">
                            <v-item-group v-model="flagOnlineMultiplayer" selected-class="bg-primary">
                                <v-item v-slot="{ selectedClass, toggle }">
                                    <v-card
                                        :class="['d-flex align-center', selectedClass]"
                                        @click="toggle"
                                    >
                                        <div class="flex-grow-1 text-center">
                                            <font-awesome-icon :icon="['fas', 'globe']" />
                                            <p class="mt-3">{{ t('generic.online') }}</p>
                                        </div>
                                    </v-card>
                                </v-item>
                            </v-item-group>
                        </v-col>
                        <v-col cols="6" md="4" lg="3">
                            <v-item-group v-model="flagVisualizationMasonry" class="h-100">
                                <v-item v-slot="{ isSelected, toggle }">
                                    <v-card
                                        variant="outlined"
                                        class="h-100"
                                        :class="['d-flex align-center']"
                                        @click="toggle"
                                    >
                                        <div class="flex-grow-1 text-center font-size-2">
                                            <font-awesome-icon :icon="isSelected ? ['fas', 'grip'] : ['fas', 'list']" />
                                        </div>
                                    </v-card>
                                </v-item>
                            </v-item-group>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>

        <div v-show="flagVisualizationMasonry !== 0"
             class="game-list-details"
        >
            <div class="game-list-details-shadow"></div>
            <ProductComicPanel
                v-for="game in gameListFiltered"
                :key="'game-panel-' + game.id"
                :primary="themeColors.secondary"
                :secondary="themeColors.primary"
                price="10"
                currency="€"
            >
                <template #background2 >
                    <v-img
                        cover
                        class="panel-background"
                        :lazy-src="game.coverFrontThumbnail"
                        :src="game.coverFront"
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
                <template #image>
                    <ImageHoverUpCard
                        :image="game.coverFront"
                    >
                        <v-img
                            :lazy-src="game.coverFrontThumbnail"
                            :src="game.coverFront"
                        />
                    </ImageHoverUpCard>
                </template>
                <template #content>
                    <!-- TODO stations -->
                    <h3 class="panel-title">{{ game.title }}</h3>
                    <h4 class="panel-subtitle">{{ game.author }}</h4>
                    <div class="panel-chips">
                        <v-chip
                            v-for="(badge, i) in game.categories"
                            :key="'badge-' + i"
                            class="ma-2"
                            text-color="white"
                        >
                            {{ t('games.genre-' + badge) }}
                        </v-chip>
                    </div>
                    <div class="panel-chips">
                        <v-chip
                            v-for="(badge, i) in game.tags"
                            :key="'badge-' + i"
                            class="ma-2"
                            text-color="white"
                        >
                            {{ badge }}
                        </v-chip>
                    </div>
                    <p class="panel-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua
                    </p>
                    <div class="panel-info-icons">
                    <span class="icon-text-resources">
                        <span class="icon">
                            4+
                            <font-awesome-icon :icon="['fas', 'id-card']" />
                        </span>
                        <small>Età minima consigliata</small>
                    </span>
                        <span v-show="game.maxPlayersOffline > 1"
                              class="icon-text-resources"
                        >
                        <span class="icon">
                            {{ game.maxPlayersOffline }}
                            <font-awesome-icon :icon="['fas', 'users']" />
                        </span>
                        <small>{{ t('generic.multiplayer') }}</small>
                    </span>
                        <span v-show="game.maxPlayersOnline > 1"
                              class="icon-text-resources"
                        >
                        <span class="icon">
                            <font-awesome-icon :icon="['fas', 'globe']" />
                        </span>
                        <small>{{ t('generic.multiplayer') }} {{ t('generic.online') }}</small>
                    </span>
                        <span v-show="game.maxPlayersOffline <= 1 && game.maxPlayersOnline <= 1"
                              class="icon-text-resources"
                        >
                        <span class="icon">
                            <font-awesome-icon :icon="['fas', 'user']" />
                        </span>
                        <small>{{ t('generic.singleplayer-2') }}</small>
                    </span>
                        <span v-show="game.flagFamilyFriendly"
                              class="icon-text-resources"
                        >
                        <span class="icon">
                            <font-awesome-icon :icon="['fas', 'people-roof']" />
                        </span>
                        <small>{{ t('generic.family-friendly') }}</small>
                    </span>
                    </div>
                </template>
                <template #actions>
                    <div class="panel-actions text-right mt-10">
                        <v-btn
                            variant="outlined"
                            color="primary"
                            class="ma-2"
                            @click="$router.push({
                            name: 'GameTarget',
                            params: {
                                id: game.id
                            }
                        })"
                        >
                            {{ t('generic.more-info') }}
                            <font-awesome-icon class="ml-3" :icon="['fas', 'arrow-right']" />
                        </v-btn>
                        <v-btn color="primary"
                               class="ma-2"
                               @click="$router.push({
                                name: 'Play'
                           })"
                        >
                            {{ t('generic.play-now') }}
                            <font-awesome-icon class="ml-3" :icon="['fas', 'play']" />
                        </v-btn>
                    </div>
                </template>
            </ProductComicPanel>
        </div>

        <v-row v-show="flagVisualizationMasonry === 0"
               class="game-list-masonry"
               justify="center"
        >
            <v-col v-for="game in gameListFiltered"
                 :key="'game-wrapper-' + game.id"
                 cols="6" md="4" lg="2" xl="1"
            >
                <BookCard
                    :key="'game-' + game.id"
                    ratio="4.25/6.87"
                    rotation="2"
                    :image="game.coverFront"
                    :spine="game.coverSpine"
                    @click="$router.push({
                        name: 'GameTarget',
                        params: {
                            id: game.id
                        }
                    })"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
// DESKTOP MENU A LATO, MOBILE A SCOMPARSA (O IN ALTO)
// tabs / filtri per tipologia e sotto MASONRY (o normale lista)

import { toRefs, ref, computed } from "vue";
import { useTheme } from "vuetify";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";


import type { gameMap } from "@/interfaces";
import ProductComicPanel from "@/components/basics/blocks/ProductComicPanel.vue";
import ImageHoverUpCard from "@/components/basics/cards/ImageHoverUpCard.vue";
import BookCard from "guebbit-vue-library/src/components/cards/BookCard.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUser, faUsers, faGlobe, faPeopleRoof, faTags, faGrip, faList, faIdCard, faPlay, faArrowRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

library.add(faUser, faUsers, faGlobe, faPeopleRoof, faTags, faGrip, faList, faIdCard, faPlay, faArrowRight, faMagnifyingGlass);


const { t } = useI18n();
const { state } = useStore();
const { games } = toRefs(state.ecommerce);
const { global: { current: { value: { colors: themeColors } } } } = useTheme();


const selectedCategories = ref<string[]>([]);
const searchText = ref('');
// WARNING: vuetify flags with "undefined" as false and "0" as true
const flagFamilySafe = ref();
const flagOfflineMultiplayer = ref();
const flagOnlineMultiplayer = ref();
const flagVisualizationMasonry = ref();

// flags transposed in array of strings for better filter
const flagBooleanList = computed<Array<keyof gameMap>>(() => {
    const flagArray :Array<keyof gameMap> = [];
    if(flagFamilySafe.value === 0)
        flagArray.push('flagFamilyFriendly');
    return flagArray;
});
// "at least" OK
// "at max" TODO?
const flagNumberList = computed<Array<[keyof gameMap, number]>>(() => {
    const flagArray :Array<[keyof gameMap, number]> = [];
    if(flagOfflineMultiplayer.value === 0)
        flagArray.push(['maxPlayersOffline', 2]);
    if(flagOnlineMultiplayer.value === 0)
        flagArray.push(['maxPlayersOnline', 2]);
    return flagArray;
});

// true list of games
const gameList = computed<gameMap[]>(() => {
    return Object.values(games.value);
});

// list of categories (extrapolated from games)
const categoriesList = computed<string[]>(() => {
    return [... new Set(
        gameList.value.reduce((catArray, { categories = [] }) => {
            catArray.push(...categories);
            return catArray;
        }, [] as string[])
    )]
});

// list to show after filters are applied
const gameListFiltered = computed<gameMap[]>(() => {
    let gameArray = gameList.value;
    // OR FILTER: if categories are selected
    if(selectedCategories.value.length > 0){
        gameArray = gameArray.filter(({ categories = [] }) => {
            return selectedCategories.value.some(r => categories.includes(r));
        });
    }
    // AND FILTER: if boolean flags are selected
    if(flagBooleanList.value.length > 0 || flagNumberList.value.length > 0){
        gameArray = gameArray.filter((game) => {
            // TODO al momento è OR, rendere AND
            for(let i = flagBooleanList.value.length; i--; )
                if(game[flagBooleanList.value[i]])
                    return true;
            for(let i = flagNumberList.value.length; i--; ){
                const [ key, num ] = flagNumberList.value[i];
                if(game[key] >= num)
                    return true;
            }
            return false;
        });
    }
    if(searchText.value.length > 1){
        gameArray = gameArray.filter(({ title, author, description }) => {
            const lowerCaseSearch = searchText.value.toLowerCase();
            return (title && title.toLowerCase().includes(lowerCaseSearch)) ||
                (author && author.toLowerCase().includes(lowerCaseSearch)) ||
                (description && description.toLowerCase().includes(lowerCaseSearch))
        });
    }
    // return remaining values
    return gameArray;
});


/*
const selectedCategoryList = computed<string[]>(() => {
    let catArray :string[] = [];
    for(let i = selectedCategoryIndexes.value.length; i--; ){
        catArray.push(categoriesList.value[selectedCategoryIndexes.value[i]])
    }
    return catArray;
})
*/

</script>

<style lang="scss">
@import 'src/assets/scss/main/global';
@import "@/assets/scss/atoms/IconTextResources";

#product-list-page{
    .page-controls{
        .v-btn-group{
            height: auto;
            .v-btn{
                text-align: center;
                font-size: 0.75em;
                padding: 12px 24px;
                @include media-desktop(){
                    padding: 24px 36px;
                }
            }
        }
        .v-item-group{
            .v-card{
                padding: 24px 12px;
                svg{
                    font-size: 2em;
                }
                p{
                    font-size: 1.2em;
                }
            }
        }
        .tag-search{
            .v-card{
                p{
                    white-space: nowrap;
                }
            }
        }
    }

    .game-list-details{
        &-shadow{
            margin-top: 24px;
            height: 5vh;
            background: linear-gradient(0deg, #000000 0%, transparent 100%);
        }

        /*
        & > * {
            &:first-child{
                .panel-shadow {
                    opacity: 1;
                    background: linear-gradient(to bottom,
                        rgb(var(--v-theme-background)),
                        rgba(#000000, 0.7),
                        rgba(#000000, 0.5),
                        rgba(#000000, 0.7),
                        #000000
                    );
                }
            }
        }
        */

        .product-comic-panel{
            /*
            .panel-shadow {
                opacity: 1;
                background: linear-gradient(to bottom,
                    rgb(var(--v-theme-background)),
                    rgba(var(--v-theme-background), 0.7),
                    rgba(var(--v-theme-background), 0.5),
                    rgba(var(--v-theme-background), 0.7),
                    rgb(var(--v-theme-background))
                );
            }
            */

            .v-chip{
                background: rgb(var(--v-theme-primary));
            }
            .image-hover-up-card{
                max-width: 300px;
                margin: 0 auto;
            }
            .panel-info-icons{
                font-size: 0.9em;
                margin-top: 24px;
                .icon-text-resources{
                    margin: 0 12px;
                    color: rgb(var(--v-theme-on-surface));
                    .icon{
                        color: inherit;
                    }
                }
            }
        }
    }
    .game-list-masonry{
        //
    }
}
</style>