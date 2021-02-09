import axios from "axios"
import { Resource, Tag } from "utils/classes/resources"
import Guid from "utils/classes/common/guid"

const baseUrl = "http://localhost:3000"
const service = "/resources"
const tagService = "/tags"

export default {
  async getResource(id: Guid): Promise<Resource> {
    const res = await axios.post(`${baseUrl}${service}/get`, {
      id: id
    })
    console.log("getResource", res)
    return res.data as Resource
  },

  async getResources(): Promise<Resource[]> {
    const res = await axios.post(`${baseUrl}${service}/get-by`)
    console.log("getResources", res)
    return res.data
  },

  async updateOrCreateResource(resource: Resource): Promise<void> {
    const res = await axios.post(`${baseUrl}${service}/update`, {
      resource: resource
    })
    console.log("updateOrCreateResource", res)
    return res.data
  },

  async deleteResource(id: Guid): Promise<void> {
    const res = await axios.post(`${baseUrl}${service}/delete`, {
      id: id
    })
    console.log("deleteResource", res)
  },

  //  TAG SERVICE #####################################################################################

  async getTag(id: Guid): Promise<Tag> {
    const res = await axios.post(`${baseUrl}${tagService}/get`, {
      id: id
    })
    console.log("getTag", res)
    return res.data as Tag
  },

  async getTags(): Promise<Tag[]> {
    const res = await axios.post(`${baseUrl}${tagService}/get-by`)
    console.log("getTags", res)
    return res.data
  },

  async updateOrCreateTag(tag: Tag): Promise<void> {
    const res = await axios.post(`${baseUrl}${tagService}/update`, {
      tag: tag
    })
    console.log("updateOrCreateTag", res)
    return res.data
  },

  async deleteTag(id: Guid): Promise<void> {
    const res = await axios.post(`${baseUrl}${tagService}/delete`, {
      id: id
    })
    console.log("deleteTag", res)
  }
}
