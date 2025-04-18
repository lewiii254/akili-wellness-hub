
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-akili-purple/10 via-akili-blue/5 to-background"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-akili-purple to-akili-blue bg-clip-text text-transparent">
          Begin Your Wellness Journey Today ✨
        </h2>
        <p className="text-xl mb-10 text-muted-foreground max-w-2xl mx-auto">
          Take the first step towards better mental health with our supportive community and expert resources.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/auth">
            <Button 
              size="lg" 
              className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-akili-purple to-akili-blue w-full sm:w-auto"
            >
              Join AkiliSpa Today
            </Button>
          </Link>
          <Link to="/chat">
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8 py-6 text-lg border-2 hover:bg-secondary/20 transition-all flex items-center justify-center w-full sm:w-auto"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat With AI Assistant
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
