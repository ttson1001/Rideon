
import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { translations, type Language, getNestedTranslation } from "@/lib/i18n"

type Theme = "light" | "dark" | "system"

interface AppContextType {
  // Language
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string

  // Theme
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "light" | "dark"
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("vi")
  const [theme, setTheme] = useState<Theme>("light")
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

  // Translation function
  const t = (key: string): string => {
    return getNestedTranslation(translations[language], key)
  }

  // Load saved preferences
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    const savedTheme = localStorage.getItem("theme") as Theme

    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }

    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  // Handle theme changes
  useEffect(() => {
    const root = window.document.documentElement

    const applyTheme = (isDark: boolean) => {
      root.classList.remove("light", "dark")
      root.classList.add(isDark ? "dark" : "light")
      setResolvedTheme(isDark ? "dark" : "light")
    }

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      applyTheme(mediaQuery.matches)

      const handleChange = (e: MediaQueryListEvent) => applyTheme(e.matches)
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    } else {
      applyTheme(theme === "dark")
    }
  }, [theme])

  // Save preferences
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t,
        theme,
        setTheme: handleSetTheme,
        resolvedTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
