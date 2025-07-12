"use client"

import { useState, useEffect } from "react"
import { useI18n } from "../../hooks/useI18n"
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaSearch, FaCalendarAlt } from "react-icons/fa"

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
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

const AdminBlog = () => {
  const { t } = useI18n()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

  const categories = [
    { id: "all", name: t("allCategories") },
    { id: "maintenance", name: t("maintenanceTips") },
    { id: "repair", name: t("repairGuides") },
    { id: "energy-saving", name: t("energySaving") },
    { id: "news", name: t("news") },
    { id: "promotion", name: t("promotions") },
  ]

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      // Mock data for demo
      const mockPosts: BlogPost[] = [
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
          featured: true,
          createdAt: new Date("2024-01-20"),
          updatedAt: new Date("2024-01-20"),
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
          featured: false,
          createdAt: new Date("2024-01-18"),
          updatedAt: new Date("2024-01-18"),
        },
        {
          id: "3",
          title: "โปรโมชั่นพิเศษเดือนกุมภาพันธ์",
          excerpt: "รับส่วนลด 20% สำหรับการติดตั้งแอร์ใหม่ และฟรีบริการล้างแอร์ 1 ครั้ง",
          content: "ในเดือนกุมภาพันธ์นี้ เรามีโปรโมชั่นพิเศษสำหรับลูกค้าทุกท่าน...",
          imageUrl: "/placeholder.svg?height=400&width=600",
          author: "ทีมการตลาด",
          category: "promotion",
          tags: ["โปรโมชั่น", "ส่วนลด", "ติดตั้งแอร์"],
          views: 2100,
          published: false,
          featured: true,
          createdAt: new Date("2024-01-15"),
          updatedAt: new Date("2024-01-16"),
        },
      ]
      setPosts(mockPosts)
    } catch (error) {
      console.error("Error fetching blog posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPost = () => {
    setEditingPost(null)
    setShowAddModal(true)
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setShowAddModal(true)
  }

  const handleDeletePost = async (postId: string) => {
    if (window.confirm(t("confirmDelete"))) {
      try {
        setPosts(posts.filter((p) => p.id !== postId))
        alert(t("postDeleted"))
      } catch (error) {
        console.error("Error deleting post:", error)
        alert(t("errorOccurred"))
      }
    }
  }

  const handleTogglePublish = async (postId: string) => {
    try {
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, published: !post.published, updatedAt: new Date() } : post,
        ),
      )
    } catch (error) {
      console.error("Error updating post:", error)
    }
  }

  const handleToggleFeatured = async (postId: string) => {
    try {
      setPosts(
        posts.map((post) => (post.id === postId ? { ...post, featured: !post.featured, updatedAt: new Date() } : post)),
      )
    } catch (error) {
      console.error("Error updating post:", error)
    }
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "published" && post.published) ||
      (selectedStatus === "draft" && !post.published) ||
      (selectedStatus === "featured" && post.featured)

    return matchesSearch && matchesCategory && matchesStatus
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
        <h2 className="text-2xl font-bold text-[#d4a43c]">{t("blogManagement")}</h2>
        <button
          onClick={handleAddPost}
          className="bg-[#d4a43c] text-white px-4 py-2 rounded-lg hover:bg-[#b8932f] transition-colors flex items-center gap-2"
        >
          <FaPlus /> {t("addPost")}
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600">{t("totalPosts")}</h3>
          <p className="text-2xl font-bold text-[#d4a43c]">{posts.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600">{t("published")}</h3>
          <p className="text-2xl font-bold text-green-600">{posts.filter((p) => p.published).length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600">{t("drafts")}</h3>
          <p className="text-2xl font-bold text-orange-600">{posts.filter((p) => !p.published).length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600">{t("totalViews")}</h3>
          <p className="text-2xl font-bold text-blue-600">
            {posts.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t("searchPosts")}
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
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
          >
            <option value="all">{t("allStatus")}</option>
            <option value="published">{t("published")}</option>
            <option value="draft">{t("drafts")}</option>
            <option value="featured">{t("featured")}</option>
          </select>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex gap-4">
              <img
                src={post.imageUrl || "/placeholder.svg"}
                alt={post.title}
                className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>
                        {t("author")}: {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt />
                        {post.createdAt.toLocaleDateString("th-TH")}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaEye />
                        {post.views.toLocaleString()} {t("views")}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {post.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">{t("featured")}</span>
                    )}
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        post.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {post.published ? t("published") : t("draft")}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {categories.find((c) => c.id === post.category)?.name}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditPost(post)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors flex items-center gap-1"
                  >
                    <FaEdit /> {t("edit")}
                  </button>
                  <button
                    onClick={() => handleTogglePublish(post.id)}
                    className={`px-3 py-1 rounded text-sm transition-colors flex items-center gap-1 ${
                      post.published
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {post.published ? <FaEyeSlash /> : <FaEye />}
                    {post.published ? t("unpublish") : t("publish")}
                  </button>
                  <button
                    onClick={() => handleToggleFeatured(post.id)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      post.featured
                        ? "bg-yellow-500 text-white hover:bg-yellow-600"
                        : "bg-gray-500 text-white hover:bg-gray-600"
                    }`}
                  >
                    {post.featured ? t("unfeature") : t("feature")}
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors flex items-center gap-1"
                  >
                    <FaTrash /> {t("delete")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">{t("noPostsFound")}</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{editingPost ? t("editPost") : t("addPost")}</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder={t("postTitle")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                defaultValue={editingPost?.title || ""}
              />
              <textarea
                placeholder={t("postExcerpt")}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                defaultValue={editingPost?.excerpt || ""}
              />
              <textarea
                placeholder={t("postContent")}
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                defaultValue={editingPost?.content || ""}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t("author")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                  defaultValue={editingPost?.author || ""}
                />
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                  defaultValue={editingPost?.category || "maintenance"}
                >
                  {categories.slice(1).map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                placeholder={t("tags") + " (คั่นด้วยเครื่องหมายจุลภาค)"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                defaultValue={editingPost?.tags.join(", ") || ""}
              />
              <input
                type="url"
                placeholder={t("imageUrl")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                defaultValue={editingPost?.imageUrl || ""}
              />
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked={editingPost?.published ?? false} />
                  {t("published")}
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked={editingPost?.featured ?? false} />
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
                  {editingPost ? t("update") : t("add")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminBlog
