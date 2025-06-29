import { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Phone,
  MessageCircle,
  Star,
  Download,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/shared/status-badge";
import { useToast } from "@/hooks/use-toast";
import { getBookingDetailById } from "@/components/api/dashboardService";

const RentalDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [rentalDetail, setRentalDetail] = useState<any>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getBookingDetailById(id!);
        setRentalDetail(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu chi tiết:", error);
      }
    };

    fetchDetail();
  }, [id]);
  const [activeTab, setActiveTab] = useState<
    "overview" | "timeline" | "documents"
  >("overview");
  const { toast } = useToast();

  const handleCancelRental = () => {
    toast({
      title: "Hủy chuyến thuê",
      description:
        "Yêu cầu hủy chuyến thuê đã được gửi. Chúng tôi sẽ xử lý trong thời gian sớm nhất.",
    });
  };
  const navigate = useNavigate();

  const handleContactOwner = () => {
    // Navigate to chat or call
    navigate(
      `/chat/${rentalDetail?.id}/${rentalDetail?.renter.id}/${rentalDetail?.owner.id}`
    );
  };

  const handleDownloadDocument = (doc: any) => {
    toast({
      title: "Tải xuống",
      description: `Đang tải ${doc.name}...`,
    });
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
            to="/dashboard/renter"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Chi tiết chuyến thuê
              </h1>
              <p className="text-gray-600 mt-2">
                Mã đặt xe: #{rentalDetail?.id}
              </p>
            </div>
            <StatusBadge status={rentalDetail?.status} />
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
                onClick={() => setActiveTab("timeline")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "timeline"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Tiến trình
              </button>
              <button
                onClick={() => setActiveTab("documents")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "documents"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Tài liệu
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Vehicle Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin xe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <img
                        src={rentalDetail?.vehicle.image || "/placeholder.svg"}
                        alt={rentalDetail?.vehicle.name}
                        className="w-[150px] h-[100px] rounded-lg object-cover"
                      />
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-lg">
                          {rentalDetail?.vehicle.name}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            Biển số: {rentalDetail?.vehicle.licensePlate}
                          </div>
                          <div>Năm sản xuất: {rentalDetail?.vehicle.year}</div>
                          <div>Loại xe: {rentalDetail?.vehicle.type}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Rental Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Chi tiết thuê xe</CardTitle>
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
                            {formatDateTime(rentalDetail?.rental.startDate)}
                          </div>
                          <div>
                            Kết thúc:{" "}
                            {formatDateTime(rentalDetail?.rental.endDate)}
                          </div>
                          <div className="font-medium text-blue-600">
                            Tổng: {rentalDetail?.rental.totalDays} ngày
                          </div>
                        </div>
                      </div>
                    </div>

                    {rentalDetail?.notes && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-yellow-800">
                              Ghi chú quan trọng
                            </p>
                            <p className="text-sm text-yellow-700 mt-1">
                              {rentalDetail?.notes}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Owner Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin chủ xe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={rentalDetail?.owner.avatar}
                          alt={rentalDetail?.owner.name}
                        />
                        <AvatarFallback>
                          {rentalDetail?.owner.name
                            .split(" ")
                            .map((n: any) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {rentalDetail?.owner.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{rentalDetail?.owner.rating}</span>
                          <span>•</span>
                          <span>{rentalDetail?.owner.address}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleContactOwner}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Liên hệ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "timeline" && (
              <Card>
                <CardHeader>
                  <CardTitle>Tiến trình chuyến thuê</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {rentalDetail?.timeline?.map((item: any, index: any) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              item.completed ? "bg-green-500" : "bg-gray-200"
                            }`}
                          >
                            {item.completed ? (
                              <CheckCircle className="h-5 w-5 text-white" />
                            ) : (
                              <span className="text-sm font-medium text-gray-600">
                                {index + 1}
                              </span>
                            )}
                          </div>
                          {index < rentalDetail?.timeline.length - 1 && (
                            <div
                              className={`w-0.5 h-full ${
                                item.completed ? "bg-green-500" : "bg-gray-200"
                              }`}
                            />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <h4 className="font-medium text-gray-900">
                            {item.status}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDateTime(item.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "documents" && (
              <Card>
                <CardHeader>
                  <CardTitle>Tài liệu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rentalDetail?.documents?.map((doc: any, index: any) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Download className="h-5 w-5 text-blue-600" />
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <p className="text-sm text-gray-600">
                              PDF • {doc.type}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadDocument(doc)}
                        >
                          Tải xuống
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Actions & Pricing */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Thao tác</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" onClick={handleContactOwner}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Nhắn tin với chủ xe
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleCancelRental}
                >
                  Hủy chuyến thuê
                </Button>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Chi phí</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Giá thuê xe</span>
                    <span>
                      {rentalDetail?.pricing.dailyRate.toLocaleString("vi-VN")}
                      đ/ngày
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tổng tiền thuê</span>
                    <span>
                      {rentalDetail?.pricing.totalRental.toLocaleString(
                        "vi-VN"
                      )}
                      đ
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Tổng cộng</span>
                    <span className="text-blue-600">
                      {rentalDetail?.pricing.total.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tiền cọc</span>
                    <span>
                      {rentalDetail?.pricing.deposit.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalDetail;
