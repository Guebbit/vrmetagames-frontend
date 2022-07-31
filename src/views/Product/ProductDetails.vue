<template>
    <div id="product-details-page" class="theme-page">
        <ProductComicPanel
            :key="'game-panel-' + selectedItem.id"
            :primary="themeColors.secondary"
            :secondary="themeColors.primary"
            hero
        >
            <template #background2 >
                <v-img
                    cover
                    class="panel-background"
                    :lazy-src="selectedItem.imageThumbnail"
                    :src="selectedItem.image"
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
                    :image="selectedItem.coverFront"
                >
                    <v-img
                        :lazy-src="selectedItem.coverFrontThumbnail"
                        :src="selectedItem.coverFront"
                        height="100%"
                        width="100%"
                    />
                </ImageHoverUpCard>
            </template>
            <template #content>
                <div class="categories-wrapper">
                    <v-btn
                        v-for="(category, i) in selectedItem.categories"
                        :key="'category-title-' + i"
                        class="mx-2"
                        variant="flat"
                        color="primary"
                    >
                        {{ t('games.genre-' + category) }}
                    </v-btn>
                </div>

                <!-- TODO stations -->
                <h3 class="panel-title">{{ selectedItem.title }}</h3>
                <h4 class="panel-subtitle">{{ selectedItem.author }}</h4>
                <div class="panel-chips">
                    <v-chip
                        v-for="(badge, i) in selectedItem.tags"
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
                    <span v-show="selectedItem.maxPlayersOffline > 1"
                          class="icon-text-resources"
                    >
                        <span class="icon">
                            {{ selectedItem.maxPlayersOffline }}
                            <font-awesome-icon :icon="['fas', 'users']" />
                        </span>
                        <small>{{ t('generic.multiplayer') }}</small>
                    </span>
                    <span v-show="selectedItem.maxPlayersOnline > 1"
                          class="icon-text-resources"
                    >
                        <span class="icon">
                            <font-awesome-icon :icon="['fas', 'globe']" />
                        </span>
                        <small>{{ t('generic.multiplayer') }} {{ t('generic.online') }}</small>
                    </span>
                    <span v-show="selectedItem.maxPlayersOffline <= 1 && selectedItem.maxPlayersOnline <= 1"
                          class="icon-text-resources"
                    >
                        <span class="icon">
                            <font-awesome-icon :icon="['fas', 'user']" />
                        </span>
                        <small>{{ t('generic.singleplayer-2') }}</small>
                    </span>
                    <span v-show="selectedItem.flagFamilyFriendly"
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
                        v-show="isAuthenticated && userInfo.isAdmin"
                        class="ma-2"
                        @click="showProductEditDialog = true"
                    >
                        <font-awesome-icon class="mr-5" :icon="['fas', 'edit']" />
                        {{ t('product-page.edit-product') }}
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

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFloppyDisk, faXmark, faEdit, faUser, faUsers, faGlobe, faPeopleRoof, faIdCard, faArrowRight  } from "@fortawesome/free-solid-svg-icons";
library.add(faFloppyDisk, faXmark, faEdit, faUser, faUsers, faGlobe, faPeopleRoof, faIdCard, faArrowRight )

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t } = useI18n();
const {
    state,
    getters,
    dispatch
} = useStore();
const { userInfo } = toRefs(state.user);
const { games } = toRefs(state.ecommerce);

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const showProductEditDialog = ref(false);


const {
    selectedItem,
    loading,
    isAuthenticated,
    isAdmin
} = useItemDetails(
    props.id,
    games.value,
    () => {
        return Promise.all([
            dispatch('main/initApp'),
            dispatch('ecommerce/getGames')
        ]);
    }
);


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
                margin: 0 12px;
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