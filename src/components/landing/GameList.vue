<template>
    <swiper
		ref="swiperRef"
        class="game-scrollbar slides-per-view-auto"
        :class="{
            'with-controls': controls
        }"
        :modules="modules"
        :scrollbar="{
			draggable: true
		}"
        :autoplay="{
			delay: 3000,
			disableOnInteraction: true
		}"
        :slidesPerView="'auto'"

		@mouseover="onSwiperHoverIn"
		@mouseleave="onSwiperHoverOut"
        @swiper="onSwiperInit"
        @slideChange="onSwiperSlideChange"
    >
        <swiper-slide
            v-for="item in gamesList"
            :key="'slide-' + item.id"
        >
            <div class="book-card-wrapper"
				@click="$router.push({
					name: 'GameTarget',
					params: {
						id: item.id
					}
				})"
			>
                <BookCard
                    :key="'game-' + item.id"
                    ratio="4.25/6.87"
                    rotation="2"
                    :image="item.coverFront.src"
                    :spine="item.coverSpine.src"
                />
                <div v-show="controls"
                     class="card-actions d-flex justify-center align-center flex-column"
                >
					<v-btn variant="text" icon>
						<font-awesome-icon :icon="['fas', 'play']" size="4x" />
					</v-btn>
                </div>
            </div>
        </swiper-slide>
    </swiper>
</template>

<script setup lang="ts">
// https://swiperjs.com/vue#use-swiper
// https://swiperjs.com/swiper-api

import { computed, ref, defineProps } from "vue";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";

import { BookCard } from "@guebbit/vue-library";
import type { gameMap } from '@/interfaces';

import { Autoplay, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

library.add(faPlay, faCircleInfo);


const { t, locale } = useI18n();
const { getters } = useStore();

defineProps({
    controls: {
        type: Boolean,
        default: () => {
            return true;
        }
    }
});

const gamesList = computed<gameMap[]>(() => Object.values(getters['ecommerce/gameDetailedRecords'](locale.value)));

const modules = [
    Autoplay,
    Scrollbar
];

const swiperInstance = ref<typeof Swiper | null>(null);

const onSwiperInit = (instance :typeof Swiper) => {
    console.log("gamelist swiper", instance);
	swiperInstance.value = instance;
	swiperInstance.value.autoplay.pause()
};

const onSwiperHoverIn = () => {
	if(!swiperInstance.value)
		return;
	// swiperInstance.value.autoplay.pause()
};
const onSwiperHoverOut = () => {
	if(!swiperInstance.value)
		return;
	// swiperInstance.value.autoplay.run()
};


const onSwiperSlideChange = () => {
    console.log('slide change');
};

</script>

<style lang="scss">
@import 'src/assets/scss/main/global';

.swiper.game-scrollbar{
    padding: 24px 0;

    .swiper-slide{
        width: 300px;
        max-width: 30vw;
        margin-right: 2em;
    }

    .swiper-scrollbar {
        // background: rgba(var(--v-theme-secondary), 0.1);
        .swiper-scrollbar-drag {
            background: rgba(var(--v-theme-primary), 0.5);
        }
    }

    .book-card-wrapper {
		position: relative;
        cursor: pointer;

		/*
        &:before{
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 90%;
            height: 90%;
            transform: translate(-50%, -50%);
            z-index: -1;
            opacity: 0;
            transition: opacity 0.4s;
            background: rgba(var(--v-theme-primary), 0.3);
            @include boxShadowSecondary;
            border-radius: 12px;
        }
        &:hover{
            &:before{
                opacity: 1;
            }
        }
        */
    }

    &.with-controls{
        .book-card-wrapper{
			.book-card{
				transition: opacity 0.4s;
			}
			.card-actions {
				position: absolute;
				bottom: 0;
				left: 0;
				height: 100%;
				width: 100%;
				opacity: 0;
				transition: opacity 0.4s, bottom 0.4s;

				svg{
					padding: 1em;
					background: radial-gradient(circle, rgba(#000,1) 0%, rgba(#000,0.7) 30%, rgba(#000,0) 70%);
				}
			}
			&:hover{
				.book-card{
					opacity: 0.25;
				}
				.card-actions {
					bottom: 24px;
					opacity: 1;
				}
			}
        }
    }
}
</style>