
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
}

interface BlockUserModalProps {
  user: User | null
  open: boolean
  onClose: () => void
  onBlock: (userId: string, reason: string) => void
}

export default function BlockUserModal({ user, open, onClose, onBlock }: BlockUserModalProps) {
  const [reason, setReason] = useState("")

  if (!user) return null

  const handleBlock = () => {
    if (reason.trim()) {
      onBlock(user.id, reason)
      onClose()
      setReason("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            Khóa tài khoản người dùng
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">
              Bạn có chắc chắn muốn khóa tài khoản của <strong>{user.name}</strong>? Người dùng sẽ không thể đăng nhập
              và sử dụng dịch vụ.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lý do khóa tài khoản *</label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nhập lý do khóa tài khoản..."
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleBlock} disabled={!reason.trim()}>
              Khóa tài khoản
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
