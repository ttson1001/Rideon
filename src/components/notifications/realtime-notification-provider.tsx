

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"
import type { Notification } from "./notification-item"

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Notification) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider")
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
  userId: string
  initialNotifications?: Notification[]
}

export function NotificationProvider({ children, userId, initialNotifications = [] }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const { toast } = useToast()

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev])

    // Show toast for new notifications
    toast({
      title: "Thông báo mới",
      description: notification.title,
      duration: 5000,
    })
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  // Simulate real-time notifications (replace with actual WebSocket/SSE implementation)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate receiving a new notification every 30 seconds
      if (Math.random() > 0.8) {
        const newNotification: Notification = {
          id: `notification_${Date.now()}`,
          userId,
          type: "new_message",
          title: "Tin nhắn mới",
          content: "Bạn có tin nhắn mới từ chủ xe",
          timestamp: new Date().toISOString(),
          isRead: false,
          linkTo: "/chat/demo",
          metadata: {
            vehicleName: "Honda Air Blade",
            ownerName: "Demo User",
          },
        }
        addNotification(newNotification)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [userId])

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}
