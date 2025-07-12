"use client"

import { useState, useEffect } from "react"
import { useI18n } from "../../hooks/useI18n"
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch } from "react-icons/fa"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  inStock: boolean
  featured: boolean
  createdAt: Date
}

const AdminProducts = () => {
  const { t } = useI18n()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const categories = [
    { id: "all", name: t("allCategories") },
    { id: "air-conditioner", name: t("airConditioner") },
    { id: "parts", name: t("parts") },
    { id: "tools", name: t("tools") },
    { id: "accessories", name: t("accessories") },
  ]

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      // Mock data for demo
      const mockProducts: Product[] = [
        {
          id: "1",
          name: "แอร์ Daikin Inverter 12,000 BTU",
          description: "แอร์ประหยัดไฟ เบอร์ 5 พร้อมระบบฟอกอากาศ",
          price: 25900,
          category: "air-conditioner",
          imageUrl: "/placeholder.svg?height=200&width=300",
          inStock: true,
          featured: true,
          createdAt: new Date("2024-01-15"),
        },
        {
          id: "2",
          name: "น้ำยาแอร์ R32",
          description: "น้ำยาแอร์คุณภาพสูง เป็นมิตรกับสิ่งแวดล้อม",
          price: 1200,
          category: "parts",
          imageUrl: "/placeholder.svg?height=200&width=300",
          inStock: true,
          featured: false,
          createdAt: new Date("2024-01-10"),
        },
        {
          id: "3",
          name: "ชุดทำความสะอาดแอร์",
          description: "ชุดอุปกรณ์ทำความสะอาดแอร์ครบชุด",
          price: 890,
          category: "tools",
          imageUrl: "/placeholder.svg?height=200&width=300",
          inStock: false,
          featured: false,
          createdAt: new Date("2024-01-08"),
        },
      ]
      setProducts(mockProducts)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowAddModal(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setShowAddModal(true)
  }

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm(t("confirmDelete"))) {
      try {
        setProducts(products.filter((p) => p.id !== productId))
        alert(t("productDeleted"))
      } catch (error) {
        console.error("Error deleting product:", error)
        alert(t("errorOccurred"))
      }
    }
  }

  const handleToggleStock = async (productId: string) => {
    try {
      setProducts(products.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p)))
    } catch (error) {
      console.error("Error updating stock:", error)
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-[#d4a43c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#d4a43c]">{t("productManagement")}</h2>
        <button
          onClick={handleAddProduct}
          className="bg-[#d4a43c] text-white px-4 py-2 rounded-lg hover:bg-[#b8932f] transition-colors flex items-center gap-2"
        >
          <FaPlus /> {t("addProduct")}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t("searchProducts")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.imageUrl || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                <div className="flex gap-1">
                  {product.featured && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">{t("featured")}</span>
                  )}
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.inStock ? t("inStock") : t("outOfStock")}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-[#d4a43c]">฿{product.price.toLocaleString()}</span>
                <span className="text-sm text-gray-500">{categories.find((c) => c.id === product.category)?.name}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                >
                  <FaEdit className="text-sm" /> {t("edit")}
                </button>
                <button
                  onClick={() => handleToggleStock(product.id)}
                  className={`flex-1 py-2 px-3 rounded transition-colors flex items-center justify-center gap-1 ${
                    product.inStock
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  <FaEye className="text-sm" />
                  {product.inStock ? t("hide") : t("show")}
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600 transition-colors"
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">{t("noProductsFound")}</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">{editingProduct ? t("editProduct") : t("addProduct")}</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder={t("productName")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                defaultValue={editingProduct?.name || ""}
              />
              <textarea
                placeholder={t("productDescription")}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                defaultValue={editingProduct?.description || ""}
              />
              <input
                type="number"
                placeholder={t("price")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                defaultValue={editingProduct?.price || ""}
              />
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                defaultValue={editingProduct?.category || "air-conditioner"}
              >
                {categories.slice(1).map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked={editingProduct?.inStock ?? true} />
                  {t("inStock")}
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked={editingProduct?.featured ?? false} />
                  {t("featured")}
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#d4a43c] text-white px-4 py-2 rounded-lg hover:bg-[#b8932f] transition-colors"
                >
                  {editingProduct ? t("update") : t("add")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProducts
