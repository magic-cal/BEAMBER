import Guid from "../../utils/classes/common/guid"
import { Lease } from "../../utils/classes/leases"
import { Body, Controller, Post, Route, Tags } from "tsoa"
import { Recipe } from "../../utils/classes/recipes"
import { RecipeStep } from "../../utils/classes/recipeSteps"
import { AssemblyStepController } from "./AssemblyStepService"
import { LeaseController } from "./LeaseService"
import { RecipeController } from "./RecipeService"
import { RecipeStepController } from "./RecipeStepService"
import { AssemblyController } from "./AssemblyService"

export interface RecipeBreakdownSteps {
  name?: string
  description?: string
  duration?: number
}

export interface RecipeBreakdown {
  name?: string
  description?: string
  breakdownSteps: RecipeBreakdownSteps[]
}

@Tags("Data")
@Route("Data")
export class DataService extends Controller {
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

  async loadTestData() {
    await this.leaseService.addLease(new Lease(Guid.create(), "Test 1", undefined, undefined, undefined, undefined))
  }

  @Post("clear-assemblies")
  async clearAssemblies() {
    // @TODO: Remove me
    const leaseData = await this.leaseService.getLeasesByFilter()
    const assemblyData = await this.assemblyService.getAssembliesByFilter()
    const assemblyStepData = await this.assemblyStepService.getAssemblyStepsByFilter()

    await Promise.all(leaseData.map((lease) => this.leaseService.deleteLease(lease.id)))
    await Promise.all(assemblyData.map((assembly) => this.assemblyService.deleteAssembly(assembly.id)))
    await Promise.all(
      assemblyStepData.map((assemblyStep) => this.assemblyStepService.deleteAssemblyStep(assemblyStep.id))
    )

    return true
  }

  @Post("create-recipes")
  async createRecipesFromSteps(@Body() recipeBreakdown: RecipeBreakdown) {
    const recipeId = Guid.create()
    const recipe = new Recipe(recipeId, recipeBreakdown.name)
    await this.recipeService.updateOrCreateRecipe(recipe)

    const stepPromises = recipeBreakdown.breakdownSteps.map(async (rsb, index) => {
      const recipeStep = new RecipeStep(
        Guid.create(),
        rsb.name,
        rsb.description,
        undefined,
        undefined,
        recipeId,
        undefined,
        rsb.duration,
        undefined,
        undefined,
        index
      )
      return this.recipeStepService.updateOrCreateRecipeStep(recipeStep)
    })
    await Promise.all(stepPromises)
  }
}
