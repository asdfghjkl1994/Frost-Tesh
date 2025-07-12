"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useI18n } from "../hooks/useI18n"
import { useAuth } from "../hooks/useAuth"
import { FaExclamationTriangle, FaUser, FaMapMarkerAlt, FaPhone, FaTools } from "react-icons/fa"

interface EmergencyFormData {
  name: string
  address: string
  area: string
  service: string
  details: string
  phone: string
}

const Emergency = () => {
  const { t } = useI18n()
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmergencyFormData>({
    defaultValues: {
      name: currentUser?.displayName || "",
      phone: "",
    },
  })

  const zones = [
    { id: "1", name: "Sattahip", active: true },
    { id: "2", name: "Bang Saray", active: true },
    { id: "3", name: "Ban Amphoe", active: true },
    { id: "4", name: "Jomtien", active: true },
    { id: "5", name: "Pattaya", active: true },
  ]

  const onSubmit = async (data: EmergencyFormData) => {
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      // Simulate emergency request submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess(t("emergencyRequestSuccess"))
      reset()
    } catch (error: any) {
      console.error("Emergency request error:", error)
      setError(t("emergencyRequestError"))
    } finally {
      setLoading(false)
    }
  }

  const emergencyServices = [
    { id: "aircon", name: t("airConditioningEmergency") },
    { id: "electrical", name: t("electricalEmergency") },
    { id: "plumbing", name: t("plumbingEmergency") },
    { id: "appliance", name: t("applianceEmergency") },
    { id: "other", name: t("otherEmergency") },
  ]

  return (
    <div className="page-container">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
            <FaExclamationTriangle className="text-white text-2xl" />
          </div>
          <h1 className="section-title text-red-500">{t("emergencyService")}</h1>
          <p className="text-gray-300">{t("emergencyServiceDescription")}</p>
        </div>

        <div className="card">
          <div className="bg-red-900 bg-opacity-20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
            <p className="font-semibold">{t("emergencyNotice")}</p>
            <p className="text-sm mt-1">{t("emergencyResponseTime")}</p>
          </div>

          {error && (
            <div className="bg-red-900 bg-opacity-20 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-900 bg-opacity-20 border border-green-500 text-green-500 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                <FaUser className="inline mr-2" />
                {t("name")} *
              </label>
              <input
                id="name"
                type="text"
                className="input-field"
                {...register("name", { required: t("nameRequired") })}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                <FaPhone className="inline mr-2" />
                {t("phone")} *
              </label>
              <input
                id="phone"
                type="tel"
                className="input-field"
                placeholder="089-123-4567"
                {...register("phone", {
                  required: t("phoneRequired"),
                  pattern: {
                    value: /^[0-9-+().\s]+$/,
                    message: t("invalidPhone"),
                  },
                })}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-300 mb-1">
                <FaMapMarkerAlt className="inline mr-2" />
                {t("serviceArea")} *
              </label>
              <select id="area" className="select-field" {...register("area", { required: t("areaRequired") })}>
                <option value="">{t("selectArea")}</option>
                {zones.map((zone) => (
                  <option key={zone.id} value={zone.name}>
                    {zone.name}
                  </option>
                ))}
              </select>
              {errors.area && <p className="mt-1 text-sm text-red-500">{errors.area.message}</p>}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                {t("address")} *
              </label>
              <textarea
                id="address"
                rows={3}
                className="textarea-field"
                placeholder={t("detailedAddress")}
                {...register("address", { required: t("addressRequired") })}
              />
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
                <FaTools className="inline mr-2" />
                {t("emergencyType")} *
              </label>
              <select
                id="service"
                className="select-field"
                {...register("service", { required: t("serviceRequired") })}
              >
                <option value="">{t("selectEmergencyType")}</option>
                {emergencyServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
              {errors.service && <p className="mt-1 text-sm text-red-500">{errors.service.message}</p>}
            </div>

            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-300 mb-1">
                {t("problemDetails")} *
              </label>
              <textarea
                id="details"
                rows={4}
                className="textarea-field"
                placeholder={t("describeProblem")}
                {...register("details", { required: t("detailsRequired") })}
              />
              {errors.details && <p className="mt-1 text-sm text-red-500">{errors.details.message}</p>}
            </div>

            <div className="bg-yellow-900 bg-opacity-20 border border-yellow-500 text-yellow-400 px-4 py-3 rounded-lg">
              <p className="text-sm">{t("emergencyFeeNotice")}</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <FaExclamationTriangle />
                  {t("submitEmergencyRequest")}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Emergency
