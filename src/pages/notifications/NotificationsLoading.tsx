import { FC } from "react"

const NotificationsLoading: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="w-64 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div className="w-32 h-9 bg-gray-200 rounded animate-pulse" />
              <div className="w-24 h-9 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Filters skeleton */}
          <div className="flex gap-2">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </div>

        {/* Notifications skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                <div className="flex-1">
                  <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotificationsLoading
