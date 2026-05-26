import {
  getAllUsers,
  getUserById,
  saveNewUser,
  findByIdAndUpdate,
  findByIdAndUpdateAddress,
  findByIdAndUpdateCartItems,
  findByIdAndUpdateWishlistItems,
} from "../services/User.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const fetchAllUsers = asyncHandler(getAllUsers)

export const fetchUserById = asyncHandler(getUserById)

export const postNewUser = asyncHandler(saveNewUser)

export const fetchByIdAndUpdate = asyncHandler(findByIdAndUpdate)

export const fetchByIdAndUpdateAddress = asyncHandler(findByIdAndUpdateAddress)

export const fetchByIdAndUpdateCartItems = asyncHandler(
  findByIdAndUpdateCartItems,
)

export const fetchByIdAndUpdateWishlistItems = asyncHandler(
  findByIdAndUpdateWishlistItems,
)
