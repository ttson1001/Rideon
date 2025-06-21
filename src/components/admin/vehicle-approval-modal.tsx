import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, X, FileText, AlertTriangle, Star } from "lucide-react"
import { PendingVehicle } from "@/types/vehicle"

interface VehicleApprovalModalProps {
  vehicle: PendingVehicle | null
  open: boolean
  onClose: () => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export default function VehicleApprovalModal({
  vehicle,
  open,
  onClose,
  onApprove,
  onReject,
}: VehicleApprovalModalProps) {
  const [reason, setReason] = useState("")
  const [checklist, setChecklist] = useState({
    documentsValid: false,
    vehicleCondition: false,
    priceReasonable: false,
    locationVerified: false,
    ownerVerified: false,
    imagesQuality: false,
  })

  // Mock data mở rộng cho vehicle
  const mockVehicle = vehicle
    ? {
        ...vehicle,
        description:
          "Xe Honda Wave Alpha 2023, tình trạng tốt, bảo dưỡng định kỳ. Phù hợp cho di chuyển trong thành phố.",
        location: "Quận 1, TP.HCM",
        year: "2023",
        brand: "Honda",
        model: "Wave Alpha",
        licensePlate: "59H1-12345",
        engineSize: "110cc",
        fuelType: "Xăng",
        transmission: "Số sàn",
        features: ["Khóa từ", "Cốp xe", "Gương chiếu hậu", "Đèn LED"],
        images: [
          "/placeholder.svg?height=200&width=300",
          "/placeholder.svg?height=200&width=300",
          "/placeholder.svg?height=200&width=300",
          "/placeholder.svg?height=200&width=300",
        ],
        documents: {
          registration: "/placeholder.svg?height=400&width=300",
          insurance: "/placeholder.svg?height=400&width=300",
          inspection: "/placeholder.svg?height=400&width=300",
        },
        ownerInfo: {
          name: "Nguyễn Văn A",
          phone: "0901234567",
          email: "nguyenvana@email.com",
          idCard: "123456789",
          address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
          joinDate: "2023-06-15",
          rating: 4.8,
          totalVehicles: 3,
        },
      }
    : null

  if (!mockVehicle) return null

  const handleChecklistChange = (key: string, checked: boolean) => {
    setChecklist((prev) => ({ ...prev, [key]: checked }))
  }

  const allChecked = Object.values(checklist).every(Boolean)

  const handleSendContract = (contractData: {
    vehicleId: string
    vehicleName: string
    ownerId: string
    ownerName: string
    ownerEmail: string
    commissionRate: number
  }) => {
    alert(`📧 Đã gửi hợp đồng đến ${contractData.ownerEmail}`)
  }

  const handleApprove = () => {
    if (!allChecked) {
      alert("Vui lòng hoàn thành tất cả các bước kiểm tra trước khi duyệt!")
      return
    }

    // Tạo và gửi hợp đồng
    const contractData = {
      vehicleId: mockVehicle.id,
      vehicleName: mockVehicle.name,
      ownerId: mockVehicle.ownerInfo.idCard,
      ownerName: mockVehicle.ownerInfo.name,
      ownerEmail: mockVehicle.ownerInfo.email,
      commissionRate: mockVehicle.ownerInfo.totalVehicles >= 5 ? 8 : 10, // Giảm hoa hồng cho owner có nhiều xe
    }

    // Gửi hợp đồng
    handleSendContract(contractData)

    // Thông báo duyệt thành công
    alert(
      `✅ Xe đã được duyệt!\n📄 Hợp đồng đã được tạo và gửi đến ${mockVehicle.ownerInfo.email}\n💼 Hoa hồng: ${contractData.commissionRate}%`,
    )

    onApprove(mockVehicle.id)
    onClose()
  }

  const handleReject = () => {
    if (!reason.trim()) {
      alert("Vui lòng nhập lý do từ chối!")
      return
    }
    onReject(mockVehicle.id)
    onClose()
    setReason("")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Kiểm duyệt xe: {mockVehicle.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="vehicle-info" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vehicle-info">Thông tin xe</TabsTrigger>
            <TabsTrigger value="images">Hình ảnh</TabsTrigger>
            <TabsTrigger value="documents">Giấy tờ</TabsTrigger>
            <TabsTrigger value="owner">Chủ xe</TabsTrigger>
          </TabsList>

          <TabsContent value="vehicle-info" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Tên xe</label>
                  <p className="text-lg font-semibold">{mockVehicle.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Hãng xe</label>
                  <p>
                    {mockVehicle.brand} {mockVehicle.model}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Năm sản xuất</label>
                  <p>{mockVehicle.year}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Biển số</label>
                  <p className="font-mono">{mockVehicle.licensePlate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Dung tích</label>
                  <p>{mockVehicle.engineSize}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Giá thuê</label>
                  <p className="text-xl font-bold text-green-600">{mockVehicle.price}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Địa điểm</label>
                  <p>{mockVehicle.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Loại nhiên liệu</label>
                  <p>{mockVehicle.fuelType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Hộp số</label>
                  <p>{mockVehicle.transmission}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Trạng thái</label>
                  <Badge variant={mockVehicle.status === "pending" ? "secondary" : "default"}>
                    {mockVehicle.status === "pending" ? "Chờ duyệt" : "Đã duyệt"}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Mô tả</label>
              <p className="mt-1 p-3 bg-gray-50 rounded-lg text-sm">{mockVehicle.description}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Tính năng</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {mockVehicle.features.map((feature, index) => (
                  <Badge key={index} variant="outline">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="images" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Hình ảnh xe ({mockVehicle.images.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mockVehicle.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Xe ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                      <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100">
                        Xem lớn
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Giấy tờ xe</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Đăng ký xe</label>
                  <div className="mt-2 border rounded-lg p-2">
                    <img
                      src={mockVehicle.documents.registration || "/placeholder.svg"}
                      alt="Đăng ký xe"
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Bảo hiểm</label>
                  <div className="mt-2 border rounded-lg p-2">
                    <img
                      src={mockVehicle.documents.insurance || "/placeholder.svg"}
                      alt="Bảo hiểm"
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Kiểm định</label>
                  <div className="mt-2 border rounded-lg p-2">
                    <img
                      src={mockVehicle.documents.inspection || "/placeholder.svg"}
                      alt="Kiểm định"
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="owner" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Thông tin chủ xe</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Họ tên</label>
                    <p className="font-semibold">{mockVehicle.ownerInfo.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Số điện thoại</label>
                    <p>{mockVehicle.ownerInfo.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p>{mockVehicle.ownerInfo.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">CCCD/CMND</label>
                    <p>{mockVehicle.ownerInfo.idCard}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Địa chỉ</label>
                    <p>{mockVehicle.ownerInfo.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ngày tham gia</label>
                    <p>{mockVehicle.ownerInfo.joinDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Đánh giá</label>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{mockVehicle.ownerInfo.rating}</span>
                      <span className="text-gray-500">/ 5.0</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Tổng số xe</label>
                    <p>{mockVehicle.ownerInfo.totalVehicles} xe</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Checklist kiểm tra */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Checklist kiểm tra
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="documentsValid"
                  checked={checklist.documentsValid}
                  onCheckedChange={(checked) => handleChecklistChange("documentsValid", checked as boolean)}
                />
                <label htmlFor="documentsValid" className="text-sm">
                  Giấy tờ xe hợp lệ và rõ ràng
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vehicleCondition"
                  checked={checklist.vehicleCondition}
                  onCheckedChange={(checked) => handleChecklistChange("vehicleCondition", checked as boolean)}
                />
                <label htmlFor="vehicleCondition" className="text-sm">
                  Tình trạng xe tốt qua hình ảnh
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="priceReasonable"
                  checked={checklist.priceReasonable}
                  onCheckedChange={(checked) => handleChecklistChange("priceReasonable", checked as boolean)}
                />
                <label htmlFor="priceReasonable" className="text-sm">
                  Giá thuê hợp lý
                </label>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="locationVerified"
                  checked={checklist.locationVerified}
                  onCheckedChange={(checked) => handleChecklistChange("locationVerified", checked as boolean)}
                />
                <label htmlFor="locationVerified" className="text-sm">
                  Địa điểm hợp lệ
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ownerVerified"
                  checked={checklist.ownerVerified}
                  onCheckedChange={(checked) => handleChecklistChange("ownerVerified", checked as boolean)}
                />
                <label htmlFor="ownerVerified" className="text-sm">
                  Thông tin chủ xe đầy đủ
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="imagesQuality"
                  checked={checklist.imagesQuality}
                  onCheckedChange={(checked) => handleChecklistChange("imagesQuality", checked as boolean)}
                />
                <label htmlFor="imagesQuality" className="text-sm">
                  Chất lượng hình ảnh tốt
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin hợp đồng sẽ tạo */}
        {allChecked && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Thông tin hợp đồng sẽ tạo
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Chủ xe:</strong> {mockVehicle.ownerInfo.name}
                </div>
                <div>
                  <strong>Email:</strong> {mockVehicle.ownerInfo.email}
                </div>
                <div>
                  <strong>Xe:</strong> {mockVehicle.name}
                </div>
                <div>
                  <strong>Hoa hồng:</strong>
                  <span className="text-green-600 font-semibold ml-1">
                    {mockVehicle.ownerInfo.totalVehicles >= 5 ? "8%" : "10%"}
                  </span>
                  {mockVehicle.ownerInfo.totalVehicles >= 5 && (
                    <span className="text-xs text-gray-500 ml-1">(Giảm giá cho owner VIP)</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lý do từ chối */}
        {mockVehicle.status === "pending" && (
          <div>
            <label className="text-sm font-medium text-gray-500">Lý do từ chối (nếu có)</label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nhập lý do từ chối chi tiết..."
              className="mt-1"
              rows={3}
            />
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-500">
            {allChecked ? (
              <span className="text-green-600 flex items-center gap-1">
                <Check className="h-4 w-4" />
                Đã hoàn thành kiểm tra - Sẵn sàng tạo hợp đồng
              </span>
            ) : (
              <span className="text-orange-600">Vui lòng hoàn thành tất cả các bước kiểm tra</span>
            )}
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Đóng
            </Button>
            {mockVehicle.status === "pending" && (
              <>
                <Button variant="destructive" onClick={handleReject}>
                  <X className="h-4 w-4 mr-2" />
                  Từ chối
                </Button>
                <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700" disabled={!allChecked}>
                  <Check className="h-4 w-4 mr-2" />
                  Duyệt & Tạo hợp đồng
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
