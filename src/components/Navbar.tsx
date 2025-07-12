"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useI18n } from "../hooks/useI18n"
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa"

const Navbar = () => {
  const { currentUser, isAdmin, logout } = useAuth()
  const { t, locale, setLocale } = useI18n()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/")
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
              {t("home")}
            </Link>
            <Link to="/products" className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-sm font-medium">
              {t("products")}
            </Link>
            <Link to="/reviews" className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-sm font-medium">
              {t("reviews")}
            </Link>
            <Link to="/blog" className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-sm font-medium">
              {t("blog")}
            </Link>
            <Link to="/booking" className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-sm font-medium">
              {t("booking")}
            </Link>
            <Link to="/emergency" className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-sm font-medium">
              {t("emergency")}
            </Link>
            <Link to="/demo" className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-sm font-medium">
              Demo
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
                      {t("admin")}
                    </Link>
                  )}
                  <button onClick={handleLogout} className="flex items-center text-white hover:text-[#d4a43c]">
                    <FaSignOutAlt className="mr-1" />
                    {t("logout")}
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-sm font-medium"
              >
                <FaUser className="mr-1" />
                {t("login")}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#d4a43c] focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#222222] pb-4 px-4">
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t("home")}
            </Link>
            <Link
              to="/products"
              className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t("products")}
            </Link>
            <Link
              to="/reviews"
              className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t("reviews")}
            </Link>
            <Link
              to="/blog"
              className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t("blog")}
            </Link>
            <Link
              to="/booking"
              className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t("booking")}
            </Link>
            <Link
              to="/emergency"
              className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t("emergency")}
            </Link>
            <Link
              to="/demo"
              className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Demo
            </Link>

            <button
              onClick={() => {
                toggleLanguage()
                setIsOpen(false)
              }}
              className="text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-base font-medium text-left"
            >
              {locale === "en" ? "ภาษาไทย" : "English"}
            </button>

            {currentUser ? (
              <div className="flex flex-col space-y-2">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="bg-[#d4a43c] text-white px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("admin")}
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="flex items-center text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-base font-medium"
                >
                  <FaSignOutAlt className="mr-2" />
                  {t("logout")}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-white hover:text-[#d4a43c] px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                <FaUser className="mr-2" />
                {t("login")}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
