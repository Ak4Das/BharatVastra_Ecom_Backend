import {
  getAllCategories,
  getCategory,
} from "../controllers/Category.controller.js"
import auth from "../middlewares/auth.js"

import express from "express"
const router = express.Router()

router.get("/", getAllCategories)

router.get("/:category", auth, getCategory)

export default router
