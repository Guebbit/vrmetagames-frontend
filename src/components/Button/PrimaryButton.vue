<template>
    <div style="background-image:url(public/images/others/btn-bg.webp);" class="w-230 md:text-2xl md:leading-12 h-73 flex items-center text-white font-bold justify-center font-exo group hover:opacity-80 leading-70 text-xl">
        {{ text }}
        <img class="ml-3 w-5 h-5 group-hover:ml-4 transition-all" src="public/images/icon/arrrow-icon.webp" alt="Arrow Icon">
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    text: {
      type: String,
      required: false
    },
  }
});
</script>