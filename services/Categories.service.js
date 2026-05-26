import CategoryModel from "../models/Category.model.js"
import { BadRequestError, NotFoundError } from "../utils/customErrorHandler.js"

export const fetchAllCategories = async (req, res) => {
  try {
    const allCategories = await CategoryModel.find()
    res.status(200)
    res.json(allCategories)
  } catch (error) {
    throw error
  }
}

export const fetchCategory = async (req, res) => {
  try {
    if (!req.params.category) {
      throw new BadRequestError("Not mentioned category in the API.")
    }
    const Category = await CategoryModel.find({ for: req.params.category })
    if (Category.length === 0) {
      throw new NotFoundError("Category not found.")
    }
    res.status(200)
    res.json(Category)
  } catch (error) {
    throw error
  }
}
