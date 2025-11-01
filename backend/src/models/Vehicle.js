import mongoose from "mongoose"

const vehicleSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["scooter", "bike"],
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    licensePlate: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "rented", "maintenance", "inactive"],
      default: "available",
    },
    rentalCenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RentalCenter",
      required: true,
    },
    pricePerMinute: {
      type: Number,
      required: true,
      min: 0,
    },
    batteryLevel: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },
    totalDistance: {
      type: Number,
      default: 0,
    },
    totalRides: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    gpsCoordinates: {
      latitude: Number,
      longitude: Number,
    },
    images: [String],
    description: String,
    features: [String],
    maintenanceHistory: [
      {
        date: Date,
        description: String,
        cost: Number,
      },
    ],
    isApproved: {
      type: Boolean,
      default: false,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    approvalDate: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

// Index for faster queries
vehicleSchema.index({ rentalCenter: 1, status: 1 })
vehicleSchema.index({ owner: 1 })
vehicleSchema.index({ type: 1 })

export default mongoose.model("Vehicle", vehicleSchema)
