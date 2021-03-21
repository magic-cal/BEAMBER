import Guid from "./common/guid"

/**
  @example {
  "id": {
    "value": "9641905c-8a4b-11eb-8dcd-0242ac130003"
  },
  "name": "Name",
  "description": "Description",
  "recipeRequirementId": {
    "value": "964192e6-8a4b-11eb-8dcd-0242ac130003"
  },
  "tagId": {
    "value": "964193e0-8a4b-11eb-8dcd-0242ac130003"
  },
  "recipeId": {
    "value": "964194bc-8a4b-11eb-8dcd-0242ac130003"
  },
  "resourceId": {
    "value": "9641958e-8a4b-11eb-8dcd-0242ac130003"
  },
  "duration": 0,
  "capacity": 0,
  "start": 0
  }
 */
export class RecipeStep {
  id: Guid
  name: string
  description: string
  recipeRequirementId: Guid
  tagId: Guid
  recipeId: Guid
  resourceId: Guid
  duration: number
  capacity: number
  start: number

  constructor(
    id: Guid = Guid.createEmpty(),
    name = "",
    description = "",
    recipeRequirementId: Guid = Guid.createEmpty(),
    tagId: Guid = Guid.createEmpty(),
    recipeId: Guid = Guid.createEmpty(),
    resourceId: Guid = Guid.createEmpty(),
    duration = 0,
    capacity = 0,
    start = 0
  ) {
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
  }
}
/**
  @example {
  "RecipeIds": [],
  "includeDeleted": false
}
 */
export class RecipeStepFilter {
  RecipeIds: Guid[] = []
  includeDeleted = false
}
