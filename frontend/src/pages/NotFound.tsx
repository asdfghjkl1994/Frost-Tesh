import { Link } from "react-router-dom"
import { FaHome, FaExclamationTriangle } from "react-icons/fa"

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <FaExclamationTriangle className="mx-auto text-[#d4a43c] text-6xl mb-4" />
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-[#d4a43c] mb-4">ไม่พบหน้าที่ต้องการ</h2>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">ขออภัย หน้าที่คุณกำลังมองหาไม่มีอยู่ หรืออาจถูกย้ายไปแล้ว</p>
        </div>

        <div className="space-y-4">
          <Link to="/" className="btn-primary inline-flex">
            <FaHome className="mr-2" />
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
