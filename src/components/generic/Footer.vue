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
              <p>{{ t('home-page.footer-content-1') }}</p>
              <p>{{ t('home-page.footer-content-2') }}</p>
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
              ( {{ todayIsOpen ? "APERTO" : "CHIUSO" }} )
              <span
                class="status-circle"
                :class="{
                  online: todayIsOpen,
                  offline: !todayIsOpen,
                }"
              />
            </small>
          </div>
          <div class="footer-content">
            <OpeningHours
              :color="themeColors.primary"
              :colorClosed="themeColors.error"
              :text="themeColors['on-surface']"
              :list="businessHours"
              :open="todayIsOpen"
            />
          </div>
        </v-col>
        <v-col cols="12" md="6" lg="4" xl="4" class="footer-section">
          <div class="footer-header">
            <h4 class="footer-title">{{ t('generic.contacts') }}</h4>
          </div>

            <ul class="simple-list">
                <li class="hover-line-highlight">
                    <a target="_blank" href="https://www.google.com/maps/dir/44.8703811,10.8166522/vr+metagames/@44.8197379,10.7501583,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x477ff34644a5efb1:0xc99febe9f2bbf4dc!2m2!1d10.880918!2d44.7793981">
                        <font-awesome-icon :icon="['fas', 'location-dot']" />
                        {{ contactAddressStreet }}
                    </a>
                </li>
                <li class="hover-line-highlight">
                    <a target="_blank" href="https://www.google.com/maps/dir/44.8703811,10.8166522/vr+metagames/@44.8197379,10.7501583,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x477ff34644a5efb1:0xc99febe9f2bbf4dc!2m2!1d10.880918!2d44.7793981">
                        <font-awesome-icon :icon="['fas', 'city']" />
                        {{ contactAddressCity }} ({{ contactAddressProvince }}) {{ contactAddressCap }}
                    </a>
                </li>
                <li class="hover-line-highlight">
                    <a :href="'mailto:' + contactEmail">
                        <font-awesome-icon :icon="['fas', 'envelope']" />
                        {{ contactEmail }}
                    </a>
                </li>
                <li class="hover-line-highlight">
                    <a :href="'tel:' + contactNumber.replace(' ','')">
                        <font-awesome-icon :icon="['fas', 'phone']" />
                        {{ contactNumber }}
                    </a>
                </li>
            </ul>
            <a :href="'https://wa.me/' + contactNumber.replace(' ','')"
               class="button-social-icon mini"
               target="_blank"
            >
                <span class="icon whatsapp-color">
                    <font-awesome-icon class="px-3" :icon="['fab', 'whatsapp']"/>
                </span>
            </a>
            <a :href="'https://t.me/' + contactTelegram"
               class="button-social-icon mini"
               target="_blank"
            >
                <span class="icon telegram-color">
                    <font-awesome-icon class="px-3" :icon="['fab', 'telegram']"/>
                </span>
            </a>

            <!--  TODO?
                <div class="footer-header mt-10">
                <h4 class="footer-title">Subscribe to our newsletter</h4>
                </div>
            -->

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

<script setup lang="ts">
import { computed, toRefs } from "vue";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";
import { useTheme } from "vuetify";
import {
    contactAddressStreet,
    contactAddressCity,
    contactAddressProvince,
    contactAddressCap,
    contactEmail,
    contactNumber,
    contactTelegram,
    socialFacebook,
    socialInstagram,
    socialTiktok,
    socialYoutube
} from "@/resources/constants";
// import mainLogotype from "@/assets/svg/logo/logotype.svg";
// import guebbitLogo from "@/assets/svg/logo/guebbit-logo-simple.svg";
import mainLogotype from "@/assets/svg/logo/vuefixed-logotype.vue";
import guebbitLogo from "@/assets/svg/logo/vuefixed-guebbit-logo-simple.vue";
import OpeningHours from "@/components/basics/cards/OpeningHours.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faEnvelope,
    faLocationDot,
    faCity,
    faPhone
} from "@fortawesome/free-solid-svg-icons";
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
    faLocationDot,
    faCity,
    faPhone,
    faFacebookF,
    faInstagram,
    faTiktok,
    faYoutube,
    faWhatsapp,
    faTelegram,
);

const { t } = useI18n();
const { state, getters } = useStore();
const { global: { current: { value: { colors: themeColors } } } } = useTheme();

const { businessHours } = toRefs(state.main);
const todayIsOpen = computed(() => getters['main/todayIsOpen']);
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
