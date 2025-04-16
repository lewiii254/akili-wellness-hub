
import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Shield, 
  Users, 
  Flag, 
  MessageSquare, 
  Tag, 
  Settings 
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import UserManagement from "@/components/admin/UserManagement";
import ContentModeration from "@/components/admin/ContentModeration";
import CommunityManagement from "@/components/admin/CommunityManagement";
import SystemSettings from "@/components/admin/SystemSettings";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingFlags: 0,
    totalDiscussions: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Fetch total users count
        const { count: userCount, error: userError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
          
        // Fetch pending flags count
        const { count: flagCount, error: flagError } = await supabase
          .from('content_flags')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');
          
        // Fetch discussions count
        const { count: discussionCount, error: discussionError } = await supabase
          .from('community_discussions')
          .select('*', { count: 'exact', head: true });
          
        if (userError || flagError || discussionError) {
          throw new Error('Error fetching stats');
        }
        
        setStats({
          totalUsers: userCount || 0,
          pendingFlags: flagCount || 0,
          totalDiscussions: discussionCount || 0
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
        toast({
          title: "Error loading dashboard",
          description: "Could not load administrative data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center">
              <Shield className="mr-2 h-8 w-8 text-akili-purple" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage users, content, and system settings
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card shadow-sm rounded-xl p-6 border">
            <div className="flex items-center">
              <Users className="h-10 w-10 text-akili-purple mr-3" />
              <div>
                <p className="text-muted-foreground text-sm">Total Users</p>
                <h3 className="text-2xl font-bold">{loading ? '...' : stats.totalUsers}</h3>
              </div>
            </div>
          </div>
          <div className="bg-card shadow-sm rounded-xl p-6 border">
            <div className="flex items-center">
              <Flag className="h-10 w-10 text-akili-orange mr-3" />
              <div>
                <p className="text-muted-foreground text-sm">Pending Reports</p>
                <h3 className="text-2xl font-bold">{loading ? '...' : stats.pendingFlags}</h3>
              </div>
            </div>
          </div>
          <div className="bg-card shadow-sm rounded-xl p-6 border">
            <div className="flex items-center">
              <MessageSquare className="h-10 w-10 text-akili-blue mr-3" />
              <div>
                <p className="text-muted-foreground text-sm">Community Discussions</p>
                <h3 className="text-2xl font-bold">{loading ? '...' : stats.totalDiscussions}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Main Admin Interface */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-4xl mx-auto mb-8">
            <TabsTrigger value="users" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">User Management</span>
              <span className="sm:hidden">Users</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center">
              <Flag className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Content Moderation</span>
              <span className="sm:hidden">Content</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Community</span>
              <span className="sm:hidden">Community</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">System Settings</span>
              <span className="sm:hidden">Settings</span>
            </TabsTrigger>
          </TabsList>

          <div className="bg-card border rounded-xl shadow-sm p-6">
            <TabsContent value="users">
              <UserManagement />
            </TabsContent>
            
            <TabsContent value="content">
              <ContentModeration />
            </TabsContent>
            
            <TabsContent value="community">
              <CommunityManagement />
            </TabsContent>
            
            <TabsContent value="settings">
              <SystemSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
