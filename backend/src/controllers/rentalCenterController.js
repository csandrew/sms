import RentalCenter from "../models/RentalCenter.js"

// Create Rental Center (Admin)
export const createRentalCenter = async (req, res) => {
  try {
    const { name, location, gpsCoordinates, capacity, operatingHours, amenities, contactPhone, contactEmail } = req.body

    const center = await RentalCenter.create({
      name,
      location,
      gpsCoordinates,
      capacity,
      operatingHours,
      amenities,
      contactPhone,
      contactEmail,
    })

    res.status(201).json({
      success: true,
      center,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get All Rental Centers
export const getRentalCenters = async (req, res) => {
  try {
    const { city, isActive = true } = req.query

    const filter = {}
    if (isActive !== undefined) filter.isActive = isActive === "true"
    if (city) filter["location.city"] = city

    const centers = await RentalCenter.find(filter).sort({ name: 1 })

    res.status(200).json({
      success: true,
      centers,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get Single Rental Center
export const getRentalCenter = async (req, res) => {
  try {
    const center = await RentalCenter.findById(req.params.id)

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Rental center not found",
      })
    }

    res.status(200).json({
      success: true,
      center,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Update Rental Center (Admin)
export const updateRentalCenter = async (req, res) => {
  try {
    const center = await RentalCenter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!center) {
      return res.status(404).json({
        success: false,
        message: "Rental center not found",
      })
    }

    res.status(200).json({
      success: true,
      center,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
