import mongoose from "mongoose"

const rentalCenterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      address: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    gpsCoordinates: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    capacity: {
      type: Number,
      required: true,
    },
    currentVehicles: {
      type: Number,
      default: 0,
    },
    operatingHours: {
      open: String,
      close: String,
    },
    amenities: [String],
    contactPhone: String,
    contactEmail: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

export default mongoose.model("RentalCenter", rentalCenterSchema)
