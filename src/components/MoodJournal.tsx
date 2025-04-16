
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const MoodJournal = () => {
  const [entry, setEntry] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const processWithAI = async (content: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('process-journal', {
        body: { content }
      });

      if (error) throw error;
      return data.suggestion;
    } catch (error) {
      console.error('Error processing with AI:', error);
      throw error;
    }
  };

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
    try {
      const suggestion = await processWithAI(entry);
      setAiSuggestion(suggestion);
    } catch (error) {
      toast({
        title: "Error getting AI suggestion",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!entry) {
      toast({
        title: "Empty entry",
        description: "Please write something before saving.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to save journal entries.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('mood_journal_entries')
        .insert({
          content: entry,
          ai_suggestion: aiSuggestion,
          user_id: user.id
        });

      if (error) throw error;

      toast({
        title: "Journal Entry Saved! 📝",
        description: "Your thoughts have been recorded successfully.",
      });
      
      setEntry("");
      setAiSuggestion("");
    } catch (error) {
      toast({
        title: "Error saving entry",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
        <Button 
          onClick={handleSave} 
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Save Entry 📝
        </Button>
        <Button 
          onClick={handleGetAISuggestion} 
          variant="outline"
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Lightbulb className="h-4 w-4" />
          )}
          Get AI Suggestion
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
