import axios from "axios";

export const API_BASE_URL = "http://localhost:5177/api";
export const BASE_URL = "http://localhost:5177";

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
  joinDate: string;
  lastActive?: string | null;
}

export const getUsers = async (): Promise<UserAdminDto[]> => {
  const response = await axios.get<UserAdminDto[]>(
    `${API_BASE_URL}/admin/users`
  );
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
