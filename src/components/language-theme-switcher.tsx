
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useApp } from "@/contexts/app-context"
import { Globe, Moon, Sun, Monitor, Check } from "lucide-react"

export function LanguageThemeSwitcher() {
  const { language, setLanguage, theme, setTheme, t } = useApp()

  const languages = [
    { code: "vi" as const, name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "en" as const, name: "English", flag: "🇺🇸" },
  ]

  const themes = [
    { value: "light" as const, label: t("settings.appearance.light"), icon: Sun },
    { value: "dark" as const, label: t("settings.appearance.dark"), icon: Moon },
    { value: "system" as const, label: t("settings.appearance.system"), icon: Monitor },
  ]

  return (
    <div className="flex items-center gap-2">
      {/* Language Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{languages.find((lang) => lang.code === language)?.flag}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("settings.appearance.language")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
              {language === lang.code && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            {theme === "light" && <Sun className="h-4 w-4" />}
            {theme === "dark" && <Moon className="h-4 w-4" />}
            {theme === "system" && <Monitor className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("settings.appearance.theme")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {themes.map((themeOption) => {
            const Icon = themeOption.icon
            return (
              <DropdownMenuItem
                key={themeOption.value}
                onClick={() => setTheme(themeOption.value)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{themeOption.label}</span>
                </div>
                {theme === themeOption.value && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
