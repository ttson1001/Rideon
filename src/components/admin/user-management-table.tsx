import { useState, useEffect } from "react";
import { useApp } from "@/contexts/app-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BlockUserModal from "@/components/admin/block-user-modal";
import CreateStaffModal from "@/components/admin/create-staff-modal";
import { Search, UserPlus, Lock, Unlock } from "lucide-react";
import { format } from "date-fns";
import {
  getUsers,
  toggleUserStatus,
  UserAdminDto,
} from "../api/dashboardService";

export default function UserManagementTable() {
  const { t } = useApp();
  const [users, setUsers] = useState<UserAdminDto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<UserAdminDto | null>(null);
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [createStaffModalOpen, setCreateStaffModalOpen] = useState(false);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleBlockUser = async (userId: string) => {
    const id = parseInt(userId);
    await toggleUserStatus(id);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "blocked" } : u))
    );
  };

  const handleUnblockUser = async (userId: number) => {
    await toggleUserStatus(userId);
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: "active" } : u))
    );
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: "destructive",
      staff: "default",
      owner: "secondary",
      renter: "outline",
    } as const;

    const labels = {
      admin: "Admin",
      staff: "Nhân viên",
      owner: "Chủ xe",
      renter: "Người thuê",
    } as const;

    if (!(role in variants)) return null;

    return (
      <Badge variant={variants[role as keyof typeof variants]}>
        {labels[role as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="p-6">
      {/* Header + Filters */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">{t("admin.users.title")}</h1>
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
              placeholder={"Nhập vào ô này để tìm kiếm"}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="staff">Nhân viên</SelectItem>
              <SelectItem value="owner">Chủ xe</SelectItem>
              <SelectItem value="renter">Người thuê</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="blocked">Bị khóa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  Người dùng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  Vai trò
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  Số xe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  Lượt thuê
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  Ngày tham gia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  Địa chỉ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-gray-500 text-sm">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        user.status === "active" ? "default" : "destructive"
                      }
                    >
                      {user.status === "active" ? "Hoạt động" : "Bị khóa"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    {user.role === "owner" ? user.vehicleCount : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {user.role === "owner" ? user.rentalCount : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {format(new Date(user.joinDate), "dd/MM/yyyy")}
                  </td>
                  <td className="px-6 py-4">{user?.address}</td>
                  <td className="px-6 py-4 space-x-2">
                    {user.status === "active" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setBlockModalOpen(true);
                        }}
                      >
                        <Lock className="h-4 w-4 mr-1" />
                        Khóa
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUnblockUser(user.id)}
                      >
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

      {/* Modals */}
      <BlockUserModal
        user={
          selectedUser
            ? { ...selectedUser, id: selectedUser.id.toString() }
            : null
        }
        open={blockModalOpen}
        onClose={() => setBlockModalOpen(false)}
        onBlock={handleBlockUser}
      />

      <CreateStaffModal
        open={createStaffModalOpen}
        onClose={() => setCreateStaffModalOpen(false)}
        onCreateStaff={(staffData) => console.log("Tạo nhân viên:", staffData)}
      />
    </div>
  );
}
