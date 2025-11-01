"use client"

import { useState } from "react"
import { MapPin, AlertCircle } from "lucide-react"

export const BookingFlow = ({ vehicle, onClose }) => {
  const [step, setStep] = useState(1)
  const [selectedCenter, setSelectedCenter] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  const token = localStorage.getItem("token")

  const handleStartRide = async () => {
    if (!selectedCenter) {
      setError("Please select a rental center")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`${API_URL}/rentals/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vehicleId: vehicle._id,
          startCenterId: selectedCenter._id,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message)
      }

      setStep(3)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 rounded-t-lg">
          <h2 className="text-2xl font-bold">Book Your Ride</h2>
          <p className="text-blue-100 mt-1">Step {step} of 3</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-900">Confirm Vehicle</h3>

              <div className="border rounded-lg p-4">
                <div className="flex gap-4">
                  <img
                    src={vehicle.images?.[0] || "/placeholder.svg"}
                    alt={vehicle.model}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{vehicle.model}</h4>
                    <p className="text-sm text-gray-600 capitalize">{vehicle.type}</p>
                    <p className="text-sm text-gray-600 mt-2">License: {vehicle.licensePlate}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-lg font-bold text-blue-600">${vehicle.pricePerMinute}</span>
                      <span className="text-sm text-gray-600">/min</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Battery:</strong> {vehicle.batteryLevel}%
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  <strong>Owner:</strong> {vehicle.owner?.name}
                </p>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-900">Select Pickup Location</h3>

              <div className="space-y-3">
                <div
                  onClick={() => setSelectedCenter(vehicle.rentalCenter)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedCenter?._id === vehicle.rentalCenter._id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{vehicle.rentalCenter?.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{vehicle.rentalCenter?.location?.address}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {vehicle.rentalCenter?.location?.city}, {vehicle.rentalCenter?.location?.state}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleStartRide}
                  disabled={!selectedCenter || loading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Starting..." : "Start Ride"}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-900">Ride Started!</h3>
                <p className="text-gray-600 mt-2">Your ride is now active. Enjoy your journey!</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle</span>
                  <span className="font-semibold text-gray-900">{vehicle.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rate</span>
                  <span className="font-semibold text-gray-900">${vehicle.pricePerMinute}/min</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
