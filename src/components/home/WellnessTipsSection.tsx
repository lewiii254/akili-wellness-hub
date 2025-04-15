
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Heart, Sparkles } from "lucide-react";

const WellnessTipsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-akili-blue tracking-wider uppercase mb-2 inline-block">
            Wellness Tips 💡
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Daily Wellness Tips</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Small practices that can make a big difference in your mental health journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-xl border p-6 bg-background shadow-sm hover:shadow-md transition-all">
            <div className="mb-4 bg-akili-light-purple w-14 h-14 rounded-full flex items-center justify-center">
              <Brain className="h-8 w-8 text-akili-purple" />
            </div>
            <h3 className="text-xl font-medium mb-2">Mindful Breathing 🧘</h3>
            <p className="text-muted-foreground">
              Take 5 minutes each day to practice deep breathing. Inhale for 4 counts, 
              hold for 4, and exhale for 6 counts to reduce stress and anxiety.
            </p>
          </div>
          <div className="rounded-xl border p-6 bg-background shadow-sm hover:shadow-md transition-all">
            <div className="mb-4 bg-akili-light-pink w-14 h-14 rounded-full flex items-center justify-center">
              <Heart className="h-8 w-8 text-akili-purple" />
            </div>
            <h3 className="text-xl font-medium mb-2">Practice Gratitude 🙏</h3>
            <p className="text-muted-foreground">
              Write down three things you're grateful for each day. This simple practice
              can shift your mindset towards positivity and well-being.
            </p>
          </div>
          <div className="rounded-xl border p-6 bg-background shadow-sm hover:shadow-md transition-all">
            <div className="mb-4 bg-akili-light-blue w-14 h-14 rounded-full flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-akili-blue" />
            </div>
            <h3 className="text-xl font-medium mb-2">Digital Detox 📵</h3>
            <p className="text-muted-foreground">
              Set aside 30 minutes before bed as screen-free time. This can improve sleep quality
              and reduce anxiety related to information overload.
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link to="/resources">
            <Button variant="outline" className="rounded-full group">
              View More Tips 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WellnessTipsSection;
