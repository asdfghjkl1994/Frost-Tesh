"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa"

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const from = location.state?.from?.pathname || "/"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      navigate(from, { replace: true })
    } catch (error: any) {
      console.error("Login error:", error)
      alert("เข้าสู่ระบบไม่สำเร็จ")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#d4a43c]">เข้าสู่ระบบ</h2>
            <p className="text-gray-300 mt-2">เข้าสู่ระบบเพื่อใช้บริการ</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                อีเมล
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input-field pl-10"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                รหัสผ่าน
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="input-field pl-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FaSignInAlt /> เข้าสู่ระบบ
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              ยังไม่มีบัญชี?{" "}
              <Link to="/register" className="text-[#d4a43c] hover:underline">
                สมัครสมาชิก
              </Link>
            </p>
          </div>

          <div className="mt-4 p-4 bg-blue-900 bg-opacity-20 border border-blue-500 rounded-lg">
            <p className="text-blue-400 text-sm">
              <strong>Demo Account:</strong>
              <br />
              Email: admin@example.com
              <br />
              Password: anything
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
