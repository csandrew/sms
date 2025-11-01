import mongoose from "mongoose"

const rentalSchema = new mongoose.Schema(
  {
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startCenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RentalCenter",
      required: true,
    },
    endCenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RentalCenter",
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: Date,
    durationMinutes: Number,
    startCoordinates: {
      latitude: Number,
      longitude: Number,
    },
    endCoordinates: {
      latitude: Number,
      longitude: Number,
    },
    distance: Number,
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
    pricing: {
      pricePerMinute: Number,
      baseFare: Number,
      totalFare: Number,
      platformFee: Number,
      ownerEarnings: Number,
    },
    payment: {
      method: {
        type: String,
        enum: ["wallet", "card", "cash"],
        default: "wallet",
      },
      status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
      },
      transactionId: String,
    },
    rating: {
      score: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: String,
      ratedAt: Date,
    },
    notes: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

// Index for faster queries
rentalSchema.index({ rider: 1, createdAt: -1 })
rentalSchema.index({ owner: 1, createdAt: -1 })
rentalSchema.index({ vehicle: 1 })
rentalSchema.index({ status: 1 })

export default mongoose.model("Rental", rentalSchema)
