import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/authRoutes.js"
import vehicleRoutes from "./routes/vehicleRoutes.js"
import rentalCenterRoutes from "./routes/rentalCenterRoutes.js"
import rentalRoutes from "./routes/rentalRoutes.js"
import transactionRoutes from "./routes/transactionRoutes.js"

dotenv.config()

const app = express()

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/vehicles", vehicleRoutes)
app.use("/api/centers", rentalCenterRoutes)
app.use("/api/rentals", rentalRoutes)
app.use("/api/transactions", transactionRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
