import { type NextRequest, NextResponse } from "next/server"

// Mock database
const bookings: any[] = [
  {
    id: "1",
    customerName: "คุณสมชาย วงศ์ใหญ่",
    customerPhone: "081-234-5678",
    customerEmail: "somchai@email.com",
    service: "ซ่อมแอร์",
    date: "2024-01-15",
    time: "10:00",
    address: "123 ถนนสุขุมวิท กรุงเทพฯ",
    status: "confirmed",
    price: 800,
    notes: "แอร์ไม่เย็น",
    createdAt: new Date("2024-01-10").toISOString(),
  },
  {
    id: "2",
    customerName: "คุณนิดา สุขใส",
    customerPhone: "082-345-6789",
    customerEmail: "nida@email.com",
    service: "ซ่อมไฟฟ้า",
    date: "2024-01-16",
    time: "14:00",
    address: "456 ถนนลาดพร้าว กรุงเทพฯ",
    status: "pending",
    price: 600,
    notes: "ไฟดับบ่อย",
    createdAt: new Date("2024-01-11").toISOString(),
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  let filteredBookings = [...bookings]

  if (status && status !== "all") {
    filteredBookings = filteredBookings.filter((booking) => booking.status === status)
  }

  if (search) {
    filteredBookings = filteredBookings.filter(
      (booking) =>
        booking.customerName.toLowerCase().includes(search.toLowerCase()) ||
        booking.service.toLowerCase().includes(search.toLowerCase()) ||
        booking.customerPhone.includes(search),
    )
  }

  return NextResponse.json({
    success: true,
    data: filteredBookings,
    total: filteredBookings.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const newBooking = {
      id: Date.now().toString(),
      customerName: data.name,
      customerPhone: data.phone,
      customerEmail: data.email || "",
      service: data.service,
      date: data.date,
      time: data.time,
      address: data.address,
      status: "pending",
      price: data.price || 0,
      notes: data.description || "",
      createdAt: new Date().toISOString(),
    }

    bookings.push(newBooking)

    // Send notification
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          data: {
            userName: newBooking.customerName,
            userEmail: newBooking.customerEmail,
            service: newBooking.service,
            price: newBooking.price,
            date: newBooking.date,
            time: newBooking.time,
            address: newBooking.address,
            phone: newBooking.customerPhone,
            notes: newBooking.notes,
          },
        }),
      })
    } catch (error) {
      console.error("Notification error:", error)
    }

    return NextResponse.json({
      success: true,
      data: newBooking,
      message: "จองบริการสำเร็จ",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาด",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { id, status } = data

    const bookingIndex = bookings.findIndex((b) => b.id === id)
    if (bookingIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "ไม่พบการจอง",
        },
        { status: 404 },
      )
    }

    bookings[bookingIndex].status = status

    return NextResponse.json({
      success: true,
      data: bookings[bookingIndex],
      message: "อัพเดทสถานะสำเร็จ",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาด",
      },
      { status: 500 },
    )
  }
}
