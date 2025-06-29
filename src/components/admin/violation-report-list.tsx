import { useEffect, useState } from "react";
import { useApp } from "@/contexts/app-context";
import ViolationItemCard from "@/components/admin/violation-item-card";
import {
  getViolationReports,
  markReportResolved,
} from "../api/dashboardService";

interface ViolationReport {
  id: string;
  reporter: string;
  reporterName: string;
  reported: string;
  reportedName: string;
  content: string;
  time: string;
  status: "pending" | "resolved";
  type: "harassment" | "fraud" | "damage" | "other";
}

export default function ViolationReportList() {
  const { t } = useApp();
  const [reports, setReports] = useState<ViolationReport[]>([]);

  useEffect(() => {
    getViolationReports()
      .then(setReports)
      .catch((err) => {
        console.error("Failed to fetch reports:", err);
      });
  }, []);

  const handleMarkResolved = async (reportId: number) => {
    try {
      await markReportResolved(reportId);
      setReports((prev) =>
        prev.map((r) =>
          r.id === reportId.toString() ? { ...r, status: "resolved" } : r
        )
      );
    } catch (err) {
      console.error("Failed to mark resolved:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {t("admin.violations.title")}
        </h1>
        <p className="text-gray-600">{t("admin.violations.subtitle")}</p>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <ViolationItemCard
            key={report.id}
            report={report}
            onMarkResolved={handleMarkResolved}
          />
        ))}
      </div>
    </div>
  );
}
