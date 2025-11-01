import Rental from "../models/Rental.js"
import Transaction from "../models/Transaction.js"
import Vehicle from "../models/Vehicle.js"
import User from "../models/User.js"
import mongoose from "mongoose" // Import mongoose

// Start Rental
export const startRental = async (req, res) => {
  try {
    const { vehicleId, startCenterId } = req.body

    // Validate vehicle exists and is available
    const vehicle = await Vehicle.findById(vehicleId)
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      })
    }

    if (vehicle.status !== "available") {
      return res.status(400).json({
        success: false,
        message: "Vehicle is not available for rental",
      })
    }

    // Create rental record
    const rental = await Rental.create({
      rider: req.user.id,
      vehicle: vehicleId,
      owner: vehicle.owner,
      startCenter: startCenterId,
      startTime: new Date(),
      startCoordinates: vehicle.gpsCoordinates,
      pricing: {
        pricePerMinute: vehicle.pricePerMinute,
      },
      status: "active",
    })

    // Update vehicle status
    await Vehicle.findByIdAndUpdate(vehicleId, { status: "rented" })

    res.status(201).json({
      success: true,
      rental: await rental.populate("vehicle owner startCenter"),
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// End Rental and Process Payment
export const endRental = async (req, res) => {
  try {
    const { rentalId, endCenterId, endCoordinates } = req.body

    const rental = await Rental.findById(rentalId)
    if (!rental) {
      return res.status(404).json({
        success: false,
        message: "Rental not found",
      })
    }

    if (rental.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Rental is not active",
      })
    }

    // Calculate duration and fare
    const endTime = new Date()
    const durationMinutes = Math.ceil((endTime - rental.startTime) / 60000)

    const baseFare = durationMinutes * rental.pricing.pricePerMinute
    const platformFee = Math.round(baseFare * 0.2 * 100) / 100 // 20% platform fee
    const ownerEarnings = Math.round(baseFare * 0.8 * 100) / 100 // 80% to owner

    // Update rental with completion details
    rental.endTime = endTime
    rental.endCenter = endCenterId
    rental.endCoordinates = endCoordinates
    rental.durationMinutes = durationMinutes
    rental.status = "completed"
    rental.pricing = {
      ...rental.pricing,
      baseFare,
      totalFare: baseFare,
      platformFee,
      ownerEarnings,
    }
    rental.payment.status = "completed"

    await rental.save()

    // Update vehicle status back to available
    await Vehicle.findByIdAndUpdate(rental.vehicle, { status: "available" })

    // Process payments
    // Deduct from rider wallet
    await User.findByIdAndUpdate(rental.rider, {
      $inc: { "wallet.balance": -baseFare },
    })

    // Add to owner wallet
    await User.findByIdAndUpdate(rental.owner, {
      $inc: { "wallet.balance": ownerEarnings },
    })

    // Create transaction records
    await Transaction.create({
      user: rental.rider,
      type: "ride_payment",
      amount: baseFare,
      status: "completed",
      rental: rentalId,
      description: `Ride payment for ${durationMinutes} minutes`,
    })

    await Transaction.create({
      user: rental.owner,
      type: "owner_earnings",
      amount: ownerEarnings,
      status: "completed",
      rental: rentalId,
      description: `Earnings from rental (80% of ${baseFare})`,
    })

    await Transaction.create({
      user: mongoose.Types.ObjectId("000000000000000000000001"), // Platform account
      type: "platform_fee",
      amount: platformFee,
      status: "completed",
      rental: rentalId,
      description: `Platform fee (20% of ${baseFare})`,
    })

    res.status(200).json({
      success: true,
      rental,
      summary: {
        durationMinutes,
        baseFare,
        platformFee,
        ownerEarnings,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get Rental History (Rider)
export const getRiderRentals = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query

    const filter = { rider: req.user.id }
    if (status) filter.status = status

    const skip = (page - 1) * limit

    const rentals = await Rental.find(filter)
      .populate("vehicle", "model type")
      .populate("owner", "name")
      .populate("startCenter", "name")
      .populate("endCenter", "name")
      .skip(skip)
      .limit(Number.parseInt(limit))
      .sort({ createdAt: -1 })

    const total = await Rental.countDocuments(filter)

    res.status(200).json({
      success: true,
      rentals,
      pagination: {
        total,
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get Rental History (Owner)
export const getOwnerRentals = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query

    const filter = { owner: req.user.id }
    if (status) filter.status = status

    const skip = (page - 1) * limit

    const rentals = await Rental.find(filter)
      .populate("vehicle", "model type")
      .populate("rider", "name profileImage")
      .populate("startCenter", "name")
      .populate("endCenter", "name")
      .skip(skip)
      .limit(Number.parseInt(limit))
      .sort({ createdAt: -1 })

    const total = await Rental.countDocuments(filter)

    res.status(200).json({
      success: true,
      rentals,
      pagination: {
        total,
        page: Number.parseInt(page),
        limit: Number.parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Rate Rental
export const rateRental = async (req, res) => {
  try {
    const { rentalId } = req.params
    const { score, comment } = req.body

    if (score < 1 || score > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      })
    }

    const rental = await Rental.findByIdAndUpdate(
      rentalId,
      {
        rating: {
          score,
          comment,
          ratedAt: new Date(),
        },
      },
      { new: true },
    )

    res.status(200).json({
      success: true,
      rental,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get Rental Details
export const getRentalDetails = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id)
      .populate("rider", "name profileImage phone")
      .populate("vehicle", "model type images")
      .populate("owner", "name profileImage")
      .populate("startCenter", "name location")
      .populate("endCenter", "name location")

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: "Rental not found",
      })
    }

    res.status(200).json({
      success: true,
      rental,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Cancel Rental
export const cancelRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id)

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: "Rental not found",
      })
    }

    if (rental.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Only active rentals can be cancelled",
      })
    }

    rental.status = "cancelled"
    await rental.save()

    // Update vehicle status back to available
    await Vehicle.findByIdAndUpdate(rental.vehicle, { status: "available" })

    res.status(200).json({
      success: true,
      rental,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
