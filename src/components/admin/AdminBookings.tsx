"use client"

import { useState, useEffect } from "react"
import { useI18n } from "../../hooks/useI18n"
import { collection, getDocs, updateDoc, doc, deleteDoc, query, orderBy } from "firebase/firestore"
import { db } from "../../firebase/config"
import { FaEye, FaTrash, FaCalendarAlt, FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa"

interface Booking {
  id: string
  userId: string
  userEmail: string
  name: string
  phone: string
  serviceType: string
  description: string
  date: string
  time: string
  address: string
  location?: { lat: number; lng: number }
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: any
}

const AdminBookings = () => {
  const { t } = useI18n()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const bookingsQuery = query(collection(db, "bookings"), orderBy("createdAt", "desc"))
      const bookingsSnapshot = await getDocs(bookingsQuery)
      const bookingsData = bookingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Booking[]

      // Fallback data if no bookings
      if (bookingsData.length === 0) {
        const fallbackBookings: Booking[] = [
          {
            id: "1",
            userId: "user1",
            userEmail: "somchai@email.com",
            name: "สมชาย ใจดี",
            phone: "089-123-4567",
            serviceType: "air-repair",
            description: "แอร์ไม่เย็น เสียงดัง",
            date: "2024-01-25",
            time: "14:00",
            address: "123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพฯ",
            status: "pending",
            createdAt: { toDate: () => new Date("2024-01-20") },
          },
          {
            id: "2",
            userId: "user2",
            userEmail: "suda@email.com",
            name: "สุดา รักสะอาด",
            phone: "081-234-5678",
            serviceType: "air-cleaning",
            description: "ต้องการล้างแอร์ทำความสะอาด",
            date: "2024-01-26",
            time: "10:00",
            address: "456 ถนนพระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพฯ",
            status: "confirmed",
            createdAt: { toDate: () => new Date("2024-01-19") },
          },
          {
            id: "3",
            userId: "user3",
            userEmail: "wichai@email.com",
            name: "วิชัย ประหยัด",
            phone: "082-345-6789",
            serviceType: "air-installation",
            description: "ติดตั้งแอร์ใหม่ 18000 BTU",
            date: "2024-01-27",
            time: "09:00",
            address: "789 ถนนรัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ",
            status: "completed",
            createdAt: { toDate: () => new Date("2024-01-18") },
          },
        ]
        setBookings(fallbackBookings)
      } else {
        setBookings(bookingsData)
      }
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), { status: newStatus })
      setBookings(
        bookings.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus as any } : booking)),
      )
    } catch (error) {
      console.error("Error updating booking status:", error)
    }
  }

  const deleteBooking = async (bookingId: string) => {
    if (!confirm(t("confirmDeleteBooking"))) return

    try {
      await deleteDoc(doc(db, "bookings", bookingId))
      setBookings(bookings.filter((booking) => booking.id !== bookingId))
    } catch (error) {
      console.error("Error deleting booking:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-600"
      case "confirmed":
        return "bg-blue-600"
      case "completed":
        return "bg-green-600"
      case "cancelled":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return t("pending")
      case "confirmed":
        return t("confirmed")
      case "completed":
        return t("completed")
      case "cancelled":
        return t("cancelled")
      default:
        return status
    }
  }

  const filteredBookings =
    filterStatus === "all" ? bookings : bookings.filter((booking) => booking.status === filterStatus)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-[#d4a43c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#d4a43c]">{t("manageBookings")}</h2>
        <div className="flex items-center space-x-4">
          <select
            className="bg-[#3a3a3a] border border-[#555555] text-white rounded-lg px-4 py-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">{t("allStatuses")}</option>
            <option value="pending">{t("pending")}</option>
            <option value="confirmed">{t("confirmed")}</option>
            <option value="completed">{t("completed")}</option>
            <option value="cancelled">{t("cancelled")}</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#3a3a3a] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#2f2f2f]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t("customer")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t("service")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t("dateTime")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t("status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-[#444444]">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-[#d4a43c] rounded-full w-10 h-10 flex items-center justify-center mr-3">
                        <FaUser className="text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{booking.name}</div>
                        <div className="text-sm text-gray-400">{booking.userEmail}</div>
                        <div className="text-sm text-gray-400 flex items-center">
                          <FaPhone className="mr-1" size={12} />
                          {booking.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{booking.serviceType}</div>
                    <div className="text-sm text-gray-400">{booking.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      {booking.date}
                    </div>
                    <div className="text-sm text-gray-400">{booking.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      className={`${getStatusColor(booking.status)} text-white px-3 py-1 rounded-full text-xs font-medium`}
                      value={booking.status}
                      onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                    >
                      <option value="pending">{t("pending")}</option>
                      <option value="confirmed">{t("confirmed")}</option>
                      <option value="completed">{t("completed")}</option>
                      <option value="cancelled">{t("cancelled")}</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedBooking(booking)
                          setShowModal(true)
                        }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <FaEye />
                      </button>
                      <button onClick={() => deleteBooking(booking.id)} className="text-red-400 hover:text-red-300">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">{t("noBookingsFound")}</p>
        </div>
      )}

      {/* Booking Detail Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#3a3a3a] rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#d4a43c]">{t("bookingDetails")}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{t("customerName")}</label>
                  <p className="text-white">{selectedBooking.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{t("email")}</label>
                  <p className="text-white">{selectedBooking.userEmail}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{t("phone")}</label>
                  <p className="text-white">{selectedBooking.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{t("serviceType")}</label>
                  <p className="text-white">{selectedBooking.serviceType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{t("date")}</label>
                  <p className="text-white">{selectedBooking.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{t("time")}</label>
                  <p className="text-white">{selectedBooking.time}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">{t("description")}</label>
                <p className="text-white bg-[#2f2f2f] p-3 rounded">{selectedBooking.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  <FaMapMarkerAlt className="inline mr-1" />
                  {t("address")}
                </label>
                <p className="text-white bg-[#2f2f2f] p-3 rounded">{selectedBooking.address}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">{t("status")}</label>
                <span
                  className={`${getStatusColor(selectedBooking.status)} text-white px-3 py-1 rounded-full text-sm font-medium`}
                >
                  {getStatusText(selectedBooking.status)}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">{t("createdAt")}</label>
                <p className="text-white">
                  {selectedBooking.createdAt?.toDate ? selectedBooking.createdAt.toDate().toLocaleString("th-TH") : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminBookings
