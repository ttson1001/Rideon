import { FC, useState } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, Calendar, MapPin, Clock, Shield } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Checkbox } from "../../../components/ui/checkbox"
import { Separator } from "../../../components/ui/separator"
import { useToast } from "../../../hooks/use-toast"

// Mock booking data
const mockBooking = {
  vehicle: {
    id: "1",
    name: "Honda Air Blade 150",
    image: "/placeholder.svg?height=200&width=300",
    pricePerDay: 150000,
    owner: "Nguyễn Văn A",
    location: "123 Nguyễn Huệ, Quận 1, TP.HCM",
  },
  rental: {
    startDate: "2024-01-15",
    endDate: "2024-01-17",
    days: 2,
    pickupTime: "09:00",
    returnTime: "18:00",
  },
  pricing: {
    dailyRate: 150000,
    days: 2,
    subtotal: 300000,
    serviceFee: 30000,
    insurance: 20000,
    total: 350000,
    deposit: 2000000,
  },
}

const BookingConfirmation: FC = () => {
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleConfirmBooking = async () => {
    if (!agreedToTerms) {
      toast({
        title: "Vui lòng đồng ý với điều khoản",
        description: "Bạn cần đồng ý với điều khoản sử dụng để tiếp tục.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Đặt xe thành công!",
        description: "Yêu cầu thuê xe của bạn đã được gửi. Chủ xe sẽ phản hồi trong thời gian sớm nhất.",
      })
      // Redirect to dashboard
      window.location.href = "/dashboard/renter"
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/vehicle/1" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-4">
            <ChevronLeft className="h-4 w-4" />
            Quay lại chi tiết xe
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Xác nhận đặt xe</h1>
          <p className="text-gray-600 mt-2">Vui lòng kiểm tra thông tin và xác nhận đặt xe</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vehicle Info */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin xe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <img
                    src={mockBooking.vehicle.image || "/placeholder.svg"}
                    alt={mockBooking.vehicle.name}
                    className="w-[120px] h-[80px] rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{mockBooking.vehicle.name}</h3>
                    <p className="text-gray-600">Chủ xe: {mockBooking.vehicle.owner}</p>
                    <div className="flex items-center gap-1 text-gray-600 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{mockBooking.vehicle.location}</span>
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
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Ngày nhận xe</span>
                    </div>
                    <p className="text-lg">{new Date(mockBooking.rental.startDate).toLocaleDateString("vi-VN")}</p>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{mockBooking.rental.pickupTime}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Ngày trả xe</span>
                    </div>
                    <p className="text-lg">{new Date(mockBooking.rental.endDate).toLocaleDateString("vi-VN")}</p>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{mockBooking.rental.returnTime}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700 mb-2">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium">Thời gian thuê</span>
                  </div>
                  <p className="text-blue-900 font-semibold">{mockBooking.rental.days} ngày</p>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardHeader>
                <CardTitle>Điều khoản và điều kiện</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span>Bạn phải có giấy phép lái xe hợp lệ và tuổi tối thiểu 18 tuổi</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span>Cần đặt cọc {mockBooking.pricing.deposit.toLocaleString()}đ khi nhận xe</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span>Không sử dụng rượu bia khi lái xe</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span>Chịu trách nhiệm về mọi thiệt hại xảy ra trong thời gian thuê</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span>Hoàn trả xe đúng thời gian và địa điểm đã thỏa thuận</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                  <Checkbox 
                    id="terms" 
                    checked={agreedToTerms} 
                    onCheckedChange={(checked) => setAgreedToTerms(checked === true)} 
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
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

          {/* Right Column - Price Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tổng thanh toán</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Giá thuê xe ({mockBooking.pricing.days} ngày)</span>
                    <span>{mockBooking.pricing.subtotal.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí dịch vụ</span>
                    <span>{mockBooking.pricing.serviceFee.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Bảo hiểm</span>
                    <span>{mockBooking.pricing.insurance.toLocaleString()}đ</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Tổng cộng</span>
                    <span>{mockBooking.pricing.total.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Đặt cọc</span>
                    <span>{mockBooking.pricing.deposit.toLocaleString()}đ</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt xe"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmation
