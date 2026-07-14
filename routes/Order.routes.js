import {
  fetchAllOrders,
  fetchOrderByUserId,
  fetchOrderByOrderId,
  postNewOrder,
  fetchOrderByIdAndUpdate,
  fetchOrderByIdAndDelete,
} from "../controllers/Order.controller.js"
import auth from "../middlewares/auth.js"

import express from "express"
const router = express.Router()

router.get("/",auth, fetchAllOrders)

router.get("/user/:id",auth, fetchOrderByUserId)

router.get("/:id",auth, fetchOrderByOrderId)

router.post("/saveOrder",auth, postNewOrder)

router.patch("/update/:id",auth, fetchOrderByIdAndUpdate)

router.delete("/delete/:id",auth, fetchOrderByIdAndDelete)

export default router
