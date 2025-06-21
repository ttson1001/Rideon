import { cn } from "@/lib/utils"

interface UnreadDotBadgeProps {
  show: boolean
  className?: string
}

export function UnreadDotBadge({ show, className }: UnreadDotBadgeProps) {
  if (!show) return null

  return <div className={cn("w-2 h-2 bg-blue-600 rounded-full", className)} />
}
