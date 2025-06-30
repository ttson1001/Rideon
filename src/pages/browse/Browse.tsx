import { FC, useEffect, useState } from "react";
import { Filter, SortAsc, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { VehicleCard } from "@/components/shared/vehicle-card";
import { getAllVehicles } from "@/components/api/dashboardService";

const Browse: FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([50000, 10000000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("price-asc");
  const [minRating, setMinRating] = useState(0);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getAllVehicles();
        const mapped = data
          .filter((v: any) => v.status?.toLowerCase() === "approved") // lọc trước
          .map((v: any) => ({
            id: v.id,
            image: v.imageUrls?.[0] || "/placeholder.svg",
            name: v.name,
            pricePerDay: v.pricePerDay,
            rating: 4.5,
            reviewCount: 0,
            ownerName: v.ownerName,
            location: v.ownerAddress,
            status: v.status?.toLowerCase(),
            type: v.type?.toLowerCase().includes("underbone")
              ? "manual"
              : v.type?.toLowerCase(),
          }));
        setVehicles(mapped);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách xe:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [loading]);

  const vehicleTypes = [
    { id: "scooter", label: "Xe ga" },
    { id: "manual", label: "Xe số" },
    { id: "electric", label: "Xe điện" },
    { id: "sport", label: "Xe thể thao" },
  ];

  const handleTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, typeId]);
    } else {
      setSelectedTypes(selectedTypes.filter((id) => id !== typeId));
    }
  };

  const filteredVehicles = vehicles
    .filter(
      (v) =>
        v.pricePerDay >= priceRange[0] &&
        v.pricePerDay <= priceRange[1] &&
        (selectedTypes.length === 0 || selectedTypes.includes(v.type)) &&
        v.rating >= minRating &&
        (searchLocation.trim() === "" ||
          v.location.toLowerCase().includes(searchLocation.toLowerCase())) &&
        (searchTerm.trim() === "" ||
          v.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.pricePerDay - b.pricePerDay;
      if (sortBy === "price-desc") return b.pricePerDay - a.pricePerDay;
      if (sortBy === "rating-desc") return b.rating - a.rating;
      return 0;
    });

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const paginatedVehicles = filteredVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Input
            placeholder="Tìm kiếm theo tên xe..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" /> Bộ lọc
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Khoảng giá (VNĐ/ngày)
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000000}
                    min={50000}
                    step={10000}
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{priceRange[0].toLocaleString()}đ</span>
                    <span>{priceRange[1].toLocaleString()}đ</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Loại xe</Label>
                  <div className="space-y-2">
                    {vehicleTypes.map((type) => (
                      <div
                        key={type.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={type.id}
                          checked={selectedTypes.includes(type.id)}
                          onCheckedChange={(checked) =>
                            handleTypeChange(type.id, !!checked)
                          }
                        />
                        <Label htmlFor={type.id} className="text-sm">
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Đánh giá tối thiểu
                  </Label>
                  <Select
                    onValueChange={(value) => setMinRating(parseFloat(value))}
                  >
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

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Khu vực</Label>
                  <Input
                    placeholder="Nhập khu vực..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  Tìm thấy {filteredVehicles.length} xe
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SortAsc className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
                    <SelectItem value="price-desc">
                      Giá: Cao đến thấp
                    </SelectItem>
                    <SelectItem value="rating-desc">
                      Đánh giá cao nhất
                    </SelectItem>
                    <SelectItem value="distance">
                      Khoảng cách gần nhất
                    </SelectItem>
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

            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "md:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {paginatedVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  {...vehicle}
                  onRequestRent={() => {
                    console.log("Request rent for:", vehicle.name);
                  }}
                />
              ))}
              {paginatedVehicles.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  Không có xe nào phù hợp với bộ lọc.
                </div>
              )}
            </div>

            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Trước
                </Button>
                {[...Array(totalPages)].map((_, idx) => (
                  <Button
                    key={idx + 1}
                    variant={currentPage === idx + 1 ? "default" : "outline"}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Sau
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
