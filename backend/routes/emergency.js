const express = require("express")
const router = express.Router()

// Mock emergency requests data
let emergencyRequests = [
  {
    id: "1",
    userId: "1",
    userEmail: "emergency1@email.com",
    name: "สมชาย ฉุกเฉิน",
    phone: "089-999-1111",
    area: "Pattaya",
    service: "aircon",
    details: "แอร์เสียกลางคืน ร้อนมาก ต้องการช่างด่วน",
    address: "123 ถนนพัทยา ตำบลหนองปรือ อำเภอบางละมุง ชลบุรี",
    status: "urgent",
    priority: "high",
    createdAt: new Date(),
  },
  {
    id: "2",
    userId: "2",
    userEmail: "emergency2@email.com",
    name: "สุดา ไฟดับ",
    phone: "081-888-2222",
    area: "Jomtien",
    service: "electrical",
    details: "ไฟดับทั้งบ้าน เบรกเกอร์ตก ไม่สามารถเปิดได้",
    address: "456 ถนนจอมเทียน ตำบลหนองปรือ อำเภอบางละมุง ชลบุรี",
    status: "assigned",
    priority: "high",
    createdAt: new Date(Date.now() - 3600000),
  },
]

// Get all emergency requests
router.get("/", (req, res) => {
  const { status, area, priority } = req.query

  let filteredRequests = emergencyRequests

  if (status) {
    filteredRequests = filteredRequests.filter((r) => r.status === status)
  }

  if (area) {
    filteredRequests = filteredRequests.filter((r) => r.area === area)
  }

  if (priority) {
    filteredRequests = filteredRequests.filter((r) => r.priority === priority)
  }

  res.json({
    success: true,
    data: filteredRequests,
  })
})

// Get emergency request by ID
router.get("/:id", (req, res) => {
  const request = emergencyRequests.find((r) => r.id === req.params.id)

  if (!request) {
    return res.status(404).json({
      error: "Emergency request not found",
    })
  }

  res.json({
    success: true,
    data: request,
  })
})

// Create new emergency request
router.post("/", (req, res) => {
  const { userId, userEmail, name, phone, area, service, details, address } = req.body

  const newRequest = {
    id: String(emergencyRequests.length + 1),
    userId,
    userEmail,
    name,
    phone,
    area,
    service,
    details,
    address,
    status: "urgent",
    priority: "high",
    createdAt: new Date(),
  }

  emergencyRequests.push(newRequest)

  // Send urgent notification (mock)
  console.log("🚨 Emergency notification sent:", newRequest.id)

  res.json({
    success: true,
    data: newRequest,
  })
})

// Update emergency request
router.put("/:id", (req, res) => {
  const requestId = req.params.id
  const { status, priority } = req.body

  const requestIndex = emergencyRequests.findIndex((r) => r.id === requestId)

  if (requestIndex === -1) {
    return res.status(404).json({
      error: "Emergency request not found",
    })
  }

  emergencyRequests[requestIndex] = {
    ...emergencyRequests[requestIndex],
    status: status || emergencyRequests[requestIndex].status,
    priority: priority || emergencyRequests[requestIndex].priority,
  }

  res.json({
    success: true,
    data: emergencyRequests[requestIndex],
  })
})

// Delete emergency request
router.delete("/:id", (req, res) => {
  emergencyRequests = emergencyRequests.filter((r) => r.id !== req.params.id)

  res.json({
    success: true,
    message: "Emergency request deleted",
  })
})

module.exports = router
