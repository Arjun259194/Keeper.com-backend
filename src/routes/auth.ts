import express, { Router } from "express"
import AuthController from "../controllers/auth"
import verifyToken from "../middleware/verifyToken"

const router: Router = express.Router()

const Controller = new AuthController()

router.post("/login", Controller.login)

router.post("/register", Controller.register)

router.get("/check", Controller.checkAuthorization)

router.get("/logout", verifyToken, Controller.logout)

export default router
