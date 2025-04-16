import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MoodTracker from "@/components/MoodTracker";
import MoodJournal from "@/components/MoodJournal";
import { Calendar } from "lucide-react";
import AdminMaker from "@/components/AdminMaker";
import { Shield } from "lucide-react";

const MentalHealthDashboard = () => {
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
                <CardTitle>Mood Journal 📝</CardTitle>
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
                  <Shield className="mr-2 h-5 w-5 text-akili-purple" />
                  Admin Access
                </CardTitle>
                <CardDescription>
                  For testing admin functionality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Click the button below to grant yourself admin privileges for testing purposes.
                </p>
                <AdminMaker />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthDashboard;
