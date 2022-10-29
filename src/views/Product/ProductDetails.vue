<template>
    <div id="product-details-page" class="theme-page">
		<GameDetailsPage
			:id="id"
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
import GameDetailsPage from "@/components/products/GameDetailsPage.vue";

import ProductFormPanel from "@/components/generic/forms/ProductFormPanel.vue";
import Footer from "@/components/generic/Footer.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFloppyDisk, faXmark, faEdit, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
library.add(faFloppyDisk, faXmark, faEdit, faArrowLeftLong);

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t } = useI18n();
const { getters } = useStore();

defineProps({
    id: {
        type: String,
        required: true
    }
});

/**
 * Current user info (for isAdmin)
 */
const isAdmin = computed(() => getters['user/isAdmin'])

/**
 * Admin only edit game info
 */
const showProductEditDialog = ref(false);
</script>

<style lang="scss">
@import 'src/assets/scss/main/global';

#product-details-page{
	.product-comic-panel{
		//
	}
}
</style>