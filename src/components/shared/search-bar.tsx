import { useState } from "react"
import { Calendar, MapPin, Search, Bike } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar as CalendarComponent } from "../ui/calendar"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

interface SearchBarProps {
  location?: string
  startDate?: Date
  endDate?: Date
  vehicleType?: string
  onSearch?: (params: {
    location: string
    startDate: Date | undefined
    endDate: Date | undefined
    vehicleType: string
  }) => void
  className?: string
}

export function SearchBar({
  location = "",
  startDate,
  endDate,
  vehicleType = "",
  onSearch,
  className,
}: SearchBarProps) {
  const [searchLocation, setSearchLocation] = useState(location)
  const [searchStartDate, setSearchStartDate] = useState<Date | undefined>(startDate)
  const [searchEndDate, setSearchEndDate] = useState<Date | undefined>(endDate)
  const [searchVehicleType, setSearchVehicleType] = useState(vehicleType)

  const handleSearch = () => {
    onSearch?.({
      location: searchLocation,
      startDate: searchStartDate,
      endDate: searchEndDate,
      vehicleType: searchVehicleType,
    })
  }

  return (
    <Card className={`p-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            Địa điểm
          </label>
          <Input
            placeholder="Nhập địa điểm..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Ngày bắt đầu
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left">
                {searchStartDate ? format(searchStartDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={searchStartDate}
                onSelect={setSearchStartDate}
                onDayClick={(day) => {
                  setSearchStartDate(day);
                  // Tự động đóng popover sau khi chọn
                  const popoverTrigger = document.querySelector('[data-state="open"]');
                  if (popoverTrigger) {
                    (popoverTrigger as HTMLElement).click();
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Ngày kết thúc
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left">
                {searchEndDate ? format(searchEndDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={searchEndDate}
                onSelect={setSearchEndDate}
                onDayClick={(day) => {
                  setSearchEndDate(day);
                  // Tự động đóng popover sau khi chọn
                  const popoverTrigger = document.querySelector('[data-state="open"]');
                  if (popoverTrigger) {
                    (popoverTrigger as HTMLElement).click();
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Vehicle Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Bike className="h-4 w-4" />
            Loại xe
          </label>
          <Select value={searchVehicleType} onValueChange={setSearchVehicleType}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn loại xe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="scooter">Xe ga</SelectItem>
              <SelectItem value="manual">Xe số</SelectItem>
              <SelectItem value="electric">Xe điện</SelectItem>
              <SelectItem value="sport">Xe thể thao</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4">
        <Button onClick={handleSearch} className="w-full md:w-auto">
          <Search className="h-4 w-4 mr-2" />
          Tìm kiếm
        </Button>
      </div>
    </Card>
  )
}
