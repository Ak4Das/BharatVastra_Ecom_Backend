import OrderModel from "../models/Order.model.js"
import {
  BadRequestError,
  NotFoundError,
  ValidationError,
} from "../utils/customErrorHandler.js"

export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await OrderModel.find()
    res.status(200)
    res.json({
      success: true,
      message: "Orders fetched successfully",
      respondedData: allOrders,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const getOrderByUserId = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new BadRequestError("Not mentioned user id on API.")
    }
    const allOrders = await OrderModel.find({ userId: req.params.id })
    res.status(200)
    res.json({
      success: true,
      message: "Order fetched successfully",
      respondedData: allOrders,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const getOrderByOrderId = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new BadRequestError("Not mentioned order id on API.")
    }
    const order = await OrderModel.find({ id: req.params.id })
    res.status(200)
    res.json({
      success: true,
      message: "Order fetched successfully",
      respondedData: order,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const saveNewOrder = async (req, res) => {
  try {
    if (!req.body) {
      throw new BadRequestError("Request body is missing.")
    }
    const NewOrder = new OrderModel(req.body)
    await NewOrder.save()
    res.status(200)
    res.json({
      success: true,
      message: "Order saved successfully",
      respondedData: NewOrder,
    })
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new ValidationError(error.message)
    } else if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]
      throw new ValidationError(`${field} must be unique`)
    } else {
      res.status(400).json({ success: false, message: error.message })
    }
  }
}

export const findOrderByIdAndUpdate = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      throw new BadRequestError("Order id is missing.")
    }
    const Order = await OrderModel.find({ id })
    if (Order.length === 0) {
      throw new NotFoundError("Order not found.")
    }
    const dataToUpdate = req.body
    if (!dataToUpdate) {
      throw new BadRequestError("Request body is missing.")
    }
    const order = await OrderModel.findOneAndUpdate({ id }, dataToUpdate, {
      new: true,
    })
    res.status(200)
    res.json({
      success: true,
      message: "Order updated successfully",
      respondedData: order,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const findOrderByIdAndDelete = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new BadRequestError("Order id is missing.")
    }
    const Order = await OrderModel.find({ id: req.params.id })
    if (Order.length === 0) {
      throw new NotFoundError("Order not found.")
    }
    const deletedOrder = await OrderModel.findOneAndDelete({
      id: req.params.id,
    })
    res.status(200)
    res.json({
      success: true,
      message: "Order deleted successfully",
      respondedData: deletedOrder,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}
