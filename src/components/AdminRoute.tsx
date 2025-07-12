"use client"

import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import LoadingScreen from "./LoadingScreen"

const AdminRoute = () => {
  const { currentUser, isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingScreen />
  }

  if (!currentUser || !isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default AdminRoute
