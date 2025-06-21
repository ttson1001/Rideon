
import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus } from "lucide-react"

interface StaffData {
  name: string
  email: string
  phone: string
  password: string
}

interface CreateStaffModalProps {
  open: boolean
  onClose: () => void
  onCreateStaff: (staffData: StaffData) => void
}

export default function CreateStaffModal({ open, onClose, onCreateStaff }: CreateStaffModalProps) {
  const [formData, setFormData] = useState<StaffData>({
    name: "",
    email: "",
    phone: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreateStaff(formData)
    onClose()
    setFormData({ name: "", email: "", phone: "", password: "" })
  }

  const handleChange = (field: keyof StaffData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <UserPlus className="h-5 w-5 mr-2" />
            Tạo tài khoản nhân viên
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Họ và tên *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Nhập họ và tên"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Nhập email"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Số điện thoại *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Nhập số điện thoại"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Mật khẩu tạm thời *</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Nhập mật khẩu tạm thời"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Nhân viên sẽ được yêu cầu đổi mật khẩu khi đăng nhập lần đầu</p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">Tạo tài khoản</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
