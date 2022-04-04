<template>
  <div class="bg-cover bg-gray-800" style="background-image:url(public/images/bg/body-bg.webp);">

    <HeaderSection/>

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

    <ContactBanner :paddingTop="'pt-32'"/>

    <Footer/>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import HeaderSection from '@/components/HeaderSection.vue';
import HeroBanner from '@/components/HeroBanner.vue';import GamingWorld from '@/components/GamingWorld.vue';
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
    // OffCanvasMobileMenu,
    GamingWorld,
    LiveStream,
    UpcomingMatchesHome,
    CounterUp,
    PopularGame,
    Testimonial,
    BlogPost,
    ContactBanner,
    Footer
  }
});
</script>
