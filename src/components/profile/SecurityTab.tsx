
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const SecurityTab = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-medium mb-4">Security</h3>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-akili-light-purple flex items-center justify-center">
                <Shield className="h-5 w-5 text-akili-purple" />
              </div>
              <div>
                <p className="font-medium">
                  Change Password
                </p>
                <p className="text-sm text-muted-foreground">Last changed: 2 months ago</p>
              </div>
            </div>
          </div>
          <div className="border-b pb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-akili-light-blue flex items-center justify-center">
                <Shield className="h-5 w-5 text-akili-blue" />
              </div>
              <div>
                <p className="font-medium">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-muted-foreground">Status: Enabled</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button variant="ghost" className="text-sm">Load More Security Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityTab;
