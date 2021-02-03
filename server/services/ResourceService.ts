import { sqlToDB } from "./../util/PgDatabase"
import Guid from "utils/types/common/guid"
import { Resource } from "utils/types/resources"

export async function addResource(name: string, tagIds: Guid[]) {
  return await sqlToDB("INSERT INTO resources (resource_name) VALUES ($1)", [name])
  // Insert Tags Too
}
export async function getResource(resourceId: Guid) {
  const result = await sqlToDB("SELECT * FROM resources WHERE resource_id = $1", [resourceId])
  console.log("getById", resourceId, result)
  return result.rows.map(resource => ({
    id: resource.resource_id,
    name: resource.resource_name,
    tags: []
  }))[0] as Resource
}
export async function getResourcesByFilter(Filter?: any) {
  const result = await sqlToDB("SELECT * FROM resources")
  const i = result.rows.map(resource => ({
    id: resource.resource_id,
    name: resource.resource_name,
    tags: []
  })) as Resource[]
  return i
}
// export async function Update(Id, Resource){

// }
// export async function Delete(Id){

// }
