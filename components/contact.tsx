"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Mock form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      })
    }, 3000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <MessageCircle className="h-4 w-4 mr-2" />
            ติดต่อเรา
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            พร้อมให้บริการ
            <span className="text-blue-600"> ทุกเวลา</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">ติดต่อเราได้ทุกช่องทาง เราพร้อมตอบคำถามและให้คำปรึกษาฟรี</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">ช่องทางติดต่อ</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">โทรศัพท์</h4>
                    <p className="text-gray-600">02-XXX-XXXX</p>
                    <p className="text-gray-600">08X-XXX-XXXX</p>
                    <p className="text-sm text-blue-600">บริการ 24 ชั่วโมง</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">อีเมล</h4>
                    <p className="text-gray-600">info@servicepro.com</p>
                    <p className="text-gray-600">support@servicepro.com</p>
                    <p className="text-sm text-green-600">ตอบกลับภายใน 1 ชั่วโมง</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">ที่อยู่</h4>
                    <p className="text-gray-600">
                      123 ถนนสุขุมวิท แขวงคลองตัน
                      <br />
                      เขตวัฒนา กรุงเทพฯ 10110
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">เวลาทำการ</h4>
                    <p className="text-gray-600">จันทร์ - ศุกร์: 8:00 - 18:00</p>
                    <p className="text-gray-600">เสาร์ - อาทิตย์: 9:00 - 17:00</p>
                    <p className="text-sm text-red-600">ฉุกเฉิน: 24 ชั่วโมง</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">ติดต่อด่วน</h4>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    โทรเลย: 02-XXX-XXXX
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Line: @servicepro
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl">ส่งข้อความถึงเรา</CardTitle>
                <p className="text-gray-600">กรอกข้อมูลด้านล่าง เราจะติดต่อกลับภายใน 30 นาที</p>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">ส่งข้อความสำเร็จ!</h3>
                    <p className="text-gray-600">เราจะติดต่อกลับไปภายใน 30 นาที</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ-นามสกุล *</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="กรอกชื่อ-นามสกุล"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรศัพท์ *</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          placeholder="08X-XXX-XXXX"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">บริการที่สนใจ</label>
                      <select
                        value={formData.service}
                        onChange={(e) => handleChange("service", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">-- เลือกบริการ --</option>
                        <option value="aircon">ซ่อม/ล้างแอร์</option>
                        <option value="electrical">ซ่อมไฟฟ้า</option>
                        <option value="plumbing">ซ่อมประปา</option>
                        <option value="appliance">ซ่อมเครื่องใช้ไฟฟ้า</option>
                        <option value="solar">ล้างโซล่าเซล</option>
                        <option value="emergency">บริการฉุกเฉิน</option>
                        <option value="other">อื่นๆ</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">รายละเอียด *</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="อธิบายปัญหาหรือความต้องการของคุณ..."
                        rows={4}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          กำลังส่ง...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          ส่งข้อความ
                        </>
                      )}
                    </Button>

                    <p className="text-sm text-gray-500 text-center">เราจะไม่เปิดเผยข้อมูลส่วนตัวของคุณให้กับบุคคลที่สาม</p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">แผนที่ตำแหน่งสำนักงาน</p>
                  <p className="text-sm text-gray-500">123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพฯ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
