"use client"

import { useState, useEffect } from "react"
import { Edit2, Trash2, Plus, AlertCircle } from "lucide-react"
import { AddVehicleModal } from "./AddVehicleModal"

export const OwnerVehicleList = () => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [error, setError] = useState("")

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/vehicles/owner/my-vehicles`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        setVehicles(data.vehicles)
      }
    } catch (err) {
      setError("Failed to fetch vehicles")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteVehicle = async (vehicleId) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return

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
      setError("Failed to delete vehicle")
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "rented":
        return "bg-blue-100 text-blue-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Vehicles</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Vehicle
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading vehicles...</p>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 mb-4">No vehicles yet</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Add Your First Vehicle
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
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
                      className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getStatusColor(vehicle.status)}`}
                    >
                      {vehicle.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600">License Plate</p>
                      <p className="font-semibold text-gray-900">{vehicle.licensePlate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Price/Min</p>
                      <p className="font-semibold text-gray-900">${vehicle.pricePerMinute}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Battery</p>
                      <p className="font-semibold text-gray-900">{vehicle.batteryLevel}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Total Rides</p>
                      <p className="font-semibold text-gray-900">{vehicle.totalRides}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditingVehicle(vehicle)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteVehicle(vehicle._id)}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && <AddVehicleModal onClose={() => setShowAddModal(false)} onVehicleAdded={fetchVehicles} />}
    </div>
  )
}
