import { QueryResultRow } from "pg"
import Guid from "./common/guid"

export class ResourceReadonly {
  tagList: string
  constructor() {
    this.tagList = ""
  }
  fromTags(tagList: Tag[]) {
    this.tagList = tagList.map((tag) => tag.name).join(", ")
  }
}

export class Resource {
  id: Guid
  name: string
  tags: Tag[]
  readOnly: ResourceReadonly | null = null
  capacity: number
  currentStep: Guid | null
  maintananceRequired: boolean
  active: boolean

  constructor(
    id: Guid = Guid.createEmpty(),
    name = "",
    tags: Tag[] = [],
    capacity = 100,
    currentStep = null,
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
  }

  fromQueryResultRow(qr: QueryResultRow) {
    console.log("qr.resource_name", qr.resource_name)
    console.log("Guid.fromString(qr.resource_id)", Guid.fromString(qr.resource_id))
    this.id = Guid.fromString(qr.resource_id)

    this.name = qr.resource_name
    this.tags = []
  }
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
