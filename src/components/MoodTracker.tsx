
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Mood = {
  emoji: string;
  label: string;
  color: string;
};

const moods: Mood[] = [
  { emoji: "😊", label: "Happy", color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
  { emoji: "😌", label: "Calm", color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
  { emoji: "😐", label: "Neutral", color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" },
  { emoji: "😔", label: "Sad", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300" },
  { emoji: "😠", label: "Angry", color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" },
  { emoji: "😰", label: "Anxious", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [showThanks, setShowThanks] = useState(false);

  const handleSelectMood = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = () => {
    if (selectedMood) {
      console.log(`Mood logged: ${selectedMood.label}`);
      setShowThanks(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setShowThanks(false);
        setSelectedMood(null);
      }, 3000);
    }
  };

  return (
    <div className="p-6 rounded-xl border bg-background shadow-sm">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <span className="mr-2">How are you feeling today?</span>
        <span className="text-xl">🌈</span>
      </h3>
      
      {!showThanks ? (
        <>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {moods.map((mood) => (
              <Button
                key={mood.label}
                type="button"
                variant="ghost"
                className={cn(
                  "flex flex-col items-center gap-1 h-auto py-3",
                  selectedMood?.label === mood.label ? mood.color : ""
                )}
                onClick={() => handleSelectMood(mood)}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs">{mood.label}</span>
              </Button>
            ))}
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={!selectedMood}
            className="w-full"
          >
            Track My Mood
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center py-4">
          <div className="text-3xl mb-2 animate-bounce">✨</div>
          <p className="text-center">
            Thanks for sharing! Tracking your mood helps improve your mental wellness journey.
          </p>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
