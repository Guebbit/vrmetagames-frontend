<template>
  <footer class="event-footer">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6" lg="4" xl="4" class="footer-section">
          <div class="footer-header">
            <a href="/" class="logo">
              <mainLogotype id="temporary-logotype" />
            </a>
          </div>
          <div class="footer-content">
            <div class="mx-5">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <hr />
            </div>
            <div class="text-center">
              <a href="#" class="button-social-icon mini" target="_blank">
                <span class="icon facebook-color">
                  <font-awesome-icon
                    class="px-3"
                    :icon="['fab', 'facebook-f']"
                  />
                </span>
              </a>
              <a href="#" class="button-social-icon mini" target="_blank">
                <span class="icon instagram-color">
                  <font-awesome-icon
                    class="px-3"
                    :icon="['fab', 'instagram']"
                  />
                </span>
              </a>
              <a href="#" class="button-social-icon mini" target="_blank">
                <span class="icon tiktok-color">
                  <font-awesome-icon class="px-3" :icon="['fab', 'tiktok']" />
                </span>
              </a>
              <a href="#" class="button-social-icon mini" target="_blank">
                <span class="icon youtube-color">
                  <font-awesome-icon class="px-3" :icon="['fab', 'youtube']" />
                </span>
              </a>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" lg="4" xl="3" class="footer-section">
          <div class="footer-header d-flex justify-space-between align-center">
            <h4 class="footer-title">
              {{ $t("generic.opening-hours") }}
            </h4>
            <small>
              ( {{ isOpen ? "APERTO" : "CHIUSO" }} )
              <span
                class="status-circle"
                :class="{
                  online: isOpen,
                  offline: !isOpen,
                }"
              />
            </small>
          </div>
          <div class="footer-content">
            <OpeningHours
              :color="$vuetify.theme.themes.default.colors.primary"
              :text="$vuetify.theme.themes.default.colors.text"
              :list="businessHours"
              :open="isOpen"
            />
            <div>
              <span class="button-social-icon mini">
                <a
                  href="https://t.me/loremipsum"
                  class="icon telegram-color"
                  target="_blank"
                >
                  <font-awesome-icon :icon="['fab', 'telegram']" />
                </a>
                <a href="tel:05912345678"> 059 12345678 </a>
                <a
                  href="https://wa.me/05912345678"
                  class="icon whatsapp-color"
                  target="_blank"
                >
                  <font-awesome-icon :icon="['fab', 'whatsapp']" />
                </a>
              </span>
            </div>
            <div>
              <a
                href="mailto:guerzoni.andrea91@gmail.com"
                class="button-social-icon mini"
              >
                <span class="icon secondary-color">
                  <font-awesome-icon :icon="['fas', 'envelope']" />
                </span>
                guerzoni.andrea91@gmail.com
              </a>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" lg="4" xl="4" class="footer-section">
          <div class="footer-header">
            <h4 class="footer-title">subscribe to our newsletter</h4>
          </div>
          <ul class="simple-list">
            <li class="hover-line-highlight">
              <font-awesome-icon :icon="['fas', 'arrow-right']" />
              Lorem Ipsum
            </li>
            <li class="hover-line-highlight">
              <font-awesome-icon :icon="['fas', 'envelope']" />
              Sit Amet
            </li>
            <li class="hover-line-highlight">
              <font-awesome-icon :icon="['fas', 'arrow-right']" />
              Consectetur adipiscing elit<br />Consectetur adipiscing elit
            </li>
            <li class="hover-line-highlight">
              <font-awesome-icon :icon="['fas', 'arrow-right']" />
              Tempor incididunt
            </li>
            <li>
              <div>
                <ul class="simple-list">
                  <li class="hover-line-highlight">
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                    Consectetur adipiscing elit<br />Consectetur adipiscing elit
                  </li>
                  <li class="hover-line-highlight">
                    <font-awesome-icon :icon="['fas', 'envelope']" />
                    Tempor incididunt
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
    <div class="footer-copyright">
      <v-container class="d-flex justify-space-between">
        <p>
          Copyright © 2022 All rights reserved
          <br />
          <b
            >Made with by
            <a target="_blank" href="https://guebbit.com/">Guebbit</a></b
          >
        </p>
        <a href="https://guebbit.com/" class="logo">
          <guebbitLogo />
        </a>
      </v-container>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapState } from "vuex";

// import mainLogotype from "@/assets/svg/logo/logotype.svg";
// import guebbitLogo from "@/assets/svg/logo/guebbit-logo-simple.svg";
import mainLogotype from "@/assets/svg/logo/vuefixed-logotype.vue";
import guebbitLogo from "@/assets/svg/logo/vuefixed-guebbit-logo-simple.vue";
import OpeningHours from "@/components/basics/cards/OpeningHours.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faYoutube,
  faWhatsapp,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faEnvelope,
  faFacebookF,
  faInstagram,
  faTiktok,
  faYoutube,
  faWhatsapp,
  faTelegram
);

export default defineComponent({
  name: "Footer",

  components: {
    OpeningHours,
    mainLogotype,
    guebbitLogo,
    FontAwesomeIcon,
  },

  computed: {
    ...mapState({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      businessHours: ({ main: { businessHours } }: any) => businessHours,
    }),
    ...mapGetters("main", ["isOpen"]),
  },
});
</script>

<style lang="scss">
@use "sass:math";
@import '../../assets/scss/main/global';

$event-footer-padding: 24px !default;
$event-footer-background: rgba(#000000,0.8) !default;
$event-footer-primary: #ffffff !default;
$event-footer-secondary: $event-footer-primary !default;
$event-footer-text: $event-footer-primary !default;
$event-footer-title-line-width: 30px !default;
$event-footer-title-line-height: 4px !default;
$event-footer-mobile-threshold: 600px !default;

#temporary-logotype{
    max-width: 300px;
    margin: 0 auto;
    fill: rgb(var(--v-theme-primary))
}

.event-footer {
    background: $event-footer-background;
    color: $event-footer-text;
    padding-top: $event-footer-padding;

    .footer-title{
        position: relative;
        text-transform: uppercase;
        padding: math.div($event-footer-padding, 4) 0;
        font-size: 1.5em;
        font-weight: 700;
        &:before {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: $event-footer-title-line-width;
            height: $event-footer-title-line-height;
            background: $event-footer-primary;
        }
    }

    .footer-section {
        position: relative;
        padding: $event-footer-padding;

        @media (max-width: $event-footer-mobile-threshold){
            text-align: center;
        }

        .footer-header {
            margin-bottom: 30px;
            .footer-title{
                text-align: left;
            }
        }
        .footer-content{
            .logo{
                height: 100%;
                width: 60px;
            }

            p{
                font-size: 1.1em;
                margin-bottom: 15px;
                font-weight: 400;
                color: $event-footer-text;
                opacity: 0.5;
            }
            hr{
                border: 0;
                height: 2px;
                margin: math.div($event-footer-padding, 4) 0;
                background: $event-footer-text;
            }
        }
    }
    .footer-copyright {
        position: relative;
        z-index: 1;
        background-color: darken($event-footer-background, 4%);
        padding: math.div($event-footer-padding, 2) math.div($event-footer-padding, 4);
        @media (max-width: $event-footer-mobile-threshold){
            text-align: center;
        }
        a{
            color: $event-footer-primary;
            font-weight: 700;
        }
        .logo{
            height: 100%;
            width: 60px;
        }
    }

    /*
    ul.simple-list{
        &  > li{
            svg,
            .icon{
                color: white;
            }
        }
        .hover-line-highlight{
            &:after{
                background-color: white;
            }
        }
    }
    */
}
</style>
