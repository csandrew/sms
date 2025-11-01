"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export const OwnerAnalytics = ({ onStatsUpdate }) => {
  const [earningsData, setEarningsData] = useState([])
  const [ridesData, setRidesData] = useState([])
  const [loading, setLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/rentals/owner/history?limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()

      if (data.success) {
        // Process earnings data
        const earningsByDay = {}
        let totalEarnings = 0
        let totalRides = 0
        let totalRating = 0

        data.rentals.forEach((rental) => {
          const date = new Date(rental.startTime).toLocaleDateString()
          if (!earningsByDay[date]) {
            earningsByDay[date] = 0
          }
          earningsByDay[date] += rental.pricing?.ownerEarnings || 0
          totalEarnings += rental.pricing?.ownerEarnings || 0
          totalRides += 1
          if (rental.rating?.score) {
            totalRating += rental.rating.score
          }
        })

        const chartData = Object.entries(earningsByDay).map(([date, earnings]) => ({
          date,
          earnings: Number.parseFloat(earnings.toFixed(2)),
        }))

        setEarningsData(chartData)
        setRidesData(data.rentals.slice(0, 7))

        onStatsUpdate({
          totalVehicles: data.rentals.length > 0 ? 1 : 0,
          activeRentals: data.rentals.filter((r) => r.status === "active").length,
          totalEarnings,
          averageRating: totalRides > 0 ? totalRating / totalRides : 0,
        })
      }
    } catch (err) {
      console.error("Failed to fetch analytics:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <p className="text-gray-500">Loading analytics...</p>
  }

  return (
    <div className="space-y-8">
      {/* Earnings Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Earnings Over Time</h3>
        {earningsData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Legend />
              <Line type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={2} name="Daily Earnings" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center py-8">No earnings data yet</p>
        )}
      </div>

      {/* Recent Rides */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Rides</h3>
        {ridesData.length > 0 ? (
          <div className="space-y-4">
            {ridesData.map((ride) => (
              <div key={ride._id} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-900">Rider: {ride.rider?.name}</p>
                  <p className="text-sm text-gray-600">{new Date(ride.startTime).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">${ride.pricing?.ownerEarnings?.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">{ride.durationMinutes} minutes</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No rides yet</p>
        )}
      </div>
    </div>
  )
}
