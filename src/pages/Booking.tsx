"use client"

import Link from "next/link"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { useI18n } from "../hooks/useI18n"
import { useAuth } from "../hooks/useAuth"
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPhone, FaUser, FaTools } from "react-icons/fa"

interface BookingFormData {
  name: string
  phone: string
  serviceType: string
  description: string
  date: string
  time: string
  address: string
}

const Booking = () => {
  const { t } = useI18n()
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const mapRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<BookingFormData>({
    defaultValues: {
      name: currentUser?.displayName || "",
    },
  })

  const services = [
    { id: "air-repair", name: "ซ่อมแอร์", price: 800 },
    { id: "air-cleaning", name: "ล้างแอร์", price: 500 },
    { id: "air-maintenance", name: "บำรุงรักษาแอร์", price: 600 },
    { id: "solar-cleaning", name: "ล้างโซล่าเซล", price: 1200 },
    { id: "solar-maintenance", name: "บำรุงรักษาโซล่าเซล", price: 1500 },
  ]

  const onSubmit = async (data: BookingFormData) => {
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      // Simulate booking submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess(t("bookingSuccess"))
      reset()
      setSelectedLocation(null)
    } catch (error: any) {
      console.error("Booking error:", error)
      setError(t("bookingError"))
    } finally {
      setLoading(false)
    }
  }

  // Generate time slots
  const timeSlots = []
  for (let hour = 8; hour <= 18; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, "0")}:00`)
    if (hour < 18) {
      timeSlots.push(`${hour.toString().padStart(2, "0")}:30`)
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">กรุณาเข้าสู่ระบบ</h1>
          <p className="text-gray-600 mb-8">คุณต้องเข้าสู่ระบบก่อนจองบริการ</p>
          <Link to="/login" className="btn-primary">
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <h1 className="section-title text-center">{t("bookService")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="card">
            <h2 className="text-xl font-semibold text-[#d4a43c] mb-6">{t("bookingDetails")}</h2>

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
                  {t("name")}
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
                  {t("phone")}
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
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-300 mb-1">
                  <FaTools className="inline mr-2" />
                  {t("serviceType")}
                </label>
                <select
                  id="serviceType"
                  className="select-field"
                  {...register("serviceType", { required: t("serviceTypeRequired") })}
                >
                  <option value="">{t("selectService")}</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - ฿{service.price}
                    </option>
                  ))}
                </select>
                {errors.serviceType && <p className="mt-1 text-sm text-red-500">{errors.serviceType.message}</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                  {t("description")}
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="textarea-field"
                  placeholder={t("describeIssue")}
                  {...register("description", { required: t("descriptionRequired") })}
                />
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                    <FaCalendarAlt className="inline mr-2" />
                    {t("date")}
                  </label>
                  <input
                    id="date"
                    type="date"
                    className="input-field"
                    min={new Date().toISOString().split("T")[0]}
                    {...register("date", { required: t("dateRequired") })}
                  />
                  {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>}
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">
                    <FaClock className="inline mr-2" />
                    {t("time")}
                  </label>
                  <select id="time" className="select-field" {...register("time", { required: t("timeRequired") })}>
                    <option value="">{t("selectTime")}</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                  <FaMapMarkerAlt className="inline mr-2" />
                  {t("address")}
                </label>
                <textarea
                  id="address"
                  rows={2}
                  className="textarea-field"
                  placeholder={t("clickMapToSelect")}
                  {...register("address", { required: t("addressRequired") })}
                />
                {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  t("submitBooking")
                )}
              </button>
            </form>
          </div>

          {/* Map Placeholder */}
          <div className="card">
            <h2 className="text-xl font-semibold text-[#d4a43c] mb-6">{t("selectLocation")}</h2>
            <div ref={mapRef} className="w-full h-96 rounded-lg bg-gray-600 flex items-center justify-center">
              <div className="text-center text-gray-300">
                <FaMapMarkerAlt className="mx-auto mb-2" size={48} />
                <p>Google Maps Integration</p>
                <p className="text-sm">(Requires API Key)</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-2">{t("clickMapInstruction")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
