<template>
    <div id="product-list-page" class="theme-page page-menu-padding">
        <v-container class="page-controls">

            <div class="d-flex justify-center align-start mb-5">
                <!--
                <div class="simple-icon-text font-size-2 mr-10">
                    <font-awesome-icon :icon="['fas', 'tags']" />
                    {{ t('generic.genre') }}
                </div>
                -->
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

            <v-row justify="center">
                <v-col cols="6" md="4" lg="2" xl="1">
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
                <v-col cols="6" md="4" lg="2" xl="1">
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
                <v-col cols="6" md="4" lg="2" xl="1">
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
                <v-col cols="6" md="4" lg="2" xl="1">
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
        </v-container>

        <ProductComicPanel
            v-show="flagVisualizationMasonry !== 0"
            v-for="game in gameListFiltered"
            :key="'game-panel-' + game.id"
            :title="game.title"
            :subtitle="game.author"
            :text="'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' || game.description"
            :categories="game.categories"
            :tags="game.tags"
            :image="game.coverFront"
            :backgroundImage="game.image"
            :primary="themeColors.secondary"
            :secondary="themeColors.primary"

            price="10"
            currency="€"
        >
            <template #background>
                <ImageHoverUpCard
                    :image="game.coverFront"
                />
            </template>
            <template #content2>
                <h3 class="panel-title">{{ game.title }}</h3>
                <h4 class="panel-subtitle">{{ game.author }}</h4>
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
                {{ game.categories }}
                <p class="panel-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
            </template>
            <template #actions>
                <div class="panel-actions">
                    <a href="#" class="icon-text-resources">
                        <span class="icon">
                            4
                            <font-awesome-icon :icon="['fas', 'users']" />
                        </span>
                        Età minima consigliata
                    </a>
                    <a href="#" class="icon-text-resources">
                        <span class="icon">
                            4
                            <font-awesome-icon :icon="['fas', 'users']" />
                        </span>
                        Numero di giocatori
                    </a>
                </div>
            </template>
            <template #links>
                stations
                <pre>{{game}}</pre>
            </template>
        </ProductComicPanel>

        <div v-show="flagVisualizationMasonry === 0">
            <pre>{{gameListFiltered}}</pre>
        </div>
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

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUser, faUsers, faGlobe, faPeopleRoof, faTags, faGrip, faList } from "@fortawesome/free-solid-svg-icons";
library.add(faUser, faUsers, faGlobe, faPeopleRoof, faTags, faGrip, faList);


const { t } = useI18n();
const { state } = useStore();
const { games } = toRefs(state.ecommerce);
const { global: { current: { value: { colors: themeColors } } } } = useTheme();


const selectedCategories = ref<string[]>([]);
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
@import "@/assets/scss/atoms/IconTextResources";

#product-list-page{
    .page-controls{
        .v-btn-group{
            height: auto;
            .v-btn{
                padding: 24px 36px;
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
    }
    .product-comic-panel{
        .v-chip{
            background: rgb(var(--v-theme-primary));
        }
        .image-hover-up-card{
            max-width: 300px;
            margin: 0 auto;
        }
        .panel-actions{
            margin-top: 24px;
            .icon-text-resources{
                color: rgb(var(--v-theme-on-surface));
                .icon{
                    color: inherit;
                }
            }
        }
    }
}
</style>