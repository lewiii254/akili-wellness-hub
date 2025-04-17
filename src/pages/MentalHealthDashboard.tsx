
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import MoodTracker from "@/components/MoodTracker";
import MoodJournal from "@/components/MoodJournal";
import MoodPatternAnalysis from "@/components/MoodPatternAnalysis";
import { Calendar, Shield, BarChart2, MessageSquare, Flag, Bell, AlertTriangle } from "lucide-react";
import AdminMaker from "@/components/AdminMaker";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";

const MentalHealthDashboard = () => {
  const { user } = useAuth();
  const [pendingReportsCount, setPendingReportsCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is an admin
  useEffect(() => {
    if (user?.id) {
      const checkAdminStatus = async () => {
        const { data } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin');
          
        setIsAdmin(Array.isArray(data) && data.length > 0);
      };
      
      checkAdminStatus();
    }
  }, [user]);

  // Get pending reports count for admin
  useEffect(() => {
    if (user?.id && isAdmin) {
      const fetchPendingReports = async () => {
        const { data, error, count } = await supabase
          .from('content_flags')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');
          
        if (!error && count !== null) {
          setPendingReportsCount(count);
        }
      };
      
      fetchPendingReports();
      
      // Set up subscription to content_flags table
      const subscription = supabase
        .channel('content_flags_changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'content_flags' },
          () => {
            // Refresh count on any changes
            fetchPendingReports();
          }
        )
        .subscribe();
        
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user, isAdmin]);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-3xl font-bold">Mental Health Dashboard 🌟</h1>
          <Calendar className="h-8 w-8 text-primary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats cards */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Mood Check-in</CardTitle>
              </CardHeader>
              <CardContent>
                <MoodTracker />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mood Pattern Analysis</CardTitle>
                <CardDescription>AI-powered insights into your emotional patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <MoodPatternAnalysis />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mood Journal 📝</CardTitle>
                <CardDescription>Document your thoughts and feelings</CardDescription>
              </CardHeader>
              <CardContent>
                <MoodJournal />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-akili-purple" />
                  Community
                </CardTitle>
                <CardDescription>
                  Connect with others and share experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Join our supportive community to share your journey, ask questions, and support others.
                </p>
                <div className="flex flex-col space-y-2">
                  <Button asChild>
                    <Link to="/community" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Visit Community
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/resources" className="w-full">
                      <BarChart2 className="mr-2 h-4 w-4" />
                      Browse Resources
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-akili-purple" />
                  Admin Access
                </CardTitle>
                <CardDescription>
                  Grant admin privileges to a user
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Use this tool to grant admin privileges to an email address (default: ngondimarklewis@gmail.com).
                </p>
                <AdminMaker />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Flag className="mr-2 h-5 w-5 text-akili-purple" />
                  Content Moderation
                  {isAdmin && pendingReportsCount > 0 && (
                    <Badge className="ml-2 bg-red-500" variant="destructive">
                      {pendingReportsCount}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Review and moderate reported content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  {isAdmin && pendingReportsCount > 0 ? (
                    <>
                      <AlertTriangle className="inline-block mr-2 h-4 w-4 text-yellow-500" />
                      There {pendingReportsCount === 1 ? 'is' : 'are'} <strong>{pendingReportsCount}</strong> pending {pendingReportsCount === 1 ? 'report' : 'reports'} that need your attention.
                    </>
                  ) : (
                    "Access the admin dashboard to review and moderate user-reported content."
                  )}
                </p>
                <Button 
                  asChild 
                  variant={isAdmin && pendingReportsCount > 0 ? "default" : "outline"}
                  className={isAdmin && pendingReportsCount > 0 ? "bg-red-500 hover:bg-red-600" : ""}
                >
                  <Link to="/admin/content" className="w-full">
                    {isAdmin && pendingReportsCount > 0 ? (
                      <>
                        <Bell className="mr-2 h-4 w-4" />
                        Review {pendingReportsCount} Pending {pendingReportsCount === 1 ? 'Report' : 'Reports'}
                      </>
                    ) : (
                      <>
                        <Flag className="mr-2 h-4 w-4" />
                        Moderate Content
                      </>
                    )}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthDashboard;
