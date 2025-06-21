import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BlockUserModal from "@/components/admin/block-user-modal"
import CreateStaffModal from "@/components/admin/create-staff-modal"
import { Search, UserPlus, Lock, Unlock } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "renter" | "owner" | "staff" | "admin"
  status: "active" | "blocked"
  joinDate: string
  lastActive: string
  totalVehicles?: number // Số xe đang đăng (chỉ cho owner)
  totalRentals?: number // Tổng lượt thuê (chỉ cho owner)
}

export default function UserManagementTable() {
  const { t } = useApp()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [blockModalOpen, setBlockModalOpen] = useState(false)
  const [createStaffModalOpen, setCreateStaffModalOpen] = useState(false)

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      role: "renter",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2 giờ trước",
    },
    {
      id: "2",
      name: "Trần Thị B",
      email: "tranthib@email.com",
      role: "owner",
      status: "active",
      joinDate: "2024-01-10",
      lastActive: "1 ngày trước",
      totalVehicles: 5,
      totalRentals: 32,
    },
    {
      id: "3",
      name: "Lê Văn C",
      email: "levanc@email.com",
      role: "staff",
      status: "active",
      joinDate: "2024-01-05",
      lastActive: "30 phút trước",
    },
    {
      id: "4",
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      role: "owner",
      status: "active",
      joinDate: "2024-01-01",
      lastActive: "1 tuần trước",
      totalVehicles: 3,
      totalRentals: 18,
    },
    {
      id: "5",
      name: "Hoàng Văn E",
      email: "hoangvane@email.com",
      role: "owner",
      status: "blocked",
      joinDate: "2023-12-20",
      lastActive: "2 tuần trước",
      totalVehicles: 8,
      totalRentals: 45,
    },
  ])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleBlockUser = (userId: string, reason: string) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status: "blocked" as const } : u)))
  }

  const handleUnblockUser = (userId: string) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status: "active" as const } : u)))
  }

  const openBlockModal = (user: User) => {
    setSelectedUser(user)
    setBlockModalOpen(true)
  }

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: "destructive",
      staff: "default",
      owner: "secondary",
      renter: "outline",
    }

    const labels = {
      admin: "Admin",
      staff: "Nhân viên",
      owner: "Chủ xe",
      renter: "Người thuê",
    }

    return <Badge variant={variants[role as keyof typeof variants] as any}>{labels[role as keyof typeof labels]}</Badge>
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t("admin.users.title")}</h1>
            <p className="text-gray-600">{t("admin.users.subtitle")}</p>
          </div>
          <Button onClick={() => setCreateStaffModalOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            {t("admin.users.createStaff")}
          </Button>
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={t("admin.users.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder={t("admin.users.role")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("admin.users.allRoles")}</SelectItem>
              <SelectItem value="admin">{t("admin.users.roles.admin")}</SelectItem>
              <SelectItem value="staff">{t("admin.users.roles.staff")}</SelectItem>
              <SelectItem value="owner">{t("admin.users.roles.owner")}</SelectItem>
              <SelectItem value="renter">{t("admin.users.roles.renter")}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder={t("admin.users.status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("admin.users.allStatus")}</SelectItem>
              <SelectItem value="active">{t("admin.users.statuses.active")}</SelectItem>
              <SelectItem value="blocked">{t("admin.users.statuses.blocked")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.users.table.user")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.users.table.role")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.users.table.status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.users.table.vehicles")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.users.table.rentals")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.users.table.joinDate")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.users.table.lastActive")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.users.table.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={user.status === "active" ? "default" : "destructive"}>
                      {user.status === "active" ? "Hoạt động" : "Bị khóa"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.role === "owner" ? (
                      <div className="flex items-center">
                        <span className="font-semibold text-blue-600">{user.totalVehicles || 0}</span>
                        <span className="ml-1 text-gray-500">xe</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.role === "owner" ? (
                      <div className="flex items-center">
                        <span className="font-semibold text-green-600">{user.totalRentals || 0}</span>
                        <span className="ml-1 text-gray-500">lượt</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastActive}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {user.status === "active" ? (
                      <Button variant="outline" size="sm" onClick={() => openBlockModal(user)}>
                        <Lock className="h-4 w-4 mr-1" />
                        Khóa
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleUnblockUser(user.id)}>
                        <Unlock className="h-4 w-4 mr-1" />
                        Mở khóa
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <BlockUserModal
        user={selectedUser}
        open={blockModalOpen}
        onClose={() => setBlockModalOpen(false)}
        onBlock={handleBlockUser}
      />

      <CreateStaffModal
        open={createStaffModalOpen}
        onClose={() => setCreateStaffModalOpen(false)}
        onCreateStaff={(staffData) => {
          // Handle staff creation
          console.log("Creating staff:", staffData)
        }}
      />
    </div>
  )
}
