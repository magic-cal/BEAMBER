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
            <v-col :cols="12" :sm="6">
              <v-select
                multiple
                :label="$t('recipe_prerequisites')"
                v-model="currentRecipe.requirementIds"
                item-text="name"
                item-value="id"
                :items="allResources"
                clearable
              ></v-select>
            </v-col>
            <v-col :cols="recipeSteps.length > 2 ? 12 : 6">
              <sortable-list :items="recipeSteps" :text="(i) => i.name" :value="(i) => i.id"></sortable-list>
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

      <v-card class="mt-6">
        <v-container>
          <v-row>
            <v-col
              ><h1>{{ $t("recipe_steps") }}</h1>
              <p>***Just Stubs***</p></v-col
            >
            <v-col :cols="12"
              ><v-btn @click.prevent.stop="addRecipeStep">{{ $t("add_step") }}</v-btn>
            </v-col>
          </v-row>
          <v-row v-for="(recipeStep, key) in recipeSteps" :key="recipeStep.id.value">
            <v-col :cols="12"
              ><h3>{{ $t("step") + ": " }}{{ key + 1 }}</h3>
            </v-col>
            <v-col :cols="12" :sm="6">
              <v-text-field :label="$t('name')" v-model="recipeStep.name"></v-text-field>
            </v-col>
            <v-col :cols="12" :sm="6">
              <v-text-field :label="$t('description')" v-model="recipeStep.description"></v-text-field>
            </v-col>
            <v-col :cols="12" :sm="6">
              <v-select
                :label="$t('resource_type')"
                v-model="recipeStep.tagId"
                item-text="name"
                item-value="id"
                :items="allTags"
                clearable
                :disabled="!!recipeStep.requirementIds"
              ></v-select>
            </v-col>
            <v-col :cols="12" :sm="6">
              <v-select
                :label="$t('specific_resource')"
                v-model="recipeStep.requirementIds"
                item-text="name"
                item-value="id"
                :items="allResources"
                clearable
                :disabled="!!recipeStep.tagId"
              ></v-select>
            </v-col>
            <v-col :cols="12"><v-divider /></v-col>
          </v-row>
        </v-container>
        <v-footer
          ><v-row>
            <v-col>
              <v-btn disabled @click="deleteRecipe" v-if="recipeId">{{ $t("delete") }}</v-btn></v-col
            >
            <v-col align="right"
              ><v-btn disabled @click="update">{{ $t(recipeId ? "update" : "create") }}</v-btn></v-col
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
import api from "@/api/api"
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { WithLoading } from "@/store/modules/appStore"
import { Recipe, RecipeStep } from "@/../utils/classes/recipes"
import Guid from "@/../utils/classes/common/guid"
import { Resource, Tag } from "utils/classes/resources"
import SortableList from "@/components/SortableList.vue"
import { Drag, DropList } from "vue-easy-dnd"

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
