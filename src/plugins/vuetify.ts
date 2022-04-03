// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    theme: {
        defaultTheme: "default",
        themes: {
            default: {
                dark: true,
                colors: {
                    background: "#212121",
                    surface: "#212121",
                    primary: "#0086ff",
                    secondary: "#ff7b00",
                    error: "#B00020",
                    info: "#2196F3",
                    success: "#4CAF50",
                    warning: "#FB8C00",
                },
                variables: {}, // BUGFIX: ADD AN EMPTY OBJECT
            },
        },
    },
});
