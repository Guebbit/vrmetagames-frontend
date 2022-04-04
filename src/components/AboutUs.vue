<template>
  <!-- About Section Start -->
  <div class="container flex items-center space-x-4 flex-col lg:flex-row">
    <div class="w-full lg:w-1/2 mb-10 lg:mb-0">
      <div class="sm:mr-12 mr-0 text-center relative">
        <img src="public/images/others/about-thumb.webp" alt="">
        <!--
        <CoolLightBox
            :items="items"
            :index="index"
            @close="index = null">
        </CoolLightBox>
        -->
        <div v-for="(item, imageIndex) in items" :key="imageIndex">
          <div @click="index = imageIndex" class="absolute bottom-0 right-0 md:right-32 lg:right-0 cursor-pointer h-120 w-120 bg-primary rounded-full flex justify-center items-center z-30 before:content-[''] before:h-120 before:w-120 before:bg-primary before:opacity-50 before:rounded-full before:absolute before:z-20 before:transition-all hover:before:h-32 hover:before:w-32">
            <i class="icofont-ui-play z-40 text-white"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-1/2">
      <div class="about_title lg:mb-6 mb-4">
        <h5 class="text-primary text-xl uppercase font-bold pl-24 lg:mb-6 mb-4 relative before:absolute before:content-[''] before:left-0 before:top-1/2 before:-translate-y-1/2 before:transform before:h-1 before:bg-primary before:w-16">About Bonx Studio</h5>
        <h2 class="text-white font-exo font-bold uppercase xl:text-title lg:text-5xl md:text-4xl sm:text-3xl text-2xl xl:leading-70 lg:leading-12 leading-10 max-w-sm md:max-w-xl lg:max-w-2xl"> bonx is the best gaming studio for all gamer. </h2>
      </div>
      <div class="about_desc mb-10">
        <p>It is a long established fact that a reader will be distracted the readable content of page when looking at it layout the point using lorem Ipsum is that it has a more-or-less normal distribution.</p>
        <p>It is a long established fact that a reader will be distracted the readable content of page when looking at it layout the point using lorem Ipsum is that it has a more-or-less normal distribution.</p>
      </div>
      <div class="about_btn">
        <PrimaryButton
            text = "Play Now"
        />
      </div>
    </div>
  </div>
  <!-- About Section End -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import CoolLightBox from 'vue-cool-lightbox';
// import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
import PrimaryButton from '@/components/Button/PrimaryButton.vue';

export default defineComponent({
  components: {
    PrimaryButton
    // CoolLightBox
  },
  data(){
    return {
      btnName: "Play Now",
      items: [
        {
          src: "https://www.youtube.com/watch?v=eS9Qm4AOOBY"
        }
      ],
      index: null
    }
  }
});
</script>