
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface PreferencesTabProps {
  user: any;
  profileData: {
    first_name: string;
    last_name: string;
  };
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const PreferencesTab = ({ user, profileData, isLoading, setIsLoading }: PreferencesTabProps) => {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: profileData.first_name,
      last_name: profileData.last_name,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: data.first_name,
          last_name: data.last_name,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
        
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>

        <div className="border-t pt-6">
          <h4 className="font-medium mb-2">Email Notifications</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="notify-resources">New resources notifications</label>
              <input type="checkbox" id="notify-resources" className="toggle" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="notify-community">Community updates</label>
              <input type="checkbox" id="notify-community" className="toggle" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="notify-wellness">Wellness tips and reminders</label>
              <input type="checkbox" id="notify-wellness" className="toggle" defaultChecked />
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h4 className="font-medium mb-2">Privacy Settings</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="privacy-profile">Show my activity to other members</label>
              <input type="checkbox" id="privacy-profile" className="toggle" />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="privacy-data">Allow data collection for personalized recommendations</label>
              <input type="checkbox" id="privacy-data" className="toggle" defaultChecked />
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h4 className="font-medium mb-4">Account Actions</h4>
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <Button variant="outline">Change Password</Button>
            <Button variant="outline" className="text-destructive">Delete Account</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferencesTab;
