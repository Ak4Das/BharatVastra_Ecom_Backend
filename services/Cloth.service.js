import ClothModel from "../models/Cloth.model.js"
import { BadRequestError, NotFoundError } from "../utils/customErrorHandler.js"

export const getCloths = async (req, res) => {
  try {
    const {
      mainCategory,
      commonCategory,
      price,
      rating,
      sortBy,
      gender,
      age,
      search,
      page = 1,
      limit = 12,
    } = req.query

    const query = {}

    if (mainCategory) {
      query.mainCategory = mainCategory
    }
    if (commonCategory) {
      query.commonCategory = { $in: commonCategory.split(",") }
    }
    if (gender) {
      query.gender = gender
    }
    if (rating) {
      query.rating = { $gte: Number(rating) }
    }

    if (search) {
      query.$or = [{ commonCategory: { $in: search.split(",") } }]
    }

    if (price) {
      query.price = { $gte: Number(price) }
    }

    if (age) {
      query.mainCategory = { $in: age.split(",") }
    }

    let sortOptions = {}
    if (sortBy === "lowToHigh") {
      sortOptions.price = 1
    } else if (sortBy === "highToLow") {
      sortOptions.price = -1
    }

    const skip = (Number(page) - 1) * Number(limit)

    const [products, totalProducts] = await Promise.all([
      ClothModel.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      ClothModel.countDocuments(query),
    ])

    res.status(200).json({
      success: true,
      respondedData: products,
      pagination: {
        totalItems: totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: Number(page),
        limit: Number(limit),
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
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
    res.json({
      success: true,
      message: "Cloth fetched successfully",
      respondedData: cloth,
    })
  } catch (error) {
    throw error
  }
}

export const getNewArriveCloths = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1)
    const limit = Math.max(1, parseInt(req.query.limit) || 8)
    const search = req.query.search || ""

    const query = { newArrival: true }

    if (search.trim()) {
      query.$or = [{ commonCategory: { $in: search.split(",") } }]
    }

    const [cloths, totalItems] = await Promise.all([
      ClothModel.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      ClothModel.countDocuments(query),
    ])

    const totalPages = Math.ceil(totalItems / limit)

    res.status(200).json({
      success: true,
      message: "Clothes fetched successfully",
      respondedData: cloths,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalItems,
        hasNextPage: page < totalPages,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getDistinctCommonCategories = async (req, res) => {
  try {
    const categories = await ClothModel.distinct("commonCategory")
    res.status(200)
    res.json({
      success: true,
      message: "Categories fetched successfully",
      respondedData: categories,
    })
  } catch (error) {
    throw error
  }
}

export const getOfferOnACategory = async (req, res) => {
  try {
    const { commonCategory } = req.params
    const { page = 1, limit = 6, gender, search } = req.query

    const query = {
      commonCategory: commonCategory.toLowerCase(),
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
    }

    if (gender && gender !== "") {
      query.gender = gender.toLowerCase()
    }

    if (search && search.trim() !== "") {
      query.material = { $regex: search.trim(), $options: "i" }
    }

    const skipIndex = (parseInt(page) - 1) * parseInt(limit)

    const totalProducts = await ClothModel.countDocuments(query)
    const products = await ClothModel.find(query)
      .skip(skipIndex)
      .limit(parseInt(limit))
      .lean()

    return res.status(200).json({
      success: true,
      respondedData: products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        hasNextPage: skipIndex + products.length < totalProducts,
      },
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
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
    res.json({
      success: true,
      message: "Cloth fetched successfully",
      respondedData: cloths,
    })
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
    res.json({
      success: true,
      message: "Cloth fetched successfully",
      respondedData: cloths,
    })
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
    res.json({
      success: true,
      message: "Cloth updated successfully",
      respondedData: cloth,
    })
  } catch (error) {
    throw error
  }
}
