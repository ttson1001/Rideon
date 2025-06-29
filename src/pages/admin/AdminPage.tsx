import { FC, useState } from "react";
import AdminSidebar from "../../components/admin/admin-sidebar";
import PendingVehicleTable from "../../components/admin/pending-vehicle-table";
import UserManagementTable from "../../components/admin/user-management-table";
import TransactionLogTable from "../../components/admin/transaction-log-table";
import ViolationReportList from "../../components/admin/violation-report-list";
import AdminDashboard from "../../components/admin/admin-dashboard";
import AdminNotifications from "../../components/admin/admin-notifications";
import AdminChat from "../../components/admin/admin-chat";
import ContractManagement from "../../components/admin/contract-management";

const AdminPage: FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "contracts":
        return <ContractManagement />;
      case "notifications":
        return <AdminNotifications />;
      case "chat":
        return <AdminChat />;
      case "pending-vehicles":
        return <PendingVehicleTable />;
      case "users":
        return <UserManagementTable />;
      case "transactions":
        return <TransactionLogTable />;
      case "violations":
        return <ViolationReportList />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="w-4/5 p-6">
        <div className="bg-white rounded-lg shadow min-h-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
