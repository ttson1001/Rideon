import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import ViolationItemCard from "@/components/admin/violation-item-card"

interface ViolationReport {
  id: string
  reporter: string
  reported: string
  content: string
  time: string
  status: "pending" | "resolved"
  type: "harassment" | "fraud" | "damage" | "other"
}

export default function ViolationReportList() {
  const { t } = useApp()
  const [reports, setReports] = useState<ViolationReport[]>([
    {
      id: "1",
      reporter: "Nguyễn Văn A",
      reported: "Trần Thị B",
      content: "Chủ xe không giao xe đúng giờ và thái độ không tốt",
      time: "2024-01-15 14:30",
      status: "pending",
      type: "harassment",
    },
    {
      id: "2",
      reporter: "Lê Văn C",
      reported: "Phạm Thị D",
      content: "Xe không đúng như mô tả, có nhiều hư hỏng không được thông báo",
      time: "2024-01-14 09:15",
      status: "pending",
      type: "fraud",
    },
    {
      id: "3",
      reporter: "Hoàng Văn E",
      reported: "Ngô Thị F",
      content: "Người thuê làm hỏng xe và không chịu bồi thường",
      time: "2024-01-13 16:45",
      status: "resolved",
      type: "damage",
    },
  ])

  const handleMarkResolved = (reportId: string) => {
    setReports((prev) => prev.map((r) => (r.id === reportId ? { ...r, status: "resolved" as const } : r)))
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t("admin.violations.title")}</h1>
        <p className="text-gray-600">{t("admin.violations.subtitle")}</p>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <ViolationItemCard key={report.id} report={report} onMarkResolved={handleMarkResolved} />
        ))}
      </div>
    </div>
  )
}
