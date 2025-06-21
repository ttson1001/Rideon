import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TypingIndicatorProps {
  userName: string
  userAvatar?: string
}

export function TypingIndicator({ userName, userAvatar }: TypingIndicatorProps) {
  return (
    <div className="flex gap-3 mb-4">
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
        <AvatarFallback className="text-xs">{userName[0]}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-md">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
        <span className="text-xs text-gray-500 mt-1 px-1">{userName} đang nhập...</span>
      </div>
    </div>
  )
}
