<template>
    <div class="theme-page">
        <br><br><br><br><br><br><br>
        <h1>{{ registrationMode ? 'REGISTRATION' : 'LOGIN'}}</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "SignupPage",

    props: {
        registrationMode: {
            type: Boolean,
            default: () => {
                return false;
            }
        },
    },
});
</script>

<style lang="scss">
@import 'src/assets/scss/main/global';
//
</style>