import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VehicleApprovalModal from "@/components/admin/vehicle-approval-modal";
import { Eye, Check, X, Clock } from "lucide-react";
import { PendingVehicle } from "@/types/vehicle";
import {
  approveVehicle,
  fetchPendingVehicles,
  rejectVehicle,
} from "../api/dashboardService";

export default function PendingVehicleTable() {
  const [selectedVehicle, setSelectedVehicle] = useState<PendingVehicle | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [vehicles, setVehicles] = useState<PendingVehicle[]>([]);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const res = await fetchPendingVehicles();
        setVehicles(res.data || []);
      } catch (err) {
        console.error("Failed to load vehicles", err);
      }
    };

    loadVehicles();
  }, []);

  const handleApprove = async (vehicleId: string) => {
    try {
      await approveVehicle(vehicleId);
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === vehicleId ? { ...v, status: "approved" as const } : v
        )
      );
    } catch (err) {
      console.error("Failed to approve vehicle", err);
    }
  };

  const handleReject = async (vehicleId: string) => {
    try {
      await rejectVehicle(vehicleId);
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === vehicleId ? { ...v, status: "rejected" as const } : v
        )
      );
    } catch (err) {
      console.error("Failed to reject vehicle", err);
    }
  };

  const openModal = (vehicle: PendingVehicle) => {
    setSelectedVehicle(vehicle);
    setModalOpen(true);
  };

  const pendingCount = vehicles.filter((v) => v.status === "pending").length;

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Xe chờ duyệt</h1>
          <p className="text-gray-600">
            Danh sách các xe đang chờ duyệt bởi admin
          </p>
        </div>
        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {pendingCount} xe chờ duyệt
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Xe
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Chủ xe
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ngày gửi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {vehicle.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <img
                    className="h-12 w-16 rounded-lg object-cover"
                    src={vehicle.image || "/placeholder.svg"}
                    alt={vehicle.name}
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {vehicle.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {vehicle.type} • {vehicle.price}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {vehicle.owner}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(vehicle.submittedDate).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant={
                      vehicle.status === "approved"
                        ? "default"
                        : vehicle.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {vehicle.status === "pending" && "Chờ duyệt"}
                    {vehicle.status === "approved" && "Đã duyệt"}
                    {vehicle.status === "rejected" && "Từ chối"}
                  </Badge>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openModal(vehicle)}
                  >
                    <Eye className="h-4 w-4 mr-1" /> Kiểm tra
                  </Button>
                  {vehicle.status === "pending" && (
                    <>
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(vehicle.id)}
                        disabled={vehicle.completeness < 80}
                      >
                        <Check className="h-4 w-4 mr-1" /> Duyệt
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleReject(vehicle.id)}
                      >
                        <X className="h-4 w-4 mr-1" /> Từ chối
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <VehicleApprovalModal
        vehicle={selectedVehicle}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
