import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, History, AtSign, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ProfileStats from "@/components/profile/ProfileStats";
import MentalHealthPreview from "@/components/profile/MentalHealthPreview";

const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    resourcesAccessed: 12,
    mediaPlayed: 8,
    daysActive: 15,
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: profileData.first_name,
      last_name: profileData.last_name,
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("first_name, last_name")
          .eq("id", user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setProfileData(prev => ({
            ...prev,
            first_name: data.first_name || "",
            last_name: data.last_name || "",
          }));
          form.reset({
            first_name: data.first_name || "",
            last_name: data.last_name || "",
          });
        }
      } catch (error: any) {
        console.error("Error loading profile:", error.message);
        toast({
          title: "Error loading profile",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);

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
      
      setProfileData(prev => ({
        ...prev,
        first_name: data.first_name,
        last_name: data.last_name,
      }));
      
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
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-5xl mx-auto">
        <div className="bg-background rounded-2xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-akili-purple to-akili-blue flex items-center justify-center">
              <span className="text-white text-3xl font-medium">
                {profileData.first_name ? profileData.first_name.charAt(0) : user?.email?.charAt(0) || "A"}
              </span>
            </div>
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-2xl font-bold">
                {profileData.first_name && profileData.last_name
                  ? `${profileData.first_name} ${profileData.last_name}`
                  : user?.email || "Welcome"}
              </h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>

        <ProfileStats
          resourcesAccessed={profileData.resourcesAccessed}
          mediaPlayed={profileData.mediaPlayed}
          daysActive={profileData.daysActive}
        />

        <MentalHealthPreview />

        <Tabs defaultValue="preferences" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <AtSign className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preferences">
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
                    <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
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
          </TabsContent>

          <TabsContent value="activity">
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
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4">Notifications</h3>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-akili-light-purple flex items-center justify-center">
                        <AtSign className="h-5 w-5 text-akili-purple" />
                      </div>
                      <div>
                        <p className="font-medium">
                          New resources available
                        </p>
                        <p className="text-sm text-muted-foreground">Just now</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-akili-light-blue flex items-center justify-center">
                        <AtSign className="h-5 w-5 text-akili-blue" />
                      </div>
                      <div>
                        <p className="font-medium">
                          Community updates
                        </p>
                        <p className="text-sm text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Button variant="ghost" className="text-sm">Load More Notifications</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
