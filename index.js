// Connect to Database
import ConnectToDatabase from "./db/db.connect.js"
ConnectToDatabase()

// CREATE SERVER
import express from "express"
const app = express()

// CORS CODE
import cors from "cors"
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())

// ROUTES
import ClothRoutes from "./routes/Cloth.routes.js"
app.use("/cloth", ClothRoutes)

import CategoryRoutes from "./routes/Category.routes.js"
app.use("/category", CategoryRoutes)

import CreateOrderRoutes from "./routes/CreateOrder.routes.js"
app.use("/createOrder", CreateOrderRoutes)

import OrderRoutes from "./routes/Order.routes.js"
app.use("/order", OrderRoutes)

import UsersRoutes from "./routes/User.routes.js"
app.use("/user", UsersRoutes)

import { globalErrorHandler } from "./middlewares/errorMiddleware.js"
app.use(globalErrorHandler)

app.get("/loaderio-68172d438eec982d7f8651259dfb5025.txt", (req, res) => {
  res.send("loaderio-68172d438eec982d7f8651259dfb5025")
})

// START SERVER
app.listen(3000, () => {
  console.log("Server started at port : ", 3000)
})
