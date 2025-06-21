
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { FileText, Send, CheckCircle, AlertCircle, Download, Eye, Edit, Search } from "lucide-react"

interface Contract {
  id: string
  vehicleId: string
  vehicleName: string
  ownerId: string
  ownerName: string
  ownerEmail: string
  contractType: "platform_agreement" | "vehicle_listing"
  status: "draft" | "sent" | "signed" | "expired" | "rejected"
  createdDate: string
  sentDate?: string
  signedDate?: string
  expiryDate: string
  commissionRate: number
  terms: {
    platformFee: number
    insuranceRequired: boolean
    maintenanceResponsibility: string
    disputeResolution: string
  }
}

const mockContracts: Contract[] = [
  {
    id: "contract_001",
    vehicleId: "vehicle_123",
    vehicleName: "Honda Air Blade 150",
    ownerId: "owner_456",
    ownerName: "Nguyễn Văn A",
    ownerEmail: "nguyenvana@email.com",
    contractType: "vehicle_listing",
    status: "sent",
    createdDate: "2024-01-15",
    sentDate: "2024-01-15",
    expiryDate: "2024-02-15",
    commissionRate: 10,
    terms: {
      platformFee: 10,
      insuranceRequired: true,
      maintenanceResponsibility: "owner",
      disputeResolution: "platform_mediation",
    },
  },
  {
    id: "contract_002",
    vehicleId: "vehicle_124",
    vehicleName: "Yamaha Exciter 155",
    ownerId: "owner_457",
    ownerName: "Trần Thị B",
    ownerEmail: "tranthib@email.com",
    contractType: "vehicle_listing",
    status: "signed",
    createdDate: "2024-01-10",
    sentDate: "2024-01-10",
    signedDate: "2024-01-12",
    expiryDate: "2024-02-10",
    commissionRate: 8,
    terms: {
      platformFee: 8,
      insuranceRequired: true,
      maintenanceResponsibility: "owner",
      disputeResolution: "platform_mediation",
    },
  },
  {
    id: "contract_003",
    vehicleId: "vehicle_125",
    vehicleName: "Honda Winner X",
    ownerId: "owner_458",
    ownerName: "Lê Văn C",
    ownerEmail: "levanc@email.com",
    contractType: "vehicle_listing",
    status: "draft",
    createdDate: "2024-01-20",
    expiryDate: "2024-02-20",
    commissionRate: 10,
    terms: {
      platformFee: 10,
      insuranceRequired: true,
      maintenanceResponsibility: "owner",
      disputeResolution: "platform_mediation",
    },
  },
]

export default function ContractManagement() {
  const [contracts, setContracts] = useState<Contract[]>(mockContracts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)

  const getStatusBadge = (status: Contract["status"]) => {
    const statusConfig = {
      draft: { color: "bg-gray-500", text: "Bản nháp", icon: Edit },
      sent: { color: "bg-blue-500", text: "Đã gửi", icon: Send },
      signed: { color: "bg-green-500", text: "Đã ký", icon: CheckCircle },
      expired: { color: "bg-red-500", text: "Hết hạn", icon: AlertCircle },
      rejected: { color: "bg-orange-500", text: "Từ chối", icon: AlertCircle },
    }

    const config = statusConfig[status]
    const Icon = config.icon

    return (
      <Badge className={`${config.color} text-white flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    )
  }

  const handleSendContract = (contractId: string) => {
    setContracts((prev) =>
      prev.map((contract) =>
        contract.id === contractId
          ? { ...contract, status: "sent" as const, sentDate: new Date().toISOString().split("T")[0] }
          : contract,
      ),
    )
    alert(`Đã gửi hợp đồng ${contractId} đến chủ xe!`)
  }

  const handleGenerateContract = (vehicleId: string, ownerId: string) => {
    const newContract: Contract = {
      id: `contract_${Date.now()}`,
      vehicleId,
      vehicleName: "Xe mới",
      ownerId,
      ownerName: "Chủ xe mới",
      ownerEmail: "owner@email.com",
      contractType: "vehicle_listing",
      status: "draft",
      createdDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      commissionRate: 10,
      terms: {
        platformFee: 10,
        insuranceRequired: true,
        maintenanceResponsibility: "owner",
        disputeResolution: "platform_mediation",
      },
    }

    setContracts((prev) => [newContract, ...prev])
    alert("Đã tạo hợp đồng mới!")
  }

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.vehicleName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || contract.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: contracts.length,
    draft: contracts.filter((c) => c.status === "draft").length,
    sent: contracts.filter((c) => c.status === "sent").length,
    signed: contracts.filter((c) => c.status === "signed").length,
    expired: contracts.filter((c) => c.status === "expired").length,
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý hợp đồng</h1>
          <p className="text-gray-600">Quản lý hợp đồng giữa platform và chủ xe</p>
        </div>
        <Button
          onClick={() => handleGenerateContract("new_vehicle", "new_owner")}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <FileText className="h-4 w-4 mr-2" />
          Tạo hợp đồng mới
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Tổng hợp đồng</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{stats.draft}</div>
            <div className="text-sm text-gray-600">Bản nháp</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.sent}</div>
            <div className="text-sm text-gray-600">Đã gửi</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.signed}</div>
            <div className="text-sm text-gray-600">Đã ký</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
            <div className="text-sm text-gray-600">Hết hạn</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm theo tên chủ xe hoặc xe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-md px-3 py-2 bg-white"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="draft">Bản nháp</option>
          <option value="sent">Đã gửi</option>
          <option value="signed">Đã ký</option>
          <option value="expired">Hết hạn</option>
          <option value="rejected">Từ chối</option>
        </select>
      </div>

      {/* Contracts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách hợp đồng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Mã HĐ</th>
                  <th className="text-left p-3 font-medium">Xe</th>
                  <th className="text-left p-3 font-medium">Chủ xe</th>
                  <th className="text-left p-3 font-medium">Hoa hồng</th>
                  <th className="text-left p-3 font-medium">Trạng thái</th>
                  <th className="text-left p-3 font-medium">Ngày tạo</th>
                  <th className="text-left p-3 font-medium">Hết hạn</th>
                  <th className="text-left p-3 font-medium">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredContracts.map((contract) => (
                  <tr key={contract.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-mono text-sm">{contract.id}</td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{contract.vehicleName}</div>
                        <div className="text-sm text-gray-500">{contract.vehicleId}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{contract.ownerName}</div>
                        <div className="text-sm text-gray-500">{contract.ownerEmail}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-green-600">{contract.commissionRate}%</span>
                    </td>
                    <td className="p-3">{getStatusBadge(contract.status)}</td>
                    <td className="p-3 text-sm">{contract.createdDate}</td>
                    <td className="p-3 text-sm">{contract.expiryDate}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedContract(contract)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {contract.status === "draft" && (
                          <Button
                            size="sm"
                            onClick={() => handleSendContract(contract.id)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Contract Detail Modal */}
      {selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Chi tiết hợp đồng {selectedContract.id}</h2>
              <Button variant="outline" onClick={() => setSelectedContract(null)}>
                Đóng
              </Button>
            </div>

            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Thông tin</TabsTrigger>
                <TabsTrigger value="terms">Điều khoản</TabsTrigger>
                <TabsTrigger value="preview">Xem trước</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Xe</label>
                      <p className="font-semibold">{selectedContract.vehicleName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Chủ xe</label>
                      <p className="font-semibold">{selectedContract.ownerName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p>{selectedContract.ownerEmail}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Hoa hồng</label>
                      <p className="text-green-600 font-semibold">{selectedContract.commissionRate}%</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Trạng thái</label>
                      <div className="mt-1">{getStatusBadge(selectedContract.status)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Ngày tạo</label>
                      <p>{selectedContract.createdDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Ngày gửi</label>
                      <p>{selectedContract.sentDate || "Chưa gửi"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Hết hạn</label>
                      <p>{selectedContract.expiryDate}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="terms" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phí platform</label>
                      <p className="font-semibold">{selectedContract.terms.platformFee}%</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Bảo hiểm bắt buộc</label>
                      <p>{selectedContract.terms.insuranceRequired ? "Có" : "Không"}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Trách nhiệm bảo trì</label>
                      <p>{selectedContract.terms.maintenanceResponsibility === "owner" ? "Chủ xe" : "Platform"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Giải quyết tranh chấp</label>
                      <p>
                        {selectedContract.terms.disputeResolution === "platform_mediation"
                          ? "Hòa giải qua platform"
                          : "Tòa án"}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="space-y-4">
                <div className="border rounded-lg p-6 bg-gray-50">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold">HỢP ĐỒNG CHO THUÊ XE MÁY</h3>
                    <p className="text-gray-600">Giữa Platform và Chủ xe</p>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <strong>Bên A (Platform):</strong> Công ty TNHH Cho thuê xe máy
                    </div>
                    <div>
                      <strong>Bên B (Chủ xe):</strong> {selectedContract.ownerName}
                    </div>
                    <div>
                      <strong>Xe:</strong> {selectedContract.vehicleName}
                    </div>
                    <div>
                      <strong>Điều khoản chính:</strong>
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li>Hoa hồng platform: {selectedContract.commissionRate}%</li>
                        <li>Bảo hiểm: {selectedContract.terms.insuranceRequired ? "Bắt buộc" : "Không bắt buộc"}</li>
                        <li>
                          Bảo trì: Trách nhiệm của{" "}
                          {selectedContract.terms.maintenanceResponsibility === "owner" ? "chủ xe" : "platform"}
                        </li>
                        <li>
                          Tranh chấp:{" "}
                          {selectedContract.terms.disputeResolution === "platform_mediation"
                            ? "Hòa giải qua platform"
                            : "Tòa án"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-3 mt-6">
              {selectedContract.status === "draft" && (
                <Button
                  onClick={() => handleSendContract(selectedContract.id)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Gửi hợp đồng
                </Button>
              )}
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Tải xuống PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
