"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { AdminOverview } from "../components/admin/AdminOverview"
import { AdminVehicleApproval } from "../components/admin/AdminVehicleApproval"
import { AdminCenters } from "../components/admin/AdminCenters"
import { AdminUsers } from "../components/admin/AdminUsers"
import { LogOut } from "lucide-react"

export const AdminDashboard = () => {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

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
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <h1 className="font-bold text-gray-900">{user?.name}</h1>
              <p className="text-sm text-gray-600">Administrator</p>
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

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-2 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "overview"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("vehicles")}
              className={`py-4 px-2 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "vehicles"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Vehicle Approvals
            </button>
            <button
              onClick={() => setActiveTab("centers")}
              className={`py-4 px-2 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "centers"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Rental Centers
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-2 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === "users"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Users
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "overview" && <AdminOverview />}
        {activeTab === "vehicles" && <AdminVehicleApproval />}
        {activeTab === "centers" && <AdminCenters />}
        {activeTab === "users" && <AdminUsers />}
      </main>
    </div>
  )
}
