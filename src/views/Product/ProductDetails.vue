<template>
    <div id="product-details-page" class="theme-page">
		<GameDetailsPage
			:id="id"
			:shadow="'#00ff00'"
		>
			<template #actions>
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
			</template>
		</GameDetailsPage>

		<h1>{{testMe}}</h1>
		{{ presentationsGallery }}
		<hr >
		{{ otherGallery }}

		<v-slide-group
			v-model="testMe"
			class="bg-black pa-4"
			selected-class="opacity-50"
			show-arrows
			center-active
		>
			<v-slide-group-item
				v-for="(media, i) in otherGallery"
				:key="'product-gallery-' + i"
				v-slot="{ toggle, selectedClass }"
			>
				<MediaChunkComponent
					:type="media.type"
					:thumbnail="media.thumbnail"
					:src="media.src"
					:class="['ma-4', selectedClass]"
					@click="toggle"
				/>
			</v-slide-group-item>
			<!--
			<v-slide-group-item
				v-for="n in 15"
				:key="n"
				v-slot="{ isSelected, toggle, selectedClass }"
			>
				<v-card
					color="grey-lighten-1"
					:class="['ma-4', selectedClass]"
					height="200"
					width="300"
					@click="toggle"
				>
					<div class="d-flex fill-height align-center justify-center">
						<v-scale-transition>
							{{ isSelected }}
						</v-scale-transition>
					</div>
				</v-card>
			</v-slide-group-item>
			-->
		</v-slide-group>

		<v-dialog
            v-model="showProductEditDialog"
            fullscreen=""
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
                            icon=""
                            @click="showProductEditDialog = false"
                        >
                            <font-awesome-icon :icon="['fas', 'floppy-disk']" />
                        </v-btn>
                    </v-toolbar-items>
                    <v-toolbar-items>
                        <v-btn
                            icon=""
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
import { computed, defineProps, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useTheme } from "vuetify";
import { useStore } from "@/store";

import useItemDetails from "@/resources/composables/useItemDetails";
import GameDetailsPage from "@/components/products/GameDetailsPage.vue";
import ProductFormPanel from "@/components/generic/forms/ProductFormPanel.vue";
import Footer from "@/components/generic/Footer.vue";
import type { gameMap } from "@/interfaces";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFloppyDisk, faXmark, faEdit, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
library.add(faFloppyDisk, faXmark, faEdit, faArrowLeftLong);

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t, locale } = useI18n();
const { getters, dispatch } = useStore();

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

/**
 *
 */
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

/**
 * Galleries
 */
// everything (empty if undefined)
const fullGallery = computed(() => selectedRecord.value?.gallery || []);
// main course, all images\video have 100% visibility
const presentationsGallery = computed(() => fullGallery.value.filter(({ role }) => role === "presentation"));
// bottom carousel
const otherGallery = computed(() => fullGallery.value.filter(({ role }) => role !== "presentation"));

/**
 * Current user info (for isAdmin)
 */
const isAdmin = computed(() => getters['user/isAdmin']);

/**
 * Admin only edit game info
 */
const showProductEditDialog = ref(false);


const testMe = ref(null);
</script>

<style lang="scss">
@import 'src/assets/scss/main/global';

#product-details-page{
	.product-comic-panel{
		//
	}
}
</style>