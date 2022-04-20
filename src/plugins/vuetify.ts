// ---- CSS IMPORTS ----
import "@mdi/font/css/materialdesignicons.css"; // TODO remove
// Vuetify
import "vuetify/styles";
// Swiper
import 'swiper/css';

// --------------------

import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons: {
    iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  theme: {
    defaultTheme: "default",
    themes: {
      default: {
        dark: true,
        colors: {
          background: "#212121",
          surface: "#212121",
          primary: "#0086ff",
          'primary-darken-1': "#0078e5",
          'primary-darken-2': "#006bcc",
          'primary-lighten-1': "#1992ff",
          'primary-lighten-2': "#329eff",
          secondary: "#ff8a23",
          'secondary-darken-1': "#e57c1f",
          'secondary-darken-2': "#cc6e1c",
          'secondary-lighten-1': "#ff9538",
          'secondary-lighten-2': "#ffa14e",
          text: "#ffffff",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
        },
        variables: {}, // BUGFIX: ADD AN EMPTY OBJECT
      },
    },
    display: {
      mobileBreakpoint: "md",
      thresholds: {
        xs: 0,
        sm: 340,
        md: 540,
        lg: 800,
        xl: 1280,
      },
    },
  },
});
