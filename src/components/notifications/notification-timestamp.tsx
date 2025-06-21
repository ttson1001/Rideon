import { formatDistanceToNow, format, isToday, isYesterday } from "date-fns"
import { vi } from "date-fns/locale"

interface NotificationTimestampProps {
  timestamp: string
  className?: string
}

export function NotificationTimestamp({ timestamp, className }: NotificationTimestampProps) {
  const date = new Date(timestamp)

  const formatTimestamp = () => {
    if (isToday(date)) {
      return formatDistanceToNow(date, { addSuffix: true, locale: vi })
    } else if (isYesterday(date)) {
      return `Hôm qua ${format(date, "HH:mm")}`
    } else {
      return format(date, "dd/MM/yyyy HH:mm")
    }
  }

  return <span className={className}>{formatTimestamp()}</span>
}
