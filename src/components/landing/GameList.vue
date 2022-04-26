<template>
    <swiper
        class="game-scrollbar slides-per-view-auto"
        :class="{
            'with-controls': controls
        }"
        :modules="modules"
        :scrollbar="{ draggable: true }"
        :autoplay="AutoplaySettings"
        :slidesPerView="'auto'"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
    >
        <swiper-slide
            v-for="item in list"
            :key="'slide-' + item.id"
        >
            <div class="book-card-wrapper">
                <BookCard
                    :key="'game-' + item.id"
                    ratio="4.25/6.87"
                    rotation="2"
                    :image="item.image"
                    :spine="item.spine"
                    @click="$router.push({
                        name: 'GameTarget',
                        params: {
                            id: item.id
                        }
                    })"
                />
                <div v-if="controls"
                     class="card-actions"
                >
                    <v-btn
                        color="secondary"
                        size="large"
                        elevation="12"
                    >
                        PLAY
                    </v-btn>
                    <v-btn
                        color="primary"
                        size="large"
                        elevation="12"
                    >
                        INFO
                    </v-btn>
                </div>
            </div>
        </swiper-slide>
    </swiper>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Autoplay, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import BookCard from "@/components/basics/cards/BookCard.vue";

// swiper CSS
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

export default defineComponent({
    name: "GameList",

    components: {
        BookCard,
        Swiper,
        SwiperSlide,
    },

    props: {
        list: {
            type: Array,
            default: () => {
                return [];
            }
        },
        controls: {
            type: Boolean,
            default: () => {
                return false;
            }
        }
    },

    data: () => {
        return {
            modules: [
                Autoplay,
                Scrollbar
            ],
            autoplaySettings: {
                delay: 3000,
                disableOnInteraction: false
            }
        }
    },

    methods: {
        onSwiper(swiper :typeof Swiper) {
            console.log(swiper);
        },

        onSlideChange() {
            console.log('slide change');
        }
    }
});
</script>

<style lang="scss">
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
        &:after{
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
            box-shadow: 0 0 60px rgba(var(--v-theme-secondary), 0.4), 0 11px 15px -7px rgba(var(--v-theme-secondary), 0.2), 0 24px 38px 3px rgba(var(--v-theme-secondary), 0.14), 0 9px 46px 8px rgba(var(--v-theme-secondary), 0.12) !important;
            border-radius: 12px;
        }
        &:hover{
            &:after{
                opacity: 1;
            }
        }
    }

    &.with-controls{
        .book-card-wrapper{
            position: relative;
            .book-card {
                transition: opacity 0.4s;
                &:hover{
                    opacity: 0.7;
                    & + .card-actions {
                        bottom: 24px;
                        opacity: 1;
                    }
                }
            }
            .card-actions {
                display: flex;
                justify-content: space-around;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                opacity: 0;
                transition: opacity 0.4s, bottom 0.4s;
            }
        }
    }
}
</style>