import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json()

    if (type === "booking") {
      // Create rich message for Line Messaging API
      const flexMessage = {
        type: "flex",
        altText: "การจองใหม่ - New Booking",
        contents: {
          type: "bubble",
          header: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "🔔 การจองใหม่!",
                weight: "bold",
                color: "#1DB446",
                size: "lg"
              }
            ],
            backgroundColor: "#F0F8F0"
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "👤 ลูกค้า:",
                    weight: "bold",
                    flex: 2
                  },
                  {
                    type: "text",
                    text: data.userName,
                    flex: 3,
                    wrap: true
                  }
                ]
              },
              {
                type: "separator",
                margin: "md"
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "📧 อีเมล:",
                    weight: "bold",
                    flex: 2
                  },
                  {
                    type: "text",
                    text: data.userEmail,
                    flex: 3,
                    wrap: true,
                    color: "#0066CC"
                  }
                ],
                margin: "md"
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "🛠️ บริการ:",
                    weight: "bold",
                    flex: 2
                  },
                  {
                    type: "text",
                    text: data.service,
                    flex: 3,
                    wrap: true
                  }
                ],
                margin: "md"
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "💰 ราคา:",
                    weight: "bold",
                    flex: 2
                  },
                  {
                    type: "text",
                    text: `฿${data.price}`,
                    flex: 3,
                    color: "#FF6B35",
                    weight: "bold"
                  }
                ],
                margin: "md"
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "📅 วันเวลา:",
                    weight: "bold",
                    flex: 2
                  },
                  {
                    type: "text",
                    text: `${data.date} ${data.time}`,
                    flex: 3,
                    wrap: true
                  }
                ],
                margin: "md"
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "📍 ที่อยู่:",
                    weight: "bold",
                    flex: 2
                  },
                  {
                    type: "text",
                    text: data.address,
                    flex: 3,
                    wrap: true
                  }
                ],
                margin: "md"
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "📞 เบอร์:",
                    weight: "bold",
                    flex: 2
                  },
                  {
                    type: "text",
                    text: data.phone,
                    flex: 3,
                    color: "#0066CC"
                  }
                ],
                margin: "md"
              }
            ]
          },
          footer: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "button",
                action: {
                  type: "uri",
                  label: "โทรหาลูกค้า",
                  uri: `tel:${data.phone}`
                },
                style: "primary",
                color: "#1DB446"
              },
              {
                type: "button",
                action: {
                  type: "uri",
                  label: "ส่งอีเมล",
                  uri: `mailto:${data.userEmail}`
                },
                style: "secondary",
                margin: "sm"
              }
            ]
          }
        }
      }

      // Add notes if provided
      if (data.notes) {
        flexMessage.contents.body.contents.push(
          {
            type: "separator",
            margin: "md"
          },
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "📝 หมายเหตุ:",
                weight: "bold",
                margin: "md"
              },
              {
                type: "text",
                text: data.notes,
                wrap: true,
                color: "#666666",
                size: "sm"
              }
            ]
          }
        )
      }

      // Send to Line Messaging API
      if (process.env.LINE_CHANNEL_ACCESS_TOKEN && process.env.LINE_USER_ID) {
        const lineResponse = await fetch("https://api.line.me/v2/bot/message/push", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: process.env.LINE_USER_ID,
            messages: [flexMessage]
          }),
        })

        if (!lineResponse.ok) {
          console.error("Line API Error:", await lineResponse.text())
        }
      }

      // Send Email (if configured)
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        // You can implement email sending here using nodemailer or similar
        console.log("Email notification would be sent here")
      }
    }

    if (type === "emergency") {
      // Create urgent emergency message
      const emergencyMessage = {
        type: "flex",
        altText: "🚨 EMERGENCY REQUEST - ขอความช่วยเหลือฉุกเฉิน",
        contents: {
          type: "bubble",
          header: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "🚨 EMERGENCY",
                weight: "bold",
                color: "#FFFFFF",
                size: "xl",
                align: "center"
              },
              {
                type: "text",
                text: "ขอความช่วยเหลือฉุกเฉิน",
                color: "#FFFFFF",
                size: "md",
                align: "center"
              }
            ],
            backgroundColor: "#FF4444",
            paddingAll: "20px"
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: `⚡ ประเภท: ${data.type}`,
                weight: "bold",
                size: "lg",
                color: "#FF4444"
              },
              {
                type: "separator",
                margin: "md"
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "👤 ชื่อ:",
                    weight: "bold",
                    flex: 2
                  },
                  {
                    type: "text",
                    text: data.name,
                    flex: 3,
                    wrap: true
                  }
                ],
                margin: "md"
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "📞 เบอร์:",
                    weight: "bold",
                    flex: 2
                  },
                  {
                    type: "text",
                    text: data.phone,
                    flex: 3,
                    color: "#0066CC"
                  }
                ],
                margin: "md"
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "📍 ที่อยู่:",
                    weight: "bold",
                    flex: 2
                  },
                  {
                    type: "text",
                    text: data.address,
                    flex: 3,
                    wrap: true
                  }
                ],
                margin: "md"
              },
              {
                type: "separator",
                margin: "md"
              },
              {
                type: "text",
                text: "📝 รายละเอียด:",
                weight: "bold",
                margin: "md"
              },
              {
                type: "text",
                text: data.description,
                wrap: true,
                color: "#666666"
              }
            ]
          },
          footer: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "button",
                action: {
                  type: "uri",
                  label: "🚨 โทรด่วน",
                  uri: `tel:${data.phone}`
                },
                style: "primary",
                color: "#FF4444"
              },
              {
                type: "text",
                text: "⏰ กรุณาติดต่อภายใน 15 นาที",
                align: "center",
                color: "#FF4444",
                weight: "bold",
                margin: "md"
              }
            ]
          }
        }
      }

      // Send emergency message to Line
      if (process.env.LINE_CHANNEL_ACCESS_TOKEN && process.env.LINE_USER_ID) {
        await fetch("https://api.line.me/v2/bot/message/push", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: process.env.LINE_USER_ID,
            messages: [emergencyMessage]
          }),
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Notification error:", error)
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}
