import {
  fetchAllUsers,
  fetchUserById,
  fetchByIdAndUpdate,
  fetchByIdAndUpdateAddress,
  fetchByIdAndUpdateCartItems,
  fetchByIdAndUpdateWishlistItems,
} from "../controllers/User.controller.js"
import auth from "../middlewares/auth.js"

import express from "express"
const router = express.Router()

router.get("/", auth, fetchAllUsers)

router.get("/me", auth, fetchUserById)

router.post("/updateUser", auth, fetchByIdAndUpdate)

router.post("/updateUserAddress", auth, fetchByIdAndUpdateAddress)

router.post("/updateCartItems", auth, fetchByIdAndUpdateCartItems)

router.post("/updateWishlistItems", auth, fetchByIdAndUpdateWishlistItems)

export default router
