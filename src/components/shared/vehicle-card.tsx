import { Link } from 'react-router-dom'
import { MapPin } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { StatusBadge } from "./status-badge"
import { RatingStars } from "./rating-stars"

interface VehicleCardProps {
  id: string
  image: string
  name: string
  pricePerDay: number
  rating: number
  reviewCount: number
  ownerName: string
  location: string
  status: "available" | "rented" | "unavailable"
  onRequestRent?: () => void
}

export function VehicleCard({
  id,
  image,
  name,
  pricePerDay,
  rating,
  reviewCount,
  ownerName,
  location,
  status,
  onRequestRent,
}: VehicleCardProps) {
  return (
    <Card className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <StatusBadge status={status} />
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{name}</h3>
          <div className="text-right">
            <p className="text-xl font-bold text-blue-600">{pricePerDay.toLocaleString()}đ</p>
            <p className="text-sm text-gray-500">/ngày</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <RatingStars rating={rating} size="sm" />
          <span className="text-sm text-gray-600">({reviewCount})</span>
        </div>

        <p className="text-sm text-gray-600 mb-1">Chủ xe: {ownerName}</p>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button variant="outline" asChild className="flex-1">
            <Link to={`/vehicle/${id}`}>Xem chi tiết</Link>
          </Button>
          {status === "available" && onRequestRent && (
            <Button onClick={onRequestRent} className="flex-1">
              Thuê ngay
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
