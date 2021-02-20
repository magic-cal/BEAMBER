// Main router entry point, sets up all route modules
import express from "express"
const router = express.Router()

import resourceRouter from "./resourceRoutes"
import tagRouter from "./tagRoutes"
import recipeRouter from "./recipeRoutes"

// router.use("/", (req, res) => {
//   console.log("h", req)
// })
router.use("/resources", resourceRouter)
router.use("/tags", tagRouter)
router.use("/recipes", recipeRouter)

export default router
