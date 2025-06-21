import { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, MessageCircle, Calendar, Car } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/shared/rating-stars";
import { Separator } from "@/components/ui/separator";

// Mock data for owner profile (Replace with actual fetch logic)
const mockOwnerProfile = {
  id: "owner123", // Replace with actual owner ID
  name: "Nguyễn Văn A",
  avatar: "/placeholder.svg?height=100&width=100", // Replace with actual avatar URL
  rating: 4.8,
  reviewCount: 156,
  responseTime: "Trong vòng 1 giờ",
  joinDate: "Tham gia từ 2022-06-15",
  totalVehicles: 5,
  location: "Quận 1, TP.HCM",
  about: "Chào mừng bạn đến với dịch vụ cho thuê xe của tôi! Tôi luôn đảm bảo xe sạch sẽ, an toàn và giao xe đúng giờ. Rất mong được đồng hành cùng bạn trên mọi nẻo đường.",
  // Add mock reviews here if needed
};

const UserProfilePage: FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  // In a real application, you would fetch owner data based on userId here
  // For now, use mock data. You might need to filter mock data by userId if you have multiple mock owners.
  const owner = mockOwnerProfile; // Using the single mock owner for now

  if (!owner) {
    return <div className="container mx-auto py-8">Loading or Owner not found...</div>; // Handle loading/not found state
  }

  const handleContactOwner = () => {
    // Logic to start a chat with the owner
    // You might need the current user's ID and the owner's ID to create a chat session
    const currentUserId = "user123"; // Replace with actual current user ID
    const chatId = `${currentUserId}-${owner.id}`;
    navigate(`/chat/${chatId}`); // Navigate to chat page
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={owner.avatar} alt={owner.name} />
            <AvatarFallback>{owner.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-3xl font-bold">{owner.name}</h1>
            <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{owner.rating.toFixed(1)} ({owner.reviewCount} đánh giá)</span>
              </div>
              <Separator orientation="vertical" className="h-5" />
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>{owner.responseTime}</span>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600">
               {owner.location && (
                 <div className="flex items-center gap-1">
                   <MapPin className="h-4 w-4" />
                   <span>{owner.location}</span>
                 </div>
               )}
               <div className="flex items-center gap-1">
                 <Calendar className="h-4 w-4" />
                 <span>{owner.joinDate}</span>
               </div>
               <div className="flex items-center gap-1">
                 <Car className="h-4 w-4" />
                 <span>{owner.totalVehicles} xe</span>
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

      {owner.about && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Giới thiệu về chủ xe</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{owner.about}</p>
          </CardContent>
        </Card>
      )}

      {/* Placeholder for Owner's Vehicles Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Xe của chủ xe ({owner.totalVehicles})</CardTitle>
        </CardHeader>
        <CardContent>
          {/* You will list vehicles owned by this owner here */}
          <p className="text-gray-600">Danh sách xe của {owner.name} sẽ hiển thị ở đây.</p>
        </CardContent>
      </Card>

       {/* Placeholder for Owner's Reviews Section */}
       <Card>
         <CardHeader>
           <CardTitle>Đánh giá về chủ xe</CardTitle>
         </CardHeader>
         <CardContent>
           {/* You will list reviews about this owner here */}
           <p className="text-gray-600">Các đánh giá về {owner.name} sẽ hiển thị ở đây.</p>
         </CardContent>
       </Card>

    </div>
  );
};

export default UserProfilePage; 