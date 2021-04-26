import { sqlToDB } from "../util/PgDatabase"
import { Resource, ResourceFilter, ResourceReadonly, Tag, TagFilter } from "../../utils/classes/resources"
import Guid from "../../utils/classes/common/guid"
import { TagController } from "./TagService"
import { Body, Controller, Delete, Post, Put, Route, Tags } from "tsoa"
import { QueryResultRow } from "pg"
import { extractBaseFields } from "../util/baseDataUtil"

export async function updateTagRelation(tags: Tag[], resourceId: Guid) {
  await sqlToDB("DELETE FROM resource_tags WHERE resource_id = $1", [resourceId.value])
  //@TODO: Update Inserts into Tags
  await tags.forEach(
    async (tag) =>
      await sqlToDB("INSERT INTO resource_tags (tag_id, resource_id) VALUES ($1,$2)", [tag.id.value, resourceId.value])
  )
}

@Tags("Resource")
@Route("Resource")
export class ResourceController extends Controller {
  private tagService: TagController
  constructor() {
    super()
    this.tagService = new TagController()
  }

  dbToResource(resourceResultRow: QueryResultRow) {
    const resource: Resource = new Resource()
    resource.id = Guid.fromString(resourceResultRow.resource_id)
    resource.name = resourceResultRow.resource_name
    resource.tags = []
    resource.readOnly = new ResourceReadonly()
    resource.capacity = resourceResultRow.resource_capacity
    resource.currentLease = resourceResultRow.resource_current_lease
    resource.maintananceRequired = resourceResultRow.resource_maintanance_required
    resource.active = resourceResultRow.resource_is_active

    return resource
  }

  public async addResource(resource: Resource) {
    if (resource.id.value === Guid.createEmpty().value) {
      resource.id = Guid.create()
    }
    return await sqlToDB(
      "INSERT INTO resources (resource_id, resource_name, resource_capacity, resource_current_lease, resource_maintanance_required, resource_is_active, version_no) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        resource.id.value,
        resource.name,
        resource.capacity,
        resource.currentLease,
        resource.maintananceRequired,
        resource.active,
        ...extractBaseFields(resource)
      ]
    )
  }

  @Post("get")
  public async getResource(@Body() resourceId: Guid) {
    const result = await sqlToDB("SELECT * FROM resources WHERE resource_id = $1", [resourceId.value])
    return result.rows.map(async (resourceResult) => {
      const newResource = this.dbToResource(resourceResult)
      const filter = new TagFilter()
      filter.resourceIds = [newResource.id]
      newResource.tags = await this.tagService.getTagsByFilter(filter)
      return newResource
    })[0]
  }

  @Post("get-by")
  public async getResourcesByFilter(@Body() filter?: ResourceFilter) {
    let query =
      "SELECT DISTINCT ON (resources.resource_id) resources.* FROM resources LEFT JOIN resource_tags ON (resources.resource_id = resource_tags.resource_id)"
    const queryClauses: string[] = []
    if (filter?.tagIds?.length) {
      queryClauses.push(`resource_tags.tag_id IN (${filter?.tagIds.map((ri) => `'${ri.value}'`)})`)
    }
    query += queryClauses.length ? " WHERE " + queryClauses.join(" AND ") : ";"
    const result = await sqlToDB(query)

    const resources = result.rows.map((resourceResult) => {
      const newResource = this.dbToResource(resourceResult)
      return newResource
    })

    // Get Associated Tags
    return await Promise.all(
      resources.map(async (res: Resource) => {
        const filter = new TagFilter()
        filter.resourceIds = [res.id]
        res.tags = await this.tagService.getTagsByFilter(filter)
        return res
      })
    )
  }

  @Delete("delete")
  public async deleteResource(@Body() resourceId: Guid) {
    await updateTagRelation([], resourceId) //Remove all tag relations
    const result = await sqlToDB("DELETE FROM resources WHERE resource_id = $1", [resourceId.value])
    return !!result.rowCount
  }

  @Put("update")
  public async updateOrCreateResource(@Body() resource: Resource) {
    let result = null
    if (resource.id.value !== Guid.createEmpty().value || (await this.getResource(resource.id))) {
      result = await sqlToDB(
        "UPDATE resources SET resource_name = $2, resource_capacity = $3, resource_current_lease = $4, resource_maintanance_required = $5, resource_is_active = $6, version_no = $7 WHERE resource_id = $1;",
        [
          resource.id.value,
          resource.name,
          resource.capacity,
          resource.currentLease,
          resource.maintananceRequired,
          resource.active,
          ...extractBaseFields(resource)
        ]
      )
    } else {
      result = await this.addResource(resource)
    }
    await updateTagRelation(resource.tags, resource.id)
    return result
  }
}

// resource_id = $1,
// resource_name = $2,
// resource_capacity = $3,
// resource_current_lease = $4,
// resource_maintanance_required = $5,
// resource_is_active = $6,
// version_no = $7
