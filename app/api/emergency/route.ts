import { type NextRequest, NextResponse } from "next/server"

// Mock emergency requests database
const emergencyRequests: any[] = [
  {
    id: "1",
    name: "คุณวิชัย เจริญสุข",
    phone: "083-456-7890",
    address: "789 ถนนสุขุมวิท กรุงเทพฯ",
    type: "electrical",
    description: "ไฟดับทั้งบ้าน มีกลิ่นไหม้",
    status: "dispatched",
    priority: "high",
    createdAt: new Date("2024-01-12T22:30:00").toISOString(),
    assignedTechnician: "ช่างสมศักดิ์",
  },
]

export async function GET() {
  return NextResponse.json({
    success: true,
    data: emergencyRequests,
    total: emergencyRequests.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const newEmergency = {
      id: Date.now().toString(),
      name: data.name,
      phone: data.phone,
      address: data.address,
      type: data.type,
      description: data.description,
      status: "pending",
      priority: "high",
      createdAt: new Date().toISOString(),
      assignedTechnician: null,
    }

    emergencyRequests.push(newEmergency)

    // Send emergency notification
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "emergency",
          data: newEmergency,
        }),
      })
    } catch (error) {
      console.error("Emergency notification error:", error)
    }

    return NextResponse.json({
      success: true,
      data: newEmergency,
      message: "แจ้งเหตุฉุกเฉินสำเร็จ",
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
    const { id, status, assignedTechnician } = data

    const emergencyIndex = emergencyRequests.findIndex((e) => e.id === id)
    if (emergencyIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "ไม่พบคำขอฉุกเฉิน",
        },
        { status: 404 },
      )
    }

    emergencyRequests[emergencyIndex].status = status
    if (assignedTechnician) {
      emergencyRequests[emergencyIndex].assignedTechnician = assignedTechnician
    }

    return NextResponse.json({
      success: true,
      data: emergencyRequests[emergencyIndex],
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
