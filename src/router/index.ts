import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "@/views/Home.vue";
const About = () => import("@/views/About.vue");
const ProfileIndex = () => import("@/views/Profile/index.vue");
const ProductIndex = () => import("@/views/Product/index.vue");
const ProductDetails = () => import("@/views/Product/ProductDetails.vue");


import Test from "@/views/Test.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/test",
    name: "Test",
    component: Test,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    component: About,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileIndex,
  },
  {
    path: "/games",
    name: "Games",
    component: ProductIndex,
  },
  {
    path: "/games/:id",
    name: "GameTarget",
    component: ProductDetails,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;