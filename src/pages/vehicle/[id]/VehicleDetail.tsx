import { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Shield,
  Fuel,
  MessageCircle,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/shared/status-badge";
import { RatingStars } from "@/components/shared/rating-stars";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { getVehicleDetail } from "@/components/api/dashboardService";

const mockReviews = [
  {
    id: "1",
    user: "Trần Thị B",
    avatar: "/placeholder.svg?height=32&width=32",
    rating: 5,
    date: "2 ngày trước",
    comment:
      "Xe rất đẹp và chạy êm. Chủ xe thân thiện, giao xe đúng giờ. Sẽ thuê lại lần sau!",
  },
  {
    id: "2",
    user: "Lê Văn C",
    avatar: "/placeholder.svg?height=32&width=32",
    rating: 4,
    date: "1 tuần trước",
    comment: "Xe tốt, giá hợp lý. Chỉ có điều giao xe hơi muộn một chút.",
  },
];

const VehicleDetail: FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(
    undefined
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const { id } = useParams();

  const [vehicle, setVehicle] = useState<any | null>(null);
  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      try {
        const data = await getVehicleDetail(id);
        setVehicle({
          ...data,
          images: data.imageUrls ?? [],
          owner: {
            id: data.ownerId,
            name: data.ownerName,
            avatar: "/placeholder.svg",
            rating: 4.5,
            responseTime: "Trong vòng 1 giờ",
            joinDate: "Tham gia từ 2022",
          },
          location: "TP.HCM", // giả định nếu chưa có location
          specifications: {
            year: data.year,
            brand: data.brand,
            engine: "150cc", // nếu có thêm thì map vào
            fuelType: "Xăng",
            transmission: "Tự động",
          },
          features: ["Bảo hiểm", "Mũ bảo hiểm", "Áo mưa"],
          rentalConditions: [
            "Tuổi tối thiểu: 18 tuổi",
            "Giấy phép lái xe hợp lệ",
          ],
        });
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết xe:", err);
      }
    };
    fetchDetail();
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === vehicle?.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? vehicle?.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link
            to="/browse"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Quay lại danh sách
          </Link>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Carousel */}
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={vehicle?.images[currentImageIndex] || "/placeholder.svg"}
                  alt={vehicle?.name}
                  className="w-full h-96 object-cover"
                />

                {/* Navigation Buttons */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Status and Like */}
                <div className="absolute top-4 left-4">
                  <StatusBadge status={vehicle?.status} />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className={`absolute top-4 right-4 bg-white/80 hover:bg-white ${
                    isLiked ? "text-red-500" : ""
                  }`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart
                    className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                  />
                </Button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {vehicle?.images?.map((_: any, index: any) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Vehicle Info */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{vehicle?.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <RatingStars rating={vehicle?.rating} showNumber />
                      <span className="text-gray-600">
                        ({vehicle?.reviewCount} đánh giá)
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{vehicle?.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">
                      {vehicle?.pricePerDay.toLocaleString()}đ
                    </div>
                    <div className="text-gray-600">/ ngày</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">Mô tả</h3>
                  <p className="text-gray-700">{vehicle?.description}</p>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="font-semibold mb-3">Thông số kỹ thuật</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        Năm sản xuất: {vehicle?.specifications.year}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        Hãng xe: {vehicle?.specifications.brand}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="font-semibold mb-3">Tiện ích đi kèm</h3>
                  <div className="flex flex-wrap gap-2">
                    {vehicle?.features.map((feature: any, index: any) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Shield className="h-3 w-3" />
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Rental Conditions */}
                <div>
                  <h3 className="font-semibold mb-3">Điều kiện thuê xe</h3>
                  <ul className="space-y-2">
                    {vehicle?.rentalConditions.map(
                      (condition: any, index: any) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          {condition}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Rental Period Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Chọn thời gian thuê</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                {/* Start Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Ngày nhận xe
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        {selectedStartDate
                          ? format(selectedStartDate, "dd/MM/yyyy", {
                              locale: vi,
                            })
                          : "Chọn ngày"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={selectedStartDate}
                        onSelect={(date) => {
                          setSelectedStartDate(date);
                          console.log("Selected start date:", date);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Ngày trả xe
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        {selectedEndDate
                          ? format(selectedEndDate, "dd/MM/yyyy", {
                              locale: vi,
                            })
                          : "Chọn ngày"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={selectedEndDate}
                        onSelect={(date) => {
                          setSelectedEndDate(date);
                          console.log("Selected end date:", date);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Đánh giá từ khách hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={review.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>{review.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {review.user}
                          </span>
                          <RatingStars rating={review.rating} size="sm" />
                          <span className="text-xs text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking and Owner Info */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin thuê xe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {vehicle?.pricePerDay.toLocaleString()}đ
                  </div>
                  <div className="text-gray-600">/ ngày</div>
                </div>

                {/* Placeholder for selected dates summary */}
                {selectedStartDate && selectedEndDate && (
                  <div className="bg-blue-50 p-3 rounded-lg text-blue-800 text-center font-medium">
                    Thời gian thuê:{" "}
                    {format(selectedStartDate, "dd/MM/yyyy", { locale: vi })} -{" "}
                    {format(selectedEndDate, "dd/MM/yyyy", { locale: vi })}
                  </div>
                )}

                <Button
                  className="w-full"
                  size="lg"
                  disabled={
                    !selectedStartDate ||
                    !selectedEndDate ||
                    vehicle?.status !== "approved"
                  }
                  onClick={() => {
                    console.log("Rent now button clicked.");
                    if (selectedStartDate && selectedEndDate) {
                      const start = selectedStartDate
                        .toISOString()
                        .split("T")[0];
                      const end = selectedEndDate.toISOString().split("T")[0];
                      const navigateUrl = `/booking/confirm?vehicleId=${id}&startDate=${start}&endDate=${end}`;
                      console.log("Navigating to:", navigateUrl);
                      navigate(navigateUrl);
                    }
                  }}
                >
                  Thuê ngay
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    // Tạo hoặc tìm conversation với chủ xe
                    navigate(`/chat/`);
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Nhắn tin cho chủ xe
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  Bạn chưa bị tính phí. Chủ xe sẽ xác nhận yêu cầu của bạn.
                </div>
              </CardContent>
            </Card>

            {/* Owner Info */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin chủ xe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={vehicle?.owner.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback>{vehicle?.owner.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{vehicle?.owner.name}</div>
                    <div className="flex items-center gap-1">
                      <RatingStars rating={vehicle?.owner.rating} size="sm" />
                      <span className="text-sm text-gray-600">
                        ({vehicle?.owner.rating})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div>⚡ {vehicle?.owner.responseTime}</div>
                  <div>📅 {vehicle?.owner.joinDate}</div>
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/users/${vehicle?.owner.id}`}>
                    Xem hồ sơ chủ xe
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
