import { sqlToDB } from "./../util/PgDatabase"
import { Resource } from "../../utils/classes/resources"
import Guid from "../../utils/classes/common/guid"

export async function addResource(resource: Resource) {
  return await sqlToDB("INSERT INTO resources (resource_name) VALUES ($1)", [resource.name])
  // Insert Tags Too
}

export async function getResource(resourceId: Guid) {
  const result = await sqlToDB("SELECT * FROM resources WHERE resource_id = $1", [resourceId.value])
  return result.rows.map(resourceResult => {
    const newResource = new Resource()
    newResource.fromQueryResultRow(resourceResult)
    return newResource
  })[0]
}

export async function getResourcesByFilter(filter?: any) {
  const result = await sqlToDB("SELECT * FROM resources")
  return result.rows.map(resourceResult => {
    const newResource = new Resource()
    newResource.fromQueryResultRow(resourceResult)
    return newResource
  })
}
export async function deleteResource(resourceId: Guid) {
  const result = await sqlToDB("DELETE FROM resources WHERE resource_id = $1", [resourceId.value])
  return !!result.rowCount
}

export async function updateOrCreateResource(resource: Resource) {
  if (resource.id.value !== Guid.createEmpty().value || (await getResource(resource.id))) {
    return await sqlToDB("UPDATE resources SET resource_name = $1 WHERE resource_id = $2;", [
      resource.name,
      resource.id.value
    ])
  }
  return await addResource(resource)
}
// export async function Update(Id, Resource){

// }
// export async function Delete(Id){

// }
