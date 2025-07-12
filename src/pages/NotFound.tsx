import { Link } from "react-router-dom"
import { useI18n } from "../hooks/useI18n"
import { FaHome, FaExclamationTriangle } from "react-icons/fa"

const NotFound = () => {
  const { t } = useI18n()

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <FaExclamationTriangle className="mx-auto text-[#d4a43c] text-6xl mb-4" />
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-[#d4a43c] mb-4">{t("pageNotFound")}</h2>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">{t("pageNotFoundDescription")}</p>
        </div>

        <div className="space-y-4">
          <Link to="/" className="btn-primary inline-flex">
            <FaHome className="mr-2" />
            {t("backToHome")}
          </Link>

          <div className="text-sm text-gray-400">
            <p>
              {t("needHelp")}{" "}
              <Link to="/#contact" className="text-[#d4a43c] hover:underline">
                {t("contactUs")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
