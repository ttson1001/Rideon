
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle } from "lucide-react"

interface ReleaseFundsButtonProps {
  onRelease: () => void
}

export default function ReleaseFundsButton({ onRelease }: ReleaseFundsButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleRelease = () => {
    onRelease()
    setShowConfirm(false)
  }

  return (
    <>
      <Button size="sm" onClick={() => setShowConfirm(true)} className="bg-green-600 hover:bg-green-700">
        <CheckCircle className="h-4 w-4 mr-1" />
        Giải ngân
      </Button>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận giải ngân</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Bạn có chắc chắn muốn giải ngân tiền cho chủ xe? Hành động này không thể hoàn tác.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowConfirm(false)}>
                Hủy
              </Button>
              <Button onClick={handleRelease} className="bg-green-600 hover:bg-green-700">
                Xác nhận giải ngân
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
