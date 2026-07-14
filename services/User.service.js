import UserModel from "../models/User.model.js"
import {
  BadRequestError,
  NotFoundError,
  ValidationError,
} from "../utils/customErrorHandler.js"
import bcrypt from "bcryptjs"

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find()
    res.status(200)
    res.json({
      success: true,
      message: "User fetched successfully",
      respondedData: allUsers,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password")
    if (!user) {
      return res.status(404).json({ error: "User profile not found." })
    }
    res.status(200)
    res.json({
      success: true,
      message: "user fetched successfully",
      respondedData: user,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const findByIdAndUpdate = async (req, res) => {
  try {
    const userProfile = await UserModel.findById(req.user.id)
    if (!userProfile) {
      return res.status(400).json({ error: "User profile not found." })
    }

    if (req.body.name) {
      userProfile.name = req.body.name.trim()
    }

    if (req.body.profileImage !== undefined) {
      userProfile.profileImage = req.body.profileImage.trim()
    }

    if (req.body.newPassword) {
      const matchesCurrent = await bcrypt.compare(
        req.body.currentPassword,
        userProfile.password,
      )
      if (!matchesCurrent) {
        return res.status(400).json({
          error: "The provided active validation password is invalid.",
        })
      }

      userProfile.password = req.body.newPassword
    }
    
    const profile = new UserModel(userProfile)

    const response = await profile.save()

    res.status(200)
    res.json({
      success: true,
      message: "User updated successfully",
      respondedData: response,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const findByIdAndUpdateAddress = async (req, res) => {
  try {
    const userProfile = await UserModel.findById(req.user.id)
    if (!userProfile) {
      return res.status(400).json({ error: "User profile not found." })
    }
    const dataToUpdate = req.body
    if (!dataToUpdate) {
      throw new BadRequestError("Request body is missing.")
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      { address: dataToUpdate },
      {
        new: true,
      },
    )
    res.status(200)
    res.json({
      success: true,
      message: "Address updated successfully",
      respondedData: updatedUser,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const findByIdAndUpdateCartItems = async (req, res) => {
  try {
    const userProfile = await UserModel.findById(req.user.id)
    if (!userProfile) {
      return res.status(400).json({ error: "User profile not found." })
    }
    const dataToUpdate = req.body
    if (!dataToUpdate) {
      throw new BadRequestError("Request body is missing.")
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      { addToCartItems: dataToUpdate },
      {
        new: true,
      },
    )
    res.status(200)
    res.json({
      success: true,
      message: "Cart updated successfully",
      respondedData: updatedUser,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const findByIdAndUpdateWishlistItems = async (req, res) => {
  try {
    const userProfile = await UserModel.findById(req.user.id)
    if (!userProfile) {
      return res.status(400).json({ error: "User profile not found." })
    }
    const dataToUpdate = req.body
    if (!dataToUpdate) {
      throw new BadRequestError("Request body is missing.")
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      { addToWishlistItems: dataToUpdate },
      {
        new: true,
      },
    )
    res.status(200)
    res.json({
      success: true,
      message: "Wishlist updated successfully",
      respondedData: updatedUser,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}
