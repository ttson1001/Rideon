import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import StatusBadge from "@/components/admin/status-badge"
import ReleaseFundsButton from "@/components/admin/release-funds-button"

interface Transaction {
  id: string
  renter: string
  owner: string
  rentalFee: number // Số tiền gốc
  platformFee: number // Hoa hồng
  amountToOwner: number // Tiền chuyển cho chủ xe
  date: string
  status: "escrow_pending" | "released" | "refunded"
  vehicleName: string
  commissionRate: number // Tỷ lệ hoa hồng %
}

export default function TransactionLogTable() {
  const { t } = useApp()
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      renter: "Nguyễn Văn A",
      owner: "Trần Thị B",
      rentalFee: 500000,
      platformFee: 50000,
      amountToOwner: 450000,
      date: "2024-01-15",
      status: "escrow_pending",
      vehicleName: "Honda Wave Alpha",
      commissionRate: 10,
    },
    {
      id: "2",
      renter: "Lê Văn C",
      owner: "Phạm Thị D",
      rentalFee: 750000,
      platformFee: 60000,
      amountToOwner: 690000,
      date: "2024-01-14",
      status: "released",
      vehicleName: "Yamaha Exciter",
      commissionRate: 8, // Giảm hoa hồng do owner có nhiều lượt thuê
    },
    {
      id: "3",
      renter: "Hoàng Văn E",
      owner: "Ngô Thị F",
      rentalFee: 300000,
      platformFee: 30000,
      amountToOwner: 270000,
      date: "2024-01-13",
      status: "refunded",
      vehicleName: "Honda Air Blade",
      commissionRate: 10,
    },
  ])

  const handleReleaseFunds = (transactionId: string) => {
    setTransactions((prev) => prev.map((t) => (t.id === transactionId ? { ...t, status: "released" as const } : t)))
  }

  const handleRefund = (transactionId: string) => {
    setTransactions((prev) => prev.map((t) => (t.id === transactionId ? { ...t, status: "refunded" as const } : t)))
  }

  const calculateCommission = (rentalFee: number, totalRentals: number): number => {
    // Hoa hồng linh hoạt dựa trên số lượt thuê
    if (totalRentals >= 50) return 6 // 6% cho owner VIP
    if (totalRentals >= 20) return 8 // 8% cho owner tích cực
    return 10 // 10% mặc định
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t("admin.transactions.title")}</h1>
        <p className="text-gray-600">{t("admin.transactions.subtitle")}</p>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.transactions.table.transaction")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.transactions.table.renter")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.transactions.table.owner")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.transactions.table.rentalFee")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.transactions.table.commission")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.transactions.table.amountToOwner")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.transactions.table.date")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.transactions.table.status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.transactions.table.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">#{transaction.id}</div>
                      <div className="text-sm text-gray-500">{transaction.vehicleName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.renter}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{transaction.rentalFee.toLocaleString()}₫</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-orange-600">
                      {transaction.platformFee.toLocaleString()}₫
                    </div>
                    <div className="text-xs text-gray-500">({transaction.commissionRate}%)</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-green-600">
                      {transaction.amountToOwner.toLocaleString()}₫
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {transaction.status === "escrow_pending" && (
                      <>
                        <ReleaseFundsButton onRelease={() => handleReleaseFunds(transaction.id)} />
                        <Button variant="outline" size="sm" onClick={() => handleRefund(transaction.id)}>
                          Hoàn tiền
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
