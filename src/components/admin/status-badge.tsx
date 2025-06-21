
import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: "escrow_pending" | "released" | "refunded"
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "escrow_pending":
        return {
          label: "Đang chờ",
          variant: "secondary" as const,
          className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        }
      case "released":
        return {
          label: "Đã giải ngân",
          variant: "default" as const,
          className: "bg-green-100 text-green-800 hover:bg-green-100",
        }
      case "refunded":
        return {
          label: "Đã hoàn tiền",
          variant: "destructive" as const,
          className: "bg-red-100 text-red-800 hover:bg-red-100",
        }
      default:
        return {
          label: status,
          variant: "secondary" as const,
          className: "",
        }
    }
  }

  const config = getStatusConfig(status)

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  )
}
