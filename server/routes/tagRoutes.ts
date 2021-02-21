// All /tags routes

import express from "express"
import Guid from "./../../utils/classes/common/guid"
const router = express.Router()

import { addTag, deleteTag, getTag, getTagsByFilter, updateOrCreateTag } from "../services/TagService"
import { Tag } from "utils/classes/resources"

// Note: this route is actually /tags due to our index.ts setup
/**
 * @swagger
 * /tags/update:
 *   put:
 *     tags:
 *       - Tag
 *     operationId: updateTag
 *     summary: Update a given Tag
 *     parameters:
 *       - name: tag
 *         in: body
 *         description: The tag to update
 *         required: true
 *         deprecated: false
 *         example:
 *           tag:
 *             id:
 *              value: 0a0796d0-92a2-46c2-bd51-4fc8b63b7b0f
 *             name: Kettle
 *         x-last-modified: 1613852751652
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json
 */
router.put("/update", async (req, res) => {
  console.log("update")
  console.log("req.body.tag", req.body.tag)
  console.log("Intance of Guid", req.body.tag.id instanceof Guid)

  res.send(await updateOrCreateTag(req.body.tag as Tag))
})
/**
 * @swagger
 * /tags/get:
 *   post:
 *     tags:
 *       - Tag
 *     operationId: getTag
 *     summary: Get a given Tag
 *     parameters:
 *       - name: id
 *         in: body
 *         description: The Tag to Get
 *         required: true
 *         example:
 *             id:
 *              value: 0a0796d0-92a2-46c2-bd51-4fc8b63b7b0f
 *     responses:
 *       200:
 *         description: The selected Tag.
 *         content:
 *           application/json
 */
router.post("/get", async (req, res) => {
  console.log("get")
  res.send(await getTag(req.body.id))
})
/**
 * @swagger
 * /tags/get-by:
 *   post:
 *     tags:
 *       - Tag
 *     operationId: getTagBy
 *     summary: Get tags by filter
 *     parameters:
 *       - name: filter
 *         in: body
 *         description: Tag Filter
 *         required: false
 *     responses:
 *       200:
 *         description: Array of tags
 *         content:
 *           application/json
 */
router.post("/get-by", async (req, res) => {
  console.log("get-by")
  res.send(await getTagsByFilter(req.body.filter))
})
/**
 * @swagger
 * /tags/delete:
 *   delete:
 *     tags:
 *       - Tag
 *     operationId: deleteTag
 *     summary: Delete a given Tag
 *     parameters:
 *       - name: id
 *         in: body
 *         description: The Tag to Delete
 *         required: true
 *         example:
 *             id:
 *              value: 0a0796d0-92a2-46c2-bd51-4fc8b63b7b0f
 *     responses:
 *       200:
 *         description: Successful Deletion
 *         content:
 *           application/json
 */
router.delete("/delete", async (req, res) => {
  console.log("delete")
  res.send(await deleteTag(req.body.id))
})

export default router
