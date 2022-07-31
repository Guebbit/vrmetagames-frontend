import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { i18n } from "./plugins/i18n"

// CSS
import "vuetify/styles";
import "leaflet/dist/leaflet.css";
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

// FA icons instead of MDI (2,5 MB of space freed)
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons';

// Include needed icons
library.add(fas)
//
loadFonts();


createApp(App)
    .use(router)
    .use(store, key)
    .use(vuetify)
    .use(i18n)
    // global components
    .component('font-awesome-icon', FontAwesomeIcon)
    // final mount
    .mount("#app");
