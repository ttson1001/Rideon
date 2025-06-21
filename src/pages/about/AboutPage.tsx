import { FC } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { BikeIcon as Motorcycle, Shield, Clock, Star, Phone, ArrowRight } from "lucide-react"

const AboutPage: FC = () => {
  const handleRentClick = () => {
    // This would navigate to browse page
    window.location.href = "/browse"
  }

  const features = [
    {
      icon: Clock,
      title: "Đặt xe dễ dàng",
      description: "Quy trình đặt xe đơn giản, nhanh chóng chỉ với vài thao tác trên ứng dụng",
    },
    {
      icon: Star,
      title: "Giá cả hợp lý",
      description: "Mức giá cạnh tranh với nhiều ưu đãi hấp dẫn cho khách hàng thân thiết",
    },
    {
      icon: Motorcycle,
      title: "Đa dạng xe",
      description: "Nhiều loại xe đa dạng phù hợp với mọi nhu cầu và phong cách của khách hàng",
    },
    {
      icon: Phone,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ hỗ trợ chuyên nghiệp, sẵn sàng giúp đỡ bạn mọi lúc mọi nơi",
    },
  ]

  const teamMembers = [
    {
      name: "Nguyễn Văn An",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=300&width=300",
      description: "Với hơn 10 năm kinh nghiệm trong lĩnh vực công nghệ và du lịch",
    },
    {
      name: "Trần Thị Bình",
      role: "CTO",
      image: "/placeholder.svg?height=300&width=300",
      description: "Chuyên gia công nghệ với kinh nghiệm phát triển ứng dụng di động",
    },
    {
      name: "Lê Minh Cường",
      role: "Head of Operations",
      image: "/placeholder.svg?height=300&width=300",
      description: "Quản lý vận hành với chuyên môn về logistics và dịch vụ khách hàng",
    },
    {
      name: "Phạm Thu Dung",
      role: "Marketing Director",
      image: "/placeholder.svg?height=300&width=300",
      description: "Chuyên gia marketing với kinh nghiệm xây dựng thương hiệu",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="row align-items-center">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  MOTOBIKE - Hành trình của bạn, Đam mê của chúng tôi
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Mỗi chuyến đi là một cuộc phiêu lưu đang chờ đợi để mở ra. Tại MOTOBIKE, chúng tôi tin tưởng vào việc
                  trao quyền cho người đi xe khám phá thế giới với sự tự tin và phấn khích.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Là một nền tảng chia sẻ xe máy hàng đầu, sứ mệnh của chúng tôi là kết nối người đi xe với chiếc xe
                  hoàn hảo cho hành trình của họ, đảm bảo một trải nghiệm liền mạch và thú vị mỗi lần.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-blue-100 rounded-full mb-6">
                  <Motorcycle className="w-16 h-16 text-blue-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">Khám phá cùng MOTOBIKE</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-green-100 rounded-full mb-6">
                <Shield className="w-16 h-16 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">An toàn & Bảo hiểm</h4>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Lái xe. Khám phá. Truyền cảm hứng
              </h1>
              <p className="text-xl text-gray-600">Cảm nhận sự hồi hộp và khám phá thế giới với sự tự tin.</p>
              <p className="text-gray-600 leading-relaxed">
                MOTOBIKE hướng tới xây dựng một cộng đồng người đi xe có trách nhiệm và nhiệt huyết, mang lại giá trị
                thực tiễn và những hành trình truyền cảm hứng cho tất cả các thành viên.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi tin rằng mỗi hành trình đều quan trọng. Đội ngũ và các đối tác của chúng tôi, với kinh nghiệm
                phong phú trong lĩnh vực cho thuê xe máy, công nghệ, bảo hiểm và du lịch, mang đến cho bạn những trải
                nghiệm độc đáo và an toàn trên mỗi chuyến đi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ưu điểm nổi bật của MOTOBIKE</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gray-50"
              >
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Đội ngũ của chúng tôi</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gặp gỡ những con người tài năng đang xây dựng tương lai của việc thuê xe máy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">Sẵn sàng bắt đầu hành trình của bạn?</h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Tham gia cộng đồng MOTOBIKE ngay hôm nay và khám phá những trải nghiệm tuyệt vời. Hàng nghìn chiếc xe đang
              chờ đón bạn!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                onClick={handleRentClick}
              >
                Thuê xe ngay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">10,000+</div>
              <div className="text-gray-600">Khách hàng hài lòng</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">5,000+</div>
              <div className="text-gray-600">Xe máy chất lượng</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">Thành phố phục vụ</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600">Hỗ trợ khách hàng</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
