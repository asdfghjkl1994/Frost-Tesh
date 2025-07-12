"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Loader2 } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })
  const [loading, setLoading] = useState(false)
  const [firebaseLoading, setFirebaseLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Dynamically import Firebase functions
  const [firebaseAuth, setFirebaseAuth] = useState<any>(null)

  useEffect(() => {
    const loadFirebase = async () => {
      try {
        const { auth, db } = await import("@/lib/firebase")
        const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth")
        const { doc, setDoc } = await import("firebase/firestore")

        setFirebaseAuth({
          auth,
          db,
          createUserWithEmailAndPassword,
          updateProfile,
          doc,
          setDoc,
        })
      } catch (error) {
        console.error("Failed to load Firebase:", error)
        toast({
          title: "เกิดข้อผิดพลาด",
          description: "ไม่สามารถโหลดระบบได้",
          variant: "destructive",
        })
      } finally {
        setFirebaseLoading(false)
      }
    }

    loadFirebase()
  }, [toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firebaseAuth) return

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "รหัสผ่านไม่ตรงกัน",
        description: "กรุณาตรวจสอบรหัสผ่านอีกครั้ง",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const userCredential = await firebaseAuth.createUserWithEmailAndPassword(
        firebaseAuth.auth,
        formData.email,
        formData.password,
      )

      await firebaseAuth.updateProfile(userCredential.user, {
        displayName: formData.name,
      })

      await firebaseAuth.setDoc(firebaseAuth.doc(firebaseAuth.db, "users", userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: "user",
        createdAt: new Date(),
      })

      toast({
        title: "สมัครสมาชิกสำเร็จ",
        description: "ยินดีต้อนรับสู่ระบบ!",
      })

      router.push("/")
    } catch (error: any) {
      toast({
        title: "สมัครสมาชิกไม่สำเร็จ",
        description: "กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (firebaseLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>กำลังโหลด...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">สมัครสมาชิก</CardTitle>
          <CardDescription className="text-center">สร้างบัญชีใหม่เพื่อใช้บริการ</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="name">ชื่อ-นามสกุล</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="ชื่อ นามสกุล"
              />
            </div>
            <div>
              <Label htmlFor="email">อีเมล</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="08X-XXX-XXXX"
              />
            </div>
            <div>
              <Label htmlFor="password">รหัสผ่าน</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                minLength={6}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              สมัครสมาชิก
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">มีบัญชีแล้ว? </span>
            <Link href="/auth/login" className="text-sm text-blue-600 hover:underline">
              เข้าสู่ระบบ
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
