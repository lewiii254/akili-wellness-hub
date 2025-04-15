
import React from "react";
import { Link } from "react-router-dom";
import FeatureCard from "@/components/FeatureCard";
import { BookOpen, Headphones, Users, Calendar } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-akili-purple tracking-wider uppercase mb-2 inline-block">
            Features ✨
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How AkiliSpa Helps Your Mental Wellness
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive suite of mental wellness tools and resources
            designed to support your journey to better health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link to="/resources" className="interactive-hover">
            <FeatureCard
              title="Mental Health Resources 📚"
              description="Access articles, guides, and tools to help you understand and manage your mental health."
              icon={<BookOpen className="h-6 w-6 text-akili-purple" />}
              className="gradient-card-resources"
            />
          </Link>
          <Link to="/media" className="interactive-hover">
            <FeatureCard
              title="Wellness Media 🎧"
              description="Enjoy curated music and videos designed to reduce stress and improve mindfulness."
              icon={<Headphones className="h-6 w-6 text-akili-blue" />}
              className="gradient-card-media"
            />
          </Link>
          <Link to="/community" className="interactive-hover">
            <FeatureCard
              title="Supportive Community 👥"
              description="Connect with others who understand what you're going through in a safe, moderated environment."
              icon={<Users className="h-6 w-6 text-akili-orange" />}
              className="gradient-card-community"
            />
          </Link>
          <Link to="/therapy" className="interactive-hover">
            <FeatureCard
              title="Professional Therapy 🧠"
              description="Book sessions with licensed therapists who specialize in various mental health areas."
              icon={<Calendar className="h-6 w-6 text-akili-green" />}
              className="gradient-card-therapy"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
