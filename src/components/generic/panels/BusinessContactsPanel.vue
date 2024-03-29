<template>
	<ul class="business-contacts simple-list"
		:class="{
			'dark-mode': dark,
			'light-mode': light
		}"
	>
		<li class="hover-line-highlight">
			<a target="_blank"
				href="https://www.google.com/maps/dir/44.8703811,10.8166522/vr+metagames/@44.8197379,10.7501583,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x477ff34644a5efb1:0xc99febe9f2bbf4dc!2m2!1d10.880918!2d44.7793981">
				<font-awesome-icon :icon="['fas', 'location-dot']" />
				{{ contactAddressStreet }}
			</a>
		</li>
		<li class="hover-line-highlight">
			<a target="_blank"
				href="https://www.google.com/maps/dir/44.8703811,10.8166522/vr+metagames/@44.8197379,10.7501583,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x477ff34644a5efb1:0xc99febe9f2bbf4dc!2m2!1d10.880918!2d44.7793981">
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
	<div class="social-contacts text-center mt-10"
		:class="{
			'dark-mode': dark,
			'light-mode': light
		}"
	>
		<a :href="socialFacebook"
			class="button-brand-icon mini"
			target="_blank"
		>
			<span
				class="icon"
				:class="{
					'facebook-color': !dark && !light
				}"
			>
				<font-awesome-icon class="px-3" :icon="['fab', 'facebook-f']" />
			</span>
		</a>
		<a :href="socialInstagram"
			class="button-brand-icon mini"
			target="_blank"
		>
			<span
				class="icon"
				:class="{
					'instagram-color': !dark && !light
				}"
			>
				<font-awesome-icon class="px-3" :icon="['fab', 'instagram']" />
			</span>
		</a>
		<a :href="socialTiktok"
			class="button-brand-icon mini"
			target="_blank"
		>
			<span
				class="icon"
				:class="{
					'tiktok-color': !dark && !light
				}"
			>
				<font-awesome-icon class="px-3" :icon="['fab', 'tiktok']" />
			</span>
		</a>
		<a :href="socialYoutube"
			class="button-brand-icon mini"
			target="_blank"
		>
			<span
				class="icon"
				:class="{
					'youtube-color': !dark && !light
				}"
			>
				<font-awesome-icon class="px-3" :icon="['fab', 'youtube']" />
			</span>
		</a>
		<a :href="'https://wa.me/' + contactNumber.replace(' ','')"
			class="button-brand-icon mini"
			target="_blank"
		>
			<span
				class="icon"
				:class="{
					'whatsapp-color': !dark && !light
				}"
			>
				<font-awesome-icon class="px-3" :icon="['fab', 'whatsapp']" />
			</span>
		</a>
		<a :href="'https://t.me/' + contactTelegram"
			class="button-brand-icon mini"
			target="_blank"
		>
			<span
				class="icon"
				:class="{
					'telegram-color': !dark && !light
				}"
			>
				<font-awesome-icon class="px-3" :icon="['fab', 'telegram']" />
			</span>
		</a>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

import {
    contactAddressStreet,
    contactAddressCity,
    contactAddressProvince,
    contactAddressCap,
    contactEmail,
    contactNumber,
    contactTelegram,
} from "@/resources/constants";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
    faEnvelope,
    faLocationDot,
    faCity,
    faPhone,
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

defineProps({
	dark: {
		type: Boolean,
		default: () => false
	},
	light: {
		type: Boolean,
		default: () => false
	}
})
</script>

<style lang="scss">
.business-contacts.simple-list{
	display: inline-block;
	svg{
		font-size: 1em;
		margin-right: 1em;
	}
	&.dark-mode{
		li{
			color: #000000;
			svg{
				color: inherit;
			}
			&.hover-line-highlight{
				&:after{
					background-color: #000000;
				}
			}
			&:hover{
				svg{
					color: rgb(var(--v-theme-secondary));
				}
			}
		}
	}
	&.light-mode{
		li{
			color: #ffffff;
			svg{
				color: inherit;
			}
			&.hover-line-highlight{
				&:after{
					background-color: #ffffff;
				}
			}
			&:hover{
				svg{
					color: rgb(var(--v-theme-primary));
				}
			}
		}
	}
}
.social-contacts{
	&.dark-mode{
		.button-brand-icon {
			&:hover {
				.icon {
					color: rgb(var(--v-theme-secondary)) !important;
				}
			}
		}
	}
	&.light-mode{
		.button-brand-icon {
			.icon{
				color: #fff;
				&::before {
					background-color: #fff;
				}
			}
			&:hover{
				.icon{
					color: rgb(var(--v-theme-primary)) !important;
					&::before {
						background-color: #fff;
					}
				}
			}
		}
	}
}
</style>