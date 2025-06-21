

import { useState, useEffect } from "react"
import { Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  rental: {
    id: string
    vehicle: {
      name: string
      image: string
    }
    owner: {
      name: string
    }
  } | null
  onSubmitReview: (review: {
    rating: number
    comment: string
    vehicleRating: number
    ownerRating: number
  }) => void
}

export function ReviewModal({ isOpen, onClose, rental, onSubmitReview }: ReviewModalProps) {
  const [overallRating, setOverallRating] = useState(0)
  const [vehicleRating, setVehicleRating] = useState(0)
  const [ownerRating, setOwnerRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  console.log("ReviewModal rendered with:", { isOpen, rental }) // Debug log

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setOverallRating(0)
      setVehicleRating(0)
      setOwnerRating(0)
      setComment("")
      setIsSubmitting(false)
    }
  }, [isOpen])

  // Don't render if rental is null
  if (!rental) {
    console.log("ReviewModal: rental is null, not rendering")
    return null
  }

  const handleSubmit = async () => {
    console.log("handleSubmit called with rating:", overallRating) // Debug log

    if (overallRating === 0) {
      toast({
        title: "Vui lòng đánh giá",
        description: "Hãy chọn số sao để đánh giá chuyến thuê",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onSubmitReview({
        rating: overallRating,
        comment,
        vehicleRating,
        ownerRating,
      })

      // Don't close modal here, let parent handle it
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const StarRating = ({
    rating,
    onRatingChange,
    label,
  }: { rating: number; onRatingChange: (rating: number) => void; label: string }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="transition-colors hover:scale-110"
          >
            <Star className={`h-6 w-6 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Đánh giá chuyến thuê
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Vehicle Info */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">🏍️</div>
            <div>
              <h3 className="font-medium">{rental.vehicle.name}</h3>
              <p className="text-sm text-gray-600">Chủ xe: {rental.owner.name}</p>
            </div>
          </div>

          {/* Overall Rating */}
          <StarRating rating={overallRating} onRatingChange={setOverallRating} label="Đánh giá tổng thể" />

          {/* Vehicle Rating */}
          <StarRating rating={vehicleRating} onRatingChange={setVehicleRating} label="Chất lượng xe" />

          {/* Owner Rating */}
          <StarRating rating={ownerRating} onRatingChange={setOwnerRating} label="Dịch vụ chủ xe" />

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-sm font-medium">
              Nhận xét (tùy chọn)
            </Label>
            <Textarea
              id="comment"
              placeholder="Chia sẻ trải nghiệm của bạn về chuyến thuê xe này..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Hủy
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
