import ClothModel from "../models/Cloth.model.js"
import { BadRequestError, NotFoundError } from "../utils/customErrorHandler.js"

export const getAllCloths = async (req, res) => {
  try {
    const allCloths = await ClothModel.find()
    res.status(200)
    res.json(allCloths)
  } catch (error) {
    throw error
  }
}

export const getClothById = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      throw new BadRequestError("Not mentioned product id on API.")
    }
    const cloth = await ClothModel.findOne({ id })
    if (cloth === null) {
      throw new NotFoundError("Product not found.")
    }
    res.status(200)
    res.json(cloth)
  } catch (error) {
    throw error
  }
}

export const getNewArriveCloths = async (req, res) => {
  try {
    const cloth = await ClothModel.find({ newArrival: true })
    if (!cloth.length) {
      throw new NotFoundError("No products are newly arrived.")
    }
    res.status(200)
    res.json(cloth)
  } catch (error) {
    throw error
  }
}

export const getDistinctCommonCategories = async (req, res) => {
  try {
    const categories = await ClothModel.distinct("commonCategory")
    res.status(200)
    res.json(categories)
  } catch (error) {
    throw error
  }
}

export const getOfferOnACategory = async (req, res) => {
  try {
    const commonCategory = req.params.commonCategory
    if (!commonCategory) {
      throw new BadRequestError("Common category is missing.")
    }
    const cloth = await ClothModel.find({
      commonCategory,
      $expr: {
        $gt: [
          {
            $toInt: {
              $replaceOne: {
                input: "$offer",
                find: "%",
                replacement: "",
              },
            },
          },
          0,
        ],
      },
    })
    if (cloth.length === 0) {
      throw new NotFoundError(`No ${commonCategory} available with offer.`)
    }
    res.status(200)
    res.json(cloth)
  } catch (error) {
    throw error
  }
}

export const getClothsByMainCategory = async (req, res) => {
  try {
    const mainCategory = req.params.mainCategory
    if (!mainCategory) {
      throw new BadRequestError("Main category is missing.")
    }
    const cloths = await ClothModel.find({ mainCategory: mainCategory })
    if (cloths.length === 0) {
      throw new NotFoundError(`No product available for ${mainCategory}.`)
    }
    res.status(200)
    res.json(cloths)
  } catch (error) {
    throw error
  }
}

export const getClothsByCommonCategory = async (req, res) => {
  try {
    const commonCategory = req.params.commonCategory
    if (!commonCategory) {
      throw new BadRequestError("Common category is missing.")
    }
    const cloths = await ClothModel.find({ commonCategory })
    if (cloths.length === 0) {
      throw new NotFoundError(`No ${commonCategory} available.`)
    }
    res.status(200)
    res.json(cloths)
  } catch (error) {
    throw error
  }
}

export const findByIdAndUpdate = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      throw new BadRequestError("Product id is missing.")
    }
    const product = await ClothModel.find({ id })
    if (product.length === 0) {
      throw new NotFoundError("Product not found.")
    }
    const dataToUpdate = req.body
    if (!dataToUpdate) {
      throw new BadRequestError("Request body is missing.")
    }
    const cloth = await ClothModel.findOneAndUpdate({ id: id }, dataToUpdate, {
      new: true,
    })
    res.status(200)
    res.json(cloth)
  } catch (error) {
    throw error
  }
}
