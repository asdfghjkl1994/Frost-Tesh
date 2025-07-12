"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  currentUser: any | null
  isAdmin: boolean
  loading: boolean
  register: (email: string, password: string, name: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAdmin: false,
  loading: true,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(false)

  const register = async (email: string, password: string, name: string) => {
    // Mock registration
    const mockUser = { uid: "mock-uid", email, displayName: name }
    setCurrentUser(mockUser)
    localStorage.setItem("mockUser", JSON.stringify(mockUser))
  }

  const login = async (email: string, password: string) => {
    // Mock login
    const mockUser = { uid: "mock-uid", email, displayName: "Mock User" }
    setCurrentUser(mockUser)
    setIsAdmin(email === "admin@example.com")
    localStorage.setItem("mockUser", JSON.stringify(mockUser))
  }

  const logout = async () => {
    setCurrentUser(null)
    setIsAdmin(false)
    localStorage.removeItem("mockUser")
  }

  useEffect(() => {
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem("mockUser")
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setCurrentUser(user)
      setIsAdmin(user.email === "admin@example.com")
    }
    setLoading(false)
  }, [])

  const value = {
    currentUser,
    isAdmin,
    loading,
    register,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
