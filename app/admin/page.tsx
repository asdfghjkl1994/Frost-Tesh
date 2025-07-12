"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, DollarSign, AlertTriangle, Clock, XCircle } from "lucide-react"

export default function AdminPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")

  // Mock data
  const stats = {
    totalBookings: 1247,
    activeBookings: 23,
    totalRevenue: 89750,
    emergencyRequests: 5,
  }

  const recentBookings = [
    { id: 1, customer: "John Doe", service: "Plumbing", date: "2024-01-15", status: "completed" },
    { id: 2, customer: "Jane Smith", service: "Electrical", date: "2024-01-15", status: "in-progress" },
    { id: 3, customer: "Mike Johnson", service: "HVAC", date: "2024-01-16", status: "scheduled" },
    { id: 4, customer: "Sarah Wilson", service: "Cleaning", date: "2024-01-16", status: "pending" },
  ]

  const emergencyRequests = [
    {
      id: 1,
      customer: "Emergency User 1",
      type: "Plumbing",
      address: "123 Main St",
      time: "10 mins ago",
      status: "dispatched",
    },
    {
      id: 2,
      customer: "Emergency User 2",
      type: "Electrical",
      address: "456 Oak Ave",
      time: "25 mins ago",
      status: "completed",
    },
  ]

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center p-8">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.activeBookings}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Emergency Requests</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.emergencyRequests}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{booking.customer}</p>
                          <p className="text-sm text-gray-600">
                            {booking.service} • {booking.date}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "in-progress"
                                ? "bg-blue-100 text-blue-800"
                                : booking.status === "scheduled"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emergencyRequests.map((request) => (
                      <div key={request.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-red-900">{request.customer}</p>
                          <span className="text-xs text-red-600">{request.time}</span>
                        </div>
                        <p className="text-sm text-red-700">
                          {request.type} • {request.address}
                        </p>
                        <div className="mt-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              request.status === "dispatched"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {request.status}
                          </span>
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
                <CardTitle>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{booking.customer}</h3>
                        <p className="text-sm text-gray-600">{booking.service}</p>
                        <p className="text-sm text-gray-500">{booking.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            booking.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "in-progress"
                                ? "bg-blue-100 text-blue-800"
                                : booking.status === "scheduled"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emergency">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Emergency Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyRequests.map((request) => (
                    <div key={request.id} className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-red-900">{request.customer}</h3>
                        <span className="text-sm text-red-600">{request.time}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-red-800">Type</p>
                          <p className="text-sm text-red-700">{request.type}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-red-800">Address</p>
                          <p className="text-sm text-red-700">{request.address}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-red-800">Status</p>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              request.status === "dispatched"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {request.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Contact Customer
                        </Button>
                        <Button size="sm" variant="outline">
                          Dispatch Technician
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
                  <p className="text-gray-600">User management features will be available here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
