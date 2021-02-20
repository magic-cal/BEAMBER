// All /recipes routes

import express from "express"
import Guid from "./../../utils/classes/common/guid"
const router = express.Router()

import { addRecipe, deleteRecipe, getRecipe, getRecipesByFilter, updateOrCreateRecipe } from "../services/RecipeService"
import { Recipe } from "utils/classes/recipes"

// Note: this route is actually /recipes due to our index.ts setup
/**
 * @swagger
 * /recipes/update:
 *   put:
 *     tags:
 *       - Recipe
 *     operationId: updateRecipe
 *     summary: Update a given Recipe
 *     parameters:
 *       - name: recipe
 *         in: body
 *         description: The recipe to update
 *         required: true
 *         deprecated: false
 *         example:
 *           recipe:
 *             id:
 *               value: 6a129529-b7ae-47bb-bbfd-6de95c3d5a51
 *             name: string
 *             description: string
 *             requirementIds: []
 *             readOnly:
 *               startTime: 0
 *               endTime: 0
 *               isAssembly: false
 *               isScheduled: false
 *               isComplete: false
 *         x-last-modified: 1613852751652
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json
 */
router.put("/update", async (req, res) => {
  console.log("update")
  console.log("req.body.recipe", req.body.recipe)
  console.log("Intance of Guid", req.body.recipe.id instanceof Guid)

  res.send(await updateOrCreateRecipe(req.body.recipe as Recipe))
})
/**
 * @swagger
 * /recipes/get:
 *   post:
 *     tags:
 *       - Recipe
 *     operationId: getRecipe
 *     summary: Get a given Recipe
 *     parameters:
 *       - name: id
 *         in: body
 *         description: The Recipe to Get
 *         required: true
 *         example:
 *             id:
 *              value: 6a129529-b7ae-47bb-bbfd-6de95c3d5a51
 *     responses:
 *       200:
 *         description: The selected Recipe.
 *         content:
 *           application/json
 */
router.post("/get", async (req, res) => {
  console.log("get")
  res.send(await getRecipe(req.body.id))
})
/**
 * @swagger
 * /recipes/get-by:
 *   post:
 *     tags:
 *       - Recipe
 *     operationId: getRecipeBy
 *     summary: Get recipes by filter
 *     parameters:
 *       - name: filter
 *         in: body
 *         description: Recipe Filter
 *         required: false
 *     responses:
 *       200:
 *         description: Array of recipes
 *         content:
 *           application/json
 */
router.post("/get-by", async (req, res) => {
  console.log("get-by")
  res.send(await getRecipesByFilter(req.body.filter))
})
/**
 * @swagger
 * /recipes/delete:
 *   delete:
 *     tags:
 *       - Recipe
 *     operationId: deleteRecipe
 *     summary: Delete a given Recipe
 *     parameters:
 *       - name: id
 *         in: body
 *         description: The Recipe to Delete
 *         required: true
 *         example:
 *             id:
 *              value: 6a129529-b7ae-47bb-bbfd-6de95c3d5a51
 *     responses:
 *       200:
 *         description: Successful Deletion
 *         content:
 *           application/json
 */
router.delete("/delete", async (req, res) => {
  console.log("delete")
  res.send(await deleteRecipe(req.body.id))
})

export default router
