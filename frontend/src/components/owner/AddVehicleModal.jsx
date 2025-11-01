"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"

export const AddVehicleModal = ({ onClose, onVehicleAdded }) => {
  const [formData, setFormData] = useState({
    type: "scooter",
    model: "",
    licensePlate: "",
    pricePerMinute: "",
    rentalCenter: "",
    description: "",
    features: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [centers, setCenters] = useState([])

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  const token = localStorage.getItem("token")

  // Fetch rental centers on mount
  useState(() => {
    const fetchCenters = async () => {
      try {
        const response = await fetch(`${API_URL}/centers`)
        const data = await response.json()
        if (data.success) {
          setCenters(data.centers)
        }
      } catch (err) {
        console.error("Failed to fetch centers:", err)
      }
    }
    fetchCenters()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/vehicles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          pricePerMinute: Number.parseFloat(formData.pricePerMinute),
          features: formData.features.split(",").map((f) => f.trim()),
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message)
      }

      onVehicleAdded()
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="bg-green-600 text-white p-6 rounded-t-lg">
          <h2 className="text-2xl font-bold">Add New Vehicle</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="scooter">Electric Scooter</option>
              <option value="bike">Electric Bike</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Pro Max 2024"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
            <input
              type="text"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., ABC-1234"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Minute ($)</label>
            <input
              type="number"
              name="pricePerMinute"
              value={formData.pricePerMinute}
              onChange={handleChange}
              required
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="0.50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rental Center</label>
            <select
              name="rentalCenter"
              value={formData.rentalCenter}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select a center</option>
              {centers.map((center) => (
                <option key={center._id} value={center._id}>
                  {center.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows={2}
              placeholder="Describe your vehicle..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma-separated)</label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., GPS, Anti-theft, Fast charging"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
