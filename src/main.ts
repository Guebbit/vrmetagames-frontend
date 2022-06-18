import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { i18n } from "./plugins/i18n"

// CSS
import "vuetify/styles";
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

loadFonts();

createApp(App)
    .use(router)
    .use(store, key)
    .use(vuetify)
    .use(i18n)
    .mount("#app");
