<template>
  <a-page>
    <v-container>
      <!-- <v-card> -->
      <v-container>
        <v-row>
          <v-col>
            <v-data-table
              disable-pagination
              :headers="headers"
              :items="maintenenceLogs"
              item-key="id.toString()"
              class="elevation-1"
            ></v-data-table></v-col
        ></v-row>
      </v-container>

      <!-- </v-card> -->

      <v-footer fixed outlined
        ><v-row>
          <v-col>
            <v-btn @click="back">{{ $t("back") }}</v-btn></v-col
          >
        </v-row></v-footer
      >
    </v-container>
  </a-page>
</template>

<script lang="ts">
import Guid from "@/../utils/classes/common/guid"
import { Recipe } from "@/../utils/classes/recipes"
import { RecipeStep } from "@/../utils/classes/recipeStep"
import { MaintenanceLog } from "@/api"
import api from "@/api/api"
import SortableList from "@/components/SortableList.vue"
import { WithLoading } from "@/store/modules/appStore"
import { Resource, Tag } from "utils/classes/resources"
import Vue from "vue"
import { Drag, DropList } from "vue-easy-dnd"
import { Component, Prop } from "vue-property-decorator"

@Component({ components: { SortableList, DropList, Drag } })
export default class ManageMaintenanceLog extends Vue {
  @Prop({ type: String, required: false, default: () => null })
  private resourceId!: string | null
  allResources: Resource[] = []
  maintenenceLogs: MaintenanceLog[] = []

  @WithLoading
  async mounted() {
    console.log("mounted", this.resourceId)

    this.allResources = await api.resourceApi.getResourcesByFilter({})
    if (this.resourceId) {
      this.maintenenceLogs = await api.maintenanceLogApi.getMaintenanceLogsByFilter({
        filter: { resourceIds: [Guid.fromString(this.resourceId)] }
      })
    }
  }

  headers = [
    {
      text: this.$t("log_date"),
      align: "start",
      sortable: true,
      value: "timestamp"
    },
    {
      text: this.$t("log_type"),
      align: "start",
      sortable: true,
      value: "type"
    },
    {
      text: this.$t("log_details"),
      align: "start",
      sortable: false,
      value: "details"
    }
  ]

  editStep(stepId: Guid) {
    console.log("stepId", stepId)
    this.$router.push({
      name: "EditRecipeStep",
      params: { recipeStepId: stepId.value }
    })
  }

  addStep() {
    this.$router.push({
      name: "AddRecipeStep"
      // params: { recipeId: this.currentRecipe.id.value }
    })
  }

  @WithLoading
  async reorder() {
    // this.recipeSteps.forEach((rs, index) => (rs.sequence = index))
    // @TODO: Make this a BE call to update all steps
    // await Promise.all(this.recipeSteps.map((rs) => api.recipeStepApi.updateOrCreateRecipeStep({ recipeStep: rs })))
  }

  @WithLoading
  async update() {
    // console.log("this.currentRecipe", this.currentRecipe)
    // await api.recipeApi.updateOrCreateRecipe({ recipe: this.currentRecipe })
    this.back()
  }

  @WithLoading
  async deleteRecipe() {
    // await api.recipeApi.deleteRecipe({ recipeId: this.currentRecipe.id })
    this.back()
  }

  addRecipeStep() {
    // this.recipeSteps.push(new RecipeStep())
  }

  async back() {
    this.$router.push({ name: "RecipeList" })
  }
}
</script>
