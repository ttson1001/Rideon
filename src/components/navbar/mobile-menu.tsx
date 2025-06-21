import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { NavLink } from "./nav-link"
import { NotificationIcon } from "./notification-icon"
import { UserAvatarMenu, type User } from "./user-avatar-menu"
import { AuthButtons } from "./auth-buttons"
import { LanguageThemeSwitcher } from "../language-theme-switcher"
import { useApp } from "@/contexts/app-context"

interface MobileMenuProps {
  currentUser?: User
  unreadNotificationsCount?: number
  onLogout?: () => void
}

export function MobileMenu({ currentUser, unreadNotificationsCount = 0, onLogout }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { t, language } = useApp()

  return (
    <div className="md:hidden" key={language}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 z-50 flex flex-col">
          <SheetHeader>
            <SheetTitle>{t("nav.menu")}</SheetTitle>
            <SheetDescription>
              {t("nav.menuDescription")}
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col h-full">
            {/* Navigation Links */}
            <nav className="flex flex-col space-y-4 py-6 overflow-y-auto">
              <NavLink href="/" onClick={() => setIsOpen(false)}>
                {t("nav.home")}
              </NavLink>
              <NavLink href="/browse" onClick={() => setIsOpen(false)}>
                {t("nav.browse")}
              </NavLink>
              <NavLink href="/about" onClick={() => setIsOpen(false)}>
                {t("nav.about")}
              </NavLink>
              <NavLink href="/owner-info" onClick={() => setIsOpen(false)}>
                {t("nav.becomeOwner")}
              </NavLink>
            </nav>

            {/* Language & Theme Switcher */}
            <div className="py-4 border-t border-b flex-shrink-0">
              <LanguageThemeSwitcher />
            </div>

            {/* User Section */}
            <div className="flex-1 flex flex-col justify-end pt-6 flex-shrink-0">
              {currentUser ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{t("nav.notifications")}</span>
                    <NotificationIcon count={unreadNotificationsCount} />
                  </div>
                  <UserAvatarMenu user={currentUser} onLogout={onLogout} />
                </div>
              ) : (
                <AuthButtons />
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
