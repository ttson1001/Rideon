import { FC, useState } from "react"
import { Filter, SortAsc, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { VehicleCard } from "@/components/shared/vehicle-card"
import { SearchBar } from "@/components/shared/search-bar"

// Mock data
const mockVehicles = [
  {
    id: "1",
    image: "/placeholder.svg?height=250&width=400",
    name: "Honda Air Blade 150",
    pricePerDay: 150000,
    rating: 4.8,
    reviewCount: 124,
    ownerName: "Nguyễn Văn A",
    location: "Quận 1, TP.HCM",
    status: "available" as const,
  },
  {
    id: "2",
    image: "/placeholder.svg?height=250&width=400",
    name: "Yamaha Exciter 155",
    pricePerDay: 180000,
    rating: 4.9,
    reviewCount: 89,
    ownerName: "Trần Thị B",
    location: "Quận 3, TP.HCM",
    status: "available" as const,
  },
  {
    id: "3",
    image: "/placeholder.svg?height=250&width=400",
    name: "Honda Winner X",
    pricePerDay: 200000,
    rating: 4.7,
    reviewCount: 156,
    ownerName: "Lê Văn C",
    location: "Quận 7, TP.HCM",
    status: "rented" as const,
  },
  {
    id: "4",
    image: "/placeholder.svg?height=250&width=400",
    name: "SH Mode 125",
    pricePerDay: 250000,
    rating: 4.9,
    reviewCount: 203,
    ownerName: "Phạm Thị D",
    location: "Quận 2, TP.HCM",
    status: "available" as const,
  },
]

const Browse: FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([50000, 500000])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("price-asc")

  const vehicleTypes = [
    { id: "scooter", label: "Xe ga" },
    { id: "manual", label: "Xe số" },
    { id: "electric", label: "Xe điện" },
    { id: "sport", label: "Xe thể thao" },
  ]

  const handleTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, typeId])
    } else {
      setSelectedTypes(selectedTypes.filter((id) => id !== typeId))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Bộ lọc
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Khoảng giá (VNĐ/ngày)</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500000}
                    min={50000}
                    step={10000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{priceRange[0].toLocaleString()}đ</span>
                    <span>{priceRange[1].toLocaleString()}đ</span>
                  </div>
                </div>

                {/* Vehicle Types */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Loại xe</Label>
                  <div className="space-y-2">
                    {vehicleTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={type.id}
                          checked={selectedTypes.includes(type.id)}
                          onCheckedChange={(checked) => handleTypeChange(type.id, !!checked)}
                        />
                        <Label htmlFor={type.id} className="text-sm">
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Đánh giá tối thiểu</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn đánh giá" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4.5">4.5+ sao</SelectItem>
                      <SelectItem value="4.0">4.0+ sao</SelectItem>
                      <SelectItem value="3.5">3.5+ sao</SelectItem>
                      <SelectItem value="3.0">3.0+ sao</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Khu vực</Label>
                  <Input placeholder="Nhập khu vực..." />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Sort and View Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Tìm thấy {mockVehicles.length} xe</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SortAsc className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
                    <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
                    <SelectItem value="rating-desc">Đánh giá cao nhất</SelectItem>
                    <SelectItem value="distance">Khoảng cách gần nhất</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Vehicle Grid */}
            <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
              {mockVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  {...vehicle}
                  onRequestRent={() => {
                    console.log("Request rent for:", vehicle.name)
                  }}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>
                  Trước
                </Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Sau</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Browse
