import { Router } from "express"
import { DeleteUser, GetUserProfile } from "../controllers/user"
import verifyToken from "../middleware/verifyToken"

const router: Router = Router()

router.get("/", verifyToken, GetUserProfile)
router.delete("/delete", verifyToken, DeleteUser)

export default router
