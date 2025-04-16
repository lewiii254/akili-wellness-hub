
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import StatsSection from "@/components/home/StatsSection";
import WellnessTipsSection from "@/components/home/WellnessTipsSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Button asChild className="animate-bounce">
            <Link to="/mental-health">
              📊 Check Your Mental Health Dashboard
            </Link>
          </Button>
        </div>
      </div>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <WellnessTipsSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default HomePage;
