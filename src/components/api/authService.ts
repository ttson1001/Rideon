import axios from "axios";

const API_BASE_URL = "http://14.225.217.181:8080/api/Auth";

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserRegisterDto {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  statusCode?: number;
}

// LOGIN
export const login = async (dto: UserLoginDto): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, dto);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
      statusCode: error.response?.status || 500,
    };
  }
};

// REGISTER
export const register = async (
  dto: UserRegisterDto
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, dto);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed",
      statusCode: error.response?.status || 500,
    };
  }
};
