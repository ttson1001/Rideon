import { Link } from 'react-router-dom'
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface DestinationCardProps {
  name: string
  slug: string
  image: string
  vehicleCount?: number
  description?: string
}

export function DestinationCard({ name, slug, image, vehicleCount, description }: DestinationCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-w-[280px] flex-shrink-0">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {vehicleCount && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-800">
            {vehicleCount} xe
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl mb-1 flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {name}
          </h3>
          {description && <p className="text-white/90 text-sm line-clamp-2">{description}</p>}
        </div>
      </div>

      <CardContent className="p-4">
        <Button asChild className="w-full">
          <Link to={`/browse?location=${slug}`}>Xem xe tại đây</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
