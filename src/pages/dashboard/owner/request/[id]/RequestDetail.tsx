import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  Check,
  X,
} from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import { Separator } from "../../../../../components/ui/separator";
import { StatusBadge } from "../../../../../components/shared/status-badge";
import { useToast } from "../../../../../hooks/use-toast";

// Mock data for request details
const mockRequestDetail = {
  id: "1",
  requestCode: "REQ240115001",
  status: "pending" as const,
  requestDate: "2024-01-15T10:30:00Z",

  renter: {
    id: "renter1",
    name: "Nguyễn Văn A",
    phone: "0901234567",
    email: "nguyenvana@email.com",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.7,
    totalRentals: 12,
    joinDate: "2023-05-15",
    verificationStatus: "verified",
    identityCard: "123456789",
    address: "456 Lê Lợi, Quận 3, TP.HCM",
  },

  vehicle: {
    id: "v1",
    name: "Honda Air Blade 150",
    image: "/placeholder.svg?height=200&width=300",
    licensePlate: "59A1-12345",
    year: "2023",
    type: "Tay ga",
    pricePerDay: 150000,
  },

  rental: {
    startDate: "2024-01-20T09:00:00Z",
    endDate: "2024-01-22T18:00:00Z",
    pickupLocation: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    returnLocation: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    totalDays: 2,
    purpose: "Du lịch cuối tuần",
  },

  pricing: {
    dailyRate: 150000,
    totalRental: 300000,
    serviceFee: 30000,
    insurance: 20000,
    total: 350000,
    deposit: 2000000,
  },

  notes:
    "Tôi cần xe để đi du lịch Vũng Tàu cuối tuần. Sẽ giữ xe cẩn thận và trả đúng giờ.",

  renterHistory: [
    {
      date: "2023-12-10",
      vehicle: "Honda Winner X",
      rating: 5,
      comment: "Khách hàng rất tốt, giữ xe sạch sẽ",
    },
    {
      date: "2023-11-15",
      vehicle: "Yamaha Exciter 155",
      rating: 4,
      comment: "Trả xe đúng giờ",
    },
  ],
};

export default function RequestDetail() {
  const [activeTab, setActiveTab] = useState<"overview" | "renter" | "history">(
    "overview"
  );
  const { toast } = useToast();

  const handleApprove = () => {
    toast({
      title: "Đã duyệt yêu cầu",
      description:
        "Yêu cầu thuê xe đã được chấp nhận. Khách hàng sẽ nhận được thông báo.",
    });
    // In real app, update status and redirect
  };

  const handleReject = () => {
    toast({
      title: "Đã từ chối yêu cầu",
      description:
        "Yêu cầu thuê xe đã bị từ chối. Khách hàng sẽ nhận được thông báo.",
    });
    // In real app, update status and redirect
  };

  const handleContact = () => {
    window.location.href = `tel:${mockRequestDetail.renter.phone}`;
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard/owner"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Chi tiết yêu cầu thuê xe
              </h1>
              <p className="text-gray-600 mt-2">
                Mã yêu cầu: #{mockRequestDetail.requestCode}
              </p>
            </div>
            <StatusBadge status={mockRequestDetail.status} />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "overview"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Tổng quan
              </button>
              <button
                onClick={() => setActiveTab("renter")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "renter"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Thông tin khách
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "history"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Lịch sử thuê
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Vehicle Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin xe được yêu cầu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <img
                        src={
                          mockRequestDetail.vehicle.image || "/placeholder.svg"
                        }
                        alt={mockRequestDetail.vehicle.name}
                        className="w-[150px] h-[100px] rounded-lg object-cover"
                      />
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-lg">
                          {mockRequestDetail.vehicle.name}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            Biển số: {mockRequestDetail.vehicle.licensePlate}
                          </div>
                          <div>
                            Năm sản xuất: {mockRequestDetail.vehicle.year}
                          </div>
                          <div>Loại xe: {mockRequestDetail.vehicle.type}</div>
                          <div>
                            Giá thuê:{" "}
                            {mockRequestDetail.vehicle.pricePerDay.toLocaleString()}
                            đ/ngày
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Rental Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Chi tiết yêu cầu thuê</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Thời gian thuê</span>
                        </div>
                        <div className="pl-6 space-y-1 text-sm">
                          <div>
                            Bắt đầu:{" "}
                            {formatDateTime(mockRequestDetail.rental.startDate)}
                          </div>
                          <div>
                            Kết thúc:{" "}
                            {formatDateTime(mockRequestDetail.rental.endDate)}
                          </div>
                          <div className="font-medium text-blue-600">
                            Tổng: {mockRequestDetail.rental.totalDays} ngày
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Địa điểm</span>
                        </div>
                        <div className="pl-6 space-y-1 text-sm">
                          <div>
                            Nhận xe: {mockRequestDetail.rental.pickupLocation}
                          </div>
                          <div>
                            Trả xe: {mockRequestDetail.rental.returnLocation}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="font-medium">Mục đích thuê xe:</span>
                      <p className="text-sm text-gray-600">
                        {mockRequestDetail.rental.purpose}
                      </p>
                    </div>

                    {mockRequestDetail.notes && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <MessageCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-800">
                              Ghi chú từ khách hàng
                            </p>
                            <p className="text-sm text-blue-700 mt-1">
                              {mockRequestDetail.notes}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "renter" && (
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin khách hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={
                          mockRequestDetail.renter.avatar || "/placeholder.svg"
                        }
                      />
                      <AvatarFallback>
                        {mockRequestDetail.renter.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {mockRequestDetail.renter.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>
                          {mockRequestDetail.renter.rating} (
                          {mockRequestDetail.renter.totalRentals} chuyến)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            mockRequestDetail.renter.verificationStatus ===
                            "verified"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {mockRequestDetail.renter.verificationStatus ===
                          "verified"
                            ? "✓ Đã xác thực"
                            : "Chưa xác thực"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Thông tin liên hệ</h4>
                      <div className="space-y-2 text-sm">
                        <div>📞 {mockRequestDetail.renter.phone}</div>
                        <div>📧 {mockRequestDetail.renter.email}</div>
                        <div>🏠 {mockRequestDetail.renter.address}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Thông tin cá nhân</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          🆔 CCCD: {mockRequestDetail.renter.identityCard}
                        </div>
                        <div>
                          📅 Tham gia:{" "}
                          {new Date(
                            mockRequestDetail.renter.joinDate
                          ).toLocaleDateString("vi-VN")}
                        </div>
                        <div>
                          🚗 Tổng chuyến:{" "}
                          {mockRequestDetail.renter.totalRentals}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "history" && (
              <Card>
                <CardHeader>
                  <CardTitle>Lịch sử thuê xe của khách hàng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRequestDetail.renterHistory.map((history, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{history.vehicle}</h4>
                            <p className="text-sm text-gray-600">
                              {new Date(history.date).toLocaleDateString(
                                "vi-VN"
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{history.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          {history.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Actions & Summary */}
          <div className="space-y-6">
            {/* Pricing Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Tóm tắt chi phí</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>
                    Giá thuê ({mockRequestDetail.rental.totalDays} ngày)
                  </span>
                  <span>
                    {mockRequestDetail.pricing.totalRental.toLocaleString()}đ
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Phí dịch vụ</span>
                  <span>
                    {mockRequestDetail.pricing.serviceFee.toLocaleString()}đ
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bảo hiểm</span>
                  <span>
                    {mockRequestDetail.pricing.insurance.toLocaleString()}đ
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Tổng cộng</span>
                  <span className="text-blue-600">
                    {mockRequestDetail.pricing.total.toLocaleString()}đ
                  </span>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Tiền cọc</span>
                    <span className="font-medium text-green-600">
                      {mockRequestDetail.pricing.deposit.toLocaleString()}đ
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            {mockRequestDetail.status === "pending" && (
              <Card>
                <CardHeader>
                  <CardTitle>Hành động</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" onClick={handleApprove}>
                    <Check className="h-4 w-4 mr-2" />
                    Duyệt yêu cầu
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    onClick={handleReject}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Từ chối yêu cầu
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Liên hệ khách hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleContact}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Gọi điện thoại
                </Button>
              </CardContent>
            </Card>

            {/* Request Info */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin yêu cầu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Mã yêu cầu:</span>
                  <span className="font-medium">
                    {mockRequestDetail.requestCode}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Ngày gửi:</span>
                  <span>{formatDateTime(mockRequestDetail.requestDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Trạng thái:</span>
                  <StatusBadge status={mockRequestDetail.status} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
