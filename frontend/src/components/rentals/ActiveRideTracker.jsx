"use client"

import { useState, useEffect } from "react"
import { MapPin, Clock, DollarSign, AlertCircle } from "lucide-react"

export const ActiveRideTracker = ({ rentalId, onEndRide }) => {
  const [rental, setRental] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [estimatedFare, setEstimatedFare] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  const token = localStorage.getItem("token")

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (rental?.pricing?.pricePerMinute) {
      const minutes = Math.ceil(elapsedTime / 60)
      setEstimatedFare(minutes * rental.pricing.pricePerMinute)
    }
  }, [elapsedTime, rental])

  const handleEndRide = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`${API_URL}/rentals/end`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rentalId,
          endCenterId: rental.startCenter._id,
          endCoordinates: rental.startCoordinates,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message)
      }

      onEndRide(data.rental)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m ${secs}s`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Time */}
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-xs text-gray-600">Elapsed Time</p>
              <p className="text-lg font-bold text-gray-900">{formatTime(elapsedTime)}</p>
            </div>
          </div>

          {/* Estimated Fare */}
          <div className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-green-600" />
            <div>
              <p className="text-xs text-gray-600">Estimated Fare</p>
              <p className="text-lg font-bold text-gray-900">${estimatedFare.toFixed(2)}</p>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-purple-600" />
            <div>
              <p className="text-xs text-gray-600">Vehicle</p>
              <p className="text-lg font-bold text-gray-900">{rental?.vehicle?.model}</p>
            </div>
          </div>

          {/* End Ride Button */}
          <button
            onClick={handleEndRide}
            disabled={loading}
            className="bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 w-full md:w-auto"
          >
            {loading ? "Ending..." : "End Ride"}
          </button>
        </div>
      </div>
    </div>
  )
}
