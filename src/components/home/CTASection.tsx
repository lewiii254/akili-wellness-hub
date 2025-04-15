
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Award } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-akili-purple/20 to-akili-blue/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Begin Your Wellness Journey Today ✨
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Whether you're seeking resources, professional help, or community support,
          AkiliSpa is here to guide you on your path to better mental health.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/resources">
            <Button size="lg" className="rounded-full px-8 shadow-md hover:shadow-lg transition-all">
              Explore Resources 📚
            </Button>
          </Link>
          <Link to="/chat">
            <Button variant="outline" size="lg" className="rounded-full px-8 border-2 hover:border-primary hover:bg-primary/5 flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat With AI Assistant 🤖
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-muted-foreground">
          <p className="flex items-center justify-center">
            <Award className="h-4 w-4 mr-2 text-akili-purple" />
            Trusted by thousands of users worldwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
