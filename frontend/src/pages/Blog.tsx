"use client"

import { useState } from "react"
import { FaCalendarAlt, FaUser, FaEye, FaArrowRight } from "react-icons/fa"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  imageUrl: string
  author: string
  category: string
  views: number
  createdAt: string
}

const Blog = () => {
  const [posts] = useState<BlogPost[]>([
    {
      id: "1",
      title: "วิธีดูแลแอร์ให้อยู่ยาวนาน",
      excerpt: "เทคนิคการดูแลรักษาแอร์ที่ช่างมืออาชีพแนะนำ เพื่อให้แอร์ของคุณใช้งานได้นานและประหยัดไฟ",
      imageUrl: "/placeholder.svg?height=400&width=600",
      author: "ช่างโอ๋",
      category: "maintenance",
      views: 1250,
      createdAt: "2024-01-20",
    },
    {
      id: "2",
      title: "สัญญาณเตือนที่บอกว่าแอร์ต้องซ่อม",
      excerpt: "รู้จักสัญญาณเตือนต่างๆ ที่บอกว่าแอร์ของคุณมีปัญหาและต้องการการซ่อมแซม",
      imageUrl: "/placeholder.svg?height=400&width=600",
      author: "ช่างแอร์มืออาชีพ",
      category: "repair",
      views: 980,
      createdAt: "2024-01-18",
    },
    {
      id: "3",
      title: "เลือกแอร์ประหยัดไฟอย่างไรให้คุ้มค่า",
      excerpt: "คู่มือการเลือกซื้อแอร์ประหยัดไฟ พร้อมเทคนิคการใช้งานให้ประหยัดค่าไฟสูงสุด",
      imageUrl: "/placeholder.svg?height=400&width=600",
      author: "ผู้เชี่ยวชาญแอร์",
      category: "energy-saving",
      views: 1580,
      createdAt: "2024-01-15",
    },
    {
      id: "4",
      title: "ข่าวดี! เปิดสาขาใหม่ในพัทยา",
      excerpt: "เรายินดีที่จะประกาศเปิดสาขาใหม่ในพัทยา พร้อมให้บริการลูกค้าในพื้นที่ชลบุรี",
      imageUrl: "/placeholder.svg?height=400&width=600",
      author: "ทีมงาน",
      category: "news",
      views: 750,
      createdAt: "2024-01-12",
    },
  ])

  const featuredPosts = posts.slice(0, 3)

  return (
    <div className="page-container">
      <h1 className="section-title text-center">บล็อก</h1>

      {/* Featured Posts */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#d4a43c] mb-6">บทความแนะนำ</h2>
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
                  <span className="bg-[#d4a43c] text-white px-2 py-1 rounded text-xs mr-3">{post.category}</span>
                  <FaCalendarAlt className="mr-1" />
                  {new Date(post.createdAt).toLocaleDateString("th-TH")}
                  <FaEye className="ml-4 mr-1" />
                  {post.views}
                </div>
                <h3 className={`font-semibold text-[#d4a43c] mb-3 ${index === 0 ? "text-xl" : "text-lg"}`}>
                  {post.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-400">
                    <FaUser className="mr-1" />
                    {post.author}
                  </div>
                  <button className="text-[#d4a43c] hover:underline flex items-center">
                    อ่านต่อ <FaArrowRight className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Posts */}
      <section>
        <h2 className="text-2xl font-semibold text-[#d4a43c] mb-6">บทความทั้งหมด</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="card hover:shadow-xl transition-shadow">
              <img
                src={post.imageUrl || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <span className="bg-[#d4a43c] text-white px-2 py-1 rounded text-xs mr-3">{post.category}</span>
                  <FaCalendarAlt className="mr-1" />
                  {new Date(post.createdAt).toLocaleDateString("th-TH")}
                </div>
                <h3 className="text-lg font-semibold text-[#d4a43c] mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-400">
                    <FaUser className="mr-1" />
                    {post.author}
                    <FaEye className="ml-3 mr-1" />
                    {post.views}
                  </div>
                  <button className="text-[#d4a43c] hover:underline flex items-center">
                    อ่านต่อ <FaArrowRight className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Blog
