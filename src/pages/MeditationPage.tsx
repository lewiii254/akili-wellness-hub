
import React from "react";
import MeditationTimer from "@/components/meditation/MeditationTimer";
import { Card } from "@/components/ui/card";

const MeditationPage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Guided Meditation</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take a moment to breathe and center yourself. Follow the guided breathing pattern and let go of your thoughts.
          </p>
        </div>

        <MeditationTimer />

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Benefits of Meditation</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Reduces stress and anxiety</li>
            <li>• Improves focus and concentration</li>
            <li>• Enhances emotional well-being</li>
            <li>• Promotes better sleep quality</li>
            <li>• Increases self-awareness</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default MeditationPage;
