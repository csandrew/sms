"use client"

import { useState, useEffect } from "react"
import { Clock, DollarSign, Star } from "lucide-react"

export const RideHistory = ({ userRole = "rider" }) => {
  const [rentals, setRentals] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetchRentals()
  }, [page])

  const fetchRentals = async () => {
    setLoading(true)
    try {
      const endpoint = userRole === "rider" ? "/rentals/rider/history" : "/rentals/owner/history"
      const response = await fetch(`${API_URL}${endpoint}?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        setRentals(data.rentals)
      }
    } catch (error) {
      console.error("Failed to fetch rentals:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ride History</h2>

      {loading ? (
        <p className="text-gray-500">Loading rides...</p>
      ) : rentals.length === 0 ? (
        <p className="text-gray-500">No rides yet</p>
      ) : (
        <div className="space-y-4">
          {rentals.map((rental) => (
            <div key={rental._id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-gray-900">
                    {rental.vehicle?.model} ({rental.vehicle?.type})
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(rental.startTime).toLocaleDateString()} at{" "}
                    {new Date(rental.startTime).toLocaleTimeString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    rental.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : rental.status === "active"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {rental.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{rental.durationMinutes} min</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>${rental.pricing?.totalFare?.toFixed(2)}</span>
                </div>
              </div>

              {rental.rating && (
                <div className="flex items-center gap-1 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rental.rating.score ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-gray-600 ml-2">{rental.rating.comment}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
