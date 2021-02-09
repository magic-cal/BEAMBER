import { QueryResultRow } from "pg"
import Guid from "./common/guid"

export class Resource {
  id: Guid
  name: string
  tags: Tag[]

  constructor(id = Guid.createEmpty(), name = "", tags = []) {
    this.id = id
    this.name = name
    this.tags = tags
  }

  fromQueryResultRow(qr: QueryResultRow) {
    console.log("qr.resource_name", qr.resource_name)
    console.log("Guid.fromString(qr.resource_id)", Guid.fromString(qr.resource_id))
    this.id = Guid.fromString(qr.resource_id)

    this.name = qr.resource_name
    this.tags = [] //@TODO: IMPL Tags
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
