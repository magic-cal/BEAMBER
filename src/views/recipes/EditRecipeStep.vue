<template>
  <a-page>
    <v-container>
      <v-card class="mt-6">
        <v-container>
          <v-form v-model="valid">
            <v-row>
              <v-col
                ><h1>{{ $t("recipe_step") }}</h1>
              </v-col>
            </v-row>
            <v-row>
              <v-col :cols="12"
                ><h3>{{ $t("step") + ": " }}{{ currentRecipeStep.sequence + 1 }}</h3>
              </v-col>
              <v-col :cols="12" :sm="6">
                <v-text-field :label="$t('name')" v-model="currentRecipeStep.name"></v-text-field>
              </v-col>
              <v-col :cols="12" :sm="6">
                <v-text-field :label="$t('description')" v-model="currentRecipeStep.description"></v-text-field>
              </v-col>
              <v-col :cols="12" :sm="6">
                <v-select
                  :label="$t('resource_type')"
                  v-model="currentRecipeStep.tagId"
                  item-text="name"
                  item-value="id"
                  :items="allTags"
                  clearable
                  :disabled="!!currentRecipeStep.resourceId"
                ></v-select>
              </v-col>
              <v-col :cols="12" :sm="6">
                <v-select
                  :label="$t('specific_resource')"
                  v-model="currentRecipeStep.resourceId"
                  item-text="name"
                  item-value="id"
                  :items="allResources"
                  clearable
                  :disabled="!!currentRecipeStep.tagId"
                ></v-select>
              </v-col>

              <v-col :cols="12" :sm="6">
                <v-text-field
                  :label="$t('duration')"
                  v-model="currentRecipeStep.duration"
                  type="number"
                  :rules="[$ruleSet.notNegativeNumber()]"
                  :suffix="$t('minutes')"
                />
              </v-col>
              <v-col :cols="12" :sm="6">
                <v-text-field
                  :label="$t('required_capacity')"
                  v-model="currentRecipeStep.capacity"
                  type="number"
                  :rules="[$ruleSet.notNegativeNumber()]"
                  :suffix="$t('liters')"
                />
              </v-col>
              <v-col :cols="12" :sm="6">
                <v-select
                  :label="$t('recipe_requirement')"
                  v-model="currentRecipeStep.recipeRequirementId"
                  item-text="name"
                  item-value="id"
                  :items="allRecipes"
                  clearable
                ></v-select>
              </v-col>
              <v-col :cols="12"><v-divider /></v-col>
            </v-row>
          </v-form>
        </v-container>
        <v-footer
          ><v-row>
            <v-col>
              <v-btn @click="deleteRecipeStep" v-if="recipeStepId">{{ $t("delete") }}</v-btn></v-col
            >
            <v-col align="right"
              ><v-btn :disabled="!valid" @click="update">{{ $t(recipeStepId ? "update" : "create") }}</v-btn></v-col
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
  </a-page>
</template>

<script lang="ts">
import Guid from "@/../utils/classes/common/guid"
import { Recipe } from "@/../utils/classes/recipes"
import { RecipeStep } from "@/../utils/classes/recipeSteps"
import api from "@/api/api"
import SortableList from "@/components/SortableList.vue"
import { WithLoading } from "@/store/modules/appStore"
import { Resource, Tag } from "utils/classes/resources"
import Vue from "vue"
import { Drag, DropList } from "vue-easy-dnd"
import { Component, Prop } from "vue-property-decorator"

@Component({ components: { SortableList, DropList, Drag } })
export default class EditRecipeSteps extends Vue {
  @Prop({ type: String, required: false, default: () => null })
  private recipeStepId!: string | null

  @Prop({ type: String, required: false, default: () => null })
  private recipeId!: string | null

  currentRecipeStep: RecipeStep = new RecipeStep()
  allTags: Tag[] = []
  allResources: Resource[] = []
  allRecipes: Recipe[] = []
  recipeStepSteps: RecipeStep[] = []
  valid = true

  @WithLoading
  async mounted() {
    console.log("mounted", this.recipeStepId)
    this.allTags = await api.tagApi.getTagsByFilter({})
    this.allResources = await api.resourceApi.getResourcesByFilter({})
    this.allRecipes = await api.recipeApi.getRecipesByFilter({})

    if (this.recipeStepId) {
      this.currentRecipeStep = await api.recipeStepApi.getRecipeStep({
        recipeStepId: Guid.fromString(this.recipeStepId)
      })

      // @TODO: Add The Tags
    } else {
      this.currentRecipeStep = new RecipeStep()
      this.currentRecipeStep.id = Guid.create()
      if (this.recipeId) {
        this.currentRecipeStep.recipeId = Guid.fromString(this.recipeId)
        const recipeSteps = await api.recipeStepApi.getRecipeStepsByFilter({
          filter: { recipeIds: [Guid.fromString(this.recipeId)] }
        })
        this.currentRecipeStep.sequence =
          recipeSteps.reduce((p, v) => {
            return p > v.sequence ? p : v.sequence
          }, -1) + 1
      }
      console.log("currentStep", this.currentRecipeStep)
    }
    // Remove Current Recipe
    this.allRecipes = this.allRecipes.filter((r) => !r.id.equals(this.currentRecipeStep.recipeId))
  }

  @WithLoading
  async update() {
    console.log("this.currentRecipeStep", this.currentRecipeStep)
    await api.recipeStepApi.updateOrCreateRecipeStep({ recipeStep: this.currentRecipeStep })
    this.back()
  }

  @WithLoading
  async deleteRecipeStep() {
    await api.recipeStepApi.deleteRecipeStep({ recipeStepId: this.currentRecipeStep.id })
    this.back()
  }

  async back() {
    this.$router.push({ name: "EditRecipe", params: { recipeId: this.currentRecipeStep.recipeId.value } })
  }
}
</script>
