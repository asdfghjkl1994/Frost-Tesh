"use client"

import { useState, useEffect } from "react"
import { useI18n } from "../hooks/useI18n"
import { FaCalendarAlt, FaEye } from "react-icons/fa"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  imageUrl: string
  author: string
  category: string
  tags: string[]
  views: number
  published: boolean
  createdAt: any
}

const Blog = () => {
  const { t } = useI18n()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: t("allCategories") },
    { id: "maintenance", name: t("maintenanceTips") },
    { id: "repair", name: t("repairGuides") },
    { id: "energy-saving", name: t("energySaving") },
    { id: "news", name: t("news") },
  ]

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      // Fallback data for demo
      const fallbackPosts: BlogPost[] = [
        {
          id: "1",
          title: "วิธีดูแลแอร์ให้อยู่ยาวนาน",
          excerpt: "เทคนิคการดูแลรักษาแอร์ที่ช่างมืออาชีพแนะนำ เพื่อให้แอร์ของคุณใช้งานได้นานและประหยัดไฟ",
          content: "การดูแลแอร์อย่างถูกต้องจะช่วยยืดอายุการใช้งานและประหยัดค่าไฟฟ้า...",
          imageUrl: "/placeholder.svg?height=400&width=600",
          author: "ช่างโอ๋",
          category: "maintenance",
          tags: ["แอร์", "ดูแลรักษา", "ประหยัดไฟ"],
          views: 1250,
          published: true,
          createdAt: { toDate: () => new Date("2024-01-20") },
        },
        {
          id: "2",
          title: "สัญญาณเตือนที่บอกว่าแอร์ต้องซ่อม",
          excerpt: "รู้จักสัญญาณเตือนต่างๆ ที่บอกว่าแอร์ของคุณมีปัญหาและต้องการการซ่อมแซม",
          content: "แอร์ที่มีปัญหาจะแสดงสัญญาณเตือนหลายอย่าง เช่น เสียงดัง ไม่เย็น...",
          imageUrl: "/placeholder.svg?height=400&width=600",
          author: "ช่างแอร์มืออาชีพ",
          category: "repair",
          tags: ["ซ่อมแอร์", "ปัญหาแอร์", "สัญญาณเตือน"],
          views: 980,
          published: true,
          createdAt: { toDate: () => new Date("2024-01-18") },
        },
        {
          id: "3",
          title: "เลือกแอร์ประหยัดไฟอย่างไรให้คุ้มค่า",
          excerpt: "คู่มือการเลือกซื้อแอร์ประหยัดไฟ พร้อมเทคนิคการใช้งานให้ประหยัดค่าไฟสูงสุด",
          content: "การเลือกแอร์ประหยัดไฟต้องดูหลายปัจจัย เช่น เบอร์ 5, Inverter...",
          imageUrl: "/placeholder.svg?height=400&width=600",
          author: "ผู้เชี่ยวชาญแอร์",
          category: "energy-saving",
          tags: ["ประหยัดไฟ", "เลือกซื้อแอร์", "Inverter"],
          views: 1580,
          published: true,
          createdAt: { toDate: () => new Date("2024-01-15") },
        },
        {
          id: "4",
          title: "ข่าวดี! เปิดสาขาใหม่ในพัทยา",
          excerpt: "เรายินดีที่จะประกาศเปิดสาขาใหม่ในพัทยา พร้อมให้บริการลูกค้าในพื้นที่ชลบุรี",
          content: "ด้วยความต้องการของลูกค้าที่เพิ่มขึ้น เราจึงตัดสินใจเปิดสาขาใหม่...",
          imageUrl: "/placeholder.svg?height=400&width=600",
          author: "ทีมงาน",
          category: "news",
          tags: ["ข่าวสาร", "สาขาใหม่", "พัทยา"],
          views: 750,
          published: true,
          createdAt: { toDate: () => new Date("2024-01-12") },
        },
      ]
      setPosts(fallbackPosts)
      setFeaturedPosts(fallbackPosts.slice(0, 3))
    } catch (error) {
      console.error("Error fetching blog posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
      <h1 className="section-title text-center">{t("blog")}</h1>

      {/* Featured Posts */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#d4a43c] mb-6">{t("featuredPosts")}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post, index) => (
            <div
              key={post.id}
              className={`card hover:shadow-xl transition-shadow ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
            >
              <img
                src={post.imageUrl || "/placeholder.svg"}
                alt={post.title}
                className={`w-full object-cover rounded-t-xl ${index === 0 ? "h-64" : "h-48"}`}
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <span className="bg-[#d4a43c] text-white px-2 py-1 rounded text-xs mr-3">
                    {categories.find((cat) => cat.id === post.category)?.name}
                  </span>
                  <FaCalendarAlt className="mr-1" />
                  {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString("th-TH") : ""}
                  <FaEye className="ml-4 mr-1" />
                  {post.views}
                </div>
                <h3 className={`font-semibold text-[#d4a43c] mb-3 ${index === 0 ? "text-xl" : "text-lg"}`}>
                  {post.title}
                </h3>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search and Filter */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <input
            type="text"
            placeholder={t("search")}
            className="w-full md:w-1/3 p-2 border rounded mb-2 md:mb-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex items-center">
            <label htmlFor="category" className="mr-2 text-gray-700">
              {t("category")}:
            </label>
            <select
              id="category"
              className="p-2 border rounded"
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
      </section>

      {/* Blog Posts List */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="card hover:shadow-md transition-shadow">
              <img
                src={post.imageUrl || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <span className="bg-[#d4a43c] text-white px-2 py-1 rounded text-xs mr-3">
                    {categories.find((cat) => cat.id === post.category)?.name}
                  </span>
                  <FaCalendarAlt className="mr-1" />
                  {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString("th-TH") : ""}
                  <FaEye className="ml-4 mr-1" />
                  {post.views}
                </div>
                <h3 className="font-semibold text-[#d4a43c] mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Blog
