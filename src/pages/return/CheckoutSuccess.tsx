import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-2xl font-bold text-green-700">
        Thanh toán thành công!
      </h1>
      <p className="text-gray-600 mt-2">Cảm ơn bạn đã sử dụng dịch vụ.</p>
      <Link
        to="/dashboard/renter"
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Về trang chính
      </Link>
    </div>
  );
}
