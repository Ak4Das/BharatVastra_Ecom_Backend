import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema(
  {
    addToCartItems: {
      type: [
        {
          id: {
            type: Number,
          },
          quantity: {
            type: Number,
          },
          size: {
            type: String,
          },
        },
      ],
      required: true,
    },
    addToWishlistItems: {
      type: [
        {
          id: {
            type: Number,
          },
        },
      ],
      required: true,
    },
    address: {
      type: [
        {
          area: {
            type: String,
          },
          city: {
            type: String,
          },
          country: {
            type: String,
          },
          fullName: {
            type: String,
          },
          id: {
            type: Number,
          },
          localInfo: {
            type: String,
          },
          mobNo: {
            type: String,
          },
          pinCode: {
            type: String,
          },
          selected: {
            type: Boolean,
          },
          state: {
            type: String,
          },
        },
      ],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "This email is already active."],
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

// Register middleware that executes before "save" operation
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    // "this" points to document being saved
    return
  }
  const salt = await bcrypt.genSalt(10) // A salt is random data added to a password before hashing (Here 10 is the cost factor)
  this.password = await bcrypt.hash(this.password, salt)
})

export default mongoose.model("User", UserSchema)
