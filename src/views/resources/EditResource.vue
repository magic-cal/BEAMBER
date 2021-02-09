<template>
  <v-container>
    <v-card class="">
      <v-container>
        <v-row>
          <v-col
            ><h1>{{ resourceId ? "Edit Resource: " + currentResource.name : "Create Resource" }}</h1>
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
          <v-col> <v-btn @click="deleteResource" v-if="resourceId"> Delete </v-btn></v-col>
          <v-col align="right"
            ><v-btn @click="update">{{ resourceId ? "Update" : "Create" }}</v-btn></v-col
          ></v-row
        ></v-footer
      >
    </v-card>
    <v-footer fixed outlined
      ><v-row>
        <v-col> <v-btn @click="back">Back</v-btn></v-col>
      </v-row></v-footer
    >
  </v-container>
</template>

<script lang="ts">
import api from "@/api/api"
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { WithLoading } from "@/store/modules/appStore"
import { Resource } from "@/../utils/classes/resources"
import Guid from "@/../utils/classes/common/guid"

@Component
export default class EditResources extends Vue {
  @Prop({ type: String, required: false, default: () => null })
  private resourceId!: string | null

  currentResource: Resource = new Resource()

  @WithLoading
  async mounted() {
    console.log("mounted", this.resourceId)

    if (this.resourceId) {
      this.currentResource = await api.getResource(Guid.fromString(this.resourceId))
      console.log(this.currentResource)
      // @TODO: Add The Tags
    }
  }

  @WithLoading
  async update() {
    console.log("this.currentResource", this.currentResource)

    await api.updateOrCreateResource(this.currentResource)
  }

  @WithLoading
  async deleteResource() {
    await api.deleteResource(this.currentResource.id)
    this.back()
  }

  async back() {
    this.$router.push({ name: "ResourceList" })
  }
}
</script>
