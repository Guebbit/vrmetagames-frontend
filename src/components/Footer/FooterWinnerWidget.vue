<template>
  <div class=" mr-8">
    <FooterWidgetTitle :title="title"/>

    <div class="grid grid-cols-3 sm:grid-cols-3 gap-3">
      <router-link v-for="(match, index) in matches" :key="index" to="/player">
        <img :src="`${match.gamingBg}`" :alt="match.gamingAlt">
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import FooterWidgetTitle from '@/components/Footer/FooterWidgetTitle.vue';

export default defineComponent({
  components: {
    FooterWidgetTitle,
  },
  data() {
    return {
      title: "today’s winners",
      matches: [
        {
          gamingBg: "public/images/others/winners1.webp",
          gamingAlt: "Winner"
        },
        {
          gamingBg: "public/images/others/winners2.webp",
          gamingAlt: "Winner"
        },
        {
          gamingBg: "public/images/others/winners3.webp",
          gamingAlt: "Winner"
        },
        {
          gamingBg: "public/images/others/winners4.webp",
          gamingAlt: "Winner"
        },
        {
          gamingBg: "public/images/others/winners5.webp",
          gamingAlt: "Winner"
        },
        {
          gamingBg: "public/images/others/winners6.webp",
          gamingAlt: "Winner"
        }
      ]
    }
  },
});
</script>