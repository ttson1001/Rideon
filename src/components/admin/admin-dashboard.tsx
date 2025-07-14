import AdminCard from "./admin-card";
import { Car, Users, CreditCard, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { getDashboardOverview, DashboardOverviewDto } from "../api/dashboardService";

type StatColor = "blue" | "green" | "purple" | "red";

interface Stat {
  title: string;
  value: string;
  change: string;
  icon: typeof Car;
  color: StatColor;
}

export default function AdminDashboard() {
  const [overview, setOverview] = useState<DashboardOverviewDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardOverview();
        setOverview(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Không thể tải dữ liệu dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const stats: Stat[] = [
    {
      title: "Tổng số xe",
      value: loading ? "..." : overview?.totalVehicles.toString() || "0",
      change: overview ? `${overview.activeVehicles} hoạt động` : "Đang tải...",
      icon: Car,
      color: "blue",
    },
    {
      title: "Tổng người dùng",
      value: loading ? "..." : overview?.totalUsers.toString() || "0",
      change: overview ? `${overview.activeUsers} hoạt động` : "Đang tải...",
      icon: Users,
      color: "green",
    },
    {
      title: "Tổng hoa hồng",
      value: loading ? "..." : (overview ? formatCurrency(overview.totalCommission) : "₫0"),
      change: overview ? `${(overview.commissionRate * 100).toFixed(1)}% từ tổng doanh thu` : "Đang tải...",
      icon: CreditCard,
      color: "purple",
    },
    {
      title: "Báo cáo chờ xử lý",
      value: loading ? "..." : overview?.pendingReports.toString() || "0",
      change: overview ? `${overview.pendingVehicles} xe chờ duyệt` : "Đang tải...",
      icon: AlertTriangle,
      color: "red",
    },
  ];

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Lỗi tải dữ liệu</h3>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

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
          <h3 className="text-lg font-semibold mb-4">Thống kê chi tiết</h3>
          {loading ? (
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ) : overview ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-600">Tổng doanh thu</span>
                <span className="font-semibold">{formatCurrency(overview.totalRevenue)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-600">Doanh thu tháng này</span>
                <span className="font-semibold">{formatCurrency(overview.monthlyRevenue)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-600">Tổng booking</span>
                <span className="font-semibold">{overview.totalBookings}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-gray-600">Booking tháng này</span>
                <span className="font-semibold">{overview.monthlyBookings}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Tỷ lệ hoa hồng</span>
                <span className="font-semibold text-purple-600">{(overview.commissionRate * 100).toFixed(1)}%</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Không có dữ liệu</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Trạng thái hệ thống</h3>
          {loading ? (
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ) : overview ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Xe đang hoạt động</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{overview.activeVehicles}</span>
                  <span className="text-xs text-gray-500">/ {overview.totalVehicles}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Người dùng hoạt động</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{overview.activeUsers}</span>
                  <span className="text-xs text-gray-500">/ {overview.totalUsers}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Xe chờ duyệt</span>
                <span className="font-semibold text-orange-600">{overview.pendingVehicles}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Báo cáo chờ xử lý</span>
                <span className="font-semibold text-red-600">{overview.pendingReports}</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Không có dữ liệu</p>
          )}
        </div>
      </div>
    </div>
  );
}
