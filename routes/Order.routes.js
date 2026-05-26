import {
  fetchAllOrders,
  fetchOrderByUserId,
  fetchOrderByOrderId,
  postNewOrder,
  fetchOrderByIdAndUpdate,
  fetchOrderByIdAndDelete,
} from "../controllers/Order.controller.js"

import express from "express"
const router = express.Router()

router.get("/", fetchAllOrders)

router.get("/user/:id", fetchOrderByUserId)

router.get("/:id", fetchOrderByOrderId)

router.post("/saveOrder", postNewOrder)

router.post("/update/:id", fetchOrderByIdAndUpdate)

router.delete("/delete/:id", fetchOrderByIdAndDelete)

export default router
