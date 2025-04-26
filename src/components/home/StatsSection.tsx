
import React from "react";

const StatsSection = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm">
            <p className="text-4xl font-bold mb-2 text-akili-purple">10k+</p>
            <p className="text-sm text-muted-foreground">Resources Accessed 📚</p>
          </div>
          <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm">
            <p className="text-4xl font-bold mb-2 text-akili-blue">500+</p>
            <p className="text-sm text-muted-foreground">Community Members 👥</p>
          </div>
          <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm">
            <p className="text-4xl font-bold mb-2 text-akili-orange">5+</p>
            <p className="text-sm text-muted-foreground">Professional Therapists 🧠</p>
          </div>
          <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm">
            <p className="text-4xl font-bold mb-2 text-akili-green">98%</p>
            <p className="text-sm text-muted-foreground">User Satisfaction 😊</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
