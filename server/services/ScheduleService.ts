import Guid from "../../utils/classes/common/guid"
import { EnumLeaseType, Lease } from "../../utils/classes/leases"
import { LeaseController } from "./LeaseService"
import { RecipeController } from "./RecipeService"
import { RecipeStepController } from "./RecipeStepService"
import { AssemblyController } from "./AssemblyService"
import { AssemblyStepController } from "./AssemblyStepService"
import { Body, Controller, Delete, Post, Put, Route, Tags } from "tsoa"
import { RecipeStep, RecipeStepFilter } from "../../utils/classes/recipeSteps"
import { AssemblyStep, AssemblyStepFilter } from "../../utils/classes/assemblySteps"
import { Assembly } from "../../utils/classes/assemblies"

@Tags("Schedule")
@Route("Schedule")
export class ScheduleService extends Controller {
  MAX_DEPTH = 20
  BUFFER_TIME = 5
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
    // @TODO: Fix GUID Implentation -- faulty
    recipeIds = recipeIds.map((id) => Guid.fromString(id.value))
    const recipeId = recipeIds[0]!
    if (!recipeId.value) {
      return this.setStatus(422)
    }
    console.log(recipeId.toString(), "recipeId")

    const assembly = await this.createAssembly(recipeId)

    const assemblyStepFilter = new AssemblyStepFilter()
    assemblyStepFilter.assemblyIds = [assembly.id]
    const assemblySteps = await this.assemblyStepService.getAssemblyStepsByFilter(assemblyStepFilter)
    console.log("Assembly Steps retrived ", assemblySteps)
    let currentTime = new Date()
    await Promise.all(
      assemblySteps.map((as) => {
        currentTime = new Date(currentTime.setMinutes(as.duration + this.BUFFER_TIME))
        return this.addLeaseForAsseblyStep(as, currentTime)
      })
    )
  }

  async addLeaseForAsseblyStep(assemblyStep: AssemblyStep, currentTime = new Date()) {
    console.log("Add Lease ============================", currentTime)
    // @TODO: Temp Function
    const leaseId = Guid.create()
    // @TODO: Remove string - Get from Tags
    const resourceId = assemblyStep.resourceId
      ? assemblyStep.resourceId
      : Guid.fromString("afd96580-fdf6-4065-82b1-e426b30b7f01")
    const lease = new Lease(
      leaseId,
      assemblyStep.name,
      EnumLeaseType.assemblyStep,
      currentTime,
      new Date(currentTime.setMinutes(assemblyStep.duration))
    )
    await this.leaseService.updateOrCreateLease(lease)
  }

  async createAssembly(recipeId: Guid, parentId?: Guid, recursiondepth = 0) {
    recursiondepth++
    if (recursiondepth > this.MAX_DEPTH) {
      this.setStatus(508)
      throw new Error("Recipe Requirement Infinite loop possible")
    }
    const assembly = await this.assemblyService.createFromRecipe(recipeId, parentId)
    // If this is not a child, set it as the parent
    parentId = parentId ? parentId : assembly.id

    await this.createAssemblySteps(assembly, parentId)
    return assembly
  }

  async createAssemblySteps(assembly: Assembly, parentId?: Guid, recursiondepth = 0) {
    let recipeSteps: RecipeStep[] = []
    const recipeStepFilter = new RecipeStepFilter()
    if (assembly.recipeId) {
      recipeStepFilter.recipeIds = assembly.recipeId ? [assembly.recipeId] : []
      recipeSteps = await this.recipeStepService.getRecipeStepsByFilter(recipeStepFilter)
    }
    recipeSteps.forEach(async (rs) => {
      // Add new assemblies for steps to be created
      if (rs.recipeRequirementId) {
        await this.createAssembly(rs.recipeRequirementId, parentId, recursiondepth)
      }
      await this.assemblyStepService.createFromRecipeStep(rs, assembly.id, rs.recipeRequirementId)
    })
  }
}

//     // implement for one first

//     // Get all recipeReqirements
//     const allRecipeIds = await this.getAllRecipeStepRequirements(recipeIds)
//     console.log(allRecipeIds)
//     const createdAssemblies = await this.assemblyService.createFromRecipes(allRecipeIds)

//     // After all assemblies have been created
//     const recipeStepFilter = new RecipeStepFilter()
//     recipeStepFilter.recipeIds = [recipeId]
//     const recipeSteps = await this.recipeStepService.getRecipeStepsByFilter()
//     recipeSteps.map((rs) => {
//       let foundRecipeRequirementId: Guid | undefined = undefined
//       if (rs.recipeRequirementId) {
//         const index = createdAssemblies.findIndex((ca) => ca.recipeId && ca.recipeId.equals(rs.recipeRequirementId!))
//         if (index !== -1) {
//           foundRecipeRequirementId = createdAssemblies[index].id
//           // Remove specific reference to this assembly
//           createdAssemblies.splice(index, 1)
//         }
//       }
//       return new AssemblyStep(Guid.create(), rs.name, rs.description, foundRecipeRequirementId, rs.tagId, rs.)
//     })
//   }

//   async getAllRecipeStepRequirements(recipeIds: Guid[]) {
//     // WARNING CAN RUN LOTS
//     const recipeStepFilter = new RecipeStepFilter()
//     let requiredRecipeIds = recipeIds
//     let recursiondepth = 0

//     while (requiredRecipeIds.length) {
//       recursiondepth++
//       const newRecipeIds: Guid[] = []
//       recipeStepFilter.recipeIds = requiredRecipeIds
//       const recipeSteps = await this.recipeStepService.getRecipeStepsByFilter(recipeStepFilter)
//       recipeSteps.forEach((rs) => {
//         // Add new recipes to list of requirements
//         if (rs.recipeRequirementId) {
//           newRecipeIds.push(rs.recipeRequirementId)
//         }
//       })
//       requiredRecipeIds = newRecipeIds
//       recipeIds.push(...newRecipeIds)
//       if (recursiondepth > this.MAX_DEPTH) {
//         new Error("Too many recipe step requirements, Possible recursive dependency")
//       }
//     }
//     return recipeIds
//   }
// }

// @TODO: Decide if you still need this
// async getAllRecipeStepRequirements(recipeIds: Guid[]) {
//     // WARNING CAN RUN LOTS
//     const recipeStepFilter = new RecipeStepFilter()
//     let requiredRecipeIds = Array.from(new Set(recipeIds))
//     let recursiondepth = 0

//     while (requiredRecipeIds.length) {
//       recursiondepth++
//       const newRecipeIds: Guid[] = []
//       recipeStepFilter.recipeIds = requiredRecipeIds
//       const recipeSteps = await this.recipeStepService.getRecipeStepsByFilter(recipeStepFilter)
//       recipeSteps.forEach((rs) => {
//         // Add new recipes to list of requirements
//         if (rs.recipeRequirementId && !recipeIds.some((rid) => rid.equals(rs.recipeRequirementId!))) {
//           newRecipeIds.push(rs.recipeRequirementId)
//         }
//       })
//       requiredRecipeIds = newRecipeIds
//       recipeIds = Array.from(new Set([...recipeIds, ...newRecipeIds]))
//       if (recursiondepth > this.MAX_DEPTH) {
//         new Error("Too many recipe step requirements")
//       }
//     }
//     return recipeIds
//   }
