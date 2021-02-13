<template>
  <v-navigation-drawer v-model="drawer" absolute temporary @input="$emit('input', $event)">
    <v-list nav dense>
      <v-list-item-group>
        <template v-for="menuItem in navigationMenuItems">
          <v-list-item :key="menuItem.name" :to="{ name: menuItem.pathName }" exact>
            <v-list-item-icon>
              <v-icon>{{ menuItem.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Model } from "vue-property-decorator"
import { navigationItems } from "@/router/navigation.ts"
@Component
export default class NavigationMenu extends Vue {
  @Model("input", { type: Boolean, required: true })
  public drawer!: boolean

  navigationMenuItems = navigationItems
}
</script>
