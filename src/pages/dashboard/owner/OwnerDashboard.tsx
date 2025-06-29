import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Car,
  Clock,
  DollarSign,
  TrendingUp,
  Calendar,
  MessageCircle,
  Check,
  X,
  Eye,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { StatusBadge } from "../../../components/shared/status-badge";
import { VehicleCard } from "../../../components/shared/vehicle-card";
import { RevenueChart } from "../../../components/charts/revenue-chart";
import { RentalRateChart } from "../../../components/charts/rental-rate-chart";
import {
  getBookingsByOwner,
  getOwnerDashboard,
  getVehiclesByOwner,
  putBookingStatus,
} from "@/components/api/dashboardService";
import { toast } from "react-hot-toast";

interface RequestCardProps {
  ownerId: any;
  renterId: any;
  request: any;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
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
          <p className="font-medium">{request.vehicle.name}</p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(request.startDate).toLocaleDateString("vi-VN")} -{" "}
                {new Date(request.endDate).toLocaleDateString("vi-VN")}
              </span>
            </div>
          </div>
          <div className="text-lg font-semibold text-blue-600">
            {request?.totalAmount?.toLocaleString()}đ
          </div>
        </div>

        <div className="flex gap-2">
          {request.status === "requested" && onApprove && onReject && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onReject(request.id)}
                className="flex-1"
              >
                <X className="h-4 w-4 mr-1" />
                Từ chối
              </Button>
              <Button
                size="sm"
                onClick={() => onApprove(request.id)}
                className="flex-1"
              >
                <Check className="h-4 w-4 mr-1" />
                Duyệt
              </Button>
            </>
          )}

          <Button variant="outline" size="sm" asChild>
            <Link
              to={`/chat/${request.id}/${request.owner.id}/${request.renter?.id}`}
            >
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
  );
}

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState("vehicles");
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeRentals: 0,
    pendingRequests: 0,
    monthlyRevenue: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  const ownerId = parseInt(localStorage.getItem("userId") || "0");
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getOwnerDashboard(ownerId);
        setStats({
          totalVehicles: data.totalVehicles,
          activeRentals: data.activeVehicles,
          pendingRequests: data.newRequests,
          monthlyRevenue: data.monthlyRevenue,
          totalRevenue: data.totalRevenue,
        });
      } catch (err) {
        console.error("Lỗi khi load dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [ownerId, loading]);

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [vehicleLoading, setVehicleLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getVehiclesByOwner(ownerId);
        const mapped = data.map((v: any) => ({
          id: v.id,
          image: v.imageUrls?.[0] || "/placeholder.svg",
          name: v.name,
          pricePerDay: v.pricePerDay,
          rating: 4.5,
          reviewCount: 0,
          ownerName: v.ownerName,
          location: "TP.HCM",
          status: v.status?.toLowerCase(),
        }));
        setVehicles(mapped);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách xe:", err);
      } finally {
        setVehicleLoading(false);
      }
    };

    fetchVehicles();
  }, [ownerId, vehicleLoading]);

  const [requests, setRequests] = useState<any[]>([]);
  const [requestLoading, setRequestLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getBookingsByOwner(ownerId, "requested");
        const mapped = data.map((b: any) => ({
          id: b.id,
          renter: {
            id: b.renterId,
            name: b.renterName,
            email: b.renterEmail,
            avatar: "/placeholder.svg", // backend chưa có avatar
            rating: 4.5, // giả lập
          },
          owner: {
            id: b.ownerId,
            name: b.ownerName,
            email: b.ownerEmail,
          },
          vehicle: {
            name: b.vehicleName,
          },
          startDate: b.startDate,
          endDate: b.endDate,
          pickupTime: b.pickupTime,
          returnTime: b.returnTime,
          totalAmount: b.totalAmount,
          status: b.status.toLowerCase(),
          requestDate: b.startDate, // nếu không có trường requestDate thật thì tạm gán startDate
        }));

        setRequests(mapped);
      } catch (err) {
        console.error("Lỗi khi load yêu cầu thuê xe:", err);
      } finally {
        setRequestLoading(false);
      }
    };

    fetchRequests();
  }, [ownerId, requestLoading]);

  const [history, setHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getBookingsByOwner(ownerId);
        const filtered = data.filter((b: any) =>
          ["approved", "completed"].includes(b.status.toLowerCase())
        );

        const mapped = filtered.map((b: any) => ({
          id: b.id,
          renter: {
            name: b.renterName,
            avatar: "/placeholder.svg",
            rating: 4.5,
            id: b.renterId,
          },
          owner: {
            id: b.ownerId,
            name: b.ownerName,
            email: b.ownerEmail,
          },
          vehicle: b.vehicleName,
          startDate: b.startDate,
          endDate: b.endDate,
          totalAmount: b.totalAmount,
          status: b.status.toLowerCase(),
          requestDate: b.startDate, // dùng tạm cho hiển thị
        }));

        setHistory(mapped);
      } catch (err) {
        console.error("Lỗi khi load lịch sử thuê xe:", err);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchHistory();
  }, [ownerId, historyLoading]);

  const handleApproveRequest = async (id: string) => {
    try {
      const dto = {
        bookingId: parseInt(id),
        newStatus: "approved",
      };
      await putBookingStatus(dto);

      // Cập nhật UI
      setRequests((prev) => prev.filter((req) => req.id !== id));
      toast.success(`Đã duyệt yêu cầu thuê xe #${id}`);
    } catch (error) {
      toast.error(`Không thể duyệt yêu cầu thuê xe #${id}`);
    }
  };

  const handleRejectRequest = (id: string) => {
    console.log("Reject request:", id);
    // Update the request status to rejected
    setRequests((prev) => prev.filter((req) => req.id !== id));
    // Show success toast
    alert(`Đã từ chối yêu cầu thuê xe #${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard chủ xe
            </h1>
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
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalVehicles}
              </div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <Car className="h-4 w-4" />
                Tổng xe
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.activeRentals}
              </div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <Clock className="h-4 w-4" />
                Đang cho thuê
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {stats.pendingRequests}
              </div>
              <div className="text-sm text-gray-600">Yêu cầu mới</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {(stats.monthlyRevenue / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <DollarSign className="h-4 w-4" />
                Doanh thu tháng
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {(stats.totalRevenue / 1000000).toFixed(1)}M
              </div>
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
            <TabsTrigger value="vehicles">
              Xe của tôi ({vehicles.length})
            </TabsTrigger>
            <TabsTrigger value="requests">
              Yêu cầu mới ({requests.length})
            </TabsTrigger>
            <TabsTrigger value="history">
              Lịch sử ({history.length})
            </TabsTrigger>
            <TabsTrigger value="analytics">Thống kê</TabsTrigger>
          </TabsList>

          <TabsContent value="vehicles" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle?.id} {...vehicle} />
              ))}

              {/* Add New Vehicle Card */}
              <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[300px]">
                  <Plus className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Đăng xe mới
                  </h3>
                  <p className="text-gray-500 text-center mb-4">
                    Thêm xe vào danh sách cho thuê để tăng thu nhập
                  </p>
                  <Button asChild>
                    <Link to="/dashboard/owner/list/vehicleList">
                      Đăng xe ngay
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6 mt-6">
            {requests.length > 0 ? (
              <div className="space-y-4">
                {requests.map((request) => (
                  <RequestCard
                    ownerId={0}
                    renterId={0}
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
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Không có yêu cầu mới
                  </h3>
                  <p className="text-gray-500">
                    Các yêu cầu thuê xe mới sẽ xuất hiện ở đây
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6 mt-6">
            {history.length > 0 ? (
              <div className="space-y-4">
                {history.map((request) => (
                  <RequestCard
                    ownerId={0}
                    renterId={0}
                    key={request.id}
                    request={request}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Chưa có lịch sử
                  </h3>
                  <p className="text-gray-500">
                    Lịch sử các chuyến thuê sẽ xuất hiện ở đây
                  </p>
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
                  <CardTitle className="text-base">
                    Xe được thuê nhiều nhất
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Honda Air Blade 150</span>
                      <span className="text-sm font-bold text-green-600">
                        25 chuyến
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Honda Winner X</span>
                      <span className="text-sm font-bold text-green-600">
                        23 chuyến
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Yamaha Exciter 155</span>
                      <span className="text-sm font-bold text-green-600">
                        18 chuyến
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Khách hàng thân thiết
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Nguyễn Văn A</span>
                      <span className="text-sm font-bold text-blue-600">
                        8 lần thuê
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Trần Thị B</span>
                      <span className="text-sm font-bold text-blue-600">
                        6 lần thuê
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Lê Văn C</span>
                      <span className="text-sm font-bold text-blue-600">
                        5 lần thuê
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Đánh giá trung bình
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-500 mb-2">
                      4.8
                    </div>
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
  );
}
