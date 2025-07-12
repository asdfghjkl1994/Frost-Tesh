"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Calendar, Star, Users, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const [quickBooking, setQuickBooking] = useState({
    service: "",
    phone: "",
  })

  const handleQuickBooking = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to full booking page with pre-filled data
    const params = new URLSearchParams({
      service: quickBooking.service,
      phone: quickBooking.phone,
    })
    window.location.href = `/booking?${params.toString()}`
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-green-500 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-500 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                <Star className="h-4 w-4 mr-2" />
                บริการมืออาชีพ 24/7
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                บริการซ่อม
                <span className="text-blue-600"> แอร์ & ไฟฟ้า</span>
                <br />
                ที่คุณไว้วางใจ
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                ทีมช่างมืออาชีพพร้อมให้บริการซ่อมแอร์ ไฟฟ้า ประปา และบริการบ้านอื่นๆ ด้วยคุณภาพสูงและราคายุติธรรม
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">5000+</div>
                <div className="text-sm text-gray-600">ลูกค้าพึงพอใจ</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-600">บริการฉุกเฉิน</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">15นาที</div>
                <div className="text-sm text-gray-600">เวลาตอบสนอง</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                  <Calendar className="h-5 w-5 mr-2" />
                  จองบริการทันที
                </Button>
              </Link>

              <Link href="/emergency">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-red-500 text-red-600 hover:bg-red-50"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  โทรฉุกเฉิน
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                รับประกันงาน
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                ช่างมืออาชีพ
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                ราคาโปร่งใส
              </div>
            </div>
          </div>

          {/* Right Content - Quick Booking Form */}
          <div className="lg:pl-8">
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">จองบริการด่วน</h3>
                  <p className="text-gray-600">กรอกข้อมูลเพื่อรับใบเสนอราคาฟรี</p>
                </div>

                <form onSubmit={handleQuickBooking} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">เลือกบริการ</label>
                    <select
                      value={quickBooking.service}
                      onChange={(e) => setQuickBooking({ ...quickBooking, service: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">-- เลือกบริการ --</option>
                      <option value="aircon">ซ่อม/ล้างแอร์</option>
                      <option value="electrical">ซ่อมไฟฟ้า</option>
                      <option value="plumbing">ซ่อมประปา</option>
                      <option value="appliance">ซ่อมเครื่องใช้ไฟฟ้า</option>
                      <option value="solar">ล้างโซล่าเซล</option>
                      <option value="other">อื่นๆ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรศัพท์</label>
                    <Input
                      type="tel"
                      value={quickBooking.phone}
                      onChange={(e) => setQuickBooking({ ...quickBooking, phone: e.target.value })}
                      placeholder="08X-XXX-XXXX"
                      className="h-12"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg">
                    รับใบเสนอราคาฟรี
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      หรือโทรสอบถาม: <span className="font-semibold text-blue-600">02-XXX-XXXX</span>
                    </p>
                  </div>
                </form>

                {/* Features */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 text-blue-500 mr-2" />
                      ตรงเวลา
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 text-green-500 mr-2" />
                      ช่างมืออาชีพ
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Star className="h-4 w-4 text-yellow-500 mr-2" />
                      รับประกันงาน
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 text-red-500 mr-2" />
                      บริการ 24/7
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
