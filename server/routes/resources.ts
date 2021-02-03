// All /resources routes

import express from "express"
const router = express.Router()
const prefix = "/resources"

import { addResource, getResource, getResourcesByFilter } from "./../services/ResourceService"

// Note: this route is actually /resources due to our index.js setup
router.get(prefix + "/", async (req, res) => {
  console.log("hit")
  //   res.send(await addResource(req.body.resource.name, []))
})
router.get(prefix + "/add", async (req, res) => {
  console.log("hit")
  res.send(await addResource(req.body.resource.name, []))
})
router.get(prefix + "/get", async (req, res) => {
  console.log("hit")
  res.send(await getResource(req.body.id))
})
router.get(prefix + "/get-by", async (req, res) => {
  console.log("hit")
  res.send(await getResourcesByFilter(req.body.filter))
})

export default router
