import {
  LeaseApi,
  ResourceApi,
  TagApi,
  RecipeApi,
  RecipeStepApi,
  MaintenanceLogApi,
  AssemblyApi,
  ScheduleApi,
  DataApi,
  AssemblyStepApi,
  Configuration
} from "@/api/index"
import { BusinessHourApi } from "./apis/BusinessHourApi"
import { Middleware, ResponseContext } from "./runtime"

class Api {
  assemblyApi: AssemblyApi
  assemblyStepApi: AssemblyStepApi
  leaseApi: LeaseApi
  maintenanceLogApi: MaintenanceLogApi
  recipeApi: RecipeApi
  recipeStepApi: RecipeStepApi
  resourceApi: ResourceApi
  tagApi: TagApi
  businessHourApi: BusinessHourApi
  scheduleApi: ScheduleApi
  dataApi: DataApi
  constructor() {
    const middleware = []
    middleware.push({
      post: async (context: ResponseContext) => {
        console.log("Middleware", context)
      }
    })
    const config = new Configuration({ middleware: middleware })
    console.log("hiYA", config)

    this.assemblyApi = new AssemblyApi(config)
    this.assemblyStepApi = new AssemblyStepApi(config)
    this.leaseApi = new LeaseApi(config)
    this.maintenanceLogApi = new MaintenanceLogApi(config)
    this.recipeApi = new RecipeApi(config)
    this.recipeStepApi = new RecipeStepApi(config)
    this.resourceApi = new ResourceApi(config)
    this.tagApi = new TagApi(config)
    this.businessHourApi = new BusinessHourApi(config)
    this.scheduleApi = new ScheduleApi(config)
    this.dataApi = new DataApi(config)
  }
}

export default new Api()
