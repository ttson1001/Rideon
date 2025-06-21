import { MessageCircle, CheckCircle, XCircle, Clock, Car, Star, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationTypeIconProps {
  type: "new_request" | "accepted" | "rejected" | "message" | "reminder" | "review" | "system"
  className?: string
}

export function NotificationTypeIcon({ type, className }: NotificationTypeIconProps) {
  const iconConfig = {
    new_request: {
      icon: Clock,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    accepted: {
      icon: CheckCircle,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    rejected: {
      icon: XCircle,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
    message: {
      icon: MessageCircle,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    reminder: {
      icon: Car,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    review: {
      icon: Star,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    system: {
      icon: AlertTriangle,
      bgColor: "bg-gray-100",
      iconColor: "text-gray-600",
    },
  }

  const config = iconConfig[type]
  const IconComponent = config.icon

  return (
    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", config.bgColor, className)}>
      <IconComponent className={cn("h-5 w-5", config.iconColor)} />
    </div>
  )
}
