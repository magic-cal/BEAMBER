import { ResourceApi } from "@/api1/index"
import { TagApi } from "@/api1/index"
import { RecipeApi } from "@/api1/index"

// Please Sort Alphabetically
class Api {
  resourceApi: ResourceApi
  tagApi: TagApi
  recipeApi: RecipeApi
  constructor() {
    this.resourceApi = new ResourceApi()
    this.tagApi = new TagApi()
    this.recipeApi = new RecipeApi()
  }
}

export default new Api()
