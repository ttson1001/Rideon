
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, Clock, CheckCircle, XCircle } from "lucide-react"

// Mock data for rental rate
const mockRentalData = {
  "last-30-days": {
    totalDays: 30,
    rentedDays: 22,
    availableDays: 8,
    maintenanceDays: 0,
    vehicles: [
      {
        name: "Honda Air Blade 150",
        totalDays: 30,
        rentedDays: 25,
        rate: 83.3,
        revenue: 3750000,
      },
      {
        name: "Yamaha Exciter 155",
        totalDays: 30,
        rentedDays: 18,
        rate: 60.0,
        revenue: 3240000,
      },
      {
        name: "Honda Winner X",
        totalDays: 30,
        rentedDays: 23,
        rate: 76.7,
        revenue: 4600000,
      },
    ],
  },
  "last-7-days": {
    totalDays: 7,
    rentedDays: 5,
    availableDays: 2,
    maintenanceDays: 0,
    vehicles: [
      {
        name: "Honda Air Blade 150",
        totalDays: 7,
        rentedDays: 6,
        rate: 85.7,
        revenue: 900000,
      },
      {
        name: "Yamaha Exciter 155",
        totalDays: 7,
        rentedDays: 4,
        rate: 57.1,
        revenue: 720000,
      },
      {
        name: "Honda Winner X",
        totalDays: 7,
        rentedDays: 5,
        rate: 71.4,
        revenue: 1000000,
      },
    ],
  },
  "this-month": {
    totalDays: 31,
    rentedDays: 24,
    availableDays: 6,
    maintenanceDays: 1,
    vehicles: [
      {
        name: "Honda Air Blade 150",
        totalDays: 31,
        rentedDays: 26,
        rate: 83.9,
        revenue: 3900000,
      },
      {
        name: "Yamaha Exciter 155",
        totalDays: 31,
        rentedDays: 19,
        rate: 61.3,
        revenue: 3420000,
      },
      {
        name: "Honda Winner X",
        totalDays: 31,
        rentedDays: 24,
        rate: 77.4,
        revenue: 4800000,
      },
    ],
  },
}

export function RentalRateChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("last-30-days")
  const data = mockRentalData[selectedPeriod as keyof typeof mockRentalData]

  const overallRate = (data.rentedDays / data.totalDays) * 100
  const totalRevenue = data.vehicles.reduce((sum, v) => sum + v.revenue, 0)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Tỷ lệ thuê xe</CardTitle>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-7-days">7 ngày qua</SelectItem>
            <SelectItem value="last-30-days">30 ngày qua</SelectItem>
            <SelectItem value="this-month">Tháng này</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {/* Overall Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{overallRate.toFixed(1)}%</div>
            <div className="text-xs text-gray-500">Tỷ lệ thuê trung bình</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{(totalRevenue / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-gray-500">Tổng doanh thu</div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Đã thuê</span>
            </div>
            <div className="text-lg font-bold text-green-700">{data.rentedDays}</div>
            <div className="text-xs text-green-600">ngày</div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Sẵn sàng</span>
            </div>
            <div className="text-lg font-bold text-blue-700">{data.availableDays}</div>
            <div className="text-xs text-blue-600">ngày</div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
              <XCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Bảo trì</span>
            </div>
            <div className="text-lg font-bold text-gray-700">{data.maintenanceDays}</div>
            <div className="text-xs text-gray-600">ngày</div>
          </div>
        </div>

        {/* Vehicle Performance */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <Car className="h-4 w-4" />
            Hiệu suất từng xe
          </h4>

          {data.vehicles.map((vehicle, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{vehicle.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {vehicle.rentedDays}/{vehicle.totalDays} ngày
                  </span>
                  <span className="text-sm font-bold text-green-600">{vehicle.rate.toFixed(1)}%</span>
                </div>
              </div>

              <div className="relative">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                    style={{ width: `${vehicle.rate}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <span>Doanh thu: {(vehicle.revenue / 1000000).toFixed(1)}M VNĐ</span>
                <span>Tỷ lệ: {vehicle.rate.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Insights */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h5 className="font-medium text-blue-900 mb-2">💡 Thông tin hữu ích</h5>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Xe có tỷ lệ thuê cao nhất: {data.vehicles.reduce((max, v) => (v.rate > max.rate ? v : max)).name}</li>
            <li>• Tỷ lệ thuê trung bình: {overallRate.toFixed(1)}%</li>
            <li>• Doanh thu trung bình/xe: {(totalRevenue / data.vehicles.length / 1000000).toFixed(1)}M VNĐ</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
