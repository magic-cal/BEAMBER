import { QueryResultRow } from "pg"
import Guid from "./common/guid"

export class ResourceReadonly {
  tagList: string
  constructor() {
    this.tagList = ""
  }
  fromTags(tagList: Tag[]) {
    this.tagList = tagList.map(tag => tag.name).join(", ")
  }
}

export class Resource {
  id: Guid
  name: string
  tags: Tag[]
  readOnly: ResourceReadonly | null = null

  constructor(id: Guid = Guid.createEmpty(), name = "", tags: Tag[] = []) {
    this.id = id
    this.name = name
    this.tags = tags
  }

  fromQueryResultRow(qr: QueryResultRow) {
    console.log("qr.resource_name", qr.resource_name)
    console.log("Guid.fromString(qr.resource_id)", Guid.fromString(qr.resource_id))
    this.id = Guid.fromString(qr.resource_id)

    this.name = qr.resource_name
    this.tags = []
  }
}

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
