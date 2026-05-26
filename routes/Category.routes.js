import {
  getAllCategories,
  getCategory
} from "../controllers/Category.controller.js"

import express from "express"
const router = express.Router()

router.get("/", getAllCategories)

router.get("/:category", getCategory)

export default router
