<template>
  <v-app class="overflow-hidden">
    <div id="nav">
      <v-app-bar color="primary accent-4" src="@/assets/beer.jpg">
        <v-app-bar-nav-icon @click.stop="navigationDraw = !navigationDraw"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <div @click="goHome">
            {{ $t("amber") + " - " + $t("vessel_management") }}
          </div>
        </v-toolbar-title>
        <!-- <v-icon @click="viewContainers">md-plus</v-icon> -->
        <v-spacer></v-spacer>
        <v-btn icon @click="goHome">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-app-bar>
    </div>
    <navigation-menu v-model="navigationDraw"> </navigation-menu>
    <transition name="fade" mode="out-in">
      <router-view id="scrolling-techniques" />
    </transition>
    <loader v-model="loading" />
  </v-app>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator"
import NavigationMenu from "@/components/NavigationMenu.vue"
import Vue from "vue"
import appStore from "@/store/modules/appStore"
import Loader from "@/components/dialogs/loader.vue"
// import router from "vue-router";

@Component({ components: { NavigationMenu, Loader } })
export default class App extends Vue {
  navigationDraw = false

  async viewContainers() {
    await this.$router.push("/viewContainers")
  }

  async goHome() {
    await this.$router.push({ name: "Home" })
  }

  get loading(): boolean {
    return appStore.loading
  }
}
</script>

<style lang="sass">
.fade-enter-active, .fade-leave-active
  transition: opacity .3s

.fade-enter, .fade-leave-to
  opacity: 0


.bounce-enter-active
  animation: bounce-in .4s

.bounce-leave-active
  animation: bounce-in .4s reverse

@keyframes bounce-in
  0%
    transform: translateX(0px)
    opacity: 0

  100%
    transform: translateX(10px)
    opacity: 100
</style>
