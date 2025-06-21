

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface NotificationFiltersProps {
  activeFilter:
    | "all"
    | "unread"
    | "request_accepted"
    | "request_rejected"
    | "new_message"
    | "admin_approved"
    | "new_request"
    | "reminder"
  onFilterChange: (
    filter:
      | "all"
      | "unread"
      | "request_accepted"
      | "request_rejected"
      | "new_message"
      | "admin_approved"
      | "new_request"
      | "reminder",
  ) => void
  counts: {
    all: number
    unread: number
    request_accepted: number
    request_rejected: number
    new_message: number
    admin_approved: number
    new_request: number
    reminder: number
  }
  userRole: "renter" | "owner"
}

export function NotificationFilters({ activeFilter, onFilterChange, counts, userRole }: NotificationFiltersProps) {
  const renterFilters = [
    { key: "all" as const, label: "Tất cả", count: counts.all, icon: "📋" },
    { key: "unread" as const, label: "Chưa đọc", count: counts.unread, icon: "🔴" },
    { key: "request_accepted" as const, label: "Được chấp nhận", count: counts.request_accepted, icon: "✅" },
    { key: "request_rejected" as const, label: "Bị từ chối", count: counts.request_rejected, icon: "❌" },
    { key: "new_message" as const, label: "Tin nhắn", count: counts.new_message, icon: "💬" },
    { key: "reminder" as const, label: "Nhắc nhở", count: counts.reminder, icon: "🛵" },
  ]

  const ownerFilters = [
    { key: "all" as const, label: "Tất cả", count: counts.all, icon: "📋" },
    { key: "unread" as const, label: "Chưa đọc", count: counts.unread, icon: "🔴" },
    { key: "new_request" as const, label: "Yêu cầu mới", count: counts.new_request, icon: "📩" },
    { key: "new_message" as const, label: "Tin nhắn", count: counts.new_message, icon: "💬" },
    { key: "admin_approved" as const, label: "Đã duyệt", count: counts.admin_approved, icon: "✅" },
    { key: "reminder" as const, label: "Nhắc nhở", count: counts.reminder, icon: "🛵" },
  ]

  const filters = userRole === "renter" ? renterFilters : ownerFilters

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={activeFilter === filter.key ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.key)}
          className={cn("relative", activeFilter === filter.key && "bg-blue-600 hover:bg-blue-700")}
        >
          <span className="mr-2">{filter.icon}</span>
          {filter.label}
          {filter.count > 0 && (
            <Badge
              variant={activeFilter === filter.key ? "secondary" : "default"}
              className={cn(
                "ml-2 h-5 min-w-5 text-xs",
                activeFilter === filter.key ? "bg-white text-blue-600" : "bg-blue-600 text-white",
              )}
            >
              {filter.count}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  )
}
