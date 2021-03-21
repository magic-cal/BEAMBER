import { RuleSet } from "@/plugins/validation"

// 1. Make sure to import 'vue' before declaring augmented types
import Vue from "vue"
import { RawLocation, Route } from "vue-router"

/**
 * vue/types/vue.d.ts

 * Instance properties e.g.
 * var vm = new Vue()
 * console.log(vm.$ruleSet) // This should compile successfully
 */
declare module "vue/types/vue" {
  interface Vue {
    $ruleSet: RuleSet
  }
}

/**
 * vue/types/vue.d.ts
 *
 * Global properties e.g.
 * console.log(Vue.$myGlobal) // This should compile successfully
 */
/*
declare module 'vue/types/vue' {
  // Global properties can be declared
  // on the `VueConstructor` interface
  interface VueConstructor {
  }
}
*/

/**
 * vue/types/options.d.ts
 *
 * Global properties e.g.
 * var vm = new Vue({
 *   myOption: 'Hello'
 * })
 */
/*
declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
  }
}
*/

declare module "vue-router/types/router" {
  interface VueRouter {
    backWithFallback(): Promise<Route | void>
    backWithFallback(location: RawLocation): Promise<Route | void>
  }
}
