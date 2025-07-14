import axios from "axios";

export const API_BASE_URL = "https://api.rideonvn.online/api";
export const BASE_URL = "https://api.rideonvn.online/";

export const getOwnerDashboard = async (ownerId: number) => {
  const response = await axios.get(
    `${API_BASE_URL}/vehicles/dashboard/owner/${ownerId}`
  );
  return response.data.data;
};

export const getVehiclesByOwner = async (ownerId: number) => {
  const response = await axios.get(`${API_BASE_URL}/vehicles/owner/${ownerId}`);
  return response.data.data;
};

export const getBookingsByOwner = async (ownerId: number, status?: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/bookings/owner/${ownerId}`,
    {
      params: status ? { status } : {},
    }
  );
  return response.data.data;
};

export const getBookingsByRenter = async (
  renterId: number,
  status?: string
) => {
  const response = await axios.get(
    `${API_BASE_URL}/bookings/renter/${renterId}`,
    {
      params: status ? { status } : {},
    }
  );
  return response.data.data;
};

export const getAllVehicles = async () => {
  const response = await axios.get(`${API_BASE_URL}/vehicles`);
  return response.data.data;
};

export const getVehicleDetail = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/vehicles/${id}`);
  return response.data.data;
};

export interface BookingCreateDto {
  vehicleId: number;
  renterId: number;
  startDate: string; // ISO string: "2025-06-01T00:00:00"
  endDate: string; // ISO string: "2025-06-04T00:00:00"
  pickupTime: string; // e.g. "09:00:00"
  returnTime: string; // e.g. "18:00:00"
  serviceFee: number;
  insuranceFee: number;
}

export const postBooking = async (dto: BookingCreateDto) => {
  const response = await axios.post(`${API_BASE_URL}/bookings`, dto);
  return response.data;
};

export const getUserById = async (id: string | number) => {
  const res = await axios.get(`${API_BASE_URL}/User/${id}`);
  return res.data.data;
};

export interface UserUpdateDto {
  name: string;
  avatarUrl: string;
  phone: string;
}
export const updateUser = async (id: number, dto: UserUpdateDto) => {
  const response = await axios.put(`${API_BASE_URL}/user/${id}`, dto);
  return response.data;
};

export interface UserAdminDto {
  id: number;
  email: string;
  name: string;
  role: "renter" | "owner" | "staff" | "admin";
  status: "active" | "blocked";
  vehicleCount: number;
  rentalCount: number;
  joinDate: string;  // Will map to JoinDate in C#
  address: string;   // Will map to Address in C#
  lastActive?: string | null;
}

export interface UserFilter {
  search?: string;
  role?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const getUsers = async (filter?: UserFilter): Promise<PaginatedResponse<UserAdminDto>> => {
  try {
    // Try OData first
    const params = new URLSearchParams();
    
    // OData query parameters
    if (filter?.page && filter?.pageSize) {
      const skip = (filter.page - 1) * filter.pageSize;
      params.append('$skip', skip.toString());
      params.append('$top', filter.pageSize.toString());
    }
    
    // Filter conditions
    const filterConditions: string[] = [];
    
    if (filter?.search) {
      filterConditions.push(`(contains(tolower(Name), '${filter.search.toLowerCase()}') or contains(tolower(Email), '${filter.search.toLowerCase()}'))`);
    }
    
    if (filter?.role && filter.role !== 'all') {
      filterConditions.push(`Role eq '${filter.role}'`);
    }
    
    if (filter?.status && filter.status !== 'all') {
      filterConditions.push(`Status eq '${filter.status}'`);
    }
    
    if (filterConditions.length > 0) {
      params.append('$filter', filterConditions.join(' and '));
    }
    
    params.append('$count', 'true');
    params.append('$orderby', 'JoinDate desc');
    
    const response = await axios.get(`${API_BASE_URL}/admin/users?${params.toString()}`);
    
    // Parse OData response
    let data: UserAdminDto[];
    let totalCount: number;
    
    if (response.data.value) {
      // OData format response
      data = response.data.value;
      totalCount = response.data['@odata.count'] || response.data.value.length;
    } else if (Array.isArray(response.data)) {
      // Simple array response (fallback)
      data = response.data;
      totalCount = data.length;
    } else {
      // Handle other formats
      data = [];
      totalCount = 0;
    }
    
    return {
      data,
      totalCount,
      page: filter?.page || 1,
      pageSize: filter?.pageSize || 20,
      totalPages: Math.ceil(totalCount / (filter?.pageSize || 20))
    };
  } catch (error) {
    console.error('OData request failed, falling back to simple endpoint:', error);
    
    // Fallback to simple endpoint
    const response = await axios.get(`${API_BASE_URL}/admin/users/simple`);
    let data = response.data as UserAdminDto[];
    
    // Apply client-side filtering
    if (filter?.search) {
      data = data.filter(user => 
        user.name.toLowerCase().includes(filter.search!.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.search!.toLowerCase())
      );
    }
    
    if (filter?.role && filter.role !== 'all') {
      data = data.filter(user => user.role === filter.role);
    }
    
    if (filter?.status && filter.status !== 'all') {
      data = data.filter(user => user.status === filter.status);
    }
    
    // Apply client-side pagination
    const totalCount = data.length;
    const page = filter?.page || 1;
    const pageSize = filter?.pageSize || 20;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    data = data.slice(startIndex, endIndex);
    
    return {
      data,
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize)
    };
  }
};

// Backup function for non-OData response
export const getUsersSimple = async (): Promise<UserAdminDto[]> => {
  const response = await axios.get<UserAdminDto[]>(
    `${API_BASE_URL}/admin/users/simple`
  );
  return response.data;
};

// Debug function
export const getUsersDebug = async (): Promise<any> => {
  const response = await axios.get(`${API_BASE_URL}/admin/users/debug`);
  return response.data;
};

// Debug function to test OData
export const getUsersWithDebug = async (filter?: UserFilter): Promise<any> => {
  const params = new URLSearchParams();
  
  if (filter?.page && filter?.pageSize) {
    const skip = (filter.page - 1) * filter.pageSize;
    params.append('$skip', skip.toString());
    params.append('$top', filter.pageSize.toString());
  }
  
  const filterConditions: string[] = [];
  
  if (filter?.search) {
    filterConditions.push(`(contains(tolower(Name), '${filter.search.toLowerCase()}') or contains(tolower(Email), '${filter.search.toLowerCase()}'))`);
  }
  
  if (filter?.role && filter.role !== 'all') {
    filterConditions.push(`Role eq '${filter.role}'`);
  }
  
  if (filter?.status && filter.status !== 'all') {
    filterConditions.push(`Status eq '${filter.status}'`);
  }
  
  if (filterConditions.length > 0) {
    params.append('$filter', filterConditions.join(' and '));
  }
  
  params.append('$count', 'true');
  params.append('$orderby', 'JoinDate desc');
  
  console.log('OData URL:', `${API_BASE_URL}/admin/users?${params.toString()}`);
  
  const response = await axios.get(`${API_BASE_URL}/admin/users?${params.toString()}`);
  console.log('OData Response:', response.data);
  
  return response.data;
};

export const toggleUserStatus = async (userId: number): Promise<void> => {
  await axios.put(`${API_BASE_URL}/admin/users/${userId}/toggle-status`);
};

export interface PendingVehicle {
  id: string;
  name: string;
  owner: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
  image: string;
  type: string;
  price: string;
  documentsCount: number;
  imagesCount: number;
  completeness: number;
  description: string;
  location: string;
  year: string;
  brand: string;
  model: string;
  licensePlate: string;
  engineSize: string;
  fuelType: string;
  transmission: string;
  features: string[];
  images: string[];
  documents: Record<string, string>;
  ownerInfo: {
    name: string;
    phone: string;
    email: string;
    idCard: string;
    address: string;
    joinDate: string;
    rating: number;
    totalVehicles: number;
  };
}

export const fetchPendingVehicles = async () => {
  const response = await axios.get(`${API_BASE_URL}/vehicles/getallforadmin`);
  return response.data;
};

export const approveVehicle = async (id: string | number) => {
  await axios.put(`${API_BASE_URL}/vehicles/${id}/approve`);
};

export const rejectVehicle = async (id: string | number) => {
  await axios.put(`${API_BASE_URL}/vehicles/${id}/reject`);
};

export interface CreateVehicleRequest {
  name: string;
  brand: string;
  type: string;
  year: number;
  licensePlate: string;
  description: string;
  pricePerDay: number;
  licenseRequired: string;
  minAge: number;
  quantity: number;
  ownerId: number;
  images: string[];
  idCardFrontURL: string;
  idCardBackURL: string;
  vehicleRegistrationURL: string;
  authorizationURL?: string | null;
}

export const createVehicle = async (data: CreateVehicleRequest) => {
  const response = await axios.post(`${API_BASE_URL}/vehicles`, data);
  return response.data;
};

export const getViolationReports = async () => {
  const res = await axios.get(`${API_BASE_URL}/violations`);
  return res.data.data; // assuming ApiResponse<T>
};

export const markReportResolved = async (id: number) => {
  await axios.post(`${API_BASE_URL}/violations/${id}/resolve`);
};

export const getBookingDetailById = async (id: string) => {
  const res = await axios.get(`${API_BASE_URL}/bookings/detail/${id}`);
  return res.data.data; // do backend trả về kiểu ApiResponse<T>
};

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<{ url: string }>(
    `${API_BASE_URL}/vehicles/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.url;
}

export async function getCommission(): Promise<number> {
  try {
    const response = await axios.get(API_BASE_URL + "/Setting/commission");
    const value = parseFloat(response.data);
    return isNaN(value) ? 0.2 : value;
  } catch (error) {
    console.error("Lỗi khi lấy commission:", error);
    return 0.2;
  }
}

export async function putBookingStatus(dto: {
  bookingId: number;
  newStatus: string;
}) {
  return axios.put(API_BASE_URL + "/bookings/status", dto);
}
export async function postReview(data: {
  bookingId: number;
  reviewerId: number;
  revieweeId: number;
  rating: number;
  comment: string;
}) {
  return axios.post(API_BASE_URL + "/reviews", data);
}

export async function getReviewByBookingId(bookingId: number) {
  const res = await axios.get(API_BASE_URL + `/reviews/booking/${bookingId}`);
  return res.data;
}

// Statistics APIs
export interface DashboardOverviewDto {
  totalVehicles: number;
  totalUsers: number;
  totalCommission: number;
  totalBookings: number;
  activeVehicles: number;
  activeUsers: number;
  pendingVehicles: number;
  pendingReports: number;
  totalRevenue: number;
  monthlyRevenue: number;
  monthlyBookings: number;
  commissionRate: number;
}

export interface VehicleStatisticsDto {
  total: number;
  active: number;
  pending: number;
  blocked: number;
  approvedThisMonth: number;
}

export interface UserStatisticsDto {
  total: number;
  active: number;
  blocked: number;
  newThisMonth: number;
  renters: number;
  owners: number;
  staff: number;
  admins: number;
}

export interface RevenueStatisticsDto {
  totalRevenue: number;
  totalCommission: number;
  monthlyRevenue: number;
  monthlyCommission: number;
  commissionRate: number;
  totalBookings: number;
  completedBookings: number;
  monthlyBookings: number;
}

export const getDashboardOverview = async (): Promise<DashboardOverviewDto> => {
  const response = await axios.get(`${API_BASE_URL}/admin/statistics/overview`);
  return response.data.data;
};

export const getTotalVehiclesCount = async (): Promise<number> => {
  const response = await axios.get(`${API_BASE_URL}/admin/statistics/vehicles-count`);
  return response.data.data;
};

export const getTotalUsersCount = async (): Promise<number> => {
  const response = await axios.get(`${API_BASE_URL}/admin/statistics/users-count`);
  return response.data.data;
};

export const getTotalCommission = async (): Promise<number> => {
  const response = await axios.get(`${API_BASE_URL}/admin/statistics/total-commission`);
  return response.data.data;
};
