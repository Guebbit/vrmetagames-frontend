<template>
    <v-navigation-drawer
        id="main-navigation-drawer"
        v-model="mobileDrawer"
        temporary
    >
        <v-list>
            <v-list-item
                min-height="100"
                :prepend-avatar="user.avatar"
                :title="user.username"
                :subtitle="user.email"
            />
        </v-list>

        <v-divider />

        <v-list nav density="compact">
            <!-- TODO hover-only? -->
            <v-list-item
                v-for="menu in menuList"
                v-show="menu.authentication == null || (menu.authentication && isAuthenticated || !menu.authentication && !isAuthenticated)"
                :key="'desktop-navigation-' + menu.label"
                class="button-parallelogram"
                :class="menu.class"
                min-height="60"
                :to="menu.route"
            >
                <v-list-item-avatar class="v-list-item-avatar--start">
                    <v-avatar>
                        <font-awesome-icon :icon="menu.icon" />
                    </v-avatar>
                </v-list-item-avatar>
                <v-list-item-title>
                    {{ menu.label }}
                </v-list-item-title>
            </v-list-item>
        </v-list>


        <template v-slot:prepend>
            <v-btn
                v-show="!isAuthenticated"
                block
                class="display-flex justify-space-between"
                size="x-large"
                @click="toggleModal(['login', true])"
            >
                Login
                <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
            </v-btn>
            <v-divider v-show="!isAuthenticated" />
        </template>
        <template v-slot:append>
            <v-divider v-show="isAuthenticated" />
            <v-btn
                v-show="isAuthenticated"
                block
                class="display-flex justify-space-between"
                size="x-large"
                @click="userLogout"
            >
                Logout
                <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
            </v-btn>
        </template>

    </v-navigation-drawer>
    <v-app-bar ref="mainNavigation"
               id="main-navigation-bar"
               class="ghost-mode"
    >
        <template v-slot:prepend>
            <img src="http://placekitten.com/100/100"
                 :alt="$t('generic.name')"
                 height="64"
                 width="64"
            />
        </template>
        <template v-slot:append>

            <InclinedButton
                v-show="!isAuthenticated"
                type="light"
                class="bg-secondary login-button"
                @click="toggleModal(['login', true])"
            >
                Login
                <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
            </InclinedButton>
            <InclinedButton
                v-show="$route.name !== 'Play'"
                type="light"
                class="bg-primary play-button"
                :to="{ name: 'Play' }"
            >
                Play
                <font-awesome-icon :icon="['fas', 'play']" />
            </InclinedButton>

            <v-btn
                class="button-toggle-drawer"
                variant="outlined"
                size="large"
                color="secondary"
                icon
                @click="mobileDrawer = !mobileDrawer"
            >
                <font-awesome-icon :icon="['fas', 'bars']" />
            </v-btn>
        </template>

        <v-list-item
            v-for="menu in menuList"
            v-show="menu.authentication == null || (menu.authentication && isAuthenticated || !menu.authentication && !isAuthenticated)"
            :key="'desktop-navigation-' + menu.label"
            class="button-parallelogram hover-only"
            :class="menu.class"
            min-height="60"
            :to="menu.route"
        >
            <v-list-item-avatar class="v-list-item-avatar--start">
                <v-avatar>
                    <font-awesome-icon :icon="menu.icon" />
                </v-avatar>
            </v-list-item-avatar>
            <v-list-item-title>
                {{ menu.label }}
            </v-list-item-title>
        </v-list-item>
    </v-app-bar>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { shyJs, classScroll } from 'guebbit-javascript-library';
import InclinedButton from "@/components/basics/buttons/InclinedButton.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faPlay, faHouse, faShop, faGamepad, faVrCardboard, faRightToBracket, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
library.add(faBars, faPlay, faHouse, faShop, faGamepad, faVrCardboard, faRightToBracket, faRightFromBracket)

export default defineComponent({
    name: "Header",

    components: {
        InclinedButton,
        FontAwesomeIcon
    },

    data: () => {
        return {
            mobileDrawer: false,
            menuList: [
                {
                    label: 'Home',
                    route: { name: 'Home' },
                    icon: ['fas', 'house'],
                },
                {
                    label: 'About',
                    route: { path: 'About' },
                    icon: ['fas', 'shop'],
                },
                {
                    label: 'Games',
                    route: { name: 'Games' },
                    icon: ['fas', 'gamepad'],
                },
                {
                    label: 'Stations',
                    route: { name: 'Stations' },
                    icon: ['fas', 'vr-cardboard'],
                },
                {
                    label: 'Profile',
                    route: { name: 'Profile' },
                    icon: ['fas', 'vr-cardboard'],
                    authentication: true
                },
            ],
        };
    },

    computed: {
        ...mapState({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            user: ({ user: { userInfo } }: any) => userInfo,
        }),
        ...mapGetters("user", [
            "isAuthenticated"
        ]),
    },

    methods: {
        ...mapMutations("main", [
            "toggleModal"
        ]),
        ...mapActions("user", [
            "userLogout"
        ]),
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
@import 'src/assets/scss/main/global';

#main-navigation-bar{
    &.ghost-mode{
        background: transparent !important;
        box-shadow: none !important;
    }

    .inclined-button{
        margin-top: 0;
        margin-bottom: 0;
    }

    .button-toggle-drawer{
        margin-inline-end: 0;
    }

    .v-toolbar__prepend,
    .v-toolbar__append {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @include media-desktop() {
        .button-toggle-drawer{
            display: none;
        }
    }
    @include media-mobile() {
        // mobile ghost mode
        background: transparent !important;
        box-shadow: none !important;
        .login-button,
        .v-list-item{
            display: none;
        }
    }
}

#main-navigation-drawer{
    //
}
</style>