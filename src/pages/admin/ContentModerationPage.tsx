
import React from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import ContentModeration from "@/components/admin/ContentModeration";

const ContentModerationPage = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-7xl mx-auto">
        <AdminHeader />
        <ContentModeration />
      </div>
    </div>
  );
};

export default ContentModerationPage;
