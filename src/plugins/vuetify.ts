// src/plugins/vuetify.js

import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#d48e00",

        // Custom
        brand01: "#002E5D",
        brand01Hover: "#003F7F",
        brand01Clicked: "#002E5D",
        brand02: "#5596e6",
        brand02Hover: "#73a8ea",
        brand02Clicked: "#3784e2",
        brand03: "#ffbb32",
        brand03Hover: "#ffc654",
        brand03Clicked: "#ffb010",
        brand04: "#B27700",
        brand04Hover: "#d48e00",
        brand04Clicked: "#906000",

        background01: "#fff",
        background02: "#F4F7FB",
        background03: "#FBF8ED",
        background04: "#FAFAF9",

        borders: "#E2E2E2",

        text01: "#505457",
        text02: "#73777A",
        text03: "#AAAAAA",
        linkText: "#195AAA",

        errorLight: "#FFB6B2",
        warningLight: "#FFFAE9",
        infoLight: "#87C1DD",
        successLight: "#B9DFC9",

        errorMedium: "#C5352C",
        warningMedium: "#FFB800",
        infoMedium: "#003A56",
        successMedium: "#006E00",

        switch: "#27AE60",
      },
    },
  },
});

export default vuetify;
