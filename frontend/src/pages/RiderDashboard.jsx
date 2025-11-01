"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { VehicleBrowser } from "../components/vehicles/VehicleBrowser"
import { RideHistory } from "../components/rentals/RideHistory"
import { Wallet, LogOut } from "lucide-react"

export const RiderDashboard = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("browse")
  const [walletBalance, setWalletBalance] = useState(0)

  const handleLogout = () => {
    logout()
    window.location.href = "/login"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <h1 className="font-bold text-gray-900">{user?.name}</h1>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
              <Wallet className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-600">Wallet Balance</p>
                <p className="font-bold text-blue-600">${walletBalance.toFixed(2)}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("browse")}
              className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
                activeTab === "browse"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Browse Vehicles
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
                activeTab === "history"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Ride History
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "browse" && <VehicleBrowser />}
        {activeTab === "history" && <RideHistory userRole="rider" />}
      </main>
    </div>
  )
}
