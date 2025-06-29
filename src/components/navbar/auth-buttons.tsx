import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/app-context";
import { AuthModal } from "@/components/auth/auth-modal";

interface AuthButtonsProps {
  className?: string;
}

export function AuthButtons({ className }: AuthButtonsProps) {
  const { t } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "signup">("login");

  const handleLoginClick = () => {
    setModalMode("login");
    setIsModalOpen(true);
  };

  const handleSignupClick = () => {
    setModalMode("signup");
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={`flex items-center gap-3 ${className}`}>
        <Button variant="ghost" onClick={handleLoginClick}>
          {t("auth.login")}
        </Button>
        <Button onClick={handleSignupClick}>{t("auth.register")}</Button>
      </div>

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        onSwitchMode={(mode) => setModalMode(mode)}
      />
    </>
  );
}
