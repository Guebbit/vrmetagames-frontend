<template>
    <div id="product-list-page" class="theme-page page-menu-padding">
        <v-container class="page-controls">
			<v-row v-show="isAdmin">
				<v-col cols="12" md="6" lg="4" xl="2">
					<v-select
						:items="filterTargetLogicList"
						variant="outlined"
						:label="t('product-list-page.filter-label-logic')"
					/>
				</v-col>
				<v-col cols="12" md="6" lg="4" xl="2">
					<v-select
						:items="searchTextParametersList"
						variant="outlined"
						chips
						:label="t('product-list-page.filter-label-searchable')"
						multiple
					/>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="12" md="8" lg="7" xl="4">
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

				<v-col cols="12" md="4" lg="5" xl="2">
					<v-select
						v-model="gameFilters[2].search"
						:items="tagsList"
						chips
						:label="t('product-list-page.filter-label-tags')"
						multiple
						hide-details
					></v-select>
				</v-col>
			</v-row>

            <v-row>
				<v-col cols="12" md="12" lg="4" xl="4" class="filter-by-station-section">
					<v-item-group
						v-model="vuetifyTemporaryFixItemGroupVModel"
						class="d-flex align-center justify-center flex-gap-12"
						multiple
					>
						<v-item
							v-for="station in stationsList"
							:key="'stations-filter-' + station.id"
							v-slot="{ isSelected, toggle }"
						>
							<v-card
								:color="isSelected ? 'secondary' : ''"
								class="d-flex align-center"
								dark
								@click="toggle"
							>
								<div class="flex-grow-1 text-center">
									<vrmetagamesLogo />
									<component
										:is="station.label[locale].length > 10 ? 'small' : 'p'"
										class="d-block mt-n7 text-no-wrap"
									>
										{{ station.label[locale] }}
									</component>
								</div>
							</v-card>
						</v-item>
					</v-item-group>
				</v-col>
                <v-col cols="12" md="12" lg="8" xl="8" class="d-flex align-center justify-center">
                    <div class="d-flex justify-center align-start mb-5 w-100">
                        <v-btn-toggle
                            v-model="gameFilters[1].search"
                            class="flex-wrap"
                            selected-class="bg-primary"
                            multiple
                        >
                            <v-btn
                                v-for="cat in categoriesList"
                                :key="cat + '-button'"
                                :value="cat"
								class="px-6 py-4 rounded-0"
                            >
								<span class="hidden-md-and-down">
									{{ t('games.genre-' + cat) }}
								</span>
								<font-awesome-icon class="ml-3" size="xl" :icon="categoryIcon(cat)" />
                            </v-btn>
                        </v-btn-toggle>
                    </div>
                </v-col>
            </v-row>

			<v-row>
				<v-col cols="12" class="filter-by-tag-section d-flex align-center justify-space-between flex-wrap flex-gap-12">

					<!-- TODO creare VuetifyBlockFilter, filterableParametersList as items e lista icone con Record<string, componenteicona> da richiamare  -->
					<div class="d-flex flex-wrap flex-gap-12">
						<template
							v-for="{ name, text, icon, variant = 'elevated', activeColor, levels = [] } in filterableParametersList"
							:key="'card-filters-' + name"
						>
							<v-item-group
								v-if="levels.length < 1"
								v-model="gameFiltersAdvanced[name]"
								:variant="variant"
								:selectedClass="activeColor"
							>
								<v-item v-slot="{ selectedClass, toggle }" :value="1">
									<v-card
										:class="['d-flex align-center', selectedClass]"
										@click="toggle"
									>
										<div class="flex-grow-1 text-center">
											<font-awesome-icon v-show="icon" :icon="icon" />
											<p v-show="text" class="mt-3">{{ text }}</p>
										</div>
									</v-card>
								</v-item>
							</v-item-group>
							<v-card
								v-else
								:variant="variant"
								class="d-flex align-center pa-3"
								:class="{
								[activeColor]: gameFiltersAdvanced[name] > 0
							}"
								@click="gameFiltersAdvanced[name] === undefined ?
											gameFiltersAdvanced[name] = 1 :
												gameFiltersAdvanced[name] + 1 >= levels.length ?
													gameFiltersAdvanced[name] = 0 :
													gameFiltersAdvanced[name]++"
							>
								<div
									v-if="levels[gameFiltersAdvanced[name] || 0]"
									class="flex-grow-1 text-center"
								>
									<font-awesome-icon
										v-if="levels[gameFiltersAdvanced[name] || 0].icon"
										size="2x"
										:icon="levels[gameFiltersAdvanced[name] || 0].icon"
									/>
									<span
										v-if="levels[gameFiltersAdvanced[name] || 0].iconText"
										class="text-h4"
									>
									{{ levels[gameFiltersAdvanced[name] || 0].iconText }}
								</span>
									<component
										v-if="levels[gameFiltersAdvanced[name] || 0].text"
										:is="levels[gameFiltersAdvanced[name] || 0].text?.length > 10 ? 'small' : 'p'"
										class="d-block mt-3"
									>
										{{ levels[gameFiltersAdvanced[name] || 0].text }}
									</component>
								</div>
							</v-card>
						</template>
					</div>

					<v-card
						class="d-flex align-center pa-3"
						variant="outlined"
						@click="modeVisualization === undefined ?
										modeVisualization = 1 :
											modeVisualization >= 2 ?
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
				<v-col cols="12" class="d-flex align-end justify-end flex-gap-12">
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

        <div v-if="modeVisualization === 0"
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
                        :lazy-src="game.image.thumbnail"
                        :src="game.image.src"
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
							:lazy-src="game.coverFront.thumbnail"
							:src="game.coverFront.src"
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
							:to="{
								name: 'GameTarget',
								params: {
									id: game.id
								}
							}"
                        >
                            {{ t('generic.more-info') }}
                            <font-awesome-icon class="ml-3" :icon="['fas', 'arrow-right']" />
                        </v-btn>
                        <v-btn
							color="primary"
							class="ma-2"
							:to="{
                                name: 'Play'
                           }"
                        >
                            {{ t('generic.play-now') }}
                            <font-awesome-icon class="ml-3" :icon="['fas', 'play']" />
                        </v-btn>
                    </div>
                </template>
            </ProductComicPanel>
        </div>

        <v-container v-if="modeVisualization === 1">
            <v-row
                class="game-list-masonry"
                justify="center"
            >
                <v-col v-for="game in itemListFiltered"
                       :key="'game-card-' + game.id"
                       cols="6" md="4" lg="3" xl="2"
                >
                    <ImageHoverUpCard
                        :image="game.coverFront.src"
                        @click="$router.push({
                            name: 'GameTarget',
                            params: {
                                id: game.id
                            }
                        })"
                    >
                        <v-img
                            :lazy-src="game.coverFront.thumbnail"
                            :src="game.coverFront.src"
                            height="100%"
                            width="100%"
                        />
                    </ImageHoverUpCard>
                </v-col>
            </v-row>
        </v-container>

		<v-container v-if="modeVisualization === 2">
			<v-list class="game-list-simple bg-transparent">
				<v-list-item
					v-for="game in itemListFiltered"
					:key="'game-list-' + game.id"
					class="py-5"
					:to="{
						name: 'GameTarget',
						params: {
							id: game.id
						}
					}"
				>
					<template v-slot:prepend>
						<v-avatar
							size="100"
							rounded
						>
							<v-img
								:lazy-src="game.coverFront.thumbnail"
								:src="game.coverFront.src"
							/>
						</v-avatar>
					</template>
					<v-list-item-title>
						<b>{{ game.title }}</b>
					</v-list-item-title>
					<v-list-item-subtitle>
						{{ game.author }}
					</v-list-item-subtitle>
					<v-list-item-content>
						<small>{{ game.description }}</small>
					</v-list-item-content>

					<div class="pt-2">
						<v-chip
							v-for="tag in game.tags"
							:key="'game-list-tag-' + game.id + '-' + tag"
							class="ma-2"
							size="small"
							label
						>
							{{ tag }}
						</v-chip>
					</div>

					<template v-slot:append>
						<v-list-item-action class="flex-gap-12">
							<v-btn
								v-for="station in game.stations"
								:key="'game-list-stations-' + game.id + '-' + station"
								size="large"
								icon=""
								variant="text"
								color="secondary"
								@click.stop.prevent="$router.push({
									name: 'Games',
									query: {
										filters: JSON.stringify({
											stations: [station.id]
										})
									}
								})"
							>
								<font-awesome-icon size="xl" :icon="station.icon" />
							</v-btn>
						</v-list-item-action>
						<v-list-item-action class="flex-gap-12">
							<v-btn
								v-for="cat in game.categories"
								:key="'game-list-cat-' + game.id + '-' + cat"
								size="large"
								icon=""
								variant="text"
								color="primary"
								@click.stop.prevent="$router.push({
									name: 'Games',
									query: {
										filters: JSON.stringify({
											categories: [cat]
										})
									}
								})"
							>
								<font-awesome-icon size="xl" :icon="categoryIcon(cat)" />
							</v-btn>
						</v-list-item-action>
					</template>
				</v-list-item>
			</v-list>
		</v-container>
    </div>

	<Footer
		:primary="themeColors.primary"
		:secondary="themeColors.secondary"
	/>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useTheme } from "vuetify";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";

import useItemList, { type itemListFiltersMap } from "@/resources/composables/useItemList";
import ProductComicPanel from "@/components/basics/blocks/ProductComicPanel.vue";
import ImageHoverUpCard from "@/components/basics/cards/ImageHoverUpCard.vue";
import Footer from "@/components/generic/Footer.vue";
import vrmetagamesLogo from "@/assets/svg/logo/logo.svg?component";
import type { gameMapExtended } from "@/interfaces";

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

const route = useRoute();
const { t, locale } = useI18n();
const { getters, dispatch } = useStore();
const { global: { current: { value: { colors: themeColors } } } } = useTheme();


/**
 * List of stations
 */
const stationsList = computed(() => getters['ecommerce/stationsList']);
/**
 * List of games (extended)
 */
const gameDetailedRecords = computed(() => getters['ecommerce/gameDetailedRecords']);

/**
 * list of tags & categories (extrapolated from games)
 */
const categoriesList = computed<string[]>(() => {
	return [...new Set(
		itemList.value.reduce((gameArray, { categories = [] }) => {
			gameArray.push(...categories);
			return gameArray;
		}, [] as string[])
	)]
});
const tagsList = computed<string[]>(() => {
	return [...new Set(
		itemList.value.reduce((gameArray, { tags = [] }) => {
			gameArray.push(...tags);
			return gameArray;
		}, [] as string[])
	)]
});


/**
 * Possible sort/search options
 */
const sortingParametersList = ['title',	'minAge', 'duration', 'maxPlayersOffline'];
const searchTextParametersList = [
	{
		title: t('product-list-page.filter-title'),
		value: 'title'
	},
	{
		title: t('product-list-page.filter-author'),
		value: 'author'
	},
	{
		title: t('product-list-page.filter-description'),
		value: 'description'
	}
];

/**
 * Simple filters for game characteristics
 */
const filterableParametersList = [
	{
		name: "familyFriendly",
		activeColor: 'bg-primary',
		icon: ['fas', 'people-roof'],
		text: t('generic.family-friendly')
	},
	{
		name: "multiplayerOnline",
		activeColor: 'bg-primary',
		icon: ['fas', 'globe'],
		text: t('generic.online')
	},
	{
		name: "multiplayerOffline",
		activeColor: 'bg-primary',
		levels: [
			{
				icon: ['fas', 'user-group'],
				text: t('generic.singleplayer') + '/' + t('generic.multiplayer'),
			},
			{
				icon: ['fas', 'user'],
				text: t('generic.singleplayer'),
			},
			{
				icon: ['fas', 'users'],
				text: t('generic.multiplayer'),
			}
		]
	},
	{
		name: "motionSickness",
		activeColor: 'bg-primary',
		levels: [
			{
				icon: ['fas', 'face-smile'],
				text: t('product-list-page.motion-sickness-indifferent'),
			},
			{
				icon: ['fas', 'face-grin-beam'],
				text: t('product-list-page.motion-sickness-low'),
			},
			{
				icon: ['fas', 'face-dizzy'],
				text: t('product-list-page.motion-sickness-high'),
			}
		]
	},
	{
		name: "difficulty",
		activeColor: 'bg-primary',
		levels: [
			{
				icon: ['fas', 'face-smile'],
				text: t('product-list-page.difficulty-indifferent'),
			},
			{
				icon: ['fas', 'face-grin-beam'],
				text: t('product-list-page.difficulty-low'),
			},
			{
				icon: ['fas', 'face-dizzy'],
				text: t('product-list-page.difficulty-high'),
			}
		]
	},
	{
		name: "duration",
		activeColor: 'bg-primary',
		levels: [
			{
				icon: ['fas', 'hourglass-empty'],
				text: t('product-list-page.duration-indifferent'),
			},
			{
				icon: ['fas', 'hourglass-start'],
				text: t('product-list-page.duration-low'),
			},
			{
				icon: ['fas', 'hourglass-half'],
				text: t('product-list-page.duration-medium'),
			},
			{
				icon: ['fas', 'hourglass-end'],
				text: t('product-list-page.duration-high'),
			}
		]
	},
	{
		name: "minAge",
		activeColor: 'bg-primary',
		levels: [
			{
				iconText: '6+',
				text: t('product-list-page.minAge-warning'),
			},
			{
				iconText: '10+',
				text: t('product-list-page.minAge-warning'),
			},
			{
				iconText: '14+',
				text: t('product-list-page.minAge-warning'),
			},
			{
				iconText: '18+',
				text: t('product-list-page.minAge-warning'),
			}
		]
	}
]

/**
 * Filter rules (for searchRecords of guebbit-javascript-library)
 * General logic: AND
 * Target logic: default OR, can be And
 * So every rule in the array has to be true
 *
 * Invidually, every rule can be AND or OR on the checks it make
 */
const filterTargetLogicList = [
	{
		title: t('product-list-page.filter-logic-and'),
		value: 'AND'
	},
	{
		title: t('product-list-page.filter-logic-or'),
		value: 'OR'
	}
]
const filterGlobalLogic = ref<'OR' | 'AND'>('OR');
const filterTargetLogic = ref<'OR' | 'AND'>('OR');
const gameFilters = ref<itemListFiltersMap["rules"]>([
	{
		search: '',
		searchParams: ['title'],
		stringLimit: 2,
		distance: -1
	},
	{
		search: [],
		searchParams: ['categories']
	},
	{
		search: [],
		searchParams: ['tags']
	},
	{
		search: [],
		searchParams: ['stationIds']
	}
]);

/**
 * TEMPORARY FIX
 * Stations for ScheduleFormCard list of possible stations
 * TODO vuetifyTemporaryFixItemGroupVModel è un temporary fix
 * 		perché item-group v-model restituisce solo gli index
 */
const vuetifyTemporaryFixItemGroupVModel = ref([]);
watch(vuetifyTemporaryFixItemGroupVModel, (arrayValue :string[]) => {
		gameFilters.value![3].search = arrayValue.reduce((reducer, stationIndex) => [
			...reducer,
			stationsList.value[stationIndex].id
		], [] as string[])
	}
)

/**
 * TODO query selections
 */
watch(() => route.query.filters, (filters) => {
	console.log("Query selection: ", filters)
});
/**
 * Generationg rules for guebbit's searchRecords
 */
const searchFilters = computed<itemListFiltersMap>(() => {
	// rules: gamefilters + gameFiltersAdvanced that will be added latero
	const rules :itemListFiltersMap["rules"] = [...gameFilters.value || []];

	/*
	// self inserting rules (booleans or simple rules)
	for(const key in gameFiltersAdvanced.value) {
		if (!Object.prototype.hasOwnProperty.call(gameFiltersAdvanced.value, key))
			continue;
		// find rule "instructions"
		const ruleInstructions = filterableParametersList.find(({ name }) => name === key)
		if(!ruleInstructions)
			continue;
		// if there are no levels: it just a boolean
		if(!ruleInstructions.levels)
			rules.push({
				search: true,
				searchParams: [key]
			})
	}
	*/

	// --------- BOOLEANS ---------
	// if selected: only familyFriendly(boolean) games
	if(gameFiltersAdvanced.value['familyFriendly'])
		rules.push({
			search: true,
			searchParams: ['familyFriendly']
		});
	// if selected: multiplayer online means maxPlayersOnline > 0
	if(gameFiltersAdvanced.value['multiplayerOnline'])
		rules.push({
			search: 0,
			searchParams: ['maxPlayersOnline'],
			numberRule: "gt"
		});
	// --------- MULTI OFFLINE ---------
	// single player = maxPlayersOffline limited to 1
	if(gameFiltersAdvanced.value['multiplayerOffline'] === 1)
		rules.push({
			search: 1,
			searchParams: ['maxPlayersOffline'],
			numberRule: "eq"
		});
	// offline multiplayer = maxPlayersOffline from 2 to unlimited
	if(gameFiltersAdvanced.value['multiplayerOffline'] === 2)
		rules.push({
			search: 1,
			searchParams: ['maxPlayersOffline'],
			numberRule: "gt"
		});
	// --------- MOTION SICKNESS ---------
	// low motion sickess
	if(gameFiltersAdvanced.value['motionSickness'] === 1)
		rules.push({
			search: 2,
			searchParams: ['motionSickness'],
			numberRule: "elt"
		});
	// high motion sickness
	if(gameFiltersAdvanced.value['motionSickness'] === 2)
		rules.push({
			search: 3,
			searchParams: ['motionSickness'],
			numberRule: "gt"
		});
	// --------- DIFFICULTY ---------
	// low difficulty
	if(gameFiltersAdvanced.value['difficulty'] === 1)
		rules.push({
			search: 2,
			searchParams: ['difficulty'],
			numberRule: "elt"
		});
	// high difficulty
	if(gameFiltersAdvanced.value['difficulty'] === 2)
		rules.push({
			search: 3,
			searchParams: ['difficulty'],
			numberRule: "gt"
		});
	// --------- DURATION ---------
	// Duration less than 30 min
	if(gameFiltersAdvanced.value['duration'] === 1)
		rules.push({
			search: 1800000,
			searchParams: ['duration'],
			numberRule: "elt"
		});
	/*
	TODO rework: invece che "AND/OR" globale fare un qualche "link" tra una rule a l'altra
		Si può fare richiamando più volte searchRecords, è da pensare
	// Duration from 30 to 60 min
	if(gameFiltersAdvanced.value['duration'] === 2){
		rules.push({
			search: 1800000,
			searchParams: ['duration'],
			numberRule: "lt",
			logic: "AND"
		});
		rules.push({
			search: 3600000,
			searchParams: ['duration'],
			numberRule: "egt",
			logic: "AND"
		});
	}
	*/
	// Duration more than 60 min
	if(gameFiltersAdvanced.value['duration'] === 3)
		rules.push({
			search: 3600000,
			searchParams: ['duration'],
			numberRule: "gt"
		});
	// --------- AGE ---------
	// 10+ age
	if(gameFiltersAdvanced.value['minAge'] === 1)
		rules.push({
			search: 10,
			searchParams: ['minAge'],
			numberRule: "egt"
		});
	// 14+ age
	if(gameFiltersAdvanced.value['minAge'] === 2)
		rules.push({
			search: 14,
			searchParams: ['minAge'],
			numberRule: "egt"
		});
	// 18+ age
	if(gameFiltersAdvanced.value['minAge'] === 3)
		rules.push({
			search: 18,
			searchParams: ['minAge'],
			numberRule: "egt"
		});

	return {
		logic: filterGlobalLogic.value,
		rules: (rules || []).map((item) => {
			return {
				...item,
				logic: filterTargetLogic.value
			}
		})
	}
});

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
const gameFiltersAdvanced = ref<Record<string, number>>({});

/**
 * Page list toolbox
 */
const {
	itemList,
	itemListFiltered :itemListFilteredOriginal,
	isAdmin
} = useItemList<gameMapExtended>(
	gameDetailedRecords,
	Promise.all([
		dispatch('main/initApp'),
		dispatch('ecommerce/getGames')
	]),
	searchFilters,
);

/**
 * list to show after filters and sorting are applied
 * TODO break down better
 */
const itemListFiltered = computed<gameMapExtended[]>(() => {
	let gameArray = itemListFilteredOriginal.value as gameMapExtended[];
	// TODO rework
	if(gameFiltersAdvanced.value['duration'] === 2)
		gameArray = gameArray.filter(({ duration }) => duration && (1800000 < duration && duration < 3600000));
	// SORTING
	// TODO guebbit sort sul modello di searchRecords
	// TODO l'ultimo cliccato dovrebbe avere la priorità
	gameArray.sort((item1 :gameMapExtended, item2 :gameMapExtended) => {
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

// -------------------- UI --------------------

/**
 * Visualization mode
 */
const modeVisualization = ref(1);
/* TODO query selections
watch(() => route.query.v, (mode = "1") => {
	console.log("FFFF", mode)
	modeVisualization.value = parseInt(mode)
});
*/

/**
 *
 * @param {string} category
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

/**
 *
 * @param {string} sort
 */
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
		.filter-by-station-section {
			.v-card{
				width: 120px;
				height: 120px;
			}
		}
        .filter-by-tag-section {
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

	.game-list-simple{
		&.v-list {
			.v-list-item {
				& + .v-list-item{
					border-top: 1px solid rgb(var(--v-theme-on-surface));
				}
			}
		}
	}
}
</style>