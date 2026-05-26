import {
  getAllOrders,
  getOrderByUserId,
  getOrderByOrderId,
  saveNewOrder,
  findOrderByIdAndUpdate,
  findOrderByIdAndDelete,
} from "../services/Order.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const fetchAllOrders = asyncHandler(getAllOrders)

export const fetchOrderByUserId = asyncHandler(getOrderByUserId)

export const fetchOrderByOrderId = asyncHandler(getOrderByOrderId)

export const postNewOrder = asyncHandler(saveNewOrder)

export const fetchOrderByIdAndUpdate = asyncHandler(findOrderByIdAndUpdate)

export const fetchOrderByIdAndDelete = asyncHandler(findOrderByIdAndDelete)
