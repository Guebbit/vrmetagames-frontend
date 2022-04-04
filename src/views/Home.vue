<template>
  <div class="bg-cover bg-gray-800" style="background-image:url(public/images/bg/body-bg.webp);">

    <h1>HELOOOOOOOOOOOOOOOOO </h1>

    <HeaderSection/>

    <OffCanvasMobileMenu :class="{'show-mobile-menu' : navOpen}" @togglenav="navOpen = !navOpen" />

    <HeroBanner/>

    <GamingWorld/>

    <!--
    <LiveStream/>
    -->

    <UpcomingMatchesHome/>

    <CounterUp/>

    <PopularGame/>

    <Testimonial/>

    <BlogPost/>

    <ContactBanner :paddingTop="paddingTop"/>

    <Footer/>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import HeaderSection from '@/components/HeaderSection.vue';
import HeroBanner from '@/components/HeroBanner.vue';
import OffCanvasMobileMenu from '@/components/Header/OffCanvasMobileMenu.vue';
import GamingWorld from '@/components/GamingWorld.vue';
import LiveStream from '@/components/LiveStream.vue';
import UpcomingMatchesHome from '@/components/UpcomingMatchesHome.vue';
import CounterUp from '@/components/CounterUp.vue';
import PopularGame from '@/components/Games/PopularGame.vue';
import Testimonial from '@/components/Testimonial.vue';
import BlogPost from '@/components/BlogPost.vue';
import ContactBanner from '@/components/ContactBanner.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  name: "PageHome",

  components: {
    HeaderSection,
    HeroBanner,
    OffCanvasMobileMenu,
    GamingWorld,
    LiveStream,
    UpcomingMatchesHome,
    CounterUp,
    PopularGame,
    Testimonial,
    BlogPost,
    ContactBanner,
    Footer
  },

  data() {
    return {
      navOpen: false,
      paddingTop: "pt-32"
    }
  }
});
</script>
