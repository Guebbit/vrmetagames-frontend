<template>
    <div class="event-long-card"
        :style="{
            '--event-long-card-color': color,
            '--event-long-card-background': background,
            '--event-long-card-text': text,
            '--event-long-card-height': height + 'px',
            '--event-long-card-shadow': '0,0,0'
        }"
    >
        <time :datetime="dateObject.toISOString() || null">
            <span v-if="dateShow.includes('day-number')"
                  class="day-number"
            >
                {{ dateDayNumber }}
            </span>
            <span v-if="dateShow.includes('month-label')"
                  class="month-label"
            >
                {{ dateMonthLabel }}
            </span>
            <span v-if="dateShow.includes('year-number')"
                  class="year-number"
            >
                {{ dateYearNumber }}
            </span>
            <span v-if="dateShow.includes('day-label')"
                  class="day-label"
            >
                {{ dateDayLabel }}
            </span>
        </time>
        <div v-show="image" class="card-image">
            <img :src="image" />
        </div>
        <div class="card-content"
            :style="{
                'padding-right': socialList.length > 0 ? '2em' : null
            }"
        >
            <slot />
        </div>
        <div v-show="socialList.length > 0"
             class="side-content"
        >
            <ul class="social-links">
                <li v-for="[ social, icon, url ] in socialList"
                    :key="'event-social-' + social"
                >
                    <a :href="url" :class="social + '-color hover-bg'">
                        <font-awesome-icon :icon="['fab', icon]"/>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faTiktok, faYoutube, faWhatsapp, faTelegram } from "@fortawesome/free-brands-svg-icons";

library.add(faFacebookF, faTwitter, faInstagram, faTiktok, faYoutube, faWhatsapp, faTelegram)

export default defineComponent({
    name: "EventLongCard",
    
    components: {
        FontAwesomeIcon
    },

    props: {
        time: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        color: {
            type: String,
            required: false
        },
        background: {
            type: String,
            required: false
        },
        text: {
            type: String,
            required: false
        },
        // options
        height: {
            type: Number,
            default: () => {
                return 160;
            }
        },
        dateShow: {
            type: Array as PropType<string[]>,
            default: () => {
                return [
                    "day-number",
                    "month-label",
                    "year-number"
                ];
            }
        },
        // SOCIALS
        facebook: {
            type: String,
            required: false
        },
        instagram: {
            type: String,
            required: false
        },
        tiktok: {
            type: String,
            required: false
        },
        youtube: {
            type: String,
            required: false
        },
        whatsapp: {
            type: String,
            required: false
        },
        telegram: {
            type: String,
            required: false
        },
    },

    computed: {
        dateObject(){
            return new Date(this.time);
        },

        dateDayNumber() :number {
            return this.dateObject.getDate();
        },
        /*
        dateMonthNumber() :number {
            return this.dateObject.getMonth();
        },
        */
        dateYearNumber() :number {
            return this.dateObject.getFullYear();
        },
        dateDayLabel() :string {
            return this.dateObject.toLocaleString('default', { weekday: 'short' });
        },
        dateMonthLabel() :string {
            return this.dateObject.toLocaleString('default', { month: 'short' });
        },

		// TODO remove\"portare fuori" i bottoni socials e rendere più generico
		// 		(magari creare un componente "ancora più base")
        socialList() :(string | undefined)[][] {
            return [
                ['facebook', 'facebook-f', this.facebook],
                ['instagram', 'instagram', this.instagram],
                ['tiktok', 'tiktok', this.tiktok],
                ['youtube', 'youtube', this.youtube],
                ['whatsapp', 'whatsapp', this.whatsapp],
                ['telegram', 'telegram', this.telegram],
            ].filter((item) => {
                return item[2];
            });
        },
    }
});
</script>

<style lang="scss">
// WARNING: social colors must arrive from outside, or they are primary color

$event-long-card-mobile-threshold: 600px !default;

.event-long-card {
    display: flex;
    flex-direction: column;
    color: var(--event-long-card-text);
    background-color: var(--event-long-card-background);
    padding: 0;
    margin: 0 0 24px;
    box-shadow: rgba(var(--event-long-card-shadow), 0.19) 0 10px 30px,
                rgba(var(--event-long-card-shadow), 0.23) 0 6px 10px;

    & > time {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;
        width: 100%;
        color: var(--event-long-card-text);
        background-color: var(--event-long-card-color);
        padding: 5px;
        text-align: center;
        text-transform: uppercase;
        & > span {
            display: block;
            line-height: 1;
            font-size: 1.5em;
            &:first-child{
                font-size: 5em;
                font-weight: 300;
            }
            &:nth-child(2){
                font-size: 2em;
                font-weight: 900;
            }
            &:last-child{
                font-size: 1em;
            }
        }
    }

    .card-image{
        position: relative;
        overflow: hidden;
        img{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .card-content {
        flex-grow: 1;
        padding: 24px;
        text-align: center;
    }

    .side-content{
        ul.social-links {
            display: flex;
            list-style: none;
            padding: 0;
            width: 100%;
            text-align: center;

            & > li{
                flex-grow: 1;
                cursor: pointer;
                padding: 0;
                transition: color 0.2s, background-color 0.2s;
                color: white;
                & > a {
                    font-size: 2em;
                    display: block;
                    color: inherit;
                    width: 100%;
                }
            }
        }
    }

    // desktop mode
    @media (min-width: $event-long-card-mobile-threshold){
        flex-direction: row;
        position: relative;
        width: 100%;
        padding: 0;
        & > time,
        & > .card-image {
            width: var(--event-long-card-height);
            height: var(--event-long-card-height);
            padding: 0;
            margin: 0;
        }
        & > time > .day {
            font-size: 70px;
        }
        .card-content {
            background-color: var(--event-long-card-background);
            overflow: hidden;
            position: relative;
            height: var(--event-long-card-height);
            text-align: left;
            padding: 12px;
        }
        .side-content {
            position: absolute;
            top: 0;
            right: 0;
            ul.social-links {
                display: flex;
                flex-direction: column;
                font-size: 2em;
                & > li {
                    display: block;
                    padding: 0;
                    width: 1em;
                    height: 1em;
                    line-height: 1em;
                    & > a {
                        font-size: 0.5em;
                        display: block;
                        color: inherit;
                    }

                    &:hover{
                        background-color: var(--event-long-card-color);
                        color: var(--event-long-card-background);
                    }
                }
            }
        } //side-content
    }
}
</style>