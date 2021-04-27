<template>
  <v-container>
    <v-card>
      <v-container>
        <v-row>
          <v-col
            ><h1>{{ resourceId ? $t("edit_resource") + ": " + currentResource.name : $t("create_resource") }}</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col :cols="12" :sm="6">
            <v-text-field :label="$t('name')" v-model="currentResource.name"></v-text-field>
          </v-col>
          <v-col :cols="12" :sm="6">
            <v-select
              multiple
              :label="$t('tags')"
              v-model="currentResource.tags"
              item-text="name"
              item-value="id.value"
              :items="allTags"
              return-object
              clearable
            ></v-select>
          </v-col>
          <v-col :cols="12" :sm="6">
            <v-text-field
              :label="$t('capacity')"
              v-model="currentResource.capacity"
              type="number"
              :rules="[$ruleSet.notNegativeNumber()]"
              :suffix="$t('liters')"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-footer
        ><v-row>
          <v-col>
            <v-btn @click="deleteResource" v-if="resourceId">{{ $t("delete") }}</v-btn></v-col
          >
          <v-col align="right"
            ><v-btn v-if="resourceId" @click="openLog">{{ $t("maintanence_log") }}</v-btn
            ><v-btn class="ml-2" @click="update">{{ $t(resourceId ? "update" : "create") }}</v-btn></v-col
          ></v-row
        ></v-footer
      >
    </v-card>
    <v-footer fixed outlined
      ><v-row>
        <v-col>
          <v-btn @click="back">{{ $t("back") }}</v-btn></v-col
        >
      </v-row></v-footer
    >
  </v-container>
</template>

<script lang="ts">
import api from "@/api/api"
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { WithLoading } from "@/store/modules/appStore"
import { Resource, Tag } from "@/../utils/classes/resources"
import Guid from "@/../utils/classes/common/guid"

@Component
export default class EditResources extends Vue {
  @Prop({ type: String, required: false, default: () => null })
  private resourceId!: string | null

  currentResource: Resource = new Resource()
  allTags: Tag[] = []

  @WithLoading
  async mounted() {
    console.log("mounted", this.resourceId)
    this.allTags = await api.tagApi.getTagsByFilter({})
    if (this.resourceId) {
      this.currentResource = await api.resourceApi.getResource({ resourceId: Guid.fromString(this.resourceId) })
      console.log(this.currentResource)
      // @TODO: Add The Tags
    }
  }

  @WithLoading
  async update() {
    console.log("this.currentResource", this.currentResource)
    await api.resourceApi.updateOrCreateResource({ resource: this.currentResource })
    this.back()
  }

  @WithLoading
  async deleteResource() {
    await api.resourceApi.deleteResource({ resourceId: this.currentResource.id })
    this.back()
  }

  async openLog() {
    this.$router.push({ name: "ManageMaintenanceLog", params: { resourceId: this.currentResource.id.value } })
  }

  async back() {
    this.$router.push({ name: "ResourceList" })
  }
}
</script>
