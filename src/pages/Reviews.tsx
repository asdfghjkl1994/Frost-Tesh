"use client"

import { useState, useEffect } from "react"
import { useI18n } from "../hooks/useI18n"
import { useAuth } from "../hooks/useAuth"
import { useForm } from "react-hook-form"
import { FaStar, FaUser, FaCalendarAlt, FaQuoteLeft } from "react-icons/fa"

interface Review {
  id: string
  userId: string
  userName: string
  userEmail: string
  rating: number
  title: string
  comment: string
  serviceType: string
  createdAt: any
  approved: boolean
}

interface ReviewFormData {
  rating: number
  title: string
  comment: string
  serviceType: string
}

const Reviews = () => {
  const { t } = useI18n()
  const { currentUser } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>()

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      // Fallback data for demo
      const fallbackReviews: Review[] = [
        {
          id: "1",
          userId: "user1",
          userName: "สมชาย ใจดี",
          userEmail: "somchai@email.com",
          rating: 5,
          title: "บริการดีเยี่ยม ช่างมาตรงเวลา",
          comment: "ช่างมาตรงเวลา ทำงานสะอาด แอร์เย็นดีมาก ราคาเป็นธรรม แนะนำเลยครับ",
          serviceType: "ซ่อมแอร์",
          createdAt: { toDate: () => new Date("2024-01-15") },
          approved: true,
        },
        {
          id: "2",
          userId: "user2",
          userName: "สุดา รักสะอาด",
          userEmail: "suda@email.com",
          rating: 5,
          title: "ล้างแอร์สะอาดมาก",
          comment: "ล้างแอร์สะอาดมาก ช่างใจเซอร์วิส อธิบายรายละเอียดดี จะใช้บริการอีกแน่นอน",
          serviceType: "ล้างแอร์",
          createdAt: { toDate: () => new Date("2024-01-10") },
          approved: true,
        },
        {
          id: "3",
          userId: "user3",
          userName: "วิชัย ประหยัด",
          userEmail: "wichai@email.com",
          rating: 4,
          title: "ราคาดี บริการโอเค",
          comment: "ราคาเป็นธรรม ช่างทำงานดี แต่มาช้ากว่านัดหน่อย โดยรวมพอใจครับ",
          serviceType: "ติดตั้งแอร์",
          createdAt: { toDate: () => new Date("2024-01-05") },
          approved: true,
        },
        {
          id: "4",
          userId: "user4",
          userName: "มาลี สวยงาม",
          userEmail: "malee@email.com",
          rating: 5,
          title: "บริการฉุกเฉินรวดเร็ว",
          comment: "แอร์เสียกลางคืน โทรมาแล้วช่างมาเร็วมาก แก้ไขได้ทันที ขอบคุณมากค่ะ",
          serviceType: "บริการฉุกเฉิน",
          createdAt: { toDate: () => new Date("2024-01-01") },
          approved: true,
        },
      ]
      setReviews(fallbackReviews)
    } catch (error) {
      console.error("Error fetching reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: ReviewFormData) => {
    if (!currentUser) return

    setSubmitting(true)
    try {
      // Simulate review submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert(t("reviewSubmitted"))
      reset()
      setSelectedRating(0)
      setShowForm(false)
    } catch (error) {
      console.error("Error submitting review:", error)
      alert(t("reviewError"))
    } finally {
      setSubmitting(false)
    }
  }

  const renderStars = (rating: number, interactive = false, size = 20) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        size={size}
        className={`${
          index < rating ? "text-yellow-400" : "text-gray-400"
        } ${interactive ? "cursor-pointer hover:text-yellow-300" : ""}`}
        onClick={interactive ? () => setSelectedRating(index + 1) : undefined}
        onMouseEnter={interactive ? () => setHoverRating(index + 1) : undefined}
        onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
      />
    ))
  }

  const getAverageRating = () => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach((review) => {
      distribution[review.rating as keyof typeof distribution]++
    })
    return distribution
  }

  const serviceTypes = [
    { id: "air-repair", name: t("airRepair") },
    { id: "air-cleaning", name: t("airCleaning") },
    { id: "air-installation", name: t("airInstallation") },
    { id: "emergency", name: t("emergencyService") },
    { id: "maintenance", name: t("maintenance") },
  ]

  if (loading) {
    return (
      <div className="page-container">
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-[#d4a43c] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  const ratingDistribution = getRatingDistribution()

  return (
    <div className="page-container">
      <h1 className="section-title text-center">{t("customerReviews")}</h1>

      {/* Rating Summary */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#d4a43c] mb-2">{getAverageRating()}</div>
            <div className="flex justify-center mb-2">{renderStars(Math.round(Number(getAverageRating())))}</div>
            <p className="text-gray-300">
              {reviews.length} {t("totalReviews")}
            </p>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <span className="w-8 text-sm">{rating}</span>
                <FaStar className="text-yellow-400 mx-2" size={14} />
                <div className="flex-1 bg-gray-600 rounded-full h-2 mx-2">
                  <div
                    className="bg-[#d4a43c] h-2 rounded-full"
                    style={{
                      width: `${reviews.length > 0 ? (ratingDistribution[rating as keyof typeof ratingDistribution] / reviews.length) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
                <span className="w-8 text-sm text-right">
                  {ratingDistribution[rating as keyof typeof ratingDistribution]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      {currentUser && (
        <div className="text-center mb-8">
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? t("cancelReview") : t("writeReview")}
          </button>
        </div>
      )}

      {/* Review Form */}
      {showForm && currentUser && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-[#d4a43c] mb-6">{t("writeReview")}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{t("rating")} *</label>
              <div className="flex items-center">
                {renderStars(hoverRating || selectedRating, true, 30)}
                <span className="ml-4 text-gray-300">{selectedRating > 0 && `${selectedRating}/5`}</span>
              </div>
              {selectedRating === 0 && <p className="mt-1 text-sm text-red-500">{t("ratingRequired")}</p>}
            </div>

            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-300 mb-1">
                {t("serviceType")} *
              </label>
              <select
                id="serviceType"
                className="select-field"
                {...register("serviceType", { required: t("serviceTypeRequired") })}
              >
                <option value="">{t("selectServiceType")}</option>
                {serviceTypes.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
              {errors.serviceType && <p className="mt-1 text-sm text-red-500">{errors.serviceType.message}</p>}
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                {t("reviewTitle")} *
              </label>
              <input
                id="title"
                type="text"
                className="input-field"
                placeholder={t("reviewTitlePlaceholder")}
                {...register("title", { required: t("titleRequired") })}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-1">
                {t("reviewComment")} *
              </label>
              <textarea
                id="comment"
                rows={4}
                className="textarea-field"
                placeholder={t("reviewCommentPlaceholder")}
                {...register("comment", { required: t("commentRequired") })}
              />
              {errors.comment && <p className="mt-1 text-sm text-red-500">{errors.comment.message}</p>}
            </div>

            <button type="submit" disabled={submitting || selectedRating === 0} className="btn-primary w-full">
              {submitting ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                t("submitReview")
              )}
            </button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-[#d4a43c] rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <FaUser className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{review.userName}</h3>
                  <div className="flex items-center text-sm text-gray-400">
                    <FaCalendarAlt className="mr-1" />
                    {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString("th-TH") : ""}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center mb-1">{renderStars(review.rating, false, 16)}</div>
                <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">{review.serviceType}</span>
              </div>
            </div>

            <div className="relative">
              <FaQuoteLeft className="absolute top-0 left-0 text-[#d4a43c] opacity-20" size={24} />
              <div className="pl-8">
                <h4 className="font-semibold text-[#d4a43c] mb-2">{review.title}</h4>
                <p className="text-gray-300 leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">{t("noReviewsYet")}</p>
          {currentUser && (
            <button onClick={() => setShowForm(true)} className="btn-primary mt-4">
              {t("beFirstToReview")}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Reviews
