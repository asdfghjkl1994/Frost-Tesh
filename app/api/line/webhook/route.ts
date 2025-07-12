import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-line-signature")

    // Verify webhook signature
    if (process.env.LINE_CHANNEL_SECRET && signature) {
      const hash = crypto.createHmac("sha256", process.env.LINE_CHANNEL_SECRET).update(body).digest("base64")

      if (signature !== `SHA256=${hash}`) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
      }
    }

    const data = JSON.parse(body)
    const events = data.events || []

    for (const event of events) {
      if (event.type === "message" && event.message.type === "text") {
        const userId = event.source.userId
        const messageText = event.message.text.toLowerCase()

        let replyMessage = null

        // Auto-reply logic based on message content
        if (messageText.includes("จอง") || messageText.includes("booking")) {
          replyMessage = {
            type: "flex",
            altText: "การจองบริการ - Service Booking",
            contents: {
              type: "bubble",
              header: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "📅 จองบริการ",
                    weight: "bold",
                    color: "#1DB446",
                    size: "lg",
                  },
                ],
                backgroundColor: "#F0F8F0",
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "เลือกวิธีการจองบริการ:",
                    wrap: true,
                    margin: "md",
                  },
                ],
              },
              footer: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "button",
                    action: {
                      type: "uri",
                      label: "จองออนไลน์",
                      uri: `${process.env.NEXT_PUBLIC_BASE_URL}/booking`,
                    },
                    style: "primary",
                    color: "#1DB446",
                  },
                  {
                    type: "button",
                    action: {
                      type: "uri",
                      label: "โทรจอง",
                      uri: "tel:+15551234567",
                    },
                    style: "secondary",
                    margin: "sm",
                  },
                ],
              },
            },
          }
        } else if (messageText.includes("ฉุกเฉิน") || messageText.includes("emergency")) {
          replyMessage = {
            type: "flex",
            altText: "🚨 Emergency Service",
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
                    align: "center",
                  },
                ],
                backgroundColor: "#FF4444",
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "สำหรับเหตุฉุกเฉิน กรุณาเลือก:",
                    wrap: true,
                  },
                ],
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
                      uri: "tel:+15551234567",
                    },
                    style: "primary",
                    color: "#FF4444",
                  },
                  {
                    type: "button",
                    action: {
                      type: "uri",
                      label: "แจ้งออนไลน์",
                      uri: `${process.env.NEXT_PUBLIC_BASE_URL}/emergency`,
                    },
                    style: "secondary",
                    margin: "sm",
                  },
                ],
              },
            },
          }
        } else if (messageText.includes("ราคา") || messageText.includes("price")) {
          replyMessage = {
            type: "flex",
            altText: "💰 ราคาบริการ - Service Prices",
            contents: {
              type: "bubble",
              header: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "💰 ราคาบริการ",
                    weight: "bold",
                    color: "#1DB446",
                    size: "lg",
                  },
                ],
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "🔧 ซ่อมแอร์: ฿800",
                    margin: "md",
                  },
                  {
                    type: "text",
                    text: "🧽 ล้างแอร์: ฿500",
                    margin: "sm",
                  },
                  {
                    type: "text",
                    text: "⚡ ซ่อมไฟฟ้า: ฿600",
                    margin: "sm",
                  },
                  {
                    type: "text",
                    text: "🚰 ซ่อมประปา: ฿700",
                    margin: "sm",
                  },
                  {
                    type: "text",
                    text: "☀️ ล้างโซล่าเซล: ฿1200",
                    margin: "sm",
                  },
                ],
              },
              footer: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "button",
                    action: {
                      type: "uri",
                      label: "ดูรายละเอียดเพิ่มเติม",
                      uri: `${process.env.NEXT_PUBLIC_BASE_URL}/#services`,
                    },
                    style: "primary",
                  },
                ],
              },
            },
          }
        } else if (messageText.includes("สวัสดี") || messageText.includes("hello") || messageText.includes("hi")) {
          replyMessage = {
            type: "flex",
            altText: "Welcome to Our Service",
            contents: {
              type: "bubble",
              header: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "👋 สวัสดีครับ!",
                    weight: "bold",
                    color: "#1DB446",
                    size: "lg",
                  },
                ],
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "ยินดีต้อนรับสู่บริการของเรา! เราให้บริการ:",
                    wrap: true,
                  },
                  {
                    type: "text",
                    text: "• ซ่อมแอร์และเครื่องใช้ไฟฟ้า",
                    margin: "md",
                    size: "sm",
                  },
                  {
                    type: "text",
                    text: "• ซ่อมไฟฟ้าและประปา",
                    margin: "sm",
                    size: "sm",
                  },
                  {
                    type: "text",
                    text: "• ล้างและบำรุงรักษาโซล่าเซล",
                    margin: "sm",
                    size: "sm",
                  },
                  {
                    type: "text",
                    text: "• บริการฉุกเฉิน 24/7",
                    margin: "sm",
                    size: "sm",
                  },
                ],
              },
              footer: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "button",
                    action: {
                      type: "uri",
                      label: "เยี่ยมชมเว็บไซต์",
                      uri: process.env.NEXT_PUBLIC_BASE_URL || "https://yourwebsite.com",
                    },
                    style: "primary",
                  },
                ],
              },
            },
          }
        } else {
          // Default response for unrecognized messages
          replyMessage = {
            type: "text",
            text: `สวัสดีครับ! 👋

ขอบคุณที่ติดต่อเรา เราให้บริการ:

🔧 จองบริการ - พิมพ์ "จอง"
🚨 เหตุฉุกเฉิน - พิมพ์ "ฉุกเฉิน"  
💰 สอบถามราคา - พิมพ์ "ราคา"
📞 โทรสอบถาม: (555) 123-4567

หรือเยี่ยมชมเว็บไซต์: ${process.env.NEXT_PUBLIC_BASE_URL}`,
          }
        }

        // Send reply message
        if (replyMessage && process.env.LINE_CHANNEL_ACCESS_TOKEN) {
          await fetch("https://api.line.me/v2/bot/message/reply", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              replyToken: event.replyToken,
              messages: [replyMessage],
            }),
          })
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: "Line webhook endpoint is active" })
}
