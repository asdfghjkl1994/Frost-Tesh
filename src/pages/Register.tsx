"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useAuth } from "../hooks/useAuth"
import { useI18n } from "../hooks/useI18n"
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa"

interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const { register: registerUser } = useAuth()
  const { t } = useI18n()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>()

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)
    setError("")

    try {
      await registerUser(data.email, data.password, data.name)
      navigate("/")
    } catch (error: any) {
      console.error("Registration error:", error)
      setError(t("registrationError"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#d4a43c]">{t("register")}</h2>
            <p className="text-gray-300 mt-2">{t("registerSubtitle")}</p>
          </div>

          {error && (
            <div className="bg-red-900 bg-opacity-20 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                {t("name")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-500" />
                </div>
                <input
                  id="name"
                  type="text"
                  className="input-field pl-10"
                  placeholder={t("fullName")}
                  {...register("name", {
                    required: t("nameRequired"),
                    minLength: {
                      value: 2,
                      message: t("nameMinLength"),
                    },
                  })}
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                {t("email")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-500" />
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
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                {t("confirmPassword")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  className="input-field pl-10"
                  placeholder="••••••••"
                  {...register("confirmPassword", {
                    required: t("confirmPasswordRequired"),
                    validate: (value) => value === watch("password") || t("passwordsDoNotMatch"),
                  })}
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            <div>
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FaUserPlus /> {t("register")}
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              {t("alreadyHaveAccount")}{" "}
              <Link to="/login" className="text-[#d4a43c] hover:underline">
                {t("loginNow")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
