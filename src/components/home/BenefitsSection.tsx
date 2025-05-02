
import React from "react";
import { CheckCircle } from "lucide-react";

const BenefitsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-akili-light-purple/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-akili-purple tracking-wider uppercase mb-2 inline-block">
            Benefits 🏆
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AkiliSpa</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform offers unique benefits designed to support your mental wellness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-background rounded-xl border shadow-sm">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-akili-green mr-3" />
              <h3 className="text-xl font-medium">Personalized Support 🎯</h3>
            </div>
            <p className="text-muted-foreground">
              Our AI analyzes your preferences and needs to recommend resources tailored specifically for you.
            </p>
          </div>
          <div className="p-6 bg-background rounded-xl border shadow-sm">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-akili-green mr-3" />
              <h3 className="text-xl font-medium">Evidence-Based Methods 📊</h3>
            </div>
            <p className="text-muted-foreground">
              All our resources and therapeutic approaches are based on the latest research in psychology and neuroscience.
            </p>
          </div>
          <div className="p-6 bg-background rounded-xl border shadow-sm">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-akili-green mr-3" />
              <h3 className="text-xl font-medium">24/7 Access ⏰</h3>
            </div>
            <p className="text-muted-foreground">
              Get support whenever you need it with our always-available resources and AI-powered chat assistance.
            </p>
          </div>
          <div className="p-6 bg-background rounded-xl border shadow-sm">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-akili-green mr-3" />
              <h3 className="text-xl font-medium">Privacy Focused 🔒</h3>
            </div>
            <p className="text-muted-foreground">
              Your mental health journey is private. We prioritize data security and confidentiality in all our services.
            </p>
          </div>
          <div className="p-6 bg-background rounded-xl border shadow-sm">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-akili-green mr-3" />
              <h3 className="text-xl font-medium">Holistic Approach 🌱</h3>
            </div>
            <p className="text-muted-foreground">
              We address mental wellness from all angles: psychological, emotional, social, and physiological.
            </p>
          </div>
          <div className="p-6 bg-background rounded-xl border shadow-sm">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-akili-green mr-3" />
              <h3 className="text-xl font-medium">Affordable Options 💰</h3>
            </div>
            <p className="text-muted-foreground">
              Mental wellness shouldn't be a luxury. We offer services at various price points to ensure accessibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
