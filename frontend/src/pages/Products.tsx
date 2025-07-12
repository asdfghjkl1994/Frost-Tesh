"use client"

import { useState } from "react"
import { FaSearch, FaStar, FaShoppingCart } from "react-icons/fa"

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const products: Product[] = [
    {
      id: "1",
      name: "แอร์ Daikin Inverter 12000 BTU",
      description: "แอร์ประหยัดไฟเบอร์ 5 พร้อมระบบฟอกอากาศ",
      price: 18500,
      imageUrl: "/placeholder.svg?height=300&width=300",
      category: "air-conditioner",
      rating: 4.8,
      reviews: 156,
      inStock: true,
    },
    {
      id: "2",
      name: "แอร์ Mitsubishi Electric 18000 BTU",
      description: "แอร์ระบบ Inverter ประหยัดไฟสูงสุด",
      price: 22900,
      imageUrl: "/placeholder.svg?height=300&width=300",
      category: "air-conditioner",
      rating: 4.9,
      reviews: 203,
      inStock: true,
    },
    {
      id: "3",
      name: "น้ำยาล้างแอร์ Pro Clean",
      description: "น้ำยาล้างแอร์คุณภาพสูง ฆ่าเชื้อโรค",
      price: 350,
      imageUrl: "/placeholder.svg?height=300&width=300",
      category: "chemicals",
      rating: 4.5,
      reviews: 89,
      inStock: true,
    },
    {
      id: "4",
      name: "รีโมทแอร์สากล Universal",
      description: "รีโมทแอร์ใช้ได้กับทุกยี่ห้อ",
      price: 590,
      imageUrl: "/placeholder.svg?height=300&width=300",
      category: "parts",
      rating: 4.2,
      reviews: 67,
      inStock: true,
    },
  ]

  const categories = [
    { id: "all", name: "ทุกหมวดหมู่" },
    { id: "air-conditioner", name: "เครื่องปรับอากาศ" },
    { id: "parts", name: "อะไหล่" },
    { id: "chemicals", name: "น้ำยา" },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} className={index < Math.floor(rating) ? "text-yellow-400" : "text-gray-400"} size={14} />
    ))
  }

  return (
    <div className="page-container">
      <h1 className="section-title text-center">สินค้า</h1>

      {/* Filters */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาสินค้า"
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="select-field"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card hover:shadow-xl transition-shadow">
            <img
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#d4a43c] mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">{product.description}</p>

              <div className="flex items-center mb-2">
                <div className="flex items-center mr-2">{renderStars(product.rating)}</div>
                <span className="text-sm text-gray-400">
                  {product.rating} ({product.reviews} รีวิว)
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-white">฿{product.price.toLocaleString()}</span>
                <button className="btn-primary text-sm">
                  <FaShoppingCart />
                  เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">ไม่พบสินค้า</p>
        </div>
      )}
    </div>
  )
}

export default Products
