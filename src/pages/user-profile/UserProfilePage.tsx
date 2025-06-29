import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Clock,
  MessageCircle,
  Calendar,
  Car,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getUserById } from "@/components/api/dashboardService";

interface Owner {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  phone: string;
  joinDate: string;
  rating: number;
  role: string;
  isBlocked: boolean;
  lastActiveDate: string | null;
}

const UserProfilePage: FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [owner, setOwner] = useState<Owner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await getUserById(Number(userId));
        setOwner(res);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu chủ xe:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOwner();
    }
  }, [userId]);

  const handleContactOwner = () => {
    const currentUserId = localStorage.getItem("userId");
    navigate(`/chat/null/${currentUserId}/${userId}`);
  };

  if (loading) {
    return <div className="container mx-auto py-8">Đang tải...</div>;
  }

  if (!owner) {
    return <div className="container mx-auto py-8">Không tìm thấy chủ xe.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={owner.avatarUrl} alt={owner.name} />
            <AvatarFallback>{owner.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-3xl font-bold">{owner.name}</h1>
            <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{owner.rating.toFixed(1)} (xx đánh giá)</span>
              </div>
              <Separator orientation="vertical" className="h-5" />
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>Phản hồi trong vòng 1 giờ</span>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Chưa có địa chỉ</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{owner.joinDate.split("T")[0]}</span>
              </div>
              <div className="flex items-center gap-1">
                <Car className="h-4 w-4" />
                <span>xx xe</span>
              </div>
            </div>
            <div className="pt-4">
              <Button onClick={handleContactOwner}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Nhắn tin cho chủ xe
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Giới thiệu về chủ xe</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Chào mừng bạn đến với dịch vụ cho thuê xe của tôi! Tôi luôn đảm bảo
            xe sạch sẽ, an toàn và giao xe đúng giờ.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Xe của chủ xe</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Danh sách xe của {owner.name} sẽ hiển thị ở đây.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Đánh giá về chủ xe</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Các đánh giá về {owner.name} sẽ hiển thị ở đây.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfilePage;
