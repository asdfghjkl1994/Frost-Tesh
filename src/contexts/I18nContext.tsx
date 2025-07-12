"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import enTranslations from "../locales/en.json"
import thTranslations from "../locales/th.json"

type Locale = "en" | "th"
type Translations = Record<string, string>

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
