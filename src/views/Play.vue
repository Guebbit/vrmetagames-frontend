<template>
    <div id="play-page" class="theme-page page-menu-padding">
        <v-row>
            <v-col cols="12" lg="3">
                <v-sheet
                    class="mx-auto"
                    rounded
                >
                    select
                    //
                    calendar
                </v-sheet>
                <v-sheet
                    class="mx-auto"
                    rounded
                >
                    riassunto
                    //
                    action
                </v-sheet>
            </v-col>
            <v-col cols="12" lg="9">

            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "PlayPage",
});
</script>

<style lang="scss">
@import 'src/assets/scss/main/global';

#play-page{

}
</style>