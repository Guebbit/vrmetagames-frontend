<template>
    <v-dialog
        :model-value="dialogValue"
        @click:outside="toggleModal(false)"
        class="theme-modal"
    >
        <v-card>
            <v-card-header>
                <v-card-title>
                    Play
                </v-card-title>
            </v-card-header>
            <v-card-text>
                <v-container>
                    <h1>roba varia, tabs? ordina, carrello, fastcheckout?</h1>
                    <v-btn
                        :to="{ name: 'Play' }"
                    >
                        AVANZATO
                    </v-btn>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue-darken-1"
                    text
                    @click="toggleModal(false)"
                >
                    Close
                </v-btn>
                <v-btn
                    color="blue-darken-1"
                    text
                    @click="toggleModal(false)"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import useModalShowStructure from "@/resources/composables/useModalShowStructure";

const { dialogValue, toggleModal } = useModalShowStructure('play');
</script>

<style lang="scss">
.theme-modal{
    .v-card{
        .v-card-header{
            padding-top: 48px !important;
            padding-bottom: 24px !important;
            justify-content: center;
        }
        .v-card-title{
            font-size: 3em;
        }
    }
}
</style>