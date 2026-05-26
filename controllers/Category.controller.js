import {
  fetchAllCategories,
  fetchCategory,
} from "../services/Categories.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const getAllCategories = asyncHandler(fetchAllCategories)

export const getCategory = asyncHandler(fetchCategory)
