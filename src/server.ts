import cors from "cors"
import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"
import helmet, { crossOriginResourcePolicy } from "helmet"
import mongoose from "mongoose"
import { errorMessage, serverRunning } from "./modules/functions"
import AuthRouter from "./routes/auth"
import ListRouter from "./routes/list"
import TaskRouter from "./routes/task"
import UserRouter from "./routes/user"

//* configs
dotenv.config()
mongoose.set("strictQuery", false)

//* environment variables
const PORT = process.env.PORT || "4000"
const MONGO_URL = process.env.MONGO_URL || ""

//* Creating Applications
const app: Express = express()

//* setting middleware
app.use(cors())
app.use(helmet())
app.use(
  crossOriginResourcePolicy({
    policy: "cross-origin",
  })
)
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

//*Routes
//server check endpoint
app.get("/health-check", (_request: Request, response: Response) => {
  response.json({
    status: "SERVER RUNNING",
    message: "Server is running without any error",
  })
})

//different end points for application
app.use("/auth", AuthRouter)
app.use("/user", UserRouter)
app.use("/list", ListRouter)
app.use("/task", TaskRouter)

//* connecting to database
mongoose
  .connect(MONGO_URL)
  .then(connect => {
    // printing connection info to terminal
    console.log("connected to database:".bold, connect.connection.host.yellow)
    app.listen(PORT, () => serverRunning(PORT))
  })
  .catch((err: unknown) => {
    // handling connection error
    errorMessage(err)
  })
