<template>
  <v-app>
    <div id="nav">
      <v-app-bar color="primary accent-4" dense>
        <v-app-bar-nav-icon @click.stop="navigationDraw = !navigationDraw"></v-app-bar-nav-icon>
        <v-toolbar-title>Amber - Vessle Management </v-toolbar-title>
        <!-- <v-icon @click="viewContainers">plus</v-icon> -->
        <v-spacer></v-spacer>
      </v-app-bar>
    </div>
    <navigation-menu v-model="navigationDraw"> </navigation-menu>
    <router-view />
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

  get loading(): boolean {
    return appStore.loading
  }
}
</script>

<style lang="stylus"></style>
