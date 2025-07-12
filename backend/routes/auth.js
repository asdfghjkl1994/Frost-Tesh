const express = require("express")
const router = express.Router()

// Mock user data
const users = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Regular User",
    role: "user",
  },
]

// Login endpoint
router.post("/login", (req, res) => {
  const { email, password } = req.body

  // Mock authentication
  const user = users.find((u) => u.email === email)

  if (!user) {
    return res.status(401).json({
      error: "Invalid credentials",
    })
  }

  // In real app, verify password hash
  const token = `mock-jwt-token-${user.id}`

  res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  })
})

// Register endpoint
router.post("/register", (req, res) => {
  const { email, password, name } = req.body

  // Check if user exists
  const existingUser = users.find((u) => u.email === email)
  if (existingUser) {
    return res.status(400).json({
      error: "User already exists",
    })
  }

  // Create new user
  const newUser = {
    id: String(users.length + 1),
    email,
    name,
    role: "user",
  }

  users.push(newUser)

  const token = `mock-jwt-token-${newUser.id}`

  res.status(201).json({
    success: true,
    user: newUser,
    token,
  })
})

// Get current user
router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      error: "No token provided",
    })
  }

  // Mock token verification
  const token = authHeader.split(" ")[1]
  const userId = token.split("-").pop()
  const user = users.find((u) => u.id === userId)

  if (!user) {
    return res.status(401).json({
      error: "Invalid token",
    })
  }

  res.json({
    success: true,
    user,
  })
})

module.exports = router
