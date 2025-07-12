"use client"

import { useState, useEffect } from "react"
import { useI18n } from "../../hooks/useI18n"
import { collection, getDocs, updateDoc, doc, deleteDoc, query, orderBy } from "firebase/firestore"
import { db } from "../../firebase/config"
import { FaExclamationTriangle, FaEye, FaTrash, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa"

interface EmergencyRequest {
  id: string
  userId: string
  userEmail: string
  name: string
  phone: string
  area: string
  service: string
  details: string
  address: string
  status: "urgent" | "assigned" | "completed" | "cancelled"
  priority: "high" | "medium" | "low"
  createdAt: any
}

const AdminEmergency = () => {
  const { t } = useI18n()
  const [requests, setRequests] = useState<EmergencyRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<EmergencyRequest | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    fetchEmergencyRequests()
  }, [])

  const fetchEmergencyRequests = async () => {
    try {
      const requestsQuery = query(collection(db, "emergencyRequests"), orderBy("createdAt", "desc"))
      const requestsSnapshot = await getDocs(requestsQuery)
      const requestsData = requestsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as EmergencyRequest[]

      // Fallback data if no emergency requests
      if (requestsData.length === 0) {
        const fallbackRequests: EmergencyRequest[] = [
          {
            id: "1",
            userId: "user1",
            userEmail: "emergency1@email.com",
            name: "สมชาย ฉุกเฉิน",
            phone: "089-999-1111",
            area: "Pattaya",
            service: "aircon",
            details: "แอร์เสียกลางคืน ร้อนมาก ต้องการช่างด่วน",
            address: "123 ถนนพัทยา ตำบลหนองปรือ อำเภอบางละมุง ชลบุรี",
            status: "urgent",
            priority: "high",
            createdAt: { toDate: () => new Date() },
          },
          {
            id: "2",
            userId: "user2",
            userEmail: "emergency2@email.com",
            name: "สุดา ไฟดับ",
            phone: "081-888-2222",
            area: "Jomtien",
            service: "electrical",
            details: "ไฟดับทั้งบ้าน เบรกเกอร์ตก ไม่สามารถเปิดได้",
            address: "456 ถนนจอมเทียน ตำบลหนองปรือ อำเภอบางละมุง ชลบุรี",
            status: "assigned",
            priority: "high",
            createdAt: { toDate: () => new Date(Date.now() - 3600000) },
          },
          {
            id: "3",
            userId: "user3",
            userEmail: "emergency3@email.com",
            name: "วิชัย น้ำแตก",
            phone: "082-777-3333",
            area: "Sattahip",
            service: "plumbing",
            details: "ท่อน้ำแตกในห้องน้ำ น้ำไหลออกมาเยอะ",
            address: "789 ถนนสัตหีบ ตำบลสัตหีบ อำเภอสัตหีบ ชลบุรี",
            status: "completed",
            priority: "medium",
            createdAt: { toDate: () => new Date(Date.now() - 7200000) },
          },
        ]
        setRequests(fallbackRequests)
      } else {
        setRequests(requestsData)
      }
    } catch (error) {
      console.error("Error fetching emergency requests:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateRequestStatus = async (requestId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "emergencyRequests", requestId), { status: newStatus })
      setRequests(
        requests.map((request) => (request.id === requestId ? { ...request, status: newStatus as any } : request)),
      )
    } catch (error) {
      console.error("Error updating request status:", error)
    }
  }

  const deleteRequest = async (requestId: string) => {
    if (!confirm(t("confirmDeleteRequest"))) return

    try {
      await deleteDoc(doc(db, "emergencyRequests", requestId))
      setRequests(requests.filter((request) => request.id !== requestId))
    } catch (error) {
      console.error("Error deleting request:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent":
        return "bg-red-600 animate-pulse"
      case "assigned":
        return "bg-yellow-600"
      case "completed":
        return "bg-green-600"
      case "cancelled":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const getServiceIcon = (service: string) => {
    // Return appropriate icon based on service type
    return <FaExclamationTriangle />
  }

  const getTimeAgo = (date: any) => {
    if (!date?.toDate) return ""
    const now = new Date()
    const requestTime = date.toDate()
    const diffInMinutes = Math.floor((now.getTime() - requestTime.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${t("minutesAgo")}`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} ${t("hoursAgo")}`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return `${days} ${t("daysAgo")}`
    }
  }

  const filteredRequests =
    filterStatus === "all" ? requests : requests.filter((request) => request.status === filterStatus)

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
        <h2 className="text-2xl font-bold text-red-500 flex items-center">
          <FaExclamationTriangle className="mr-2" />
          {t("emergencyRequests")}
        </h2>
        <div className="flex items-center space-x-4">
          <select
            className="bg-[#3a3a3a] border border-[#555555] text-white rounded-lg px-4 py-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">{t("allStatuses")}</option>
            <option value="urgent">{t("urgent")}</option>
            <option value="assigned">{t("assigned")}</option>
            <option value="completed">{t("completed")}</option>
            <option value="cancelled">{t("cancelled")}</option>
          </select>
        </div>
      </div>

      {/* Emergency Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-red-600 rounded-lg p-4 text-white">
          <div className="text-2xl font-bold">{requests.filter((r) => r.status === "urgent").length}</div>
          <div className="text-sm opacity-90">{t("urgent")}</div>
        </div>
        <div className="bg-yellow-600 rounded-lg p-4 text-white">
          <div className="text-2xl font-bold">{requests.filter((r) => r.status === "assigned").length}</div>
          <div className="text-sm opacity-90">{t("assigned")}</div>
        </div>
        <div className="bg-green-600 rounded-lg p-4 text-white">
          <div className="text-2xl font-bold">{requests.filter((r) => r.status === "completed").length}</div>
          <div className="text-sm opacity-90">{t("completed")}</div>
        </div>
        <div className="bg-blue-600 rounded-lg p-4 text-white">
          <div className="text-2xl font-bold">{requests.length}</div>
          <div className="text-sm opacity-90">{t("total")}</div>
        </div>
      </div>

      {/* Emergency Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-[#3a3a3a] rounded-xl p-6 border-l-4 border-red-500">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="bg-red-600 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  {getServiceIcon(request.service)}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{request.name}</h3>
                  <p className="text-sm text-gray-400 flex items-center">
                    <FaClock className="mr-1" />
                    {getTimeAgo(request.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(request.priority)}`}>
                  {request.priority.toUpperCase()}
                </span>
                <select
                  className={`${getStatusColor(request.status)} text-white px-3 py-1 rounded-full text-xs font-medium`}
                  value={request.status}
                  onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                >
                  <option value="urgent">{t("urgent")}</option>
                  <option value="assigned">{t("assigned")}</option>
                  <option value="completed">{t("completed")}</option>
                  <option value="cancelled">{t("cancelled")}</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-300">
                <FaPhone className="mr-2 text-[#d4a43c]" />
                {request.phone}
              </div>
              <div className="flex items-start text-sm text-gray-300">
                <FaMapMarkerAlt className="mr-2 text-[#d4a43c] mt-1" />
                <span>
                  {request.area} - {request.address}
                </span>
              </div>
            </div>

            <div className="bg-[#2f2f2f] rounded p-3 mb-4">
              <p className="text-sm text-white font-medium mb-1">
                {t("problemType")}: {request.service}
              </p>
              <p className="text-sm text-gray-300">{request.details}</p>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">
                {t("requestedAt")}:{" "}
                {request.createdAt?.toDate ? request.createdAt.toDate().toLocaleString("th-TH") : ""}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedRequest(request)
                    setShowModal(true)
                  }}
                  className="text-blue-400 hover:text-blue-300 p-2"
                >
                  <FaEye />
                </button>
                <button onClick={() => deleteRequest(request.id)} className="text-red-400 hover:text-red-300 p-2">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <FaExclamationTriangle className="mx-auto text-gray-400 text-4xl mb-4" />
          <p className="text-gray-400 text-lg">{t("noEmergencyRequests")}</p>
        </div>
      )}

      {/* Request Detail Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#3a3a3a] rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-red-500 flex items-center">
                <FaExclamationTriangle className="mr-2" />
                {t("emergencyRequestDetails")}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{t("customerName")}</label>
                  <p className="text-white">{selectedRequest.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{t("phone")}</label>
                  <p className="text-white">{selectedRequest.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{t("serviceArea")}</label>
                  <p className="text-white">{selectedRequest.area}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{t("emergencyType")}</label>
                  <p className="text-white">{selectedRequest.service}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{t("priority")}</label>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedRequest.priority)}`}
                  >
                    {selectedRequest.priority.toUpperCase()}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{t("status")}</label>
                  <span
                    className={`${getStatusColor(selectedRequest.status)} text-white px-3 py-1 rounded-full text-sm font-medium`}
                  >
                    {selectedRequest.status}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">{t("problemDetails")}</label>
                <p className="text-white bg-[#2f2f2f] p-3 rounded">{selectedRequest.details}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  <FaMapMarkerAlt className="inline mr-1" />
                  {t("address")}
                </label>
                <p className="text-white bg-[#2f2f2f] p-3 rounded">{selectedRequest.address}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">{t("requestedAt")}</label>
                <p className="text-white">
                  {selectedRequest.createdAt?.toDate ? selectedRequest.createdAt.toDate().toLocaleString("th-TH") : ""}
                </p>
              </div>
            </div>

            <div className="mt-6 bg-yellow-900 bg-opacity-20 border border-yellow-500 rounded-lg p-4">
              <p className="text-yellow-400 text-sm">
                <strong>{t("emergencyNote")}:</strong> {t("emergencyResponseTime")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminEmergency
