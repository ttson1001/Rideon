
import { LogOut, Settings, UserIcon, LayoutDashboard, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom'
import { useApp } from "@/contexts/app-context"

export type User = {
  id: string
  name: string
  email?: string
  avatarUrl?: string
  role: "renter" | "owner" | "admin"
}

interface UserAvatarMenuProps {
  user: User
  onLogout?: () => void
}

export function UserAvatarMenu({ user, onLogout }: UserAvatarMenuProps) {
  const { t } = useApp()

  const getDashboardUrl = () => {
    switch (user.role) {
      case "owner":
        return "/dashboard/owner"
      case "admin":
        return "/dashboard/admin"
      default:
        return "/dashboard/renter"
    }
  }

  const getRoleBadgeColor = () => {
    switch (user.role) {
      case "owner":
        return "bg-green-100 text-green-800"
      case "admin":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getRoleLabel = () => {
    switch (user.role) {
      case "owner":
        return "Chủ xe"
      case "admin":
        return "Quản trị"
      default:
        return "Người thuê"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <Badge className={`text-xs ${getRoleBadgeColor()}`}>{getRoleLabel()}</Badge>
            </div>
            {user.email && <p className="text-xs leading-none text-muted-foreground">{user.email}</p>}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>{t("nav.profile")}</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to={getDashboardUrl()} className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>{t("nav.dashboard")}</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/notifications" className="cursor-pointer">
            <Bell className="mr-2 h-4 w-4" />
            <span>{t("nav.notifications")}</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>{t("nav.settings")}</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("nav.logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
