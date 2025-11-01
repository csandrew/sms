"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { OwnerVehicleList } from "../components/owner/OwnerVehicleList"
import { OwnerAnalytics } from "../components/owner/OwnerAnalytics"
import { OwnerEarnings } from "../components/owner/OwnerEarnings"
import { LogOut, TrendingUp, Zap, DollarSign } from "lucide-react"

export const OwnerDashboard = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeRentals: 0,
    totalEarnings: 0,
    averageRating: 0,
  })

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
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <h1 className="font-bold text-gray-900">{user?.name}</h1>
              <p className="text-sm text-gray-600">Vehicle Owner</p>
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
      </header>

      {/* Stats Cards */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Vehicles</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalVehicles}</p>
                </div>
                <Zap className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Rentals</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeRentals}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">${stats.totalEarnings.toFixed(2)}</p>
                </div>
                <DollarSign className="w-12 h-12 text-purple-600 opacity-20" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.averageRating.toFixed(1)}</p>
                </div>
                <span className="text-4xl">⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("vehicles")}
              className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
                activeTab === "vehicles"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              My Vehicles
            </button>
            <button
              onClick={() => setActiveTab("earnings")}
              className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
                activeTab === "earnings"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Earnings
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "overview" && <OwnerAnalytics onStatsUpdate={setStats} />}
        {activeTab === "vehicles" && <OwnerVehicleList />}
        {activeTab === "earnings" && <OwnerEarnings />}
      </main>
    </div>
  )
}
