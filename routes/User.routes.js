import {
  fetchAllUsers,
  fetchUserById,
  postNewUser,
  fetchByIdAndUpdate,
  fetchByIdAndUpdateAddress,
  fetchByIdAndUpdateCartItems,
  fetchByIdAndUpdateWishlistItems,
} from "../controllers/User.controller.js"

import express from "express"
const router = express.Router()

router.get("/", fetchAllUsers)

router.get("/:id", fetchUserById)

router.post("/saveUser", postNewUser)

router.post("/updateUser/:id", fetchByIdAndUpdate)

router.post("/updateUserAddress/:id", fetchByIdAndUpdateAddress)

router.post("/updateCartItems/:id", fetchByIdAndUpdateCartItems)

router.post("/updateWishlistItems/:id", fetchByIdAndUpdateWishlistItems)

export default router
