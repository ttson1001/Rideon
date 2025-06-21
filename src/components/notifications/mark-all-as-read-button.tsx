

import { CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface MarkAllAsReadButtonProps {
  onMarkAllAsRead: () => void
  unreadCount: number
  disabled?: boolean
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
}

export function MarkAllAsReadButton({
  onMarkAllAsRead,
  unreadCount,
  disabled = false,
  variant = "outline",
  size = "sm",
}: MarkAllAsReadButtonProps) {
  const { toast } = useToast()

  const handleClick = () => {
    onMarkAllAsRead()
    toast({
      title: "Đã đánh dấu tất cả",
      description: `${unreadCount} thông báo đã được đánh dấu là đã đọc`,
    })
  }

  if (unreadCount === 0) {
    return null
  }

  return (
    <Button variant={variant} size={size} onClick={handleClick} disabled={disabled}>
      <CheckCheck className="h-4 w-4 mr-2" />
      Đánh dấu tất cả ({unreadCount})
    </Button>
  )
}
