
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MoodTracker from "@/components/MoodTracker";
import MoodJournal from "@/components/MoodJournal";
import { Calendar } from "lucide-react";

const MentalHealthDashboard = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-3xl font-bold">Mental Health Dashboard 🌟</h1>
        <Calendar className="h-8 w-8 text-primary" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
};

export default MentalHealthDashboard;
