
import React from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import UserManagement from "@/components/admin/UserManagement";

const UserManagementPage = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-7xl mx-auto">
        <AdminHeader />
        <UserManagement />
      </div>
    </div>
  );
};

export default UserManagementPage;
