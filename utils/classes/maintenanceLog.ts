import { LocalDate } from "@js-joda/core"
import { AmberApiFields } from "./amberApiFields"
import Guid from "./common/guid"

/**
  @example 
{"id" : {"value": "0a0796d0-92a2-46c2-bd51-4fc8b63b7b0f" },
"resourceId": {"value": "e96861e5-0123-4bd3-98c3-3f3ece24349c"},
"type" : "",
"details": "",
"timestamp": 0
}
 */
export class MaintenanceLog extends AmberApiFields {
  id: Guid
  resourceId: Guid
  type: string
  details: string
  timestamp: string

  constructor(
    id = Guid.createEmpty(),
    resourceId = Guid.createEmpty(),
    type = "",
    details = "",
    timestamp = LocalDate.now().toString()
  ) {
    super()
    this.id = id
    this.resourceId = resourceId
    this.type = type
    this.details = details
    this.timestamp = timestamp
  }
}

export class MaintenanceLogFilter {
  maintenanceLogStepIds: Guid[] = []
  resourceIds: Guid[] = []
  includeDeleted = false
}

// {"id" : {"value": "0a0796d0-92a2-46c2-bd51-4fc8b63b7b0f" },
// "resourceId": {"value": "e96861e5-0123-4bd3-98c3-3f3ece24349c"},
// "type" : "",
// "details": "",
// "timestamp": 0
// }
