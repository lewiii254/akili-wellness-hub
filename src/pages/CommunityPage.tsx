
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, MessageCircle, Heart, Shield, Lock } from "lucide-react";

const CommunityPage = () => {
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
            <div className="flex justify-center">
              <Button size="lg" className="rounded-full px-8">
                Get Notified
              </Button>
            </div>
          </Card>
        </div>

        {/* Community Features Preview */}
        <div className="mt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            What to Expect from Our Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-sm border">
              <MessageCircle className="h-10 w-10 text-akili-orange mb-4" />
              <h3 className="text-xl font-medium mb-2">Discussion Forums</h3>
              <p className="text-muted-foreground">
                Engage in meaningful conversations about various mental health and wellness topics.
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm border">
              <Users className="h-10 w-10 text-akili-orange mb-4" />
              <h3 className="text-xl font-medium mb-2">Support Groups</h3>
              <p className="text-muted-foreground">
                Join specific support groups based on shared experiences or mental health challenges.
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm border">
              <Heart className="h-10 w-10 text-akili-orange mb-4" />
              <h3 className="text-xl font-medium mb-2">Peer Support</h3>
              <p className="text-muted-foreground">
                Connect one-on-one with others who understand what you're going through.
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm border">
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
      </div>
    </div>
  );
};

export default CommunityPage;
