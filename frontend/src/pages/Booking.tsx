"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPhone, FaUser, FaTools } from "react-icons/fa"

const Booking = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || "",
    phone: "",
    serviceType: "",
    description: "",
    date: "",
    time: "",
    address: "",
  })

  const services = [
    { id: "air-repair", name: "ซ่อมแอร์", price: 800 },
    { id: "air-cleaning", name: "ล้างแอร์", price: 500 },
    { id: "air-installation", name: "ติดตั้งแอร์", price: 1200 },
    { id: "electrical", name: "ซ่อมไฟฟ้า", price: 600 },
  ]

  const timeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentUser) {
      alert("กรุณาเข้าสู่ระบบก่อนจองบริการ")
      navigate("/login")
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert("จองบริการสำเร็จ! เราจะติดต่อกลับภายใน 24 ชั่วโมง")

      // Reset form
      setFormData({
        name: currentUser?.displayName || "",
        phone: "",
        serviceType: "",
        description: "",
        date: "",
        time: "",
        address: "",
      })
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่อีกครั้ง")
    } finally {
      setLoading(false)
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">กรุณาเข้าสู่ระบบ</h1>
          <p className="text-gray-600 mb-8">คุณต้องเข้าสู่ระบบก่อนจองบริการ</p>
          <button onClick={() => navigate("/login")} className="btn-primary">
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[#d4a43c] flex items-center justify-center gap-2">
                <FaCalendarAlt className="h-6 w-6" />
                จองบริการ
              </h1>
              <p className="text-gray-300 mt-2">กรอกข้อมูลเพื่อจองบริการของเรา</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  <FaUser className="inline mr-2" />
                  ชื่อ-นามสกุล *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="input-field"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  <FaPhone className="inline mr-2" />
                  เบอร์โทรศัพท์ *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="input-field"
                  placeholder="089-123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-300 mb-1">
                  <FaTools className="inline mr-2" />
                  ประเภทบริการ *
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  className="select-field"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  <option value="">เลือกบริการ</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - ฿{service.price.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                  รายละเอียด *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="textarea-field"
                  placeholder="อธิบายปัญหาที่พบ"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                    <FaCalendarAlt className="inline mr-2" />
                    วันที่ *
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className="input-field"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">
                    <FaClock className="inline mr-2" />
                    เวลา *
                  </label>
                  <select
                    id="time"
                    name="time"
                    className="select-field"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  >
                    <option value="">เลือกเวลา</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                  <FaMapMarkerAlt className="inline mr-2" />
                  ที่อยู่ *
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  className="textarea-field"
                  placeholder="ที่อยู่สำหรับให้บริการ"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">ข้อมูลผู้จอง</h3>
                <div className="flex items-center gap-2 text-blue-800">
                  <FaUser className="h-4 w-4" />
                  <span>{currentUser.displayName || currentUser.email}</span>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "จองบริการ"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
