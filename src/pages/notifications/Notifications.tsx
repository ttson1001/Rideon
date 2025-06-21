
import { useState, useMemo } from "react"
import { CheckCheck, Trash2, Settings, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NotificationItem, type Notification } from "@/components/notifications/notification-item"
import { NotificationFilters } from "@/components/notifications/notification-filters"
import { useToast } from "@/hooks/use-toast"

// Mock current user - in real app, get from auth context
const mockCurrentUser = {
  id: "user123",
  role: "renter" as const, // Change to "owner" to test owner notifications
}

// Mock notifications data with new types
const mockNotifications: Notification[] = [
  // Renter notifications
  {
    id: "1",
    userId: "user123",
    type: "request_accepted",
    title: "Yêu cầu thuê được chấp nhận",
    content: "Chủ xe Nguyễn Văn A đã chấp nhận yêu cầu thuê Honda Air Blade 150 của bạn",
    timestamp: "2024-01-15T10:30:00Z",
    isRead: false,
    linkTo: "/dashboard/renter",
    metadata: {
      vehicleName: "Honda Air Blade 150",
      ownerName: "Nguyễn Văn A",
      amount: 350000,
      requestId: "req123",
    },
  },
  {
    id: "2",
    userId: "user123",
    type: "request_rejected",
    title: "Yêu cầu thuê bị từ chối",
    content: "Rất tiếc, chủ xe đã từ chối yêu cầu thuê Yamaha Exciter 155",
    timestamp: "2024-01-15T09:15:00Z",
    isRead: false,
    linkTo: "/browse",
    metadata: {
      vehicleName: "Yamaha Exciter 155",
      ownerName: "Trần Thị B",
    },
  },
  {
    id: "3",
    userId: "user123",
    type: "new_message",
    title: "Tin nhắn mới từ chủ xe",
    content: "Chủ xe Honda Vision: 'Xe đã sẵn sàng, bạn có thể đến nhận vào 9h sáng mai'",
    timestamp: "2024-01-15T08:45:00Z",
    isRead: true,
    linkTo: "/chat/chat123",
    metadata: {
      vehicleName: "Honda Vision",
      ownerName: "Lê Văn C",
      chatId: "chat123",
    },
  },
  {
    id: "4",
    userId: "user123",
    type: "reminder",
    title: "Xe sắp hết hạn thuê",
    content: "Chuyến thuê xe Honda Winner X sẽ kết thúc sau 2 giờ nữa. Vui lòng chuẩn bị trả xe.",
    timestamp: "2024-01-15T07:00:00Z",
    isRead: false,
    linkTo: "/rental/rental123",
    metadata: {
      vehicleName: "Honda Winner X",
      amount: 400000,
    },
  },

  // Owner notifications
  {
    id: "5",
    userId: "owner456",
    type: "new_request",
    title: "Yêu cầu thuê xe mới",
    content: "Trần Thị D muốn thuê SH Mode 125 từ 20/01 đến 22/01",
    timestamp: "2024-01-15T11:00:00Z",
    isRead: false,
    linkTo: "/dashboard/owner",
    metadata: {
      vehicleName: "SH Mode 125",
      requesterName: "Trần Thị D",
      amount: 500000,
      requestId: "req456",
    },
  },
  {
    id: "6",
    userId: "owner456",
    type: "admin_approved",
    title: "Xe được duyệt đăng",
    content: "Xe Yamaha Sirius 110 của bạn đã được admin duyệt và có thể cho thuê",
    timestamp: "2024-01-14T16:20:00Z",
    isRead: true,
    linkTo: "/dashboard/owner",
    metadata: {
      vehicleName: "Yamaha Sirius 110",
      vehicleId: "vehicle789",
    },
  },
  {
    id: "7",
    userId: "owner456",
    type: "new_message",
    title: "Tin nhắn từ người thuê",
    content: "Người thuê hỏi: 'Xe còn sẵn ngày mai không ạ?'",
    timestamp: "2024-01-14T14:30:00Z",
    isRead: false,
    linkTo: "/chat/chat456",
    metadata: {
      requesterName: "Phạm Văn E",
      vehicleName: "Honda Air Blade 150",
      chatId: "chat456",
    },
  },
  {
    id: "8",
    userId: "owner456",
    type: "report",
    title: "Báo cáo cần xem xét",
    content: "Hệ thống đang xem xét báo cáo liên quan đến chuyến thuê xe Honda Vision",
    timestamp: "2024-01-13T20:30:00Z",
    isRead: true,
    linkTo: "/dashboard/owner",
    metadata: {
      vehicleName: "Honda Vision",
      requestId: "req789",
    },
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(
    mockNotifications.filter((n) => n.userId === mockCurrentUser.id || n.userId === "user123"), // Show all for demo
  )
  const [activeFilter, setActiveFilter] = useState<
    | "all"
    | "unread"
    | "request_accepted"
    | "request_rejected"
    | "new_message"
    | "admin_approved"
    | "new_request"
    | "reminder"
  >("all")
  const { toast } = useToast()

  // Filter notifications based on active filter
  const filteredNotifications = useMemo(() => {
    switch (activeFilter) {
      case "unread":
        return notifications.filter((n) => !n.isRead)
      case "request_accepted":
      case "request_rejected":
      case "new_message":
      case "admin_approved":
      case "new_request":
      case "reminder":
        return notifications.filter((n) => n.type === activeFilter)
      default:
        return notifications
    }
  }, [notifications, activeFilter])

  // Calculate counts for filters
  const counts = useMemo(() => {
    return {
      all: notifications.length,
      unread: notifications.filter((n) => !n.isRead).length,
      request_accepted: notifications.filter((n) => n.type === "request_accepted").length,
      request_rejected: notifications.filter((n) => n.type === "request_rejected").length,
      new_message: notifications.filter((n) => n.type === "new_message").length,
      admin_approved: notifications.filter((n) => n.type === "admin_approved").length,
      new_request: notifications.filter((n) => n.type === "new_request").length,
      reminder: notifications.filter((n) => n.type === "reminder").length,
    }
  }, [notifications])

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
    toast({
      title: "Đã đánh dấu đã đọc",
      description: "Thông báo đã được đánh dấu là đã đọc",
    })
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    toast({
      title: "Đã đánh dấu tất cả",
      description: "Tất cả thông báo đã được đánh dấu là đã đọc",
    })
  }

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    toast({
      title: "Đã xóa thông báo",
      description: "Thông báo đã được xóa thành công",
    })
  }

  const handleClearAll = () => {
    setNotifications([])
    toast({
      title: "Đã xóa tất cả",
      description: "Tất cả thông báo đã được xóa",
    })
  }

  const handleNotificationClick = (notification: Notification) => {
    console.log("Clicked notification:", notification)
    // Navigation will be handled by the Link in NotificationItem if linkTo exists
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Bell className="h-8 w-8 text-blue-600" />
                Trung tâm thông báo
              </h1>
              <p className="text-gray-600 mt-2">
                {counts.unread > 0 ? `Bạn có ${counts.unread} thông báo chưa đọc` : "Bạn đã đọc hết thông báo"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {counts.unread > 0 && (
                <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Đánh dấu tất cả
                </Button>
              )}

              <Button variant="outline" size="sm" onClick={handleClearAll}>
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa tất cả
              </Button>

              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Cài đặt
              </Button>
            </div>
          </div>

          {/* Filters */}
          <NotificationFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
            userRole={mockCurrentUser.role}
          />
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
                onClick={handleNotificationClick}
              />
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-gray-500 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {activeFilter === "all"
                      ? "Không có thông báo"
                      : `Không có thông báo ${getFilterLabel(activeFilter)}`}
                  </h3>
                  <p className="text-gray-500">
                    {activeFilter === "all"
                      ? "Bạn sẽ nhận được thông báo khi có hoạt động mới"
                      : "Thử chọn bộ lọc khác để xem thông báo"}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        {filteredNotifications.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hành động nhanh</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="justify-start" onClick={handleMarkAllAsRead}>
                    <CheckCheck className="h-4 w-4 mr-2" />
                    Đánh dấu tất cả đã đọc
                  </Button>

                  <Button variant="outline" className="justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Cài đặt thông báo
                  </Button>

                  <Button variant="outline" className="justify-start" onClick={handleClearAll}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa tất cả thông báo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

function getFilterLabel(filter: string): string {
  const labels = {
    unread: "chưa đọc",
    request_accepted: "được chấp nhận",
    request_rejected: "bị từ chối",
    new_message: "tin nhắn",
    admin_approved: "đã duyệt",
    new_request: "yêu cầu mới",
    reminder: "nhắc nhở",
  }
  return labels[filter as keyof typeof labels] || ""
}
