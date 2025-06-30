import { useState, useEffect } from "react";
import { Logo } from "./navbar/logo";
import { NavLink } from "./navbar/nav-link";
import { NotificationIcon } from "./navbar/notification-icon";
import { UserAvatarMenu, type User } from "./navbar/user-avatar-menu";
import { AuthButtons } from "./navbar/auth-buttons";
import { MobileMenu } from "./navbar/mobile-menu";
import { LanguageThemeSwitcher } from "./language-theme-switcher";
import { useApp } from "@/contexts/app-context";
import { useAuth } from "@/contexts/auth-context";

interface NavbarProps {
  currentUser?: User;
  unreadNotificationsCount?: number;
}

export function Navbar({
  currentUser,
  unreadNotificationsCount = 0,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language } = useApp();
  const { logout } = useAuth();
  const userId = localStorage.getItem("userId");
  const chat = "/chat/null/" + userId + "/3";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to home page after successful logout
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <nav
      className={`fixed top-0 z-50 w-full bg-white dark:bg-gray-900 transition-shadow duration-200 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink href="/">{t("nav.home")}</NavLink>
              <NavLink href="/browse">{t("nav.browse")}</NavLink>
              <NavLink href="/about">{t("nav.about")}</NavLink>
              <NavLink href="/owner-info">{t("nav.becomeOwner")}</NavLink>
              <NavLink href={chat}>{"Chat với admin"}</NavLink>
            </div>
          </div>

          {/* Right: Language/Theme Switcher, Notifications and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Language & Theme Switcher */}
            <LanguageThemeSwitcher />

            {/* Desktop Auth/User Section */}
            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <>
                  <div className="relative">
                    <NotificationIcon count={unreadNotificationsCount} />
                  </div>
                  <UserAvatarMenu user={currentUser} onLogout={handleLogout} />
                </>
              ) : (
                <AuthButtons />
              )}
            </div>

            {/* Mobile Menu */}
            <MobileMenu
              key={language}
              currentUser={currentUser}
              unreadNotificationsCount={unreadNotificationsCount}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
