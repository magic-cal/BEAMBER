import { sqlToDB } from "../util/PgDatabase"
import { Resource, ResourceFilter, ResourceReadonly, Tag, TagFilter } from "../../utils/classes/resources"
import Guid from "../../utils/classes/common/guid"
import { TagController } from "./TagService"
import { Body, Controller, Delete, Post, Put, Route, Tags } from "tsoa"
import { QueryResultRow } from "pg"

export async function updateTagRelation(tags: Tag[], resourceId: Guid) {
  // const insertionValues = tags.map(tag => (tag.id.value, resourceId.value))
  const insertionValues: string[] = []

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
    resource.capacity = 0
    resource.currentStep = Guid.createEmpty()
    resource.maintananceRequired = false
    resource.active = true
    // console.log("resourceResultRow", resourceResultRow)
    // console.log("Res", resource)

    return resource
  }

  public async addResource(resource: Resource) {
    return await sqlToDB("INSERT INTO resources (resource_name) VALUES ($1)", [resource.name])
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
    // const result = await sqlToDB("SELECT * FROM resources")
    // const resources = result.rows.map(resourceResult => {
    //   const newResource = new Resource()
    //   newResource.fromQueryResultRow(resourceResult)
    //   return newResource
    // })
    //
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
      result = await sqlToDB("UPDATE resources SET resource_name = $1 WHERE resource_id = $2;", [
        resource.name,
        resource.id.value
      ])
    } else {
      result = await this.addResource(resource)
    }
    await updateTagRelation(resource.tags, resource.id)
    return result
  }
}

// public async Update(Id, Resource){

// }
// public async Delete(Id){

// }
