"use client"

import { useState, useEffect } from "react"
import { DollarSign, TrendingUp } from "lucide-react"

export const OwnerEarnings = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalEarnings, setTotalEarnings] = useState(0)
  const [thisMonthEarnings, setThisMonthEarnings] = useState(0)

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetchEarnings()
  }, [])

  const fetchEarnings = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/transactions?type=owner_earnings&limit=50`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()

      if (data.success) {
        setTransactions(data.transactions)

        // Calculate totals
        let total = 0
        let thisMonth = 0
        const now = new Date()
        const currentMonth = now.getMonth()
        const currentYear = now.getFullYear()

        data.transactions.forEach((tx) => {
          total += tx.amount
          const txDate = new Date(tx.createdAt)
          if (txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear) {
            thisMonth += tx.amount
          }
        })

        setTotalEarnings(total)
        setThisMonthEarnings(thisMonth)
      }
    } catch (err) {
      console.error("Failed to fetch earnings:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${totalEarnings.toFixed(2)}</p>
            </div>
            <DollarSign className="w-12 h-12 text-green-600 opacity-20" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${thisMonthEarnings.toFixed(2)}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-blue-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Earnings History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Earnings History</h3>

        {loading ? (
          <p className="text-gray-500">Loading earnings...</p>
        ) : transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No earnings yet</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx._id}
                className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-semibold text-gray-900">{tx.description}</p>
                  <p className="text-sm text-gray-600">{new Date(tx.createdAt).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">+${tx.amount.toFixed(2)}</p>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{tx.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
