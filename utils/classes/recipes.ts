// import { QueryResultRow } from "pg"
import Guid from "./common/guid"

// export class RecipeReadonly {
//   tagList: string
//   constructor() {
//     this.tagList = ""
//   }
//   fromTags(tagList: Tag[]) {
//     this.tagList = tagList.map(tag => tag.name).join(", ")
//   }
// }

export class Recipe {
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
    this.id = id
    this.name = name
    this.description = description
    this.requirementIds = requirementIds
    this.readOnly = readOnly
  }

  //   fromQueryResultRow(qr: QueryResultRow) {
  //     console.log("qr.Recipe_name", qr.Recipe_name)
  //     console.log("Guid.fromString(qr.Recipe_id)", Guid.fromString(qr.Recipe_id))
  //     this.id = Guid.fromString(qr.Recipe_id)

  //     this.name = qr.Recipe_name
  //     this.tags = []
  //   }
}

export class RecipeFilter {
  RecipeStepIds: Guid[] = []
  includeDeleted = false
}

// const i = recipe: {
//   id: { value: "91fb0e54-a48a-4d14-84d8-f0e171740406" },
//   name: "string",
//   description: "string",
//   requirementIds: [],
//   readOnly: {
//     startTime: 0,
//     endTime: 0,
//     isAssembly: false,
//     isScheduled: false,
//     isComplete: false
//   }
// }
