<template>
  <!-- Header Section Start -->
  <header class="fixed left-0 right-0 z-99" :class="{'is-sticky': isSticky}">
    <div class="container">
      <div class="flex py-3 items-center justify-between">

        <HeaderLogo/>

        <MainMenu/>

        <PrimaryButton
            text = "Sign up"
        />

      </div>
    </div>
  </header>
  <!-- Header Section End -->
</template>

<script lang="ts">
import { defineComponent } from "vue";

import HeaderLogo from '@/components/Header/HeaderLogo.vue';
import MainMenu from '@/components/Header/MainMenu.vue';
import PrimaryButton from '@/components/Button/PrimaryButton.vue';

export default defineComponent({
  components: {
    HeaderLogo,
    MainMenu,
    PrimaryButton
  },

  data() {
    return {
      isSticky: false,
    }
  },

  mounted(){
    window.addEventListener('scroll', () => {
      let scrollPos = window.scrollY
      if(scrollPos >= 100){
        this.isSticky = true
      } else {
        this.isSticky = false
      }
    })
  },
});
</script>