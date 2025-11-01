import express from "express"
import {
  startRental,
  endRental,
  getRiderRentals,
  getOwnerRentals,
  rateRental,
  getRentalDetails,
  cancelRental,
} from "../controllers/rentalController.js"
import { protect, authorize } from "../middleware/auth.js"

const router = express.Router()

// Protected routes
router.post("/start", protect, authorize("rider"), startRental)
router.post("/end", protect, endRental)
router.get("/rider/history", protect, authorize("rider"), getRiderRentals)
router.get("/owner/history", protect, authorize("owner"), getOwnerRentals)
router.put("/:id/rate", protect, rateRental)
router.get("/:id", protect, getRentalDetails)
router.put("/:id/cancel", protect, cancelRental)

export default router
