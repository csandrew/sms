"use client"

import { useState, useEffect } from "react"
import { Users, Zap, MapPin, DollarSign } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVehicles: 0,
    totalCenters: 0,
    platformRevenue: 0,
  })
  const [revenueData, setRevenueData] = useState([])
  const [loading, setLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetchAdminStats()
  }, [])

  const fetchAdminStats = async () => {
    setLoading(true)
    try {
      // Fetch all data in parallel
      const [usersRes, vehiclesRes, centersRes, transactionsRes] = await Promise.all([
        fetch(`${API_URL}/auth/users`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/vehicles?limit=1000`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/centers`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_URL}/transactions?type=platform_fee&limit=1000`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      const usersData = await usersRes.json()
      const vehiclesData = await vehiclesRes.json()
      const centersData = await centersRes.json()
      const transactionsData = await transactionsRes.json()

      // Calculate platform revenue
      let totalRevenue = 0
      const revenueByDay = {}

      if (transactionsData.success) {
        transactionsData.transactions.forEach((tx) => {
          totalRevenue += tx.amount
          const date = new Date(tx.createdAt).toLocaleDateString()
          if (!revenueByDay[date]) {
            revenueByDay[date] = 0
          }
          revenueByDay[date] += tx.amount
        })
      }

      const chartData = Object.entries(revenueByDay).map(([date, revenue]) => ({
        date,
        revenue: Number.parseFloat(revenue.toFixed(2)),
      }))

      setStats({
        totalUsers: usersData.success ? usersData.users?.length || 0 : 0,
        totalVehicles: vehiclesData.success ? vehiclesData.vehicles?.length || 0 : 0,
        totalCenters: centersData.success ? centersData.centers?.length || 0 : 0,
        platformRevenue: totalRevenue,
      })

      setRevenueData(chartData)
    } catch (err) {
      console.error("Failed to fetch admin stats:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <p className="text-gray-500">Loading dashboard...</p>
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
            </div>
            <Users className="w-12 h-12 text-blue-600 opacity-20" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Vehicles</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalVehicles}</p>
            </div>
            <Zap className="w-12 h-12 text-green-600 opacity-20" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rental Centers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCenters}</p>
            </div>
            <MapPin className="w-12 h-12 text-purple-600 opacity-20" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Platform Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${stats.platformRevenue.toFixed(2)}</p>
            </div>
            <DollarSign className="w-12 h-12 text-yellow-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Platform Revenue Over Time</h3>
        {revenueData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#ef4444" strokeWidth={2} name="Daily Revenue" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center py-8">No revenue data yet</p>
        )}
      </div>
    </div>
  )
}
