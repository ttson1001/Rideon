import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Search, Send, MoreVertical } from "lucide-react"
import { format } from "date-fns"

interface ChatConversation {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  userRole: "owner" | "renter"
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  status: "active" | "resolved" | "pending"
  priority: "low" | "medium" | "high"
  subject: string
}

interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  isAdmin: boolean
}

export default function AdminChat() {
  const { t } = useApp()
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [newMessage, setNewMessage] = useState("")

  const [conversations, setConversations] = useState<ChatConversation[]>([
    {
      id: "chat1",
      userId: "user123",
      userName: "Nguyễn Văn A",
      userAvatar: "/placeholder.svg?height=40&width=40",
      userRole: "owner",
      lastMessage: "Admin ơi, em cần hỗ trợ về vấn đề thanh toán",
      lastMessageTime: "2024-01-15T10:30:00Z",
      unreadCount: 3,
      status: "pending",
      priority: "high",
      subject: "Vấn đề thanh toán",
    },
    {
      id: "chat2",
      userId: "user456",
      userName: "Trần Thị B",
      userAvatar: "/placeholder.svg?height=40&width=40",
      userRole: "renter",
      lastMessage: "Cảm ơn admin đã hỗ trợ!",
      lastMessageTime: "2024-01-15T09:15:00Z",
      unreadCount: 0,
      status: "resolved",
      priority: "low",
      subject: "Khiếu nại về chủ xe",
    },
    {
      id: "chat3",
      userId: "user789",
      userName: "Lê Văn C",
      userAvatar: "/placeholder.svg?height=40&width=40",
      userRole: "owner",
      lastMessage: "Xe của em bị từ chối duyệt, lý do là gì ạ?",
      lastMessageTime: "2024-01-15T08:45:00Z",
      unreadCount: 1,
      status: "active",
      priority: "medium",
      subject: "Xe bị từ chối duyệt",
    },
  ])

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg1",
      senderId: "user123",
      senderName: "Nguyễn Văn A",
      content: "Chào admin, em có vấn đề về thanh toán cần hỗ trợ ạ",
      timestamp: "2024-01-15T10:00:00Z",
      isAdmin: false,
    },
    {
      id: "msg2",
      senderId: "admin",
      senderName: "Admin",
      content: "Chào bạn! Tôi sẽ hỗ trợ bạn. Bạn có thể mô tả chi tiết vấn đề không?",
      timestamp: "2024-01-15T10:05:00Z",
      isAdmin: true,
    },
    {
      id: "msg3",
      senderId: "user123",
      senderName: "Nguyễn Văn A",
      content: "Em đã hoàn thành chuyến thuê nhưng chưa nhận được tiền từ hệ thống ạ",
      timestamp: "2024-01-15T10:10:00Z",
      isAdmin: false,
    },
  ])

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: "admin",
      senderName: "Admin",
      content: newMessage,
      timestamp: new Date().toISOString(),
      isAdmin: true,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Update conversation last message
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedChat
          ? {
              ...conv,
              lastMessage: newMessage,
              lastMessageTime: new Date().toISOString(),
              status: "active" as const,
            }
          : conv,
      ),
    )
  }

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "destructive",
      medium: "default",
      low: "secondary",
    }

    return (
      <Badge variant={variants[priority as keyof typeof variants] as any} className="text-xs">
        {priority === "high" ? "Cao" : priority === "medium" ? "TB" : "Thấp"}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "destructive",
      active: "default",
      resolved: "secondary",
    }

    const labels = {
      pending: "Chờ xử lý",
      active: "Đang xử lý",
      resolved: "Đã giải quyết",
    }

    return (
      <Badge variant={variants[status as keyof typeof variants] as any} className="text-xs">
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <MessageSquare className="h-8 w-8 text-blue-600" />
          {t("admin.chat.title")}
        </h1>
        <p className="text-gray-600">{t("admin.chat.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Chat List */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{t("admin.chat.conversations")}</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={t("admin.chat.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 max-h-[500px] overflow-y-auto">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 border-b transition-colors ${
                      selectedChat === conv.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conv.userAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{conv.userName[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm truncate">{conv.userName}</h4>
                          <div className="flex items-center gap-1">
                            {getPriorityBadge(conv.priority)}
                            {conv.unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {conv.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 mb-1 font-medium">{conv.subject}</p>
                        <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">
                            {format(new Date(conv.lastMessageTime), "HH:mm")}
                          </span>
                          {getStatusBadge(conv.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Messages */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            {selectedChat ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={conversations.find((c) => c.id === selectedChat)?.userAvatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>{conversations.find((c) => c.id === selectedChat)?.userName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{conversations.find((c) => c.id === selectedChat)?.userName}</h3>
                        <p className="text-sm text-gray-600">
                          {conversations.find((c) => c.id === selectedChat)?.subject}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.isAdmin ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.isAdmin ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.isAdmin ? "text-blue-100" : "text-gray-500"}`}>
                            {format(new Date(message.timestamp), "HH:mm")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nhập tin nhắn..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">{t("admin.chat.selectChat")}</h3>
                  <p>{t("admin.chat.selectChatDesc")}</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
