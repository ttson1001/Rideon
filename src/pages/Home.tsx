import { FC } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchBar } from "@/components/shared/search-bar";
import { FeaturedVehiclesSection } from "@/components/homepage/featured-vehicles-section";
import { PopularDestinationsSlider } from "@/components/homepage/popular-destinations-slider";
import banner from "@/assets/RideonBanner.png";
const Home: FC = () => {
  const features = [
    {
      icon: Shield,
      title: "An toàn & Tin cậy",
      description: "Tất cả xe đều được kiểm tra kỹ lưỡng và có bảo hiểm",
    },
    {
      icon: Clock,
      title: "Thuê nhanh chóng",
      description: "Đặt xe chỉ trong vài phút, nhận xe ngay lập tức",
    },
    {
      icon: Star,
      title: "Đánh giá cao",
      description: "Hàng nghìn đánh giá 5 sao từ khách hàng hài lòng",
    },
    {
      icon: Users,
      title: "Cộng đồng lớn",
      description: "Hơn 10,000 chủ xe và người thuê trên toàn quốc",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#00a8ff] text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Thuê xe máy dễ dàng
                  <span className="block text-yellow-400">
                    Trải nghiệm địa phương như người bản xứ
                  </span>
                </h1>
                <p className="text-xl text-white max-w-lg">
                  Nền tảng thuê xe máy hàng đầu Việt Nam. Hàng nghìn lựa chọn xe
                  chất lượng cao với giá cả hợp lý.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                  asChild
                >
                  <Link to="/browse">
                    Tìm xe gần bạn
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-black hover:bg-white hover:text-[#00a8ff]"
                  asChild
                  onClick={() => console.log("Become Owner button clicked")}
                >
                  <Link to="/owner-info">Trở thành chủ xe</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src={banner}
                alt="Motorbike rental hero image"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tìm xe phù hợp với bạn
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nhập thông tin để tìm kiếm xe máy phù hợp với nhu cầu của bạn
            </p>
          </div>

          <SearchBar
            onSearch={(params) => {
              console.log("Search params:", params);
              // Handle search logic here
            }}
          />
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <FeaturedVehiclesSection />

      {/* Popular Destinations Slider */}
      <PopularDestinationsSlider />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tại sao chọn MotoBike?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến trải nghiệm thuê xe tốt nhất với những
              ưu điểm vượt trội
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow"
              >
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#00a8ff] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Sẵn sàng bắt đầu hành trình?
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Tham gia cộng đồng MotoBike ngay hôm nay và khám phá những trải
            nghiệm tuyệt vời
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
              asChild
            >
              <Link to="/signup">
                Đăng ký ngay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#00a8ff]"
              asChild
            >
              <Link to="/about">Tìm hiểu thêm</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
