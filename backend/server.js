const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors())
app.use(morgan("combined"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/bookings", require("./routes/bookings"))
app.use("/api/emergency", require("./routes/emergency"))
app.use("/api/products", require("./routes/products"))
app.use("/api/reviews", require("./routes/reviews"))
app.use("/api/blog", require("./routes/blog"))
app.use("/api/notifications", require("./routes/notifications"))

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Service Booking API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      bookings: "/api/bookings",
      emergency: "/api/emergency",
      products: "/api/products",
      reviews: "/api/reviews",
      blog: "/api/blog",
      notifications: "/api/notifications",
    },
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: "Something went wrong!",
    message: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📱 Health check: http://localhost:${PORT}/health`)
  console.log(`🌐 API docs: http://localhost:${PORT}/`)
})
