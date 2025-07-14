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
import { Search, UserPlus, Lock, Unlock, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import {
  getUsers,
  toggleUserStatus,
  UserAdminDto,
  UserFilter,
  PaginatedResponse,
} from "../api/dashboardService";

export default function UserManagementTable() {
  const { t } = useApp();
  const [usersData, setUsersData] = useState<PaginatedResponse<UserAdminDto> | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedUser, setSelectedUser] = useState<UserAdminDto | null>(null);
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [createStaffModalOpen, setCreateStaffModalOpen] = useState(false);

  // Load users with current filters
  const loadUsers = async () => {
    try {
      setLoading(true);
      
      const filter: UserFilter = {
        search: searchTerm.trim() || undefined,
        role: roleFilter !== 'all' ? roleFilter : undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        page: currentPage,
        pageSize: pageSize
      };

      const response = await getUsers(filter);
      
      // // Debug log
      // console.log('Users data received:', response);
      // console.log('Total count:', response.totalCount);
      // console.log('Data length:', response.data.length);
      // console.log('First user role:', response.data[0]?.role);
      // console.log('Unique roles:', [...new Set(response.data.map(u => u.role))]);
      
      setUsersData(response);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when search changes
      loadUsers();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, roleFilter, statusFilter, pageSize]);

  // Load users when page changes
  useEffect(() => {
    loadUsers();
  }, [currentPage]);

  const handleBlockUser = async (userId: string) => {
    try {
      await toggleUserStatus(parseInt(userId));
      await loadUsers(); // Reload data
      setBlockModalOpen(false);
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const handleUnblockUser = async (userId: number) => {
    try {
      await toggleUserStatus(userId);
      await loadUsers(); // Reload data
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(parseInt(value))}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border">
        {/* Table header with summary */}
        {usersData && (
          <div className="px-6 py-3 border-b bg-gray-50 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-900">
                Tổng cộng: {usersData.totalCount} người dùng
              </span>
              {(searchTerm || roleFilter !== 'all' || statusFilter !== 'all') && (
                <span className="text-sm text-gray-600">
                  (hiển thị {usersData.data.length} / {usersData.totalCount} kết quả)
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              {loading && (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span>Đang tải...</span>
                </div>
              )}
              <span>Trang {currentPage} / {usersData.totalPages}</span>
            </div>
          </div>
        )}
        
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
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span>Đang tải...</span>
                    </div>
                  </td>
                </tr>
              ) : usersData?.data?.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    Không tìm thấy người dùng nào
                  </td>
                </tr>
              ) : (
                usersData?.data?.map((user) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {usersData && usersData.totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-3 bg-white border rounded-lg mt-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-700">
              Hiển thị {(currentPage - 1) * pageSize + 1} đến{" "}
              {Math.min(currentPage * pageSize, usersData.totalCount)} trong tổng số{" "}
              {usersData.totalCount} người dùng
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
            >
              <ChevronLeft className="h-4 w-4" />
              Trước
            </Button>
            
            <span className="text-sm text-gray-600">
              Trang {currentPage} / {usersData.totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === usersData.totalPages || loading}
            >
              Sau
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

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
