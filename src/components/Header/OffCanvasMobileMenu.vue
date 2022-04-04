<template>
  <div class="popup-mobile-menu popup-mobile-visiable" id="offcanvas-menu">
    <div class="mobile-menu-overlay" @click="mobiletoggleClass('removeClass', 'show-mobile-menu')"></div>
    <div class="bg-white w-300 h-full left-0 top-0 absolute text-left transition-all py-8 px-5 overflow-y-scroll">
      <div class="flex justify-between pb-8">

        <!-- Button Start -->
        <router-link to="/signup" style="background-image:url(public/images/others/btn-signup.webp);" class="signup-btn transition-all group">
          Sign up
          <img class="w-4 h-4 ml-2 group-hover:ml-3 transition-all" src="public/images/icon/arrrow-icon2.webp" alt="Arrow Icon">
        </router-link>
        <!-- Button End -->

        <button class="icofont-close-line z-999 font-bold text-3xl text-black hover:text-primary transition-all transform hover:rotate-90" @click="mobiletoggleClass('removeClass', 'show-mobile-menu')"></button>
      </div>
      <div class="menu-content">
        <MobileNavigation />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MobileNavigation from '@/components/Header/MobileNavigation.vue';

export default defineComponent({
  components: {
    MobileNavigation
  },

  methods: {
    // offcanvas menu close
    mobiletoggleClass(addRemoveClass :string, className :string) {
      const el = document.querySelector('#offcanvas-menu')!;
      if (addRemoveClass === 'addClass') {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    }
  }
});
</script>