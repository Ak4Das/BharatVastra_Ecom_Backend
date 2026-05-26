import UserModel from "../models/User.model.js"
import {
  BadRequestError,
  NotFoundError,
  ValidationError,
} from "../utils/customErrorHandler.js"

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find()
    res.status(200)
    res.json(allUsers)
  } catch (error) {
    throw error
  }
}

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      throw new BadRequestError("Not mentioned user id on API.")
    }
    const User = await UserModel.findById(id)
    if (!User) {
      throw new NotFoundError("No user found.")
    }
    res.status(200)
    res.json(User)
  } catch (error) {
    throw error
  }
}

export const saveNewUser = async (req, res) => {
  try {
    if (!req.body) {
      throw new BadRequestError("Request body is missing.")
    }
    const NewUser = new UserModel(req.body)
    await NewUser.save()
    res.status(200)
    res.json(NewUser)
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

export const findByIdAndUpdate = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      throw new BadRequestError("User id is missing.")
    }
    const User = await UserModel.find({ _id: id })
    if (User.length === 0) {
      throw new NotFoundError("User not found.")
    }
    const dataToUpdate = req.body
    if (!dataToUpdate) {
      throw new BadRequestError("Request body is missing.")
    }
    const updatedUser = await UserModel.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    })
    res.status(200)
    res.json(updatedUser)
  } catch (error) {
    throw error
  }
}

export const findByIdAndUpdateAddress = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      throw new BadRequestError("User id is missing.")
    }
    const User = await UserModel.find({ _id: id })
    if (User.length === 0) {
      throw new NotFoundError("User not found.")
    }
    const dataToUpdate = req.body
    if (!dataToUpdate) {
      throw new BadRequestError("Request body is missing.")
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { address: dataToUpdate },
      {
        new: true,
      },
    )
    res.status(200)
    res.json(updatedUser)
  } catch (error) {
    throw error
  }
}

export const findByIdAndUpdateCartItems = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      throw new BadRequestError("User id is missing.")
    }
    const User = await UserModel.find({ _id: id })
    if (User.length === 0) {
      throw new NotFoundError("User not found.")
    }
    const dataToUpdate = req.body
    if (!dataToUpdate) {
      throw new BadRequestError("Request body is missing.")
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { addToCartItems: dataToUpdate },
      {
        new: true,
      },
    )
    res.status(200)
    res.json(updatedUser)
  } catch (error) {
    throw error
  }
}

export const findByIdAndUpdateWishlistItems = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      throw new BadRequestError("User id is missing.")
    }
    const User = await UserModel.find({ _id: id })
    if (User.length === 0) {
      throw new NotFoundError("User not found.")
    }
    const dataToUpdate = req.body
    if (!dataToUpdate) {
      throw new BadRequestError("Request body is missing.")
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { addToWishlistItems: dataToUpdate },
      {
        new: true,
      },
    )
    res.status(200)
    res.json(updatedUser)
  } catch (error) {
    throw error
  }
}
