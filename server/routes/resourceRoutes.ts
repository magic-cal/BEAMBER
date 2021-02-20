// All /resources routes

import express from "express"
import Guid from "./../../utils/classes/common/guid"
const router = express.Router()

import {
  addResource,
  deleteResource,
  getResource,
  getResourcesByFilter,
  updateOrCreateResource
} from "../services/ResourceService"
import { Resource } from "utils/classes/resources"

// Note: this route is actually /resources due to our index.ts setup
/**
 * @swagger
 * /resources/update:
 *   post:
 *     tags:
 *       - Resource
 *     operationId: updateResource
 *     summary: Update a given Resource
 *     parameters:
 *       - name: resource
 *         in: body
 *         description: The resource to update
 *         required: true
 *         deprecated: false
 *         example:
 *           resource:
 *             readOnly: null
 *             id:
 *               value: e96861e5-0123-4bd3-98c3-3f3ece24349c
 *             name: Small Copper
 *         x-last-modified: 1613852751652
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json
 */
router.post("/update", async (req, res) => {
  console.log("update")
  console.log("req.body.resource", req.body.resource)
  console.log("Intance of Guid", req.body.resource.id instanceof Guid)
  const i = res.send(await updateOrCreateResource(req.body.resource as Resource))
})
/**
 * @swagger
 * /resources/get:
 *   post:
 *     tags:
 *       - Resource
 *     operationId: getResource
 *     summary: Get a given Resource
 *     parameters:
 *       - name: id
 *         in: body
 *         description: The Resource to Get
 *         required: true
 *         example:
 *             id:
 *              value: 2d029617-ac69-4409-8191-8452f9cc9882
 *     responses:
 *       200:
 *         description: The selected Resource.
 *         content:
 *           application/json
 */
router.post("/get", async (req, res) => {
  console.log("get")
  res.send(await getResource(req.body.id))
})
/**
 * @swagger
 * /resources/get-by:
 *   post:
 *     tags:
 *       - Resource
 *     operationId: getResourceBy
 *     summary: Get resources by filter
 *     parameters:
 *       - name: filter
 *         in: body
 *         description: Resource Filter
 *         required: false
 *     responses:
 *       200:
 *         description: Array of resources
 *         content:
 *           application/json
 */
router.post("/get-by", async (req, res) => {
  console.log("get-by")
  res.send(await getResourcesByFilter(req.body.filter))
})
/**
 * @swagger
 * /resources/delete:
 *   post:
 *     tags:
 *       - Resource
 *     operationId: deleteResource
 *     summary: Delete a given Resource
 *     parameters:
 *       - name: id
 *         in: body
 *         description: The Resource to Delete
 *         required: true
 *         example:
 *             id:
 *              value: 2d029617-ac69-4409-8191-8452f9cc9882
 *     responses:
 *       200:
 *         description: Successful Deletion
 *         content:
 *           application/json
 */
router.post("/delete", async (req, res) => {
  console.log("delete")
  res.send(await deleteResource(req.body.id))
})

export default router
