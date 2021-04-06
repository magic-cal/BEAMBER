import { LeaseApi, ResourceApi, TagApi, RecipeApi, RecipeStepApi, MaintenanceLogApi, AssemblyApi } from "@/api/index"

// Please Sort Alphabetically
class Api {
  assemblyApi: AssemblyApi
  leaseApi: LeaseApi
  maintenanceLogApi: MaintenanceLogApi
  recipeApi: RecipeApi
  recipeStepApi: RecipeStepApi
  resourceApi: ResourceApi
  tagApi: TagApi
  constructor() {
    this.assemblyApi = new AssemblyApi()
    this.leaseApi = new LeaseApi()
    this.maintenanceLogApi = new MaintenanceLogApi()
    this.recipeApi = new RecipeApi()
    this.recipeStepApi = new RecipeStepApi()
    this.resourceApi = new ResourceApi()
    this.tagApi = new TagApi()
  }
}

export default new Api()
