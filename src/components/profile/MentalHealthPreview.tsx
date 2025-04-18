
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ActivitySquare, Brain, TrendingUp } from "lucide-react";

const MentalHealthPreview = () => {
  return (
    <Card className="mb-6 bg-gradient-to-br from-akili-purple/10 via-akili-blue/5 to-background">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-akili-purple" />
          Mental Health Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 p-4 bg-background/60 rounded-lg">
            <ActivitySquare className="h-8 w-8 text-akili-purple" />
            <div>
              <p className="font-medium">Daily Mood Tracking</p>
              <p className="text-sm text-muted-foreground">Monitor your emotional well-being</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-background/60 rounded-lg">
            <TrendingUp className="h-8 w-8 text-akili-blue" />
            <div>
              <p className="font-medium">Progress Analytics</p>
              <p className="text-sm text-muted-foreground">View your wellness journey</p>
            </div>
          </div>
        </div>
        <Link to="/mental-health">
          <Button className="w-full bg-gradient-to-r from-akili-purple to-akili-blue hover:opacity-90">
            <Brain className="mr-2 h-5 w-5" />
            Open Mental Health Dashboard
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default MentalHealthPreview;
