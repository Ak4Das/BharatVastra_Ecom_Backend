import {
  fetchAllCloths,
  fetchClothsById,
  fetchClothsByMainCategory,
  fetchByIdAndUpdate,
  fetchOfferOnACategory,
  fetchClothsByCommonCategory,
  fetchNewArriveCloths,
  fetchDistinctCommonCategories,
} from "../controllers/Cloth.controller.js"

import express from "express"
const router = express.Router()

router.get("/", fetchAllCloths)

router.get("/:id", fetchClothsById)

router.get("/newArrive/true", fetchNewArriveCloths)

router.get("/categories/distinct", fetchDistinctCommonCategories)

router.get("/offer/:commonCategory", fetchOfferOnACategory)

router.get("/mainCategory/:mainCategory", fetchClothsByMainCategory)

router.get("/commonCategory/:commonCategory", fetchClothsByCommonCategory)

router.patch("/update/:id", fetchByIdAndUpdate)

export default router
