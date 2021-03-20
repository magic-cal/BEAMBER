import { QueryResultRow } from "pg"
import Guid from "./common/guid"

export function fromTags(tagList: Tag[]) {
  return tagList.map((tag) => tag.name).join(", ")
}

export class ResourceReadonly {
  tagList: string
  constructor(tags?: Tag[]) {
    this.tagList = fromTags(tags || [])
  }
}

export class Resource {
  id: Guid
  name: string
  tags: Tag[]
  readOnly: ResourceReadonly
  capacity: number
  currentStep: Guid
  maintananceRequired: boolean
  active: boolean

  constructor(
    id: Guid = Guid.createEmpty(),
    name = "",
    tags: Tag[] = [],
    capacity = 100,
    currentStep = Guid.createEmpty(),
    maintananceRequired = false,
    active = false
  ) {
    this.id = id
    this.name = name
    this.tags = tags
    this.capacity = capacity
    this.currentStep = currentStep
    this.maintananceRequired = maintananceRequired
    this.active = active
    this.readOnly = new ResourceReadonly()
  }

  // fromQueryResultRow(qr: QueryResultRow) {
  //   console.log("qr.resource_name", qr.resource_name)
  //   console.log("Guid.fromString(qr.resource_id)", Guid.fromString(qr.resource_id))
  //   this.id = Guid.fromString(qr.resource_id)

  //   this.name = qr.resource_name
  //   this.tags = []
  // }
}
/**
  @example {
   "id": {
     "value": "0a0796d0-92a2-46c2-bd51-4fc8b63b7b0a"
   },
   "name": "Kettle",
   "description": "Kettle Tag"
  }
 */
export class Tag {
  id: Guid
  name: string
  description: string

  constructor(id: Guid = Guid.createEmpty(), name = "", description = "") {
    this.id = id
    this.name = name
    this.description = description
  }
}

export class TagFilter {
  resourceIds: Guid[] = []
  includeDeleted = false
}

export class ResourceFilter {
  tagIds: Guid[] = []
  includeDeleted = false
}
