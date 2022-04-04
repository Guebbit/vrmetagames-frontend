<template>

  <div class="flex items-center">

    <!-- Button Start -->
    <router-link to="/signup" style="background-image:url(public/images/others/btn-signup.webp);" class="signup-btn transition-all group hidden sm:flex">
      Sign up
      <img class="w-4 h-4 ml-2 group-hover:ml-3 transition-all" src="public/images/icon/arrrow-icon2.webp" alt="Arrow Icon">
    </router-link>
    <!-- Button End -->

    <!-- Offcanvas Button Start -->
    <div class="lg:hidden block">
      <button class="icofont-navigation-menu text-white text-4xl ml-9" @click="mobiletoggleClass('addClass', 'show-mobile-menu')"></button>
    </div>
    <!-- Offcanvas Button End -->

  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    // offcanvas mobile-menu
    mobiletoggleClass(addRemoveClass :string, className :string) {
      const el = document.querySelector('#offcanvas-menu')!;
      if (addRemoveClass === 'addClass') {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
  },
});
</script>