
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Users,
  Flag,
  MessageSquare,
  Settings,
  ChevronRight,
} from "lucide-react";

const AdminHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const adminNavItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: Shield,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Content",
      href: "/admin/content",
      icon: Flag,
    },
    {
      name: "Community",
      href: "/admin/community",
      icon: MessageSquare,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="bg-secondary/30 py-3 px-4 sm:px-6 lg:px-8 mb-6 rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center pb-3 sm:pb-0">
          <Shield className="h-5 w-5 text-primary mr-2" />
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link to="/admin" className="hover:text-foreground transition-colors">
              Admin
            </Link>
            {currentPath !== "/admin" && (
              <>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-foreground">
                  {adminNavItems.find(item => item.href === currentPath)?.name || 
                   currentPath.split('/').pop()?.charAt(0).toUpperCase() + currentPath.split('/').pop()?.slice(1)}
                </span>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center overflow-x-auto pb-1 sm:pb-0 gap-1 sm:gap-2">
          {adminNavItems.map((item) => (
            <Button
              key={item.href}
              variant={currentPath === item.href ? "default" : "ghost"}
              size="sm"
              asChild
              className="whitespace-nowrap"
            >
              <Link to={item.href} className="flex items-center">
                <item.icon className="h-4 w-4 mr-1 sm:mr-2" />
                <span>{item.name}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
