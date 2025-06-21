import { format, isToday, isYesterday } from "date-fns"
import { vi } from "date-fns/locale"

interface TimeGroupLabelProps {
  date: Date
}

export function TimeGroupLabel({ date }: TimeGroupLabelProps) {
  const formatDate = () => {
    if (isToday(date)) {
      return "Hôm nay"
    } else if (isYesterday(date)) {
      return "Hôm qua"
    } else {
      return format(date, "EEEE, dd/MM/yyyy", { locale: vi })
    }
  }

  return (
    <div className="flex justify-center my-4">
      <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">{formatDate()}</div>
    </div>
  )
}
