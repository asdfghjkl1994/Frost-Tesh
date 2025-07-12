const express = require("express")
const router = express.Router()

// Mock bookings data
const bookings = [
  {
    id: "1",
    userId: "1",
    userName: "สมชาย ใจดี",
    userEmail: "somchai@email.com",
    service: "ซ่อมแอร์",
    serviceId: "air-repair",
    price: 800,
    date: "2024-01-25",
    time: "14:00",
    address: "123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพฯ",
    phone: "089-123-4567",
    notes: "แอร์ไม่เย็น เสียงดัง",
    status: "pending",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    userId: "2",
    userName: "สุดา รักสะอาด",
    userEmail: "suda@email.com",
    service: "ล้างแอร์",
    serviceId: "air-cleaning",
    price: 500,
    date: "2024-01-26",
    time: "10:00",
    address: "456 ถนนพระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพฯ",
    phone: "081-234-5678",
    notes: "ต้องการล้างแอร์ทำความสะอาด",
    status: "confirmed",
    createdAt: new Date("2024-01-19"),
  },
]

// Get all bookings
router.get("/", (req, res) => {
  const { status, userId } = req.query

  let filteredBookings = bookings

  if (status) {
    filteredBookings = filteredBookings.filter((b) => b.status === status)
  }

  if (userId) {
    filteredBookings = filteredBookings.filter((b) => b.userId === userId)
  }

  res.json({
    success: true,
    data: filteredBookings,
    total: filteredBookings.length,
  })
})

// Get booking by ID
router.get("/:id", (req, res) => {
  const booking = bookings.find((b) => b.id === req.params.id)

  if (!booking) {
    return res.status(404).json({
      error: "Booking not found",
    })
  }

  res.json({
    success: true,
    data: booking,
  })
})

// Create new booking
router.post("/", (req, res) => {
  const { userId, userName, userEmail, service, serviceId, price, date, time, address, phone, notes } = req.body

  const newBooking = {
    id: String(bookings.length + 1),
    userId,
    userName,
    userEmail,
    service,
    serviceId,
    price,
    date,
    time,
    address,
    phone,
    notes,
    status: "pending",
    createdAt: new Date(),
  }

  bookings.push(newBooking)

  // Send notification (mock)
  console.log("📧 Booking notification sent:", newBooking.id)

  res.status(201).json({
    success: true,
    data: newBooking,
    message: "Booking created successfully",
  })
})

// Update booking status
router.patch("/:id/status", (req, res) => {
  const { status } = req.body
  const bookingIndex = bookings.findIndex((b) => b.id === req.params.id)

  if (bookingIndex === -1) {
    return res.status(404).json({
      error: "Booking not found",
    })
  }

  bookings[bookingIndex].status = status
  bookings[bookingIndex].updatedAt = new Date()

  res.json({
    success: true,
    data: bookings[bookingIndex],
    message: "Booking status updated",
  })
})

// Delete booking
router.delete("/:id", (req, res) => {
  const bookingIndex = bookings.findIndex((b) => b.id === req.params.id)

  if (bookingIndex === -1) {
    return res.status(404).json({
      error: "Booking not found",
    })
  }

  const deletedBooking = bookings.splice(bookingIndex, 1)[0]

  res.json({
    success: true,
    data: deletedBooking,
    message: "Booking deleted successfully",
  })
})

module.exports = router
