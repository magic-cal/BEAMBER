import { sqlToDB } from "./../util/PgDatabase"
import { Resource, ResourceFilter, Tag, TagFilter } from "../../utils/classes/resources"
import Guid from "../../utils/classes/common/guid"
import { getTagsByFilter } from "./TagService"

export async function updateTagRelation(tags: Tag[], resourceId: Guid) {
  // const insertionValues = tags.map(tag => (tag.id.value, resourceId.value))
  const insertionValues: string[] = []

  await sqlToDB("DELETE FROM resource_tags WHERE resource_id = $1", [resourceId.value])
  //@TODO: Update Inserts into Tags
  await tags.forEach(
    async tag =>
      await sqlToDB("INSERT INTO resource_tags (tag_id, resource_id) VALUES ($1,$2)", [tag.id.value, resourceId.value])
  )
}

export async function addResource(resource: Resource) {
  return await sqlToDB("INSERT INTO resources (resource_name) VALUES ($1)", [resource.name])
}

export async function getResource(resourceId: Guid) {
  const result = await sqlToDB("SELECT * FROM resources WHERE resource_id = $1", [resourceId.value])
  return result.rows.map(async resourceResult => {
    const newResource = new Resource()
    newResource.fromQueryResultRow(resourceResult)
    const filter = new TagFilter()
    filter.resourceIds = [newResource.id]
    newResource.tags = await getTagsByFilter(filter)
    return newResource
  })[0]
}

export async function getResourcesByFilter(filter?: ResourceFilter) {
  // const result = await sqlToDB("SELECT * FROM resources")
  // const resources = result.rows.map(resourceResult => {
  //   const newResource = new Resource()
  //   newResource.fromQueryResultRow(resourceResult)
  //   return newResource
  // })
  //
  let query =
    "SELECT DISTINCT ON (resources.resource_id) resources.resource_id, resource_name FROM resources LEFT JOIN resource_tags ON (resources.resource_id = resource_tags.resource_id)"
  const queryClauses: string[] = []
  if (filter?.tagIds?.length) {
    queryClauses.push(`resource_tags.tag_id IN (${filter?.tagIds.map(ri => `'${ri.value}'`)})`)
  }
  query += queryClauses.length ? " WHERE " + queryClauses.join(" AND ") : ";"
  const result = await sqlToDB(query)

  const resources = result.rows.map(resourceResult => {
    const newResource = new Resource()
    newResource.fromQueryResultRow(resourceResult)
    return newResource
  })

  // Get Associated Tags
  return await Promise.all(
    resources.map(async (res: Resource) => {
      const filter = new TagFilter()
      filter.resourceIds = [res.id]
      res.tags = await getTagsByFilter(filter)
      return res
    })
  )
}

export async function deleteResource(resourceId: Guid) {
  await updateTagRelation([], resourceId) //Remove all tag relations
  const result = await sqlToDB("DELETE FROM resources WHERE resource_id = $1", [resourceId.value])
  return !!result.rowCount
}

export async function updateOrCreateResource(resource: Resource) {
  let result = null
  if (resource.id.value !== Guid.createEmpty().value || (await getResource(resource.id))) {
    result = await sqlToDB("UPDATE resources SET resource_name = $1 WHERE resource_id = $2;", [
      resource.name,
      resource.id.value
    ])
  } else {
    result = await addResource(resource)
  }
  await updateTagRelation(resource.tags, resource.id)
  return result
}

// export async function Update(Id, Resource){

// }
// export async function Delete(Id){

// }
