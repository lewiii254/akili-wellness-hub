
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonLink?: string;
}

const HeroSection = ({
  title = "Transform Your Mental Wellness Journey",
  subtitle = "Join our supportive community and access professional resources designed to help you thrive mentally and emotionally.",
  primaryButtonText = "Get Started",
  secondaryButtonText = "Explore Resources",
  primaryButtonLink = "/auth",
  secondaryButtonLink = "/resources",
}: HeroSectionProps) => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight animate-fade-in">
            <span className="bg-gradient-to-r from-akili-purple via-akili-blue to-akili-purple bg-clip-text text-transparent">
              {title}
            </span>
            <Sparkles className="inline-block h-8 w-8 ml-2 text-akili-purple animate-pulse-gentle" />
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-muted-foreground leading-relaxed animate-fade-in animate-delay-200">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in animate-delay-300">
            <Link to={primaryButtonLink}>
              <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-akili-purple to-akili-blue group">
                {primaryButtonText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to={secondaryButtonLink}>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 py-6 text-lg border-2 hover:bg-secondary/20 transition-all"
              >
                {secondaryButtonText}
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Enhanced decorative elements */}
        <div className="absolute top-1/4 right-[15%] w-96 h-96 bg-akili-purple rounded-full filter blur-[128px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-[15%] w-80 h-80 bg-akili-blue rounded-full filter blur-[128px] opacity-20 animate-pulse-slow"></div>
        
        {/* Floating emoji decorations with improved positioning */}
        <div className="absolute top-1/3 right-[25%] text-6xl animate-float">✨</div>
        <div className="absolute top-2/3 left-[20%] text-6xl animate-float animate-delay-200">🧠</div>
        <div className="absolute bottom-1/3 right-[30%] text-6xl animate-float animate-delay-300">❤️</div>
      </div>
    </section>
  );
};

export default HeroSection;
