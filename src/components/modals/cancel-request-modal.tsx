

import { useState } from "react"
import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

interface CancelRequestModalProps {
  isOpen: boolean
  onClose: () => void
  rental: {
    id: string
    vehicle: {
      name: string
    }
    startDate: string
    endDate: string
    totalAmount: number
  } | null
  onConfirmCancel: (reason: string, details?: string) => void
}

const cancelReasons = [
  { value: "change_plans", label: "Thay đổi kế hoạch" },
  { value: "found_better", label: "Tìm được xe khác phù hợp hơn" },
  { value: "emergency", label: "Có việc khẩn cấp" },
  { value: "owner_issue", label: "Vấn đề với chủ xe" },
  { value: "vehicle_issue", label: "Vấn đề với xe" },
  { value: "other", label: "Lý do khác" },
]

export function CancelRequestModal({ isOpen, onClose, rental, onConfirmCancel }: CancelRequestModalProps) {
  const [selectedReason, setSelectedReason] = useState("")
  const [details, setDetails] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Don't render if rental is null
  if (!rental) {
    return null
  }

  const handleCancel = async () => {
    if (!selectedReason) {
      toast({
        title: "Vui lòng chọn lý do",
        description: "Hãy chọn lý do hủy yêu cầu thuê xe",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onConfirmCancel(selectedReason, details)

      toast({
        title: "Đã hủy yêu cầu",
        description: "Yêu cầu thuê xe đã được hủy thành công",
      })

      // Reset form
      setSelectedReason("")
      setDetails("")
      onClose()
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getRefundInfo = () => {
    const now = new Date()
    const startDate = new Date(rental.startDate)
    const hoursUntilStart = (startDate.getTime() - now.getTime()) / (1000 * 60 * 60)

    if (hoursUntilStart > 24) {
      return { percentage: 100, message: "Hoàn 100% tiền đã thanh toán" }
    } else if (hoursUntilStart > 2) {
      return { percentage: 50, message: "Hoàn 50% tiền đã thanh toán" }
    } else {
      return { percentage: 0, message: "Không hoàn tiền" }
    }
  }

  const refundInfo = getRefundInfo()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Hủy yêu cầu thuê xe
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Rental Info */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <h3 className="font-medium">{rental.vehicle.name}</h3>
            <p className="text-sm text-gray-600">
              {new Date(rental.startDate).toLocaleDateString("vi-VN")} -{" "}
              {new Date(rental.endDate).toLocaleDateString("vi-VN")}
            </p>
            <p className="text-sm font-medium text-blue-600">{rental.totalAmount.toLocaleString()}đ</p>
          </div>

          {/* Refund Info */}
          <div
            className={`p-3 rounded-lg border ${
              refundInfo.percentage > 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium">Chính sách hoàn tiền:</span>
              <span className={`text-sm font-bold ${refundInfo.percentage > 0 ? "text-green-600" : "text-red-600"}`}>
                {refundInfo.percentage}%
              </span>
            </div>
            <p className={`text-xs ${refundInfo.percentage > 0 ? "text-green-700" : "text-red-700"}`}>
              {refundInfo.message}
            </p>
          </div>

          {/* Cancel Reason */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Lý do hủy yêu cầu *</Label>
            <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
              {cancelReasons.map((reason) => (
                <div key={reason.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={reason.value} id={reason.value} />
                  <Label htmlFor={reason.value} className="text-sm cursor-pointer">
                    {reason.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            <Label htmlFor="details" className="text-sm font-medium">
              Chi tiết thêm (tùy chọn)
            </Label>
            <Textarea
              id="details"
              placeholder="Mô tả thêm về lý do hủy yêu cầu..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
            />
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-xs text-yellow-800">
                <p className="font-medium">Lưu ý:</p>
                <ul className="mt-1 space-y-1">
                  <li>• Hành động này không thể hoàn tác</li>
                  <li>• Tiền hoàn sẽ được xử lý trong 3-5 ngày làm việc</li>
                  <li>• Hủy nhiều lần có thể ảnh hưởng đến uy tín tài khoản</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Giữ lại yêu cầu
            </Button>
            <Button variant="destructive" onClick={handleCancel} disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Đang hủy..." : "Xác nhận hủy"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
