import axios from "axios"
import { Resource, ResourceFilter, Tag, TagFilter } from "utils/classes/resources"
import { Recipe, RecipeFilter } from "utils/classes/recipes"
import Guid from "utils/classes/common/guid"

const baseUrl = "http://localhost:3000"
const resourceService = "/resources"
const recipeService = "/recipes"
const tagService = "/tags"

export default {
  async getResource(id: Guid): Promise<Resource> {
    const res = await axios.post(`${baseUrl}${resourceService}/get`, {
      id: id
    })
    console.log("getResource", res)
    return res.data as Resource
  },

  async getResources(filter?: ResourceFilter): Promise<Resource[]> {
    const res = await axios.post(`${baseUrl}${resourceService}/get-by`, {
      filter: filter
    })
    console.log("getResources", res)
    return res.data
  },

  async updateOrCreateResource(resource: Resource): Promise<void> {
    const res = await axios.post(`${baseUrl}${resourceService}/update`, {
      resource: resource
    })
    console.log("updateOrCreateResource", res)
    return res.data
  },

  async deleteResource(id: Guid): Promise<void> {
    const res = await axios.post(`${baseUrl}${resourceService}/delete`, {
      id: id
    })
    console.log("deleteResource", res)
  },

  //  TAG SERVICE #####################################################################################

  async getTag(id: Guid): Promise<Tag> {
    const res = await axios.post(`${baseUrl}${tagService}/get`, {
      id: id
    })
    console.log("getTag", res)
    return res.data as Tag
  },

  async getTags(filter?: TagFilter): Promise<Tag[]> {
    const res = await axios.post(`${baseUrl}${tagService}/get-by`, { filter: filter })
    console.log("getTags", res)
    return res.data
  },

  async updateOrCreateTag(tag: Tag): Promise<void> {
    const res = await axios.post(`${baseUrl}${tagService}/update`, {
      tag: tag
    })
    console.log("updateOrCreateTag", res)
    return res.data
  },

  async deleteTag(id: Guid): Promise<void> {
    const res = await axios.post(`${baseUrl}${tagService}/delete`, {
      id: id
    })
    console.log("deleteTag", res)
  },

  //  RECIPE SERVICE #####################################################################################

  async getRecipe(id: Guid): Promise<Recipe> {
    const res = await axios.post(`${baseUrl}${recipeService}/get`, {
      id: id
    })
    console.log("getRecipe", res)
    return res.data as Recipe
  },

  async getRecipes(filter?: RecipeFilter): Promise<Recipe[]> {
    const res = await axios.post(`${baseUrl}${recipeService}/get-by`, { filter: filter })
    console.log("getRecipes", res)
    return res.data
  },

  async updateOrCreateRecipe(recipe: Recipe): Promise<void> {
    const res = await axios.put(`${baseUrl}${recipeService}/update`, {
      recipe: recipe
    })
    console.log("updateOrCreateRecipe", res)
    return res.data
  },

  async deleteRecipe(id: Guid): Promise<void> {
    const res = await axios.delete(`${baseUrl}${recipeService}/delete`, {
      data: {
        id: id
      }
    })
    console.log("deleteRecipe", res)
  }
}
