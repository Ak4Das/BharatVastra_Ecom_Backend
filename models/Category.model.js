import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "Category id is required."],
    },
    url: {
      type: String,
      required: [true, "Category related image url is required."],
    },
    name: {
      type: String,
      required: [true, "Mention category name."],
    },
    for: {
      type: String,
      required: [true, "Mention this category is for whom."],
    },
  },
  {
    timestamps: true,
  },
)

const Category = mongoose.model("Category", CategorySchema)

export default Category
