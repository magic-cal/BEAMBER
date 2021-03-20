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
        <v-col align="right"
          ><v-btn @click="createNew">{{ $t("create_new") }}</v-btn></v-col
        ></v-row
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
      text: this.$t("recipe_name"),
      align: "start",
      sortable: true,
      value: "name"
    },
    {
      text: this.$t("recipe_description"),
      align: "start",
      sortable: false,
      value: "description"
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
    this.recipes = await api.recipeApi.getRecipesByFilter({})
    // this.recipes.forEach(recipe => {
    //   // recipe.readOnly = new RecipeReadonly()
    //   // recipe.readOnly.fromTags(recipe.tags)
    // })
  }
}
</script>
