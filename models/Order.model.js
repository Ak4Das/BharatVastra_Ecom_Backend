import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema(
  {
    address: {
      area: {
        type: String,
        required: [true, "area is required."],
      },
      city: {
        type: String,
        required: [true, "city is required."],
      },
      country: {
        type: String,
        required: [true, "country is required."],
      },
      fullName: {
        type: String,
        required: [true, "Full name is required."],
      },
      id: {
        type: Number,
        required: [true, "Address id is required."],
      },
      localInfo: {
        type: String,
        required: [true, "Local info is required."],
      },
      mobNo: {
        type: String,
        required: [true, "Mobile number is required."],
      },
      pinCode: {
        type: String,
        required: [true, "Pin code is required."],
      },
      selected: {
        type: Boolean,
        required: [true, "Mention address is selected or not."],
      },
      state: {
        type: String,
        required: [true, "state is required."],
      },
    },
    deliveryCharge: {
      type: Number,
      required: [true, "Delivery charge is required."],
    },
    deliveryDate: {
      type: String,
      required: [true, "Delivery date is required."],
    },
    deliveryDay: {
      type: String,
      required: [true, "Delivery day is required."],
    },
    freeDelivery: {
      type: String,
    },
    id: {
      type: Number,
      required: [true, "Order id is required."],
    },
    item: [
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
        quantity: {
          type: Number,
        },
        size: {
          type: String,
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
    orderDate: {
      type: String,
      required: [true, "Order date is required."],
    },
    orderTime: {
      type: String,
      required: [true, "Order time is required."],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required."],
    },
    sale: {
      type: String,
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required."],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User id is required."],
    },
  },
  {
    timestamps: true,
  },
)

const Order = mongoose.model("Order", OrderSchema)

export default Order
