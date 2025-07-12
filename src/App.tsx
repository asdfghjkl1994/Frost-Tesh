"use client"

import { useEffect, lazy, Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./hooks/useAuth"
import Layout from "./components/Layout"
import LoadingScreen from "./components/LoadingScreen"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"))
const Booking = lazy(() => import("./pages/Booking"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))
const Emergency = lazy(() => import("./pages/Emergency"))
const Products = lazy(() => import("./pages/Products"))
const Reviews = lazy(() => import("./pages/Reviews"))
const Blog = lazy(() => import("./pages/Blog"))
const Admin = lazy(() => import("./pages/Admin"))
const NotFound = lazy(() => import("./pages/NotFound"))
const Demo = lazy(() => import("./pages/Demo"))

function App() {
  const { loading } = useAuth()

  useEffect(() => {
    // Load Google Maps API (optional - will work without it)
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "demo"}&libraries=places`
    script.async = true
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="blog" element={<Blog />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="demo" element={<Demo />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="booking" element={<Booking />} />
            <Route path="emergency" element={<Emergency />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="admin/*" element={<Admin />} />
          </Route>

          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
