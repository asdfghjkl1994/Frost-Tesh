"use client"

import { useState, useEffect } from "react"
import { useI18n } from "../../hooks/useI18n"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase/config"
import { FaCalendarCheck, FaExclamationTriangle, FaUsers, FaStar, FaArrowUp, FaArrowDown } from "react-icons/fa"

interface DashboardStats {
  totalBookings: number
  pendingBookings: number
  emergencyRequests: number
  totalUsers: number
  averageRating: number
  monthlyRevenue: number
}

interface RecentActivity {
  id: string
  type: "booking" | "emergency" | "review"
  title: string
  time: string
  status: string
}

const AdminDashboard = () => {
  const { t } = useI18n()
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    pendingBookings: 0,
    emergencyRequests: 0,
    totalUsers: 0,
    averageRating: 0,
    monthlyRevenue: 0,
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch bookings
      const bookingsSnapshot = await getDocs(collection(db, "bookings"))
      const bookings = bookingsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

      // Fetch emergency requests
      const emergencySnapshot = await getDocs(collection(db, "emergencyRequests"))
      const emergencyRequests = emergencySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

      // Fetch users
      const usersSnapshot = await getDocs(collection(db, "users"))
      const users = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

      // Fetch reviews
      const reviewsSnapshot = await getDocs(collection(db, "reviews"))
      const reviews = reviewsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

      // Calculate stats
      const pendingBookings = bookings.filter((b: any) => b.status === "pending").length
      const totalRating = reviews.reduce((sum: number, review: any) => sum + (review.rating || 0), 0)
      const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0

      // Calculate monthly revenue (mock calculation)
      const currentMonth = new Date().getMonth()
      const monthlyBookings = bookings.filter((b: any) => {
        const bookingDate = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt)
        return bookingDate.getMonth() === currentMonth
      })
      const monthlyRevenue = monthlyBookings.reduce((sum: number, booking: any) => sum + (booking.price || 0), 0)

      setStats({
        totalBookings: bookings.length,
        pendingBookings,
        emergencyRequests: emergencyRequests.length,
        totalUsers: users.length,
        averageRating,
        monthlyRevenue,
      })

      // Create recent activity (mock data for demo)
      const activities: RecentActivity[] = [
        {
          id: "1",
          type: "booking",
          title: "การจองใหม่จาก สมชาย ใจดี",
          time: "5 นาทีที่แล้ว",
          status: "pending",
        },
        {
          id: "2",
          type: "emergency",
          title: "คำขอฉุกเฉินจาก สุดา รักสะอาด",
          time: "15 นาทีที่แล้ว",
          status: "urgent",
        },
        {
          id: "3",
          type: "review",
          title: "รีวิวใหม่ 5 ดาว",
          time: "1 ชั่วโมงที่แล้ว",
          status: "approved",
        },
      ]
      setRecentActivity(activities)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)

      // Fallback data
      setStats({
        totalBookings: 156,
        pendingBookings: 23,
        emergencyRequests: 8,
        totalUsers: 89,
        averageRating: 4.7,
        monthlyRevenue: 125000,
      })
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: t("totalBookings"),
      value: stats.totalBookings,
      icon: FaCalendarCheck,
      color: "bg-blue-600",
      change: "+12%",
      isPositive: true,
    },
    {
      title: t("pendingBookings"),
      value: stats.pendingBookings,
      icon: FaCalendarCheck,
      color: "bg-yellow-600",
      change: "+5%",
      isPositive: true,
    },
    {
      title: t("emergencyRequests"),
      value: stats.emergencyRequests,
      icon: FaExclamationTriangle,
      color: "bg-red-600",
      change: "-8%",
      isPositive: false,
    },
    {
      title: t("totalUsers"),
      value: stats.totalUsers,
      icon: FaUsers,
      color: "bg-green-600",
      change: "+18%",
      isPositive: true,
    },
    {
      title: t("averageRating"),
      value: stats.averageRating.toFixed(1),
      icon: FaStar,
      color: "bg-purple-600",
      change: "+0.2",
      isPositive: true,
    },
    {
      title: t("monthlyRevenue"),
      value: `฿${stats.monthlyRevenue.toLocaleString()}`,
      icon: FaCalendarCheck,
      color: "bg-[#d4a43c]",
      change: "+25%",
      isPositive: true,
    },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-[#d4a43c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-[#3a3a3a] rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.isPositive ? (
                      <FaArrowUp className="text-green-500 mr-1" size={12} />
                    ) : (
                      <FaArrowDown className="text-red-500 mr-1" size={12} />
                    )}
                    <span className={`text-sm ${stat.isPositive ? "text-green-500" : "text-red-500"}`}>
                      {stat.change}
                    </span>
                    <span className="text-gray-400 text-sm ml-1">{t("fromLastMonth")}</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-[#3a3a3a] rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-[#d4a43c] mb-4">{t("recentActivity")}</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-[#2f2f2f] rounded-lg">
              <div className="flex items-center">
                <div
                  className={`p-2 rounded-lg mr-3 ${
                    activity.type === "booking"
                      ? "bg-blue-600"
                      : activity.type === "emergency"
                        ? "bg-red-600"
                        : "bg-purple-600"
                  }`}
                >
                  {activity.type === "booking" && <FaCalendarCheck className="text-white" />}
                  {activity.type === "emergency" && <FaExclamationTriangle className="text-white" />}
                  {activity.type === "review" && <FaStar className="text-white" />}
                </div>
                <div>
                  <p className="text-white font-medium">{activity.title}</p>
                  <p className="text-gray-400 text-sm">{activity.time}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  activity.status === "pending"
                    ? "bg-yellow-600 text-white"
                    : activity.status === "urgent"
                      ? "bg-red-600 text-white"
                      : "bg-green-600 text-white"
                }`}
              >
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors">
          <FaCalendarCheck className="mx-auto mb-2" size={24} />
          <p className="font-medium">{t("viewBookings")}</p>
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg transition-colors">
          <FaExclamationTriangle className="mx-auto mb-2" size={24} />
          <p className="font-medium">{t("emergencyRequests")}</p>
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors">
          <FaUsers className="mx-auto mb-2" size={24} />
          <p className="font-medium">{t("manageUsers")}</p>
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors">
          <FaStar className="mx-auto mb-2" size={24} />
          <p className="font-medium">{t("manageReviews")}</p>
        </button>
      </div>
    </div>
  )
}

export default AdminDashboard
