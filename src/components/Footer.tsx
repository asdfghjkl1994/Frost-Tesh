import { Link } from "react-router-dom"
import { useI18n } from "../hooks/useI18n"
import { FaFacebook, FaLine, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

const Footer = () => {
  const { t } = useI18n()

  return (
    <footer className="bg-[#222222] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[#d4a43c] mb-4">{t("companyName")}</h3>
            <p className="text-gray-300 mb-4">{t("footerTagline")}</p>
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
            <h4 className="text-lg font-semibold text-[#d4a43c] mb-4">{t("services")}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-[#d4a43c]">
                  {t("airConditioningService")}
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-[#d4a43c]">
                  {t("electricalService")}
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-[#d4a43c]">
                  {t("plumbingService")}
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-[#d4a43c]">
                  {t("homeRepair")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#d4a43c] mb-4">{t("quickLinks")}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#d4a43c]">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-[#d4a43c]">
                  {t("products")}
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-300 hover:text-[#d4a43c]">
                  {t("reviews")}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-[#d4a43c]">
                  {t("blog")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#d4a43c] mb-4">{t("contact")}</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaPhone className="mr-2 text-[#d4a43c]" />
                <span className="text-gray-300">089-123-4567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-[#d4a43c]" />
                <span className="text-gray-300">contact@service.com</span>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-2 text-[#d4a43c] mt-1" />
                <span className="text-gray-300">{t("address")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} {t("companyName")}. {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
