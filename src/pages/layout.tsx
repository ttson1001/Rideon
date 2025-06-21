import { FC } from "react";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/contexts/app-context";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/contexts/auth-context";
import { Outlet } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "renter" | "owner" | "admin";
}

const Layout: FC = () => {
  const { user, loading } = useAuth();

  // Convert Firebase user to our User type
  const currentUser = user ? {
    id: user.uid,
    name: user.displayName || 'User',
    email: user.email || '',
    avatar: user.photoURL || undefined,
    role: 'renter' as const // Type assertion to ensure role is one of the allowed values
  } : undefined;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AppProvider>
        <ThemeProvider>
          <Navbar currentUser={currentUser} unreadNotificationsCount={0} />
          <main className="pt-16">
            <Outlet />
          </main>
          <Toaster />
        </ThemeProvider>
      </AppProvider>
    </div>
  );
};

export default Layout;
