<template>
    <v-row
        class="station-list-section"
        align="center"
        justify="center"
    >
        <v-col v-for="item in stations"
               :key="'item-wrapper-2-' + item.id"
               cols="12" md="5" lg="4" xl="3"
        >
            <StationCard
                class="observer-activate"
                :key="'station-item-' + item.id"
                :image="item.image"

                :type="item.type"
                :time="item.time"
                :number="item.number"
                :available="item.available"
            />
        </v-col>
    </v-row>
</template>
<script lang="ts">
// https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-controller-1.png
// https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-controller-2.png
import { defineComponent } from "vue";
import StationCard from "@/components/landing/StationCard.vue";
import { mapState } from "vuex";

export default defineComponent({
    name: "StationList",

    components: {
        StationCard
    },

    data: () => {
        return {
            //
        }
    },

    computed: {
        ...mapState({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            stations: ({ ecommerce: { stations } }: any) => Object.values(stations),
        }),
    },
});
</script>

<style lang="scss">
@import 'src/assets/scss/main/global';

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