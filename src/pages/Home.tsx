"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useI18n } from "../hooks/useI18n"
import { FaArrowRight, FaTools, FaSnowflake, FaWrench, FaShower } from "react-icons/fa"

interface Banner {
  id: string
  imageUrl: string
  title: string
  description: string
  link: string
}

interface Service {
  id: string
  name: string
  icon: string
  description: string
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
  const [banners, setBanners] = useState<Banner[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // For demo purposes, we'll use fallback data
        const fallbackBanners = [
          {
            id: "1",
            imageUrl: "/placeholder.svg?height=400&width=1200",
            title: "บริการซ่อมแอร์คุณภาพ",
            description: "บริการซ่อมแอร์โดยช่างมืออาชีพ รับประกันงานซ่อม",
            link: "/booking",
          },
          {
            id: "2",
            imageUrl: "/placeholder.svg?height=400&width=1200",
            title: "โปรโมชั่นล้างแอร์",
            description: "ล้างแอร์เริ่มต้นเพียง 500 บาท รับประกันความสะอาด",
            link: "/booking",
          },
        ]

        const fallbackServices = [
          {
            id: "1",
            name: "ซ่อมแอร์",
            icon: "FaSnowflake",
            description: "บริการซ่อมแอร์ทุกยี่ห้อ โดยช่างมืออาชีพ",
          },
          {
            id: "2",
            name: "ล้างแอร์",
            icon: "FaShower",
            description: "บริการล้างแอร์ ทำความสะอาดฆ่าเชื้อ",
          },
          {
            id: "3",
            name: "ติดตั้งแอร์",
            icon: "FaTools",
            description: "บริการติดตั้งแอร์ รับประกันงานติดตั้ง",
          },
          {
            id: "4",
            name: "ซ่อมเครื่องใช้ไฟฟ้า",
            icon: "FaWrench",
            description: "บริการซ่อมเครื่องใช้ไฟฟ้าทุกชนิด",
          },
        ]

        const fallbackProducts = [
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
        ]

        setBanners(fallbackBanners)
        setServices(fallbackServices)
        setProducts(fallbackProducts)
      } catch (error) {
        console.error("Error fetching home data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [])

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-[#d4a43c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
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
                  <FaArrowRight />
                </button>
              </Link>
              <Link to="#services">
                <button className="btn-secondary text-lg px-8 py-3">ดูบริการทั้งหมด</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#2f2f2f]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#d4a43c] mb-4">{t("ourServices")}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">เรามีบริการครบครันสำหรับการดูแลแอร์และโซล่าเซลของคุณ</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {services.map((service) => (
              <div key={service.id} className="card hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{getIconComponent(service.icon)}</div>
                  <h3 className="text-xl font-semibold text-[#d4a43c] mb-2">{service.name}</h3>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  <Link to="/booking" className="text-[#d4a43c] hover:underline flex items-center">
                    {t("bookService")} <FaArrowRight className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/booking" className="btn-primary">
              {t("viewAllServices")} <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-[#252525]">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">{t("featuredProducts")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {products.map((product) => (
              <div key={product.id} className="card hover:shadow-xl transition-shadow">
                <img
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#d4a43c] mb-1">{product.name}</h3>
                  <p className="text-gray-300 text-sm mb-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">฿{product.price.toLocaleString()}</span>
                    <Link to={`/products/${product.id}`} className="text-[#d4a43c] hover:underline">
                      {t("details")}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary">
              {t("viewAllProducts")} <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-[#d4a43c] text-[#2f2f2f]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("needEmergencyService")}</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">{t("emergencyServiceDescription")}</p>
          <Link
            to="/emergency"
            className="bg-[#2f2f2f] text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 inline-flex items-center"
          >
            {t("emergencyService")} <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
