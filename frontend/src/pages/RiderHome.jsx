"use client"

import { useState } from "react"
import { MapPin, Search } from "lucide-react"
import { VehicleBrowser } from "../components/vehicles/VehicleBrowser"
import { BookingFlow } from "../components/rentals/BookingFlow"

export const RiderHome = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [showBooking, setShowBooking] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Find Your Ride</h1>
          <p className="text-blue-100 text-lg mb-8">Eco-friendly mobility at your fingertips</p>

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-lg p-4 flex gap-4">
            <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Select pickup location"
                className="flex-1 bg-transparent outline-none text-gray-900"
              />
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <VehicleBrowser
          onSelectVehicle={(vehicle) => {
            setSelectedVehicle(vehicle)
            setShowBooking(true)
          }}
        />
      </div>

      {/* Booking Modal */}
      {showBooking && selectedVehicle && (
        <BookingFlow
          vehicle={selectedVehicle}
          onClose={() => {
            setShowBooking(false)
            setSelectedVehicle(null)
          }}
        />
      )}
    </div>
  )
}
