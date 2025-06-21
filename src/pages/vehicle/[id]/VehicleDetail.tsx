import { FC, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Shield, Fuel, Users, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/shared/status-badge";
import { RatingStars } from "@/components/shared/rating-stars";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

// Mock data
const mockVehicle = {
  id: "1",
  name: "Honda Air Blade 150",
  images: [
    "https://skamotors.com/wp-content/uploads/2023/08/IMG_6226.jpg",
    "https://skamotors.com/wp-content/uploads/2023/08/IMG_6226.jpg",
    "https://offroadvietnam.com/media/honda-vision-110cc-automatic-scooters-rentals-hanoi-vietnam-extended-luggage-rack.jpg",
    "https://offroadvietnam.com/media/honda-vision-110cc-automatic-scooters-rentals-hanoi-vietnam-extended-luggage-rack.jpg",
  ],
  pricePerDay: 150000,
  rating: 4.8,
  reviewCount: 124,
  status: "available" as const,
  owner: {
    name: "Nguyễn Văn A",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    responseTime: "Trong vòng 1 giờ",
    joinDate: "Tham gia từ 2022",
  },
  location: "123 Nguyễn Huệ, Quận 1, TP.HCM",
  description:
    "Honda Air Blade 150 mới 2023, xe đẹp, máy êm, tiết kiệm xăng. Phù hợp cho việc di chuyển trong thành phố và đi chơi cuối tuần. Xe được bảo dưỡng định kỳ, đảm bảo an toàn cho người sử dụng.",
  specifications: {
    year: "2023",
    engine: "150cc",
    fuelType: "Xăng",
    transmission: "Tự động",
    seats: "2 người",
  },
  features: ["Bảo hiểm xe máy", "Mũ bảo hiểm 2 chiếc", "Áo mưa", "Khóa chống trộm", "GPS định vị"],
  rentalConditions: [
    "Tuổi tối thiểu: 18 tuổi",
    "Giấy phép lái xe hợp lệ",
    "CCCD/CMND gốc",
    "Đặt cọc: 2,000,000 VNĐ",
    "Không sử dụng rượu bia khi lái xe",
  ],
};

const mockReviews = [
  {
    id: "1",
    user: "Trần Thị B",
    avatar: "/placeholder.svg?height=32&width=32",
    rating: 5,
    date: "2 ngày trước",
    comment: "Xe rất đẹp và chạy êm. Chủ xe thân thiện, giao xe đúng giờ. Sẽ thuê lại lần sau!",
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

const mockCurrentUser = {
  id: "user123",
};

const VehicleDetail: FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(undefined);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();
  const { id } = useParams();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === mockVehicle.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? mockVehicle.images.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link to="/browse" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
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
                  src={mockVehicle.images[currentImageIndex] || "/placeholder.svg"}
                  alt={mockVehicle.name}
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
                  <StatusBadge status={mockVehicle.status} />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className={`absolute top-4 right-4 bg-white/80 hover:bg-white ${isLiked ? "text-red-500" : ""}`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                </Button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {mockVehicle.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
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
                    <CardTitle className="text-2xl">{mockVehicle.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <RatingStars rating={mockVehicle.rating} showNumber />
                      <span className="text-gray-600">({mockVehicle.reviewCount} đánh giá)</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{mockVehicle.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{mockVehicle.pricePerDay.toLocaleString()}đ</div>
                    <div className="text-gray-600">/ ngày</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">Mô tả</h3>
                  <p className="text-gray-700">{mockVehicle.description}</p>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="font-semibold mb-3">Thông số kỹ thuật</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Năm sản xuất: {mockVehicle.specifications.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Động cơ: {mockVehicle.specifications.engine}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Nhiên liệu: {mockVehicle.specifications.fuelType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Số chỗ: {mockVehicle.specifications.seats}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="font-semibold mb-3">Tiện ích đi kèm</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockVehicle.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
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
                    {mockVehicle.rentalConditions.map((condition, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        {condition}
                      </li>
                    ))}
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
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        {selectedStartDate ? format(selectedStartDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
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
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        {selectedEndDate ? format(selectedEndDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
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
                        <AvatarImage src={review.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{review.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{review.user}</span>
                          <RatingStars rating={review.rating} size="sm" />
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{review.comment}</p>
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
                  <div className="text-3xl font-bold text-blue-600">{mockVehicle.pricePerDay.toLocaleString()}đ</div>
                  <div className="text-gray-600">/ ngày</div>
                </div>

                {/* Placeholder for selected dates summary */}
                {selectedStartDate && selectedEndDate && (
                  <div className="bg-blue-50 p-3 rounded-lg text-blue-800 text-center font-medium">
                    Thời gian thuê: {format(selectedStartDate, "dd/MM/yyyy", { locale: vi })} - {format(selectedEndDate, "dd/MM/yyyy", { locale: vi })}
                  </div>
                )}

                <Button
                  className="w-full"
                  size="lg"
                  disabled={!selectedStartDate || !selectedEndDate || mockVehicle.status !== "available"}
                  onClick={() => {
                    console.log("Rent now button clicked.");
                    if (selectedStartDate && selectedEndDate) {
                      const start = selectedStartDate.toISOString().split("T")[0];
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
                    const chatId = `${mockCurrentUser.id}-${mockVehicle.owner.name.replace(/\s+/g, "")}-${id}`;
                    navigate(`/chat/${chatId}`);
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
                    <AvatarImage src={mockVehicle.owner.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{mockVehicle.owner.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{mockVehicle.owner.name}</div>
                    <div className="flex items-center gap-1">
                      <RatingStars rating={mockVehicle.owner.rating} size="sm" />
                      <span className="text-sm text-gray-600">({mockVehicle.owner.rating})</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div>⚡ {mockVehicle.owner.responseTime}</div>
                  <div>📅 {mockVehicle.owner.joinDate}</div>
                </div>

                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/users/${mockVehicle.owner.name.replace(/\s+/g, '-')}`}>
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