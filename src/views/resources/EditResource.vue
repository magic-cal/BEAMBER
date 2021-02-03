<template>
  <v-container>
    <v-card class="">
      <v-container>
        <v-row>
          <v-col
            ><h1>{{ resourceId ? "Edit Resource resouceId:" : "Create Resource" }}</h1>
            {{ resourceId }}
          </v-col>
        </v-row>
        <v-row>
          <v-col :cols="12" :sm="6">
            <v-text-field label="Name" v-model="currentResource.name"></v-text-field>
          </v-col>
          <v-col :cols="12" :sm="6">
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
      <v-footer
        ><v-row>
          <v-col align="right"
            ><v-btn @click="save">{{ resourceId ? "Update" : "Create" }}</v-btn></v-col
          ></v-row
        ></v-footer
      >
    </v-card>
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

  save() {
    api.saveResource(this.currentResource)
  }
}
</script>
