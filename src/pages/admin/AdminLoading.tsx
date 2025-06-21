import { FC } from "react"

const AdminLoading: FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/5 bg-gray-800 p-4">
        <div className="space-y-4">
          <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-4/5 p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLoading
