import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import vuetify from "@/plugins/vuetify"
import "@/plugins/validation"
import "@mdi/font/css/materialdesignicons.css" // Ensure you are using css-loader
import APage from "@/components/APage.vue"
import ADate from "@/components/ADate.vue"
import ATime from "@/components/ATime.vue"
import ADatePicker from "@/components/ADatePicker.vue"
import ATimestamp from "@/components/ATimestamp.vue"
import { i18n } from "@/plugins/i18n"
import appStore from "./store/modules/appStore"
//
Vue.config.productionTip = false
Vue.component("APage", APage)
Vue.component("ATime", ATime)
Vue.component("ADatePicker", ADatePicker)
Vue.component("ADate", ADate)
Vue.component("ATimestamp", ATimestamp)
Vue.config.errorHandler = (error, _, info) => {
  console.log({ error })
  console.log({ info })
}

new Vue({
  router,
  vuetify,
  i18n,
  render: (h) => h(App),
  errorCaptured: (e: any, v: Vue, info: string) => {
    console.log({ e })
    console.log({ info })
    appStore.setError(e.statusText)
  }
}).$mount("#app")

// Vue.use(vuetify);
