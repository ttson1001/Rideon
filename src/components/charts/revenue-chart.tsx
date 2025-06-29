import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

// Mock data for revenue chart
const mockRevenueData = {
  "2024": [
    { month: "Jan", revenue: 1200000, bookings: 8 },
    { month: "Feb", revenue: 1800000, bookings: 12 },
    { month: "Mar", revenue: 2200000, bookings: 15 },
    { month: "Apr", revenue: 1900000, bookings: 13 },
    { month: "May", revenue: 2500000, bookings: 17 },
    { month: "Jun", revenue: 2800000, bookings: 19 },
    { month: "Jul", revenue: 3200000, bookings: 22 },
    { month: "Aug", revenue: 2900000, bookings: 20 },
    { month: "Sep", revenue: 2600000, bookings: 18 },
    { month: "Oct", revenue: 2400000, bookings: 16 },
    { month: "Nov", revenue: 2100000, bookings: 14 },
    { month: "Dec", revenue: 2700000, bookings: 18 },
  ],
  "2023": [
    { month: "Jan", revenue: 800000, bookings: 5 },
    { month: "Feb", revenue: 1200000, bookings: 8 },
    { month: "Mar", revenue: 1500000, bookings: 10 },
    { month: "Apr", revenue: 1300000, bookings: 9 },
    { month: "May", revenue: 1700000, bookings: 11 },
    { month: "Jun", revenue: 2000000, bookings: 13 },
    { month: "Jul", revenue: 2300000, bookings: 15 },
    { month: "Aug", revenue: 2100000, bookings: 14 },
    { month: "Sep", revenue: 1900000, bookings: 12 },
    { month: "Oct", revenue: 1600000, bookings: 11 },
    { month: "Nov", revenue: 1400000, bookings: 9 },
    { month: "Dec", revenue: 1800000, bookings: 12 },
  ],
};

export function RevenueChart() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const data = mockRevenueData[selectedYear as keyof typeof mockRevenueData];

  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const avgRevenue = totalRevenue / data.length;

  // Calculate growth compared to previous month
  const currentMonth = data[data.length - 1];
  const previousMonth = data[data.length - 2];
  const growth = previousMonth
    ? ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) *
      100
    : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">
          Doanh thu theo tháng
        </CardTitle>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {(totalRevenue / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-gray-500">Tổng doanh thu</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {(avgRevenue / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-gray-500">Trung bình/tháng</div>
          </div>
          <div className="text-center">
            <div
              className={`text-2xl font-bold flex items-center justify-center gap-1 ${
                growth >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {growth >= 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              {Math.abs(growth).toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500">So với tháng trước</div>
          </div>
        </div>

        {/* Chart */}
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.month} className="flex items-center gap-3">
              <div className="w-8 text-xs font-medium text-gray-600">
                {item.month}
              </div>
              <div className="flex-1 relative">
                <div className="h-8 bg-gray-100 rounded-md overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-md transition-all duration-500 ease-out flex items-center justify-end pr-2"
                    style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                  >
                    <span className="text-white text-xs font-medium">
                      {(item.revenue / 1000000).toFixed(1)}M
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-16 text-xs text-gray-500 text-right">
                {item.bookings} chuyến
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Doanh thu (VNĐ)</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            <span>Số chuyến thuê</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
