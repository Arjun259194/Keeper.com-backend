import { Router } from "express"
import ListController from "../controllers/list"
import verifyToken from "../middleware/verifyToken"

const router: Router = Router()

router.use(verifyToken)

const controller = new ListController()

router.get("/", controller.GetLists)
router.post("/new", controller.CreateNewList)
router.put("/:id/update", controller.UpdateListWithId)
router.delete("/:id/remove", controller.RemoveListWithId)

export default router
