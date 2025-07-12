"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  Users,
  DollarSign,
  AlertTriangle,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  Search,
  TrendingUp,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [bookings, setBookings] = useState([])
  const [emergencies, setEmergencies] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/")
      return
    }

    fetchData()
  }, [user, router])

  const fetchData = async () => {
    try {
      const [bookingsRes, emergenciesRes] = await Promise.all([fetch("/api/bookings"), fetch("/api/emergency")])

      const bookingsData = await bookingsRes.json()
      const emergenciesData = await emergenciesRes.json()

      setBookings(bookingsData.data || [])
      setEmergencies(emergenciesData.data || [])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      fetchData()
    } catch (error) {
      console.error("Error updating booking:", error)
    }
  }

  const updateEmergencyStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/emergency", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      fetchData()
    } catch (error) {
      console.error("Error updating emergency:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-purple-100 text-purple-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "dispatched":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b) => b.status === "pending").length,
    completedBookings: bookings.filter((b) => b.status === "completed").length,
    totalRevenue: bookings.reduce((sum, b) => sum + (b.price || 0), 0),
    emergencyRequests: emergencies.length,
    activeEmergencies: emergencies.filter((e) => e.status === "pending" || e.status === "dispatched").length,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">ภาพรวมการดำเนินงานและจัดการบริการ</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">การจองทั้งหมด</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+12% จากเดือนที่แล้ว</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">รอดำเนินการ</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pendingBookings}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-gray-600">ต้องติดต่อลูกค้า</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">รายได้รวม</p>
                  <p className="text-3xl font-bold text-green-600">฿{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+8% จากเดือนที่แล้ว</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">เหตุฉุกเฉิน</p>
                  <p className="text-3xl font-bold text-red-600">{stats.activeEmergencies}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-red-600">ต้องดำเนินการด่วน</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>การจองล่าสุด</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="ค้นหา..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-48"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="all">ทั้งหมด</option>
                      <option value="pending">รอดำเนินการ</option>
                      <option value="confirmed">ยืนยันแล้ว</option>
                      <option value="completed">เสร็จสิ้น</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings
                    .filter((booking) => {
                      const matchesSearch =
                        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        booking.service.toLowerCase().includes(searchTerm.toLowerCase())
                      const matchesStatus = statusFilter === "all" || booking.status === statusFilter
                      return matchesSearch && matchesStatus
                    })
                    .slice(0, 10)
                    .map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">{booking.customerName}</h4>
                              <p className="text-sm text-gray-600">{booking.service}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status === "pending" && "รอดำเนินการ"}
                            {booking.status === "confirmed" && "ยืนยันแล้ว"}
                            {booking.status === "completed" && "เสร็จสิ้น"}
                            {booking.status === "cancelled" && "ยกเลิก"}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            📅 {booking.date} เวลา {booking.time}
                          </div>
                          <div>💰 ฿{booking.price?.toLocaleString()}</div>
                          <div>📍 {booking.address}</div>
                          <div>📞 {booking.customerPhone}</div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(`tel:${booking.customerPhone}`)}
                            >
                              <Phone className="h-4 w-4 mr-1" />
                              โทร
                            </Button>
                            {booking.customerEmail && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(`mailto:${booking.customerEmail}`)}
                              >
                                <Mail className="h-4 w-4 mr-1" />
                                อีเมล
                              </Button>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            {booking.status === "pending" && (
                              <Button size="sm" onClick={() => updateBookingStatus(booking.id, "confirmed")}>
                                ยืนยัน
                              </Button>
                            )}
                            {booking.status === "confirmed" && (
                              <Button size="sm" onClick={() => updateBookingStatus(booking.id, "completed")}>
                                เสร็จสิ้น
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Requests */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  เหตุฉุกเฉิน
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencies.slice(0, 5).map((emergency) => (
                    <div key={emergency.id} className="border-l-4 border-red-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{emergency.name}</h4>
                        <Badge className={getStatusColor(emergency.status)}>
                          {emergency.status === "pending" && "รอดำเนินการ"}
                          {emergency.status === "dispatched" && "ส่งช่างแล้ว"}
                          {emergency.status === "completed" && "เสร็จสิ้น"}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">{emergency.description}</p>

                      <div className="text-xs text-gray-500 mb-3">
                        📍 {emergency.address}
                        <br />📞 {emergency.phone}
                        <br />⏰ {new Date(emergency.createdAt).toLocaleString("th-TH")}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => window.open(`tel:${emergency.phone}`)}>
                          <Phone className="h-4 w-4 mr-1" />
                          โทร
                        </Button>
                        {emergency.status === "pending" && (
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => updateEmergencyStatus(emergency.id, "dispatched")}
                          >
                            ส่งช่าง
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                  {emergencies.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
                      <p>ไม่มีเหตุฉุกเฉินในขณะนี้</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>การดำเนินการด่วน</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    จัดการช่าง
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    ตารางงาน
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <DollarSign className="h-4 w-4 mr-2" />
                    รายงานรายได้
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
