"use client"

import { useState, useEffect } from "react"
import { useI18n } from "../../hooks/useI18n"
import { FaSave, FaUpload, FaTrash, FaPlus, FaEdit } from "react-icons/fa"

interface Settings {
  companyInfo: {
    name: string
    description: string
    address: string
    phone: string
    email: string
    website: string
    logo: string
  }
  businessHours: {
    monday: { open: string; close: string; closed: boolean }
    tuesday: { open: string; close: string; closed: boolean }
    wednesday: { open: string; close: string; closed: boolean }
    thursday: { open: string; close: string; closed: boolean }
    friday: { open: string; close: string; closed: boolean }
    saturday: { open: string; close: string; closed: boolean }
    sunday: { open: string; close: string; closed: boolean }
  }
  services: Array<{
    id: string
    name: string
    description: string
    price: number
    duration: number
    active: boolean
  }>
  notifications: {
    emailNotifications: boolean
    smsNotifications: boolean
    lineNotifications: boolean
    emergencyAlerts: boolean
  }
  pricing: {
    emergencyFee: number
    weekendSurcharge: number
    holidaySurcharge: number
    cancellationFee: number
  }
}

const AdminSettings = () => {
  const { t } = useI18n()
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("company")

  const tabs = [
    { id: "company", name: t("companyInfo"), icon: "🏢" },
    { id: "hours", name: t("businessHours"), icon: "🕒" },
    { id: "services", name: t("services"), icon: "🔧" },
    { id: "notifications", name: t("notifications"), icon: "🔔" },
    { id: "pricing", name: t("pricing"), icon: "💰" },
  ]

  const days = [
    { id: "monday", name: t("monday") },
    { id: "tuesday", name: t("tuesday") },
    { id: "wednesday", name: t("wednesday") },
    { id: "thursday", name: t("thursday") },
    { id: "friday", name: t("friday") },
    { id: "saturday", name: t("saturday") },
    { id: "sunday", name: t("sunday") },
  ]

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      // Mock data for demo
      const mockSettings: Settings = {
        companyInfo: {
          name: "บริษัท แอร์เซอร์วิส จำกัด",
          description: "ผู้เชี่ยวชาญด้านแอร์คอนดิชั่นเนอร์ ให้บริการครบวงจร",
          address: "123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองตัน กรุงเทพฯ 10110",
          phone: "02-123-4567",
          email: "info@airservice.com",
          website: "www.airservice.com",
          logo: "/placeholder.svg?height=100&width=200",
        },
        businessHours: {
          monday: { open: "08:00", close: "18:00", closed: false },
          tuesday: { open: "08:00", close: "18:00", closed: false },
          wednesday: { open: "08:00", close: "18:00", closed: false },
          thursday: { open: "08:00", close: "18:00", closed: false },
          friday: { open: "08:00", close: "18:00", closed: false },
          saturday: { open: "09:00", close: "17:00", closed: false },
          sunday: { open: "09:00", close: "17:00", closed: true },
        },
        services: [
          {
            id: "1",
            name: "ติดตั้งแอร์",
            description: "บริการติดตั้งแอร์คอนดิชั่นเนอร์ทุกยี่ห้อ",
            price: 2500,
            duration: 120,
            active: true,
          },
          {
            id: "2",
            name: "ซ่อมแอร์",
            description: "บริการซ่อมแซมแอร์คอนดิชั่นเนอร์",
            price: 800,
            duration: 90,
            active: true,
          },
          {
            id: "3",
            name: "ล้างแอร์",
            description: "บริการทำความสะอาดแอร์คอนดิชั่นเนอร์",
            price: 500,
            duration: 60,
            active: true,
          },
        ],
        notifications: {
          emailNotifications: true,
          smsNotifications: false,
          lineNotifications: true,
          emergencyAlerts: true,
        },
        pricing: {
          emergencyFee: 500,
          weekendSurcharge: 200,
          holidaySurcharge: 300,
          cancellationFee: 100,
        },
      }
      setSettings(mockSettings)
    } catch (error) {
      console.error("Error fetching settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!settings) return

    setSaving(true)
    try {
      // Save settings logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Mock delay
      alert(t("settingsSaved"))
    } catch (error) {
      console.error("Error saving settings:", error)
      alert(t("errorOccurred"))
    } finally {
      setSaving(false)
    }
  }

  const updateSettings = (path: string, value: any) => {
    if (!settings) return

    const keys = path.split(".")
    const newSettings = { ...settings }
    let current: any = newSettings

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]]
    }
    current[keys[keys.length - 1]] = value

    setSettings(newSettings)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-[#d4a43c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!settings) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#d4a43c]">{t("systemSettings")}</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#d4a43c] text-white px-6 py-2 rounded-lg hover:bg-[#b8932f] transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <FaSave />
          {saving ? t("saving") : t("saveSettings")}
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-[#d4a43c] text-[#d4a43c]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Company Info Tab */}
          {activeTab === "company" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">{t("companyInformation")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("companyName")}</label>
                  <input
                    type="text"
                    value={settings.companyInfo.name}
                    onChange={(e) => updateSettings("companyInfo.name", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("phone")}</label>
                  <input
                    type="tel"
                    value={settings.companyInfo.phone}
                    onChange={(e) => updateSettings("companyInfo.phone", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("email")}</label>
                  <input
                    type="email"
                    value={settings.companyInfo.email}
                    onChange={(e) => updateSettings("companyInfo.email", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("website")}</label>
                  <input
                    type="url"
                    value={settings.companyInfo.website}
                    onChange={(e) => updateSettings("companyInfo.website", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("description")}</label>
                <textarea
                  rows={3}
                  value={settings.companyInfo.description}
                  onChange={(e) => updateSettings("companyInfo.description", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("address")}</label>
                <textarea
                  rows={2}
                  value={settings.companyInfo.address}
                  onChange={(e) => updateSettings("companyInfo.address", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("logo")}</label>
                <div className="flex items-center gap-4">
                  <img
                    src={settings.companyInfo.logo || "/placeholder.svg"}
                    alt="Company Logo"
                    className="h-16 w-32 object-contain border border-gray-300 rounded"
                  />
                  <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors flex items-center gap-2">
                    <FaUpload /> {t("uploadLogo")}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Business Hours Tab */}
          {activeTab === "hours" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">{t("businessHours")}</h3>
              <div className="space-y-4">
                {days.map((day) => (
                  <div key={day.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-24">
                      <span className="font-medium">{day.name}</span>
                    </div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={!settings.businessHours[day.id as keyof typeof settings.businessHours].closed}
                        onChange={(e) => updateSettings(`businessHours.${day.id}.closed`, !e.target.checked)}
                        className="mr-2"
                      />
                      {t("open")}
                    </label>
                    {!settings.businessHours[day.id as keyof typeof settings.businessHours].closed && (
                      <>
                        <input
                          type="time"
                          value={settings.businessHours[day.id as keyof typeof settings.businessHours].open}
                          onChange={(e) => updateSettings(`businessHours.${day.id}.open`, e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                        />
                        <span>-</span>
                        <input
                          type="time"
                          value={settings.businessHours[day.id as keyof typeof settings.businessHours].close}
                          onChange={(e) => updateSettings(`businessHours.${day.id}.close`, e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{t("serviceManagement")}</h3>
                <button className="bg-[#d4a43c] text-white px-4 py-2 rounded hover:bg-[#b8932f] transition-colors flex items-center gap-2">
                  <FaPlus /> {t("addService")}
                </button>
              </div>
              <div className="space-y-4">
                {settings.services.map((service, index) => (
                  <div key={service.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div>
                        <input
                          type="text"
                          value={service.name}
                          onChange={(e) => updateSettings(`services.${index}.name`, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                          placeholder={t("serviceName")}
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          value={service.price}
                          onChange={(e) => updateSettings(`services.${index}.price`, Number.parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                          placeholder={t("price")}
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          value={service.duration}
                          onChange={(e) =>
                            updateSettings(`services.${index}.duration`, Number.parseInt(e.target.value))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                          placeholder={t("duration") + " (นาที)"}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={service.active}
                            onChange={(e) => updateSettings(`services.${index}.active`, e.target.checked)}
                            className="mr-2"
                          />
                          {t("active")}
                        </label>
                        <button className="text-blue-600 hover:text-blue-800">
                          <FaEdit />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <textarea
                        rows={2}
                        value={service.description}
                        onChange={(e) => updateSettings(`services.${index}.description`, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                        placeholder={t("serviceDescription")}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">{t("notificationSettings")}</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <span className="font-medium">{t("emailNotifications")}</span>
                    <p className="text-sm text-gray-600">{t("emailNotificationsDesc")}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailNotifications}
                    onChange={(e) => updateSettings("notifications.emailNotifications", e.target.checked)}
                    className="h-5 w-5"
                  />
                </label>
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <span className="font-medium">{t("smsNotifications")}</span>
                    <p className="text-sm text-gray-600">{t("smsNotificationsDesc")}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.smsNotifications}
                    onChange={(e) => updateSettings("notifications.smsNotifications", e.target.checked)}
                    className="h-5 w-5"
                  />
                </label>
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <span className="font-medium">{t("lineNotifications")}</span>
                    <p className="text-sm text-gray-600">{t("lineNotificationsDesc")}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.lineNotifications}
                    onChange={(e) => updateSettings("notifications.lineNotifications", e.target.checked)}
                    className="h-5 w-5"
                  />
                </label>
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <span className="font-medium">{t("emergencyAlerts")}</span>
                    <p className="text-sm text-gray-600">{t("emergencyAlertsDesc")}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.emergencyAlerts}
                    onChange={(e) => updateSettings("notifications.emergencyAlerts", e.target.checked)}
                    className="h-5 w-5"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === "pricing" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">{t("pricingSettings")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("emergencyFee")} (฿)</label>
                  <input
                    type="number"
                    value={settings.pricing.emergencyFee}
                    onChange={(e) => updateSettings("pricing.emergencyFee", Number.parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("weekendSurcharge")} (฿)</label>
                  <input
                    type="number"
                    value={settings.pricing.weekendSurcharge}
                    onChange={(e) => updateSettings("pricing.weekendSurcharge", Number.parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("holidaySurcharge")} (฿)</label>
                  <input
                    type="number"
                    value={settings.pricing.holidaySurcharge}
                    onChange={(e) => updateSettings("pricing.holidaySurcharge", Number.parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("cancellationFee")} (฿)</label>
                  <input
                    type="number"
                    value={settings.pricing.cancellationFee}
                    onChange={(e) => updateSettings("pricing.cancellationFee", Number.parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a43c] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminSettings
