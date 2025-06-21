import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import VehicleApprovalModal from "@/components/admin/vehicle-approval-modal"
import { Eye, Check, X, Clock, FileText } from "lucide-react"
import { PendingVehicle } from "@/types/vehicle"

export default function PendingVehicleTable() {
  const { t } = useApp()
  const [selectedVehicle, setSelectedVehicle] = useState<PendingVehicle | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [vehicles, setVehicles] = useState<PendingVehicle[]>([
    {
      id: "1",
      name: "Honda Wave Alpha",
      owner: "Nguyễn Văn A",
      submittedDate: "2024-03-15",
      status: "pending",
      image: "/vehicles/wave-alpha.jpg",
      type: "Xe số",
      price: "1.500.000đ/ngày",
      documentsCount: 3,
      imagesCount: 5,
      completeness: 85,
      description: "Xe số Honda Wave Alpha đời mới, máy êm, tiết kiệm xăng",
      location: "Quận 1, TP.HCM",
      year: "2023",
      brand: "Honda",
      model: "Wave Alpha",
      licensePlate: "51G-12345",
      engineSize: "110cc",
      fuelType: "Xăng",
      transmission: "Số sàn",
      features: ["Khóa thông minh", "Đèn LED", "Phanh đĩa"],
      images: ["/vehicles/wave-alpha-1.jpg", "/vehicles/wave-alpha-2.jpg"],
      documents: {
        registration: "/documents/registration-1.pdf",
        insurance: "/documents/insurance-1.pdf",
        inspection: "/documents/inspection-1.pdf"
      },
      ownerInfo: {
        name: "Nguyễn Văn A",
        phone: "0123456789",
        email: "nguyenvana@example.com",
        idCard: "123456789",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        joinDate: "2023-01-01",
        rating: 4.5,
        totalVehicles: 2
      }
    },
    {
      id: "2",
      name: "Yamaha Exciter 155",
      owner: "Trần Thị B",
      submittedDate: "2024-03-14",
      status: "pending",
      image: "/vehicles/exciter-155.jpg",
      type: "Xe côn tay",
      price: "2.000.000đ/ngày",
      documentsCount: 2,
      imagesCount: 4,
      completeness: 75,
      description: "Yamaha Exciter 155 đời mới, động cơ mạnh mẽ",
      location: "Quận 2, TP.HCM",
      year: "2023",
      brand: "Yamaha",
      model: "Exciter 155",
      licensePlate: "51G-67890",
      engineSize: "155cc",
      fuelType: "Xăng",
      transmission: "Số sàn",
      features: ["Đèn LED", "Phanh ABS", "Đồng hồ điện tử"],
      images: ["/vehicles/exciter-1.jpg", "/vehicles/exciter-2.jpg"],
      documents: {
        registration: "/documents/registration-2.pdf",
        insurance: "/documents/insurance-2.pdf",
        inspection: "/documents/inspection-2.pdf"
      },
      ownerInfo: {
        name: "Trần Thị B",
        phone: "0987654321",
        email: "tranthib@example.com",
        idCard: "987654321",
        address: "456 Đường XYZ, Quận 2, TP.HCM",
        joinDate: "2023-02-01",
        rating: 4.8,
        totalVehicles: 1
      }
    },
    {
      id: "3",
      name: "Honda Vision",
      owner: "Lê Văn C",
      submittedDate: "2024-03-13",
      status: "pending",
      image: "/vehicles/vision.jpg",
      type: "Xe tay ga",
      price: "1.800.000đ/ngày",
      documentsCount: 3,
      imagesCount: 6,
      completeness: 90,
      description: "Honda Vision đời mới, tiết kiệm xăng, dễ điều khiển",
      location: "Quận 3, TP.HCM",
      year: "2023",
      brand: "Honda",
      model: "Vision",
      licensePlate: "51G-13579",
      engineSize: "125cc",
      fuelType: "Xăng",
      transmission: "Tự động",
      features: ["Khóa thông minh", "Đèn LED", "Cốp rộng"],
      images: ["/vehicles/vision-1.jpg", "/vehicles/vision-2.jpg"],
      documents: {
        registration: "/documents/registration-3.pdf",
        insurance: "/documents/insurance-3.pdf",
        inspection: "/documents/inspection-3.pdf"
      },
      ownerInfo: {
        name: "Lê Văn C",
        phone: "0123456789",
        email: "levanc@example.com",
        idCard: "135792468",
        address: "789 Đường DEF, Quận 3, TP.HCM",
        joinDate: "2023-03-01",
        rating: 4.2,
        totalVehicles: 3
      }
    },
    {
      id: "4",
      name: "Piaggio Liberty",
      owner: "Phạm Thị D",
      submittedDate: "2024-03-12",
      status: "approved",
      image: "/vehicles/liberty.jpg",
      type: "Xe tay ga",
      price: "2.200.000đ/ngày",
      documentsCount: 3,
      imagesCount: 5,
      completeness: 95,
      description: "Piaggio Liberty đời mới, thiết kế sang trọng",
      location: "Quận 4, TP.HCM",
      year: "2023",
      brand: "Piaggio",
      model: "Liberty",
      licensePlate: "51G-24680",
      engineSize: "150cc",
      fuelType: "Xăng",
      transmission: "Tự động",
      features: ["Khóa thông minh", "Đèn LED", "Cốp rộng"],
      images: ["/vehicles/liberty-1.jpg", "/vehicles/liberty-2.jpg"],
      documents: {
        registration: "/documents/registration-4.pdf",
        insurance: "/documents/insurance-4.pdf",
        inspection: "/documents/inspection-4.pdf"
      },
      ownerInfo: {
        name: "Phạm Thị D",
        phone: "0987654321",
        email: "phamthid@example.com",
        idCard: "246813579",
        address: "321 Đường GHI, Quận 4, TP.HCM",
        joinDate: "2023-04-01",
        rating: 4.7,
        totalVehicles: 2
      }
    }
  ])

  const handleApprove = (vehicleId: string) => {
    setVehicles((prev) => prev.map((v) => (v.id === vehicleId ? { ...v, status: "approved" as const } : v)))
  }

  const handleReject = (vehicleId: string) => {
    setVehicles((prev) => prev.map((v) => (v.id === vehicleId ? { ...v, status: "rejected" as const } : v)))
  }

  const openModal = (vehicle: PendingVehicle) => {
    setSelectedVehicle(vehicle)
    setModalOpen(true)
  }

  const getCompletenessColor = (completeness: number) => {
    if (completeness >= 90) return "text-green-600"
    if (completeness >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const pendingCount = vehicles.filter((v) => v.status === "pending").length

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t("admin.pendingVehicles.title")}</h1>
            <p className="text-gray-600">{t("admin.pendingVehicles.subtitle")}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              <Clock className="h-4 w-4 inline mr-1" />
              {t(`admin.pendingVehicles.pendingCount.${pendingCount}`)}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("admin.pendingVehicles.table.vehicle")}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.pendingVehicles.table.owner")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.pendingVehicles.table.submitDate")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.pendingVehicles.table.documents")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.pendingVehicles.table.completeness")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.pendingVehicles.table.status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.pendingVehicles.table.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-12 w-16 rounded-lg object-cover"
                        src={vehicle.image || "/placeholder.svg"}
                        alt={vehicle.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{vehicle.name}</div>
                        <div className="text-sm text-gray-500">
                          {vehicle.type} • {vehicle.price}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.submittedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span>{vehicle.documentsCount}/3 giấy tờ</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{vehicle.imagesCount} hình ảnh</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${
                            vehicle.completeness >= 90
                              ? "bg-green-500"
                              : vehicle.completeness >= 70
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${vehicle.completeness}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${getCompletenessColor(vehicle.completeness)}`}>
                        {vehicle.completeness}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={
                        vehicle.status === "approved"
                          ? "default"
                          : vehicle.status === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {vehicle.status === "pending" && "Chờ duyệt"}
                      {vehicle.status === "approved" && "Đã duyệt"}
                      {vehicle.status === "rejected" && "Từ chối"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openModal(vehicle)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Kiểm tra
                    </Button>
                    {vehicle.status === "pending" && (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleApprove(vehicle.id)}
                          className="bg-green-600 hover:bg-green-700"
                          disabled={vehicle.completeness < 80}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Duyệt
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleReject(vehicle.id)}>
                          <X className="h-4 w-4 mr-1" />
                          Từ chối
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <VehicleApprovalModal
        vehicle={selectedVehicle}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  )
}
