"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useI18n } from "../hooks/useI18n"
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa"

const Navbar = () => {
  const { currentUser, isAdmin, logout } = useAuth()
  const { t, locale, setLocale } = useI18n()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Failed to log out", error)
    }
  }

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "th" : "en")
  }

  return (
    <nav className="bg-[#222222] shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="ml-2 text-xl font-bold text-[#d4a43c]">ServiceBooking</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-sm font-medium">
              หน้าหลัก
            </Link>
            <Link to="/products" className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-sm font-medium">
              สินค้า
            </Link>
            <Link to="/reviews" className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-sm font-medium">
              รีวิว
            </Link>
            <Link to="/blog" className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-sm font-medium">
              บล็อก
            </Link>
            <Link to="/booking" className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-sm font-medium">
              จองบริการ
            </Link>
            <Link to="/emergency" className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-sm font-medium">
              เหตุฉุกเฉิน
            </Link>

            <button
              onClick={toggleLanguage}
              className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-sm font-medium"
            >
              {locale === "en" ? "TH" : "EN"}
            </button>

            {currentUser ? (
              <div className="relative ml-3">
                <div className="flex items-center space-x-3">
                  {isAdmin && (
                    <Link to="/admin" className="bg-[#d4a43c] text-white px-3 py-1 rounded-md text-sm font-medium">
                      Admin
                    </Link>
                  )}
                  <button onClick={handleLogout} className="flex items-center text-white hover:text-[#d4a43c]">
                    <FaSignOutAlt className="mr-1" />
                    ออกจากระบบ
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-sm font-medium"
              >
                <FaUser className="mr-1" />
                เข้าสู่ระบบ
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#d4a43c] focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#222222] pb-4 px-4">
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              หน้าหลัก
            </Link>
            <Link
              to="/products"
              className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              สินค้า
            </Link>
            <Link
              to="/reviews"
              className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              รีวิว
            </Link>
            <Link
              to="/blog"
              className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              บล็อก
            </Link>
            <Link
              to="/booking"
              className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              จองบริการ
            </Link>
            <Link
              to="/emergency"
              className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              เหตุฉุกเฉิน
            </Link>

            {currentUser ? (
              <div className="space-y-2">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="bg-[#d4a43c] text-white px-3 py-2 rounded-md text-base font-medium block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-base font-medium w-full"
                >
                  <FaSignOutAlt className="mr-2" />
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUser className="mr-2" />
                เข้าสู่ระบบ
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
