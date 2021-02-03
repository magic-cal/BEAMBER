import {sqlToDB} from "./../util/PgDatabase"
import Guid from "utils/types/common/guid"
import { Resource } from "utils/types/resources"

export async function addResource(name:string, tagIds:Guid[]){
    await sqlToDB("INSERT INTO resources (resource_name) VALUES ($1)",[name]);
    // Insert Tags Too
}
export async function getResource(resourceId: Guid){
    let result = await sqlToDB("SELECT * FROM resources WHERE resource_id = $1",[resourceId]);
    console.log("getById", resourceId, result)
    return result.rows.map((resource)=>({id: resource.id, name:resource.name, tags:[] }))[0] as Resource
}
export async function getResourcesByFilter(Filter?:any){
    let result = await sqlToDB("SELECT * FROM resources");
    // console.log("getBy", result);
    let i =  result.rows.map((resource)=>({id: resource.resource_id, name:resource.resource_name, tags:[] })) as Resource[]
    console.log("mapping",i);
    console.log("result.rows",result.rows)
    return i;
}
// export async function Update(Id, Resource){
    
// }
// export async function Delete(Id){
    
// }
