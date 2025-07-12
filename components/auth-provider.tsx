"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (email: string, password: string, name: string) => Promise<boolean>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session without Firebase for now
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)

    try {
      // Mock authentication - replace with real Firebase auth later
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email === "admin@example.com" && password === "admin123") {
        const adminUser = { id: "1", email, name: "Admin User", role: "admin" as const }
        setUser(adminUser)
        localStorage.setItem("user", JSON.stringify(adminUser))
        return true
      } else if (email === "user@example.com" && password === "user123") {
        const regularUser = { id: "2", email, name: "Regular User", role: "user" as const }
        setUser(regularUser)
        localStorage.setItem("user", JSON.stringify(regularUser))
        return true
      } else if (email && password.length >= 6) {
        // Allow any valid email/password combination for demo
        const demoUser = { id: Date.now().toString(), email, name: email.split("@")[0], role: "user" as const }
        setUser(demoUser)
        localStorage.setItem("user", JSON.stringify(demoUser))
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true)

    try {
      // Mock registration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser = { id: Date.now().toString(), email, name, role: "user" as const }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, register, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
