"use client"

import { useState, useEffect } from "react"
import { useI18n } from "../../hooks/useI18n"
import { FaStar, FaReply, FaTrash, FaEye, FaEyeSlash, FaSearch } from "react-icons/fa"

interface Review {
  id: string
  customerName: string
  customerEmail: string
  rating: number
  title: string
  comment: string
  service: string
  isPublished: boolean
  isReplied: boolean
  adminReply?: string
  createdAt: Date
  images?: string[]
}

const AdminReviews = () => {
  const { t } = useI18n()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRating, setFilterRating] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      // Mock data for demo
      const mockReviews: Review[] = [
        {
          id: "1",
          customerName: "คุณสมชาย",
          customerEmail: "somchai@email.com",
          rating: 5,
          title: "บริการดีมาก ประทับใจ",
          comment: "ช่างมาตรงเวลา ทำงานสะอาด แอร์เย็นดีมาก ราคาไม่แพง แนะนำเลยครับ",
          service: "ติดตั้งแอร์",
          isPublished: true,
          isReplied: true,
          adminReply: "ขอบคุณมากครับ เรายินดีที่ได้ให้บริการ หากมีปัญหาอะไรติดต่อมาได้เลยครับ",
          createdAt: new Date("2024-01-20"),
          images: ["/placeholder.svg?height=200&width=300"],
        },
        {
          id: "2",
          customerName: "คุณมาลี",
          customerEmail: "malee@email.com",
          rating: 4,
          title: "ซ่อมแอร์เก่ง",
          comment: "แอร์เสียมานาน หาช่างหลายคนไม่ได้ มาที่นี่แล้วซ่อมได้ในวันเดียว",
          service: "ซ่อมแอร์",
          isPublished: true,
          isReplied: false,
          createdAt: new Date("2024-01-18"),
        },
        {
          id: "3",
          customerName: "คุณวิชัย",
          customerEmail: "wichai@email.com",
          rating: 3,
          title: "โอเค แต่ช้าหน่อย",
          comment: "งานโอเค แต่มาช้ากว่านัดหมาย 1 ชั่วโมง ควรปรับปรุงเรื่องเวลา",
          service: "ล้างแอร์",
          isPublished: false,
          isReplied: false,
          createdAt: new Date("2024-01-15"),
        },
        {
          id: "4",
          customerName: "คุณสุดา",
          customerEmail: "suda@email.com",
          rating: 5,
          title: "ประทับใจมาก",
          comment: "ช่างสุภาพ อธิบายปัญหาให้ฟังเข้าใจ ราคาสมเหตุสมผล จะใช้บริการอีกแน่นอน",
          service: "เติมน้ำยาแอร์",
          isPublished: true,
          isReplied: true,
          adminReply: "ขอบคุณครับ เรายินดีให้บริการเสมอ",
          createdAt: new Date("2024-01-12"),
        },
      ]
      setReviews(mockReviews)
    } catch (error) {
      console.error("Error fetching reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleTogglePublish = async (reviewId: string) => {
    try {
      setReviews(
        reviews.map((review) => (review.id === reviewId ? { ...review, isPublished: !review.isPublished } : review)),
      )
    } catch (error) {
      console.error("Error updating review:", error)
    }
  }

  const handleDeleteReview = async (reviewId: string) => {
    if (window.confirm(t("confirmDelete"))) {
      try {
        setReviews(reviews.filter((review) => review.id !== reviewId))
        alert(t("reviewDeleted"))
      } catch (error) {
        console.error("Error deleting review:", error)
        alert(t("errorOccurred"))
      }
    }
  }

  const handleReply = async (reviewId: string) => {
    if (!replyText.trim()) return

    try {
      setReviews(
        reviews.map((review) =>
          review.id === reviewId ? { ...review, isReplied: true, adminReply: replyText } : review,
        ),
      )
      setReplyingTo(null)
      setReplyText("")
      alert(t("replyAdded"))
    } catch (error) {
      console.error("Error adding reply:", error)
      alert(t("errorOccurred"))
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} className={`${index < rating ? "text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRating = filterRating === "all" || review.rating.toString() === filterRating

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && review.isPublished) ||
      (filterStatus === "unpublished" && !review.isPublished) ||
      (filterStatus === "replied" && review.isReplied) ||
      (filterStatus === "unreplied" && !review.isReplied)

    return matchesSearch && matchesRating && matchesStatus
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
        <h2 className="text-2xl font-bold text-[#d4a43c]">{t("reviewManagement")}</h2>
        <div className="text-sm text-gray-600">
          {t("totalReviews")}: {reviews.length} | {t("published")}: {reviews.filter((r) => r.isPublished).length}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t("searchReviews")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
            />
          </div>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
          >
            <option value="all">{t("allRatings")}</option>
            <option value="5">5 {t("stars")}</option>
            <option value="4">4 {t("stars")}</option>
            <option value="3">3 {t("stars")}</option>
            <option value="2">2 {t("stars")}</option>
            <option value="1">1 {t("star")}</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
          >
            <option value="all">{t("allStatus")}</option>
            <option value="published">{t("published")}</option>
            <option value="unpublished">{t("unpublished")}</option>
            <option value="replied">{t("replied")}</option>
            <option value="unreplied">{t("unreplied")}</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-800">{review.customerName}</h3>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-600 ml-1">({review.rating}/5)</span>
                  </div>
                  <span className="text-sm text-gray-500">{review.createdAt.toLocaleDateString("th-TH")}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{review.service}</p>
                <h4 className="font-medium text-gray-800 mb-2">{review.title}</h4>
              </div>
              <div className="flex gap-2">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    review.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {review.isPublished ? t("published") : t("unpublished")}
                </span>
                {review.isReplied && (
                  <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">{t("replied")}</span>
                )}
              </div>
            </div>

            <p className="text-gray-700 mb-4">{review.comment}</p>

            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`Review image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}

            {review.adminReply && (
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <p className="text-sm font-medium text-blue-800 mb-1">{t("adminReply")}:</p>
                <p className="text-blue-700">{review.adminReply}</p>
              </div>
            )}

            {replyingTo === review.id && (
              <div className="mb-4">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={t("writeReply")}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleReply(review.id)}
                    className="bg-[#d4a43c] text-white px-4 py-2 rounded hover:bg-[#b8932f] transition-colors"
                  >
                    {t("sendReply")}
                  </button>
                  <button
                    onClick={() => {
                      setReplyingTo(null)
                      setReplyText("")
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                  >
                    {t("cancel")}
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => handleTogglePublish(review.id)}
                className={`flex items-center gap-1 px-3 py-2 rounded transition-colors ${
                  review.isPublished
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {review.isPublished ? <FaEyeSlash /> : <FaEye />}
                {review.isPublished ? t("unpublish") : t("publish")}
              </button>

              {!review.isReplied && (
                <button
                  onClick={() => {
                    setReplyingTo(review.id)
                    setReplyText("")
                  }}
                  className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  <FaReply /> {t("reply")}
                </button>
              )}

              <button
                onClick={() => handleDeleteReview(review.id)}
                className="flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors"
              >
                <FaTrash /> {t("delete")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">{t("noReviewsFound")}</p>
        </div>
      )}
    </div>
  )
}

export default AdminReviews
