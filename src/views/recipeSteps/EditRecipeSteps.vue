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
          <v-col :cols="12" :sm="6">
            <v-text-field :label="$t('name')" v-model="currentRecipe.name"></v-text-field>
          </v-col>
          <v-col :cols="12" :sm="6">
            <v-select
              :label="$t('Resource Requirement Type')"
              v-model="currentRecipe.resourceType"
              item-text="name"
              item-value="id.value"
              :items="allTags"
              return-object
              clearable
            ></v-select>
          </v-col>
          <v-col :cols="12" :sm="6">
            <v-select
              :label="$t('Specific Resource Requirement')"
              v-model="currentRecipe.resourceRequirement"
              item-text="name"
              item-value="id.value"
              :items="allResources"
              clearable
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
      <v-footer
        ><v-row>
          <v-col>
            <v-btn @click="deleteRecipe" v-if="recipeId">{{ $t("delete") }}</v-btn></v-col
          >
          <v-col align="right"
            ><v-btn @click="update">{{ recipeId ? "Update" : "Create" }}</v-btn></v-col
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
import { Recipe } from "@/../utils/classes/recipes"
import { Resource, Tag } from "utils/classes/resources"

@Component
export default class EditRecipes extends Vue {
  @Prop({ type: String, required: false, default: () => null })
  private recipeId!: string | null

  currentRecipe: Recipe = new Recipe()
  allTags: Tag[] = []
  allResources: Resource[] = []

  @WithLoading
  async mounted() {
    console.log("mounted", this.recipeId)
    this.allTags = await api.tagApi.getTagsByFilter({})
    this.allResources = await api.resourceApi.getResourcesByFilter({})
    if (this.recipeId) {
      // this.currentRecipe = await api.RecipeService.getRecipe({recipeId: Guid.fromString(this.recipeId)})
      console.log(this.currentRecipe)
      // @TODO: Add The Tags
    }
  }

  @WithLoading
  async update() {
    console.log("this.currentRecipe", this.currentRecipe)
    // await api.updateOrCreateRecipe(this.currentRecipe)
    this.back()
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
