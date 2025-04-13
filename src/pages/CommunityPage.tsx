
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Users, MessageCircle, Heart, Shield, Lock, Mail } from "lucide-react";

const CommunityPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email is required",
        description: "Please enter your email address to get notified.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for signing up!",
        description: "We'll notify you when our community features go live.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AkiliSpa Community</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Connect with others on similar mental wellness journeys, share experiences, and find support in our safe and moderated community spaces.
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 text-center bg-akili-light-orange/30 border-2 border-akili-orange/20">
            <div className="w-20 h-20 rounded-full bg-akili-orange/20 flex items-center justify-center mx-auto mb-6">
              <Users className="h-10 w-10 text-akili-orange" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Community Coming Soon!</h2>
            <p className="text-lg mb-6">
              We're working hard to create a supportive and engaging community space for our members. Sign up to be notified when our community features go live.
            </p>
            <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-grow">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="rounded-full px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Get Notified"}
              </Button>
            </form>
          </Card>
        </div>

        {/* Community Progress */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Development Progress</h2>
          <div className="bg-background rounded-xl p-6 shadow-sm border">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                    Completed
                  </Badge>
                  <span className="font-medium">Community Framework</span>
                </div>
                <span className="text-sm text-muted-foreground">100%</span>
              </div>
              
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }}></div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                    In Progress
                  </Badge>
                  <span className="font-medium">Groups & Forums</span>
                </div>
                <span className="text-sm text-muted-foreground">65%</span>
              </div>
              
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "65%" }}></div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                    Planning
                  </Badge>
                  <span className="font-medium">Direct Messaging</span>
                </div>
                <span className="text-sm text-muted-foreground">25%</span>
              </div>
              
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
                    Not Started
                  </Badge>
                  <span className="font-medium">Events & Calendar</span>
                </div>
                <span className="text-sm text-muted-foreground">0%</span>
              </div>
              
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-gray-500 h-2 rounded-full" style={{ width: "0%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Features Preview */}
        <div className="mt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            What to Expect from Our Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
              <MessageCircle className="h-10 w-10 text-akili-orange mb-4" />
              <h3 className="text-xl font-medium mb-2">Discussion Forums</h3>
              <p className="text-muted-foreground">
                Engage in meaningful conversations about various mental health and wellness topics.
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
              <Users className="h-10 w-10 text-akili-orange mb-4" />
              <h3 className="text-xl font-medium mb-2">Support Groups</h3>
              <p className="text-muted-foreground">
                Join specific support groups based on shared experiences or mental health challenges.
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
              <Heart className="h-10 w-10 text-akili-orange mb-4" />
              <h3 className="text-xl font-medium mb-2">Peer Support</h3>
              <p className="text-muted-foreground">
                Connect one-on-one with others who understand what you're going through.
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
              <Shield className="h-10 w-10 text-akili-orange mb-4" />
              <h3 className="text-xl font-medium mb-2">Safe Environment</h3>
              <p className="text-muted-foreground">
                Our community is carefully moderated to ensure a respectful and supportive atmosphere.
              </p>
            </div>
          </div>
        </div>

        {/* Community Guidelines Preview */}
        <div className="mt-20 bg-secondary/70 p-8 rounded-2xl">
          <div className="flex items-start gap-6">
            <div className="hidden md:flex mt-2">
              <Lock className="h-12 w-12 text-akili-purple" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Lock className="h-6 w-6 text-akili-purple mr-2 md:hidden" />
                Community Guidelines
              </h2>
              <p className="text-muted-foreground mb-6">
                Our community will be governed by these core principles to ensure everyone feels safe and respected:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-akili-purple/20 flex items-center justify-center mr-3 mt-1">
                    <span className="text-akili-purple text-sm font-medium">1</span>
                  </div>
                  <p><strong>Respect:</strong> Treat all community members with kindness and respect, even in disagreement.</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-akili-purple/20 flex items-center justify-center mr-3 mt-1">
                    <span className="text-akili-purple text-sm font-medium">2</span>
                  </div>
                  <p><strong>Privacy:</strong> Respect others' privacy and maintain confidentiality of personal information shared in the community.</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-akili-purple/20 flex items-center justify-center mr-3 mt-1">
                    <span className="text-akili-purple text-sm font-medium">3</span>
                  </div>
                  <p><strong>Support:</strong> Focus on providing supportive and constructive interactions.</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-akili-purple/20 flex items-center justify-center mr-3 mt-1">
                    <span className="text-akili-purple text-sm font-medium">4</span>
                  </div>
                  <p><strong>Safety:</strong> No harassment, hate speech, or disrespectful content will be tolerated.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Waitlist Today</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Be the first to experience our supportive community when it launches. Early members will get exclusive access to special features and events.
          </p>
          <Button size="lg" className="rounded-full px-8" onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <Mail className="w-5 h-5 mr-2" />
            Sign Up for Updates
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
