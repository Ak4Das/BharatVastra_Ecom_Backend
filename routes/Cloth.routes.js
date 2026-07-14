import {
  fetchClothsById,
  fetchClothsByMainCategory,
  fetchByIdAndUpdate,
  fetchOfferOnACategory,
  fetchClothsByCommonCategory,
  fetchNewArriveCloths,
  fetchDistinctCommonCategories,
  fetchCloths,
} from "../controllers/Cloth.controller.js"
import auth from "../middlewares/auth.js"

import express from "express"
const router = express.Router()

router.get("/", auth, fetchCloths)

router.get("/:id", auth, fetchClothsById)

router.get("/newArrive/true", auth, fetchNewArriveCloths)

router.get("/categories/distinct", fetchDistinctCommonCategories)

router.get("/offer/:commonCategory", auth, fetchOfferOnACategory)

router.get("/mainCategory/:mainCategory", auth, fetchClothsByMainCategory)

router.get("/commonCategory/:commonCategory", auth, fetchClothsByCommonCategory)

router.patch("/update/:id", auth, fetchByIdAndUpdate)

export default router
