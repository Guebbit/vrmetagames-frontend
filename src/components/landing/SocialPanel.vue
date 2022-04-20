<template>
    <Panel
        class="social-panel"
        height="400px"
        shadow="#000"
        shadow-opacity="0.95"
        centered
        fixed
        :backgroundImageCss="'http://placekitten.com/2000/1000'"
    >
        <h3 class="theme-section-title text-center mb-10">
            Follow Me On Socials
        </h3>
        <a href="#" class="button-social-icon facebook-color">
            <font-awesome-icon class="px-3" :icon="['fab', 'facebook-f']"/>
        </a>
        <a href="#" class="button-social-icon instagram-color">
            <font-awesome-icon class="px-3" :icon="['fab', 'instagram']"/>
        </a>
        <a href="#" class="button-social-icon tiktok-color">
            <font-awesome-icon class="px-3" :icon="['fab', 'tiktok']"/>
        </a>
        <a href="#" class="button-social-icon youtube-color">
            <font-awesome-icon class="px-3" :icon="['fab', 'youtube']"/>
        </a>
        <a href="#" class="button-social-icon whatsapp-color">
            <font-awesome-icon class="px-3" :icon="['fab', 'whatsapp']"/>
        </a>
        <a href="#" class="button-social-icon telegram-color">
            <font-awesome-icon class="px-3" :icon="['fab', 'telegram']"/>
        </a>
    </Panel>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Panel from "@/components/basics/blocks/Panel.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFacebookF, faInstagram, faTiktok, faYoutube, faWhatsapp, faTelegram } from "@fortawesome/free-brands-svg-icons";

library.add(faFacebookF, faInstagram, faTiktok, faYoutube, faWhatsapp, faTelegram)

export default defineComponent({
    name: "SocialPanel",

    components: {
        Panel,
        FontAwesomeIcon
    }
});
</script>

<style lang="scss">
@import 'guebbit-scss-library';
@import 'src/assets/scss/components/ButtonSocialIcon.scss';

.social-panel {
    .button-social-icon{
        &.facebook-color{
            color: g-color-get('socials', 'facebook');
            &:before{
                background: g-color-get('socials', 'facebook');
            }
        }
        &.instagram-color{
            color: g-color-get('socials', 'instagram-fallback');
            &:before{
                background: g-color-get('socials', 'instagram');
            }
        }
        &.tiktok-color{
            color: g-color-get('socials', 'tiktok-fallback');
            &:before{
                background: g-color-get('socials', 'tiktok');
            }
        }
        &.youtube-color{
            color: g-color-get('socials', 'youtube');
            &:before{
                background: g-color-get('socials', 'youtube');
            }
        }
        &.whatsapp-color{
            color: g-color-get('socials', 'whatsapp');
            &:before{
                background: g-color-get('socials', 'whatsapp');
            }
        }
        &.telegram-color{
            color: g-color-get('socials', 'telegram');
            &:before{
                background: g-color-get('socials', 'telegram');
            }
        }

        &:hover{
            color: #FFFFFF;
        }
    }
}
</style>


