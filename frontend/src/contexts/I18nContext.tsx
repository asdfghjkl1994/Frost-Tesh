"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"

type Locale = "en" | "th"
type Translations = Record<string, string>

const thTranslations = {
  home: "หน้าหลัก",
  products: "สินค้า",
  reviews: "รีวิว",
  blog: "บล็อก",
  booking: "จองบริการ",
  emergency: "เหตุฉุกเฉิน",
  login: "เข้าสู่ระบบ",
  register: "สมัครสมาชิก",
  logout: "ออกจากระบบ",
  admin: "ผู้ดูแลระบบ",
}

const enTranslations = {
  home: "Home",
  products: "Products",
  reviews: "Reviews",
  blog: "Blog",
  booking: "Booking",
  emergency: "Emergency",
  login: "Login",
  register: "Register",
  logout: "Logout",
  admin: "Admin",
}

interface I18nContextType {
  locale: Locale
  translations: Translations
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

export const I18nContext = createContext<I18nContextType>({
  locale: "th",
  translations: {},
  setLocale: () => {},
  t: (key: string) => key,
})

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>(() => {
    const savedLocale = localStorage.getItem("locale") as Locale
    return savedLocale || "th"
  })

  const [translations, setTranslations] = useState<Translations>(locale === "en" ? enTranslations : thTranslations)

  useEffect(() => {
    setTranslations(locale === "en" ? enTranslations : thTranslations)
    localStorage.setItem("locale", locale)
  }, [locale])

  const t = (key: string) => {
    return translations[key] || key
  }

  const value = {
    locale,
    translations,
    setLocale,
    t,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
