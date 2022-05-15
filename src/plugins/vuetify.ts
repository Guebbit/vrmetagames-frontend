import { createVuetify } from "vuetify";
import { themeColors } from  "@/resources/constants";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  /*
  icons: {
    iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  */
  theme: {
    defaultTheme: "default",
    themes: {
      default: {
        dark: true,
        colors: {
          ...themeColors,
          text: "#ffffff",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
        },
        variables: {}, // BUGFIX: ADD AN EMPTY OBJECT
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
