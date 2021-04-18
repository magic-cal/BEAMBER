import { AmberApiFields } from "./amberApiFields"
import Guid from "./common/guid"

/**
  @example {
  "id": {
    "value": "d01ac8d3-b823-4f8d-9643-06c6b6d8fb13"
  },
  "name": "Name",
  "description": "Description",
  "recipeRequirementId": {
    "value": "93000dfb-11a7-4be4-91c0-57140564243c"
  },
  "tagId": {
    "value": "de1df70b-0794-4328-8118-c3462b694e67"
  },
  "recipeId": {
    "value": "8df24173-85fa-415c-ba66-668f65c05822"
  },
  "resourceId": {
    "value": "a9f0cb6a-e804-4782-bbed-b271619c4eff"
  },
  "duration": 0,
  "capacity": 0,
  "start": 0,
  "versionNo": 1,
  "sequence": 0
  }
 */
export class RecipeStep extends AmberApiFields {
  id: Guid
  name: string
  description: string
  recipeRequirementId?: Guid
  tagId?: Guid
  recipeId: Guid
  resourceId?: Guid
  /**
   * @minimum 0 Minimum duration cannot be negative
   * @isInt
   */
  duration: number
  /**
   * @minimum 0 Minimum capacity cannot be negative
   * @isInt
   */
  capacity: number
  /**
   * @minimum 0 Minimum start cannot be negative
   * @isInt
   */
  start: number
  sequence: number

  constructor(
    id = Guid.createEmpty(),
    name = "",
    description = "",
    recipeRequirementId = undefined,
    tagId = undefined,
    recipeId = Guid.createEmpty(),
    resourceId = undefined,
    duration = 0,
    capacity = 0,
    start = 0,
    sequence = 0
  ) {
    super()
    this.id = id
    this.name = name
    this.description = description
    this.recipeRequirementId = recipeRequirementId
    this.tagId = tagId
    this.recipeId = recipeId
    this.resourceId = resourceId
    this.duration = duration
    this.capacity = capacity
    this.start = start
    this.sequence = sequence
  }
}
/**
  @example {
  "RecipeIds": [],
  "includeDeleted": false
}
 */
export class RecipeStepFilter {
  recipeIds: Guid[] = []
  includeDeleted = false
}
