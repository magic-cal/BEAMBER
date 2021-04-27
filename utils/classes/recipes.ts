import Guid from "./common/guid"
import { AmberApiFields } from "./amberApiFields"

export class Recipe extends AmberApiFields {
  id: Guid
  name: string
  description: string
  requirementIds: Guid[] // List of Assembly or Recipe Requirements
  readOnly: null | {
    //Values that will be updated in the backend and not user editable
    startTime: number // DateTime // Calculated from recipeStops and start end times
    endTime: number //DateTime // Calculated from recipeStops and start end times
    isAssembly: boolean //Flag Is Assembly or Recipe
    isScheduled: boolean //Flag for planned or temporary assignment
    isComplete: boolean //Flag are all steps and requirements complete
  }

  constructor(
    id: Guid = Guid.createEmpty(),
    name = "",
    description = "",
    requirementIds: Guid[] = [],
    readOnly = null
  ) {
    super()
    this.id = id
    this.name = name
    this.description = description
    this.requirementIds = requirementIds
    this.readOnly = readOnly
  }
}

export class RecipeFilter {
  RecipeStepIds: Guid[] = []
  includeDeleted = false
}

export class RecipeSchedule {
  /** @minItems 1 At least one recipe is required */
  recipeIds: Guid[] = []
  startTime?: Date
  contstructor(recipeIds = []) {
    this.recipeIds = recipeIds
  }
}
