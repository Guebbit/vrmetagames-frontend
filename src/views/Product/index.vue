<template>
    <div id="product-list-page" class="theme-page page-menu-padding">
        <v-container class="page-controls">
			<v-row v-show="isAdmin">
				<v-col cols="12" md="6" lg="4" xl="2">
					<v-select
						v-model="filterGlobalLogic"
						:items="filterTargetLogicList"
						variant="outlined"
						:label="t('product-list-page.filter-label-logic')"
					/>
				</v-col>
				<v-col cols="12" md="6" lg="4" xl="2">
					<v-select
						v-model="filterTargetLogic"
						:items="filterTargetLogicList"
						variant="outlined"
						:label="t('product-list-page.filter-label-logic')"
					/>
				</v-col>
				<v-col cols="8" md="6" lg="4" xl="2">
					<v-select
						v-model="searchTextParametersSelected"
						:items="searchTextParametersList"
						variant="outlined"
						chips
						:label="t('product-list-page.filter-label-searchable')"
						multiple
					/>
				</v-col>
				<v-col cols="8" md="10" lg="10" xl="4">
					<v-select
						v-model="sortingParametersSelected"
						:items="sortingParametersList"
						variant="outlined"
						chips
						:label="t('product-list-page.filter-label-searchable')"
						multiple
					/>
				</v-col>
			</v-row>

			<v-row align="center">
				<v-col cols="12" md="7" lg="6" xl="4">
					<v-text-field
						v-model="regularFiltersRules[0].search"
						:label="t('generic.search')"
						variant="solo"
						hide-details
					>
						<template v-slot:prepend-inner>
							<font-awesome-icon
								class="v-icon v-icon--size-default v-icon--start cursor-pointer"
								:icon="['fas', 'magnifying-glass']"
							/>
						</template>
					</v-text-field>
				</v-col>

				<v-col cols="8" md="3" lg="4" xl="4">
					<v-select
						v-model="regularFiltersRules[2].search"
						:items="tagsList"
						chips
						:label="t('product-list-page.filter-label-tags')"
						multiple
						hide-details
					>
						<template v-slot:prepend-inner>
							<font-awesome-icon
								class="v-icon v-icon--size-default v-icon--start cursor-pointer"
								:icon="['fas', 'tags']"
							/>
						</template>
					</v-select>
				</v-col>

				<v-col cols="4" md="2" lg="2" xl="2" offset-xl="2">
					<v-btn
						class="vuetify-button-icon"
						block
						size="x-large"
						@click="filtersReset()"
					>
						<font-awesome-icon
							class="mr-3"
							:icon="['fas', 'eraser']"
						/>
						<span class="hidden-md-and-down">{{ t('generic.reset') }}</span>
					</v-btn>
				</v-col>
			</v-row>

            <v-row>
				<v-col cols="12" md="12" lg="4" xl="4" class="filter-by-station-section">
					<v-item-group
						v-model="regularFiltersRules[3].search"
						class="d-flex align-center justify-center flex-gap-12"
						multiple
					>
						<v-item
							v-for="station in stationsList"
							:key="'stations-filter-' + station.id"
							:value="station.id"
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
                            v-model="regularFiltersRules[1].search"
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
								v-model="toggleFilters[name]"
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
								[activeColor]: toggleFilters[name] > 0
							}"
								@click="toggleFilters[name] === undefined ?
											toggleFilters[name] = 1 :
												toggleFilters[name] + 1 >= levels.length ?
													toggleFilters[name] = 0 :
													toggleFilters[name]++"
							>
								<div
									v-if="levels[toggleFilters[name] || 0]"
									class="flex-grow-1 text-center"
								>
									<font-awesome-icon
										v-if="levels[toggleFilters[name] || 0].icon"
										size="2x"
										:icon="levels[toggleFilters[name] || 0].icon"
									/>
									<span
										v-if="levels[toggleFilters[name] || 0].iconText"
										class="text-h4"
									>
									{{ levels[toggleFilters[name] || 0].iconText }}
								</span>
									<component
										v-if="levels[toggleFilters[name] || 0].text"
										:is="levels[toggleFilters[name] || 0].text?.length > 10 ? 'small' : 'p'"
										class="d-block mt-3"
									>
										{{ levels[toggleFilters[name] || 0].text }}
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
											['fas', 'panorama'] :
											modeVisualization === 1 ?
											['fas', 'grip'] :
											['fas', 'list']"
							/>
						</div>
					</v-card>
				</v-col>
				<v-col cols="12" class="d-flex align-end justify-end flex-gap-12">
					<v-btn
						v-for="sort in sortingParametersSelected"
						:key="'sortable-' + sort"
						:class="{
							'bg-primary': sortListUI[sort] === 1,
							'bg-secondary': sortListUI[sort] === 2
						}"
						variant="flat"
						@click="addSortFilter(sort)"
					>
						<font-awesome-icon
							class="mr-3"
							:icon="!sortListUI[sort] ?
								['fas', 'sort'] :
								sortListUI[sort] === 1 ?
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
                <template #background >
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
                    <ImageHoverUpCard>
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
                        @click="push({
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
								@click.stop.prevent="push({
									name: 'Games',
									query: {
										filters: encodeURIComponent(
											JSON.stringify({
												stations: [station.id]
											})
										)
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
								@click.stop.prevent="push({
									name: 'Games',
									query: {
										filters: encodeURIComponent(
											JSON.stringify({
												categories: [cat]
											})
										)
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
import { ref, computed, watch, onMounted } from "vue";
import { useRouter, useRoute, type LocationQueryValue } from "vue-router";
import { useTheme } from "vuetify";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";
import type { sortParameterType, sortParameterOrderType, filterRulesMap } from "guebbit-javascript-library";

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
	faHourglassHalf, faHourglassEnd, faSort, faSortDown, faSortUp, faFaceSmile, faFaceGrinBeam, faFaceDizzy, faEraser
} from "@fortawesome/free-solid-svg-icons";
import { filterGroupMap } from "guebbit-javascript-library";

library.add(faUser, faUsers, faUserGroup, faGlobe, faPeopleRoof, faTags, faGrip, faList, faPanorama, faPlay, faArrowRight, faMagnifyingGlass,
	faDiceD20, faHandFist, faVolleyball, faHatWizard, faMusic, faPuzzlePiece, faGun, faPeopleGroup, faHeading, faIdCard, faHourglass, faHourglassEmpty, faHourglassStart,
	faHourglassHalf, faHourglassEnd, faSort, faSortDown, faSortUp, faFaceSmile, faFaceGrinBeam, faFaceDizzy, faEraser
);

const { push, replace } = useRouter();
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
 * Visualization mode
 */
const modeVisualization = ref(1);

/**
 * Possible sort/search options
 */
// TODO title, value, t()
const sortingParametersList = computed(() => itemList.value.length > 0 ? Object.keys(itemList.value[0]) : []);
const sortingParametersSelected = ref(['title', 'minAge', 'duration', 'maxPlayersOffline'])
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
const searchTextParametersSelected = ref(['title']);

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
const regularFiltersRules = ref<Array<filterRulesMap>>([
	{
		id: 'title',
		search: '',
		searchParams: ['title'],
		stringLimit: 2,
		distance: -1
	},
	{
		id: 'categories',
		search: [],
		searchParams: ['categories']
	},
	{
		id: 'tags',
		search: [],
		searchParams: ['tags']
	},
	{
		id: 'stations',
		search: [],
		searchParams: ['stationIds']
	}
]);
const regularFilters = computed(() =>
	regularFiltersRules.value.reduce((filters, { id, search, searchParams }) => {
		if(search && (search as string | string[]).length > 0)
			for(let i = searchParams.length; i--; )
				if(id)
					filters[id] = search;
		return filters;
	}, {} as Record<string, unknown | unknown[]>)
)

/**
 * Generationg rules for guebbit's searchRecords
 */
const searchFilters = computed<itemListFiltersMap>(() => {
	// rules: regularFiltersRules + toggleFilters that will be added later
	const rules :Array<filterRulesMap> = [...regularFiltersRules.value || []];
	const rulesGroup :filterGroupMap[] = [];

	// --------- BOOLEANS ---------
	// if selected: only familyFriendly(boolean) games
	if(toggleFilters.value['familyFriendly'])
		rules.push({
			search: true,
			searchParams: ['familyFriendly'],
			logic: filterTargetLogic.value,
		});
	// if selected: multiplayer online means maxPlayersOnline > 0
	if(toggleFilters.value['multiplayerOnline'])
		rules.push({
			search: 0,
			searchParams: ['maxPlayersOnline'],
			numberRule: "gt",
			logic: filterTargetLogic.value,
		});
	// --------- MULTI OFFLINE ---------
	// single player = maxPlayersOffline limited to 1
	if(toggleFilters.value['multiplayerOffline'] === 1)
		rules.push({
			search: 1,
			searchParams: ['maxPlayersOffline'],
			numberRule: "eq",
			logic: filterTargetLogic.value,
		});
	// offline multiplayer = maxPlayersOffline from 2 to unlimited
	if(toggleFilters.value['multiplayerOffline'] === 2)
		rules.push({
			search: 1,
			searchParams: ['maxPlayersOffline'],
			numberRule: "gt",
			logic: filterTargetLogic.value,
		});
	// --------- MOTION SICKNESS ---------
	// low motion sickess
	if(toggleFilters.value['motionSickness'] === 1)
		rules.push({
			search: 2,
			searchParams: ['motionSickness'],
			numberRule: "elt",
			logic: filterTargetLogic.value,
		});
	// high motion sickness
	if(toggleFilters.value['motionSickness'] === 2)
		rules.push({
			search: 3,
			searchParams: ['motionSickness'],
			numberRule: "gt",
			logic: filterTargetLogic.value,
		});
	// --------- DIFFICULTY ---------
	// low difficulty
	if(toggleFilters.value['difficulty'] === 1)
		rules.push({
			search: 2,
			searchParams: ['difficulty'],
			numberRule: "elt",
			logic: filterTargetLogic.value,
		});
	// high difficulty
	if(toggleFilters.value['difficulty'] === 2)
		rules.push({
			search: 3,
			searchParams: ['difficulty'],
			numberRule: "gt",
			logic: filterTargetLogic.value,
		});
	// --------- DURATION ---------
	// Duration less than 30 min
	if(toggleFilters.value['duration'] === 1)
		rules.push({
			search: 1800000,
			searchParams: ['duration'],
			numberRule: "elt",
			logic: filterTargetLogic.value,
		});
	// Duration from 30 to 60 min
	if(toggleFilters.value['duration'] === 2){
		rulesGroup.push({
			logic: "AND",
			rules: [
				{
					search: 1800000,
					searchParams: ['duration'],
					numberRule: "egt"
				},
				{
					search: 3600000,
					searchParams: ['duration'],
					numberRule: "lt"
				}
			]
		});
	}
	// Duration more than 60 min
	if(toggleFilters.value['duration'] === 3)
		rules.push({
			search: 3600000,
			searchParams: ['duration'],
			numberRule: "gt",
			logic: filterTargetLogic.value,
		});
	// --------- AGE ---------
	// 10+ age
	if(toggleFilters.value['minAge'] === 1)
		rules.push({
			search: 10,
			searchParams: ['minAge'],
			numberRule: "egt",
			logic: filterTargetLogic.value,
		});
	// 14+ age
	if(toggleFilters.value['minAge'] === 2)
		rules.push({
			search: 14,
			searchParams: ['minAge'],
			numberRule: "egt",
			logic: filterTargetLogic.value,
		});
	// 18+ age
	if(toggleFilters.value['minAge'] === 3)
		rules.push({
			search: 18,
			searchParams: ['minAge'],
			numberRule: "egt",
			logic: filterTargetLogic.value,
		});

	// normal filters (with global logic switch)
	rulesGroup.push({
		logic: filterGlobalLogic.value,
		rules
	});

	// final result
	return {
		logic: "AND",
		rules: rulesGroup
	}
});

/**
 * Sort order
 * Order of array is order of importance
 * Last clicked is the first of array
 *
 * 0 = neutral
 * 1 = descending
 * 2 = ascending
 */
const sortList = ref<sortParameterType[]>([]);
const sortListUI = computed(() => {
	const result :Record<string, sortParameterOrderType> = {};
	for(let i = sortList.value.length; i--; )
		result[sortList.value[i][0]] = sortList.value[i][1];
	return result;
})
const addSortFilter = (filter :string) => {
	let value = 1;
	// if exist
	const index = sortList.value.findIndex(([name]) => name === filter);
	if(index >= 0){
		// get initial value
		value = sortList.value[index][1] + 1;
		// if max value, become neutral
		if(sortList.value[index][1] >= 2)
			value = 0;
		// remove (it will be reinserted first)
		sortList.value.splice(index, 1);
	}
	// add it again, on top of list (to be first in importance)
	sortList.value.unshift([
		filter,
		value as sortParameterOrderType
	]);
};

/**
 * WARNING: vuetify item-group flags with "undefined" as false and "0" as true
 */
const toggleFilters = ref<Record<string, number>>({});

/**
 * Fast filters reset
 */
function filtersReset(){
	sortList.value = [];
	toggleFilters.value = {};
	for(let i = regularFiltersRules.value.length; i--; )
		if(Array.isArray(regularFiltersRules.value[i].search))
			regularFiltersRules.value[i].search = [];
		else
			regularFiltersRules.value[i].search = "";
}


/**
 * Page list toolbox
 */
const {
	itemList,
	itemListFiltered,
	isAdmin,
	fromObjectToUrl,
	fromUrlToObject
} = useItemList<gameMapExtended>(
	gameDetailedRecords,
	Promise.all([
		dispatch('main/initApp'),
		dispatch('ecommerce/getGames')
	]),
	searchFilters,
	sortList,
);

/**
 * Save filters objects in URL and viceversa
 */
const preloadFilters = () => {
	const { sort = [], toggle = {}, v = 0, ...regularFilters } = fromUrlToObject(route.query as Record<string, string>);
	sortList.value = sort as sortParameterType[];
	toggleFilters.value = toggle as Record<string, number>;
	modeVisualization.value = v as number;
	/**
	 * Regular filters are heavily personalized
	 */
	for(const key in regularFilters){
		if (!Object.prototype.hasOwnProperty.call(regularFilters, key))
			continue;
		const index = regularFiltersRules.value.findIndex(({ id }) => key === id);
		// if found
		if(index >= 0)
			regularFiltersRules.value[index].search = regularFilters[key];
	}
};
onMounted(preloadFilters)
watch(() => route.query, preloadFilters, { deep :true });

/**
 * go to new url with new query (no reload);
 */
watch([regularFilters, sortList, toggleFilters, modeVisualization],
	([ filters = {}, sort = [], toggle = [], v ]) =>
		replace({
			...route,
			query: fromObjectToUrl({
				...filters,
				sort,
				toggle,
				v
			})
		})
, { deep :true });

// -------------------- UI --------------------

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