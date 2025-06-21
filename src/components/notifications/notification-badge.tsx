import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Link } from 'react-router-dom'

interface NotificationBadgeProps {
  count: number
  className?: string
  showZero?: boolean
}

export function NotificationBadge({ count, className, showZero = false }: NotificationBadgeProps) {
  const shouldShowBadge = count > 0 || showZero

  return (
    <Button variant="ghost" size="icon" className={cn("relative", className)} asChild>
      <Link to="/notifications">
        <Bell className="h-5 w-5" />
        {shouldShowBadge && (
          <Badge
            className={cn(
              "absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs",
              count > 0 ? "bg-red-500 hover:bg-red-600" : "bg-gray-400",
            )}
          >
            {count > 99 ? "99+" : count}
          </Badge>
        )}
        <span className="sr-only">{count > 0 ? `${count} thông báo chưa đọc` : "Thông báo"}</span>
      </Link>
    </Button>
  )
}
