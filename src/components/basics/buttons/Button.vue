<template>
    <v-btn :color="type"
           elevation="4"
           outlined
           raised
           x-large
    >
        {{ text }}
        <v-icon v-if="icon" right dark>
            {{ icon }}
        </v-icon>
    </v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "GenericButton",

    props: {
        text: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            required: false
        },
        type: {
            type: String,
            default: () => {
                return "primary";
            }
        }
    }
});
</script>

<style lang="scss">
    //
</style>