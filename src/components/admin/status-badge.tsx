import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "completed" | "refunded" | "canceled";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          label: "Hoàn tất",
          variant: "default" as const,
          className: "bg-green-100 text-green-800 hover:bg-green-100",
        };
      case "approved":
        return {
          label: "Đang thuê",
          variant: "default" as const,
          className: "bg-blue-100 text-green-800 hover:bg-blue-100",
        };
      case "refunded":
        return {
          label: "Đã hoàn tiền",
          variant: "destructive" as const,
          className: "bg-red-100 text-red-800 hover:bg-red-100",
        };
      case "canceled":
        return {
          label: "Đã hủy",
          variant: "secondary" as const,
          className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        };
      default:
        return {
          label: status,
          variant: "secondary" as const,
          className: "",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
}
