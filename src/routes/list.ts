import { Router } from "express"
import { ListController, TaskController } from "../controllers/list"
import verifyToken from "../middleware/verifyToken"

const router: Router = Router()

router.use(verifyToken)

const listController = new ListController()
const taskController = new TaskController()

router.get("/", listController.Get)
router.post("/new", listController.Post)
router.put("/:id/update", listController.Put)
router.delete("/:id/remove", listController.Delete)

router.get("/tasks", taskController.Get)

export default router
