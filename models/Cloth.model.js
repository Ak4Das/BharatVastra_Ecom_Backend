import mongoose from "mongoose"

const ClothSchema = new mongoose.Schema(
  [
    {
      id: {
        type: Number,
        required: [true, "Product id is required."],
      },
      url: {
        type: String,
        required: [true, "Product url is required."],
      },
      name: {
        type: String,
        required: [true, "Product name is required."],
      },
      price: {
        type: Number,
        required: [true, "Product price is required."],
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
        required: [true, "Product rating is required."],
      },
      discount: {
        type: String,
        required: [true, "Mention product have discount or not."],
      },
      offer: {
        type: String,
        required: [true, "Mention product have offer or not."],
      },
      gender: {
        type: String,
        enum: ["male", "female", "unisex"],
        required: [true, "Mention product is for male or female."],
      },
      description: [
        {
          type: String,
          required: [true, "Product description is required."],
        },
      ],
      similarProducts: [
        {
          id: {
            type: Number,
            required: [true, "Similar products is required."],
          },
        },
      ],
      soldBy: {
        type: String,
        required: [true, "Mention product seller."],
      },
      shipsFrom: {
        type: String,
        required: [true, "Mention product ships from."],
      },
      category: {
        type: String,
        required: [true, "Mention product category."],
      },
      commonCategory: {
        type: String,
        required: [true, "Mention common category of product."],
      },
      mainCategory: [
        {
          type: String,
          required: [true, "Mention main category of product."],
        },
      ],
      material: {
        type: String,
        required: [true, "Product material is required."],
      },
      deliveryCharge: {
        type: Number,
        required: [true, "Mention delivery charge of the product."],
      },
      freeDelivery: {
        type: Boolean,
        required: [true, "Mention free delivery is available or not."],
      },
      newArrival: {
        type: Boolean,
        required: [true, "Mention product is new arrival or not."],
      },
      productDetails: {
        topHighlights: {
          type: mongoose.Schema.Types.Mixed,
          required: [true, "Top highlights is required."],
        },
        additionalInformation: {
          type: mongoose.Schema.Types.Mixed,
          required: [true, "Additional information is required."],
        },
        itemDetails: {
          type: mongoose.Schema.Types.Mixed,
          required: [true, "Item details is required."],
        },
        style: {
          type: mongoose.Schema.Types.Mixed,
          required: [true, "Product style is required"],
        },
      },
    },
  ],
  {
    timestamps: true,
  },
)

const Cloth = mongoose.model("Cloth", ClothSchema)

export default Cloth
