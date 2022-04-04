<template>
  <div class="bg-cover bg-gray-800" style="background-image:url(public/images/bg/body-bg2.webp);">

    <HeaderSection/>

    <Breadcrumb :BreadcrumbTitle="BreadcrumbTitle" :BreadcrumbSubTitle="BreadcrumbSubTitle"/>

    <AboutUs/>

    <CounterUp/>

    <LiveStream/>

    <GamerTeam/>

    <Testimonial/>

    <ContactBanner :paddingTop="'pt-32'"/>

    <Footer/>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import HeaderSection from '@/components/HeaderSection.vue';
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
      BreadcrumbTitle: "About Us",
      BreadcrumbSubTitle: "About Us",
    }
  },
});
</script>