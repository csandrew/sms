"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Vehicle = {
  _id: string
  model?: string
  pricePerMinute?: number
  description?: string
}

export default function OwnerPage() {
  const router = useRouter()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const [model, setModel] = useState("")
  const [pricePerMinute, setPricePerMinute] = useState(0)
  const [description, setDescription] = useState("")
  const [rentalCenter, setRentalCenter] = useState("")

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const token = localStorage.getItem("token")
    try {
      const [vRes, bRes] = await Promise.all([
        fetch(`${apiBase}/api/vehicles/owner/my-vehicles`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${apiBase}/api/transactions/wallet/balance`, { headers: { Authorization: `Bearer ${token}` } }),
      ])

      const vData = await vRes.json()
      const bData = await bRes.json()

      if (!vRes.ok) throw new Error(vData.message || "Failed to load vehicles")
      if (!bRes.ok) throw new Error(bData.message || "Failed to load wallet")

      setVehicles(vData.vehicles || [])
      setBalance(bData.wallet?.balance ?? 0)
    } catch (err: any) {
      setMessage(err.message || "Error fetching owner data")
    } finally {
      setLoading(false)
    }
  }

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`${apiBase}/api/vehicles`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ model, pricePerMinute, description, rentalCenter }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to add vehicle")
      setMessage("Vehicle added — awaiting approval")
      setModel("")
      setPricePerMinute(0)
      setDescription("")
      setRentalCenter("")
      fetchData()
    } catch (err: any) {
      setMessage(err.message || "Could not add vehicle")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Start Earning</h1>
        {message && <div className="mb-4 text-green-700">{message}</div>}
        {loading && <div className="mb-4">Loading...</div>}

        <div className="mb-8">
          <h2 className="text-xl font-semibold">Wallet Balance</h2>
          <p className="text-2xl">${balance ?? 0}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Your Vehicles</h2>
          {vehicles.length === 0 && <div>No vehicles yet. Add one below to begin earning.</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {vehicles.map((v) => (
              <div key={v._id} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">{v.model}</h3>
                <p className="text-sm text-gray-600">{v.description}</p>
                <p className="mt-2">Price: ${v.pricePerMinute ?? "-"}/min</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Add a Vehicle</h2>
          <p className="text-sm text-gray-600 mb-3">Provide a rental center id if you have one. Admin approval may be required.</p>
          <form onSubmit={handleAddVehicle} className="space-y-3">
            <div>
              <label className="block text-sm">Model</label>
              <input className="mt-1 w-full border rounded px-3 py-2" value={model} onChange={(e) => setModel(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm">Price Per Minute (USD)</label>
              <input
                type="number"
                className="mt-1 w-full border rounded px-3 py-2"
                value={pricePerMinute}
                onChange={(e) => setPricePerMinute(Number(e.target.value))}
                required
              />
            </div>
            <div>
              <label className="block text-sm">Rental Center ID (optional)</label>
              <input className="mt-1 w-full border rounded px-3 py-2" value={rentalCenter} onChange={(e) => setRentalCenter(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm">Description</label>
              <textarea className="mt-1 w-full border rounded px-3 py-2" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
              <button className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading} type="submit">
                {loading ? "Adding..." : "Add Vehicle"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
