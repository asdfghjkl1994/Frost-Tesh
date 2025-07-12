"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useI18n } from "../hooks/useI18n"
import { FaArrowRight, FaTools, FaSnowflake, FaWrench, FaShower, FaStar, FaPhone } from "react-icons/fa"

interface Service {
  id: string
  name: string
  icon: string
  description: string
  price: number
}

interface Product {
  id: string
  name: string
  imageUrl: string
  price: number
  description: string
}

const Home = () => {
  const { t } = useI18n()
  const [services] = useState<Service[]>([
    {
      id: "1",
      name: "ซ่อมแอร์",
      icon: "FaSnowflake",
      description: "บริการซ่อมแอร์ทุกยี่ห้อ โดยช่างมืออาชีพ",
      price: 800,
    },
    {
      id: "2",
      name: "ล้างแอร์",
      icon: "FaShower",
      description: "บริการล้างแอร์ ทำความสะอาดฆ่าเชื้อ",
      price: 500,
    },
    {
      id: "3",
      name: "ติดตั้งแอร์",
      icon: "FaTools",
      description: "บริการติดตั้งแอร์ รับประกันงานติดตั้ง",
      price: 1200,
    },
    {
      id: "4",
      name: "ซ่อมเครื่องใช้ไฟฟ้า",
      icon: "FaWrench",
      description: "บริการซ่อมเครื่องใช้ไฟฟ้าทุกชนิด",
      price: 600,
    },
  ])

  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "แอร์ Daikin รุ่น Inverter",
      imageUrl: "/placeholder.svg?height=300&width=300",
      price: 18500,
      description: "แอร์ Daikin ประหยัดไฟเบอร์ 5",
    },
    {
      id: "2",
      name: "แอร์ Mitsubishi Electric",
      imageUrl: "/placeholder.svg?height=300&width=300",
      price: 22900,
      description: "แอร์ Mitsubishi Electric รุ่นใหม่ล่าสุด",
    },
    {
      id: "3",
      name: "น้ำยาล้างแอร์",
      imageUrl: "/placeholder.svg?height=300&width=300",
      price: 350,
      description: "น้ำยาล้างแอร์คุณภาพสูง",
    },
    {
      id: "4",
      name: "รีโมทแอร์สากล",
      imageUrl: "/placeholder.svg?height=300&width=300",
      price: 590,
      description: "รีโมทแอร์ใช้ได้กับแอร์ทุกยี่ห้อ",
    },
  ])

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "FaSnowflake":
        return <FaSnowflake size={40} className="text-[#d4a43c]" />
      case "FaShower":
        return <FaShower size={40} className="text-[#d4a43c]" />
      case "FaTools":
        return <FaTools size={40} className="text-[#d4a43c]" />
      case "FaWrench":
        return <FaWrench size={40} className="text-[#d4a43c]" />
      default:
        return <FaTools size={40} className="text-[#d4a43c]" />
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              บริการซ่อมแอร์และ
              <span className="text-blue-600"> ล้างโซล่าเซล</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              ให้บริการซ่อมแอร์ ล้างแอร์ และล้างโซล่าเซลด้วยทีมช่างมืออาชีพ รับประกันคุณภาพ บริการถึงที่ ราคาเป็นธรรม
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/booking">
                <button className="btn-primary text-lg px-8 py-3">
                  จองบริการเลย
                  <FaArrowRight className="ml-2" />
                </button>
              </Link>
              <Link to="#services">
                <button className="btn-secondary text-lg px-8 py-3">ดูบริการทั้งหมด</button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FaStar className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">รับประกันคุณภาพ</h3>
                <p className="text-gray-600">รับประกันงานทุกชิ้น พร้อมบริการหลังการขาย</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FaPhone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">บริการรวดเร็ว</h3>
                <p className="text-gray-600">ตอบรับภายใน 24 ชั่วโมง พร้อมให้บริการ 7 วัน</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FaWrench className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">ช่างมืออาชีพ</h3>
                <p className="text-gray-600">ทีมช่างที่มีประสบการณ์และได้รับการรับรอง</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">บริการของเรา</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">เรามีบริการครบครันสำหรับการดูแลแอร์และโซล่าเซลของคุณ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{getIconComponent(service.icon)}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="text-2xl font-bold text-blue-600 mb-4">฿{service.price.toLocaleString()}</div>
                  <Link to="/booking">
                    <button className="btn-primary w-full">จองบริการ</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/booking">
              <button className="btn-primary text-lg px-8 py-3">
                จองบริการทั้งหมด
                <FaArrowRight className="ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">สินค้าแนะนำ</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">สินค้าคุณภาพสูงจากแบรนด์ชั้นนำ</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <img
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">฿{product.price.toLocaleString()}</span>
                    <Link to="/products" className="text-blue-600 hover:underline">
                      ดูรายละเอียด
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <button className="btn-primary text-lg px-8 py-3">
                ดูสินค้าทั้งหมด
                <FaArrowRight className="ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">ต้องการบริการฉุกเฉิน?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">เรามีทีมช่างพร้อมให้บริการ 24 ชั่วโมง สำหรับเหตุฉุกเฉิน</p>
          <Link to="/emergency">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 inline-flex items-center">
              บริการฉุกเฉิน
              <FaArrowRight className="ml-2" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
