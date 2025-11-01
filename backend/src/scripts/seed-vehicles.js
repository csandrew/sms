import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Vehicle from '../models/Vehicle.js'
import RentalCenter from '../models/RentalCenter.js'

dotenv.config()

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Create a test rental center
    const center = await RentalCenter.create({
      name: "Downtown Station",
      location: "123 Main St",
      gpsCoordinates: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    })

    // Create test vehicles
    const vehicles = [
      {
        type: "scooter",
        make: "Xiaomi",
        model: "M365 Pro",
        licensePlate: "SCT-001",
        pricePerMinute: 0.50,
        batteryLevel: 100,
        status: "available",
        isApproved: true,
        rentalCenter: center._id,
        features: ["GPS tracking", "LED lights", "Anti-theft"],
        description: "Fast and reliable electric scooter"
      },
      {
        type: "bike",
        make: "Trek",
        model: "FX 3",
        licensePlate: "BK-001",
        pricePerMinute: 0.40,
        batteryLevel: 100,
        status: "available",
        isApproved: true,
        rentalCenter: center._id,
        features: ["Basket", "LED lights", "8-speed"],
        description: "Comfortable city bike"
      },
      {
        type: "scooter",
        make: "Segway",
        model: "Ninebot Max",
        licensePlate: "SCT-002",
        pricePerMinute: 0.55,
        batteryLevel: 95,
        status: "available",
        isApproved: true,
        rentalCenter: center._id,
        features: ["Long range", "Waterproof", "Cruise control"],
        description: "Premium electric scooter with long range"
      }
    ]

    await Vehicle.insertMany(vehicles)
    console.log('Added test vehicles!')

    await mongoose.disconnect()
    console.log('Done!')
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

seedData()