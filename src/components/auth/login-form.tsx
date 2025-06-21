import type React from "react"
import { useState, useEffect } from "react"
import { Eye, EyeOff, Facebook, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

interface LoginFormProps {
  onOAuthLogin: (provider: "facebook" | "google") => void
  onForgotPassword: () => void
  onSwitchToSignup: () => void
}

export function LoginForm({ onOAuthLogin, onForgotPassword, onSwitchToSignup }: LoginFormProps) {
  const { signInWithGoogle, signInWithEmailAndPassword, user, loading } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  useEffect(() => {
    if (user && !loading) {
      // Redirect to dashboard or home page
      navigate('/dashboard/owner');
    }
  }, [user, loading, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = "Email là bắt buộc"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc"
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      try {
        await signInWithEmailAndPassword(formData.email, formData.password)
        toast.success('Đăng nhập thành công!')
      } catch (error: any) {
        console.error('Error signing in:', error)
        let errorMessage = 'Đăng nhập thất bại. Vui lòng thử lại.'
        
        // Xử lý các mã lỗi cụ thể
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'Không tìm thấy tài khoản với email này.'
            break
          case 'auth/wrong-password':
            errorMessage = 'Mật khẩu không đúng.'
            break
          case 'auth/invalid-email':
            errorMessage = 'Email không hợp lệ.'
            break
          case 'auth/user-disabled':
            errorMessage = 'Tài khoản đã bị vô hiệu hóa.'
            break
        }
        
        toast.error(errorMessage)
        setErrors(prev => ({
          ...prev,
          form: errorMessage
        }))
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    try {
      await signInWithGoogle()
    } catch (error: any) {
      console.error('Error signing in with Google:', error)
      // Error is already handled in auth context
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Đăng nhập</h2>
        <p className="text-gray-600 mt-2">Chào mừng bạn quay trở lại</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`border p-2 rounded-md w-full ${errors.email ? "border-red-500" : ""}`}
            placeholder="Nhập địa chỉ email"
            disabled={isLoading || isGoogleLoading}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password">Mật khẩu</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`border p-2 rounded-md w-full pr-10 ${errors.password ? "border-red-500" : ""}`}
              placeholder="Nhập mật khẩu"
              disabled={isLoading || isGoogleLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={isLoading || isGoogleLoading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-blue-600 hover:underline text-sm"
            disabled={isLoading || isGoogleLoading}
          >
            Quên mật khẩu?
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md w-full"
          disabled={isLoading || isGoogleLoading}
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>

        {/* OAuth Buttons */}
        <div className="space-y-2">
          <div className="text-center text-gray-500 text-sm">hoặc đăng nhập bằng</div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50"
            disabled={isLoading || isGoogleLoading}
          >
            <Mail size={20} />
            {isGoogleLoading ? "Đang đăng nhập..." : "Đăng nhập với Google"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => onOAuthLogin("facebook")}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50"
            disabled={isLoading || isGoogleLoading}
          >
            <Facebook size={20} />
            Đăng nhập với Facebook
          </Button>
        </div>

        {/* Switch to Signup */}
        <div className="text-center">
          <span className="text-gray-600 text-sm">Chưa có tài khoản? </span>
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:underline text-sm font-medium"
            disabled={isLoading || isGoogleLoading}
          >
            Đăng ký ngay
          </button>
        </div>
      </form>
    </div>
  )
}
