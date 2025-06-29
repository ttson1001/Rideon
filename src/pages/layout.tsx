import { FC } from "react";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/contexts/app-context";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "renter" | "owner" | "admin";
}

const Layout: FC = () => {
  const userId = localStorage.getItem("userId") || "";
  const role = (localStorage.getItem("role") || "renter") as
    | "renter"
    | "owner"
    | "admin";

  const currentUser: User | undefined = userId
    ? {
        id: userId,
        name: "User", // hoặc lấy từ token nếu có thêm
        email: "", // có thể sửa nếu bạn lưu thêm
        avatar: undefined,
        role: role,
      }
    : undefined;

  return (
    <div className="min-h-screen">
      <AppProvider>
        <ThemeProvider>
          {currentUser?.role !== "admin" && (
            <Navbar currentUser={currentUser} unreadNotificationsCount={0} />
          )}
          <main className={currentUser?.role !== "admin" ? "pt-16" : ""}>
            <Outlet />
          </main>
          <Toaster />
        </ThemeProvider>
      </AppProvider>
    </div>
  );
};

export default Layout;
