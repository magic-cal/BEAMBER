<template>
  <v-container>
    <v-card>
      <v-container>
        <v-row>
          <v-col
            ><h1>{{ recipeId ? "Edit Recipe: " + currentRecipe.name : "Create Recipe" }}</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <SortableList></SortableList>
          </v-col>
          <v-col :cols="12" :sm="6">
            <v-text-field label="Name" v-model="currentRecipe.name"></v-text-field>
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

    <v-card class="my-6">
      <v-container>
        <v-row>
          <v-col><h1>Recipe Steps</h1> </v-col>
          <v-col :cols="12"><v-btn>Add Step</v-btn> </v-col>
        </v-row>
        <v-row v-for="i in [1, 2, 3, 4]" :key="i">
          <v-col :cols="12"
            ><h3>Step : {{ i }}</h3>
          </v-col>
          <v-col :cols="12" :sm="6">
            <v-text-field label="Name" v-model="currentRecipe.name"></v-text-field>
          </v-col>
          <v-col :cols="12" :sm="6">
            <v-text-field label="Description" v-model="currentRecipe.name"></v-text-field>
          </v-col>
          <v-col :cols="12" :sm="6">
            <v-select
              multiple
              label="Resource Type"
              v-model="currentRecipe.requirementIds"
              item-text="name"
              item-value="id"
              :items="allResources"
              clearable
            ></v-select>
          </v-col>
          <v-col :cols="12" :sm="6">
            <v-select
              multiple
              label="Specific Resource"
              v-model="currentRecipe.requirementIds"
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
</template>

<script lang="ts">
import api from "@/api/api"
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { WithLoading } from "@/store/modules/appStore"
import { Recipe } from "@/../utils/classes/recipes"
import Guid from "@/../utils/classes/common/guid"
import { Resource, Tag } from "utils/classes/resources"
import SortableList from "@/components/SortableList.vue"
import { component } from "vue/types/umd"

@Component({ components: { SortableList } })
export default class EditRecipes extends Vue {
  @Prop({ type: String, required: false, default: () => null })
  private recipeId!: string | null

  currentRecipe: Recipe = new Recipe()
  allTags: Tag[] = []
  allResources: Resource[] = []
  allRecipes: Recipe[] = []

  @WithLoading
  async mounted() {
    console.log("mounted", this.recipeId)
    this.allTags = await api.getTags()
    this.allResources = await api.getResources()
    if (this.recipeId) {
      // this.currentRecipe = await api.getRecipe(Guid.fromString(this.recipeId))
      console.log(this.currentRecipe)
      // @TODO: Add The Tags
    }
  }

  @WithLoading
  async update() {
    console.log("this.currentRecipe", this.currentRecipe)
    // await api.updateOrCreateRecipe(this.currentRecipe)
    this.currentRecipe.requirementIds.forEach(id => console.log(id, id.equals(id)))

    // this.back()
  }

  @WithLoading
  async deleteRecipe() {
    // await api.deleteRecipe(this.currentRecipe.id)
    this.back()
  }

  async back() {
    this.$router.push({ name: "RecipeList" })
  }
}
</script>
