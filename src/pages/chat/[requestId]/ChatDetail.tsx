import { FC, useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessageBubble } from "@/components/chat/chat-message-bubble";
import { TimeGroupLabel } from "@/components/chat/time-group-label";
import { MessageInput } from "@/components/chat/message-input";
import { isSameDay } from "date-fns";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import axios from "axios";
import { getUserById } from "@/components/api/dashboardService";

const BASE_URL = "http://14.225.217.181:8080";

interface ChatMessage {
  senderId: number;
  receiverId: number;
  text: string;
  timestamp: string;
}

const ChatDetail: FC = () => {
  const { bookingId, senderId, receiverId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUserId = Number(senderId);
  const otherUserId = Number(receiverId);

  const currentUser = {
    id: currentUserId,
    name: `User ${currentUserId}`,
    avatar: "/placeholder.svg",
    role: "renter" as "renter" | "owner",
  };

  const [otherUser, setOtherUser] = useState<{
    id: number;
    name: string;
    avatar: string;
    role: string;
    isOnline: boolean;
  }>({
    id: 0,
    name: "Người dùng",
    avatar: "/placeholder.svg",
    role: "renter", // hoặc "owner" tùy vai trò mặc định
    isOnline: false,
  });
  useEffect(() => {
    if (!otherUserId) return;

    const loadUser = async () => {
      try {
        const user = await getUserById(otherUserId);
        setOtherUser({
          id: user.id,
          name: user.name,
          avatar: user.avatarUrl || "/placeholder.svg",
          role: user.role,
          isOnline: true, // Nếu có trạng thái thật thì dùng thay thế
        });
      } catch (error) {
        console.error("Failed to load other user", error);
      }
    };

    loadUser();
  }, [otherUserId]);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/messages/between/${currentUserId}/${otherUserId}`)
      .then((res) => setMessages(res.data))
      .catch(console.error);
  }, [senderId, receiverId]);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(
        `${BASE_URL}/chathub?senderId=${currentUserId}&receiverId=${otherUserId}`
      )
      .withAutomaticReconnect()
      .build();

    connect.on("ReceiveMessage", (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    connect
      .start()
      .then(() => setConnection(connect))
      .catch(console.error);

    return () => {
      connect.stop();
    };
  }, [bookingId]);

  const handleSendMessage = async (text: string) => {
    if (!connection) return;

    const message = {
      senderId: currentUser.id,
      receiverId: otherUser.id,
      text: text,
    };

    try {
      await connection.invoke(
        "SendMessage",
        message.senderId,
        message.receiverId,
        message.text
      );

      await axios.post(`${BASE_URL}/api/messages`, message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const groupMessagesByDate = (messages: ChatMessage[]) => {
    const groups: { date: Date; messages: ChatMessage[] }[] = [];
    messages.forEach((m) => {
      const d = new Date(m.timestamp);
      const group = groups.find((g) => isSameDay(g.date, d));
      if (group) group.messages.push(m);
      else groups.push({ date: d, messages: [m] });
    });
    return groups;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [booking, setBooking] = useState<{
    vehicleName: string;
    totalAmount: number;
  }>({ vehicleName: "", totalAmount: 0 });

  useEffect(() => {
    if (!Number(bookingId)) return;
    axios
      .get(`${BASE_URL}/api/bookings/${bookingId}`)
      .then((res) => {
        const data = res.data;
        setBooking({
          vehicleName: data.vehicleName,
          totalAmount: data.totalAmount,
        });
      })
      .catch(console.error);
  }, [bookingId]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="md:hidden flex items-center gap-3 p-4 bg-white border-b">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-semibold">Trò chuyện</h1>
      </div>

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {Number(bookingId) ? (
          <div className="hidden lg:block w-80 bg-white border-r">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-gray-900">
                Thông tin chuyến thuê
              </h2>
            </div>
            <div className="p-4">
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {booking.vehicleName || "Đang tải..."}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Mã đơn: #{bookingId}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng tiền:</span>
                    <span className="text-blue-600 font-semibold">
                      {booking.totalAmount.toLocaleString()}đ
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <Link to={`/rental/${bookingId}`}>
                      <Info className="h-4 w-4 mr-2" /> Xem chi tiết
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="flex-1 flex flex-col bg-white">
          <ChatHeader
            userName={otherUser.name}
            userAvatar={otherUser.avatar}
            isOnline={otherUser.isOnline}
            userRole={otherUser.role as "renter" | "owner"}
            onBack={() => navigate(-1)}
          />

          <div className="overflow-y-auto p-4 space-y-1 min-h-[300px] max-h-[calc(100vh-220px)]">
            {groupMessagesByDate(messages).map((group, index) => (
              <div key={index}>
                <TimeGroupLabel date={group.date} />
                {group.messages.map((msg, i) => (
                  <ChatMessageBubble
                    key={i}
                    message={{
                      id: `${index}-${i}`,
                      senderId: msg.senderId.toString(),
                      text: msg.text,
                      timestamp: msg.timestamp,
                      isOwner: msg.senderId === otherUser.id,
                      senderName:
                        msg.senderId === currentUser.id
                          ? currentUser.name
                          : otherUser.name,
                      senderAvatar:
                        msg.senderId === currentUser.id
                          ? currentUser.avatar
                          : otherUser.avatar,
                    }}
                    isCurrentUser={msg.senderId === currentUser.id}
                    showAvatar={true}
                  />
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <MessageInput
            onSendMessage={handleSendMessage}
            onTyping={() => {}}
            placeholder={`Nhắn tin cho ${otherUser.name}...`}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
