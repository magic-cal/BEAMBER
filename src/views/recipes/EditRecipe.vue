<template>
  <a-page>
    <v-container>
      <v-card>
        <v-container>
          <v-row>
            <v-col
              ><h1>{{ recipeId ? $t("edit_recipe") + ": " + currentRecipe.name : $t("create_recipe") }}</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col :cols="12" :sm="6">
              <v-text-field :label="$t('name')" v-model="currentRecipe.name"></v-text-field>
            </v-col>
            <v-col :cols="12" :sm="6">
              <v-text-field :label="$t('description')" v-model="currentRecipe.description"></v-text-field>
            </v-col>
            <!-- <v-col :cols="12" :sm="6">
              <v-select
                multiple
                :label="$t('recipe_prerequisites')"
                v-model="currentRecipe.requirementIds"
                item-text="name"
                item-value="id"
                :items="allResources"
                clearable
              ></v-select>
            </v-col> -->
            <v-col :cols="recipeSteps.length > 2 ? 12 : 6" align="center">
              <p>{{ $t("recipe_steps") }}</p>
              <sortable-list
                @edit="editStep"
                @reorder="reorder"
                :items="recipeSteps"
                :text="(i) => i.name"
                :value="(i) => i.id"
                with-edit
                show-index
              ></sortable-list>
              <v-btn @click="addStep"> {{ $t("add_recipe_step") }} <v-icon>mdi-plus</v-icon></v-btn>
            </v-col>
            <!-- @TODO: Recipes May Require a popup for reordering -->
          </v-row>
        </v-container>
        <v-footer
          ><v-row>
            <v-col>
              <v-btn @click="deleteRecipe" v-if="recipeId">{{ $t("delete") }}</v-btn></v-col
            >
            <v-col align="right"
              ><v-btn @click="update">{{ $t(recipeId ? "update" : "create") }}</v-btn></v-col
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
export default class EditRecipes extends Vue {
  @Prop({ type: String, required: false, default: () => null })
  private recipeId!: string | null

  currentRecipe: Recipe = new Recipe()
  allTags: Tag[] = []
  allResources: Resource[] = []
  allRecipes: Recipe[] = []

  recipeSteps: RecipeStep[] = []

  @WithLoading
  async mounted() {
    this.allTags = await api.tagApi.getTagsByFilter({})
    this.allResources = await api.resourceApi.getResourcesByFilter({})
    if (this.recipeId) {
      this.currentRecipe = await api.recipeApi.getRecipe({ recipeId: Guid.fromString(this.recipeId) })
      // @TODO: Add The Tags
    }
    this.recipeSteps = await api.recipeStepApi.getRecipeStepsByFilter({
      filter: { recipeIds: [this.currentRecipe.id] }
    })
    this.recipeSteps.sort((a, b) => a.sequence - b.sequence)
  }

  editStep(stepId: Guid) {
    this.$router.push({
      name: "EditRecipeStep",
      params: { recipeStepId: stepId.value }
    })
  }

  async addStep() {
    if (this.currentRecipe.id.equals(Guid.createEmpty())) {
      this.currentRecipe.id = Guid.create()
    }
    await this.update(false)
    await this.$router.push({
      name: "AddRecipeStep",
      params: { recipeId: this.currentRecipe.id.value }
    })
  }

  @WithLoading
  async reorder() {
    this.recipeSteps.forEach((rs, index) => (rs.sequence = index))
    // @TODO: Make this a BE call to update all steps
    await Promise.all(this.recipeSteps.map((rs) => api.recipeStepApi.updateOrCreateRecipeStep({ recipeStep: rs })))
  }

  @WithLoading
  async update(redirect = true) {
    await api.recipeApi.updateOrCreateRecipe({ recipe: this.currentRecipe })
    if (redirect) {
      this.back()
    }
  }

  @WithLoading
  async deleteRecipe() {
    await api.recipeApi.deleteRecipe({ recipeId: this.currentRecipe.id })
    this.back()
  }

  addRecipeStep() {
    this.recipeSteps.push(new RecipeStep())
  }

  async back() {
    this.$router.push({ name: "RecipeList" })
  }
}
</script>
