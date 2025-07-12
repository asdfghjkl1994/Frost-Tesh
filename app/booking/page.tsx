"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, Phone, Mail, MapPin, Wrench } from "lucide-react"

const services = [
  { id: "plumbing", name: "ประปา", price: "500-2000", icon: "🔧" },
  { id: "electrical", name: "ไฟฟ้า", price: "800-3000", icon: "⚡" },
  { id: "aircon", name: "แอร์", price: "1000-5000", icon: "❄️" },
  { id: "cleaning", name: "ทำความสะอาด", price: "300-1500", icon: "🧹" },
  { id: "painting", name: "ทาสี", price: "2000-10000", icon: "🎨" },
  { id: "carpentry", name: "ช่างไม้", price: "1000-8000", icon: "🔨" },
]

export default function BookingPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const [bookingData, setBookingData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      // Mock booking submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Send notification (mock)
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          data: bookingData,
        }),
      }).catch(console.error)

      router.push("/booking/success")
    } catch (error) {
      console.error("Booking error:", error)
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
    } finally {
      setLoading(false)
    }
  }

  const selectedService = services.find((s) => s.id === bookingData.service)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i <= step ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {i}
                </div>
                {i < 3 && <div className={`w-16 h-1 mx-2 ${i < step ? "bg-blue-600" : "bg-gray-300"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>เลือกบริการ</span>
            <span>เลือกวันเวลา</span>
            <span>ข้อมูลติดต่อ</span>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              จองบริการ - ขั้นตอนที่ {step}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Service Selection */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">เลือกประเภทบริการ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleInputChange("service", service.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        bookingData.service === service.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{service.icon}</span>
                        <div>
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-gray-600">฿{service.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {bookingData.service && (
                  <div className="mt-6">
                    <Label htmlFor="description">รายละเอียดเพิ่มเติม</Label>
                    <Textarea
                      id="description"
                      placeholder="อธิบายปัญหาหรือความต้องการ..."
                      value={bookingData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Date & Time Selection */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">เลือกวันและเวลา</h3>

                {selectedService && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{selectedService.icon}</span>
                      <div>
                        <h4 className="font-medium">{selectedService.name}</h4>
                        <p className="text-sm text-gray-600">฿{selectedService.price}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      วันที่
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="time" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      เวลา
                    </Label>
                    <Select value={bookingData.time} onValueChange={(value) => handleInputChange("time", value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="เลือกเวลา" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00 น.</SelectItem>
                        <SelectItem value="10:00">10:00 น.</SelectItem>
                        <SelectItem value="11:00">11:00 น.</SelectItem>
                        <SelectItem value="13:00">13:00 น.</SelectItem>
                        <SelectItem value="14:00">14:00 น.</SelectItem>
                        <SelectItem value="15:00">15:00 น.</SelectItem>
                        <SelectItem value="16:00">16:00 น.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact Information */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">ข้อมูลติดต่อ</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      ชื่อ-นามสกุล
                    </Label>
                    <Input
                      id="name"
                      value={bookingData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="กรอกชื่อ-นามสกุล"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      เบอร์โทรศัพท์
                    </Label>
                    <Input
                      id="phone"
                      value={bookingData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="08X-XXX-XXXX"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    อีเมล
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    ที่อยู่
                  </Label>
                  <Textarea
                    id="address"
                    value={bookingData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="กรอกที่อยู่สำหรับให้บริการ"
                    className="mt-2"
                  />
                </div>

                {/* Booking Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">สรุปการจอง</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>บริการ:</strong> {selectedService?.name}
                    </p>
                    <p>
                      <strong>วันที่:</strong> {bookingData.date}
                    </p>
                    <p>
                      <strong>เวลา:</strong> {bookingData.time} น.
                    </p>
                    <p>
                      <strong>ราคาประมาณ:</strong> ฿{selectedService?.price}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handleBack} disabled={step === 1}>
                ย้อนกลับ
              </Button>

              {step < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !bookingData.service) || (step === 2 && (!bookingData.date || !bookingData.time))
                  }
                >
                  ถัดไป
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading || !bookingData.name || !bookingData.phone || !bookingData.address}
                >
                  {loading ? "กำลังจอง..." : "ยืนยันการจอง"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
