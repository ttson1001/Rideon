import { useApp } from "@/contexts/app-context"
import { LayoutDashboard, Car, Users, CreditCard, AlertTriangle, LogOut, Bell, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AdminSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const { t } = useApp()

  // Mock notification counts
  const notificationCounts = {
    notifications: 12,
    chat: 5,
    violations: 3,
    pendingVehicles: 8,
  }

  const menuItems = [
    {
      id: "dashboard",
      label: t("admin.sidebar.dashboard"),
      icon: LayoutDashboard,
    },
    {
      id: "notifications",
      label: t("admin.sidebar.notifications"),
      icon: Bell,
      badge: notificationCounts.notifications,
    },
    {
      id: "chat",
      label: t("admin.sidebar.chat"),
      icon: MessageSquare,
      badge: notificationCounts.chat,
    },
    {
      id: "pending-vehicles",
      label: t("admin.sidebar.pendingVehicles"),
      icon: Car,
      badge: notificationCounts.pendingVehicles,
    },
    {
      id: "users",
      label: t("admin.sidebar.users"),
      icon: Users,
    },
    {
      id: "transactions",
      label: t("admin.sidebar.transactions"),
      icon: CreditCard,
    },
    {
      id: "violations",
      label: t("admin.sidebar.violations"),
      icon: AlertTriangle,
      badge: notificationCounts.violations,
    },
  ]

  return (
    <div className="w-1/5 bg-gray-800 text-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">{t("admin.sidebar.title")}</h1>
        <p className="text-gray-400 text-sm">{t("admin.sidebar.subtitle")}</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && item.badge > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {item.badge}
                </Badge>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer with Logout */}
      <div className="p-4 border-t border-gray-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
          onClick={() => {
            // Handle logout logic here
            console.log("Logging out...")
          }}
        >
          <LogOut size={20} className="mr-3" />
          <span className="font-medium">{t("admin.sidebar.logout")}</span>
        </Button>
      </div>
    </div>
  )
}
