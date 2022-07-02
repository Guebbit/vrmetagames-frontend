import { createVuetify } from "vuetify";
import { themeColors } from  "@/resources/constants";
import '@mdi/font/css/materialdesignicons.css';


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons: {
    // TODO REMOVE
    iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        dark: true,
        colors: {
          ...themeColors
        },
        variables: {}, // BUGFIX: ADD AN EMPTY OBJECT
      },
      light: {
        dark: false,
        colors: {},
        variables: {},
      },
    },
    /*
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
    */
  },
});
