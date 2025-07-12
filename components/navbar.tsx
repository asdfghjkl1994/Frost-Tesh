"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Calendar, AlertTriangle, BarChart3, Settings } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">ServicePro</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              หน้าแรก
            </Link>
            <Link href="/#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              บริการ
            </Link>
            <Link href="/#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              เกี่ยวกับเรา
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              ติดต่อ
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/booking">
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    จองบริการ
                  </Button>
                </Link>
                <Link href="/emergency">
                  <Button size="sm" variant="destructive">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    ฉุกเฉิน
                  </Button>
                </Link>

                {user.role === "admin" && (
                  <>
                    <Link href="/dashboard">
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/reports">
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        รายงาน
                      </Button>
                    </Link>
                  </>
                )}

                <div className="relative group">
                  <Button variant="ghost" size="sm">
                    {user.name || user.email}
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      โปรไฟล์
                    </Link>
                    <Link href="/bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      การจองของฉัน
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      ออกจากระบบ
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button asChild variant="outline" size="sm">
                  <Link href="/emergency">
                    <Phone className="h-4 w-4 mr-2" />
                    ฉุกเฉิน
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/auth/login">เข้าสู่ระบบ</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link
              href="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              หน้าแรก
            </Link>
            <Link
              href="/#services"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              บริการ
            </Link>
            <Link
              href="/#about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              เกี่ยวกับเรา
            </Link>
            <Link
              href="/#contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
              onClick={toggleMenu}
            >
              ติดต่อ
            </Link>

            {user ? (
              <div className="space-y-2 pt-4 border-t">
                <Link href="/booking" onClick={toggleMenu}>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    จองบริการ
                  </Button>
                </Link>
                <Link href="/emergency" onClick={toggleMenu}>
                  <Button className="w-full justify-start" variant="destructive">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    ฉุกเฉิน
                  </Button>
                </Link>

                {user.role === "admin" && (
                  <>
                    <Link href="/dashboard" onClick={toggleMenu}>
                      <Button className="w-full justify-start" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/reports" onClick={toggleMenu}>
                      <Button className="w-full justify-start" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        รายงาน
                      </Button>
                    </Link>
                  </>
                )}

                <div className="pt-2 border-t">
                  <p className="px-3 py-2 text-sm text-gray-600">{user.name || user.email}</p>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    โปรไฟล์
                  </Link>
                  <Link
                    href="/bookings"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    การจองของฉัน
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      toggleMenu()
                    }}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 pt-4 border-t">
                <Link href="/emergency" onClick={toggleMenu}>
                  <Button className="w-full justify-start" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    ฉุกเฉิน
                  </Button>
                </Link>
                <Link href="/auth/login" onClick={toggleMenu}>
                  <Button className="w-full">เข้าสู่ระบบ</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
