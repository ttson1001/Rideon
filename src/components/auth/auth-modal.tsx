import { X } from "lucide-react";
import { SignupForm } from "./signup-form";
import { LoginForm } from "./login-form";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
  onSwitchMode: (mode: "login" | "signup") => void;
}

export function AuthModal({
  isOpen,
  onClose,
  mode,
  onSwitchMode,
}: AuthModalProps) {
  if (!isOpen) return null;

  const handleOAuthLogin = (provider: "facebook" | "google") => {
    console.log("OAuth login:", provider);
    onClose(); // có thể giữ lại hoặc không tuỳ mục đích
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X size={24} />
        </button>

        {/* Form Content */}
        <div className="p-4">
          {mode === "login" ? (
            <LoginForm
              onOAuthLogin={handleOAuthLogin}
              onSwitchToSignup={() => onSwitchMode("signup")}
            />
          ) : (
            <SignupForm
              onOAuthLogin={handleOAuthLogin}
              onSwitchToLogin={() => onSwitchMode("login")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
