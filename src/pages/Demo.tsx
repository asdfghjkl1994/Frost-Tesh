"use client"

import { useState } from "react"
import { useI18n } from "../hooks/useI18n"
import Home from "./Home"
import Booking from "./Booking"
import Emergency from "./Emergency"
import Products from "./Products"
import Reviews from "./Reviews"
import Blog from "./Blog"
import Login from "./Login"
import {
  FaHome,
  FaCalendarCheck,
  FaExclamationTriangle,
  FaBoxes,
  FaStar,
  FaBlog,
  FaSignInAlt,
  FaDesktop,
  FaMobile,
  FaTablet,
} from "react-icons/fa"

const Demo = () => {
  const { t } = useI18n()
  const [currentPage, setCurrentPage] = useState("home")
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")

  const pages = [
    { id: "home", name: t("home"), icon: FaHome, component: Home },
    { id: "booking", name: t("booking"), icon: FaCalendarCheck, component: Booking },
    { id: "emergency", name: t("emergency"), icon: FaExclamationTriangle, component: Emergency },
    { id: "products", name: t("products"), icon: FaBoxes, component: Products },
    { id: "reviews", name: t("reviews"), icon: FaStar, component: Reviews },
    { id: "blog", name: t("blog"), icon: FaBlog, component: Blog },
    { id: "login", name: t("login"), icon: FaSignInAlt, component: Login },
  ]

  const CurrentComponent = pages.find((page) => page.id === currentPage)?.component || Home

  const getDeviceStyles = () => {
    switch (device) {
      case "mobile":
        return "w-[375px] h-[667px]"
      case "tablet":
        return "w-[768px] h-[1024px]"
      case "desktop":
      default:
        return "w-full h-full"
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Demo Header */}
      <div className="bg-[#2f2f2f] border-b border-gray-600 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-[#d4a43c] mb-4">Service Booking App - Live Demo</h1>

          {/* Page Navigation */}
          <div className="flex flex-wrap gap-2 mb-4">
            {pages.map((page) => {
              const Icon = page.icon
              return (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(page.id)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    currentPage === page.id
                      ? "bg-[#d4a43c] text-white"
                      : "bg-[#3a3a3a] text-gray-300 hover:bg-[#444444] hover:text-white"
                  }`}
                >
                  <Icon className="mr-2" size={16} />
                  {page.name}
                </button>
              )
            })}
          </div>

          {/* Device Controls */}
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm font-medium">Device:</span>
            <button
              onClick={() => setDevice("desktop")}
              className={`p-2 rounded ${device === "desktop" ? "bg-[#d4a43c] text-white" : "text-gray-400 hover:text-white"}`}
            >
              <FaDesktop />
            </button>
            <button
              onClick={() => setDevice("tablet")}
              className={`p-2 rounded ${device === "tablet" ? "bg-[#d4a43c] text-white" : "text-gray-400 hover:text-white"}`}
            >
              <FaTablet />
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={`p-2 rounded ${device === "mobile" ? "bg-[#d4a43c] text-white" : "text-gray-400 hover:text-white"}`}
            >
              <FaMobile />
            </button>
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="p-4">
        <div className="flex justify-center items-start">
          <div
            className={`${getDeviceStyles()} ${
              device !== "desktop" ? "border-4 border-gray-600 rounded-lg shadow-2xl" : ""
            } bg-white overflow-hidden transition-all duration-300`}
            style={{
              maxHeight: "80vh",
            }}
          >
            <div className="w-full h-full overflow-auto">
              <CurrentComponent />
            </div>
          </div>
        </div>
      </div>

      {/* Demo Info */}
      <div className="bg-[#2f2f2f] border-t border-gray-600 p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold text-[#d4a43c] mb-4">Features Demonstrated</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#3a3a3a] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">🎨 Modern UI/UX</h3>
              <p className="text-gray-300 text-sm">
                Dark theme with gold accents, responsive design, smooth animations
              </p>
            </div>
            <div className="bg-[#3a3a3a] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">🔐 Authentication</h3>
              <p className="text-gray-300 text-sm">Firebase Auth with email/password, protected routes</p>
            </div>
            <div className="bg-[#3a3a3a] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">📱 Responsive Design</h3>
              <p className="text-gray-300 text-sm">Mobile-first approach, works on all devices</p>
            </div>
            <div className="bg-[#3a3a3a] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">🗺️ Google Maps</h3>
              <p className="text-gray-300 text-sm">Location picker for service bookings</p>
            </div>
            <div className="bg-[#3a3a3a] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">🌐 Multi-language</h3>
              <p className="text-gray-300 text-sm">Thai and English language support</p>
            </div>
            <div className="bg-[#3a3a3a] rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">⚡ Real-time</h3>
              <p className="text-gray-300 text-sm">Firebase Firestore for real-time data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Demo
