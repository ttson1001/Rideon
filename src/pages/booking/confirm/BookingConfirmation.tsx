import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, Calendar, MapPin, Shield } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Checkbox } from "../../../components/ui/checkbox";
import { Separator } from "../../../components/ui/separator";
import { useToast } from "../../../hooks/use-toast";
import {
  API_BASE_URL,
  getCommission,
  getVehicleDetail,
  postBooking,
} from "@/components/api/dashboardService";

const BookingConfirmation: FC = () => {
  const [vehicle, setVehicle] = useState<any | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const [commissionRate, setCommissionRate] = useState(0.1);

  const queryParams = new URLSearchParams(location.search);
  const vehicleId = queryParams.get("vehicleId");
  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");

  useEffect(() => {
    const fetch = async () => {
      if (!vehicleId) return;
      const commission = await getCommission();
      setCommissionRate(commission);
      const data = await getVehicleDetail(vehicleId);
      setVehicle({ ...data, image: data.imageUrls?.[0] });
    };
    fetch();
  }, [vehicleId]);

  const getDayDiff = (start: string, end: string) => {
    const diff =
      (new Date(end).getTime() - new Date(start).getTime()) /
      (1000 * 60 * 60 * 24);
    return Math.max(1, Math.round(diff));
  };

  const days = startDate && endDate ? getDayDiff(startDate, endDate) : 0;

  const handleConfirmBooking = async () => {
    if (!agreedToTerms) {
      toast({
        title: "Vui lòng đồng ý với điều khoản",
        description: "Bạn cần đồng ý với điều khoản sử dụng để tiếp tục.",
        variant: "destructive",
      });
      return;
    }

    if (!vehicleId || !vehicle || !startDate || !endDate) return;

    setIsSubmitting(true);
    try {
      const dto = {
        vehicleId: parseInt(vehicleId),
        renterId: Number(localStorage.getItem("userId") || ""),
        startDate: startDate + "T00:00:00",
        endDate: endDate + "T00:00:00",
        pickupTime: "09:00:00",
        returnTime: "18:00:00",
        serviceFee: 30000,
        insuranceFee: 20000,
      };

      // 1. Gọi API tạo booking
      const bookingRes = await postBooking(dto);
      const bookingId = bookingRes?.data;

      if (!bookingId) throw new Error("Không lấy được bookingId");

      // 2. Gọi API backend tạo link thanh toán PayOS
      const paymentRes = await fetch(API_BASE_URL + "/Payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          amount: total, // hoặc chỉ cần đặt cọc (total * commissionRate)
        }),
      });

      if (!paymentRes.ok) throw new Error("Tạo link thanh toán thất bại");

      const { paymentUrl } = await paymentRes.json();

      // 3. Mở tab thanh toán PayOS
      window.open(paymentUrl, "_blank");

      // 4. Optional: toast và điều hướng
      toast({
        title: "Đã tạo đơn thành công",
        description: "Đang chuyển đến trang thanh toán...",
      });
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || err.message || "Có lỗi xảy ra";
      toast({
        title: "Đặt xe thất bại",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = vehicle ? days * vehicle.pricePerDay : 0;
  const subtotal = vehicle ? days * vehicle.pricePerDay : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to={`/vehicle/${vehicleId}`}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-4"
          >
            <ChevronLeft className="h-4 w-4" />
            Quay lại chi tiết xe
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Xác nhận đặt xe</h1>
          <p className="text-gray-600 mt-2">
            Vui lòng kiểm tra thông tin và xác nhận đặt xe
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin xe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <img
                    src={vehicle?.image || "/placeholder.svg"}
                    alt={vehicle?.name}
                    className="w-[120px] h-[80px] rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{vehicle?.name}</h3>
                    <p className="text-gray-600">
                      Chủ xe: {vehicle?.ownerName}
                    </p>
                    <div className="flex items-center gap-1 text-gray-600 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">TP.HCM</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chi tiết thuê xe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Ngày nhận xe</span>
                    </div>
                    <p className="text-lg">
                      {startDate &&
                        new Date(startDate).toLocaleDateString("vi-VN")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Ngày trả xe</span>
                    </div>
                    <p className="text-lg">
                      {endDate && new Date(endDate).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700 mb-2">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium">Thời gian thuê</span>
                  </div>
                  <p className="text-blue-900 font-semibold">{days} ngày</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Điều khoản và điều kiện</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span>
                      Bạn phải có giấy phép lái xe hợp lệ và tuổi tối thiểu 18
                      tuổi
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span>Không sử dụng rượu bia khi lái xe</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) =>
                      setAgreedToTerms(checked === true)
                    }
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Tôi đã đọc và đồng ý với{" "}
                    <Link to="/terms" className="text-blue-600 hover:underline">
                      điều khoản sử dụng
                    </Link>{" "}
                    và{" "}
                    <Link to="/terms" className="text-blue-600 hover:underline">
                      chính sách bảo mật
                    </Link>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tổng thanh toán</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Giá thuê xe ({days} ngày)</span>
                    <span>{subtotal.toLocaleString()}đ</span>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Tổng cộng</span>
                    <span>{total.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Đặt cọc</span>
                    <span>{(total * commissionRate)?.toLocaleString()}đ</span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting || !vehicle}
                >
                  {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt xe"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
