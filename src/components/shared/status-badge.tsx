import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "available" | "rented" | "unavailable" | "pending" | "approved" | "rejected" | "completed"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    available: {
      label: "Có sẵn",
      className: "bg-green-500 hover:bg-green-600 text-white",
    },
    rented: {
      label: "Đã thuê",
      className: "bg-yellow-400 hover:bg-yellow-500 text-black",
    },
    unavailable: {
      label: "Không có sẵn",
      className: "bg-red-500 hover:bg-red-600 text-white",
    },
    pending: {
      label: "Chờ duyệt",
      className: "bg-yellow-400 hover:bg-yellow-500 text-black",
    },
    approved: {
      label: "Đã duyệt",
      className: "bg-green-500 hover:bg-green-600 text-white",
    },
    rejected: {
      label: "Từ chối",
      className: "bg-red-500 hover:bg-red-600 text-white",
    },
    completed: {
      label: "Hoàn thành",
      className: "bg-blue-500 hover:bg-blue-600 text-white",
    },
  }

  const config = statusConfig[status] || statusConfig.pending // Fallback to pending if status not found

  return <Badge className={cn(config.className, className)}>{config.label}</Badge>
}
