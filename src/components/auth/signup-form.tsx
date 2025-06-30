import type React from "react";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authService";
interface SignupFormProps {
  onOAuthLogin: (provider: "facebook" | "google") => void;
  onSwitchToLogin: () => void;
}

export function SignupForm({ onOAuthLogin, onSwitchToLogin }: SignupFormProps) {
  const { signInWithGoogle, user, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    role: "renter",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard/owner");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await register({
          email: formData.email,
          name: formData.name,
          password: formData.password,
          role: formData.role,
          address: formData.address,
        });
        if (response.success) {
          toast.success("Đăng ký thành công!");
          onSwitchToLogin();
        } else {
          toast.error(response.message || "Đăng ký thất bại");
          setErrors((prev) => ({
            ...prev,
            form: response.message || "Đăng ký thất bại",
          }));
        }
      } catch (error) {
        toast.error("Đăng ký thất bại. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (error: any) {
      console.error("Error signing up with Google:", error);
      // Error is already handled in auth context
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.address.trim()) {
      newErrors.address = "Địa chỉ là bắt buộc";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng";
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Tên hiển thị là bắt buộc";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Tên hiển thị phải có ít nhất 2 ký tự";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    // Terms validation
    if (!acceptTerms) {
      newErrors.terms = "Bạn phải chấp nhận điều khoản sử dụng";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Đăng ký tài khoản</h2>
        <p className="text-gray-600 mt-2">Tạo tài khoản để bắt đầu thuê xe</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`border p-2 rounded-md w-full ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Nhập địa chỉ email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <Label htmlFor="name">Tên hiển thị *</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`border p-2 rounded-md w-full ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Nhập tên hiển thị"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        {/* Address */}
        <div>
          <Label htmlFor="address">Địa chỉ *</Label>
          <Input
            id="address"
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className={`border p-2 rounded-md w-full ${
              errors.address ? "border-red-500" : ""
            }`}
            placeholder="Nhập địa chỉ của bạn"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password">Mật khẩu *</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`border p-2 rounded-md w-full pr-10 ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Nhập mật khẩu"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <Label htmlFor="confirmPassword">Nhập lại mật khẩu *</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className={`border p-2 rounded-md w-full pr-10 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              placeholder="Nhập lại mật khẩu"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Role Selection */}
        <div>
          <Label>Vai trò *</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="renter"
                checked={formData.role === "renter"}
                onChange={() => handleInputChange("role", "renter")}
              />
              <span>Người thuê xe</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="owner"
                checked={formData.role === "owner"}
                onChange={() => handleInputChange("role", "owner")}
              />
              <span>Chủ xe</span>
            </label>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => {
              setAcceptTerms(checked as boolean);
              if (errors.terms) {
                setErrors((prev) => ({ ...prev, terms: "" }));
              }
            }}
            className={errors.terms ? "border-red-500" : ""}
          />
          <div className="text-sm">
            <label htmlFor="terms" className="text-gray-700">
              Tôi đồng ý với{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                Điều khoản sử dụng
              </a>{" "}
              và{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Chính sách bảo mật
              </a>
            </label>
            {errors.terms && (
              <p className="text-red-500 mt-1">{errors.terms}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md w-full"
          disabled={isLoading || isGoogleLoading}
        >
          {isLoading ? "Đang đăng ký..." : "Đăng ký"}
        </Button>

        {/* OAuth Buttons */}
        <div className="space-y-2">
          <div className="text-center text-gray-500 text-sm">
            hoặc đăng ký bằng
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50"
            disabled={isLoading || isGoogleLoading}
          >
            <Mail size={20} />
            {isGoogleLoading ? "Đang xử lý..." : "Đăng ký với Google"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => onOAuthLogin("facebook")}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50"
            disabled={isLoading || isGoogleLoading}
          >
            <Facebook size={20} />
            Đăng ký với Facebook
          </Button>
        </div>

        {/* Switch to Login */}
        <div className="text-center">
          <span className="text-gray-600 text-sm">Đã có tài khoản? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Đăng nhập ngay
          </button>
        </div>
      </form>
    </div>
  );
}
