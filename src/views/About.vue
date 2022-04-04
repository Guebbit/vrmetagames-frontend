<template>
  <div class="bg-cover bg-gray-800" style="background-image:url(public/images/bg/body-bg2.webp);">

    <HeaderSection/>

    <OffCanvasMobileMenu :class="{'show-mobile-menu' : navOpen}" @togglenav="navOpen = !navOpen" />

    <Breadcrumb :BreadcrumbTitle="BreadcrumbTitle" :BreadcrumbSubTitle="BreadcrumbSubTitle"/>

    <AboutUs/>

    <CounterUp/>

    <LiveStream/>

    <GamerTeam/>

    <Testimonial/>

    <ContactBanner :paddingTop="paddingTop"/>

    <Footer/>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import HeaderSection from '@/components/HeaderSection.vue';
import OffCanvasMobileMenu from '@/components/Header/OffCanvasMobileMenu.vue';
import LiveStream from '@/components/LiveStream.vue';
import CounterUp from '@/components/CounterUp.vue';
import Testimonial from '@/components/Testimonial.vue';
import BlogPost from '@/components/BlogPost.vue';
import ContactBanner from '@/components/ContactBanner.vue';
import Footer from '@/components/Footer.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import AboutUs from '@/components/AboutUs.vue';
import GamerTeam from '@/components/GamerTeam.vue';

export default defineComponent({
  name: "PageAbout",

  components: {
    HeaderSection,
    OffCanvasMobileMenu,
    LiveStream,
    CounterUp,
    Testimonial,
    BlogPost,
    ContactBanner,
    Footer,
    Breadcrumb,
    AboutUs,
    GamerTeam
  },
  data() {
    return {
      navOpen: false,
      BreadcrumbTitle: "About Us",
      BreadcrumbSubTitle: "About Us",
      paddingTop: "pt-32"
    }
  },
});
</script>