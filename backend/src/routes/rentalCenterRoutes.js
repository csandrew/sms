import express from "express"
import {
  createRentalCenter,
  getRentalCenters,
  getRentalCenter,
  updateRentalCenter,
} from "../controllers/rentalCenterController.js"
import { protect, authorize } from "../middleware/auth.js"

const router = express.Router()

// Public routes
router.get("/", getRentalCenters)
router.get("/:id", getRentalCenter)

// Admin routes
router.post("/", protect, authorize("admin"), createRentalCenter)
router.put("/:id", protect, authorize("admin"), updateRentalCenter)

export default router
