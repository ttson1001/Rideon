import { useState } from "react"
import { Link } from "react-router-dom"
import { Plus, Car, Clock, DollarSign, TrendingUp, Calendar, MessageCircle, Check, X, Eye } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { StatusBadge } from "../../../components/shared/status-badge"
import { VehicleCard } from "../../../components/shared/vehicle-card"
import { RevenueChart } from "../../../components/charts/revenue-chart"
import { RentalRateChart } from "../../../components/charts/rental-rate-chart"

// Mock data
const mockStats = {
  totalVehicles: 3,
  activeRentals: 2,
  pendingRequests: 4,
  monthlyRevenue: 2500000,
  totalRevenue: 15000000,
}

const mockVehicles = [
  {
    id: "1",
    image: "/placeholder.svg?height=250&width=400",
    name: "Honda Air Blade 150",
    pricePerDay: 150000,
    rating: 4.8,
    reviewCount: 124,
    ownerName: "Bạn",
    location: "Quận 1, TP.HCM",
    status: "rented" as const,
  },
  {
    id: "2",
    image: "/placeholder.svg?height=250&width=400",
    name: "Yamaha Exciter 155",
    pricePerDay: 180000,
    rating: 4.9,
    reviewCount: 89,
    ownerName: "Bạn",
    location: "Quận 3, TP.HCM",
    status: "available" as const,
  },
]

const mockHistory = [
  {
    id: "3",
    renter: {
      name: "Lê Văn C",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
    },
    vehicle: "Honda Air Blade 150",
    startDate: "2024-01-10",
    endDate: "2024-01-12",
    totalAmount: 350000,
    status: "completed",
    requestDate: "2024-01-08",
  },
]

interface RequestCardProps {
  request: any
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
}

function RequestCard({ request, onApprove, onReject }: RequestCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <img
              src={request.renter.avatar || "/placeholder.svg"}
              alt={request.renter.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{request.renter.name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <span>⭐ {request.renter.rating}</span>
              </div>
            </div>
          </div>
          <StatusBadge status={request.status} />
        </div>

        <div className="space-y-2 mb-4">
          <p className="font-medium">{request.vehicle}</p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(request.startDate).toLocaleDateString("vi-VN")} -{" "}
                {new Date(request.endDate).toLocaleDateString("vi-VN")}
              </span>
            </div>
          </div>
          <div className="text-lg font-semibold text-blue-600">{request.totalAmount.toLocaleString()}đ</div>
        </div>

        <div className="flex gap-2">
          {request.status === "pending" && onApprove && onReject && (
            <>
              <Button variant="outline" size="sm" onClick={() => onReject(request.id)} className="flex-1">
                <X className="h-4 w-4 mr-1" />
                Từ chối
              </Button>
              <Button size="sm" onClick={() => onApprove(request.id)} className="flex-1">
                <Check className="h-4 w-4 mr-1" />
                Duyệt
              </Button>
            </>
          )}

          <Button variant="outline" size="sm" asChild>
            <Link to={`/chat/${request.id}`}>
              <MessageCircle className="h-4 w-4 mr-1" />
              Nhắn tin
            </Link>
          </Button>

          <Button variant="outline" size="sm" asChild>
            <Link to={`/dashboard/owner/request/${request.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              Chi tiết
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("vehicles")
  const [mockRequests, setMockRequests] = useState([
    {
      id: "1",
      renter: {
        name: "Nguyễn Văn A",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      vehicle: "Honda Air Blade 150",
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      totalAmount: 350000,
      status: "pending",
      requestDate: "2024-01-15",
    },
    {
      id: "2",
      renter: {
        name: "Trần Thị B",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      vehicle: "Yamaha Exciter 155",
      startDate: "2024-01-25",
      endDate: "2024-01-27",
      totalAmount: 400000,
      status: "pending",
      requestDate: "2024-01-16",
    },
  ])

  const handleApproveRequest = (id: string) => {
    console.log("Approve request:", id)
    // Update the request status to approved
    setMockRequests((prev) => prev.filter((req) => req.id !== id))
    // You could also move it to a different state/list for approved requests
    // Show success toast
    alert(`Đã duyệt yêu cầu thuê xe #${id}`)
  }

  const handleRejectRequest = (id: string) => {
    console.log("Reject request:", id)
    // Update the request status to rejected
    setMockRequests((prev) => prev.filter((req) => req.id !== id))
    // Show success toast
    alert(`Đã từ chối yêu cầu thuê xe #${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard chủ xe</h1>
            <p className="text-gray-600 mt-2">Quản lý xe và yêu cầu thuê</p>
          </div>
          <Button asChild>
            <Link to="/dashboard/owner/list/vehicleList">
              <Plus className="h-4 w-4 mr-2" />
              Đăng xe mới
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">{mockStats.totalVehicles}</div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <Car className="h-4 w-4" />
                Tổng xe
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">{mockStats.activeRentals}</div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <Clock className="h-4 w-4" />
                Đang cho thuê
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600">{mockStats.pendingRequests}</div>
              <div className="text-sm text-gray-600">Yêu cầu mới</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {(mockStats.monthlyRevenue / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <DollarSign className="h-4 w-4" />
                Doanh thu tháng
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-indigo-600">{(mockStats.totalRevenue / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Tổng doanh thu
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vehicles">Xe của tôi ({mockVehicles.length})</TabsTrigger>
            <TabsTrigger value="requests">Yêu cầu mới ({mockRequests.length})</TabsTrigger>
            <TabsTrigger value="history">Lịch sử ({mockHistory.length})</TabsTrigger>
            <TabsTrigger value="analytics">Thống kê</TabsTrigger>
          </TabsList>

          <TabsContent value="vehicles" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} {...vehicle} />
              ))}

              {/* Add New Vehicle Card */}
              <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[300px]">
                  <Plus className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="font-semibold text-gray-700 mb-2">Đăng xe mới</h3>
                  <p className="text-gray-500 text-center mb-4">Thêm xe vào danh sách cho thuê để tăng thu nhập</p>
                  <Button asChild>
                    <Link to="/dashboard/owner/list/vehicleList">Đăng xe ngay</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6 mt-6">
            {mockRequests.length > 0 ? (
              <div className="space-y-4">
                {mockRequests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    onApprove={handleApproveRequest}
                    onReject={handleRejectRequest}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Không có yêu cầu mới</h3>
                  <p className="text-gray-500">Các yêu cầu thuê xe mới sẽ xuất hiện ở đây</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6 mt-6">
            {mockHistory.length > 0 ? (
              <div className="space-y-4">
                {mockHistory.map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Chưa có lịch sử</h3>
                  <p className="text-gray-500">Lịch sử các chuyến thuê sẽ xuất hiện ở đây</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <RevenueChart />
              <RentalRateChart />
            </div>

            {/* Additional Analytics */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Xe được thuê nhiều nhất</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Honda Air Blade 150</span>
                      <span className="text-sm font-bold text-green-600">25 chuyến</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Honda Winner X</span>
                      <span className="text-sm font-bold text-green-600">23 chuyến</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Yamaha Exciter 155</span>
                      <span className="text-sm font-bold text-green-600">18 chuyến</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Khách hàng thân thiết</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Nguyễn Văn A</span>
                      <span className="text-sm font-bold text-blue-600">8 lần thuê</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Trần Thị B</span>
                      <span className="text-sm font-bold text-blue-600">6 lần thuê</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Lê Văn C</span>
                      <span className="text-sm font-bold text-blue-600">5 lần thuê</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Đánh giá trung bình</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-500 mb-2">4.8</div>
                    <div className="flex justify-center mb-2">
                      {"★★★★★".split("").map((star, i) => (
                        <span key={i} className="text-yellow-400">
                          {star}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">Từ 156 đánh giá</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
