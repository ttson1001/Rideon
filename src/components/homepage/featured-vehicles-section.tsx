import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VehicleCard } from "@/components/shared/vehicle-card"

// Mock featured vehicles data
const featuredVehicles = [
  {
    id: "1",
    image: "data:image/jpeg;base64,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",
    name: "Honda Air Blade 150",
    pricePerDay: 150000,
    rating: 4.9,
    reviewCount: 124,
    ownerName: "Nguyễn Văn A",
    location: "Quận 1, TP.HCM",
    status: "available" as const,
  },
  {
    id: "2",
    image: "https://otoxemay.vn/storage/images/2023/09/4721694761859-add-yamaha-exciter-155-vva-abs-2023.jpg",
    name: "Yamaha Exciter 155",
    pricePerDay: 180000,
    rating: 4.8,
    reviewCount: 89,
    ownerName: "Trần Thị B",
    location: "Quận 3, TP.HCM",
    status: "available" as const,
  },
  {
    id: "3",
    image: "https://img.baobacgiang.vn/Medias/2019/07/15/10/20190715102959-04.jpg",
    name: "Honda Winner X",
    pricePerDay: 200000,
    rating: 4.7,
    reviewCount: 156,
    ownerName: "Lê Văn C",
    location: "Quận 7, TP.HCM",
    status: "available" as const,
  },
  {
    id: "4",
    image: "https://muaxe.minhlongmoto.com/wp-content/uploads/2023/07/anh-xe-sh-mode-125-3-768x553.jpg",
    name: "SH Mode 125",
    pricePerDay: 250000,
    rating: 4.9,
    reviewCount: 203,
    ownerName: "Phạm Thị D",
    location: "Quận 2, TP.HCM",
    status: "available" as const,
  },
  {
    id: "5",
    image: "https://offroadvietnam.com/media/honda-vision-110cc-automatic-scooters-rentals-hanoi-vietnam-extended-luggage-rack.jpg",
    name: "Honda Vision 110",
    pricePerDay: 120000,
    rating: 4.6,
    reviewCount: 78,
    ownerName: "Hoàng Văn E",
    location: "Quận 5, TP.HCM",
    status: "available" as const,
  },
  {
    id: "6",
    image: "https://muaxe.minhlongmoto.com/wp-content/uploads/2023/07/anh-xe-yamaha-sirius-110-4-768x518.jpg",
    name: "Yamaha Sirius 110",
    pricePerDay: 100000,
    rating: 4.5,
    reviewCount: 92,
    ownerName: "Ngô Thị F",
    location: "Quận 6, TP.HCM",
    status: "available" as const,
  },
]

export function FeaturedVehiclesSection() {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">🚀 Xe máy nổi bật</h2>
            <p className="text-gray-600 max-w-2xl">
              Khám phá những chiếc xe được đánh giá cao nhất và được thuê nhiều nhất trên nền tảng
            </p>
          </div>

          <Button variant="outline" asChild className="hidden sm:flex">
            <Link to="/browse">
              Xem tất cả
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              {...vehicle}
              onRequestRent={() => {
                navigate(`/vehicle/${vehicle.id}`);
              }}
            />
          ))}
        </div>

        {/* Mobile "View All" button */}
        <div className="mt-8 text-center sm:hidden">
          <Button asChild>
            <Link to="/browse">
              Xem tất cả xe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
