import axios from "axios"
import { Resource, ResourceFilter, Tag, TagFilter } from "utils/classes/resources"
import Guid from "utils/classes/common/guid"

const baseUrl = "http://localhost:3000"
const resourceService = "/resources"
const tagService = "/tags"

export default {
  async getResource(id: Guid): Promise<Resource> {
    const res = await axios.post(`${baseUrl}${resourceService}/get`, {
      id: id
    })
    console.log("getResource", res)
    return res.data as Resource
  },

  async getResources(filter?: ResourceFilter): Promise<Resource[]> {
    const res = await axios.post(`${baseUrl}${resourceService}/get-by`, {
      filter: filter
    })
    console.log("getResources", res)
    return res.data
  },

  async updateOrCreateResource(resource: Resource): Promise<void> {
    const res = await axios.post(`${baseUrl}${resourceService}/update`, {
      resource: resource
    })
    console.log("updateOrCreateResource", res)
    return res.data
  },

  async deleteResource(id: Guid): Promise<void> {
    const res = await axios.post(`${baseUrl}${resourceService}/delete`, {
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

  async getTags(filter?: TagFilter): Promise<Tag[]> {
    const res = await axios.post(`${baseUrl}${tagService}/get-by`, { filter: filter })
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
