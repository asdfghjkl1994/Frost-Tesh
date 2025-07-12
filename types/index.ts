export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "user" | "admin"
  createdAt: Date
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  category: "air" | "solar"
  features: string[]
}

export interface Booking {
  id: string
  userId: string
  userName: string
  userEmail: string
  service: string
  serviceId: string
  price: number
  date: string
  time: string
  address: string
  phone: string
  notes?: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: Date
}
