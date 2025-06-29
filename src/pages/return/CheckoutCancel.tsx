import { XCircle } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

export default function CheckoutCancel() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const status = params.get("status");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
      <XCircle className="text-red-500 w-16 h-16 mb-4" />
      <h1 className="text-2xl font-bold text-red-700">Thanh toán thất bại!</h1>
      <p className="text-gray-600 mt-2">
        Trạng thái: <strong>{status}</strong>
      </p>
      <Link
        to="/dashboard/renter"
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Thử lại
      </Link>
    </div>
  );
}
