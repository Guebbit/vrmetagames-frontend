<template>
    <v-navigation-drawer
        v-model="mobileDrawer"
        temporary
    >
        <v-list>
            <v-list-item
                min-height="100"
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                title="Sandra Adams"
                subtitle="sandra_a88@gmailcom"
            ></v-list-item>
        </v-list>

        <v-divider />

        <v-list nav density="compact">
            <v-list-item
                class="button-parallelogram"
                min-height="60"
                prepend-icon="mdi-view-dashboard"
                title="Home"
                to="/"
            />

            <v-list-item
                class="v-beta-fix button-parallelogram"
                min-height="60"
                to="play"
            >
                <v-list-item-avatar class="v-list-item-avatar--start">
                    <v-avatar>
                        <font-awesome-icon :icon="['fas', 'vr-cardboard']" />
                    </v-avatar>
                </v-list-item-avatar>
                <v-list-item-title>
                    Play
                </v-list-item-title>
            </v-list-item>

            <v-list-item
                class="button-parallelogram"
                min-height="60"
                prepend-icon="mdi-forum"
                title="About"
                to="about"
            />

            <v-list-item
                class="button-parallelogram hover-only"
                min-height="60"
                prepend-icon="mdi-view-dashboard"
                title="Profile"
                to="/profile"
            />
        </v-list>


        <template v-slot:prepend>
            <v-btn block
                   class="display-flex justify-space-between"
                   size="x-large"
                   to="login"
            >
                Login
                <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
            </v-btn>
            <v-divider />
        </template>
        <template v-slot:append>
            <v-divider />
            <v-btn block
                   class="display-flex justify-space-between"
                   size="x-large"
                   to="logout"
            >
                Logout
                <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
            </v-btn>
        </template>

    </v-navigation-drawer>
    <v-app-bar ref="mainNavigation"
               class="ghost-mode"
    >
        <template v-slot:prepend>
            <img src="http://placekitten.com/100/100"
                 :alt="$t('generic.name')"
                 height="64"
                 width="64"
            />
        </template>

        <v-app-bar-nav-icon @click="mobileDrawer = !mobileDrawer"></v-app-bar-nav-icon>

        <!-- <v-app-bar-title>{{ $t('generic.name') }}</v-app-bar-title> -->
        <v-spacer></v-spacer>

        <v-list-item
            class="button-parallelogram hover-only"
            min-height="60"
            prepend-icon="mdi-view-dashboard"
            title="Home"
            to="/"
        />

        <v-list-item
            class="v-beta-fix button-parallelogram hover-only"
            min-height="60"
            to="play"
        >
            <v-list-item-avatar class="v-list-item-avatar--start">
                <v-avatar>
                    <font-awesome-icon :icon="['fas', 'vr-cardboard']" />
                </v-avatar>
            </v-list-item-avatar>
            <v-list-item-title>
                Play
            </v-list-item-title>
        </v-list-item>

        <v-list-item
            class="button-parallelogram hover-only"
            min-height="60"
            prepend-icon="mdi-forum"
            title="About"
            to="about"
        />

        <v-list-item
            class="button-parallelogram hover-only"
            min-height="60"
            prepend-icon="mdi-view-dashboard"
            title="Profile"
            to="/profile"
        />

        <v-spacer></v-spacer>

        <InclinedButton type="light" class="bg-primary">
            play
            <font-awesome-icon :icon="['fas', 'vr-cardboard']" />
        </InclinedButton>
    </v-app-bar>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { shyJs, classScroll } from 'guebbit-javascript-library';
import InclinedButton from "@/components/basics/buttons/InclinedButton.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faVrCardboard, faRightToBracket, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
library.add(faVrCardboard, faRightToBracket, faRightFromBracket)

export default defineComponent({
    name: "MainNavigation",

    components: {
        InclinedButton,
        FontAwesomeIcon
    },

    data: () => {
        return {
            mobileDrawer: false
        }
    },

    mounted(){
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        shyJs((this.$refs.mainNavigation as any).$el,{
            threshold: 400
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        classScroll((this.$refs.mainNavigation as any).$el, [{
            class: "ghost-mode",
            scroll: 200,
            remove: true
        }])
    }
});
</script>

<style lang="scss">
.v-toolbar{
    &.ghost-mode{
        background: transparent !important;
        box-shadow: none !important;
    }
}
</style>