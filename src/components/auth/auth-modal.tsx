
import { useState } from "react"
import { X } from "lucide-react"
import { SignupForm } from "./signup-form"
import { LoginForm } from "./login-form"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: "login" | "signup"
}

export function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode)

  if (!isOpen) return null

  const handleSignup = (data: {
    email: string
    name: string
    password: string
    confirmPassword: string
    referralCode?: string
  }) => {
    console.log("Signup data:", data)
    // Handle signup logic here
    onClose()
  }

  const handleLogin = (email: string, password: string) => {
    console.log("Login:", { email, password })
    // Handle login logic here
    onClose()
  }

  const handleOAuthLogin = (provider: "facebook" | "google") => {
    console.log("OAuth login:", provider)
    // Handle OAuth login logic here
    onClose()
  }

  const handleForgotPassword = () => {
    console.log("Forgot password")
    // Handle forgot password logic here
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10">
          <X size={24} />
        </button>

        {/* Form Content */}
        <div className="p-2">
          {mode === "login" ? (
            <LoginForm
              onLogin={handleLogin}
              onOAuthLogin={handleOAuthLogin}
              onForgotPassword={handleForgotPassword}
              onSwitchToSignup={() => setMode("signup")}
            />
          ) : (
            <SignupForm
              onSubmit={handleSignup}
              onOAuthLogin={handleOAuthLogin}
              onSwitchToLogin={() => setMode("login")}
            />
          )}
        </div>
      </div>
    </div>
  )
}
