
import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ChatHeaderProps {
  userName: string
  userAvatar?: string
  isOnline: boolean
  userRole: "owner" | "renter"
  onBack: () => void
}

export function ChatHeader({ userName, userAvatar, isOnline, userRole, onBack }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
            <AvatarFallback>{userName[0]}</AvatarFallback>
          </Avatar>
          {isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{userName}</h3>
            <Badge variant={userRole === "owner" ? "default" : "secondary"} className="text-xs">
              {userRole === "owner" ? "Chủ xe" : "Người thuê"}
            </Badge>
          </div>
          <p className="text-sm text-gray-500">{isOnline ? "Đang hoạt động" : "Hoạt động 2 giờ trước"}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Video className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Xem thông tin</DropdownMenuItem>
            <DropdownMenuItem>Báo cáo</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Chặn người dùng</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
