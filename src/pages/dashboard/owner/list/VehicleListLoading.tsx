export default function VehicleListLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="w-64 h-8 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="w-96 h-4 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Progress bar skeleton */}
        <div className="w-full py-6 mb-8">
          <div className="flex items-center justify-between">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                {i < 2 && <div className="flex-1 h-0.5 mx-4 bg-gray-200 animate-pulse" />}
              </div>
            ))}
          </div>
        </div>

        {/* Form skeleton */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mb-6" />

          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="space-y-2">
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-full h-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Navigation buttons skeleton */}
        <div className="flex justify-between mt-8">
          <div className="w-24 h-10 bg-gray-200 rounded animate-pulse" />
          <div className="w-24 h-10 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}
