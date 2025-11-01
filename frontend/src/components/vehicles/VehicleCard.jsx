"use client"

import { Star, Zap, MapPin } from "lucide-react"

export const VehicleCard = ({ vehicle, onSelect }) => {
  const getBatteryColor = (level) => {
    if (level > 60) return "text-green-500"
    if (level > 30) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onSelect(vehicle)}
    >
      <div className="relative h-48 bg-gray-200">
        {vehicle.images && vehicle.images.length > 0 ? (
          <img
            src={vehicle.images[0] || "/placeholder.svg"}
            alt={vehicle.model}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
        )}
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ${vehicle.pricePerMinute}/min
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{vehicle.model}</h3>
            <p className="text-sm text-gray-500 capitalize">{vehicle.type}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{vehicle.rating}</span>
          </div>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Zap className={`w-4 h-4 ${getBatteryColor(vehicle.batteryLevel)}`} />
            <span>{vehicle.batteryLevel}% Battery</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{vehicle.rentalCenter?.name}</span>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  )
}
