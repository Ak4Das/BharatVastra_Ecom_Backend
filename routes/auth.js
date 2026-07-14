import express from "express"
const router = express.Router()
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/User.model.js"
import auth from "../middlewares/auth.js"

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body

    const user = new User({
      name,
      email,
      password,
      addToCartItems: [],
      addToWishlistItems: [],
      address: [],
      profileImage: "",
    })
    await user.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    })
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User not found." })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password." })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    })
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
