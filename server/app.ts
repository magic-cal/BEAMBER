import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import { sqlToDB } from "./util/PgDatabase"
import { getResource, getResourcesByFilter } from "./services/ResourceService"
import Resource from "utils/types/resources"

import * as home from "./controllers/home.controller"

dotenv.config()

const app = express()
const router = express.Router()

app.set("port", process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.get("/", home.index)
// app.get("/events", ()=>{console.log}));

app.post("/events", async (req, res) => {
  console.log("events fired")
  // res.send('Returning your events');
  res.send(await sqlToDB("SELECT * From accounts where user_id = $1 OR user_id = $2", [1, 2]))
})

app.post("/register", async (req, res) => {
  console.log("events fired")
  // res.send('Returning your events');
  // req.
  res.send(await sqlToDB("SELECT * From accounts where user_id = $1 OR user_id = $2", [1, 2]))
})

// const albumsRouter = require('./albumsRouter');

// router.use('/', indexRouter);

app.post("/resource", async (req, res) => {
  const id = req.body.id
  res.send(await getResource(id))
})

app.post("/resources", async (req, res) => {
  res.send(await getResourcesByFilter())
})

app.listen(app.get("port"), () => {
  console.log("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"))
  console.log("Press CTRL-C to stop\n")
})

export default app
