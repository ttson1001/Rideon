
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, TrendingUp, Star, Calendar } from "lucide-react"

interface OwnerStatsCardProps {
  owner: {
    id: string
    name: string
    email: string
    totalVehicles: number
    totalRentals: number
    rating: number
    joinDate: string
    monthlyRevenue: number
    status: "active" | "blocked"
  }
}

export default function OwnerStatsCard({ owner }: OwnerStatsCardProps) {
  const getPerformanceBadge = (rentals: number) => {
    if (rentals >= 50) return { label: "VIP", variant: "default" as const, color: "text-purple-600" }
    if (rentals >= 20) return { label: "Tích cực", variant: "secondary" as const, color: "text-blue-600" }
    return { label: "Mới", variant: "outline" as const, color: "text-gray-600" }
  }

  const performance = getPerformanceBadge(owner.totalRentals)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{owner.name}</CardTitle>
            <CardDescription>{owner.email}</CardDescription>
          </div>
          <Badge variant={performance.variant} className={performance.color}>
            {performance.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Car className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-blue-600">{owner.totalVehicles}</div>
              <div className="text-xs text-gray-500">Xe đang đăng</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <div>
              <div className="text-2xl font-bold text-green-600">{owner.totalRentals}</div>
              <div className="text-xs text-gray-500">Lượt thuê</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <div>
              <div className="text-2xl font-bold text-yellow-600">{owner.rating}</div>
              <div className="text-xs text-gray-500">Đánh giá</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-purple-500" />
            <div>
              <div className="text-lg font-bold text-purple-600">{owner.monthlyRevenue.toLocaleString()}₫</div>
              <div className="text-xs text-gray-500">Doanh thu/tháng</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
