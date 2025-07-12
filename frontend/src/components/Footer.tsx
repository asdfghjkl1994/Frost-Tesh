import { Link } from "react-router-dom"
import { FaFacebook, FaLine, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-[#222222] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[#d4a43c] mb-4">ServiceBooking</h3>
            <p className="text-gray-300 mb-4">บริการซ่อมบำรุงครบวงจร ด้วยทีมช่างมืออาชีพ</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#d4a43c]">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#d4a43c]">
                <FaLine size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#d4a43c] mb-4">บริการ</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-[#d4a43c]">
                  ซ่อมแอร์
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-[#d4a43c]">
                  ล้างแอร์
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-[#d4a43c]">
                  ติดตั้งแอร์
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-[#d4a43c]">
                  ซ่อมเครื่องใช้ไฟฟ้า
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#d4a43c] mb-4">เมนู</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#d4a43c]">
                  หน้าหลัก
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-[#d4a43c]">
                  สินค้า
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-[#d4a43c]">
                  จองบริการ
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-300 hover:text-[#d4a43c]">
                  รีวิว
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#d4a43c] mb-4">ติดต่อ</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-300">
                <FaPhone className="h-4 w-4" />
                <span>089-123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <FaEnvelope className="h-4 w-4" />
                <span>info@servicebooking.com</span>
              </li>
              <li className="flex items-start gap-2 text-gray-300">
                <FaMapMarkerAlt className="h-4 w-4 mt-1" />
                <span>123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพฯ 10110</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">© {new Date().getFullYear()} ServiceBooking. สงวนลิขสิทธิ์.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
