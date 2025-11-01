"use client"

import React, { createContext, useState, useCallback, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

  // Register
  const register = useCallback(async (name, email, password, phone, role = "rider") => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone, role }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message)
      }

      setToken(data.token)
      setUser(data.user)
      localStorage.setItem("token", data.token)

      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Login
  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message)
      }

      setToken(data.token)
      setUser(data.user)
      localStorage.setItem("token", data.token)

      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Logout
  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
  }, [])

  // Get current user
  const getCurrentUser = useCallback(async () => {
    if (!token) return

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
      }
    } catch (err) {
      console.error("Failed to fetch current user:", err)
      logout()
    }
  }, [token])

  // Fetch user on mount if token exists
  useEffect(() => {
    if (token && !user) {
      getCurrentUser()
    }
  }, [token, user, getCurrentUser])

  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
