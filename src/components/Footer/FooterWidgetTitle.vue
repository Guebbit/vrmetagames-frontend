<template>
  <div class="xl:mb-14 sm:mb-8 mb-6">
    <h3 class="xl:text-2xl text-xl text-white uppercase font-bold leading-8">{{ title }}</h3>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: ['title']
});
</script>