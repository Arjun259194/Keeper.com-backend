import express, { Express, Response, Request } from "express"
import cors from "cors"
import helmet, { crossOriginResourcePolicy } from "helmet"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { errorMessage, serverRunning } from "./modules/functions"
import AuthRouter from "./routes/auth"

//* configs
dotenv.config()
mongoose.set(`strictQuery`, false)

//* environment variables
const PORT = process.env.PORT || "4000"
const MONGO_URL = process.env.MONGO_URL || ""

//* Creating Applications
const app: Express = express()

//* setting middleware
app.use(cors())
app.use(helmet())
app.use(crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//*Routes
app.get("/", (_request: Request, response: Response) => {
	response.send("Hello, world!")
})

app.use("/api/auth", AuthRouter)

//* connecting to database
mongoose
	.connect(MONGO_URL)
	.then(connect => {
		// printing connection info to terminal
		console.log(connect.connection.host)
		app.listen(PORT, () => serverRunning(PORT))
	})
	.catch((err: unknown) => {
		// handling connection error
		errorMessage(err)
	})
