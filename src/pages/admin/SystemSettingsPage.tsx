
import React from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import SystemSettings from "@/components/admin/SystemSettings";

const SystemSettingsPage = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-7xl mx-auto">
        <AdminHeader />
        <SystemSettings />
      </div>
    </div>
  );
};

export default SystemSettingsPage;
