import { cn } from "@/lib/utils"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'

interface NotificationIconProps {
  count: number
  className?: string
}

export function NotificationIcon({ count, className }: NotificationIconProps) {
  const navigate = useNavigate()

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className={cn("relative", className)}
      onClick={() => navigate('/notifications')}
    >
      <Bell className="h-5 w-5" />
      {count > 0 && (
        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-600">
          {count > 99 ? "99+" : count}
        </Badge>
      )}
      <span className="sr-only">{count > 0 ? `${count} thông báo chưa đọc` : "Thông báo"}</span>
    </Button>
  )
}
