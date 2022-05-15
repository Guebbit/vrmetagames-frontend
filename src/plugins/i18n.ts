// TODO MOCK server
// TODO https://vue-i18n.intlify.dev/guide/advanced/lazy.html
import { createI18n } from "vue-i18n";
import it from "@/locales/it.json";

export const i18n = createI18n({
    locale: 'it',
    messages: { it }
})