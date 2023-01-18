import { Router } from "express"
import { GetUserProfile } from "../controllers/user"
import verifyToken from "../middleware/verifyToken"

const router: Router = Router()

router.get("/", verifyToken, GetUserProfile)

export default router
