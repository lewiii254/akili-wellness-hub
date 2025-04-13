import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { User, Settings, History, BookOpen, Headphones, Shield, AtSign, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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
        <div className="bg-background rounded-2xl shadow-sm border p-6 mb-8 flex flex-col md:flex-row gap-6 md:items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-akili-purple to-akili-blue flex items-center justify-center">
            <span className="text-white text-3xl font-medium">
              {profileData.first_name ? profileData.first_name.charAt(0) : user?.email?.charAt(0) || "A"}
            </span>
          </div>
          <div className="flex-grow">
            <h1 className="text-2xl font-bold">
              {profileData.first_name && profileData.last_name
                ? `${profileData.first_name} ${profileData.last_name}`
                : user?.email || "Welcome"}
            </h1>
            <p className="text-muted-foreground">
              {user?.email}
            </p>
            <div className="flex gap-4 mt-4">
              <div>
                <p className="text-sm text-muted-foreground">Resources Accessed</p>
                <p className="font-medium">{profileData.resourcesAccessed}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Media Played</p>
                <p className="font-medium">{profileData.mediaPlayed}</p>
              </div>
            </div>
          </div>
          <div className="ml-auto">
            <Button variant="outline" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="activity">
          <TabsList className="grid grid-cols-3 mb-8 w-full md:w-auto">
            <TabsTrigger value="activity" className="flex items-center">
              <History className="h-4 w-4 mr-2 hidden sm:block" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2 hidden sm:block" />
              Saved Items
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center">
              <Shield className="h-4 w-4 mr-2 hidden sm:block" />
              Preferences
            </TabsTrigger>
          </TabsList>

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

          <TabsContent value="saved">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4">Saved Items</h3>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-akili-light-purple flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-akili-purple" />
                      </div>
                      <div>
                        <p className="font-medium">
                          Building Resilience in Difficult Times
                        </p>
                        <p className="text-sm text-muted-foreground">Resource Article</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-akili-light-blue flex items-center justify-center">
                        <Headphones className="h-5 w-5 text-akili-blue" />
                      </div>
                      <div>
                        <p className="font-medium">
                          Forest Journey
                        </p>
                        <p className="text-sm text-muted-foreground">Meditation Track</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-auto">
                        Play
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="text-center py-6 text-muted-foreground">
                  <p>Save more items as you explore AkiliSpa</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardContent className="p-6 space-y-6">
                <h3 className="text-xl font-medium">Profile Information</h3>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
