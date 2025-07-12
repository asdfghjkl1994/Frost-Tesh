"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { FaExclamationTriangle, FaUser, FaMapMarkerAlt, FaPhone, FaTools } from "react-icons/fa"

const Emergency = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || "",
    address: "",
    area: "",
    service: "",
    details: "",
    phone: "",
  })

  const emergencyZones = [
    { id: "pattaya", name: "Pattaya" },
    { id: "jomtien", name: "Jomtien" },
    { id: "sattahip", name: "Sattahip" },
    { id: "bang-saray", name: "Bang Saray" },
    { id: "ban-amphoe", name: "Ban Amphoe" },
  ]

  const emergencyServices = [
    { id: "aircon", name: "แอร์เสีย/ไม่เย็น" },
    { id: "electrical", name: "ไฟฟ้าดับ/ลัดวงจร" },
    { id: "plumbing", name: "ท่อแตก/น้ำไม่ไหล" },
    { id: "appliance", name: "เครื่องใช้ไฟฟ้าเสีย" },
    { id: "other", name: "อื่นๆ" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentUser) {
      alert("กรุณาเข้าสู่ระบบก่อนส่งคำขอฉุกเฉิน")
      navigate("/login")
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert("ส่งคำขอฉุกเฉินสำเร็จ! ทีมงานจะติดต่อกลับโดยเร็ว")

      // Reset form
      setFormData({
        name: currentUser?.displayName || "",
        address: "",
        area: "",
        service: "",
        details: "",
        phone: "",
      })
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการส่งคำขอ กรุณาลองใหม่อีกครั้ง")
    } finally {
      setLoading(false)
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">กรุณาเข้าสู่ระบบ</h1>
          <p className="text-gray-600 mb-8">คุณต้องเข้าสู่ระบบก่อนส่งคำขอฉุกเฉิน</p>
          <button onClick={() => navigate("/login")} className="btn-primary">
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
            <FaExclamationTriangle className="text-white text-2xl" />
          </div>
          <h1 className="section-title text-red-500">บริการฉุกเฉิน</h1>
          <p className="text-gray-300">เรามีทีมช่างพร้อมให้บริการ 24 ชั่วโมง สำหรับเหตุฉุกเฉิน</p>
        </div>

        <div className="card">
          <div className="bg-red-900 bg-opacity-20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
            <p className="font-semibold">หมายเหตุ: บริการฉุกเฉินมีค่าบริการเพิ่มเติม</p>
            <p className="text-sm mt-1">ทีมงานจะติดต่อกลับภายใน 30 นาที</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                <FaUser className="inline mr-2" />
                ชื่อ *
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
              <label htmlFor="area" className="block text-sm font-medium text-gray-300 mb-1">
                <FaMapMarkerAlt className="inline mr-2" />
                พื้นที่ให้บริการ *
              </label>
              <select
                id="area"
                name="area"
                className="select-field"
                value={formData.area}
                onChange={handleChange}
                required
              >
                <option value="">เลือกพื้นที่</option>
                {emergencyZones.map((zone) => (
                  <option key={zone.id} value={zone.name}>
                    {zone.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                ที่อยู่ *
              </label>
              <textarea
                id="address"
                name="address"
                rows={3}
                className="textarea-field"
                placeholder="ที่อยู่โดยละเอียด"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
                <FaTools className="inline mr-2" />
                ประเภทเหตุฉุกเฉิน *
              </label>
              <select
                id="service"
                name="service"
                className="select-field"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">เลือกประเภทเหตุฉุกเฉิน</option>
                {emergencyServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-300 mb-1">
                รายละเอียดปัญหา *
              </label>
              <textarea
                id="details"
                name="details"
                rows={4}
                className="textarea-field"
                placeholder="อธิบายปัญหาที่เกิดขึ้นโดยละเอียด"
                value={formData.details}
                onChange={handleChange}
                required
              />
            </div>

            <div className="bg-yellow-900 bg-opacity-20 border border-yellow-500 text-yellow-400 px-4 py-3 rounded-lg">
              <p className="text-sm">บริการฉุกเฉินมีค่าบริการเพิ่มเติม 500 บาท</p>
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
                  ส่งคำขอฉุกเฉิน
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
