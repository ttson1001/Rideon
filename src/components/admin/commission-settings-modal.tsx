
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Percent } from "lucide-react"

interface CommissionTier {
  minRentals: number
  maxRentals: number | null
  rate: number
  description: string
}

interface CommissionSettingsModalProps {
  open: boolean
  onClose: () => void
  onSave: (tiers: CommissionTier[]) => void
}

export default function CommissionSettingsModal({ open, onClose, onSave }: CommissionSettingsModalProps) {
  const [commissionTiers, setCommissionTiers] = useState<CommissionTier[]>([
    {
      minRentals: 0,
      maxRentals: 19,
      rate: 10,
      description: "Owner mới",
    },
    {
      minRentals: 20,
      maxRentals: 49,
      rate: 8,
      description: "Owner tích cực",
    },
    {
      minRentals: 50,
      maxRentals: null,
      rate: 6,
      description: "Owner VIP",
    },
  ])

  const handleTierChange = (index: number, field: keyof CommissionTier, value: any) => {
    setCommissionTiers((prev) => prev.map((tier, i) => (i === index ? { ...tier, [field]: value } : tier)))
  }

  const handleSave = () => {
    onSave(commissionTiers)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Cài đặt hoa hồng
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-sm text-gray-600">
            Cấu hình tỷ lệ hoa hồng dựa trên số lượt thuê của chủ xe. Hoa hồng sẽ được tự động áp dụng khi giải ngân.
          </div>

          <div className="space-y-4">
            {commissionTiers.map((tier, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Percent className="h-4 w-4 mr-2" />
                    Bậc {index + 1}: {tier.description}
                  </CardTitle>
                  <CardDescription>
                    {tier.minRentals} - {tier.maxRentals || "∞"} lượt thuê
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`min-${index}`}>Số lượt tối thiểu</Label>
                      <Input
                        id={`min-${index}`}
                        type="number"
                        value={tier.minRentals}
                        onChange={(e) => handleTierChange(index, "minRentals", Number.parseInt(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`max-${index}`}>Số lượt tối đa</Label>
                      <Input
                        id={`max-${index}`}
                        type="number"
                        value={tier.maxRentals || ""}
                        placeholder="Không giới hạn"
                        onChange={(e) =>
                          handleTierChange(index, "maxRentals", e.target.value ? Number.parseInt(e.target.value) : null)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor={`rate-${index}`}>Tỷ lệ hoa hồng (%)</Label>
                      <Input
                        id={`rate-${index}`}
                        type="number"
                        step="0.1"
                        value={tier.rate}
                        onChange={(e) => handleTierChange(index, "rate", Number.parseFloat(e.target.value))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`desc-${index}`}>Mô tả</Label>
                    <Input
                      id={`desc-${index}`}
                      value={tier.description}
                      onChange={(e) => handleTierChange(index, "description", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Ví dụ tính hoa hồng:</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <div>• Owner có 15 lượt thuê → Hoa hồng 10%</div>
              <div>• Owner có 35 lượt thuê → Hoa hồng 8%</div>
              <div>• Owner có 60 lượt thuê → Hoa hồng 6%</div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button onClick={handleSave}>Lưu cài đặt</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
