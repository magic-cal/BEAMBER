import {sqlToDB} from "./../util/PgDatabase"
import Guid from "utils/types/common/guid"

export async function addResource(name:string, tagIds:Guid[]){
    await sqlToDB("INSERT INTO resources (resource_name) VALUES ($1)",[name]);
    // Insert Tags Too
}
export async function getResource(resourceId: Guid){
    let result = await sqlToDB("SELECT * FROM resource WHERE resource_id = ",[resourceId]);
    console.log("getById", resourceId, result)
    return result;
}
export async function getResourcesByFilter(Filter:any){
    let result = await sqlToDB("SELECT * FROM resource");
    console.log("getBy", result);
    
}
// export async function Update(Id, Resource){
    
// }
// export async function Delete(Id){
    
// }
