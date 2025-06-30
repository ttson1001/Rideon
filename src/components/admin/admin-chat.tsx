import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";
import { isSameDay } from "date-fns";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import axios from "axios";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessageBubble } from "@/components/chat/chat-message-bubble";
import { TimeGroupLabel } from "@/components/chat/time-group-label";
import { MessageInput } from "@/components/chat/message-input";
import { API_BASE_URL, BASE_URL } from "../api/dashboardService";

interface ChatConversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userRole: "owner" | "renter";
}

interface ChatMessage {
  senderId: number;
  receiverId: number;
  text: string;
  timestamp: string;
  isLocal?: boolean;
}

export default function AdminChat() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const currentUserId = parseInt(localStorage.getItem("userId") || "0");
  const [conversations, setConversations] = useState<ChatConversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/messages/admin/users`);
        const data = res.data.data;

        const mapped: ChatConversation[] = data.map((u: any) => ({
          id: u.id,
          userId: u.userId,
          userName: u.userName,
          userAvatar: u.userAvatar,
          userRole: "owner",
        }));

        setConversations(mapped);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách cuộc trò chuyện:", err);
      }
    };

    fetchConversations();
  }, []);
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const filteredConversations = conversations.filter((conv) =>
    conv.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!selectedChat) return;

    const connect = new HubConnectionBuilder()
      .withUrl(
        `${BASE_URL}/chathub?senderId=${currentUserId}&receiverId=${selectedChat}`
      )
      .withAutomaticReconnect()
      .build();

    connect.on("ReceiveMessage", (message: ChatMessage) => {
      setMessages((prev) => {
        const isDuplicate = prev.some(
          (m) =>
            m.text === message.text &&
            m.senderId === message.senderId &&
            Math.abs(
              new Date(m.timestamp).getTime() -
                new Date(message.timestamp).getTime()
            ) < 1000
        );
        return isDuplicate ? prev : [...prev, message];
      });
    });

    connect
      .start()
      .then(() => setConnection(connect))
      .catch(console.error);

    return () => {
      connect.stop();
    };
  }, [selectedChat]);

  useEffect(() => {
    if (!selectedChat) return;

    axios
      .get(`${API_BASE_URL}/messages/between/${currentUserId}/${selectedChat}`)
      .then((res) => setMessages(res.data))
      .catch(console.error);
  }, [selectedChat]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !selectedChat || !connection) return;

    const now = new Date().toISOString();

    const messageToSend: ChatMessage = {
      senderId: currentUserId,
      receiverId: parseInt(selectedChat),
      text,
      timestamp: now,
      isLocal: true,
    };

    setMessages((prev) => [...prev, messageToSend]);

    try {
      await connection.invoke(
        "SendMessage",
        messageToSend.senderId,
        messageToSend.receiverId,
        messageToSend.text
      );

      await axios.post(`${API_BASE_URL}/messages`, messageToSend);

      setConversations((prev) =>
        prev.map((conv) =>
          conv.userId === selectedChat
            ? {
                ...conv,
                lastMessage: messageToSend.text,
                lastMessageTime: messageToSend.timestamp,
                status: "active" as const,
              }
            : conv
        )
      );
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
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const selectedConversation = conversations.find(
    (c) => c.userId === selectedChat
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <div className="hidden lg:block w-80 bg-white border-r">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-900">
              Danh sách cuộc trò chuyện
            </h2>
          </div>
          <div className="p-4">
            <Input
              placeholder="Tìm kiếm người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="mt-4 space-y-2 max-h-[70vh] overflow-y-auto">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedChat(conv.userId)}
                  className={`p-3 rounded cursor-pointer transition-colors ${
                    selectedChat === conv.userId
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={conv.userAvatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>{conv.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{conv.userName}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-white">
          {selectedChat && selectedConversation ? (
            <>
              <ChatHeader
                userName={selectedConversation.userName}
                userAvatar={
                  selectedConversation.userAvatar || "/placeholder.svg"
                }
                isOnline={true}
                userRole={selectedConversation.userRole}
                onBack={() => setSelectedChat(null)}
              />
              <div
                ref={messageListRef}
                className="overflow-y-auto p-4 space-y-1 min-h-[300px] max-h-[calc(100vh-220px)]"
              >
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
                          isOwner: msg.senderId !== currentUserId,
                          senderName:
                            msg.senderId === currentUserId
                              ? "admin"
                              : selectedConversation.userName,
                          senderAvatar:
                            msg.senderId === currentUserId
                              ? "/admin-avatar.svg"
                              : selectedConversation.userAvatar ||
                                "/placeholder.svg",
                        }}
                        isCurrentUser={msg.senderId === currentUserId}
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
                placeholder={`Nhắn tin cho ${selectedConversation.userName}...`}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
              <div className="text-center">
                <p className="text-lg font-semibold mb-2">
                  Chọn người dùng để trò chuyện
                </p>
                <p>Bạn chưa chọn cuộc trò chuyện nào</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
