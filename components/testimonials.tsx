"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { useState, useEffect } from "react"

const testimonials = [
  {
    id: 1,
    name: "คุณสมชาย วงศ์ใหญ่",
    location: "บางนา, กรุงเทพ",
    rating: 5,
    comment: "บริการดีมาก ช่างมาตรงเวลา ซ่อมแอร์ได้ดี ราคายุติธรรม แนะนำเลยครับ",
    service: "ซ่อมแอร์",
    avatar: "👨‍💼",
  },
  {
    id: 2,
    name: "คุณนิดา สุขใส",
    location: "ลาดพร้าว, กรุงเทพ",
    rating: 5,
    comment: "ประทับใจมาก ช่างสุภาพ อธิบายปัญหาให้ฟังชัดเจน งานเสร็จเรียบร้อย",
    service: "ซ่อมไฟฟ้า",
    avatar: "👩‍💼",
  },
  {
    id: 3,
    name: "คุณวิชัย เจริญสุข",
    location: "สุขุมวิท, กรุงเทพ",
    rating: 5,
    comment: "เรียกใช้บริการฉุกเฉินตอนกลางคืน มาเร็วมาก แก้ปัญหาได้ทันที ขอบคุณครับ",
    service: "บริการฉุกเฉิน",
    avatar: "👨‍🔧",
  },
  {
    id: 4,
    name: "คุณมาลี ใจดี",
    location: "รามคำแหง, กรุงเทพ",
    rating: 5,
    comment: "ล้างแอร์สะอาดมาก ช่างทำงานละเอียด บ้านเย็นขึ้นเยอะเลย คุ้มค่าจริงๆ",
    service: "ล้างแอร์",
    avatar: "👩‍🏫",
  },
  {
    id: 5,
    name: "คุณสุรชัย มั่นคง",
    location: "พระราม 9, กรุงเทพ",
    rating: 5,
    comment: "ซ่อมเครื่องซักผ้าให้ ช่างมีความรู้ดี อธิบายวิธีดูแลรักษาให้ด้วย ประทับใจ",
    service: "ซ่อมเครื่องใช้ไฟฟ้า",
    avatar: "👨‍💻",
  },
  {
    id: 6,
    name: "คุณปราณี สวยงาม",
    location: "อ่อนนุช, กรุงเทพ",
    rating: 5,
    comment: "ล้างโซล่าเซลให้ ทำงานเรียบร้อย ไฟฟ้าที่ได้เพิ่มขึ้นจริงๆ ขอบคุณค่ะ",
    service: "ล้างโซล่าเซล",
    avatar: "👩‍🎨",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(testimonials.length / 3))
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const getVisibleTestimonials = () => {
    const start = currentIndex * 3
    return testimonials.slice(start, start + 3)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4 mr-2" />
            ความคิดเห็นลูกค้า
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ลูกค้าพูดถึงเรา
            <span className="text-blue-600"> อย่างไร</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">ความพึงพอใจของลูกค้าคือสิ่งที่เราภูมิใจมากที่สุด</p>
        </div>

        {/* Overall Rating */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="flex items-center mr-6">
              <span className="text-4xl font-bold text-gray-900 mr-2">4.9</span>
              <div>
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-sm text-gray-600">จาก 5,000+ รีวิว</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <div>⭐ 99% ลูกค้าแนะนำเรา</div>
              <div>🏆 รางวัลบริการดีเด่น 2024</div>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getVisibleTestimonials().map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="text-3xl mr-4">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-200" />
                    <p className="text-gray-700 leading-relaxed pl-6">{testimonial.comment}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {testimonial.service}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">ได้รับการรับรองจาก</h3>
            <p className="text-gray-600">องค์กรและสมาคมชั้นนำ</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="bg-gray-100 h-16 rounded-lg flex items-center justify-center mb-2">
                <span className="text-lg font-bold text-gray-600">ISO 9001</span>
              </div>
              <div className="text-sm text-gray-600">มาตรฐานคุณภาพ</div>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 h-16 rounded-lg flex items-center justify-center mb-2">
                <span className="text-lg font-bold text-gray-600">สมาคมช่าง</span>
              </div>
              <div className="text-sm text-gray-600">สมาชิกรับรong</div>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 h-16 rounded-lg flex items-center justify-center mb-2">
                <span className="text-lg font-bold text-gray-600">ประกัน</span>
              </div>
              <div className="text-sm text-gray-600">ความเสี่ยง</div>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 h-16 rounded-lg flex items-center justify-center mb-2">
                <span className="text-lg font-bold text-gray-600">รางวัล</span>
              </div>
              <div className="text-sm text-gray-600">บริการดีเด่น</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
