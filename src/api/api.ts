import {
  LeaseApi,
  ResourceApi,
  TagApi,
  RecipeApi,
  RecipeStepApi,
  MaintenanceLogApi,
  AssemblyApi,
  ScheduleApi,
  DataApi
} from "@/api/index"
import { BusinessHourApi } from "./apis/BusinessHourApi"

class Api {
  assemblyApi: AssemblyApi
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
    this.assemblyApi = new AssemblyApi()
    this.leaseApi = new LeaseApi()
    this.maintenanceLogApi = new MaintenanceLogApi()
    this.recipeApi = new RecipeApi()
    this.recipeStepApi = new RecipeStepApi()
    this.resourceApi = new ResourceApi()
    this.tagApi = new TagApi()
    this.businessHourApi = new BusinessHourApi()
    this.scheduleApi = new ScheduleApi()
    this.dataApi = new DataApi()
  }
}

export default new Api()
