import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "./contexts/app-context";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/auth-context";

// Import pages
import Home from "./pages/Home";
import AboutPage from "./pages/about/AboutPage";
import Browse from "./pages/browse/Browse";
import ProfilePage from "./pages/profile/Profile";
import RenterDashboard from "./pages/dashboard/renter/RenterDashboard";
import OwnerDashboard from "./pages/dashboard/owner/OwnerDashboard";
import VehicleList from "./pages/dashboard/owner/list/VehicleList";
import ChatPage from "./pages/chat/[requestId]/ChatDetail";
import BookingPage from "./pages/booking/confirm/BookingConfirmation";
import VehicleDetail from "./pages/vehicle/[id]/VehicleDetail";
import Settings from "./pages/settings/Settings";
import NotificationsPage from "./pages/notifications/Notifications";
import OwnerInfoPage from "./pages/owner-info/OwnerInfo";
import Terms from "./pages/terms/Terms";
import AdminPage from "./pages/admin/AdminPage";
import ChatDetail from "./pages/chat/[requestId]/ChatDetail";
import BookingConfirmation from "./pages/booking/confirm/BookingConfirmation";
import UserProfilePage from "./pages/user-profile/UserProfilePage";

// Layouts
import Layout from "./pages/layout";
import RentalDetail from "./pages/rental/[id]/RentalDetail";
import RequestDetail from "./pages/dashboard/owner/request/[id]/RequestDetail";
import CheckoutSuccess from "./pages/return/CheckoutSuccess";
import CheckoutCancel from "./pages/return/CheckoutCancel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/browse", element: <Browse /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/users/:userId", element: <UserProfilePage /> },
      { path: "/dashboard/renter", element: <RenterDashboard /> },
      { path: "/dashboard/owner", element: <OwnerDashboard /> },
      { path: "/dashboard/owner/request/:id", element: <RequestDetail /> },
      { path: "/dashboard/owner/list/vehicleList", element: <VehicleList /> },
      { path: "/rental/:id", element: <RentalDetail /> },
      { path: "/chat", element: <ChatPage /> },
      { path: "/booking", element: <BookingPage /> },
      { path: "/vehicle/:id", element: <VehicleDetail /> },
      { path: "/settings", element: <Settings /> },
      { path: "/notifications", element: <NotificationsPage /> },
      { path: "/owner-info", element: <OwnerInfoPage /> },
      { path: "/terms", element: <Terms /> },
      { path: "/checkout-success", element: <CheckoutSuccess /> },
      { path: "/checkout-cancel", element: <CheckoutCancel /> },
      {
        path: "/chat/:bookingId/:senderId/:receiverId",
        element: <ChatDetail />,
      },
      { path: "/booking/confirm", element: <BookingConfirmation /> },
      {
        path: "/admin/*",
        element: <AdminPage />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppProvider>
          <Toaster position="top-right" />
          <RouterProvider router={router} />
          <ToastContainer />
        </AppProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
