<template>
  <APage>
    <v-container>
      <v-card>
        <v-container>
          <v-row>
            <v-col
              ><h1>{{ recipeId ? "Edit Recipe: " + currentRecipe.name : "Create Recipe" }}</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col :cols="12" :sm="6">
              <v-text-field label="Name" v-model="currentRecipe.name"></v-text-field>
            </v-col>
            <v-col :cols="12" :sm="6">
              <v-text-field label="Description" v-model="currentRecipe.description"></v-text-field>
            </v-col>
            <v-col>
              <sortable-list :items="recipeSteps" :text="i => i.name" :value="i => i.id"></sortable-list>
            </v-col>
            <!-- @TODO: Recipes May Require a popup for reordering -->
            <v-col :cols="12" :sm="6">
              <v-select
                multiple
                label="Recipe Prerequisites"
                v-model="currentRecipe.requirementIds"
                item-text="name"
                item-value="id"
                :items="allResources"
                clearable
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <v-footer
          ><v-row>
            <v-col> <v-btn @click="deleteRecipe" v-if="recipeId"> Delete </v-btn></v-col>
            <v-col align="right"
              ><v-btn @click="update">{{ recipeId ? "Update" : "Create" }}</v-btn></v-col
            ></v-row
          ></v-footer
        >
      </v-card>

      <v-card class="mt-6">
        <v-container>
          <v-row>
            <v-col><h1>Recipe Steps</h1> </v-col>
            <v-col :cols="12"><v-btn @click.prevent.stop="addRecipeStep">Add Step</v-btn> </v-col>
          </v-row>
          <v-row v-for="(recipeStep, key) in recipeSteps" :key="recipeStep.id.value">
            <v-col :cols="12"
              ><h3>Step : {{ key }}</h3>
            </v-col>
            <v-col :cols="12" :sm="6">
              <v-text-field label="Name" v-model="recipeStep.name"></v-text-field>
            </v-col>
            <v-col :cols="12" :sm="6">
              <v-text-field label="Description" v-model="recipeStep.description"></v-text-field>
            </v-col>
            <v-col :cols="12" :sm="6">
              <v-select
                multiple
                label="Resource Type"
                v-model="recipeStep.tagId"
                item-text="name"
                item-value="id"
                :items="allTags"
                clearable
              ></v-select>
            </v-col>
            <v-col :cols="12" :sm="6">
              <v-select
                multiple
                label="Specific Resource"
                v-model="recipeStep.requirementIds"
                item-text="name"
                item-value="id"
                :items="allResources"
                clearable
              ></v-select>
            </v-col>
            <v-col :cols="12"><v-divider /></v-col>
          </v-row>
        </v-container>
        <v-footer
          ><v-row>
            <v-col> <v-btn @click="deleteRecipe" v-if="recipeId"> Delete </v-btn></v-col>
            <v-col align="right"
              ><v-btn @click="update">{{ recipeId ? "Update" : "Create" }}</v-btn></v-col
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
  </APage>
</template>

<script lang="ts">
import api from "@/api/api"
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { WithLoading } from "@/store/modules/appStore"
import { Recipe, RecipeStep } from "@/../utils/classes/recipes"
import Guid from "@/../utils/classes/common/guid"
import { Resource, Tag } from "utils/classes/resources"
import SortableList from "@/components/SortableList.vue"
import { Drag, DropList, InsertEvent } from "vue-easy-dnd"

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
    console.log("mounted", this.recipeId)
    this.allTags = await api.getTags()
    this.allResources = await api.getResources()
    if (this.recipeId) {
      this.currentRecipe = await api.getRecipe(Guid.fromString(this.recipeId))
      console.log(this.currentRecipe)
      // @TODO: Add The Tags
    }

    //@TODO: Remove Temp Assignment
    const rs1 = new RecipeStep(
      Guid.create(),
      "Load Hops",
      "Add 1KG of Hops to the Fermenter",
      this.currentRecipe.id,
      Guid.fromString("ce6d8ee2-dbd9-4007-a609-82a39d7c0747")
    )
    const rs2 = new RecipeStep(
      Guid.create(),
      "Stir Hops with water",
      "Mix water and hops for 20 mins",
      this.currentRecipe.id,
      Guid.fromString("ce6d8ee2-dbd9-4007-a609-82a39d7c0747")
    )
    this.recipeSteps.push(...[rs1, rs2])
  }

  @WithLoading
  async update() {
    console.log("this.currentRecipe", this.currentRecipe)
    await api.updateOrCreateRecipe(this.currentRecipe)
    // this.currentRecipe.requirementIds.forEach(id => console.log(id, id.equals(id)))

    // this.back()
  }

  @WithLoading
  async deleteRecipe() {
    await api.deleteRecipe(this.currentRecipe.id)
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
