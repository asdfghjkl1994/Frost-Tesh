"use client"

import { useState } from "react"
import { FaStar, FaUser, FaCalendarAlt, FaQuoteLeft } from "react-icons/fa"

interface Review {
  id: string
  userName: string
  rating: number
  title: string
  comment: string
  serviceType: string
  createdAt: string
}

const Reviews = () => {
  const [reviews] = useState<Review[]>([
    {
      id: "1",
      userName: "สมชาย ใจดี",
      rating: 5,
      title: "บริการดีเยี่ยม ช่างมาตรงเวลา",
      comment: "ช่างมาตรงเวลา ทำงานสะอาด แอร์เย็นดีมาก ราคาเป็นธรรม แนะนำเลยครับ",
      serviceType: "ซ่อมแอร์",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      userName: "สุดา รักสะอาด",
      rating: 5,
      title: "ล้างแอร์สะอาดมาก",
      comment: "ล้างแอร์สะอาดมาก ช่างใจเซอร์วิส อธิบายรายละเอียดดี จะใช้บริการอีกแน่นอน",
      serviceType: "ล้างแอร์",
      createdAt: "2024-01-10",
    },
    {
      id: "3",
      userName: "วิชัย ประหยัด",
      rating: 4,
      title: "ราคาดี บริการโอเค",
      comment: "ราคาเป็นธรรม ช่างทำงานดี แต่มาช้ากว่านัดหน่อย โดยรวมพอใจครับ",
      serviceType: "ติดตั้งแอร์",
      createdAt: "2024-01-05",
    },
    {
      id: "4",
      userName: "มาลี สวยงาม",
      rating: 5,
      title: "บริการฉุกเฉินรวดเร็ว",
      comment: "แอร์เสียกลางคืน โทรมาแล้วช่างมาเร็วมาก แก้ไขได้ทันที ขอบคุณมากค่ะ",
      serviceType: "บริการฉุกเฉิน",
      createdAt: "2024-01-01",
    },
  ])

  const renderStars = (rating: number, size = 20) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar key={index} size={size} className={index < rating ? "text-yellow-400" : "text-gray-400"} />
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

  const ratingDistribution = getRatingDistribution()

  return (
    <div className="page-container">
      <h1 className="section-title text-center">รีวิวลูกค้า</h1>

      {/* Rating Summary */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#d4a43c] mb-2">{getAverageRating()}</div>
            <div className="flex justify-center mb-2">{renderStars(Math.round(Number(getAverageRating())))}</div>
            <p className="text-gray-300">{reviews.length} รีวิวทั้งหมด</p>
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
                    {new Date(review.createdAt).toLocaleDateString("th-TH")}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center mb-1">{renderStars(review.rating, 16)}</div>
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
    </div>
  )
}

export default Reviews
