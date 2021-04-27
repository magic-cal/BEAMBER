import express, { Response, Request, NextFunction } from "express"
import dotenv from "dotenv"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import * as config from "../utils/swagger.json"
import { RegisterRoutes } from "./routes/routes"
import { ValidateError } from "tsoa"

dotenv.config()

const app = express()

app.set("port", process.env.PORT || 3000)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(config, { customSiteTitle: "Amber Docs" }))
RegisterRoutes(app)

app.listen(app.get("port"), () => {
  console.log("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"))
  console.log("Press CTRL-C to stop\n")
})

app.use((err: unknown, req: Request, res: Response, next: NextFunction): Response | void => {
  console.log({ err })
  console.log({ res })
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields)
    res.statusMessage = `Caught Validation Error for ${req.path}: ${err.fields}`
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields
    })
  }
  if (err instanceof Error) {
    console.warn("Internal Server Error", err.message, err.stack)
    res.statusMessage = "Error found: " + err.message
    return res.status(500).json({
      message: "Internal Server Error " + err.message,
      details: err.stack
    })
  }

  next()
})

export default app
