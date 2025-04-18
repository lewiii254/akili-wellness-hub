
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Headphones } from "lucide-react";

const ActivityTab = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-medium mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-akili-light-purple flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-akili-purple" />
              </div>
              <div>
                <p className="font-medium">
                  You accessed "Understanding Anxiety: A Comprehensive Guide"
                </p>
                <p className="text-sm text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </div>
          <div className="border-b pb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-akili-light-blue flex items-center justify-center">
                <Headphones className="h-5 w-5 text-akili-blue" />
              </div>
              <div>
                <p className="font-medium">
                  You played "Calm Waters" meditation track
                </p>
                <p className="text-sm text-muted-foreground">5 days ago</p>
              </div>
            </div>
          </div>
          <div className="border-b pb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-akili-light-blue flex items-center justify-center">
                <Headphones className="h-5 w-5 text-akili-blue" />
              </div>
              <div>
                <p className="font-medium">
                  You watched "5-Minute Meditation You Can Do Anywhere"
                </p>
                <p className="text-sm text-muted-foreground">1 week ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button variant="ghost" className="text-sm">Load More Activity</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTab;
