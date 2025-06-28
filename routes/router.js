import { Router } from "express"
import {
	renderTables,
	renderItems,
	insertItem,
	removeItem,
	updateItem,
	createTable,
	removeTable,
	updateTable,
} from "../controllers/controller.js"

const router = Router()

router.get("/", renderTables)
router.post("/", createTable)
router.post("/:table/delete", removeTable)
router.post("/:table/update", updateTable)

router.get("/:table", renderItems)
router.post("/:table", insertItem)
router.post("/:table/:item/delete", removeItem)
router.post("/:table/:item/update", updateItem)

export default router
