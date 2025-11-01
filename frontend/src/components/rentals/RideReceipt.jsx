"use client"

import { MapPin, Clock, User } from "lucide-react"

export const RideReceipt = ({ rental }) => {
  if (!rental) return null

  const { pricing, durationMinutes, startCenter, endCenter, vehicle, owner } = rental

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ride Receipt</h2>

      {/* Trip Details */}
      <div className="space-y-4 mb-6 pb-6 border-b">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-600">From</p>
            <p className="font-semibold text-gray-900">{startCenter?.name}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-600">To</p>
            <p className="font-semibold text-gray-900">{endCenter?.name}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-semibold text-gray-900">{durationMinutes} minutes</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <User className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-600">Vehicle</p>
            <p className="font-semibold text-gray-900">
              {vehicle?.type} - {vehicle?.model}
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Base Fare</span>
          <span className="font-semibold text-gray-900">${pricing?.baseFare?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Platform Fee (20%)</span>
          <span className="font-semibold text-gray-900">${pricing?.platformFee?.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3 flex justify-between">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-lg font-bold text-blue-600">${pricing?.totalFare?.toFixed(2)}</span>
        </div>
      </div>

      {/* Owner Info */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-600 mb-2">Vehicle Owner</p>
        <p className="font-semibold text-gray-900">{owner?.name}</p>
        <p className="text-sm text-green-600 mt-2">Owner earned: ${pricing?.ownerEarnings?.toFixed(2)}</p>
      </div>

      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
        Download Receipt
      </button>
    </div>
  )
}
