import { ResourceApi } from "@/api/index"
import { TagApi } from "@/api/index"
import { RecipeApi } from "@/api/index"
import { RecipeStepApi } from "@/api/index"
import { MaintenanceLogApi } from "@/api/index"

// Please Sort Alphabetically
class Api {
  resourceApi: ResourceApi
  tagApi: TagApi
  recipeApi: RecipeApi
  recipeStepApi: RecipeStepApi
  maintenanceLogApi: MaintenanceLogApi
  constructor() {
    this.resourceApi = new ResourceApi()
    this.tagApi = new TagApi()
    this.recipeApi = new RecipeApi()
    this.recipeStepApi = new RecipeStepApi()
    this.maintenanceLogApi = new MaintenanceLogApi()
  }
}

export default new Api()
