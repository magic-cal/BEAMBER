import { TagsApi } from "@/api1/index"

class Api {
  tagsApi: TagsApi
  constructor() {
    this.tagsApi = new TagsApi()
  }
}

export default new Api()
