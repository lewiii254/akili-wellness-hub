
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RefreshCw } from "lucide-react";

const MeditationTimer = () => {
  const [duration, setDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isActive, setIsActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBreathPhase = useCallback(() => {
    if (isActive) {
      if (breathPhase === "inhale") {
        setBreathPhase("hold");
      } else if (breathPhase === "hold") {
        setBreathPhase("exhale");
      } else {
        setBreathPhase("inhale");
      }
    }
  }, [isActive, breathPhase]);

  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);

      // Change breath phase every 4 seconds
      const breathInterval = window.setInterval(handleBreathPhase, 4000);
      
      return () => {
        if (interval) clearInterval(interval);
        clearInterval(breathInterval);
      };
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, handleBreathPhase]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration * 60);
    setBreathPhase("inhale");
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-semibold">Meditation Timer</h2>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="text-5xl font-bold tracking-wider mb-4">
            {formatTime(timeLeft)}
          </div>
          
          <div className={`text-xl font-medium transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {breathPhase === "inhale" && "Breathe In"}
            {breathPhase === "hold" && "Hold"}
            {breathPhase === "exhale" && "Breathe Out"}
          </div>
          
          {!isActive && (
            <div className="w-full max-w-xs space-y-2">
              <p className="text-sm text-muted-foreground">Duration (minutes)</p>
              <Slider
                value={[duration]}
                onValueChange={([value]) => {
                  setDuration(value);
                  setTimeLeft(value * 60);
                }}
                min={1}
                max={30}
                step={1}
                className="w-full"
              />
            </div>
          )}
          
          <div className="flex gap-4">
            <Button
              size="lg"
              className="rounded-full w-12 h-12 p-0"
              onClick={toggleTimer}
            >
              {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="rounded-full w-12 h-12 p-0"
              onClick={resetTimer}
            >
              <RefreshCw className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MeditationTimer;
