import express, { Express, Response, Request } from "express"
import cors from "cors"
import helmet, { crossOriginResourcePolicy } from "helmet"
import dotenv from "dotenv"
import { serverRunning } from "./modules/functions"

dotenv.config()

//environment variables
const PORT = process.env.PORT || "4000"

const app: Express = express()

// setting middleware
app.use(cors())
app.use(helmet())
app.use(crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//! set up database
app.get("/", (request: Request, response: Response) => {
	response.send("Hello world")
})

app.listen(PORT, () => serverRunning(PORT))
