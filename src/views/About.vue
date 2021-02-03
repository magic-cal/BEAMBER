<template>
  <div class="about">
    <h1>About Page</h1>
    <button @click="getResource">getResource</button>
    <template v-for="resource in resources" >
      <div :key="resource.id">
        {{ resource.name }} ||
        <div v-for="tag in resource.tags" :key="tag.id"></div>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import api from "@/api/api.ts"
import Guid from "./../../utils/types/common/guid"
import { Resource } from "utils/types/resources"

// Define the component in class-style
@Component
export default class About extends Vue {
  event = null
  resources: Resource[] = []

  async created() {
    console.log("Created")
    // this.event = await api.getEvents()
    this.getResources()
  }

  async getResource() {
    await api.getResource(Guid.fromString("fc3692b0-30a0-46fe-847f-b277d54cd6fe"))
  }

  async getResources() {
    this.resources = await api.getResources()
  }
}
</script>
