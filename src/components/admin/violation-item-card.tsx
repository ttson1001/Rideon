
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, AlertTriangle, Shield, DollarSign, HelpCircle } from "lucide-react"

interface ViolationReport {
  id: string
  reporter: string
  reported: string
  content: string
  time: string
  status: "pending" | "resolved"
  type: "harassment" | "fraud" | "damage" | "other"
}

interface ViolationItemCardProps {
  report: ViolationReport
  onMarkResolved: (reportId: string) => void
}

export default function ViolationItemCard({ report, onMarkResolved }: ViolationItemCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "harassment":
        return <AlertTriangle className="h-4 w-4" />
      case "fraud":
        return <Shield className="h-4 w-4" />
      case "damage":
        return <DollarSign className="h-4 w-4" />
      default:
        return <HelpCircle className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "harassment":
        return "Quấy rối"
      case "fraud":
        return "Lừa đảo"
      case "damage":
        return "Hư hỏng"
      default:
        return "Khác"
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "harassment":
        return "bg-red-100 text-red-800"
      case "fraud":
        return "bg-orange-100 text-orange-800"
      case "damage":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <Badge className={getTypeBadgeColor(report.type)}>
            {getTypeIcon(report.type)}
            <span className="ml-1">{getTypeLabel(report.type)}</span>
          </Badge>
          <Badge
            variant={report.status === "resolved" ? "default" : "secondary"}
            className={report.status === "resolved" ? "bg-green-100 text-green-800" : ""}
          >
            {report.status === "pending" ? "Chờ xử lý" : "Đã xử lý"}
          </Badge>
        </div>
        <span className="text-sm text-gray-500">{report.time}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Người báo cáo</label>
          <p className="text-sm font-semibold">{report.reporter}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Người bị báo cáo</label>
          <p className="text-sm font-semibold">{report.reported}</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-500">Nội dung tố cáo</label>
        <p className="text-sm text-gray-700 mt-1 p-3 bg-gray-50 rounded-lg">{report.content}</p>
      </div>

      {report.status === "pending" && (
        <div className="flex justify-end">
          <Button size="sm" onClick={() => onMarkResolved(report.id)} className="bg-green-600 hover:bg-green-700">
            <Check className="h-4 w-4 mr-2" />
            Đánh dấu đã xử lý
          </Button>
        </div>
      )}
    </div>
  )
}
