<template>
  <div class="home">
    <!-- <v-row>
      <v-col align="center">
        <h1>Amber</h1>
      </v-col>
    </v-row> -->
    <v-container>
      <v-row>
        <v-col align="center">
          <v-btn :to="{ name: 'ResourceList' }">ResourceList</v-btn>
        </v-col>
        <v-col align="center">
          <v-btn :to="{ name: 'TagList' }">TagList</v-btn>
        </v-col>
        <!-- <v-col align="center">
          <v-btn>Hi</v-btn>
        </v-col> -->
        <v-col :cols="12">
          <v-row>
            <v-col
              v-for="resource in resourceList"
              :value="resource"
              :key="resource.id.value"
              :cols="12"
              :sm="6"
              :md="4"
            >
              <Container :value="resource" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import api from "@/api/api"
import { Resource, ResourceFilter } from "@/../utils/classes/resources"
import Vue from "vue"
import Component from "vue-class-component"
import Guid from "@/../utils/classes/common/guid"
import Container from "@/components/Container.vue"
import { WithLoading } from "@/store/modules/appStore"

@Component({ components: { Container } })
export default class Home extends Vue {
  resourceList: Resource[] = []

  @WithLoading
  async created() {
    const filter = new ResourceFilter()
    // @TODO: Make this All Vessels but better
    filter.tagIds = [Guid.fromString("10ed5a49-1668-402a-b0b5-b54818a3dec2")]
    this.resourceList = (await api.getResources()).filter(resource => resource.tags.some(tag => tag.name === "Vessel"))
    this.resourceList.forEach(r => (r.maintananceRequired = Math.random() < 0.1))
  }
}
</script>
