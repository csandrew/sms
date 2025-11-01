"use client"

import { useState, useEffect } from "react"
import { Check, X } from "lucide-react"

export const AdminVehicleApproval = () => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("pending")

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetchVehicles()
  }, [filter])

  const fetchVehicles = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/vehicles?limit=1000`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        const filtered =
          filter === "pending" ? data.vehicles.filter((v) => !v.isApproved) : data.vehicles.filter((v) => v.isApproved)
        setVehicles(filtered)
      }
    } catch (err) {
      console.error("Failed to fetch vehicles:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (vehicleId) => {
    try {
      const response = await fetch(`${API_URL}/vehicles/${vehicleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isApproved: true }),
      })

      const data = await response.json()
      if (data.success) {
        setVehicles(vehicles.filter((v) => v._id !== vehicleId))
      }
    } catch (err) {
      console.error("Failed to approve vehicle:", err)
    }
  }

  const handleReject = async (vehicleId) => {
    if (!window.confirm("Are you sure you want to reject this vehicle?")) return

    try {
      const response = await fetch(`${API_URL}/vehicles/${vehicleId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        setVehicles(vehicles.filter((v) => v._id !== vehicleId))
      }
    } catch (err) {
      console.error("Failed to reject vehicle:", err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            filter === "pending" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Pending Approval
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            filter === "approved" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Approved
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading vehicles...</p>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">{filter === "pending" ? "No pending vehicles" : "No approved vehicles"}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex gap-6">
                {vehicle.images && vehicle.images.length > 0 && (
                  <img
                    src={vehicle.images[0] || "/placeholder.svg"}
                    alt={vehicle.model}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                )}

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{vehicle.model}</h3>
                      <p className="text-sm text-gray-600 capitalize">{vehicle.type}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        vehicle.isApproved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {vehicle.isApproved ? "Approved" : "Pending"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600">Owner</p>
                      <p className="font-semibold text-gray-900">{vehicle.owner?.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">License Plate</p>
                      <p className="font-semibold text-gray-900">{vehicle.licensePlate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Price/Min</p>
                      <p className="font-semibold text-gray-900">${vehicle.pricePerMinute}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Center</p>
                      <p className="font-semibold text-gray-900">{vehicle.rentalCenter?.name}</p>
                    </div>
                  </div>

                  {vehicle.description && <p className="text-sm text-gray-600 mb-4">{vehicle.description}</p>}

                  {filter === "pending" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(vehicle._id)}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(vehicle._id)}
                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
