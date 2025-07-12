"use client"

import { useState } from "react"
import { Routes, Route, Link, useLocation } from "react-router-dom"
import { useI18n } from "../hooks/useI18n"
import {
  FaDashboard,
  FaCalendarCheck,
  FaExclamationTriangle,
  FaBoxes,
  FaStar,
  FaBlog,
  FaCog,
  FaUsers,
} from "react-icons/fa"
import AdminDashboard from "../components/admin/AdminDashboard"
import AdminBookings from "../components/admin/AdminBookings"
import AdminEmergency from "../components/admin/AdminEmergency"
import AdminProducts from "../components/admin/AdminProducts"
import AdminReviews from "../components/admin/AdminReviews"
import AdminBlog from "../components/admin/AdminBlog"
import AdminUsers from "../components/admin/AdminUsers"
import AdminSettings from "../components/admin/AdminSettings"

const Admin = () => {
  const { t } = useI18n()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { path: "/admin", icon: FaDashboard, label: t("dashboard"), exact: true },
    { path: "/admin/bookings", icon: FaCalendarCheck, label: t("bookings") },
    { path: "/admin/emergency", icon: FaExclamationTriangle, label: t("emergency") },
    { path: "/admin/products", icon: FaBoxes, label: t("products") },
    { path: "/admin/reviews", icon: FaStar, label: t("reviews") },
    { path: "/admin/blog", icon: FaBlog, label: t("blog") },
    { path: "/admin/users", icon: FaUsers, label: t("users") },
    { path: "/admin/settings", icon: FaCog, label: t("settings") },
  ]

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#222222] transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center h-16 bg-[#d4a43c]">
          <h1 className="text-xl font-bold text-white">{t("adminPanel")}</h1>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-gray-300 hover:bg-[#333333] hover:text-white transition-colors ${
                  isActive(item.path, item.exact) ? "bg-[#d4a43c] text-white" : ""
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="mr-3" size={20} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <div className="bg-[#2f2f2f] shadow-lg">
          <div className="flex items-center justify-between px-6 py-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white lg:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-white">
              {menuItems.find((item) => isActive(item.path, item.exact))?.label || t("admin")}
            </h2>
            <div className="text-sm text-gray-400">{new Date().toLocaleDateString("th-TH")}</div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="emergency" element={<AdminEmergency />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Admin
