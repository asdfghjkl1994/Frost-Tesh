"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, DollarSign, Users, Calendar, Download } from "lucide-react"

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("30")

  // Mock data for charts
  const revenueData = [
    { month: "ม.ค.", revenue: 45000, bookings: 56 },
    { month: "ก.พ.", revenue: 52000, bookings: 65 },
    { month: "มี.ค.", revenue: 48000, bookings: 60 },
    { month: "เม.ย.", revenue: 61000, bookings: 76 },
    { month: "พ.ค.", revenue: 55000, bookings: 69 },
    { month: "มิ.ย.", revenue: 67000, bookings: 84 },
  ]

  const serviceData = [
    { name: "ซ่อมแอร์", value: 35, color: "#0088FE" },
    { name: "ล้างแอร์", value: 25, color: "#00C49F" },
    { name: "ซ่อมไฟฟ้า", value: 20, color: "#FFBB28" },
    { name: "ซ่อมประปา", value: 15, color: "#FF8042" },
    { name: "อื่นๆ", value: 5, color: "#8884D8" },
  ]

  const dailyBookings = [
    { day: "จ", bookings: 12 },
    { day: "อ", bookings: 15 },
    { day: "พ", bookings: 8 },
    { day: "พฤ", bookings: 18 },
    { day: "ศ", bookings: 22 },
    { day: "ส", bookings: 25 },
    { day: "อา", bookings: 14 },
  ]

  const customerSatisfaction = [
    { rating: "5 ดาว", count: 145, percentage: 72.5 },
    { rating: "4 ดาว", count: 38, percentage: 19 },
    { rating: "3 ดาว", count: 12, percentage: 6 },
    { rating: "2 ดาว", count: 3, percentage: 1.5 },
    { rating: "1 ดาว", count: 2, percentage: 1 },
  ]

  const exportReport = (type: string) => {
    // Mock export functionality
    alert(`กำลังส่งออกรายงาน ${type}...`)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">รายงานและสถิติ</h1>
            <p className="text-gray-600">ข้อมูลประสิทธิภาพและการวิเคราะห์ธุรกิจ</p>
          </div>

          <div className="flex gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7">7 วันที่ผ่านมา</option>
              <option value="30">30 วันที่ผ่านมา</option>
              <option value="90">3 เดือนที่ผ่านมา</option>
              <option value="365">1 ปีที่ผ่านมา</option>
            </select>

            <Button onClick={() => exportReport("PDF")} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              ส่งออก PDF
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">รายได้รวม</p>
                  <p className="text-2xl font-bold text-green-600">฿328,000</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.5% จากเดือนที่แล้ว
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">การจองทั้งหมด</p>
                  <p className="text-2xl font-bold text-blue-600">410</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8.3% จากเดือนที่แล้ว
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ลูกค้าใหม่</p>
                  <p className="text-2xl font-bold text-purple-600">89</p>
                  <p className="text-xs text-purple-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15.2% จากเดือนที่แล้ว
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">คะแนนเฉลี่ย</p>
                  <p className="text-2xl font-bold text-yellow-600">4.7/5</p>
                  <p className="text-xs text-yellow-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +0.2 จากเดือนที่แล้ว
                  </p>
                </div>
                <div className="text-2xl">⭐</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="revenue">รายได้</TabsTrigger>
            <TabsTrigger value="services">บริการ</TabsTrigger>
            <TabsTrigger value="bookings">การจอง</TabsTrigger>
            <TabsTrigger value="satisfaction">ความพึงพอใจ</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>รายได้และการจองรายเดือน</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="revenue" fill="#10B981" name="รายได้ (บาท)" />
                      <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="#3B82F6" name="การจอง" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>สัดส่วนบริการ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={serviceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {serviceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>บริการยอดนิยม</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {serviceData.map((service, index) => (
                      <div key={service.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: service.color }} />
                          <span className="font-medium">{service.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{service.value}%</div>
                          <div className="text-sm text-gray-500">{Math.round(service.value * 4.1)} การจอง</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>การจองรายวัน (สัปดาห์นี้)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyBookings}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="bookings"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="satisfaction">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>คะแนนความพึงพอใจ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customerSatisfaction.map((item, index) => (
                      <div key={item.rating} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{item.rating}</span>
                          <span className="text-sm text-gray-600">
                            {item.count} รีวิว ({item.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>สรุปความพึงพอใจ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-yellow-600 mb-2">4.7</div>
                      <div className="flex justify-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-yellow-400 text-xl">
                            {star <= 4.7 ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                      <div className="text-gray-600">จาก 200 รีวิว</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">ความเป็นมืออาชีพ</span>
                        <span className="font-medium">4.8/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">ความรวดเร็ว</span>
                        <span className="font-medium">4.6/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">คุณภาพงาน</span>
                        <span className="font-medium">4.7/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">ราคาเหมาะสม</span>
                        <span className="font-medium">4.5/5</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
