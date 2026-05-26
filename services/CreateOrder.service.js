import CreateOrderModel from "../models/CreateOrder.model.js"
import {
  BadRequestError,
  NotFoundError,
  ValidationError,
} from "../utils/customErrorHandler.js"

export const getAllItems = async (req, res) => {
  try {
    const allItems = await CreateOrderModel.find()
    res.status(200)
    res.json(allItems)
  } catch (error) {
    throw error
  }
}

export const getItemsByUserId = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new BadRequestError("Not mentioned user id on API.")
    }
    const allItems = await CreateOrderModel.find({ userId: req.params.id })
    res.status(200)
    res.json(allItems)
  } catch (error) {
    throw error
  }
}

export const saveNewItem = async (req, res) => {
  try {
    if (!req.body) {
      throw new BadRequestError("Request body is missing.")
    }
    const NewItem = new CreateOrderModel(req.body)
    await NewItem.save()
    res.status(200)
    res.json(NewItem)
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new ValidationError(error.message)
    } else if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]
      throw new ValidationError(`${field} must be unique`)
    } else {
      throw error
    }
  }
}

export const findCreateOrderByUserIdAndUpdate = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      throw new BadRequestError("User id is missing.")
    }
    const CreateOrder = await CreateOrderModel.find({ userId: id })
    if (CreateOrder.length === 0) {
      throw new NotFoundError("No create order found.")
    }
    const dataToUpdate = req.body
    if (!dataToUpdate) {
      throw new BadRequestError("Request body is missing.")
    }
    const createOrder = await CreateOrderModel.findOneAndUpdate(
      { userId: id },
      dataToUpdate,
      {
        new: true,
      },
    )
    res.status(200)
    res.json(createOrder)
  } catch (error) {
    throw error
  }
}

export const findByUserIdAndDelete = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new BadRequestError("User id is missing.")
    }
    const CreateOrder = await CreateOrderModel.find({ userId: req.params.id })
    if (CreateOrder.length === 0) {
      throw new NotFoundError("No create order found.")
    }
    const item = await CreateOrderModel.findOneAndDelete({
      userId: req.params.id,
    })
    res.status(200)
    res.json(item)
  } catch (error) {
    throw error
  }
}
