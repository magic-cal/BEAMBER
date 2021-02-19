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

router.post("/update", async (req, res) => {
  console.log("update")
  console.log("req.body.resource", req.body.resource)
  console.log("Intance of Guid", req.body.resource.id instanceof Guid)

  res.send(await updateOrCreateResource(req.body.resource as Resource))
})
/**
 * @swagger
 * /resources/get:
 *   post:
 *     summary: Retrieve a single JSONPlaceholder resource.
 *     description: Retrieve a single JSONPlaceholder resource. Can be used to populate a resource profile when prototyping or testing an API.
 *     parameters:
 *       - in: body
 *         name: id
 *         required: true
 *         description: Numeric ID of the resource to retrieve.
 *         schema:
 *           type: string
 *           example: "2d029617-ac69-4409-8191-8452f9cc9882"
 *     responses:
 *       200:
 *         description: A list of resources.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *
 */
router.post("/get", async (req, res) => {
  console.log("get")
  res.send(await getResource(req.body.id))
})
/**
 * @swagger
 * /resources/get-by:
 *   post:
 *     summary: Retrieve a single JSONPlaceholder resource.
 *     description: Retrieve a single JSONPlaceholder resource. Can be used to populate a resource profile when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of resources.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *
 */
router.post("/get-by", async (req, res) => {
  console.log("get-by")
  res.send(await getResourcesByFilter(req.body.filter))
})
router.post("/delete", async (req, res) => {
  console.log("delete")
  res.send(await deleteResource(req.body.id))
})

export default router
