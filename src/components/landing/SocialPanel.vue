<template>
    <Panel
        class="social-panel"
        height="400px"
        shadow="#000"
        :shadow-opacity="0.95"
        centered
        fixed
        :backgroundImageCss="'http://placekitten.com/2000/1000'"
    >
        <h3 class="theme-section-title text-center mb-10">
            {{ t('home-page.socials-title') }}
        </h3>

        <a :href="socialFacebook"
           class="button-brand-icon"
           target="_blank"
        >
            <span class="icon facebook-color">
                <font-awesome-icon class="px-3" :icon="['fab', 'facebook-f']"/>
            </span>
        </a>
        <a :href="socialInstagram"
           class="button-brand-icon"
           target="_blank"
        >
            <span class="icon instagram-color">
                <font-awesome-icon class="px-3" :icon="['fab', 'instagram']"/>
            </span>
        </a>
        <a :href="socialTiktok"
           class="button-brand-icon"
           target="_blank"
        >
            <span class="icon tiktok-color">
                <font-awesome-icon class="px-3" :icon="['fab', 'tiktok']"/>
            </span>
        </a>
        <a :href="socialYoutube"
           class="button-brand-icon"
           target="_blank"
        >
            <span class="icon youtube-color">
                <font-awesome-icon class="px-3" :icon="['fab', 'youtube']"/>
            </span>
        </a>
        <a :href="'https://wa.me/' + contactNumber.replace(' ','')"
           class="button-brand-icon"
           target="_blank"
        >
            <span class="icon whatsapp-color">
                <font-awesome-icon class="px-3" :icon="['fab', 'whatsapp']"/>
            </span>
        </a>
        <a :href="'https://t.me/' + contactTelegram"
           class="button-brand-icon"
           target="_blank"
        >
            <span class="icon telegram-color">
                <font-awesome-icon class="px-3" :icon="['fab', 'telegram']"/>
            </span>
        </a>
    </Panel>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Panel from "guebbit-vue-library/src/components/blocks/Panel.vue";

import {
    contactNumber,
    contactTelegram,
    socialFacebook,
    socialInstagram,
    socialTiktok,
    socialYoutube
} from "@/resources/constants";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFacebookF, faInstagram, faTiktok, faYoutube, faWhatsapp, faTelegram } from "@fortawesome/free-brands-svg-icons";


library.add(faFacebookF, faInstagram, faTiktok, faYoutube, faWhatsapp, faTelegram);
const { t } = useI18n();
</script>