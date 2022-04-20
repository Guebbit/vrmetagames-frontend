import { createApp } from "vue";
import { createI18n } from 'vue-i18n'
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
// languages
import it from '@/locales/it';
import en from '@/locales/en';

loadFonts();

// TODO MOCK server
// TODO https://vue-i18n.intlify.dev/guide/advanced/lazy.html
const i18n = createI18n({
    locale: 'it',
    messages: { it, en }
})

createApp(App).use(router).use(store, key).use(vuetify).use(i18n).mount("#app");
