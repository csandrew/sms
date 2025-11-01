"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Vehicle = {
  _id: string
  name?: string
  make?: string
  model?: string
  pricePerMinute?: number
}

export default function RiderPage() {
  const router = useRouter()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    fetchVehicles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchVehicles = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${apiBase}/api/vehicles`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to load vehicles")
      setVehicles(data.vehicles || data)
    } catch (err: any) {
      setMessage(err.message || "Error fetching vehicles")
    } finally {
      setLoading(false)
    }
  }

  const startRide = async (vehicleId: string, rentalCenterId: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    setLoading(true)
    setMessage("")
    try {
      const res = await fetch(`${apiBase}/api/rentals/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ 
          vehicleId,
          startCenter: rentalCenterId
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to start rental")
      setMessage("Ride started — enjoy!")
    } catch (err: any) {
      setMessage(err.message || "Could not start ride")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Start Riding</h1>
        {message && <div className="mb-4 text-green-700">{message}</div>}
        {loading && <div className="mb-4">Loading...</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vehicles.length === 0 && !loading && <div>No vehicles available.</div>}
          {vehicles.map((v) => (
            <div key={v._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">{v.name || `${v.make || ""} ${v.model || ""}`}</h3>
              <p className="text-sm text-gray-600">{v.pricePerMinute ? `$${v.pricePerMinute}/min` : "Price varies"}</p>
              <div className="mt-4">
                <button
                  className="bg-blue-600 text-white px-3 py-2 rounded"
                  onClick={() => startRide(v._id)}
                >
                  Start Ride
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
