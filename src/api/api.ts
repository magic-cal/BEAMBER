import axios from "axios"
import { Resource } from "utils/types/resources";
import Guid from "utils/types/common/guid";

export default {
    async getEvents():Promise<any> {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
    let res = await axios.post("http://localhost:3000/events");
    console.log("events", res)
    console.log("eventsdata", res.data)
    return res.data;
  },
 async getResource(id:Guid):Promise<Resource> {
  //  console.log("id",id)
    let res = await axios.post("http://localhost:3000/resource",{
      id: id.toString()
    })
    console.log("getResource",res)
    return res.data as Resource;
  },

   async getResources():Promise<Resource[]> {
  //  console.log("id",id)
    let res = await axios.post("http://localhost:3000/resources")
    console.log("getResources",res)
    return res.data;
  },
}