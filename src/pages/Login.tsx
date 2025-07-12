"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useAuth } from "../hooks/useAuth"
import { useI18n } from "../hooks/useI18n"
import { FaUser, FaLock, FaSignInAlt, FaMapMarkerAlt } from "react-icons/fa"

interface LoginFormData {
  email: string
  password: string
}

const Login = () => {
  const { login } = useAuth()
  const { t } = useI18n()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const from = location.state?.from?.pathname || "/"

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    setError("")

    try {
      await login(data.email, data.password)
      navigate(from, { replace: true })
    } catch (error: any) {
      console.error("Login error:", error)
      setError(t("loginError"))
    } finally {
      setLoading(false)
    }
  }

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location shared:", position.coords.latitude, position.coords.longitude)
          localStorage.setItem(
            "userLocation",
            JSON.stringify({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }),
          )
          alert("Location shared successfully!")
        },
        (error) => {
          console.error("Error getting location:", error)
          alert("Unable to get location")
        },
      )
    } else {
      alert("Geolocation is not supported by this browser")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#d4a43c]">{t("login")}</h2>
            <p className="text-gray-300 mt-2">{t("loginSubtitle")}</p>
          </div>

          {error && (
            <div className="bg-red-900 bg-opacity-20 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                {t("email")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  className="input-field pl-10"
                  placeholder="your@email.com"
                  {...register("email", {
                    required: t("emailRequired"),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t("invalidEmail"),
                    },
                  })}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                {t("password")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  className="input-field pl-10"
                  placeholder="••••••••"
                  {...register("password", {
                    required: t("passwordRequired"),
                    minLength: {
                      value: 6,
                      message: t("passwordMinLength"),
                    },
                  })}
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div>
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FaSignInAlt /> {t("login")}
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <button onClick={shareLocation} className="btn-secondary w-full">
              <FaMapMarkerAlt /> {t("shareLocation")}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              {t("noAccount")}{" "}
              <Link to="/register" className="text-[#d4a43c] hover:underline">
                {t("registerNow")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
