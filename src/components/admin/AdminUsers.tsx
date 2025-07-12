"use client"

import { useState, useEffect } from "react"
import { useI18n } from "../../hooks/useI18n"
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaEdit, FaTrash, FaSearch, FaBan, FaCheck } from "react-icons/fa"

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "customer" | "admin" | "technician"
  status: "active" | "inactive" | "banned"
  totalBookings: number
  totalSpent: number
  lastLogin: Date
  createdAt: Date
  address?: string
  notes?: string
}

const AdminUsers = () => {
  const { t } = useI18n()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const roles = [
    { id: "all", name: t("allRoles") },
    { id: "customer", name: t("customer") },
    { id: "admin", name: t("admin") },
    { id: "technician", name: t("technician") },
  ]

  const statuses = [
    { id: "all", name: t("allStatus") },
    { id: "active", name: t("active") },
    { id: "inactive", name: t("inactive") },
    { id: "banned", name: t("banned") },
  ]

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      // Mock data for demo
      const mockUsers: User[] = [
        {
          id: "1",
          name: "คุณสมชาย ใจดี",
          email: "somchai@email.com",
          phone: "081-234-5678",
          role: "customer",
          status: "active",
          totalBookings: 5,
          totalSpent: 12500,
          lastLogin: new Date("2024-01-20"),
          createdAt: new Date("2023-06-15"),
          address: "123 ถนนสุขุมวิท กรุงเทพฯ 10110",
          notes: "ลูกค้าประจำ ใช้บริการเป็นประจำ",
        },
        {
          id: "2",
          name: "คุณมาลี สวยงาม",
          email: "malee@email.com",
          phone: "082-345-6789",
          role: "customer",
          status: "active",
          totalBookings: 3,
          totalSpent: 7800,
          lastLogin: new Date("2024-01-18"),
          createdAt: new Date("2023-08-20"),
          address: "456 ถนนรัชดาภิเษก กรุงเทพฯ 10400",
        },
        {
          id: "3",
          name: "ช่างโอ๋",
          email: "technician@company.com",
          phone: "083-456-7890",
          role: "technician",
          status: "active",
          totalBookings: 0,
          totalSpent: 0,
          lastLogin: new Date("2024-01-21"),
          createdAt: new Date("2023-01-10"),
          notes: "ช่างมืออาชีพ ประสบการณ์ 10 ปี",
        },
        {
          id: "4",
          name: "Admin User",
          email: "admin@company.com",
          phone: "084-567-8901",
          role: "admin",
          status: "active",
          totalBookings: 0,
          totalSpent: 0,
          lastLogin: new Date("2024-01-21"),
          createdAt: new Date("2023-01-01"),
        },
        {
          id: "5",
          name: "คุณวิชัย หยุดใช้",
          email: "wichai@email.com",
          phone: "085-678-9012",
          role: "customer",
          status: "inactive",
          totalBookings: 1,
          totalSpent: 2500,
          lastLogin: new Date("2023-12-15"),
          createdAt: new Date("2023-11-01"),
          notes: "ไม่ได้ใช้บริการมานาน",
        },
      ]
      setUsers(mockUsers)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setShowEditModal(true)
  }

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm(t("confirmDelete"))) {
      try {
        setUsers(users.filter((u) => u.id !== userId))
        alert(t("userDeleted"))
      } catch (error) {
        console.error("Error deleting user:", error)
        alert(t("errorOccurred"))
      }
    }
  }

  const handleToggleStatus = async (userId: string, newStatus: "active" | "inactive" | "banned") => {
    try {
      setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
    } catch (error) {
      console.error("Error updating user status:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "banned":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800"
      case "technician":
        return "bg-blue-100 text-blue-800"
      case "customer":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)

    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus

    return matchesSearch && matchesRole && matchesStatus
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
        <h2 className="text-2xl font-bold text-[#d4a43c]">{t("userManagement")}</h2>
        <div className="text-sm text-gray-600">
          {t("totalUsers")}: {users.length}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600">{t("totalUsers")}</h3>
          <p className="text-2xl font-bold text-[#d4a43c]">{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600">{t("activeUsers")}</h3>
          <p className="text-2xl font-bold text-green-600">{users.filter((u) => u.status === "active").length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600">{t("customers")}</h3>
          <p className="text-2xl font-bold text-blue-600">{users.filter((u) => u.role === "customer").length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600">{t("totalRevenue")}</h3>
          <p className="text-2xl font-bold text-purple-600">
            ฿{users.reduce((sum, u) => sum + u.totalSpent, 0).toLocaleString()}
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
              placeholder={t("searchUsers")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
            />
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
          >
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("user")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("contact")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("role")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("bookings")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("spent")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("lastLogin")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-[#d4a43c] flex items-center justify-center">
                          <FaUser className="text-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">
                          {t("joined")}: {user.createdAt.toLocaleDateString("th-TH")}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <FaEnvelope className="text-gray-400" />
                      {user.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <FaPhone className="text-gray-400" />
                      {user.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}
                    >
                      {roles.find((r) => r.id === user.role)?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}
                    >
                      {statuses.find((s) => s.id === user.status)?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.totalBookings}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ฿{user.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      {user.lastLogin.toLocaleDateString("th-TH")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:text-blue-900"
                        title={t("edit")}
                      >
                        <FaEdit />
                      </button>
                      {user.status === "active" ? (
                        <button
                          onClick={() => handleToggleStatus(user.id, "banned")}
                          className="text-red-600 hover:text-red-900"
                          title={t("ban")}
                        >
                          <FaBan />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleToggleStatus(user.id, "active")}
                          className="text-green-600 hover:text-green-900"
                          title={t("activate")}
                        >
                          <FaCheck />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                        title={t("delete")}
                      >
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

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">{t("noUsersFound")}</p>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">{t("editUser")}</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder={t("name")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                defaultValue={editingUser.name}
              />
              <input
                type="email"
                placeholder={t("email")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                defaultValue={editingUser.email}
              />
              <input
                type="tel"
                placeholder={t("phone")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                defaultValue={editingUser.phone}
              />
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                defaultValue={editingUser.role}
              >
                {roles.slice(1).map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                defaultValue={editingUser.status}
              >
                {statuses.slice(1).map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
              <textarea
                placeholder={t("address")}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                defaultValue={editingUser.address || ""}
              />
              <textarea
                placeholder={t("notes")}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                defaultValue={editingUser.notes || ""}
              />
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#d4a43c] text-white px-4 py-2 rounded-lg hover:bg-[#b8932f] transition-colors"
                >
                  {t("update")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUsers
