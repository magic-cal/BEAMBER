<template>
  <v-container pa-0>
    <v-row>
      <v-col class="mt-6">
        <v-data-table
          disable-pagination
          @click:row="rowClicked"
          :headers="headers"
          :items="recipes"
          item-key="id.toString()"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
    <v-footer fixed
      ><v-row>
        <v-col align="right"><v-btn @click="createNew">Create New</v-btn></v-col></v-row
      ></v-footer
    >
  </v-container>
</template>

<script lang="ts">
import api from "@/api/api"
import { WithLoading } from "@/store/modules/appStore"
import { Recipe } from "@/../utils/classes/recipes"
import Vue from "vue"
import { Component } from "vue-property-decorator"
@Component
export default class ListRecipes extends Vue {
  recipes: Recipe[] = []

  headers = [
    {
      text: "Recipe Name",
      align: "start",
      sortable: true,
      value: "name"
    },
    {
      text: "Recipe Tags",
      align: "start",
      sortable: false,
      value: "readOnly.tagList"
    }
  ]

  rowClicked(rowItem: Recipe) {
    this.$router.push({
      name: "EditRecipe",
      params: { recipeId: rowItem.id.value }
    })
  }

  createNew() {
    this.$router.push({
      name: "EditRecipe"
    })
  }

  @WithLoading
  async created() {
    this.recipes = await api.getRecipes()
    // this.recipes.forEach(recipe => {
    //   // recipe.readOnly = new RecipeReadonly()
    //   // recipe.readOnly.fromTags(recipe.tags)
    // })
  }
}
</script>
