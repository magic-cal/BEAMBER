import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import * as config from "../utils/swagger.json"
import "./services/NewTagsService"
import { RegisterRoutes } from "./genRoutes/routes"

dotenv.config()

const app = express()

import routes from "./routes/index"

app.set("port", process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// Extended: https://swagger.io/specification/#infoObject
// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       version: "1.0.0",
//       title: "Amber API",
//       description: "Amber API Information and calls",
//       contact: {
//         name: "Callum McClure"
//       },
//       servers: ["http://localhost:3000"]
//     },
//     components: {}
//   },
//   // ['.routes/*.js']
//   apis: ["./server/routes/*.ts"]
// }

// const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(config))

RegisterRoutes(app)
// app.use("/", routes) // All requests will run through here

app.listen(app.get("port"), () => {
  console.log("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"))
  console.log("Press CTRL-C to stop\n")
})

export default app
