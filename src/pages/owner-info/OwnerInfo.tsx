import { FC } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  DollarSign,
  Shield,
  Clock,
  Users,
  CheckCircle,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/BecomeHost.png";

const OwnerInfo: FC = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Thu nhập ổn định",
      description: "Kiếm thêm 3-5 triệu/tháng từ việc cho thuê xe máy",
      highlight: "Lên đến 150k/ngày",
    },
    {
      icon: Shield,
      title: "Bảo hiểm toàn diện",
      description: "Xe được bảo hiểm 100% trong suốt thời gian cho thuê",
      highlight: "An tâm tuyệt đối",
    },
    {
      icon: Clock,
      title: "Linh hoạt thời gian",
      description: "Tự quyết định thời gian và điều kiện cho thuê xe",
      highlight: "Quản lý dễ dàng",
    },
    {
      icon: Users,
      title: "Cộng đồng tin cậy",
      description: "Kết nối với hàng nghìn người thuê đã được xác minh",
      highlight: "10,000+ thành viên",
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Đăng ký thông tin",
      description: "Cung cấp thông tin cá nhân và giấy tờ xe hợp lệ",
      icon: "📝",
    },
    {
      step: 2,
      title: "Đăng xe cho thuê",
      description: "Upload ảnh xe, mô tả chi tiết và đặt giá thuê",
      icon: "📸",
    },
    {
      step: 3,
      title: "Bắt đầu kiếm tiền",
      description: "Nhận yêu cầu thuê và bắt đầu tạo thu nhập",
      icon: "💰",
    },
  ];

  const requirements = [
    "CCCD/CMND hợp lệ (từ 18 tuổi)",
    "Giấy đăng ký xe máy gốc",
    "Bảo hiểm xe máy còn hiệu lực",
    "Xe máy trong tình trạng tốt",
    "Tài khoản ngân hàng để nhận tiền",
  ];

  const testimonials = [
    {
      name: "Nguyễn Văn A",
      location: "TP.HCM",
      income: "4.2 triệu/tháng",
      quote:
        "Từ khi tham gia MotoBike, tôi có thêm nguồn thu nhập ổn định mà không tốn nhiều thời gian quản lý.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Trần Thị B",
      location: "Hà Nội",
      income: "3.8 triệu/tháng",
      quote:
        "Nền tảng rất dễ sử dụng, khách hàng đáng tin cậy. Tôi rất hài lòng với dịch vụ.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#00a8ff] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-yellow-400 text-black hover:bg-yellow-500">
                  Cơ hội kiếm tiền
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Trở thành
                  <span className="block text-yellow-400">chủ xe MotoBike</span>
                </h1>
                <p className="text-xl text-white max-w-lg">
                  Biến xe máy của bạn thành nguồn thu nhập thụ động. Tham gia
                  cộng đồng hơn 5,000 chủ xe đang kiếm tiền mỗi ngày.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                  asChild
                >
                  <Link to="/dashboard/owner/list/VehicleList">
                    Đăng xe ngay
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-black hover:bg-white hover:text-[#00a8ff]"
                >
                  Tính toán thu nhập
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src={logo}
                alt="Become owner hero image"
                className="rounded-full shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain unchanged */}
      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tại sao nên trở thành chủ xe MotoBike?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá những lợi ích tuyệt vời khi tham gia cộng đồng chủ xe của
              chúng tôi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-bl-lg">
                  {benefit.highlight}
                </div>
                <CardContent className="space-y-4 pt-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cách thức hoạt động
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chỉ 3 bước đơn giản để bắt đầu kiếm tiền từ xe máy của bạn
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-[#00a8ff] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                  {step.icon}
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#00a8ff] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>

                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full">
                    <ArrowRight className="h-6 w-6 text-blue-300 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Điều kiện tham gia
            </h2>
            <p className="text-gray-600">
              Đảm bảo bạn đáp ứng các yêu cầu sau để trở thành chủ xe
            </p>
          </div>

          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Yêu cầu cần thiết:
                </h3>
                <ul className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">
                  💡 Mẹo để tăng thu nhập:
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Chụp ảnh xe đẹp và chi tiết</li>
                  <li>• Viết mô tả xe hấp dẫn</li>
                  <li>• Phản hồi nhanh chóng với khách hàng</li>
                  <li>• Giữ xe sạch sẽ và bảo dưỡng tốt</li>
                  <li>• Đặt giá cạnh tranh</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Câu chuyện thành công
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nghe chia sẻ từ những chủ xe đang kiếm tiền cùng MotoBike
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-[60px] h-[60px] rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {testimonial.location}
                      </p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: testimonial.rating }, (_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-lg font-bold text-green-600">
                        {testimonial.income}
                      </div>
                      <div className="text-xs text-gray-500">
                        Thu nhập/tháng
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic">
                    "{testimonial.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Sẵn sàng bắt đầu kiếm tiền?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Tham gia ngay hôm nay và bắt đầu tạo thu nhập từ xe máy của bạn
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
              asChild
            >
              <Link to="/dashboard/owner/list/VehicleList">
                Đăng xe đầu tiên
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-white hover:text-blue-600"
            >
              Liên hệ tư vấn
            </Button>
          </div>

          <div className="mt-8 text-sm text-blue-200">
            Miễn phí đăng ký • Không phí ẩn • Hỗ trợ 24/7
          </div>
        </div>
      </section>
    </div>
  );
};

export default OwnerInfo;
