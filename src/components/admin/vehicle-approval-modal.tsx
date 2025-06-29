import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, X, FileText, AlertTriangle } from "lucide-react";
import { PendingVehicle } from "@/types/vehicle";
import { getVehicleDetail } from "../api/dashboardService";
import { useToast } from "@/hooks/use-toast";

interface VehicleApprovalModalProps {
  vehicle: PendingVehicle | null;
  open: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function VehicleApprovalModal({
  vehicle,
  open,
  onClose,
  onApprove,
  onReject,
}: VehicleApprovalModalProps) {
  const { toast } = useToast();
  const [reason, setReason] = useState("");
  const [checklist, setChecklist] = useState({
    documentsValid: false,
    vehicleCondition: false,
    priceReasonable: false,
    ownerVerified: false,
    imagesQuality: false,
  });
  const [realVehicle, setRealVehicle] = useState<any | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (vehicle && open) {
        try {
          const detail = await getVehicleDetail(vehicle.id);
          setRealVehicle(detail);
        } catch (err) {
          toast({
            title: "Lỗi tải chi tiết xe",
            description: "Không thể tải thông tin xe. Vui lòng thử lại.",
            variant: "destructive",
          });
        }
      } else {
        setRealVehicle(null);
      }
    };

    fetchDetail();
  }, [vehicle, open]);

  const handleChecklistChange = (key: string, checked: boolean) => {
    setChecklist((prev) => ({ ...prev, [key]: checked }));
  };

  const allChecked = Object.values(checklist).every(Boolean);

  const handleSendContract = (contractData: {
    vehicleId: string;
    vehicleName: string;
    ownerName: string;
    ownerEmail: string;
    commissionRate: number;
  }) => {
    toast({
      title: "📩 Hợp đồng đã được gửi",
      description: `Hợp đồng gửi đến ${contractData.ownerEmail}`,
      variant: "default",
    });
  };

  const handleApprove = () => {
    if (!allChecked || !realVehicle) {
      toast({
        title: "Chưa hoàn tất kiểm tra",
        description: "Vui lòng hoàn thành tất cả các bước kiểm tra!",
        variant: "destructive",
      });
      return;
    }

    const contractData = {
      vehicleId: realVehicle.id,
      vehicleName: realVehicle.name,
      ownerName: realVehicle.ownerName,
      ownerEmail: realVehicle.ownerEmail,
      commissionRate: 10,
    };

    handleSendContract(contractData);

    toast({
      title: "✅ Xe đã được duyệt",
      description: `Hợp đồng gửi đến ${contractData.ownerEmail}`,
      variant: "default",
    });

    onApprove(realVehicle.id);
    onClose();
  };

  const handleReject = () => {
    if (!reason.trim() || !realVehicle) {
      toast({
        title: "Thiếu lý do từ chối",
        description: "Vui lòng nhập lý do từ chối trước khi gửi!",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "🚫 Xe đã bị từ chối",
      description: `Lý do: ${reason}`,
      variant: "destructive",
    });

    onReject(realVehicle.id);
    onClose();
    setReason("");
  };

  if (!realVehicle) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" /> Kiểm duyệt xe: {realVehicle.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="vehicle-info">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="vehicle-info">Thông tin xe</TabsTrigger>
            <TabsTrigger value="images">Hình ảnh</TabsTrigger>
            <TabsTrigger value="documents">Giấy tờ</TabsTrigger>
            <TabsTrigger value="owner">Chủ xe</TabsTrigger>
          </TabsList>

          <TabsContent value="vehicle-info" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label>Tên xe</label>
                <p>{realVehicle.name}</p>
              </div>
              <div>
                <label>Hãng xe</label>
                <p>
                  {realVehicle.brand} {realVehicle.model}
                </p>
              </div>
              <div>
                <label>Năm sản xuất</label>
                <p>{realVehicle.year}</p>
              </div>
              <div>
                <label>Biển số</label>
                <p>{realVehicle.licensePlate}</p>
              </div>
              <div>
                <label>Giá thuê</label>
                <p>{realVehicle.pricePerDay} VND/ngày</p>
              </div>
              <div>
                <label className="mr-1">Trạng thái</label>
                <Badge
                  className={
                    realVehicle.status === "pending"
                      ? "bg-yellow-500 text-white"
                      : realVehicle.status === "approved"
                      ? "bg-green-600 text-white"
                      : "bg-red-500 text-white"
                  }
                >
                  {realVehicle.status === "pending"
                    ? "Chờ duyệt"
                    : realVehicle.status === "approved"
                    ? "Đã duyệt"
                    : "Đã từ chối"}
                </Badge>
              </div>
              <div>
                <label>Mô tả</label>
                <p>{realVehicle.description}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="images">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {realVehicle.imageUrls?.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  alt={`Xe ${i + 1}`}
                  className="rounded border h-48 object-cover"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {realVehicle.documentUrls?.map((doc: string, i: number) => (
                <img
                  key={i}
                  src={doc}
                  alt={`Giấy tờ ${i + 1}`}
                  className="rounded border h-48 object-cover"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="owner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label>Họ tên</label>
                <p>{realVehicle.ownerName}</p>
              </div>
              <div>
                <label>Email</label>
                <p>{realVehicle.ownerEmail}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {realVehicle.status === "pending" && (
          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" /> Checklist
              kiểm tra
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {[
                { key: "documentsValid", label: "Giấy tờ hợp lệ" },
                { key: "vehicleCondition", label: "Tình trạng xe đạt yêu cầu" },
                { key: "priceReasonable", label: "Giá thuê hợp lý" },
                { key: "ownerVerified", label: "Xác minh chủ xe" },
                { key: "imagesQuality", label: "Ảnh rõ nét, đầy đủ" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-2">
                  <Checkbox
                    id={key}
                    checked={(checklist as any)[key]}
                    onCheckedChange={(checked) =>
                      handleChecklistChange(key, checked as boolean)
                    }
                  />
                  <label htmlFor={key}>{label}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        {realVehicle.status === "pending" && (
          <div className="mt-6">
            <label>Lý do từ chối</label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nhập lý do..."
            />
          </div>
        )}

        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <div>
            {allChecked ? (
              <span className="text-green-600 flex items-center gap-1">
                <Check className="h-4 w-4" /> Sẵn sàng duyệt
              </span>
            ) : (
              <span className="text-orange-600">Chưa hoàn tất kiểm tra</span>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Đóng
            </Button>
            {realVehicle.status === "pending" && (
              <>
                <Button variant="destructive" onClick={handleReject}>
                  <X className="h-4 w-4 mr-1" /> Từ chối
                </Button>
                <Button onClick={handleApprove} disabled={!allChecked}>
                  <Check className="h-4 w-4 mr-1" /> Duyệt & Gửi hợp đồng
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
