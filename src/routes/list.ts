import { Router } from "express"
import ListController from "../controllers/list"
import verifyToken from "../middleware/verifyToken"

const router: Router = Router()

router.use(verifyToken)

const listController = new ListController()

router.get("/", listController.Get)
router.post("/", listController.Post)
router.put("/:id", listController.Put)
router.delete("/:id", listController.Delete)

export default router
