<template>
  <v-container pa-0>
    <v-row>
      <v-col
        ><h1>Edit Resource resouceId:</h1>
        {{ resourceId }}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field label="Name" v-model="currentResource.name"></v-text-field>
      </v-col>
      <v-col>
        <v-select
          multiple
          label="Tags"
          v-model="currentResource.tags"
          :items="[
            { text: 'DPV', value: 1 },
            { text: 'Container', value: 2 }
          ]"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import api from "@/api/api"
import Guid from "@/../utils/types/common/guid"
import { Resource } from "@/../utils/types/resources"
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
@Component
export default class ViewContainers extends Vue {
  @Prop({ type: String, required: false, default: () => null })
  private resourceId!: string | null

  currentResource: Resource = {} as Resource

  async mounted() {
    console.log("mounted", this.resourceId)

    if (this.resourceId) {
      this.currentResource = await api.getResource(Guid.fromString(this.resourceId))
      console.log(this.currentResource)
      // @TODO: Add The Tags
    }
  }
}
</script>
