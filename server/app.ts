import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import * as config from "../utils/swagger.json"
import "./services/TagService"
import "./services/ResourceService"
import "./services/RecipeService"
import { RegisterRoutes } from "./routes/routes"

dotenv.config()

const app = express()

app.set("port", process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(config, { customSiteTitle: "Amber Docs" }))
RegisterRoutes(app)

app.listen(app.get("port"), () => {
  console.log("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"))
  console.log("Press CTRL-C to stop\n")
})

export default app
