import { Router } from "express"
import TaskController from "../controllers/task"
import verifyToken from "../middleware/verifyToken"

const router: Router = Router()

router.use(verifyToken)

const Controller = new TaskController()

router.post("/:listId", Controller.Post)
router.put("/:listId/:taskId", Controller.Put)

export default router
