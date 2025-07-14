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

      console.log("🔍 Debug pagination data:", {
        filter,
        currentPage,
        pageSize
      });

      const response = await getUsers(filter);
      
      console.log("📊 API Response:", {
        response,
        totalCount: response.totalCount,
        totalPages: response.totalPages,
        currentData: response.data.length,
        page: response.page
      });

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

  // Keyboard shortcuts for pagination
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && usersData) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            if (currentPage > 1) {
              handlePageChange(currentPage - 1);
            }
            break;
          case 'ArrowRight':
            e.preventDefault();
            if (currentPage < usersData.totalPages) {
              handlePageChange(currentPage + 1);
            }
            break;
          case 'Home':
            e.preventDefault();
            handlePageChange(1);
            break;
          case 'End':
            e.preventDefault();
            handlePageChange(usersData.totalPages);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, usersData]);

  const handleBlockUser = async (userId: string) => {
    try {
      await toggleUserStatus(parseInt(userId));
      await loadUsers(); // Reload data
      setBlockModalOpen(false);
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFirstPage = () => handlePageChange(1);
  const handleLastPage = () => handlePageChange(usersData?.totalPages || 1);

  const handleResetFilters = () => {
    setSearchTerm("");
    setRoleFilter("all");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    if (!usersData || usersData.totalPages <= 1) return [];
    
    const totalPages = usersData.totalPages;
    const current = currentPage;
    const delta = 2; // Number of pages to show around current page
    
    let pages: (number | string)[] = [];
    
    // Always show first page
    pages.push(1);
    
    // Calculate range around current page
    const start = Math.max(2, current - delta);
    const end = Math.min(totalPages - 1, current + delta);
    
    // Add ellipsis if there's a gap after 1
    if (start > 2) {
      pages.push('...');
    }
    
    // Add pages around current
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Add ellipsis if there's a gap before last page
    if (end < totalPages - 1) {
      pages.push('...');
    }
    
    // Always show last page (if it's not already included)
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handleExportData = () => {
    if (!usersData?.data?.length) return;
    
    const headers = ['ID', 'Tên', 'Email', 'Vai trò', 'Trạng thái', 'Số xe', 'Số lần thuê', 'Ngày tham gia', 'Địa chỉ'];
    const csvContent = [
      headers.join(','),
      ...usersData.data.map(user => [
        user.id,
        `"${user.name}"`,
        user.email,
        user.role,
        user.status,
        user.vehicleCount,
        user.rentalCount,
        format(new Date(user.joinDate), 'dd/MM/yyyy'),
        `"${user.address || ''}"`
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `users_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <div className="flex space-x-2">
            <Button onClick={() => setCreateStaffModalOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              {t("admin.users.createStaff")}
            </Button>
            <Button variant="outline" onClick={handleExportData} disabled={!usersData?.data?.length}>
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              Xuất Excel
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={t("admin.users.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả vai trò</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="staff">Nhân viên</SelectItem>
              <SelectItem value="owner">Chủ xe</SelectItem>
              <SelectItem value="renter">Người thuê</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="blocked">Bị khóa</SelectItem>
            </SelectContent>
          </Select>

          <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(parseInt(value))}>
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>

          {(searchTerm || roleFilter !== 'all' || statusFilter !== 'all') && (
            <Button variant="outline" onClick={handleResetFilters}>
              Xóa bộ lọc
            </Button>
          )}
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
              <span className="text-xs text-gray-500">
                (Trang hiện tại: {usersData.data.length} items)
              </span>
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
                  Lần thuê
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  Ngày tham gia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  Địa chỉ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium">
                  Thao tác
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
                    <td className="px-6 py-4">{user.vehicleCount}</td>
                    <td className="px-6 py-4">{user.rentalCount}</td>
                    <td className="px-6 py-4">
                      {format(new Date(user.joinDate), "dd/MM/yyyy")}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 max-w-[200px] truncate block">
                        {user.address || "Chưa cập nhật"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setBlockModalOpen(true);
                        }}
                        className="flex items-center"
                      >
                        {user.status === "active" ? (
                          <>
                            <Lock className="h-4 w-4 mr-1" />
                            Khóa
                          </>
                        ) : (
                          <>
                            <Unlock className="h-4 w-4 mr-1" />
                            Mở khóa
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {usersData && (
        <div className="flex items-center justify-between px-6 py-3 bg-white border-t rounded-b-lg">
          {/* Debug info */}
          <div className="text-xs text-gray-400 mb-2">
            Debug: totalPages={usersData.totalPages}, totalCount={usersData.totalCount}, currentData={usersData.data.length}
          </div>
          
          {usersData.totalPages <= 1 ? (
            <div className="w-full text-center text-sm text-gray-500 py-2">
              Chỉ có 1 trang dữ liệu ({usersData.totalCount} items)
            </div>
          ) : (
            <>
              <div className="flex-1 flex justify-between sm:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                >
                  Trước
                </Button>
                <span className="text-sm text-gray-700">
                  Trang {currentPage} / {usersData.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === usersData.totalPages || loading}
                >
                  Sau
                </Button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Hiển thị{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * pageSize + 1}
                    </span>{" "}
                    đến{" "}
                    <span className="font-medium">
                      {Math.min(currentPage * pageSize, usersData.totalCount)}
                    </span>{" "}
                    trong tổng số{" "}
                    <span className="font-medium">{usersData.totalCount}</span> kết quả
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    {/* First page button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleFirstPage}
                      disabled={currentPage === 1 || loading}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md"
                      title="Trang đầu"
                    >
                      <span className="text-xs">«</span>
                    </Button>
                    
                    {/* Previous page button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || loading}
                      className="relative inline-flex items-center px-2 py-2"
                      title="Trang trước"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    {/* Page numbers */}
                    {getPageNumbers().map((pageNumber, index) => {
                      if (pageNumber === '...') {
                        return (
                          <span
                            key={`ellipsis-${index}`}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                          >
                            ...
                          </span>
                        );
                      }
                      
                      return (
                        <Button
                          key={pageNumber}
                          variant={pageNumber === currentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(pageNumber as number)}
                          disabled={loading}
                          className="relative inline-flex items-center px-4 py-2"
                        >
                          {pageNumber}
                        </Button>
                      );
                    })}
                    
                    {/* Next page button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === usersData.totalPages || loading}
                      className="relative inline-flex items-center px-2 py-2"
                      title="Trang sau"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    
                    {/* Last page button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLastPage}
                      disabled={currentPage === usersData.totalPages || loading}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md"
                      title="Trang cuối"
                    >
                      <span className="text-xs">»</span>
                    </Button>
                  </nav>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Quick navigation for large datasets */}
      {usersData && usersData.totalPages > 10 && (
        <div className="flex items-center justify-center mt-4 space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Đi đến trang:</span>
            <Input
              type="number"
              min="1"
              max={usersData.totalPages}
              placeholder="Số trang"
              className="w-20 h-8 text-center"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const page = parseInt((e.target as HTMLInputElement).value);
                  if (page >= 1 && page <= usersData.totalPages) {
                    handlePageChange(page);
                    (e.target as HTMLInputElement).value = '';
                  }
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Keyboard shortcuts help */}
      {usersData && usersData.totalPages > 1 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <details className="text-sm text-gray-600">
            <summary className="cursor-pointer hover:text-gray-800 font-medium">
              💡 Phím tắt điều hướng
            </summary>
            <div className="mt-2 space-y-1">
              <div><code className="bg-gray-200 px-1 rounded">Ctrl + ←</code> Trang trước</div>
              <div><code className="bg-gray-200 px-1 rounded">Ctrl + →</code> Trang sau</div>
              <div><code className="bg-gray-200 px-1 rounded">Ctrl + Home</code> Trang đầu</div>
              <div><code className="bg-gray-200 px-1 rounded">Ctrl + End</code> Trang cuối</div>
            </div>
          </details>
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
