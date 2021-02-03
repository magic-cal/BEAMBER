<template>
  <div>
    </div> 

</template>

<script lang="ts">
import Vue from "vue";
import { Component, Model } from "vue-property-decorator";
@Component
export default class NavigationMenu extends Vue {
  @Model("input",{type: Boolean, required: true})
  public drawer!: boolean; 
}
</script>
