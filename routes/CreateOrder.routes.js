import {
  fetchAllItems,
  fetchItemsByUserId,
  fetchCreateOrderByUserIdAndUpdate,
  postNewItem,
  fetchByUserIdAndDelete,
} from "../controllers/CreateOrder.controller.js"

import express from "express"
const router = express.Router()

router.get("/", fetchAllItems)

router.get("/:id", fetchItemsByUserId)

router.post("/saveItem", postNewItem)

router.patch("/updateItems/:id", fetchCreateOrderByUserIdAndUpdate)

router.delete("/delete/userId/:id", fetchByUserIdAndDelete)

export default router
