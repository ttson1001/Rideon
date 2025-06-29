import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getReviewByBookingId, postReview } from "../api/dashboardService";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  rental: {
    id: string; // bookingId
    vehicle: {
      name: string;
      image: string;
    };
    owner: {
      id: string;
      name: string;
    };
  } | null;
  onSubmitReview?: () => void; // callback để reload
}

export function ReviewModal({
  isOpen,
  onClose,
  rental,
  onSubmitReview,
}: ReviewModalProps) {
  const [overallRating, setOverallRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const userId = parseInt(localStorage.getItem("userId") || "0");

  useEffect(() => {
    const fetchExistingReview = async () => {
      if (rental && isOpen) {
        try {
          const res = await getReviewByBookingId(parseInt(rental.id));
          if (res.success && res.data) {
            setOverallRating(res.data.rating);
            setComment(res.data.comment || "");
          }
        } catch (err) {
          console.error("Failed to fetch review:", err);
        }
      }
    };

    fetchExistingReview();
  }, [rental, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setOverallRating(0);
      setComment("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!rental) return null;
  console.log(rental, "fksdahjksdàh");

  const handleSubmit = async () => {
    if (overallRating === 0) {
      toast({
        title: "Vui lòng đánh giá",
        description: "Hãy chọn số sao để đánh giá chuyến thuê",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await postReview({
        bookingId: parseInt(rental.id),
        reviewerId: userId,
        revieweeId: parseInt(rental.owner.id),
        rating: overallRating,
        comment,
      });

      toast({
        title: "Gửi đánh giá thành công",
      });

      onSubmitReview?.(); // reload review list nếu có
      onClose();
    } catch (error: any) {
      toast({
        title: "Có lỗi xảy ra",
        description: error.response?.data?.message || "Vui lòng thử lại sau",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({
    rating,
    onRatingChange,
    label,
  }: {
    rating: number;
    onRatingChange: (rating: number) => void;
    label: string;
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`h-6 w-6 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Đánh giá chuyến thuê</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              🏍️
            </div>
            <div>
              <h3 className="font-medium">{rental.vehicle.name}</h3>
              <p className="text-sm text-gray-600">
                Chủ xe: {rental.owner.name}
              </p>
            </div>
          </div>

          <StarRating
            rating={overallRating}
            onRatingChange={setOverallRating}
            label="Đánh giá tổng thể"
          />

          <div className="space-y-2">
            <Label htmlFor="comment" className="text-sm font-medium">
              Nhận xét (tùy chọn)
            </Label>
            <Textarea
              id="comment"
              placeholder="Chia sẻ trải nghiệm của bạn..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Hủy
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
