"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Snowflake, Zap, Droplets, Wrench, Sun, Home, Clock, Star, CheckCircle, Phone } from "lucide-react"
import Link from "next/link"

const services = [
  {
    id: "aircon",
    title: "บริการแอร์",
    description: "ซ่อม ล้าง ติดตั้ง และบำรุงรักษาเครื่องปรับอากาศทุกยี่ห้อ",
    icon: Snowflake,
    price: "เริ่มต้น ฿500",
    features: ["ซ่อมแอร์เสีย", "ล้างแอร์", "เติมน้ำยา", "ติดตั้งแอร์ใหม่"],
    popular: true,
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    id: "electrical",
    title: "บริการไฟฟ้า",
    description: "ซ่อมไฟฟ้า ติดตั้งระบบไฟฟ้า และตรวจสอบความปลอดภัย",
    icon: Zap,
    price: "เริ่มต้น ฿300",
    features: ["ซ่อมไฟดับ", "เปลี่ยนสวิตช์", "ติดตั้งโคมไฟ", "ตรวจสอบระบบ"],
    popular: false,
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
  },
  {
    id: "plumbing",
    title: "บริการประปา",
    description: "ซ่อมประปา ท่อน้ำ และระบบสุขาภิบาลในบ้าน",
    icon: Droplets,
    price: "เริ่มต้น ฿400",
    features: ["ซ่อมท่อรั่ว", "ซ่อมก๊อกน้ำ", "ล้างท่อตัน", "ติดตั้งอุปกรณ์"],
    popular: false,
    color: "bg-blue-400",
    bgColor: "bg-blue-50",
    textColor: "text-blue-500",
  },
  {
    id: "appliance",
    title: "เครื่องใช้ไฟฟ้า",
    description: "ซ่อมเครื่องใช้ไฟฟ้าในบ้าน เครื่องซักผ้า ตู้เย็น",
    icon: Wrench,
    price: "เริ่มต้น ฿600",
    features: ["ซ่อมตู้เย็น", "ซ่อมเครื่องซักผ้า", "ซ่อมไมโครเวฟ", "บำรุงรักษา"],
    popular: false,
    color: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    id: "solar",
    title: "โซล่าเซล",
    description: "ล้าง บำรุงรักษา และตรวจสอบระบบโซล่าเซล",
    icon: Sun,
    price: "เริ่มต้น ฿1,200",
    features: ["ล้างแผงโซล่า", "ตรวจสอบระบบ", "ซ่อมอินเวอร์เตอร์", "บำรุงรักษา"],
    popular: false,
    color: "bg-orange-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
  },
  {
    id: "general",
    title: "บริการทั่วไป",
    description: "งานช่างทั่วไป ซ่อมแซม และปรับปรุงบ้าน",
    icon: Home,
    price: "เริ่มต้น ฿350",
    features: ["ซ่อมประตู-หน้าต่าง", "ทาสี", "งานไม้", "งานซ่อมแซมทั่วไป"],
    popular: false,
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <Wrench className="h-4 w-4 mr-2" />
            บริการของเรา
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            บริการครบครัน
            <span className="text-blue-600"> ด้วยมาตรฐานสูง</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            เรามีทีมช่างมืออาชีพพร้อมให้บริการซ่อมแซมและบำรุงรักษา ด้วยคุณภาพที่คุณไว้วางใจ
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className="relative group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-red-500 text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      ยอดนิยม
                    </Badge>
                  </div>
                )}

                <CardHeader className={`${service.bgColor} rounded-t-lg`}>
                  <div className="flex items-center justify-between">
                    <div className={`p-3 ${service.color} rounded-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${service.textColor}`}>{service.price}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{service.title}</CardTitle>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Link href={`/booking?service=${service.id}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">จองบริการ</Button>
                    </Link>

                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      ตอบสนองภายใน 30 นาที
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Emergency Service Banner */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-red-500 to-red-600 border-0 text-white">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <Phone className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">บริการฉุกเฉิน 24 ชั่วโมง</h3>
              <p className="text-red-100 mb-6">เมื่อคุณต้องการความช่วยเหลือด่วน เราพร้อมให้บริการทุกเวลา</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/emergency">
                  <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
                    <Phone className="h-5 w-5 mr-2" />
                    โทรฉุกเฉิน: 02-XXX-XXXX
                  </Button>
                </Link>
                <Link href="/emergency">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    แจ้งเหตุฉุกเฉินออนไลน์
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
