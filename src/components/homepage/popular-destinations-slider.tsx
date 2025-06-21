
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DestinationCard } from "./destination-card"

const popularDestinations = [
  {
    name: "Đà Nẵng",
    slug: "da-nang",
    image: "/placeholder.svg?height=300&width=400",
    vehicleCount: 245,
    description: "Thành phố biển xinh đẹp với những cây cầu nổi tiếng và bãi biển tuyệt vời",
  },
  {
    name: "Quy Nhơn",
    slug: "quy-nhon",
    image: "/placeholder.svg?height=300&width=400",
    vehicleCount: 128,
    description: "Bãi biển hoang sơ, thành phố yên bình với nhiều di tích lịch sử",
  },
  {
    name: "Đà Lạt",
    slug: "da-lat",
    image: "/placeholder.svg?height=300&width=400",
    vehicleCount: 189,
    description: "Thành phố ngàn hoa với khí hậu mát mẻ quanh năm",
  },
  {
    name: "Hội An",
    slug: "hoi-an",
    image: "/placeholder.svg?height=300&width=400",
    vehicleCount: 156,
    description: "Phố cổ đẹp nhất Việt Nam với kiến trúc độc đáo và ẩm thực phong phú",
  },
  {
    name: "Phú Quốc",
    slug: "phu-quoc",
    image: "/placeholder.svg?height=300&width=400",
    vehicleCount: 98,
    description: "Đảo ngọc với bãi biển trong xanh và hải sản tươi ngon",
  },
  {
    name: "Nha Trang",
    slug: "nha-trang",
    image: "/placeholder.svg?height=300&width=400",
    vehicleCount: 267,
    description: "Thành phố biển sôi động với nhiều hoạt động giải trí",
  },
  {
    name: "Sapa",
    slug: "sapa",
    image: "/placeholder.svg?height=300&width=400",
    vehicleCount: 87,
    description: "Vùng núi cao với ruộng bậc thang và văn hóa dân tộc đặc sắc",
  },
]

export function PopularDestinationsSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              📍 Khám phá các địa điểm hot
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Những điểm đến được yêu thích nhất với hàng trăm lựa chọn xe máy chất lượng
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={scrollLeft} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollRight} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {popularDestinations.map((destination) => (
              <DestinationCard key={destination.slug} {...destination} />
            ))}
          </div>

          {/* Gradient overlays for scroll indication */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>

        {/* Mobile scroll hint */}
        <div className="mt-4 text-center md:hidden">
          <p className="text-sm text-gray-500">← Vuốt để xem thêm địa điểm →</p>
        </div>
      </div>
    </section>
  )
}
