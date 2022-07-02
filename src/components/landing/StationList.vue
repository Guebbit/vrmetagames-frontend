<template>
    <v-row
        class="station-list-section"
        align="center"
        justify="center"
    >
        <v-col v-for="(item, i) in stationsList"
               :key="'item-wrapper-2-' + item.id"
               cols="12" md="5" lg="4" xl="3"
        >
            <StationCard
                class="observer-activate"
                :key="'station-item-' + item.id"
                :image="item.image"

                :type="item.type"
                :time="1654121642000"
                :number="i % 2 ? 2 : 0"
                :available="i % 2 ? true : false"
            />
            <!-- TODO available && number && time? -->
        </v-col>
    </v-row>
    <pre>{{stationsList}}</pre>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import { useStore } from "@/store";
import type { stationMap } from "@/interfaces";

import StationCard from "@/components/landing/StationCard.vue";

const {
    state
} = useStore();

const { stations } = toRefs(state.ecommerce);
const stationsList = computed<stationMap[]>(() => Object.values(stations.value));
</script>

<style lang="scss">
// https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-controller-1.png
// https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-controller-2.png
@import '../../assets/scss/main/global';

.station-list-section{
    margin-top: 24px;
    .station-card {
        height: 500px;
        @include media-mobile() {
            height: 400px;
        }
    }
}

</style>