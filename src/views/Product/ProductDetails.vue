<template>
    <div id="product-details-page" class="theme-page">
        <ProductComicPanel
            :key="'game-panel-' + selectedRecord.id"
            :primary="themeColors.secondary"
            :secondary="themeColors.primary"
            hero
        >
            <template #background2 >
                <v-img
                    cover
                    class="panel-background"
                    :lazy-src="selectedRecord.image.thumbnail"
                    :src="selectedRecord.image.src"
                    height="100%"
                    width="100%"
					:aria-describedby="'description-' + selectedRecord.id"
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
                    :image="selectedRecord.coverFront"
                >
                    <v-img
						:lazy-src="selectedRecord.coverFront.thumbnail"
						:src="selectedRecord.coverFront.src"
                        height="100%"
                        width="100%"
                    />
                </ImageHoverUpCard>
            </template>
            <template #content>
                <div class="categories-wrapper">
                    <v-btn
                        v-for="(category, i) in selectedRecord.categories"
                        :key="'category-title-' + i"
                        class="mx-2"
                        variant="flat"
                        color="primary"
                    >
                        {{ t('games.genre-' + category) }}
                    </v-btn>
                </div>

                <!-- TODO stations -->
                <h3 class="panel-title">{{ selectedRecord.title }}</h3>
                <h4 class="panel-subtitle">{{ selectedRecord.author }}</h4>
                <div class="panel-chips">
                    <v-chip
                        v-for="(badge, i) in selectedRecord.tags"
                        :key="'badge-' + i"
                        class="ma-2"
                        text-color="white"
                    >
                        {{ badge }}
                    </v-chip>
                </div>
                <p :id="'description-' + selectedRecord.id" class="panel-text">
					{{ selectedRecord.description }}
                </p>

                <div class="panel-info-icons d-flex justify-center align-center flex-gap-24 flex-wrap">

                    <span
						v-show="selectedRecord.minAge"
						class="icon-text-resources"
					>
                        <span class="icon">
                            {{ selectedRecord.minAge }}+
                            <font-awesome-icon :icon="['fas', 'id-card']" />
                        </span>
                        <small>Età minima consigliata</small>
                    </span>

                    <span v-show="selectedRecord.maxPlayersOffline > 1"
                          class="icon-text-resources"
                    >
                        <span class="icon">
                            {{ selectedRecord.maxPlayersOffline }}
                            <font-awesome-icon :icon="['fas', 'users']" />
                        </span>
                        <small>{{ t('generic.multiplayer') }}</small>
                    </span>

                    <span v-show="selectedRecord.maxPlayersOnline > 1"
                          class="icon-text-resources"
                    >
                        <span class="icon">
							{{ selectedRecord.maxPlayersOnline }}
                            <font-awesome-icon :icon="['fas', 'globe']" />
                        </span>
                        <small>{{ t('generic.multiplayer') }} {{ t('generic.online') }}</small>
                    </span>

                    <span v-show="selectedRecord.maxPlayersOffline <= 1 && selectedRecord.maxPlayersOnline <= 1"
                          class="icon-text-resources"
                    >
                        <span class="icon">
                            <font-awesome-icon :icon="['fas', 'user']" />
                        </span>
                        <small>{{ t('generic.singleplayer-2') }}</small>
                    </span>

                    <span v-show="selectedRecord.familyFriendly"
                          class="icon-text-resources"
                    >
                        <span class="icon">
                            <font-awesome-icon :icon="['fas', 'people-roof']" />
                        </span>
                        <small>{{ t('generic.family-friendly') }}</small>
                    </span>

					<span v-show="selectedRecord.motionSickness"
						class="icon-text-resources"
					>
                        <span class="icon">
							{{ selectedRecord.motionSickness }}
                            <font-awesome-icon
								:icon="!selectedRecord.motionSickness ?
									['fas', 'face-smile'] :
									selectedRecord.motionSickness < 3 ?
									['fas', 'face-grin-beam'] :
									['fas', 'face-dizzy']"
							/>
                        </span>
                        <small>{{ t('generic.motion-sickness') }}</small>
                    </span>
					<span v-show="selectedRecord.difficulty"
						class="icon-text-resources"
					>
                        <span class="icon">
							{{ selectedRecord.difficulty }}
                            <font-awesome-icon
								:icon="!selectedRecord.difficulty ?
									['fas', 'face-smile'] :
									selectedRecord.difficulty < 3 ?
									['fas', 'face-grin-beam'] :
									['fas', 'face-dizzy']"
							/>
                        </span>
                        <small>{{ t('generic.difficulty') }}</small>
                    </span>

					<span v-show="selectedRecord.duration"
						class="icon-text-resources"
					>
                        <span class="icon">
							{{ selectedRecord.duration / 60000 }}
                            <font-awesome-icon :icon="['fas', 'clock']" />
                        </span>
                        <small>{{ t('generic.duration') }}</small>
                    </span>
                </div>

            </template>
            <template #actions>
                <div class="panel-actions text-right mt-10">
					<v-btn
						class="ma-2"
						variant="tonal"
						:to="{
							name: 'Games'
						}"
					>
						<font-awesome-icon class="mr-5" :icon="['fas', 'arrow-left-long']" />
						{{ t('generic.go-back') }}
					</v-btn>
                    <v-btn
                        v-show="isAdmin"
                        class="ma-2"
                        @click="showProductEditDialog = true"
                    >
                        <font-awesome-icon class="mr-5" :icon="['fas', 'edit']" />
                        {{ t('product-page.edit-product') }}
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

        <v-dialog
            v-model="showProductEditDialog"
            fullscreen
            :scrim="false"
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar
                    dark
                    color="primary"
                >
                    <v-toolbar-title>
                        <font-awesome-icon class="mr-5" :icon="['fas', 'edit']" />
                        {{ t('product-page.edit-product') }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                            icon
                            @click="showProductEditDialog = false"
                        >
                            <font-awesome-icon :icon="['fas', 'floppy-disk']" />
                        </v-btn>
                    </v-toolbar-items>
                    <v-toolbar-items>
                        <v-btn
                            icon
                            @click="showProductEditDialog = false"
                        >
                            <font-awesome-icon :icon="['fas', 'xmark']" />
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-container>
                    <!-- TODO -->
                    <ProductFormPanel

                    />
                </v-container>
            </v-card>
        </v-dialog>
    </div>
	<Footer
		:primary="themeColors.primary"
		:secondary="themeColors.secondary"
	/>
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { useTheme } from "vuetify";
import { useStore } from "@/store";
import useItemDetails from "@/resources/composables/useItemDetails";

import ProductComicPanel from "@/components/basics/blocks/ProductComicPanel.vue";
import ImageHoverUpCard from "@/components/basics/cards/ImageHoverUpCard.vue";
import ProductFormPanel from "@/components/generic/forms/ProductFormPanel.vue";
import Footer from "@/components/generic/Footer.vue";

import type { gameMap } from "@/interfaces";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFloppyDisk, faXmark, faEdit, faUser, faUsers, faGlobe, faPeopleRoof, faIdCard,
	faArrowRight, faArrowLeftLong, faFaceSmile, faFaceGrinBeam, faFaceDizzy } from "@fortawesome/free-solid-svg-icons";
library.add(faFloppyDisk, faXmark, faEdit, faUser, faUsers, faGlobe, faPeopleRoof, faIdCard,
	faArrowRight, faArrowLeftLong, faFaceSmile, faFaceGrinBeam, faFaceDizzy )

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t } = useI18n();
const {
    state,
    getters,
    dispatch
} = useStore();
const { games } = toRefs(state.ecommerce);

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const showProductEditDialog = ref(false);

const {
	loading,
	isAdmin,
	selectedRecord,
	selectTargetRecord
} = useItemDetails<gameMap>(
    games,
	Promise.all([
		dispatch('main/initApp'),
		dispatch('ecommerce/getGames')
	])
);

if(props.id)
	selectTargetRecord(props.id);
</script>

<style lang="scss">
@import 'src/assets/scss/main/global';
@import "@/assets/scss/atoms/IconTextResources";

#product-details-page{

    /* TODO */
    .product-comic-panel{
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
				padding: 12px;
                color: rgb(var(--v-theme-on-surface));
                .icon{
                    color: inherit;
                }
            }
        }
    }
    /* TODO */
}
</style>