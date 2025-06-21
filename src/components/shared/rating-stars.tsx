import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingStarsProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  showNumber?: boolean
  className?: string
}

export function RatingStars({ rating, maxRating = 5, size = "md", showNumber = false, className }: RatingStarsProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {Array.from({ length: maxRating }, (_, index) => {
          const isFilled = index < Math.floor(rating)
          const isHalfFilled = index < rating && index >= Math.floor(rating)

          return (
            <Star
              key={index}
              className={cn(
                sizeClasses[size],
                isFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : isHalfFilled
                    ? "fill-yellow-200 text-yellow-400"
                    : "fill-gray-200 text-gray-200",
              )}
            />
          )
        })}
      </div>
      {showNumber && <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>}
    </div>
  )
}
