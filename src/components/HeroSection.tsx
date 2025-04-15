
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
  title = "Your Journey to Mental Wellness Begins Here",
  subtitle = "Discover resources, connect with our community, and access professional support to help you on your path to better mental health.",
  primaryButtonText = "Explore Resources",
  secondaryButtonText = "Book a Session",
  primaryButtonLink = "/resources",
  secondaryButtonLink = "/therapy",
}: HeroSectionProps) => {
  return (
    <section className="relative pt-24 pb-28 md:pt-36 md:pb-40 overflow-hidden gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            <span className="text-gradient">
              {title} <Sparkles className="inline-block h-8 w-8 text-akili-purple animate-pulse-gentle" />
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-foreground/80 animate-fade-in animate-delay-200">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-300">
            <Link to={primaryButtonLink}>
              <Button size="lg" className="rounded-full px-8 shadow-md hover:shadow-lg transition-all group">
                {primaryButtonText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to={secondaryButtonLink}>
              <Button variant="outline" size="lg" className="rounded-full px-8 border-2 hover:border-primary hover:bg-primary/5 transition-all">
                {secondaryButtonText}
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-32 right-[10%] w-72 h-72 bg-akili-light-purple rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-32 left-[10%] w-56 h-56 bg-akili-light-blue rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
        
        {/* Floating emoji decorations */}
        <div className="absolute top-1/4 right-[20%] text-4xl animate-float">✨</div>
        <div className="absolute top-1/2 left-[15%] text-4xl animate-float animate-delay-200">🧠</div>
        <div className="absolute bottom-1/4 right-[25%] text-4xl animate-float animate-delay-300">❤️</div>
      </div>
    </section>
  );
};

export default HeroSection;
