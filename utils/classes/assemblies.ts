import Guid from "./common/guid"
import { AmberApiFields } from "./amberApiFields"

// assembly_id uuid NOT NULL DEFAULT gen_random_uuid(),
// assembly_name character varying COLLATE pg_catalog."default",
// assembly_description character varying COLLATE pg_catalog."default",
// assembly_complete boolean,
// assembly_parent_id uuid,
// recipe_id uuid,
// recipe_product_id uuid,

export class Assembly extends AmberApiFields {
  id: Guid
  name: string
  description: string
  complete: boolean
  parentId?: Guid
  recipeId?: Guid
  recipeProductId?: Guid

  constructor(
    id: Guid = Guid.createEmpty(),
    name = "",
    description = "",
    complete = false,
    recipeId?: Guid,
    parentId?: Guid,
    recipeProductId?: Guid
  ) {
    super()
    this.id = id
    this.name = name
    this.description = description
    this.complete = complete
    this.parentId = parentId
    this.recipeId = recipeId
    this.recipeProductId = recipeProductId
  }
}

export class AssemblyFilter {
  AssemblyStepIds: Guid[] = []
  includeDeleted = false
}
