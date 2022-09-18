import { createVuetify } from "vuetify";
import { themeColors } from  "@/resources/constants";
import { aliases, fa } from 'vuetify/iconsets/fa-svg';

// TODO find a way https://stackoverflow.com/questions/72246949/vuetify-3-custom-icon-sets
// import { aliases, custom } from './vuetify-custom-set'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  icons: {
    defaultSet: 'fa',
    aliases: {
      ...aliases,
      checkboxOff: 'square'
    },
    sets: {
      fa,
    },
  },
  // TODO find a way
  /*
  icons: {
    defaultSet: 'custom',
    aliases,
    sets: {
      custom,
    },
  },
  */

  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        dark: true,
        colors: {
          ...themeColors
        },
        variables: {
          // ['disabled-opacity']: 0.7 
        }, // BUGFIX: ADD AN EMPTY OBJECT
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
