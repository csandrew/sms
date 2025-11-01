import Vehicle from "../models/Vehicle.js"
import RentalCenter from "../models/RentalCenter.js"

// Create Vehicle (Owner)
export const createVehicle = async (req, res) => {
  try {
    const { type, model, licensePlate, pricePerMinute, rentalCenter, features, description, images } = req.body

    // Validate rental center exists
    const center = await RentalCenter.findById(rentalCenter)
    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Rental center not found",
      })
    }

    const vehicle = await Vehicle.create({
      owner: req.user.id,
      type,
      model,
      licensePlate,
      pricePerMinute,
      rentalCenter,
      features,
      description,
      images,
      gpsCoordinates: {
        latitude: center.gpsCoordinates.latitude,
        longitude: center.gpsCoordinates.longitude,
      },
    })

    res.status(201).json({
      success: true,
      vehicle,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get All Vehicles (with filters)
export const getVehicles = async (req, res) => {
  try {
    const { type, status, rentalCenter, minPrice, maxPrice, page = 1, limit = 10 } = req.query

    const filter = { isApproved: true }

    if (type) filter.type = type
    if (status) filter.status = status
    if (rentalCenter) filter.rentalCenter = rentalCenter
    if (minPrice || maxPrice) {
      filter.pricePerMinute = {}
      if (minPrice) filter.pricePerMinute.$gte = minPrice
      if (maxPrice) filter.pricePerMinute.$lte = maxPrice
    }

    const skip = (page - 1) * limit

    const vehicles = await Vehicle.find(filter)
      .populate("owner", "name profileImage")
      .populate("rentalCenter", "name location gpsCoordinates")
      .skip(skip)
      .limit(Number.parseInt(limit))
      .sort({ createdAt: -1 })

    const total = await Vehicle.countDocuments(filter)

    res.status(200).json({
      success: true,
      vehicles,
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

// Get Vehicles by Center
export const getVehiclesByCenter = async (req, res) => {
  try {
    const { centerId } = req.params
    const { status } = req.query

    const filter = { rentalCenter: centerId, isApproved: true }
    if (status) filter.status = status

    const vehicles = await Vehicle.find(filter).populate("owner", "name profileImage").sort({ status: 1 })

    res.status(200).json({
      success: true,
      vehicles,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get Single Vehicle
export const getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)
      .populate("owner", "name profileImage phone")
      .populate("rentalCenter", "name location gpsCoordinates")

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      })
    }

    res.status(200).json({
      success: true,
      vehicle,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Update Vehicle (Owner)
export const updateVehicle = async (req, res) => {
  try {
    let vehicle = await Vehicle.findById(req.params.id)

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      })
    }

    // Check ownership
    if (vehicle.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this vehicle",
      })
    }

    const { pricePerMinute, description, features, images, status } = req.body

    vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { pricePerMinute, description, features, images, status },
      { new: true, runValidators: true },
    )

    res.status(200).json({
      success: true,
      vehicle,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Update Battery Level
export const updateBatteryLevel = async (req, res) => {
  try {
    const { batteryLevel } = req.body

    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, { batteryLevel }, { new: true })

    res.status(200).json({
      success: true,
      vehicle,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Update GPS Coordinates
export const updateGPSCoordinates = async (req, res) => {
  try {
    const { latitude, longitude } = req.body

    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      {
        gpsCoordinates: { latitude, longitude },
      },
      { new: true },
    )

    res.status(200).json({
      success: true,
      vehicle,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get Owner's Vehicles
export const getOwnerVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ owner: req.user.id })
      .populate("rentalCenter", "name location")
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      vehicles,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Delete Vehicle (Owner)
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id)

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      })
    }

    if (vehicle.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this vehicle",
      })
    }

    await Vehicle.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
