import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ChatMessageBubbleProps {
  message: {
    id: string
    senderId: string
    text: string
    timestamp: string
    isOwner: boolean
    senderName: string
    senderAvatar?: string
  }
  isCurrentUser: boolean
  showAvatar?: boolean
}

export function ChatMessageBubble({ message, isCurrentUser, showAvatar = true }: ChatMessageBubbleProps) {
  const messageTime = new Date(message.timestamp)

  return (
    <div className={cn("flex gap-3 mb-4", isCurrentUser ? "flex-row-reverse" : "flex-row")}>
      {showAvatar && !isCurrentUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.senderName} />
          <AvatarFallback className="text-xs">{message.senderName[0]}</AvatarFallback>
        </Avatar>
      )}

      <div className={cn("flex flex-col max-w-[70%]", isCurrentUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "px-4 py-2 rounded-2xl break-words",
            isCurrentUser ? "bg-blue-600 text-white rounded-br-md" : "bg-gray-100 text-gray-900 rounded-bl-md",
          )}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>

        <span className="text-xs text-gray-500 mt-1 px-1">
          {formatDistanceToNow(messageTime, { addSuffix: true, locale: vi })}
        </span>
      </div>

      {showAvatar && isCurrentUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.senderName} />
          <AvatarFallback className="text-xs">{message.senderName[0]}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
