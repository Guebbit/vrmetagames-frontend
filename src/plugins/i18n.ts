// TODO MOCK server
// TODO https://vue-i18n.intlify.dev/guide/advanced/lazy.html
import { createI18n } from "vue-i18n";
import it from "@/locales/it.json";
import en from "@/locales/en.json";

export const i18n = createI18n({
    locale: navigator.language, // browser language
    fallbackLocale: 'it-IT',
    messages: {
        'it-IT': it,
        'en-US': en,
        'en-GB': en
    }
})