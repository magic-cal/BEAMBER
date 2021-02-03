// Main router entry point, sets up all route modules
import express from "express"
const router = express.Router()

import resourceRouter from "./resources"

// router.use("/", (req, res) => {
//   console.log("h", req)
// })
router.use("/resources", resourceRouter)
// router.use("/resources", () => {
//   console.log("res")
// })
// router.use("/artists", artistsRouter)
// router.use("/albums", albumsRouter)

export default router
