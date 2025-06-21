
import type { LucideIcon } from "lucide-react"

interface AdminCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  color: "blue" | "green" | "purple" | "red"
}

export default function AdminCard({ title, value, change, icon: Icon, color }: AdminCardProps) {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    red: "bg-red-500",
  }

  const isPositive = change.startsWith("+")

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className={`text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>{change} so với tháng trước</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )
}
