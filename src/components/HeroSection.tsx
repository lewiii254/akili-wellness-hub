
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
            <Link to={primaryButtonLink}>
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
              >
                {primaryButtonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to={secondaryButtonLink}>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 py-6 text-lg w-full sm:w-auto hover:bg-secondary/10"
              >
                {secondaryButtonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
