import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, CheckCheck, Trash2, ExternalLink } from "lucide-react"
import { format } from "date-fns"

interface AdminNotification {
  id: string
  type: "vehicle_submitted" | "user_reported" | "transaction_issue" | "system_alert" | "owner_message"
  title: string
  content: string
  timestamp: string
  isRead: boolean
  priority: "low" | "medium" | "high" | "urgent"
  actionUrl?: string
  metadata?: {
    userId?: string
    vehicleId?: string
    transactionId?: string
    reportId?: string
  }
}

export default function AdminNotifications() {
  const { t } = useApp()
  const [filter, setFilter] = useState("all")
  const [notifications, setNotifications] = useState<AdminNotification[]>([
    {
      id: "1",
      type: "vehicle_submitted",
      title: "Xe mới cần duyệt",
      content: "Chủ xe Nguyễn Văn A đã đăng xe Honda Air Blade 150 cần được duyệt",
      timestamp: "2024-01-15T10:30:00Z",
      isRead: false,
      priority: "high",
      actionUrl: "/admin?tab=pending-vehicles",
      metadata: { userId: "user123", vehicleId: "vehicle456" },
    },
    {
      id: "2",
      type: "user_reported",
      title: "Báo cáo vi phạm mới",
      content: "Người dùng Trần Thị B báo cáo chủ xe Lê Văn C về hành vi lừa đảo",
      timestamp: "2024-01-15T09:15:00Z",
      isRead: false,
      priority: "urgent",
      actionUrl: "/admin?tab=violations",
      metadata: { reportId: "report789" },
    },
    {
      id: "3",
      type: "transaction_issue",
      title: "Giao dịch cần xử lý",
      content: "Giao dịch #TXN123 có vấn đề cần admin can thiệp - số tiền 500,000₫",
      timestamp: "2024-01-15T08:45:00Z",
      isRead: true,
      priority: "high",
      actionUrl: "/admin?tab=transactions",
      metadata: { transactionId: "txn123" },
    },
    {
      id: "4",
      type: "owner_message",
      title: "Tin nhắn từ chủ xe",
      content: "Chủ xe Phạm Văn D cần hỗ trợ về vấn đề thanh toán",
      timestamp: "2024-01-15T07:20:00Z",
      isRead: false,
      priority: "medium",
      actionUrl: "/admin?tab=chat",
      metadata: { userId: "user456" },
    },
    {
      id: "5",
      type: "system_alert",
      title: "Cảnh báo hệ thống",
      content: "Phát hiện hoạt động bất thường: 5 tài khoản mới đăng ký trong 10 phút",
      timestamp: "2024-01-14T22:30:00Z",
      isRead: true,
      priority: "medium",
    },
  ])

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.isRead
    if (filter === "urgent") return notif.priority === "urgent"
    if (filter === "high") return notif.priority === "high"
    return true
  })

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getPriorityBadge = (priority: string) => {
    const variants = {
      urgent: "destructive",
      high: "default",
      medium: "secondary",
      low: "outline",
    }

    const labels = {
      urgent: t("admin.notifications.priority.urgent"),
      high: t("admin.notifications.priority.high"),
      medium: t("admin.notifications.priority.medium"),
      low: t("admin.notifications.priority.low"),
    }

    return (
      <Badge variant={variants[priority as keyof typeof variants] as any}>
        {labels[priority as keyof typeof labels]}
      </Badge>
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vehicle_submitted":
        return "🚗"
      case "user_reported":
        return "⚠️"
      case "transaction_issue":
        return "💳"
      case "owner_message":
        return "💬"
      case "system_alert":
        return "🔔"
      default:
        return "📩"
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Bell className="h-8 w-8 text-blue-600" />
              {t("admin.notifications.title")}
            </h1>
            <p className="text-gray-600">
              {notifications.filter((n) => !n.isRead).length > 0
                ? t(`admin.notifications.subtitle.unread.${notifications.filter((n) => !n.isRead).length}`)
                : t("admin.notifications.subtitle.allRead")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              <CheckCheck className="h-4 w-4 mr-2" />
              {t("admin.notifications.markAll")}
            </Button>
          </div>
        </div>

        <div className="flex space-x-4 mb-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder={t("admin.notifications.filter.placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("admin.notifications.filter.all")}</SelectItem>
              <SelectItem value="unread">{t("admin.notifications.filter.unread")}</SelectItem>
              <SelectItem value="urgent">{t("admin.notifications.filter.urgent")}</SelectItem>
              <SelectItem value="high">{t("admin.notifications.filter.high")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${
              !notification.isRead ? "bg-blue-50 border-blue-200 border-l-blue-500" : "border-l-gray-200"
            }`}
            onClick={() => {
              if (!notification.isRead) handleMarkAsRead(notification.id)
              if (notification.actionUrl) {
                // Navigate to action URL
                console.log("Navigate to:", notification.actionUrl)
              }
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="text-2xl">{getTypeIcon(notification.type)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className={`font-medium text-gray-900 ${!notification.isRead ? "font-semibold" : ""}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(notification.priority)}
                      {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{notification.content}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {format(new Date(notification.timestamp), "dd/MM/yyyy HH:mm")}
                    </span>

                    <div className="flex items-center gap-2">
                      {notification.actionUrl && (
                        <div className="flex items-center gap-1 text-xs text-blue-600">
                          <ExternalLink className="h-3 w-3" />
                          <span>{t("admin.notifications.viewDetails")}</span>
                        </div>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(notification.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredNotifications.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-500">
                <Bell className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">{t("admin.notifications.empty.title")}</h3>
                <p className="text-gray-500">{t("admin.notifications.empty.description")}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
