/**
 * Uses the Vue-i18n library: http://kazupon.github.io/vue-i18n/introduction.html#sponsors
 *
 * Translations are stored at: https://docs.google.com/spreadsheets/d/1J5RxYvDZOnI86uSkao-EWSHs0YztjmUodJo8RFUo53w/edit#gid=0
 * and converted into locale json in @/locales using 'npm run translations'
 *
 * This really should be changed to load translations at runtime at some point.
 */

import Vue from "vue"
import VueI18n, { Locale, Path } from "vue-i18n"
// import enMessages from "@/locales/en.json"
import { messages } from "@/locales/messages"

// const messagesLookup = {
//   en: enMessages
// }

Vue.use(VueI18n)

export const languages: string[] = ["en"]

export const i18n = new VueI18n({
  missing: (locale: Locale, key: Path, vm: Vue | null, values: any) => {
    // We don't always want to create tooltip text so default to empty string if not found.
    if (key.endsWith("_hint")) {
      return ""
    }

    return key.replace(/_/g, " ")
  },
  // Prevents warnings in dev build for missing translations
  silentTranslationWarn: true,

  locale: "en",
  fallbackLocale: "en",

  messages: messages
})

// const messages = new Messages(i18n)

// Vue.prototype.$m = messages
// export default messages

// export const useI18n = () => ({
//   $m: messages,
//   $t: (key: VueI18n.Path, values?: VueI18n.Values): VueI18n.TranslateResult => {
//     // passing `i18n.t` would lose the closure/this pointer.
//     return i18n.t(key, values)
//   },
//   i18n
// })
