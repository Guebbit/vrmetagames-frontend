<template>
    <v-app>
        <MainNavigation />
        <v-main class="pt-0">
            <router-view />
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainNavigation from "@/components/navigation/MainNavigation.vue";

export default defineComponent({
    name: "App",
    components: {
        MainNavigation
    }
});
</script>

<style lang="scss">
@import 'src/assets/scss/main.scss';
@import 'src/assets/scss/theme.scss';
</style>

