
import React, { useState } from "react";
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

const ProfilePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, we would validate credentials
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    joinDate: "January 15, 2023",
    resourcesAccessed: 12,
    mediaPlayed: 8,
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-akili-purple to-akili-blue mx-auto flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-1">Welcome Back</h2>
                <p className="text-muted-foreground">
                  Sign in to access your wellness journey
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <AtSign className="h-4 w-4 text-muted-foreground mr-2" />
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 text-muted-foreground mr-2" />
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="text-right">
                  <a href="#" className="text-sm text-akili-purple hover:underline">
                    Forgot password?
                  </a>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Sign In
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <a href="#" className="text-akili-purple hover:underline">
                    Create an account
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-background rounded-2xl shadow-sm border p-6 mb-8 flex flex-col md:flex-row gap-6 md:items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-akili-purple to-akili-blue flex items-center justify-center">
            <span className="text-white text-3xl font-medium">
              {userData.name.charAt(0)}
            </span>
          </div>
          <div className="flex-grow">
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <p className="text-muted-foreground">Member since {userData.joinDate}</p>
            <div className="flex gap-4 mt-4">
              <div>
                <p className="text-sm text-muted-foreground">Resources Accessed</p>
                <p className="font-medium">{userData.resourcesAccessed}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Media Played</p>
                <p className="font-medium">{userData.mediaPlayed}</p>
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

        {/* Profile Tabs */}
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
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-4">Account Preferences</h3>
                
                <div className="space-y-6">
                  <div>
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
                      <Button onClick={() => setIsLoggedIn(false)}>Sign Out</Button>
                      <Button variant="outline">Change Password</Button>
                      <Button variant="outline" className="text-destructive">Delete Account</Button>
                    </div>
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
