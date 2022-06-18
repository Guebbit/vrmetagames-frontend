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
const About = () => import("@/views/About.vue");
const Play = () => import("@/views/Play.vue");
const UserAuthentication = () => import("@/views/User/Authentication.vue");
const UserProfile = () => import("@/views/User/Profile.vue");
const ProductIndex = () => import("@/views/Product/index.vue");
const ProductDetails = () => import("@/views/Product/ProductDetails.vue");
const EcommerceManagement = () => import("@/views/Admin/Product/EcommerceManagament.vue");


import Test from "@/views/Test.vue";

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
        component: Test
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
        component: About
    },

    // ------------ GAMES ------------

    {
        path: "/stations",
        name: "Stations",
        component: ProductIndex
    },
    {
        path: "/games",
        name: "Games",
        component: ProductIndex
    },
    {
        path: "/games/:id",
        name: "GameTarget",
        component: ProductDetails,
        props: true
    },

    {
        path: "/login",
        name: "Login",
        component: UserAuthentication,
    },

    {
        path: "/registration",
        name: "Registration",
        component: UserAuthentication,
        props:{
            registrationMode: true
        }
    },

    // ------------ AUTHENTICATION NEEDED ------------

    // ------------ USER ------------

    {
        path: "/profile",
        name: "Profile",
        component: UserProfile
    },

    {
        path: "/play",
        name: "Play",
        component: Play,
        beforeEnter: [authenticationCheck],
    },

    // ------------ ADMIN ------------

    {
        path: "/admin/ecommerce",
        name: "AdminEcommerceManagement",
        component: EcommerceManagement
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;