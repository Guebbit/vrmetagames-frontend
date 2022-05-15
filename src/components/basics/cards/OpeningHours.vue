<template>
    <div class="opening-hours-list"
        :style="{
            '--opening-hours-color': color,
            '--opening-hours-text': text,
            '--opening-hours-background': background,
        }"
    >
        <ul>
            <li v-for="day in 7" :key="'day-' + (day - 1)"
                :class="{
                    'today': today === (day -1)
                }"
            >
                <span class="label">
                    {{ $t('main.days.' + (day - 1) )}}
                </span>
                <span class="hours">
                    {{ list[day-1] && list[day-1].length > 0 ? list[day-1][0] + ' - ' + list[day-1][1] : $t('main.closed') }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from 'vue'
import type { BusinessHoursMap } from "@/interfaces";

export default defineComponent({
    name: "OpeningHours",

    props: {
        list: {
            type: Array as PropType<BusinessHoursMap>,
            default: () => {
                return [];
            }
        },
        open: {
            type: Boolean,
            default: () => {
                return false;
            }
        },

        color: {
            type: String,
            default: () => {
                return '#FFFFFF';
            }
        },
        text: {
            type: String,
            default: () => {
                return '#000000';
            }
        },
        background: {
            type: String,
            default: () => {
                return 'transparent';
            }
        },
    },

    computed:{
        today(){
            return new Date().getDay();
        },
    }
});
</script>

<style lang="scss">
.opening-hours-list{
    background: var(--opening-hours-background);
    color: var(--opening-hours-text);
    .title{
        font-size: 1.4em;
        padding-left: 0.5em;
        border-left: 4px solid var(--opening-hours-color);
    }
    ul{
        li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.4em 1em;
            &.today{
                color: var(--opening-hours-color);
            }
            &:nth-child(odd){
                background: rgba(#000000, 0.1);
            }
        }
    }
}
</style>