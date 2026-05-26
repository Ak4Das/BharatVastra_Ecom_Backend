import {
  getAllCloths,
  getClothById,
  getClothsByMainCategory,
  findByIdAndUpdate,
  getOfferOnACategory,
  getClothsByCommonCategory,
  getNewArriveCloths,
  getDistinctCommonCategories,
} from "../services/Cloth.service.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const fetchAllCloths = asyncHandler(getAllCloths)

export const fetchClothsById = asyncHandler(getClothById)

export const fetchNewArriveCloths = asyncHandler(getNewArriveCloths)

export const fetchDistinctCommonCategories = asyncHandler(
  getDistinctCommonCategories,
)

export const fetchOfferOnACategory = asyncHandler(getOfferOnACategory)

export const fetchClothsByMainCategory = asyncHandler(getClothsByMainCategory)

export const fetchClothsByCommonCategory = asyncHandler(
  getClothsByCommonCategory,
)

export const fetchByIdAndUpdate = asyncHandler(findByIdAndUpdate)
