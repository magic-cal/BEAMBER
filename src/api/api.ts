import { ResourceApi } from "@/api/index"
import { TagApi } from "@/api/index"
import { RecipeApi } from "@/api/index"

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
