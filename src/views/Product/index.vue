<template>
    <div id="product-list-page" class="theme-page">
        <h1>PRODUCT LIST</h1>
        <section class="theme-section">
            <v-container>
                <GameList
                    :list="games"
                    :controls="true"
                />
            </v-container>
        </section>
        <section class="theme-section">
            DESKTOP MENU A LATO, MOBILE A SCOMPARSA (O IN ALTO)
            <br>
            tabs / filtri per tipologia e sotto MASONRY (o normale lista)
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import GameList from "@/components/landing/GameList.vue";

export default defineComponent({
    name: "ProductList",
    components: { GameList },
    computed: {
        ...mapState({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            games: ({ ecommerce: { games } }: any) => Object.values(games),
        }),
    }
});
</script>