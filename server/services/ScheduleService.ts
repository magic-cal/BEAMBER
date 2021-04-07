import Guid from "../../utils/classes/common/guid"
import { Lease } from "utils/classes/leases"
import { LeaseController } from "./LeaseService"
import { RecipeController } from "./RecipeService"
import { RecipeStepController } from "./RecipeStepService"
import { AssemblyController } from "./AssemblyService"
import { AssemblyStepController } from "./AssemblyStepService"
import { Body, Controller, Delete, Post, Put, Route, Tags } from "tsoa"
import { RecipeStepFilter } from "../../utils/classes/recipeSteps"

@Tags("Schedule")
@Route("Schedule")
export class ScheduleService extends Controller {
  MAX_DEPTH = 20
  leaseService: LeaseController
  recipeService: RecipeController
  recipeStepService: RecipeStepController
  assemblyService: AssemblyController
  assemblyStepService: AssemblyStepController
  constructor() {
    super()
    this.leaseService = new LeaseController()
    this.recipeService = new RecipeController()
    this.recipeStepService = new RecipeStepController()
    this.assemblyService = new AssemblyController()
    this.assemblyStepService = new AssemblyStepController()
  }

  @Post("recipes")
  async scheduleRecipes(@Body() recipeIds: Guid[]) {
    // implement for one first
    // GUID Implentation faulty
    recipeIds = recipeIds.map((id) => Guid.fromString(id.value))
    const recipeId = recipeIds[0]!
    if (!recipeId.value) {
      return this.setStatus(422)
    }
    console.log(recipeId.toString(), "recipeId")

    // Get all recipeReqirements
    const allRecipeIds = await this.getRecipeStepRequirements(recipeIds)
    console.log(allRecipeIds)
    // this.assemblyService.createFromRecipe(recipeId)

    // After all assemblies have been created
    // const recipeStepFilter = new RecipeStepFilter()
    // recipeStepFilter.recipeIds = [recipeId]
    // const recipeSteps = await this.recipeStepService.getRecipeStepsByFilter()
    // recipeSteps.map((rs) => {
    //   const assemblyStep = new AssemblyStep(Guid.create(), rs.name, rs.description)
    // })
  }

  async getRecipeStepRequirements(recipeIds: Guid[]) {
    // WARNING CAN RUN LOTS
    const recipeStepFilter = new RecipeStepFilter()
    let requiredRecipeIds = Array.from(new Set(recipeIds))
    let depth = 0

    while (requiredRecipeIds.length) {
      depth++
      const newRecipeIds: Guid[] = []
      recipeStepFilter.recipeIds = requiredRecipeIds
      const recipeSteps = await this.recipeStepService.getRecipeStepsByFilter(recipeStepFilter)
      recipeSteps.forEach((rs) => {
        // Add new recipes to list of requirements
        if (rs.recipeRequirementId && !recipeIds.some((rid) => rid.equals(rs.recipeRequirementId!))) {
          newRecipeIds.push(rs.recipeRequirementId)
        }
      })
      requiredRecipeIds = newRecipeIds
      recipeIds = Array.from(new Set([...recipeIds, ...newRecipeIds]))
      if (depth > this.MAX_DEPTH) {
        new Error("Too many recipe step requirements")
      }
    }
    return recipeIds
  }
}
// recipe
// recipeStep
// assembly
// assemblyStep
//
