<template>
	<ProductComicPanel
		v-if="selectedRecord"
		:primary="themeColors.secondary"
		:secondary="themeColors.primary"
	>
		<template #background >
			<v-img
				cover
				class="panel-background"
				:lazy-src="selectedRecord.image.thumbnail"
				:src="selectedRecord.image.src"
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
					:lazy-src="selectedRecord.coverFront.thumbnail"
					:src="selectedRecord.coverFront.src"
					height="100%"
					width="100%"
					:aria-describedby="'game-details-description-' + selectedRecord.id"
				/>
			</ImageHoverUpCard>
		</template>
		<template #content>
			<div class="d-flex justify-space-between align-center mb-5">
				<div class="panel-station-icons">
					<v-btn
						v-for="station in selectedRecord.stations"
						:key="'station-icon-' + station.id"
						variant="text"
						@click.stop.prevent="push({
							name: 'Games',
							query: {
								stations: encodeURIComponent(
									JSON.stringify([station.id])
								)
							}
						})"
					>
						<component
							:is="station.icon"
							role="icon"
							:aria-label="station.label"
							class="regular-icon fill-white"
						/>
					</v-btn>
				</div>
				<div class="categories-wrapper">
					<v-btn
						v-for="cat in selectedRecord.categories"
						v-show="gameCategories[cat]"
						:key="'category-title-' + cat"
						:size="
							selectedRecord.categories.length > 2 ? 'small' :
								selectedRecord.categories.length > 1 ? 'default' : 'large'
						"
						class="mx-2"
						variant="tonal"
						color="light"
					>
						{{ gameCategories[cat].label }}
						<font-awesome-icon class="ml-3" size="xl" :icon="gameCategories[cat].icon" />
					</v-btn>
				</div>
			</div>
			<h3 class="panel-title">{{ selectedRecord.title }}</h3>
			<h4 class="panel-subtitle text-white">{{ selectedRecord.author }}</h4>
			<div class="panel-chips">
				<v-chip
					v-for="tag in selectedRecord.tags"
					v-show="gameTags[tag]"
					:key="'badge-' + tag"
					class="ma-2"
					text-color="white"
				>
					{{ gameTags[tag].label }}
					<font-awesome-icon class="v-icon v-icon--size-small v-icon--end" :icon="gameTags[tag].icon" />
				</v-chip>
			</div>
			<p
				:id="'game-details-description-' + selectedRecord.id"
				class="panel-text"
			>
				{{ selectedRecord.description }}
			</p>

			<v-list
				class="bg-transparent"
				variant="text"
			>
				<template
					v-for="item in gameRatingsList"
					:key="'game-ratings-' + item.name"
				>
					<v-list-item
						v-if="selectedRecord[item.name]"
					>
						<v-list-item-content class="d-flex justify-space-between align-center">
							<div>
								<font-awesome-icon
									v-show="item.icon"
									:icon="item.icon"
									size="xl"
									class="min-width-30 mr-2"
								/>
								{{ item.label }}
							</div>
							<v-rating
								:modelValue="selectedRecord[item.name]"
								readonly=""
							>
								<template v-slot:item="{ isFilled }">
									<font-awesome-icon
										:icon="isFilled ? item.iconFill : item.iconEmpty"
										size="xl"
										class="min-width-30"
										:class="{
												'opacity-50': !isFilled,
											}"
									/>
								</template>
							</v-rating>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>

			<div class="panel-info-icons">
				<GameInfoNotice
					v-show="selectedRecord.durationText"
					:label="t('product-page.label-duration')"
					:value="selectedRecord.durationText"
					class="ma-2"
				>
					<font-awesome-icon size="lg" class="ma-1" :icon="['fas', 'hourglass']" />
				</GameInfoNotice>
				<GameInfoNotice
					v-show="selectedRecord.minAge"
					:label="t('product-page.label-minAge')"
					:value="selectedRecord.minAge + '+'"
					class="ma-2"
				>
					<font-awesome-icon size="lg" class="ma-1" :icon="['fas', 'id-card']" />
				</GameInfoNotice>
				<GameInfoNotice
					v-show="selectedRecord.maxPlayersOffline > 1"
					:label="t('generic.multiplayer')"
					class="ma-2"
				>
					<font-awesome-icon size="lg" class="ma-1" :icon="['fas', 'users']" />
				</GameInfoNotice>
				<GameInfoNotice
					v-show="selectedRecord.maxPlayersOnline > 1"
					:label="t('generic.multiplayer') + ' ' + t('generic.online')"
					class="ma-2"
				>
					<font-awesome-icon size="lg" class="ma-1" :icon="['fas', 'globe']" />
				</GameInfoNotice>
				<GameInfoNotice
					v-show="selectedRecord.maxPlayersOffline <= 1 && selectedRecord.maxPlayersOnline <= 1"
					:label="t('generic.singleplayer-2')"
					class="ma-2"
				>
					<font-awesome-icon size="lg" class="ma-1" :icon="['fas', 'user']" />
				</GameInfoNotice>
				<GameInfoNotice
					v-show="selectedRecord.familyFriendly"
					:label="t('generic.family-friendly')"
					class="ma-2"
				>
					<font-awesome-icon :icon="['fas', 'people-roof']" />
				</GameInfoNotice>
			</div>
		</template>
		<template #actions>
			<div class="panel-actions text-right mt-10">
				<slot name="actions" />
			</div>
		</template>
	</ProductComicPanel>
	<v-alert
		v-else
		outlined
		type="error"
	>
		{{ t('product-page.not-found') }}
	</v-alert>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { useTheme } from "vuetify";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useStore } from "@/store";

import useItemDetails from "@/resources/composables/useItemDetails";
import ProductComicPanel from "@/components/basics/blocks/ProductComicPanel.vue";
import GameInfoNotice from "@/components/products/GameInfoNotice.vue";
import ImageHoverUpCard from "@/components/basics/cards/ImageHoverUpCard.vue";
import type { gameMap } from "@/interfaces";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
	faUser, faUsers, faUserGroup, faGlobe, faPeopleRoof, faPlay, faArrowRight,
	faDiceD20, faHandFist, faVolleyball, faHatWizard, faMusic, faPuzzlePiece, faGun, faPeopleGroup, faIdCard, faHourglass, faFaceDizzy
} from "@fortawesome/free-solid-svg-icons";
import {
	faCircle, faHandBackFist
} from "@fortawesome/free-regular-svg-icons"


library.add(
	faUser, faUsers, faUserGroup, faGlobe, faPeopleRoof, faPlay, faArrowRight,
	faDiceD20, faHandFist, faVolleyball, faHatWizard, faMusic, faPuzzlePiece, faGun, faPeopleGroup, faIdCard, faHourglass, faFaceDizzy,
	faCircle, faHandBackFist
);

const { push } = useRouter();
const { t, locale } = useI18n();
const { getters, dispatch } = useStore();
const { global: { current: { value: { colors: themeColors } } } } = useTheme();

const props = defineProps({
	id: {
		type: String,
		required: true
	},
});

/**
 *
 */
const gameCategories = computed(() => getters['ecommerce/getInfoData']("categories-" + locale.value));

/**
 *
 */
const gameTags = computed(() => getters['ecommerce/getInfoData']("tags-" + locale.value));

/**
 * page details toolbox
 */
const {
	selectedRecord,
	selectTargetRecord
} = useItemDetails<gameMap>(
	computed(() => getters['ecommerce/gameDetailedRecords'](locale.value)),
	Promise.all([
		dispatch('main/initApp', locale.value),
		dispatch('ecommerce/getGames', [locale.value])
	])
);

/**
 * Select on mount (equivalent of computed but this is useItemDetails standard)
 */
if(props.id)
	selectTargetRecord(props.id);

// -------------------- UI --------------------

/**
 *
 */
const gameRatingsList = [
	{
		name: 'motionSickness',
		icon: ['fas', 'face-dizzy'],
		iconFill: ['fas', 'face-dizzy'],
		iconEmpty: ['far', 'circle'],
		label: t('product-page.label-motionSickness'),
	},
	{
		name: 'difficulty',
		icon: ['fas', 'hand-fist'],
		iconFill: ['fas', 'hand-fist'],
		iconEmpty: ['far', 'hand-back-fist'],
		label: t('product-page.label-difficulty'),
	},
];
</script>

<style lang="scss">
@import 'src/assets/scss/main/global';

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

	.panel-station-icons{
		.v-btn{
			font-size: 5em;
			height: auto;
			width: auto;
		}
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
			color: rgb(var(--v-theme-on-surface));
			max-width: 6em;
		}
		@include media-mobile(){
			text-align: center;
		}
	}
}
</style>