"use client"

import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
}

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Initialize Auth and Firestore
let auth
let db

try {
  auth = getAuth(app)
  db = getFirestore(app)

  // Only connect to emulators in development and if not already connected
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    try {
      // Check if emulators are already connected
      if (!auth._delegate?._config?.emulator) {
        connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true })
      }
      if (!db._delegate?._databaseId?.projectId?.includes("localhost")) {
        connectFirestoreEmulator(db, "localhost", 8080)
      }
    } catch (error) {
      // Emulators already connected or not available
      console.log("Firebase emulators not connected:", error)
    }
  }
} catch (error) {
  console.error("Firebase initialization error:", error)
}

export { auth, db, app }
