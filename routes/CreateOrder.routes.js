import {
  fetchAllItems,
  fetchItemsByUserId,
  fetchCreateOrderByUserIdAndUpdate,
  postNewItem,
  fetchByUserIdAndDelete,
} from "../controllers/CreateOrder.controller.js"
import auth from "../middlewares/auth.js"

import express from "express"
const router = express.Router()

router.get("/",auth, fetchAllItems)

router.get("/:id",auth, fetchItemsByUserId)

router.post("/saveItem",auth, postNewItem)

router.patch("/updateItems/:id",auth, fetchCreateOrderByUserIdAndUpdate)

router.delete("/delete/userId/:id",auth, fetchByUserIdAndDelete)

export default router
