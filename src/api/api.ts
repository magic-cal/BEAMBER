import axios from "axios"
import { Resource } from "utils/types/resources"
import Guid from "utils/types/common/guid"

export default {
  async getEvents(): Promise<any> {
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
    const res = await axios.post("http://localhost:3000/events")
    console.log("events", res)
    console.log("eventsdata", res.data)
    return res.data
  },
  async getResource(id: Guid): Promise<Resource> {
    //  console.log("id",id)
    const res = await axios.post("http://localhost:3000/resources/get", {
      id: id.toString()
    })
    console.log("getResource", res)
    return res.data as Resource
  },

  async getResources(): Promise<Resource[]> {
    //  console.log("id",id)
    const res = await axios.post("http://localhost:3000/resources/get-by")
    console.log("getResources", res)
    return res.data
  },

  async saveResource(resource: Resource): Promise<void> {
    const res = await axios.post("http://localhost:3000/resources/add", {
      resource: resource
    })
    console.log("saveResource", res)
    return res.data
  }
}
