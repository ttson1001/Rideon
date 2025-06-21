import { useApp } from "../../contexts/app-context"
import AdminCard from "./admin-card"
import { Car, Users, CreditCard, AlertTriangle } from "lucide-react"

type StatColor = "blue" | "green" | "purple" | "red"

interface Stat {
  title: string
  value: string
  change: string
  icon: typeof Car
  color: StatColor
}

export default function AdminDashboard() {
  const { t } = useApp()

  const stats: Stat[] = [
    {
      title: t("stats.totalVehicles"),
      value: "1,234",
      change: "+12%",
      icon: Car,
      color: "blue",
    },
    {
      title: t("stats.totalUsers"),
      value: "5,678",
      change: "+8%",
      icon: Users,
      color: "green",
    },
    {
      title: t("stats.monthlyRevenue"),
      value: "₫125M",
      change: "+15%",
      icon: CreditCard,
      color: "purple",
    },
    {
      title: t("stats.pendingReports"),
      value: "23",
      change: "-5%",
      icon: AlertTriangle,
      color: "red",
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Tổng quan hệ thống</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <AdminCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Hoạt động gần đây</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">Xe Honda Wave mới được đăng ký</span>
              <span className="text-xs text-gray-500">2 phút trước</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">Người dùng mới: Nguyễn Văn A</span>
              <span className="text-xs text-gray-500">5 phút trước</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">Giao dịch ₫500,000 được hoàn thành</span>
              <span className="text-xs text-gray-500">10 phút trước</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Thống kê nhanh</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Xe chờ duyệt</span>
              <span className="font-semibold">15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Giao dịch hôm nay</span>
              <span className="font-semibold">89</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Người dùng online</span>
              <span className="font-semibold">234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Báo cáo mới</span>
              <span className="font-semibold text-red-600">7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
