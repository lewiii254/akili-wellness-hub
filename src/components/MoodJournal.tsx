
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const MoodJournal = () => {
  const [entry, setEntry] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetAISuggestion = async () => {
    if (!entry) {
      toast({
        title: "Please write something first",
        description: "Share your thoughts and feelings to get personalized suggestions.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // This is a placeholder for the AI integration
    // In a real implementation, you would call your AI service here
    setTimeout(() => {
      const suggestions = [
        "Try taking a few deep breaths and practice mindfulness.",
        "Consider going for a short walk to clear your mind.",
        "Maybe reach out to a friend or family member for support.",
        "Remember that it's okay to feel this way, and these feelings will pass."
      ];
      setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSave = () => {
    if (!entry) {
      toast({
        title: "Empty entry",
        description: "Please write something before saving.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Journal Entry Saved! 📝",
      description: "Your thoughts have been recorded successfully.",
    });
    setEntry("");
    setAiSuggestion("");
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="How are you feeling today? Share your thoughts and emotions..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        className="min-h-[150px] resize-none"
      />
      
      <div className="flex gap-2 flex-wrap">
        <Button onClick={handleSave} className="flex items-center gap-2">
          Save Entry 📝
        </Button>
        <Button 
          onClick={handleGetAISuggestion} 
          variant="outline"
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <Lightbulb className="h-4 w-4" />
          {isLoading ? "Thinking..." : "Get AI Suggestion"}
        </Button>
      </div>

      {aiSuggestion && (
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm font-medium">🤖 AI Suggestion:</p>
          <p className="mt-2">{aiSuggestion}</p>
        </div>
      )}
    </div>
  );
};

export default MoodJournal;
