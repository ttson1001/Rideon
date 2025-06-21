import { FC } from "react"

const ChatDetailLoading: FC = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <div className="flex-1 flex flex-col bg-white">
          {/* Header skeleton */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex-1">
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="w-24 h-3 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Messages skeleton */}
          <div className="flex-1 p-4 space-y-4">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className={`flex gap-3 ${i % 2 === 0 ? "" : "flex-row-reverse"}`}>
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                <div className="flex flex-col max-w-[70%]">
                  <div
                    className={`w-48 h-10 bg-gray-200 rounded-2xl animate-pulse ${i % 2 === 0 ? "rounded-bl-md" : "rounded-br-md"}`}
                  />
                  <div className="w-16 h-3 bg-gray-200 rounded animate-pulse mt-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Input skeleton */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-200 rounded animate-pulse" />
              <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse" />
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatDetailLoading
