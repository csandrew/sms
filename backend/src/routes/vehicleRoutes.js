import express from "express"
import {
  createVehicle,
  getVehicles,
  getVehiclesByCenter,
  getVehicle,
  updateVehicle,
  updateBatteryLevel,
  updateGPSCoordinates,
  getOwnerVehicles,
  deleteVehicle,
} from "../controllers/vehicleController.js"
import { protect, authorize } from "../middleware/auth.js"

const router = express.Router()

// Public routes
router.get("/", getVehicles)
router.get("/center/:centerId", getVehiclesByCenter)
router.get("/:id", getVehicle)

// Owner routes
router.post("/", protect, authorize("owner"), createVehicle)
router.put("/:id", protect, authorize("owner"), updateVehicle)
router.put("/:id/battery", protect, updateBatteryLevel)
router.put("/:id/gps", protect, updateGPSCoordinates)
router.get("/owner/my-vehicles", protect, authorize("owner"), getOwnerVehicles)
router.delete("/:id", protect, authorize("owner"), deleteVehicle)

export default router
