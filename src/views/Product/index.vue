
<template>
    <div id="product-list-page" class="theme-page page-menu-padding">
        <v-container class="page-controls">

            <v-row>
                <v-col cols="12" md="12" lg="6" xl="6">
					<!--
					TODO
					v-model="gameFilters[0].searchParams"
					:items="searchableParametersList"
					-->
                    <v-text-field
                        v-model="gameFilters[0].search"
                        :label="t('generic.search')"
                        variant="solo"
						hide-details
                    >
                        <template v-slot:append>
                            <font-awesome-icon
								class="v-icon v-icon--size-default v-icon--start cursor-pointer"
								:icon="['fas', 'magnifying-glass']"
							/>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="12" lg="6" xl="6" class="d-flex align-center justify-center">
                    <div class="d-flex justify-center align-start mb-5 w-100">
                        <v-btn-toggle
                            v-model="gameFilters[1].search"
                            class="flex-wrap"
                            selected-class="bg-primary"
                            multiple
                        >
                            <v-btn
                                v-for="category in categoriesList"
                                :key="category + '-button'"
                                :value="category"
								class="px-6 py-4 rounded-0"
                            >
								<span class="hidden-md-and-down">
									{{ t('games.genre-' + category) }}
								</span>
								<font-awesome-icon class="ml-3" size="xl" :icon="categoryIcon(category)" />
                            </v-btn>
                        </v-btn-toggle>
                    </div>
                </v-col>
				<v-col cols="12" md="12" lg="12" xl="6" class="tag-search d-flex align-center justify-center flex-gap-12 flex-wrap">
					<v-item-group
						v-model="filterList.familySafe"
						selected-class="bg-primary"
					>
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
					<v-item-group
						v-model="filterList.multiplayerOnline"
						selected-class="bg-primary"
					>
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

					<!-- TODO fare un ciclo for e standardizzare: -->

					<v-card
						class="d-flex align-center pa-3"
						:class="{
							'bg-primary': filterList.multiplayerOffline > 0
						}"
						@click="filterList.multiplayerOffline === undefined ?
										filterList.multiplayerOffline = 1 :
											filterList.multiplayerOffline >= 2 ?
												filterList.multiplayerOffline = 0 :
												filterList.multiplayerOffline++"
					>
						<div class="flex-grow-1 text-center">
							<font-awesome-icon
								size="2x"
								:icon="!filterList.multiplayerOffline ?
											['fas', 'user-group'] :
											filterList.multiplayerOffline === 1 ?
											['fas', 'user'] :
											['fas', 'users']"
							/>
							<small v-if="!filterList.multiplayerOffline" class="d-block mt-3">
								{{ t('generic.singleplayer') + '/' + t('generic.multiplayer') }}
							</small>
							<p v-else class="mt-3">
								{{
									filterList.multiplayerOffline === 1 ?
										t('generic.singleplayer') :
										t('generic.multiplayer')
								}}
							</p>
						</div>
					</v-card>
					<v-card
						class="d-flex align-center pa-3"
						:class="{
							'bg-primary': filterList.motionSickness > 0
						}"
						@click="filterList.motionSickness === undefined ?
										filterList.motionSickness = 1 :
											filterList.motionSickness >= 2 ?
												filterList.motionSickness = 0 :
												filterList.motionSickness++"
					>
						<div class="flex-grow-1 text-center">
							<font-awesome-icon
								size="2x"
								:icon="!filterList.motionSickness ?
									['fas', 'face-smile'] :
									filterList.motionSickness === 1 ?
									['fas', 'face-grin-beam'] :
									['fas', 'face-dizzy']"
							/>
							<small class="d-block mt-3">
								{{
									!filterList.motionSickness ?
										t('product-list-page.motion-sickness-indifferent')  :
										filterList.motionSickness === 1 ?
											t('product-list-page.motion-sickness-low') :
											t('product-list-page.motion-sickness-high')
								}}
							</small>
						</div>
					</v-card>

					<v-card
						class="d-flex align-center pa-3"
						:class="{
							'bg-primary': filterList.difficulty > 0
						}"
						@click="filterList.difficulty === undefined ?
										filterList.difficulty = 1 :
											filterList.difficulty >= 2 ?
												filterList.difficulty = 0 :
												filterList.difficulty++"
					>
						<div class="flex-grow-1 text-center">
							<font-awesome-icon
								size="2x"
								:icon="!filterList.difficulty ?
									['fas', 'face-smile'] :
									filterList.difficulty === 1 ?
									['fas', 'face-grin-beam'] :
									['fas', 'face-dizzy']"
							/>
							<p class="mt-3">
								{{
									!filterList.difficulty ?
										t('product-list-page.difficulty-indifferent')  :
										filterList.difficulty === 1 ?
											t('product-list-page.difficulty-low') :
											t('product-list-page.difficulty-high')
								}}
							</p>
						</div>
					</v-card>

					<v-card
						class="d-flex align-center pa-3"
						:class="{
							'bg-primary': filterList.duration > 0
						}"
						@click="filterList.duration === undefined ?
										filterList.duration = 1 :
											filterList.duration >= 3 ?
												filterList.duration = 0 :
												filterList.duration++"
					>
						<div class="flex-grow-1 text-center">
							<font-awesome-icon
								size="2x"
								:icon="!filterList.duration ?
									['fas', 'hourglass-empty'] :
									filterList.duration === 1 ?
										['fas', 'hourglass-start'] :
										filterList.duration === 2 ?
											['fas', 'hourglass-half'] :
											['fas', 'hourglass-end']"
							/>
							<p class="mt-3">
								{{
									!filterList.duration ?
										t('product-list-page.duration-indifferent')  :
										filterList.duration === 1 ?
											t('product-list-page.duration-low') :
											filterList.duration === 2 ?
												t('product-list-page.duration-medium') :
												t('product-list-page.duration-high')
								}}
							</p>
						</div>
					</v-card>

					<v-card
						class="d-flex align-center pa-3"
						:class="{
							'bg-primary': filterList.minAge > 0
						}"
						@click="filterList.minAge === undefined ?
									filterList.minAge = 1 :
									filterList.minAge >= 3 ?
										filterList.minAge = 0 :
										filterList.minAge++"
					>
						<div class="flex-grow-1 text-center">
							<span class="text-h4">
								{{
									!filterList.minAge ?
										'6+' :
										filterList.minAge === 1 ?
											'10+' :
											filterList.minAge === 2 ?
												'14+' :
												'18+'
								}}
							</span>
							<small class="d-block mt-3">
								{{ t('product-list-page.minAge-warning') }}
							</small>
						</div>
					</v-card>

					<!-- TODO modeVisualization >= 2 -->
					<v-card
						class="d-flex align-center pa-3"
						variant="outlined"
						@click="modeVisualization === undefined ?
										modeVisualization = 1 :
											modeVisualization >= 1 ?
												modeVisualization = 0 :
												modeVisualization++"
					>
						<div class="flex-grow-1 text-center">
							<font-awesome-icon
								size="2x"
								:icon="!modeVisualization ?
											['fas', 'grip'] :
											modeVisualization === 1 ?
											['fas', 'panorama'] :
											['fas', 'list']"
							/>
						</div>
					</v-card>


				</v-col>

				<v-col cols="12" md="12" lg="12" xl="6" class="d-flex align-end justify-center flex-gap-12">
					<v-btn
						v-for="sort in sortingParametersList"
						:key="'sortable-' + sort"
						:class="{
							'bg-primary': sortList[sort] === 1,
							'bg-secondary': sortList[sort] === 2
						}"
						variant="flat"
						@click="
						sortList[sort] === undefined ?
						sortList[sort] = 1 :
							sortList[sort] >= 2 ?
								sortList[sort] = 0 :
								sortList[sort]++
						"
					>
						<font-awesome-icon
							class="mr-3"
							:icon="!sortList[sort] ?
								['fas', 'sort'] :
								sortList[sort] === 1 ?
								['fas', 'sort-down'] :
								['fas', 'sort-up']
							"
						/>
						<span class="hidden-md-and-down">{{ t('product-list-page.filter-' + sort) }}</span>
						<font-awesome-icon class="ml-3" :icon="sortingIcon(sort)" />
					</v-btn>
				</v-col>

            </v-row>
        </v-container>

        <div v-show="modeVisualization === 0"
             class="game-list-details"
        >
            <div class="game-list-details-shadow"></div>
            <ProductComicPanel
                v-for="game in itemListFiltered"
                :key="'game-panel-' + game.id"
                :primary="themeColors.secondary"
                :secondary="themeColors.primary"
                height="70vh"
            >
                <template #background2 >
                    <v-img
                        cover
                        class="panel-background"
                        :lazy-src="game.imageThumbnail"
                        :src="game.image"
                        height="100%"
                        width="100%"
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
                            height="100%"
                            width="100%"
                        />
                    </ImageHoverUpCard>
                </template>
                <template #content>
                    <div class="categories-wrapper">
                        <v-btn
                            v-for="(category, i) in game.categories"
                            :key="'category-title-' + i"
                            class="mx-2"
                            variant="flat"
                            color="primary"
                        >
                            {{ t('games.genre-' + category) }}
                        </v-btn>
                    </div>

                    <!-- TODO stations -->
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
                        <span v-show="game.familyFriendly"
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

        <v-container v-show="modeVisualization === 1">
            <v-row
                class="game-list-masonry"
                justify="center"
            >
                <v-col v-for="game in itemListFiltered"
                       :key="'game-wrapper-' + game.id"
                       cols="6" md="4" lg="3" xl="2"
                >
                    <ImageHoverUpCard
                        :key="'game-' + game.id"
                        :image="game.coverFront"
                        @click="$router.push({
                            name: 'GameTarget',
                            params: {
                                id: game.id
                            }
                        })"
                    >
                        <v-img
                            :lazy-src="game.coverFrontThumbnail"
                            :src="game.coverFront"
                            height="100%"
                            width="100%"
                        />
                    </ImageHoverUpCard>
                </v-col>
            </v-row>
        </v-container>

		<v-container v-show="modeVisualization === 2">
			<br><br><br><br><br><br><br>
			<h1 class="text-center">COMING SOON</h1>
			<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
		</v-container>
    </div>

	<Footer
		:primary="themeColors.primary"
		:secondary="themeColors.secondary"
	/>
</template>

<script setup lang="ts">
import { toRefs, ref, computed } from "vue";
import { useTheme } from "vuetify";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";

import useItemList, { type itemListFiltersMap } from "@/resources/composables/useItemList";
import ProductComicPanel from "@/components/basics/blocks/ProductComicPanel.vue";
import ImageHoverUpCard from "@/components/basics/cards/ImageHoverUpCard.vue";
import Footer from "@/components/generic/Footer.vue";
import type { gameMap } from "@/interfaces";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUser, faUsers, faUserGroup, faGlobe, faPeopleRoof, faTags, faGrip, faList, faPanorama, faPlay, faArrowRight, faMagnifyingGlass,
	faDiceD20, faHandFist, faVolleyball, faHatWizard, faMusic, faPuzzlePiece, faGun, faPeopleGroup, faHeading, faIdCard, faHourglass, faHourglassEmpty, faHourglassStart,
	faHourglassHalf, faHourglassEnd, faSort, faSortDown, faSortUp, faFaceSmile, faFaceGrinBeam, faFaceDizzy
} from "@fortawesome/free-solid-svg-icons";

library.add(faUser, faUsers, faUserGroup, faGlobe, faPeopleRoof, faTags, faGrip, faList, faPanorama, faPlay, faArrowRight, faMagnifyingGlass,
	faDiceD20, faHandFist, faVolleyball, faHatWizard, faMusic, faPuzzlePiece, faGun, faPeopleGroup, faHeading, faIdCard, faHourglass, faHourglassEmpty, faHourglassStart,
	faHourglassHalf, faHourglassEnd, faSort, faSortDown, faSortUp, faFaceSmile, faFaceGrinBeam, faFaceDizzy
);

const { t } = useI18n();
const { state, dispatch } = useStore();
const { games } = toRefs(state.ecommerce);
const { global: { current: { value: { colors: themeColors } } } } = useTheme();

/**
 * Possible sort/search options
 */
const sortingParametersList = ['title',	'minAge', 'duration', 'maxPlayersOffline'];
const searchableParametersList = ['title', 'author', 'description'];

/**
 * Filter rules (for searchRecords of guebbit-javascript-library)
 * General logic: AND
 * So every rule in the array has to be true
 *
 * Invidually, every rule can be AND or OR on the checks it make
 */
const gameFilters = ref<itemListFiltersMap[]>([
	{
          search: '',
          searchParams: ['title'],
          logic: 'OR',
          stringLimit: 2,
          distance: -1
	},
	{
          search: [],
          searchParams: ['categories'],
          logic: 'OR',
	}
]);

/**
 *
 */
const {
	itemList,
	itemListFiltered :itemListFilteredOriginal
} = useItemList<gameMap>(
	games,
	Promise.all([
		dispatch('main/initApp'),
		dispatch('ecommerce/getGames')
	]),
	gameFilters,
);

/**
 * Sort order
 * Order of array is order of importance
 *
 * 0 = neutral
 * 1 = descending
 * 2 = ascending
 */
const sortList = ref<Record<string, number>>({});

/**
 * WARNING: vuetify item-group flags with "undefined" as false and "0" as true
 */
const filterList = ref<Record<string, number>>({});

/**
 * Visualization mode
 */
const modeVisualization = ref(1);


// list of categories (extrapolated from games)
const categoriesList = computed<string[]>(() => {
    return [... new Set(
        itemList.value.reduce((catArray, { categories = [] }) => {
            catArray.push(...categories);
            return catArray;
        }, [] as string[])
    )]
});

/**
 * list to show after filters and sorting are applied
 * TODO break down better
 */
const itemListFiltered = computed<gameMap[]>(() => {
	// TODO add filters numbers "< = >" + booleans
	let gameArray = itemListFilteredOriginal.value as gameMap[];

	// EXTENDED FILTERS
	if(filterList.value['familySafe'] === 0)
		gameArray = gameArray.filter(({ familyFriendly }) => familyFriendly);
	if(filterList.value['multiplayerOnline'] === 0)
		gameArray = gameArray.filter(({ maxPlayersOnline = 0 }) => maxPlayersOnline > 0);
	if(filterList.value['multiplayerOffline']){
		if(filterList.value['multiplayerOffline'] === 1)
			gameArray = gameArray.filter(({ maxPlayersOffline = 1 }) => maxPlayersOffline === 1);
		if(filterList.value['multiplayerOffline'] === 2)
			gameArray = gameArray.filter(({ maxPlayersOffline = 1 }) => maxPlayersOffline > 1);
	}
	if(filterList.value['motionSickness']){
		if(filterList.value['motionSickness'] === 1)
			gameArray = gameArray.filter(({ motionSickness }) => motionSickness && motionSickness <= 2);
		if(filterList.value['motionSickness'] === 2)
			gameArray = gameArray.filter(({ motionSickness }) => motionSickness && motionSickness > 3);
	}
	if(filterList.value['difficulty']){
		if(filterList.value['difficulty'] === 1)
			gameArray = gameArray.filter(({ difficulty }) => difficulty && difficulty <= 2);
		if(filterList.value['difficulty'] === 2)
			gameArray = gameArray.filter(({ difficulty }) => difficulty && difficulty > 3);
	}
	if(filterList.value['duration']){
		if(filterList.value['duration'] === 1)
			gameArray = gameArray.filter(({ duration }) => duration && duration <= 1800000);
		if(filterList.value['duration'] === 2)
			gameArray = gameArray.filter(({ duration }) => duration && (1800000 < duration && duration < 3600000));
		if(filterList.value['duration'] === 3)
			gameArray = gameArray.filter(({ duration }) => duration && duration > 3600000);
	}
	if(filterList.value['minAge']){
		if(filterList.value['duration'] === 1)
			gameArray = gameArray.filter(({ minAge }) => minAge && minAge >= 10);
		if(filterList.value['duration'] === 2)
			gameArray = gameArray.filter(({ minAge }) => minAge && minAge >= 14);
		if(filterList.value['duration'] === 3)
			gameArray = gameArray.filter(({ minAge }) => minAge && minAge >= 18);
	}

	// SORTING
	gameArray.sort((item1 :gameMap, item2 :gameMap) => {
		for(const key in sortList.value)
			// if undefined or 0, ignore
			if(Object.prototype.hasOwnProperty.call(sortList.value, key) && sortList.value[key] > 0){
				// if nobody has the value, ignore and continue
				if(!Object.prototype.hasOwnProperty.call(item1, key) && !Object.prototype.hasOwnProperty.call(item1, key))
					continue;
				// if one of the items hasn't the parameter but other does: the first loses
				if(!Object.prototype.hasOwnProperty.call(item1, key))
					return -1;
				if(!Object.prototype.hasOwnProperty.call(item2, key))
					return 1;
				// if descending: the greatest win, if ascending: the lowest win
				if(item1[key as keyof typeof item1]! > item2[key as keyof typeof item2]!)
					return sortList.value[key] === 1 ? 1 : -1;
				if(item1[key as keyof typeof item1]! < item2[key as keyof typeof item2]!)
					return sortList.value[key] === 1 ? -1 : 1;
				// if they were the same, continue to the next
			}
		return 0;
	});
	// return remaining values
	return gameArray;
});

/**
 * UI
 */
function categoryIcon(category :string) :[string, string]{
	switch (category){
		case 'gdr':
			return ['fas', 'dice-d20'];
		case 'action':
			return ['fas', 'hand-fist'];
		case 'sport':
			return ['fas', 'volleyball'];
		case 'adventure':
			return ['fas', 'hat-wizard'];
		case 'rhythm':
			return ['fas', 'music'];
		case 'puzzle':
			return ['fas', 'puzzle-piece'];
		case 'shooter':
			return ['fas', 'gun'];
		case 'party-game':
			return ['fas', 'people-group'];
	}
	return ['fas', 'play'];
}

function sortingIcon(sort :string){
	switch (sort){
		case 'title':
			return ['fas', 'heading'];
		case 'minAge':
			return ['fas', 'id-card'];
		case 'duration':
			return ['fas', 'hourglass'];
		case 'maxPlayersOffline':
			return ['fas', 'people-group'];
	}
	return ['fas', 'play'];
}
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
			font-size: 0.7em;
            .v-card{
				width: 100px;
				height: 100px;
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
            padding: 60px 0;
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

            .categories-wrapper{
                position: absolute;
                top: -2em;
                right: 0;
            }

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
                    margin: 12px;
                    color: rgb(var(--v-theme-on-surface));
                    .icon{
                        color: inherit;
                    }
                }
                @include media-mobile(){
                    text-align: center;
                }
            }
        }
    }
    .game-list-masonry{
        .image-hover-up-card{
            cursor: pointer;
            transition: box-shadow 0.2s;
            &:hover{
                @include boxShadowSecondary;
            }
        }
    }
}
</style>