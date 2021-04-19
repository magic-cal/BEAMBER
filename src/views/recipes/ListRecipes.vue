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
        <v-col align="right">
          <v-dialog v-model="addRecipeSchefuleDialog" width="500" v-if="recipes.length">
            <template #activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" class="mx-1">
                {{ $t("schedule_recipes") }}
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                {{ $t("schedule_recipes") }}
              </v-card-title>

              <v-card-text>
                <v-row>
                  <v-col :cols="12">
                    <v-select
                      :label="$t('recipe')"
                      v-model="recipeSchedule.recipeIds"
                      item-text="name"
                      item-value="id"
                      :items="recipes"
                      multiple
                      :rules="[$ruleSet.required()]"
                    ></v-select>
                  </v-col>
                  <v-col :cols="12">
                    <a-timestamp
                      :label="$t('start_time')"
                      v-model="recipeSchedule.startTime"
                      clearable
                      :rules="[$ruleSet.dateAfterOrEqual(new Date())]"
                    />
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-btn color="primary" text @click="cancelRecipeShedule">
                  {{ $t("cancel") }}
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="addRecipeSchedule">
                  {{ $t("schedule_recipes") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn @click="createNew" class="mx-1">{{ $t("create_new") }}</v-btn></v-col
        >
      </v-row></v-footer
    >
  </v-container>
</template>

<script lang="ts">
import api from "@/api/api"
import { WithLoading } from "@/store/modules/appStore"
import { Recipe, RecipeSchedule } from "@/../utils/classes/recipes"
import Vue from "vue"
import { Component } from "vue-property-decorator"
import Guid from "@/../utils/classes/common/guid"
@Component
export default class ListRecipes extends Vue {
  recipes: Recipe[] = []
  recipeSchedule: RecipeSchedule = new RecipeSchedule()
  addRecipeSchefuleDialog = false
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

  async addRecipeSchedule() {
    this.addRecipeSchefuleDialog = false
    this.recipeSchedule.startTime = this.recipeSchedule.startTime ? this.recipeSchedule.startTime : new Date()
    await api.scheduleApi.scheduleRecipes({ recipeSchedule: this.recipeSchedule })

    this.$router.push({
      name: "Schedule"
    })
  }

  async cancelRecipeShedule() {
    this.addRecipeSchefuleDialog = false
    this.recipeSchedule = new RecipeSchedule()
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
