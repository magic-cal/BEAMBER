// All /tags routes

import express from "express"
import Guid from "./../../utils/classes/common/guid"
const router = express.Router()

import { addTag, deleteTag, getTag, getTagsByFilter, updateOrCreateTag } from "../services/TagService"
import { Tag } from "utils/classes/resources"

// Note: this route is actually /tags due to our index.ts setup

router.post("/update", async (req, res) => {
  console.log("update")
  console.log("req.body.tag", req.body.tag)
  console.log("Intance of Guid", req.body.tag.id instanceof Guid)

  res.send(await updateOrCreateTag(req.body.tag as Tag))
})
router.post("/get", async (req, res) => {
  console.log("get")
  res.send(await getTag(req.body.id))
})
router.post("/get-by", async (req, res) => {
  console.log("get-by")
  res.send(await getTagsByFilter(req.body.filter))
})
router.post("/delete", async (req, res) => {
  console.log("delete")
  res.send(await deleteTag(req.body.id))
})

export default router
