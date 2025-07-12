"use client"

import { useState, useEffect } from "react"
import { useI18n } from "../hooks/useI18n"
import { FaSearch, FaFilter, FaShoppingCart, FaStar } from "react-icons/fa"

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
  featured: boolean
}

const Products = () => {
  const { t } = useI18n()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const categories = [
    { id: "all", name: t("allCategories") },
    { id: "air-conditioner", name: t("airConditioners") },
    { id: "parts", name: t("parts") },
    { id: "tools", name: t("tools") },
    { id: "chemicals", name: t("chemicals") },
  ]

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterAndSortProducts()
  }, [products, searchTerm, selectedCategory, sortBy])

  const fetchProducts = async () => {
    try {
      // Fallback data for demo
      const fallbackProducts: Product[] = [
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
          featured: true,
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
          featured: true,
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
          featured: false,
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
          featured: false,
        },
        {
          id: "5",
          name: "ชุดเครื่องมือซ่อมแอร์",
          description: "เครื่องมือครบชุดสำหรับช่างแอร์",
          price: 2850,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "tools",
          rating: 4.7,
          reviews: 34,
          inStock: true,
          featured: false,
        },
        {
          id: "6",
          name: "แอร์ Samsung Wind-Free 9000 BTU",
          description: "แอร์เทคโนโลยี Wind-Free ไม่มีลมเย็นโดยตรง",
          price: 16900,
          imageUrl: "/placeholder.svg?height=300&width=300",
          category: "air-conditioner",
          rating: 4.6,
          reviews: 128,
          inStock: false,
          featured: false,
        },
      ]
      setProducts(fallbackProducts)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortProducts = () => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} className={index < Math.floor(rating) ? "text-yellow-400" : "text-gray-400"} size={14} />
    ))
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-[#d4a43c] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <h1 className="section-title text-center">{t("products")}</h1>

      {/* Filters */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t("searchProducts")}
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="select-field pl-10"
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

          {/* Sort */}
          <select className="select-field" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">{t("sortByName")}</option>
            <option value="price-low">{t("sortByPriceLow")}</option>
            <option value="price-high">{t("sortByPriceHigh")}</option>
            <option value="rating">{t("sortByRating")}</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card hover:shadow-xl transition-shadow">
            <div className="relative">
              <img
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              {product.featured && (
                <div className="absolute top-2 left-2 bg-[#d4a43c] text-white px-2 py-1 rounded text-xs font-medium">
                  {t("featured")}
                </div>
              )}
              {!product.inStock && (
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {t("outOfStock")}
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#d4a43c] mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">{product.description}</p>

              <div className="flex items-center mb-2">
                <div className="flex items-center mr-2">{renderStars(product.rating)}</div>
                <span className="text-sm text-gray-400">
                  {product.rating} ({product.reviews} {t("reviews")})
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-white">฿{product.price.toLocaleString()}</span>
                <button
                  className={`btn-primary text-sm ${!product.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={!product.inStock}
                >
                  <FaShoppingCart />
                  {product.inStock ? t("addToCart") : t("outOfStock")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">{t("noProductsFound")}</p>
        </div>
      )}
    </div>
  )
}

export default Products
