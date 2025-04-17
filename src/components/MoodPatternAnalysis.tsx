
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Brain, Calendar, BarChart2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";

// Mock data - in a real app this would come from a database
const generateMockData = () => {
  const data = [];
  const now = new Date();
  const moodTypes = ['Happy', 'Calm', 'Neutral', 'Sad', 'Angry', 'Anxious'];
  const moodColors = {
    'Happy': '#4ade80', // green
    'Calm': '#60a5fa', // blue
    'Neutral': '#a1a1aa', // gray
    'Sad': '#818cf8', // indigo
    'Angry': '#f87171', // red
    'Anxious': '#facc15', // yellow
  };
  
  // Generate 14 days of data
  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    
    // Create a slightly realistic pattern
    let dominantMood;
    if (i > 10) dominantMood = 'Sad';
    else if (i > 7) dominantMood = 'Anxious';
    else if (i > 4) dominantMood = 'Neutral';
    else dominantMood = 'Happy';
    
    const entry = {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: date,
    };
    
    // Assign mood values with some randomness but making the dominant mood higher
    moodTypes.forEach(mood => {
      if (mood === dominantMood) {
        entry[mood] = 70 + Math.floor(Math.random() * 30); // 70-100
      } else {
        entry[mood] = Math.floor(Math.random() * 60); // 0-60
      }
    });
    
    data.push(entry);
  }
  
  return { data, moodTypes, moodColors };
};

const MoodPatternAnalysis = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [patternData, setPatternData] = useState<any>(null);
  const [insightText, setInsightText] = useState("");
  const { user } = useAuth();
  
  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, fetch data from API/database
        // For now, use mock data
        setIsLoading(true);
        setTimeout(() => {
          const { data, moodTypes, moodColors } = generateMockData();
          setPatternData({ data, moodTypes, moodColors });
          
          // Generate insights
          generateInsights(data);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error loading mood pattern data:", error);
        toast({
          title: "Failed to load mood patterns",
          description: "Could not retrieve your mood history. Please try again later.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user]);
  
  const generateInsights = (data: any[]) => {
    // This would be more sophisticated in a real app using actual ML
    // For now, we'll use simple pattern detection
    
    const recentData = data.slice(-5); // Last 5 days
    const moodCounts = {
      'Happy': 0, 'Calm': 0, 'Neutral': 0, 'Sad': 0, 'Angry': 0, 'Anxious': 0
    };
    
    // Find dominant mood for each day
    recentData.forEach(day => {
      let highestValue = 0;
      let dominantMood = '';
      
      Object.keys(day).forEach(key => {
        if (['Happy', 'Calm', 'Neutral', 'Sad', 'Angry', 'Anxious'].includes(key) && day[key] > highestValue) {
          highestValue = day[key];
          dominantMood = key;
        }
      });
      
      if (dominantMood) {
        moodCounts[dominantMood as keyof typeof moodCounts]++;
      }
    });
    
    // Generate insight based on mood counts
    let insight = "Based on your recent mood patterns: ";
    const dominantMoods = Object.entries(moodCounts)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => (b[1] as number) - (a[1] as number));
    
    if (dominantMoods.length > 0) {
      const [topMood, count] = dominantMoods[0];
      
      if (['Happy', 'Calm'].includes(topMood)) {
        insight += `You've been experiencing more positive emotions lately. Your dominant mood has been ${topMood.toLowerCase()}, which is wonderful! Reflecting on what contributes to these positive feelings can help you maintain them.`;
      } else if (['Sad', 'Angry', 'Anxious'].includes(topMood)) {
        insight += `You've been experiencing ${topMood.toLowerCase()} feelings recently. Consider practicing self-care activities and connecting with supportive people. If these feelings persist, speaking with a mental health professional might be helpful.`;
      } else {
        insight += `You've been feeling mostly neutral lately. This could be a sign of stability or it might indicate emotional numbness. Check in with yourself about how connected you feel to your emotions.`;
      }
      
      // Add trend insight
      if (data[0]['Happy'] < data[data.length-1]['Happy']) {
        insight += " Your happiness levels appear to be improving over time, which is a positive trend.";
      }
    } else {
      insight = "Not enough mood data yet to generate insights. Continue tracking your mood regularly for more personalized analysis.";
    }
    
    setInsightText(insight);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!patternData) {
    return (
      <p className="text-center text-muted-foreground">No mood data available.</p>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={patternData.data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--background)', 
                border: '1px solid var(--border)',
                borderRadius: '8px'
              }} 
            />
            <Legend />
            {patternData.moodTypes.map((type: string) => (
              <Line 
                key={type}
                type="monotone" 
                dataKey={type} 
                stroke={patternData.moodColors[type]} 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="h-5 w-5 text-primary" />
          <h4 className="text-sm font-medium">AI-Generated Insight</h4>
        </div>
        <p className="text-sm text-muted-foreground">{insightText}</p>
      </div>
    </div>
  );
};

export default MoodPatternAnalysis;
