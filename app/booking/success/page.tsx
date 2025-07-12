import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-green-600">จองบริการสำเร็จ!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">ขอบคุณที่ใช้บริการของเรา เราจะติดต่อกลับไปภายใน 24 ชั่วโมง</p>
              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link href="/">กลับหน้าหลัก</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/booking">จองบริการอื่น</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
