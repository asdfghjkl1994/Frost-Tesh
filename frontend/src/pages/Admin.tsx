"use client"

import { useState } from "react"
import { Routes, Route, Link, useLocation } from "react-router-dom"
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

const AdminDashboard = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-[#d4a43c]">แดชบอร์ด</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-[#3a3a3a] rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">การจองทั้งหมด</p>
            <p className="text-2xl font-bold text-white mt-1">156</p>
          </div>
          <div className="bg-blue-600 p-3 rounded-lg">
            <FaCalendarCheck className="text-white" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-[#3a3a3a] rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">คำขอฉุกเฉิน</p>
            <p className="text-2xl font-bold text-white mt-1">8</p>
          </div>
          <div className="bg-red-600 p-3 rounded-lg">
            <FaExclamationTriangle className="text-white" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-[#3a3a3a] rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">ผู้ใช้ทั้งหมด</p>
            <p className="text-2xl font-bold text-white mt-1">89</p>
          </div>
          <div className="bg-green-600 p-3 rounded-lg">
            <FaUsers className="text-white" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-[#3a3a3a] rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">คะแนนเฉลี่ย</p>
            <p className="text-2xl font-bold text-white mt-1">4.7</p>
          </div>
          <div className="bg-purple-600 p-3 rounded-lg">
            <FaStar className="text-white" size={24} />
          </div>
        </div>
      </div>
    </div>

    <div className="bg-[#3a3a3a] rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-[#d4a43c] mb-4">กิจกรรมล่าสุด</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-[#2f2f2f] rounded-lg">
          <div className="flex items-center">
            <div className="p-2 rounded-lg mr-3 bg-blue-600">
              <FaCalendarCheck className="text-white" />
            </div>
            <div>
              <p className="text-white font-medium">การจองใหม่จาก สมชาย ใจดี</p>
              <p className="text-gray-400 text-sm">5 นาทีที่แล้ว</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-600 text-white">pending</span>
        </div>
      </div>
    </div>
  </div>
)

const Admin = () => {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { path: "/admin", icon: FaDashboard, label: "แดชบอร์ด", exact: true },
    { path: "/admin/bookings", icon: FaCalendarCheck, label: "การจอง" },
    { path: "/admin/emergency", icon: FaExclamationTriangle, label: "เหตุฉุกเฉิน" },
    { path: "/admin/products", icon: FaBoxes, label: "สินค้า" },
    { path: "/admin/reviews", icon: FaStar, label: "รีวิว" },
    { path: "/admin/blog", icon: FaBlog, label: "บล็อก" },
    { path: "/admin/users", icon: FaUsers, label: "ผู้ใช้" },
    { path: "/admin/settings", icon: FaCog, label: "ตั้งค่า" },
  ]

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-[#222222] transform lg:translate-x-0">
        <div className="flex items-center justify-center h-16 bg-[#d4a43c]">
          <h1 className="text-xl font-bold text-white">แผงควบคุมผู้ดูแล</h1>
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
            <h2 className="text-xl font-semibold text-white">
              {menuItems.find((item) => isActive(item.path, item.exact))?.label || "Admin"}
            </h2>
            <div className="text-sm text-gray-400">{new Date().toLocaleDateString("th-TH")}</div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="bookings" element={<div className="text-white">การจอง - Coming Soon</div>} />
            <Route path="emergency" element={<div className="text-white">เหตุฉุกเฉิน - Coming Soon</div>} />
            <Route path="products" element={<div className="text-white">สินค้า - Coming Soon</div>} />
            <Route path="reviews" element={<div className="text-white">รีวิว - Coming Soon</div>} />
            <Route path="blog" element={<div className="text-white">บล็อก - Coming Soon</div>} />
            <Route path="users" element={<div className="text-white">ผู้ใช้ - Coming Soon</div>} />
            <Route path="settings" element={<div className="text-white">ตั้งค่า - Coming Soon</div>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Admin
