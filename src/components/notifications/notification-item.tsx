import type React from "react"

import { useState } from "react"
import { Link } from 'react-router-dom'
import { MoreVertical, Eye, Trash2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NotificationTimestamp } from "./notification-timestamp"
import { UnreadDotBadge } from "./unread-dot-badge"
import { cn } from "@/lib/utils"

export type Notification = {
  id: string
  userId: string
  type:
    | "request_accepted"
    | "request_rejected"
    | "new_message"
    | "admin_approved"
    | "new_request"
    | "reminder"
    | "report"
    | "rental_ending"
    | "payment_reminder"
  title: string
  content: string
  timestamp: string
  isRead: boolean
  linkTo?: string
  metadata?: {
    vehicleName?: string
    requesterName?: string
    ownerName?: string
    amount?: number
    requestId?: string
    vehicleId?: string
    chatId?: string
  }
}

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead?: (id: string) => void
  onDelete?: (id: string) => void
  onClick?: (notification: Notification) => void
}

export function NotificationItem({ notification, onMarkAsRead, onDelete, onClick }: NotificationItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id)
    }
    onClick?.(notification)
  }

  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.stopPropagation()
    onMarkAsRead?.(notification.id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete?.(notification.id)
  }

  const getNotificationIcon = () => {
    switch (notification.type) {
      case "request_accepted":
        return "✅"
      case "request_rejected":
        return "❌"
      case "new_message":
        return "💬"
      case "admin_approved":
        return "✅"
      case "new_request":
        return "📩"
      case "reminder":
      case "rental_ending":
        return "🛵"
      case "payment_reminder":
        return "💰"
      case "report":
        return "⚠️"
      default:
        return "📩"
    }
  }

  const content = (
    <Card
      className={cn(
        "p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-l-4",
        !notification.isRead && "bg-blue-50 border-blue-200 border-l-blue-500",
        notification.isRead && "border-l-gray-200",
        isHovered && "shadow-lg",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
            {getNotificationIcon()}
          </div>
          <UnreadDotBadge show={!notification.isRead} className="absolute -top-1 -right-1" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className={cn("font-medium text-gray-900 line-clamp-1", !notification.isRead && "font-semibold")}>
                {notification.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">{notification.content}</p>

              {/* Metadata */}
              {notification.metadata && (
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  {notification.metadata.vehicleName && (
                    <span className="flex items-center gap-1">🏍️ {notification.metadata.vehicleName}</span>
                  )}
                  {notification.metadata.requesterName && (
                    <span className="flex items-center gap-1">👤 {notification.metadata.requesterName}</span>
                  )}
                  {notification.metadata.ownerName && (
                    <span className="flex items-center gap-1">👤 {notification.metadata.ownerName}</span>
                  )}
                  {notification.metadata.amount && (
                    <span className="font-medium text-green-600">
                      💰 {notification.metadata.amount.toLocaleString()}đ
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mt-2">
                <NotificationTimestamp timestamp={notification.timestamp} className="text-xs text-gray-500" />

                {notification.linkTo && (
                  <div className="flex items-center gap-1 text-xs text-blue-600">
                    <ExternalLink className="h-3 w-3" />
                    <span>Xem chi tiết</span>
                  </div>
                )}
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8 transition-opacity", isHovered ? "opacity-100" : "opacity-0")}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {!notification.isRead && (
                  <DropdownMenuItem onClick={handleMarkAsRead}>
                    <Eye className="h-4 w-4 mr-2" />
                    Đánh dấu đã đọc
                  </DropdownMenuItem>
                )}
                {notification.linkTo && (
                  <DropdownMenuItem asChild>
                    <Link to={notification.linkTo} className="text-blue-600">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Xem chi tiết
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Xóa thông báo
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Card>
  )

  if (notification.linkTo) {
    return (
      <Link to={notification.linkTo} className="block group">
        {content}
      </Link>
    )
  }

  return <div className="group">{content}</div>
}
