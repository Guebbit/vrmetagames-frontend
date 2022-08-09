import { store } from "@/store";

import {
    createRouter,
    createWebHistory
} from "vue-router";

import type {
    RouteRecordRaw,
    NavigationGuardNext,
    RouteLocationNormalized,
} from "vue-router";

import Home from "@/views/Home.vue";
const Test = () => import("@/views/Test.vue");
const WorkInProgress = () => import("@/views/WorkInProgress.vue");
const Play = () => import("@/views/Play.vue");
const PlayAdvanced = () => import("@/views/PlayAdvanced.vue");
const UserAuthentication = () => import("@/views/User/Authentication.vue");
const UserProfile = () => import("@/views/User/Profile.vue");
const CheckoutPage = () => import("@/views/Checkout.vue");
const ProductIndex = () => import("@/views/Product/index.vue");
const ProductDetails = () => import("@/views/Product/ProductDetails.vue");
const EcommerceManagement = () => import("@/views/Admin/Product/EcommerceManagament.vue");
const PathNotFound = () => import("@/views/PathNotFound.vue");



async function authenticationCheck(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    if(!store.getters['user/isAuthenticated']){
        next('login');
        return;
    }
    next();
}

// TODO 404, 500, etc
export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/test",
        name: "Test",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
        component: Test,
        beforeEnter: [authenticationCheck],
    },

    {
        path: "/about",
        name: "About",
        redirect: {
            name: 'AboutUs'
        }
    },
    {
        path: "/about/us",
        name: "AboutUs",
        component: WorkInProgress
    },
    {
        path: "/about/vr",
        name: "AboutVr",
        component: WorkInProgress
    },
    {
        path: "/contact-us",
        name: "Contacts",
        component: WorkInProgress
    },
    {
        path: "/regolamento",
        name: "Rules",
        component: WorkInProgress
    },

    // ------------ GAMES ------------

    {
        path: "/stations",
        name: "Stations",
        // component: StationIndex
        component: WorkInProgress
    },
    {
        path: "/stations/:id",
        name: "StationTarget",
        // component: StationDetails
        component: WorkInProgress,
        props: true
    },
    {
        path: "/games",
        name: "Games",
        component: ProductIndex
    },
    {
        // https://www.virtual-room.com/en/mission/time-travel-chapter-1/
        path: "/games/:id",
        name: "GameTarget",
        component: ProductDetails,
        props: true
    },

    {
        path: "/signin",
        name: "Login",
        component: UserAuthentication,
        props:{
            mode: 'login'
        }
    },

    {
        path: "/signin/retrieve-password",
        name: "PasswordRetrieve",
        component: UserAuthentication,
        props:{
            mode: 'password-retrieve'
        }
    },

    {
        path: "/signup",
        name: "Registration",
        component: UserAuthentication,
        props:{
            mode: 'registration'
        }
    },

    // ------------ Ecommerce ------------

    {
        path: "/cart",
        name: "Cart",
        redirect: {
            name: 'Checkout'
        }
    },


    {
        path: "/checkout",
        name: "Checkout",
        component: CheckoutPage,
        beforeEnter: [authenticationCheck],
    },

    // ------------ USER ------------

    {
        path: "/profile",
        name: "Profile",
        component: UserProfile,
        beforeEnter: [authenticationCheck],
    },

    {
        path: "/play",
        name: "Play",
        component: Play,
        props: true
    },

    {
        path: "/play",
        name: "Play",
        component: Play,
        props: true
    },

    {
        path: "/play/advanced",
        name: "PlayAdvanced",
        component: PlayAdvanced,
        beforeEnter: [authenticationCheck],
        props: true
    },

    // ------------ ADMIN ------------

    {
        path: "/admin/ecommerce",
        name: "AdminEcommerceManagement",
        component: EcommerceManagement,
        beforeEnter: [authenticationCheck],
    },

    // ------------ ERRORS ------------

    {
        path: "/:pathMatch(.*)*",
        name: "PathNotFound",
        component: PathNotFound
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;