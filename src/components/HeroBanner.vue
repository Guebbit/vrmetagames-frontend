<template>
  <!-- Hero Banner Start -->
  <div class="flex items-center relative bg-no-repeat bg-scroll bg-center bg-cover 2xl:h-940 xl:h-820 lg:h-780 md:h-650 sm:h-620 h-620 lg:mb-32 md:mb-20 mb-15" style="background-image:url(public/images/bg/hero-bg1.webp);">
    <div class="container">
      <div class="relative 2xl:pt-20 lg:pt-16 md:pt-10 sm:pt-8 pt-8 md:mb-12 z-10 flex flex-col justify-center items-center lg:items-start lg:text-left text-center">

        <h1 class="text-white font-metal uppercase font-normal 2xl:text-7.5xl xl:text-8xl lg:text-5.5xl md:text-7xl text-5xl tracking-wide xl:mb-10 lg:mb-8 mb-5 text-shadow">Best Game <br> Playing Today.</h1>
        <p class="text-white font-semibold font-exo lg:mb-10 md:mb-6 text-base lg:text-2xl mb-5">Simply text of the printing and typesetting industry.</p>

        <PrimaryButton/>

      </div>
    </div>
    <div class="absolute bottom-0 xl:right-14 lg:right-5 right-0 left-0 lg:left-auto text-center flex justify-center">
      <img class="2xl:w-940 xl:w-780 lg:w-650 md:w-620 w-450 md:text-center" src="public/images/bg/hero-position-img.webp" alt="Position BG">
    </div>
  </div>
  <!-- Hero Banner End -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PrimaryButton from '@/components/Button/PrimaryButton.vue';

export default defineComponent({
  components: {
    PrimaryButton
  }
});
</script>