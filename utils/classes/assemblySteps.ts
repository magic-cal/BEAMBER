import { AmberApiFields } from "./amberApiFields"
import Guid from "./common/guid"

/**
  @example {
  "id": {
    "value": "d01ac8d3-b823-4f8d-9643-06c6b6d8fb13"
  },
  "name": "Name",
  "description": "Description",
  "assemblyRequirementId": {
    "value": "93000dfb-11a7-4be4-91c0-57140564243c"
  },
  "tagId": {
    "value": "de1df70b-0794-4328-8118-c3462b694e67"
  },
  "assemblyId": {
    "value": "8df24173-85fa-415c-ba66-668f65c05822"
  },
  "resourceId": {
    "value": "a9f0cb6a-e804-4782-bbed-b271619c4eff"
  },
  "duration": 0,
  "capacity": 0
  }
 */
export class AssemblyStep extends AmberApiFields {
  id: Guid
  name: string
  description: string
  assemblyId: Guid
  assemblyRequirementId?: Guid
  tagId?: Guid
  resourceId?: Guid
  duration: number
  capacity: number
  sequence: number
  complete: boolean

  constructor(
    id = Guid.createEmpty(),
    name = "",
    description = "",
    assemblyRequirementId?: Guid,
    tagId?: Guid,
    assemblyId = Guid.createEmpty(),
    resourceId?: Guid,
    duration = 0,
    capacity = 0,
    sequence = 0,
    complete = false
  ) {
    super()
    this.id = id
    this.name = name
    this.description = description
    this.assemblyRequirementId = assemblyRequirementId
    this.tagId = tagId
    this.assemblyId = assemblyId
    this.resourceId = resourceId
    this.duration = duration
    this.capacity = capacity
    this.sequence = sequence
    this.complete = complete
  }
}
/**
  @example {
  "AssemblyIds": [],
  "includeDeleted": false
}
 */
export class AssemblyStepFilter {
  assemblyIds: Guid[] = []
  includeDeleted = false
}
