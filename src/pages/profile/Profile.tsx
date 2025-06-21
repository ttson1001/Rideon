import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, MapPin, Phone, Mail, Calendar, Star, Shield, Award } from 'lucide-react';

const Profile: FC = () => {
  const [profile, setProfile] = useState({
    name: "Nguyễn Văn An",
    email: "nguyenvanan@email.com",
    phone: "0123456789",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    bio: "Tôi là một người yêu thích du lịch và khám phá những địa điểm mới. Xe máy là phương tiện di chuyển yêu thích của tôi.",
    joinDate: "2023-01-15",
    avatar: "/placeholder.svg?height=120&width=120",
  });

  const stats = [
    { label: "Chuyến đi", value: "24", icon: MapPin },
    { label: "Đánh giá", value: "4.8", icon: Star },
    { label: "Xe đã thuê", value: "12", icon: Award },
    { label: "Tỷ lệ hoàn thành", value: "98%", icon: Shield },
  ];

  const recentRentals = [
    {
      id: 1,
      vehicle: "Honda Winner X",
      date: "2024-01-20",
      duration: "3 ngày",
      status: "completed",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      vehicle: "Yamaha Exciter 155",
      date: "2024-01-15",
      duration: "1 ngày",
      status: "completed",
      rating: 4,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      vehicle: "Honda Air Blade",
      date: "2024-01-10",
      duration: "2 ngày",
      status: "completed",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ];

  const handleSave = () => {
    // Lưu thông tin profile
    console.log("Saving profile:", profile);
  };

  const handleCancel = () => {
    // Reset về dữ liệu gốc nếu cần
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
        <p className="text-gray-600 mt-2">Quản lý thông tin cá nhân và xem lịch sử hoạt động</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="rentals">Lịch sử thuê</TabsTrigger>
          <TabsTrigger value="edit">Chỉnh sửa</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
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
                  <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
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
                      Tham gia từ {new Date(profile.joinDate).toLocaleDateString("vi-VN")}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Hoạt động gần đây</CardTitle>
              <CardDescription>Các chuyến thuê xe gần nhất của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRentals.map((rental) => (
                  <div key={rental.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={rental.image || "/placeholder.svg"}
                      alt={rental.vehicle}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{rental.vehicle}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(rental.date).toLocaleDateString("vi-VN")} • {rental.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{rental.rating}</span>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Hoàn thành
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rentals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử thuê xe</CardTitle>
              <CardDescription>Tất cả các chuyến thuê xe của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRentals.map((rental) => (
                  <div key={rental.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                    <img
                      src={rental.image || "/placeholder.svg"}
                      alt={rental.vehicle}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{rental.vehicle}</h4>
                      <p className="text-gray-600">Ngày thuê: {new Date(rental.date).toLocaleDateString("vi-VN")}</p>
                      <p className="text-gray-600">Thời gian: {rental.duration}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{rental.rating}/5</span>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Hoàn thành
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
              <CardDescription>Cập nhật thông tin cá nhân của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
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
                  <p className="text-sm text-gray-600 mt-2">JPG, PNG tối đa 5MB</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Giới thiệu</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                  />
                </div>
              </div>

              {/* Action Buttons */}
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
