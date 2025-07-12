"use client"

import { useContext } from "react"
import { I18nContext } from "../contexts/I18nContext"

export const useI18n = () => {
  return useContext(I18nContext)
}
