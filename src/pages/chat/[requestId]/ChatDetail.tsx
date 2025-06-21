

import { FC, useState, useEffect, useRef } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChatHeader } from "@/components/chat/chat-header"
import { ChatMessageBubble } from "@/components/chat/chat-message-bubble"
import { TypingIndicator } from "@/components/chat/typing-indicator"
import { TimeGroupLabel } from "@/components/chat/time-group-label"
import { MessageInput } from "@/components/chat/message-input"
import { format, isSameDay } from "date-fns"

type ChatMessage = {
  id: string
  senderId: string
  text: string
  timestamp: string
  isOwner: boolean
  senderName: string
  senderAvatar?: string
}

type RentalInfo = {
  id: string
  vehicleName: string
  startDate: string
  endDate: string
  status: "pending" | "approved" | "active" | "completed"
  totalAmount: number
}

// Mock data
const mockRentalInfo: RentalInfo = {
  id: "1",
  vehicleName: "Honda Air Blade 150",
  startDate: "2024-01-20",
  endDate: "2024-01-22",
  status: "approved",
  totalAmount: 350000,
}

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    senderId: "owner1",
    text: "Chào bạn! Cảm ơn bạn đã quan tâm đến xe của tôi.",
    timestamp: "2024-01-15T09:00:00Z",
    isOwner: true,
    senderName: "Nguyễn Văn A",
    senderAvatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    senderId: "renter1",
    text: "Chào anh! Em muốn hỏi xe có sẵn vào ngày 20/1 không ạ?",
    timestamp: "2024-01-15T09:05:00Z",
    isOwner: false,
    senderName: "Trần Thị B",
    senderAvatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    senderId: "owner1",
    text: "Có bạn ạ. Xe đang rảnh vào thời gian đó. Bạn cần thuê bao nhiêu ngày?",
    timestamp: "2024-01-15T09:07:00Z",
    isOwner: true,
    senderName: "Nguyễn Văn A",
    senderAvatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    senderId: "renter1",
    text: "Em cần thuê 2 ngày từ 20-22/1 ạ. Xe có đầy xăng không anh?",
    timestamp: "2024-01-15T09:10:00Z",
    isOwner: false,
    senderName: "Trần Thị B",
    senderAvatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    senderId: "owner1",
    text: "Có bạn ạ. Anh sẽ giao xe đầy xăng và sạch sẽ. Địa điểm giao xe ở đâu bạn?",
    timestamp: "2024-01-15T09:15:00Z",
    isOwner: true,
    senderName: "Nguyễn Văn A",
    senderAvatar: "/placeholder.svg?height=32&width=32",
  },
]

const mockCurrentUser = {
  id: "renter1",
  name: "Trần Thị B",
  avatar: "/placeholder.svg?height=32&width=32",
  role: "renter" as "renter" | "owner",
}

const mockOtherUser = {
  id: "owner1",
  name: "Nguyễn Văn A",
  avatar: "/placeholder.svg?height=32&width=32",
  role: "owner" as const,
  isOnline: true,
}

const ChatDetail: FC = () => {
  const navigate = useNavigate()
  const { requestId } = useParams()
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [isTyping, setIsTyping] = useState(false)
  const [otherUserTyping, setOtherUserTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, otherUserTyping])

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: mockCurrentUser.id,
      text,
      timestamp: new Date().toISOString(),
      isOwner: mockCurrentUser.role === "owner",
      senderName: mockCurrentUser.name,
      senderAvatar: mockCurrentUser.avatar,
    }

    setMessages((prev) => [...prev, newMessage])

    // Simulate other user response (for demo)
    setTimeout(() => {
      setOtherUserTyping(true)
      setTimeout(() => {
        setOtherUserTyping(false)
        const responseMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          senderId: mockOtherUser.id,
          text: "Cảm ơn bạn! Tôi sẽ phản hồi sớm nhất có thể.",
          timestamp: new Date().toISOString(),
          isOwner: mockOtherUser.role === "owner",
          senderName: mockOtherUser.name,
          senderAvatar: mockOtherUser.avatar,
        }
        setMessages((prev) => [...prev, responseMessage])
      }, 2000)
    }, 1000)
  }

  const handleTyping = (typing: boolean) => {
    setIsTyping(typing)
  }

  const groupMessagesByDate = (messages: ChatMessage[]) => {
    const groups: { date: Date; messages: ChatMessage[] }[] = []

    messages.forEach((message) => {
      const messageDate = new Date(message.timestamp)
      const existingGroup = groups.find((group) => isSameDay(group.date, messageDate))

      if (existingGroup) {
        existingGroup.messages.push(message)
      } else {
        groups.push({ date: messageDate, messages: [message] })
      }
    })

    return groups
  }

  const messageGroups = groupMessagesByDate(messages)

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Mobile back button */}
      <div className="md:hidden flex items-center gap-3 p-4 bg-white border-b">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-semibold">Trò chuyện</h1>
      </div>

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Sidebar - Rental Info (Desktop) */}
        <div className="hidden lg:block w-80 bg-white border-r">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-900">Thông tin chuyến thuê</h2>
          </div>

          <div className="p-4">
            <Card>
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-medium text-gray-900">{mockRentalInfo.vehicleName}</h3>
                  <p className="text-sm text-gray-600">Mã đơn: #{mockRentalInfo.id}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày thuê:</span>
                    <span>{format(new Date(mockRentalInfo.startDate), "dd/MM/yyyy")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày trả:</span>
                    <span>{format(new Date(mockRentalInfo.endDate), "dd/MM/yyyy")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng tiền:</span>
                    <span className="font-medium text-blue-600">{mockRentalInfo.totalAmount.toLocaleString()}đ</span>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to={`/rental/${mockRentalInfo.id}`}>
                    <Info className="h-4 w-4 mr-2" />
                    Xem chi tiết
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <ChatHeader
            userName={mockOtherUser.name}
            userAvatar={mockOtherUser.avatar}
            isOnline={mockOtherUser.isOnline}
            userRole={mockOtherUser.role}
            onBack={() => navigate(-1)}
          />

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {messageGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <TimeGroupLabel date={group.date} />
                {group.messages.map((message, index) => {
                  const isCurrentUser = message.senderId === mockCurrentUser.id
                  const showAvatar =
                    index === group.messages.length - 1 || group.messages[index + 1]?.senderId !== message.senderId

                  return (
                    <ChatMessageBubble
                      key={message.id}
                      message={message}
                      isCurrentUser={isCurrentUser}
                      showAvatar={showAvatar}
                    />
                  )
                })}
              </div>
            ))}

            {/* Typing Indicator */}
            {otherUserTyping && <TypingIndicator userName={mockOtherUser.name} userAvatar={mockOtherUser.avatar} />}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <MessageInput
            onSendMessage={handleSendMessage}
            onTyping={handleTyping}
            placeholder={`Nhắn tin cho ${mockOtherUser.name}...`}
          />
        </div>
      </div>
    </div>
  )
}

export default ChatDetail
