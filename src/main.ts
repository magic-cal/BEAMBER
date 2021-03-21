import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import vuetify from "@/plugins/vuetify"
import "@/plugins/validation"
import "@mdi/font/css/materialdesignicons.css" // Ensure you are using css-loader
import APage from "@/components/APage.vue"
import { i18n } from "@/plugins/i18n"
//
Vue.config.productionTip = false
Vue.component("APage", APage)

new Vue({
  router,
  vuetify,
  i18n,
  render: (h) => h(App)
}).$mount("#app")

// Vue.use(vuetify);
