"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageCircle, Star } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">ServicePro</h3>
              <p className="text-gray-400 leading-relaxed">
                ผู้ให้บริการซ่อมแซมและบำรุงรักษาที่คุณไว้วางใจ ด้วยทีมช่างมืออาชีพและบริการคุณภาพสูง
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-400">4.9/5 จาก 5,000+ รีวิว</span>
            </div>

            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-pink-600 p-2 rounded-lg hover:bg-pink-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-green-600 p-2 rounded-lg hover:bg-green-700 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">บริการของเรา</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/aircon" className="text-gray-400 hover:text-white transition-colors">
                  ซ่อม/ล้างแอร์
                </Link>
              </li>
              <li>
                <Link href="/services/electrical" className="text-gray-400 hover:text-white transition-colors">
                  ซ่อมไฟฟ้า
                </Link>
              </li>
              <li>
                <Link href="/services/plumbing" className="text-gray-400 hover:text-white transition-colors">
                  ซ่อมประปา
                </Link>
              </li>
              <li>
                <Link href="/services/appliance" className="text-gray-400 hover:text-white transition-colors">
                  ซ่อมเครื่องใช้ไฟฟ้า
                </Link>
              </li>
              <li>
                <Link href="/services/solar" className="text-gray-400 hover:text-white transition-colors">
                  ล้างโซล่าเซล
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="text-red-400 hover:text-red-300 transition-colors">
                  บริการฉุกเฉิน 24/7
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">ลิงก์ด่วน</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/booking" className="text-gray-400 hover:text-white transition-colors">
                  จองบริการ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  ราคาบริการ
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-400 hover:text-white transition-colors">
                  รีวิวลูกค้า
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  บทความ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">ติดต่อเรา</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">โทรศัพท์</p>
                  <p className="text-gray-400">02-XXX-XXXX</p>
                  <p className="text-gray-400">08X-XXX-XXXX</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">อีเมล</p>
                  <p className="text-gray-400">info@servicepro.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">ที่อยู่</p>
                  <p className="text-gray-400">
                    123 ถนนสุขุมวิท
                    <br />
                    กรุงเทพฯ 10110
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">เวลาทำการ</p>
                  <p className="text-gray-400">จ-ศ: 8:00-18:00</p>
                  <p className="text-red-400">ฉุกเฉิน: 24 ชั่วโมง</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="py-8 border-t border-gray-800">
          <div className="bg-red-600 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-2">🚨 บริการฉุกเฉิน 24 ชั่วโมง</h3>
            <p className="text-red-100 mb-4">เมื่อคุณต้องการความช่วยเหลือด่วน โทรเลย!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:02-xxx-xxxx"
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                📞 02-XXX-XXXX
              </a>
              <Link
                href="/emergency"
                className="bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-800 transition-colors"
              >
                แจ้งเหตุฉุกเฉินออนไลน์
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 ServicePro. สงวนลิขสิทธิ์ทุกประการ</div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                นโยบายความเป็นส่วนตัว
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                ข้อกำหนดการใช้งาน
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                แผนผังเว็บไซต์
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
