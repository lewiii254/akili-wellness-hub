
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Settings, Shield, Database, Loader2 } from "lucide-react";

const SystemSettings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [emailDomain, setEmailDomain] = useState("");
  const [featureToggles, setFeatureToggles] = useState({
    allowGuestAccess: true,
    enableAIFeatures: true,
    autoApproveContent: false,
    restrictRegistration: false
  });

  const handleToggleChange = (name: keyof typeof featureToggles) => {
    setFeatureToggles(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleResetDb = async () => {
    // This is a placeholder. In a real app, this would be a carefully controlled operation
    toast({
      title: "System Action",
      description: "Database reset functionality is not fully implemented in the demo.",
    });
  };

  const handlePromoteUser = async () => {
    if (!emailDomain) {
      toast({
        title: "Email domain required",
        description: "Please enter an email domain to promote",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      // In a real app, this would integrate with Supabase's Row-Level Security and Admin APIs
      // For the demo, we'll just show a success message
      setTimeout(() => {
        toast({
          title: "Admin Action",
          description: `Users with @${emailDomain} emails would be promoted to admin in a full implementation.`,
        });
        setEmailDomain("");
      }, 1000);
    } catch (error) {
      console.error("Error in admin action:", error);
      toast({
        title: "Error",
        description: "There was an error processing your request",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center">
        <Settings className="mr-2 h-6 w-6" />
        System Settings
      </h2>
      <p className="text-muted-foreground">
        Configure global system settings and perform administrative actions
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feature Toggles Card */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Toggles</CardTitle>
            <CardDescription>
              Enable or disable system features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel>Allow Guest Access</FormLabel>
                <FormDescription>
                  Allow non-logged in users to access limited features
                </FormDescription>
              </div>
              <Switch
                checked={featureToggles.allowGuestAccess}
                onCheckedChange={() => handleToggleChange('allowGuestAccess')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel>Enable AI Features</FormLabel>
                <FormDescription>
                  Enable AI-powered features across the platform
                </FormDescription>
              </div>
              <Switch
                checked={featureToggles.enableAIFeatures}
                onCheckedChange={() => handleToggleChange('enableAIFeatures')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel>Auto-Approve Content</FormLabel>
                <FormDescription>
                  Automatically approve user-submitted content
                </FormDescription>
              </div>
              <Switch
                checked={featureToggles.autoApproveContent}
                onCheckedChange={() => handleToggleChange('autoApproveContent')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel>Restrict Registration</FormLabel>
                <FormDescription>
                  Only allow users from specific domains to register
                </FormDescription>
              </div>
              <Switch
                checked={featureToggles.restrictRegistration}
                onCheckedChange={() => handleToggleChange('restrictRegistration')}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Save Changes
            </Button>
          </CardFooter>
        </Card>

        {/* Admin Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Administrative Actions</CardTitle>
            <CardDescription>
              Perform system-level administration tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <FormLabel>Promote Users by Domain</FormLabel>
              <FormDescription className="mb-2">
                Automatically assign admin roles to users from a specific email domain
              </FormDescription>
              <div className="flex gap-2">
                <Input
                  placeholder="example.com"
                  value={emailDomain}
                  onChange={(e) => setEmailDomain(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handlePromoteUser} 
                  disabled={loading || !emailDomain}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Promote"}
                </Button>
              </div>
            </div>
            
            <div>
              <FormLabel>Database Operations</FormLabel>
              <FormDescription className="mb-2">
                Warning: These actions can potentially result in data loss
              </FormDescription>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => {}}>Backup Data</Button>
                <Button 
                  variant="destructive" 
                  onClick={handleResetDb}
                >
                  Reset Database
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>
            Platform configuration and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium">System Status</h3>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Environment</p>
                  <p className="font-medium">Production</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Version</p>
                  <p className="font-medium">1.0.0</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <p className="font-medium">Operational</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium">Database Statistics</h3>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="font-medium">--</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Discussions</p>
                  <p className="font-medium">--</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Content Size</p>
                  <p className="font-medium">--</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Database Health</p>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <p className="font-medium">Good</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
