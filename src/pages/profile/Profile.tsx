import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Camera,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Star,
  Shield,
  Award,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  getBookingsByRenter,
  getUserById,
  updateUser,
} from "@/components/api/dashboardService";

const Profile: FC = () => {
  const userId = localStorage.getItem("userId") || "0";
  const [profile, setProfile] = useState({
    id: 0,
    email: "",
    name: "",
    avatarUrl: "",
    phone: "",
    joinDate: new Date().toISOString(),
    rating: 0,
    role: "renter",
    isBlocked: false,
    lastActiveDate: null,
    bio: "",
    address: "",
  });

  const [recentRentals, setRecentRentals] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserById(userId);
        setProfile((prev) => ({
          ...prev,
          ...data,
        }));
      } catch (err) {
        console.error("Lỗi khi lấy thông tin người dùng:", err);
      }
    };

    const fetchBookings = async () => {
      try {
        const data = await getBookingsByRenter(Number(userId));
        setRecentRentals(data);
      } catch (err) {
        console.error("Lỗi khi lấy lịch sử thuê:", err);
      }
    };

    fetchProfile();
    fetchBookings();
  }, [userId]);

  const handleSave = async () => {
    try {
      const updateDto = {
        name: profile.name,
        avatarUrl: profile.avatarUrl,
        phone: profile.phone,
      };
      const result = await updateUser(profile.id, updateDto);
      if (result.success) {
        toast({ title: "Cập nhật thành công!" });
      } else {
        toast({
          title: "Cập nhật thất bại",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      toast({ title: "Lỗi khi cập nhật thông tin", variant: "destructive" });
    }
  };

  const handleCancel = () => {};

  const stats = [
    { label: "Chuyến đi", value: "24", icon: MapPin },
    { label: "Đánh giá", value: "4.8", icon: Star },
    { label: "Xe đã thuê", value: "12", icon: Award },
    { label: "Tỷ lệ hoàn thành", value: "98%", icon: Shield },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
        <p className="text-gray-600 mt-2">
          Quản lý thông tin cá nhân và xem lịch sử hoạt động
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="rentals">Lịch sử thuê</TabsTrigger>
          <TabsTrigger value="edit">Chỉnh sửa</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <Avatar className="w-32 h-32">
                    <AvatarImage
                      src={profile.avatarUrl || "/placeholder.svg"}
                      alt={profile.name}
                    />
                    <AvatarFallback className="text-2xl">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500">
                    Đã xác thực
                  </Badge>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profile.name}
                  </h2>
                  <p className="text-gray-600 mt-1">{profile.bio}</p>
                  <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      {profile.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      {profile.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      Tham gia từ{" "}
                      {new Date(profile.joinDate).toLocaleDateString("vi-VN")}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rentals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử thuê xe</CardTitle>
              <CardDescription>
                Tất cả các chuyến thuê xe của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRentals.map((rental) => (
                  <div
                    key={rental.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <img
                      src={
                        rental.url ||
                        "https://png.pngtree.com/element_our/20190602/ourlarge/pngtree-a-blue-cartoon-sedan-illustration-image_1407202.jpg"
                      }
                      alt={rental.vehicle}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">
                        {rental.vehicle}
                      </h4>
                      <p className="text-gray-600">
                        Ngày thuê:{" "}
                        {rental.startDate
                          ? new Date(rental.startDate).toLocaleDateString(
                              "vi-VN"
                            )
                          : "Không rõ ngày"}
                      </p>
                      <p className="text-gray-600">
                        Ngày trả:{" "}
                        {rental.endDate
                          ? new Date(rental.endDate).toLocaleDateString("vi-VN")
                          : "Không rõ ngày"}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{rental.rating || 5}/5</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          rental.status === "completed"
                            ? "text-green-600 border-green-600"
                            : rental.status === "cancelled"
                            ? "text-red-600 border-red-600"
                            : rental.status === "active"
                            ? "text-blue-600 border-blue-600"
                            : rental.status === "requested"
                            ? "text-yellow-600 border-yellow-600"
                            : rental.status === "approved"
                            ? "text-indigo-600 border-indigo-600"
                            : "text-gray-600 border-gray-600"
                        }
                      >
                        {rental.status === "completed"
                          ? "Hoàn thành"
                          : rental.status === "cancelled"
                          ? "Đã hủy"
                          : rental.status === "active"
                          ? "Đang hoạt động"
                          : rental.status === "requested"
                          ? "Đang chờ"
                          : rental.status === "approved"
                          ? "Đã duyệt"
                          : rental.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chỉnh sửa thông tin</CardTitle>
              <CardDescription>
                Cập nhật thông tin cá nhân của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={profile.avatarUrl || "/placeholder.svg"}
                    alt={profile.name}
                  />
                  <AvatarFallback className="text-xl">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="gap-2">
                    <Camera className="w-4 h-4" />
                    Thay đổi ảnh
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    JPG, PNG tối đa 5MB
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Giới thiệu</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={handleCancel}>
                  Hủy
                </Button>
                <Button onClick={handleSave}>Lưu thay đổi</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
