<template>
    <div id="work-in-progress-page" class="theme-page full-page">
        <Panel class="theme-panel"
               shadow="#000000"
               :shadow-opacity="0.9"
               centered
               strict
               hero
        >
            <template #default>
                <v-container class="text-center">
                    <h1 class="theme-page-title mb-5">
                        {{ t('generic.work-in-progress') }}
                    </h1>
                    <div class="alert-panel">
                        <BusinessContactsPanel />
                        <InclinedButton
                            class="panel-button mt-10"
                            size="x-large"
                            :background="themeColors.primary"
                            :double="themeColors.secondary"
                            :to="{ name: 'Play' }"
                        >
                            {{ t('generic.back-home') }}
                            <font-awesome-icon :icon="['fas', 'arrow-right']" />
                        </InclinedButton>
                    </div>
                </v-container>
            </template>
            <template #background>
                <video class="panel-background" async="" autoplay="" loop="" muted="" poster="">
                    <source src="https://mangabeats.it/public/video/videogames/mix.mp4" type="video/mp4">
                </video>
            </template>
        </Panel>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Panel from "guebbit-vue-library/src/components/blocks/Panel.vue";
import InclinedButton from "@/components/basics/buttons/InclinedButton.vue";
import { useTheme } from "vuetify";
import BusinessContactsPanel from "@/components/generic/panels/BusinessContactsPanel.vue";

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t } = useI18n();
/*
defineProps({
    id: {
        type: String,
        required: false
    }
})
*/
</script>

<style lang="scss">
@import 'src/assets/scss/main/global';

#work-in-progress-page{
    .theme-page-subtitle{
        font-size: 2em;
    }
    .alert-panel{
        max-width: 600px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>