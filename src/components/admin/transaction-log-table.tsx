import { useEffect, useState } from "react";
import axios from "axios";
import { useApp } from "@/contexts/app-context";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/admin/status-badge";
import ReleaseFundsButton from "@/components/admin/release-funds-button";

interface Transaction {
  id: string;
  renter: string;
  owner: string;
  rentalFee: number;
  platformFee: number;
  amountToOwner: number;
  date: string;
  status: "completed" | "canceled" | "refunded";
  vehicleName: string;
  commissionRate: number;
}

interface BookingDetailDto {
  id: number;
  status: string;
  vehicle: { name: string };
  owner: { name: string };
  renter: { name: string };
  rental: { startDate: string; endDate: string };
  pricing: {
    totalRental: number;
    serviceFee: number;
    insurance: number;
    deposit: number;
    dailyRate: number;
  };
}

const BASE_URL = "http://14.225.217.181:8080";

export default function TransactionLogTable() {
  const { t } = useApp();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/bookings/detail/transactions`
        );
        const data: BookingDetailDto[] = res.data.data;

        const mapped = data.map((b) => {
          const rentalFee = b.pricing.totalRental;
          const commissionRate = 20;
          const platformFee = Math.round(rentalFee * (commissionRate / 100));
          const amountToOwner = rentalFee - platformFee;

          return {
            id: b.id.toString(),
            renter: b.renter.name,
            owner: b.owner.name,
            rentalFee,
            platformFee,
            amountToOwner,
            date: b.rental.startDate.split("T")[0],
            status: b.status as Transaction["status"],
            vehicleName: b.vehicle.name,
            commissionRate,
          };
        });

        setTransactions(mapped);
      } catch (err) {
        console.error("Lỗi khi tải transaction list:", err);
      }
    };

    fetchTransactions();
  }, []);

  const handleReleaseFunds = (transactionId: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === transactionId ? { ...t, status: "completed" } : t
      )
    );
  };

  const handleRefund = (transactionId: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === transactionId ? { ...t, status: "refunded" } : t
      )
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {t("admin.transactions.title")}
        </h1>
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
                      <div className="text-sm font-medium text-gray-900">
                        #{transaction.id}
                      </div>
                      <div className="text-sm text-gray-500">
                        {transaction.vehicleName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.renter}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.owner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {transaction.rentalFee.toLocaleString()}₫
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-orange-600">
                      {transaction.platformFee.toLocaleString()}₫
                    </div>
                    <div className="text-xs text-gray-500">
                      ({transaction.commissionRate}%)
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-green-600">
                      {transaction.amountToOwner.toLocaleString()}₫
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {transaction.status === "completed" ? (
                      <>
                        <ReleaseFundsButton
                          onRelease={() => handleReleaseFunds(transaction.id)}
                        />
                      </>
                    ) : transaction.status === "refunded" ? (
                      <span className="text-sm text-red-500 font-medium">
                        Đã hoàn tiền
                      </span>
                    ) : transaction.status === "canceled" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRefund(transaction.id)}
                      >
                        Hoàn tiền
                      </Button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
