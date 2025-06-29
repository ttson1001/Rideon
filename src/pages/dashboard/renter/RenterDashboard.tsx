import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, MessageCircle, Star } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { StatusBadge } from "../../../components/shared/status-badge";
import { ReviewModal } from "../../../components/modals/review-modal";
import { CancelRequestModal } from "../../../components/modals/cancel-request-modal";
import { useToast } from "../../../hooks/use-toast";
import { getBookingsByRenter } from "@/components/api/dashboardService";

// Mock data
interface RentalCardProps {
  rental: any;
  showActions?: boolean;
  onReview?: (rental: any) => void;
  onCancel?: (rental: any) => void;
}
const renterId = parseInt(localStorage.getItem("userId") || "1");
function RentalCard({
  rental,
  showActions = true,
  onReview,
  onCancel,
}: RentalCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <img
            src={rental.vehicle.image || "/placeholder.svg"}
            alt={rental.vehicle.name}
            className="w-[120px] h-[80px] rounded-lg object-cover"
          />

          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{rental.vehicle.name}</h3>
                <p className="text-gray-600">Chủ xe: {rental.vehicle.owner}</p>
              </div>
              <StatusBadge status={rental.status} />
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(rental.startDate).toLocaleDateString("vi-VN")} -{" "}
                  {new Date(rental.endDate).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{rental.pickupLocation}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold text-blue-600">
                {rental.totalAmount.toLocaleString()}đ
              </div>

              {showActions && (
                <div className="flex gap-2">
                  {rental.status === "pending" && onCancel && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onCancel(rental)}
                    >
                      Hủy yêu cầu
                    </Button>
                  )}

                  {rental.status === "approved" && (
                    <>
                      <Button variant="outline" size="sm" asChild>
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            to={`/chat/${rental.id}/${renterId}/${rental.vehicle.ownerId}`}
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Nhắn tin
                          </Link>
                        </Button>
                      </Button>
                      <Button size="sm" asChild>
                        <Link to={`/rental/${rental.id}`}>Xem chi tiết</Link>
                      </Button>
                    </>
                  )}

                  {rental.status === "completed" &&
                    rental.canReview &&
                    onReview && (
                      <Button size="sm" onClick={() => onReview(rental)}>
                        <Star className="h-4 w-4 mr-1" />
                        Đánh giá
                      </Button>
                    )}

                  {rental.status === "completed" && !rental.canReview && (
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/rental/${rental.id}`}>Xem chi tiết</Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function RenterDashboard() {
  const [activeTab, setActiveTab] = useState("active");
  const [reviewModal, setReviewModal] = useState<{
    isOpen: boolean;
    rental: any;
  }>({
    isOpen: false,
    rental: null,
  });
  const [cancelModal, setCancelModal] = useState<{
    isOpen: boolean;
    rental: any;
  }>({
    isOpen: false,
    rental: null,
  });
  const { toast } = useToast();

  const renterId = parseInt(localStorage.getItem("userId") || "1");

  const [rentals, setRentals] = useState({
    active: [] as any[],
    pending: [] as any[],
    history: [] as any[],
  });
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const [active, pending, all] = await Promise.all([
          getBookingsByRenter(renterId, "approved"),
          getBookingsByRenter(renterId, "requested"),
          getBookingsByRenter(renterId),
        ]);

        const completed = all.filter(
          (b: any) => b.status.toLowerCase() === "completed"
        );

        const mapRental = (rental: any) => ({
          id: rental.id,
          vehicle: {
            name: rental.vehicleName,
            image: rental.image, // hoặc có image từ nơi khác
            owner: rental.ownerName,
            ownerId: rental.ownerId,
          },
          startDate: rental.startDate,
          endDate: rental.endDate,
          status: rental.status.toLowerCase(),
          totalAmount: rental.totalAmount,
          pickupLocation: "Chưa có trong DTO", // nếu có bạn sửa lại đây
          canReview: rental.status.toLowerCase() === "completed", // tùy hệ thống bạn
        });

        setRentals({
          active: active.map(mapRental),
          pending: pending.map(mapRental),
          history: completed.map(mapRental),
        });
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu thuê xe:", err);
      }
    };

    fetchRentals();
  }, [renterId]);

  const handleReview = (rental: any) => {
    console.log("handleReview called with:", rental); // Debug log

    // Create a properly formatted rental object for the review modal
    const reviewRental = {
      id: rental.id,
      vehicle: {
        name: rental.vehicle.name,
        image: rental.vehicle.image || "/placeholder.svg?height=100&width=150",
      },
      owner: {
        id: rental.vehicle.ownerId,
        name: rental.vehicle.owner, // Lấy từ rental.vehicle.owner
      },
    };

    console.log("Setting review modal withfdsdsfa:", reviewRental); // Debug log
    setReviewModal({ isOpen: true, rental: reviewRental });
  };

  const handleCancel = (rental: any) => {
    // Create a properly formatted rental object for the cancel modal
    const cancelRental = {
      id: rental.id,
      vehicle: {
        name: rental.vehicle.name,
      },
      startDate: rental.startDate,
      endDate: rental.endDate,
      totalAmount: rental.totalAmount,
    };
    setCancelModal({ isOpen: true, rental: cancelRental });
  };

  const handleConfirmCancel = (reason: string, details?: string) => {
    console.log("Cancel confirmed:", { reason, details });
    toast({
      title: "Đã hủy yêu cầu",
      description: "Yêu cầu thuê xe đã được hủy thành công",
    });
    // Remove rental from pending list
    // In real app, this would update the backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard người thuê
          </h1>
          <p className="text-gray-600 mt-2">
            Quản lý các chuyến thuê xe của bạn
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {rentals.active.length}
              </div>
              <div className="text-gray-600">Chuyến đang thuê</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {rentals.pending.length}
              </div>
              <div className="text-gray-600">Yêu cầu đang chờ</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">
                {rentals.history.length}
              </div>
              <div className="text-gray-600">Chuyến đã hoàn thành</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {rentals.active
                  .reduce((sum, rental) => sum + rental.totalAmount, 0)
                  .toLocaleString()}
                đ
              </div>
              <div className="text-gray-600">Tổng chi phí</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList>
            <TabsTrigger value="active">Đang thuê</TabsTrigger>
            <TabsTrigger value="pending">Đang chờ</TabsTrigger>
            <TabsTrigger value="history">Lịch sử</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {rentals.active.map((rental) => (
              <RentalCard key={rental.id} rental={rental} />
            ))}
            {rentals.active.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Không có chuyến thuê nào đang hoạt động
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {rentals.pending.map((rental) => (
              <RentalCard
                key={rental.id}
                rental={rental}
                onCancel={handleCancel}
              />
            ))}
            {rentals.pending.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Không có yêu cầu nào đang chờ xử lý
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {rentals.history.map((rental) => (
              <RentalCard
                key={rental.id}
                rental={rental}
                onReview={handleReview}
              />
            ))}
            {rentals.history.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Không có lịch sử thuê xe
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <ReviewModal
        isOpen={reviewModal.isOpen}
        onClose={() => setReviewModal({ isOpen: false, rental: null })}
        rental={reviewModal.rental}
      />

      <CancelRequestModal
        isOpen={cancelModal.isOpen}
        onClose={() => setCancelModal({ isOpen: false, rental: null })}
        rental={cancelModal.rental}
        onConfirmCancel={handleConfirmCancel}
      />
    </div>
  );
}
