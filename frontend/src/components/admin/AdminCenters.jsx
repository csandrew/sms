"use client"

import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { AddCenterModal } from "./AddCenterModal"

export const AdminCenters = () => {
  const [centers, setCenters] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetchCenters()
  }, [])

  const fetchCenters = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/centers`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        setCenters(data.centers)
      }
    } catch (err) {
      console.error("Failed to fetch centers:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCenter = async (centerId) => {
    if (!window.confirm("Are you sure you want to delete this center?")) return

    try {
      const response = await fetch(`${API_URL}/centers/${centerId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        setCenters(centers.filter((c) => c._id !== centerId))
      }
    } catch (err) {
      console.error("Failed to delete center:", err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Rental Centers</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Center
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading centers...</p>
      ) : centers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 mb-4">No rental centers yet</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Create First Center
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {centers.map((center) => (
            <div key={center._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{center.name}</h3>
                  <p className="text-sm text-gray-600">
                    {center.location?.address}, {center.location?.city}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    center.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {center.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600">Capacity</p>
                  <p className="font-semibold text-gray-900">{center.capacity} vehicles</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Current Vehicles</p>
                  <p className="font-semibold text-gray-900">{center.currentVehicles}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{center.contactPhone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Hours</p>
                  <p className="font-semibold text-gray-900">
                    {center.operatingHours?.open} - {center.operatingHours?.close}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCenter(center._id)}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && <AddCenterModal onClose={() => setShowAddModal(false)} onCenterAdded={fetchCenters} />}
    </div>
  )
}
