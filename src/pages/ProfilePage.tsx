
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User, Settings, History, AtSign, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ProfileStats from "@/components/profile/ProfileStats";
import MentalHealthPreview from "@/components/profile/MentalHealthPreview";
import PreferencesTab from "@/components/profile/PreferencesTab";
import ActivityTab from "@/components/profile/ActivityTab";
import NotificationsTab from "@/components/profile/NotificationsTab";
import SecurityTab from "@/components/profile/SecurityTab";

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
            <PreferencesTab 
              user={user} 
              profileData={profileData} 
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </TabsContent>

          <TabsContent value="activity">
            <ActivityTab />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>

          <TabsContent value="security">
            <SecurityTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
