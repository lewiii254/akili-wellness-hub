
import React from "react";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import StatsSection from "@/components/home/StatsSection";
import WellnessTipsSection from "@/components/home/WellnessTipsSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
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
