import { Router } from "express"
import UserController from "../controllers/user"
import verifyToken from "../middleware/verifyToken"

const router: Router = Router()

const Controller = new UserController()

router.get("/", verifyToken, Controller.Get)
router.delete("/", verifyToken, Controller.Delete)

export default router
