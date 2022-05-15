import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "@/views/Home.vue";

const About = () => import("@/views/About.vue");
const Play = () => import("@/views/Play.vue");
const ProfileRegistration = () => import("@/views/User/Registration.vue");
const ProfilePage = () => import("@/views/User/Profile.vue");
const ProductIndex = () => import("@/views/Product/index.vue");
const ProductDetails = () => import("@/views/Product/ProductDetails.vue");
const EcommerceManagement = () => import("@/views/Admin/Product/EcommerceManagament.vue");


import Test from "@/views/Test.vue";

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
        path: "/play",
        name: "Play",
        component: Play
    },
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

    // ------------ USER ------------

    /* TODO redirect a Home ma con "open login modal"
    {
      path: "/login",
      name: "Login",
    },
    */
    {
        path: "/registration",
        name: "Registration",
        component: ProfileRegistration
    },
    {
        path: "/profile",
        name: "Profile",
        component: ProfilePage
    },

    // ------------ GAMES ------------

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