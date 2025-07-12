"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, Users, Award, Phone, MapPin, Star, CheckCircle, Wrench, HeartHandshake } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "รับประกันงาน",
    description: "รับประกันคุณภาพงานและอะไหล่ทุกชิ้น พร้อมบริการหลังการขาย",
    color: "bg-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Clock,
    title: "ตรงเวลา",
    description: "ช่างมาตรงเวลาตามนัดหมาย พร้อมแจ้งล่วงหน้าก่อนถึง",
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Users,
    title: "ช่างมืออาชีพ",
    description: "ทีมช่างที่ผ่านการอบรมและมีประสบการณ์มากกว่า 5 ปี",
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: Award,
    title: "มาตรฐานสูง",
    description: "ใช้อะไหล่แท้และเครื่องมือคุณภาพสูง ตามมาตรฐานสากล",
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    icon: Phone,
    title: "บริการ 24/7",
    description: "พร้อมให้บริการฉุกเฉินตลอด 24 ชั่วโมง ทุกวันในสัปดาห์",
    color: "bg-red-500",
    bgColor: "bg-red-50",
  },
  {
    icon: MapPin,
    title: "ครอบคลุมทั่วกรุงเทพ",
    description: "ให้บริการทั่วกรุงเทพและปริมณฑล พร้อมทีมช่างในแต่ละพื้นที่",
    color: "bg-indigo-500",
    bgColor: "bg-indigo-50",
  },
]

const stats = [
  { number: "5,000+", label: "ลูกค้าพึงพอใจ", icon: HeartHandshake },
  { number: "15", label: "นาทีเฉลี่ย", icon: Clock },
  { number: "50+", label: "ช่างมืออาชีพ", icon: Users },
  { number: "99%", label: "ความพึงพอใจ", icon: Star },
]

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="h-4 w-4 mr-2" />
            ทำไมต้องเลือกเรา
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            คุณภาพที่
            <span className="text-blue-600"> คุณไว้วางใจ</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            เราให้ความสำคัญกับคุณภาพงานและความพึงพอใจของลูกค้าเป็นอันดับแรก
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div
                    className={`${feature.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <div className={`${feature.color} p-3 rounded-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Process Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">ขั้นตอนการให้บริการ</h3>
            <p className="text-gray-600">กระบวนการที่ง่ายและรวดเร็ว เพื่อความสะดวกของคุณ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "จองบริการ",
                description: "จองผ่านเว็บไซต์หรือโทรสอบถาม",
                icon: Phone,
              },
              {
                step: "02",
                title: "ยืนยันนัดหมาย",
                description: "เราจะติดต่อยืนยันเวลาและรายละเอียด",
                icon: CheckCircle,
              },
              {
                step: "03",
                title: "ช่างมาให้บริการ",
                description: "ช่างมืออาชีพมาตรงเวลาพร้อมเครื่องมือ",
                icon: Wrench,
              },
              {
                step: "04",
                title: "ตรวจสอบและรับประกัน",
                description: "ตรวจสอบงานและรับประกันคุณภาพ",
                icon: Shield,
              },
            ].map((process, index) => {
              const IconComponent = process.icon
              return (
                <div key={index} className="text-center relative">
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 z-0"></div>
                  )}
                  <div className="relative z-10">
                    <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      {process.step}
                    </div>
                    <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{process.title}</h4>
                    <p className="text-gray-600 text-sm">{process.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
