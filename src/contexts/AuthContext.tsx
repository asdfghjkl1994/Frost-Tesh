"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import {
  type User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase/config"

interface AuthContextType {
  currentUser: User | null
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
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const register = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Update profile with name
      await updateProfile(userCredential.user, { displayName: name })

      // Create user document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        isAdmin: false,
        createdAt: new Date(),
      })
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)

      if (user) {
        try {
          // Check if user is admin
          const userDoc = await getDoc(doc(db, "users", user.uid))
          if (userDoc.exists()) {
            setIsAdmin(userDoc.data().isAdmin || false)
          }
        } catch (error) {
          console.error("Error checking admin status:", error)
          setIsAdmin(false)
        }
      } else {
        setIsAdmin(false)
      }

      setLoading(false)
    })

    return unsubscribe
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
